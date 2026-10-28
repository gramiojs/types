# Generate Telegram Bot API types

Install dependencies and generate declarations from Telegram's OpenAPI schema:

```bash
bun install
bun generate:openapi
```

The command writes `objects.d.ts`, `params.d.ts`, `methods.d.ts`, `index.d.ts`
and `utils.d.ts` to `out/`. These are the files exported by `@gramio/types`.
The schema URL is configured in `src/openapi/index.ts`.

## Options

```bash
# Generate from a local schema.
bun generate:openapi --schema ./api.json

# Preview changes without replacing out/.
bun generate:openapi --out .generated/openapi --compare out --report .generated/comparison.json
```

The comparison report lists added, removed and changed declarations and fields.
It ignores documentation, formatting and union order; it does not resolve aliases.

Existing declaration, field and union order is retained when updating files.
New declarations and fields are appended. With `--compare`, that directory supplies
the reference order; otherwise the existing output directory does.

## Legacy generator

```bash
bun generate
```

This uses `@gramio/schema-parser` to parse the HTML documentation and also writes
to `out/`. The release workflow still uses this command.

## Type conventions

- Objects use the `Telegram` prefix; method parameters use the `Params` suffix.
- Input and response types follow the schema, including separate `Input*` types.
- Uploads accept `Blob`; keyboard inputs also accept `{ toJSON(): T }` builders.
- Formatted text inputs accept `string | { toString(): string }`.
- Length limits, numeric ranges and cross-field validation rules are not enforced
  by TypeScript. The generator warns when it omits conditional validation rules.

Run the generator tests with `bun test:openapi`.
