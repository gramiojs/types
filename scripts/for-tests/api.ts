import type {
    APIMethods,
    APIMethodParams,
    TelegramAPIResponse,
} from "../../out";

const TBA_BASE_URL = "https://api.telegram.org/bot";
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) throw new Error("BOT_TOKEN is not defined");

export const api = new Proxy({} as APIMethods, {
    get:
        <T extends keyof APIMethods>(_target: APIMethods, method: T) =>
        async (params: APIMethodParams<T>) => {
            const response = await fetch(`${TBA_BASE_URL}${TOKEN}/${method}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const data = (await response.json()) as TelegramAPIResponse;
            if (!data.ok) throw new Error(`Some error occurred in ${method} - ${JSON.stringify(data)}`);

            return data.result;
        },
});
