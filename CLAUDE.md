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

-   **`src/index.ts`** — entry point. Fetches the schema, applies all manual patches/overrides, drives file generation.
-   **`src/entities/properties.ts`** — `fieldToType(field, ctx)` converts a `Field` (discriminated union from `@gramio/schema-parser`) to a TypeScript type string. Contains all the special-case logic (parse_mode, InputFile|string, FormattableString, Currencies, allowed_updates, keyboard markup unions).
-   **`src/entities/objects.ts`** — handles `"fields"` / `"oneOf"` / empty marker objects; generates enum union type aliases before each interface.
-   **`src/entities/methods.ts`** — generates the `APIMethods` interface.
-   **`src/entities/params.ts`** — generates `*Params` interfaces; builds enum union aliases from method parameters.
-   **`src/types.ts`** — single export: `TObjectType = "object" | "method"` used throughout the entities.

### CI/CD

`scripts/cicd.ts` compares the SHA-1 of the schema against `hash.txt`. If unchanged, it exits non-zero (no release). If changed, it bumps the package version to match the API major.minor. The GitHub Actions workflow (`.github/workflows/update-types.yml`) runs hourly.

> **Note:** `scripts/cicd.ts` still imports `SCHEMA_FILE_PATH` and `IBotAPI` from the old Rust-schema path. If the Rust submodule (`tg-bot-api/`) is fully dropped in favour of `@gramio/schema-parser`, this script needs updating to hash something else (e.g. the live schema version string).
