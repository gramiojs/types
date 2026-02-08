import { api } from "./api";

const CHAT_ID = process.env.CHAT_ID;

if (!CHAT_ID) throw new Error("CHAT_ID is not defined");

const EMOJI_ID = "5208728790884190662";

const emojiText = (label: string) => ({
    text: `${label} ✈️`,
    entities: [
        { type: "custom_emoji" as const, offset: label.length + 1, length: 1, custom_emoji_id: EMOJI_ID },
    ],
});

// Inline keyboard — callback_data style/icon variations
await api.sendMessage({
    chat_id: CHAT_ID,
    ...emojiText("inline keyboard"),
    reply_markup: {
        inline_keyboard: [
            [{ text: "no style", callback_data: "dummy" }],
            [{ text: "primary", callback_data: "dummy", style: "primary" }],
            [{ text: "danger", callback_data: "dummy", style: "danger" }],
            [{ text: "success", callback_data: "dummy", style: "success" }],
            [{ text: "icon", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "icon+primary", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "primary" }],
            [{ text: "icon+danger", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "danger" }],
            [{ text: "icon+success", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "success" }],
            [{ text: " ", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: " ", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "primary" }],
            [{ text: " ", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "danger" }],
            [{ text: " ", callback_data: "dummy", icon_custom_emoji_id: EMOJI_ID, style: "success" }],
        ],
    },
});

// Inline keyboard — all button types
await api.sendMessage({
    chat_id: CHAT_ID,
    ...emojiText("inline keyboard button types"),
    reply_markup: {
        inline_keyboard: [
            [{ text: "url", url: "https://example.com" }],
            [{ text: "url+style", url: "https://example.com", style: "primary", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "web_app", web_app: { url: "https://example.com" } }],
            [{ text: "web_app+style", web_app: { url: "https://example.com" }, style: "danger", icon_custom_emoji_id: EMOJI_ID }],
            // [{ text: "login_url", login_url: { url: "https://example.com" } }],
            // [{ text: "login_url+style", login_url: { url: "https://example.com" }, style: "success", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "switch_inline_query", switch_inline_query: "test" }],
            [{ text: "siq+style", switch_inline_query: "test", style: "primary", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "siq_current", switch_inline_query_current_chat: "test" }],
            [{ text: "siq_current+style", switch_inline_query_current_chat: "test", style: "danger", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "siq_chosen", switch_inline_query_chosen_chat: { allow_user_chats: true } }],
            [{ text: "siq_chosen+style", switch_inline_query_chosen_chat: { allow_user_chats: true }, style: "success", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "copy_text", copy_text: { text: "copied!" } }],
            [{ text: "copy_text+style", copy_text: { text: "copied!" }, style: "primary", icon_custom_emoji_id: EMOJI_ID }],
        ],
    },
});

// Reply keyboard with all style/icon variations
await api.sendMessage({
    chat_id: CHAT_ID,
    ...emojiText("reply keyboard"),
    reply_markup: {
        keyboard: [
            [{ text: "no style" }],
            [{ text: "primary", style: "primary" }],
            [{ text: "danger", style: "danger" }],
            [{ text: "success", style: "success" }],
            [{ text: "icon", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "icon+primary", icon_custom_emoji_id: EMOJI_ID, style: "primary" }],
            [{ text: "icon+danger", icon_custom_emoji_id: EMOJI_ID, style: "danger" }],
            [{ text: "icon+success", icon_custom_emoji_id: EMOJI_ID, style: "success" }],
            [{ text: " ", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: " ", icon_custom_emoji_id: EMOJI_ID, style: "primary" }],
            [{ text: " ", icon_custom_emoji_id: EMOJI_ID, style: "danger" }],
            [{ text: " ", icon_custom_emoji_id: EMOJI_ID, style: "success" }],
        ],
        resize_keyboard: true,
    },
});

// Reply keyboard with special button types
await api.sendMessage({
    chat_id: CHAT_ID,
    ...emojiText("reply keyboard button types"),
    reply_markup: {
        keyboard: [
            [{ text: "request_users", request_users: { request_id: 1 } }],
            [{ text: "request_users+style", request_users: { request_id: 2 }, style: "primary", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "request_chat", request_chat: { request_id: 3, chat_is_channel: false } }],
            [{ text: "request_chat+style", request_chat: { request_id: 4, chat_is_channel: false }, style: "danger", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "contact", request_contact: true }],
            [{ text: "contact+style", request_contact: true, style: "success", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "location", request_location: true }],
            [{ text: "location+style", request_location: true, style: "primary", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "poll", request_poll: {} }],
            [{ text: "poll+style", request_poll: {}, style: "danger", icon_custom_emoji_id: EMOJI_ID }],
            [{ text: "web_app", web_app: { url: "https://example.com" } }],
            [{ text: "web_app+style", web_app: { url: "https://example.com" }, style: "success", icon_custom_emoji_id: EMOJI_ID }],
        ],
        resize_keyboard: true,
    },
});