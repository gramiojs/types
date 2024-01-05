# @gramio/types - Code-generated Telegram Bot API types

## Usage as an [NPM package](https://www.npmjs.com/package/@gramio/types)

```ts
import type { ApiMethods } from "@gramio/types"

type SendMessageReturn = ReturnType<ApiMethods["sendMessage"]>
//   ^? type SendMessageReturn = Promise<TelegramMessage>
```

## Generate types

Prerequire - [`rust`](https://www.rust-lang.org/)

1. Clone [this repo](https://github.com/kravetsone/gramio-types) and open it

```
git clone https://github.com/kravetsone/gramio-types.git
```

2. Clone [repo](https://github.com/ark0f/tg-bot-api) to the `src` folder

```bash
git clone https://github.com/ark0f/tg-bot-api.git
```

3. Run the JSON schema generator in the cloned folder

```bash
cargo run --package gh-pages-generator --bin gh-pages-generator -- dev
```

4. Run types code-generation from the root of the project

```bash
bun generate
```

or, if you don't use `bun`, use `tsx`

```bash
npx tsx src/index.ts
```

5. Profit! Check out the types of Telegram Bot API in `types` folder!
