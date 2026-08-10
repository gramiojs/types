# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun generate          # Run the generator — writes to out/
bun lint              # Biome lint check on src/
bun lint:fix          # Auto-fix lint issues
bun cicd              # Hash-check schema, bump version, write GITHUB_OUTPUT (CI use)
bun jsr               # Prepare JSR publish: sync version + copy out/*.d.ts → source/*.ts
```

## Architecture

This repo generates TypeScript declaration files for the Telegram Bot API. Nothing is hand-authored in `out/` — every `.d.ts` there is produced by `bun generate`.

### Generator pipeline

```
getCustomSchema()               ← @gramio/schema-parser (fetches live Telegram docs)
        │
        ▼
src/index.ts                    ← orchestrates everything
  ├─ applies manual patches     (Currencies, APIResponse*, InputFile, button styling)
  └─ calls entities/
        ├─ Objects.generateMany()    → out/objects.d.ts
        ├─ Params.generateMany()     → out/params.d.ts
        ├─ APIMethods.generateMany() → out/methods.d.ts
        └─ (header/utils built inline)
```

### Key files

-   **`src/index.ts`** — entry point. Fetches the schema, runs the schema guards, applies all manual patches/overrides, drives file generation.
-   **`src/entities/properties.ts`** — `fieldToType(field, ctx)` converts a `Field` (discriminated union from `@gramio/schema-parser`) to a TypeScript type string. Contains all the special-case logic (parse_mode, InputFile|string, FormattableString, Currencies, allowed_updates, keyboard markup unions).
-   **`src/entities/objects.ts`** — handles `"fields"` / `"oneOf"` / empty marker objects; generates enum union type aliases before each interface.
-   **`src/entities/methods.ts`** — generates the `APIMethods` interface.
-   **`src/entities/params.ts`** — generates `*Params` interfaces; builds enum union aliases from method parameters.
-   **`src/types.ts`** — single export: `TObjectType = "object" | "method"` used throughout the entities.

### Schema guards (`src/index.ts`)

Both guards `throw` before anything is written — a broken release is worse than a skipped one.

1. **Mojibake guard** — rejects UTF-8 → CP1251 garbage (`рџ`) from a mis-decoded upstream response (shipped broken `SendDiceEmoji` values in v9.6.0).
2. **Formattable/`parse_mode` guard** — every text field with a `parse_mode` sibling must carry `semanticType: "formattable"`, and nothing without such a sibling may carry it. That pairing is what turns a field into `string | { toString(): string }` (FormattableString support) in `entities/properties.ts`.

    The second guard exists because the pairing silently broke once: Bot API 10.1 reworded `editMessageText.text` from "after entities parsing" to "after entity parsing", `@gramio/schema-parser`'s description-based detection stopped firing, and v10.1.0 shipped `SendMessageParams.text: string | { toString(): string }` next to `EditMessageTextParams.text?: string`. Detection is structural since parser 1.2.0 (`applyFormattableSiblings`), and this guard pins the invariant on the consumer side — including when an older parser resolves from `node_modules`.

    If it fires, fix the detection in `@gramio/schema-parser` rather than papering over it here.

### CI/CD

`scripts/cicd.ts` compares the SHA-1 of the schema against `hash.txt`. If unchanged, it exits non-zero (no release). If changed, it bumps the package version to match the API major.minor. The GitHub Actions workflow (`.github/workflows/update-types.yml`) runs hourly.

> **Note:** the hash covers `schema.version` only, so silent Telegram doc edits inside an already-released version (added fields, reworded descriptions) never trigger a regeneration — `bun cicd:force` / the `force-release` workflow is the way out.
