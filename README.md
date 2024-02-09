# Code-generated and Auto-published Telegram Bot API types

### Versioning

7.0.x types - for 7.0 Telegram Bot API

## Usage as an [NPM package](https://www.npmjs.com/package/@gramio/types)

```ts
import type { ApiMethods } from "@gramio/types";

type SendMessageReturn = ReturnType<ApiMethods["sendMessage"]>;
//   ^? type SendMessageReturn = Promise<TelegramMessage>
```

[API Types References](https://tsdocs.dev/docs/@gramio/types)

### Auto-update package

This library is updated automatically to the latest version of the Telegram Bot Api in case of changes thanks to CI CD!
If the github action failed, there are no changes in the bot api

## Imports

-   `index` - exports everything in the section
-   `methods` - exports `ApiMethods` which describes the api functions
-   `objects` - exports objects with the `Telegram` prefix (for example [Update](https://core.telegram.org/bots/api/#update))
-   `params` - exports params that are used in `methods`

### Write you own type-safe TBA API wrapper

```typescript
import type { ApiMethods, TelegramAPIResponse } from "@gramio/types";

const TBA_BASE_URL = "https://api.telegram.org/bot";
const TOKEN = "";

const api = new Proxy({} as ApiMethods, {
    get:
        <T extends keyof ApiMethods>(_target: ApiMethods, method: T) =>
        async (params: Parameters<ApiMethods[T]>[0]) => {
            const response = await fetch(`${TBA_BASE_URL}${TOKEN}/${method}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = (await response.json()) as TelegramAPIResponse;
            if (!data.ok) throw new Error(`Some error occurred in ${method}`);

            return data.result;
        },
});

api.sendMessage({
    chat_id: 1,
    text: "message",
});
```

#### Usage with [`@gramio/keyboards`](https://github.com/gramiojs/keyboards)

```typescript
import { Keyboard } from "@gramio/keyboards";

// the code from the example above

api.sendMessage({
    chat_id: 1,
    text: "message with keyboard",
    reply_markup: new Keyboard().text("button text"),
});
```

## Generate types manually

Prerequire - [`rust`](https://www.rust-lang.org/)

1. Clone [this repo](https://github.com/gramiojs/types) and open it

```bash
git clone https://github.com/gramiojs/types.git
```

2. Clone [repo](https://github.com/ark0f/tg-bot-api) with Telegram Bot Api schema generator

```bash
git clone https://github.com/ark0f/tg-bot-api.git
```

3. Run the JSON schema generator in the `cloned` folder

```bash
cd tg-bot-api && cargo run --package gh-pages-generator --bin gh-pages-generator -- dev && cd ..
```

4. Run types code-generation from the `root` of the project

```bash
bun generate
```

or, if you don't use `bun`, use `tsx`

```bash
npx tsx src/index.ts
```

5. Profit! Check out the types of Telegram Bot API in `out` folder!
