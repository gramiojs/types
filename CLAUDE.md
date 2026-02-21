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

- **`src/index.ts`** — entry point. Fetches the schema, applies all manual patches/overrides, drives file generation.
- **`src/entities/properties.ts`** — `fieldToType(field, ctx)` converts a `Field` (discriminated union from `@gramio/schema-parser`) to a TypeScript type string. Contains all the special-case logic (parse_mode, InputFile|string, FormattableString, Currencies, allowed_updates, keyboard markup unions).
- **`src/entities/objects.ts`** — handles `"fields"` / `"oneOf"` / empty marker objects; generates enum union type aliases before each interface.
- **`src/entities/methods.ts`** — generates the `APIMethods` interface.
- **`src/entities/params.ts`** — generates `*Params` interfaces; builds enum union aliases from method parameters.
- **`src/types.ts`** — local extensions that fill gaps in `@gramio/schema-parser`'s TypeScript types (the library's interfaces don't yet fully match the JSON it emits).

### Manual patches in `src/index.ts`

Several things the Telegram docs don't express cleanly are injected/overridden by hand:

| Patch | Reason |
|-------|--------|
| `Currencies` object | Built from the currencies.json endpoint |
| `APIResponseOk/Error/Response` | Generic wrapper types not in the API schema |
| `InputFile` override | Docs say "unknown"; needs `Blob` union |
| `InlineKeyboardButton/KeyboardButton` extra fields | Undocumented `style` / `icon_custom_emoji_id` properties |

### Schema library (`@gramio/schema-parser`) — known gaps

The library's TypeScript interfaces lag behind their JSON output. `src/types.ts` extends them:

- `FieldInteger`/`FieldFloat`: missing `min?`, `max?`
- `FieldString`: missing `default?`, `minLen?`, `maxLen?` (JSON emits `default` where the types declare `const`)
- `Method`: missing `hasMultipart: boolean`
- `Object` union: missing `ObjectUnknown` — at runtime, empty marker objects (`ForumTopicClosed` etc.) have `type: undefined, fields: undefined` rather than a `"unknown"` discriminant

The live HTML parser also doesn't extract string-discriminator literals (`"creator"`) or integer enums from descriptions (e.g. `icon_color`, `sendChatAction.action`). These are present in the bundled `custom-schema.json` but lost in a live re-parse.

### CI/CD

`scripts/cicd.ts` compares the SHA-1 of the schema against `hash.txt`. If unchanged, it exits non-zero (no release). If changed, it bumps the package version to match the API major.minor. The GitHub Actions workflow (`.github/workflows/update-types.yml`) runs hourly.

> **Note:** `scripts/cicd.ts` still imports `SCHEMA_FILE_PATH` and `IBotAPI` from the old Rust-schema path. If the Rust submodule (`tg-bot-api/`) is fully dropped in favour of `@gramio/schema-parser`, this script needs updating to hash something else (e.g. the live schema version string).
