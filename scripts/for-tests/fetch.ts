import { api } from "./api";

const CHAT_ID = process.env.CHAT_ID;

if (!CHAT_ID) throw new Error("CHAT_ID is not defined");

const response = await api.sendMessage({
    chat_id: CHAT_ID,
    text: "message",
});

console.log(response);