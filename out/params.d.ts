/**
 * @module
 *
 * This module contains params for [methods](https://core.telegram.org/bots/api#available-methods) with the `Params` postfix
 *
 * @example import params
 * ```typescript
 * import { SendMessageParams } from "@gramio/types/params";
 * ```
 *
 * Based on Bot API v8.2.0 (01.01.2025)
 *
 * Generated at 07.01.2025, 15:24:54 using [types](https://github.com/gramiojs/types) and [schema](https://ark0f.github.io/tg-bot-api) generators
 */

import type { APIMethods } from "./methods"
import type * as Objects from "./objects"

/**
 * Params object for {@link APIMethods.getUpdates | getUpdates} method
 */
export interface GetUpdatesParams {
    /**
     * Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as [getUpdates](https://core.telegram.org/bots/api/#getupdates) is called with an *offset* higher than its *update\_id*. The negative offset can be specified to retrieve updates starting from *-offset* update from the end of the updates queue. All previous updates will be forgotten.
     */
    offset?: number
    /**
     * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
     */
    limit?: number
    /**
     * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
     */
    timeout?: number
    /**
     * A JSON-serialized list of the update types you want your bot to receive. For example, specify `["message", "edited_channel_post", "callback_query"]` to only receive updates of these types. See [Update](https://core.telegram.org/bots/api/#update) for a complete list of available update types. Specify an empty list to receive all update types except *chat\_member*, *message\_reaction*, and *message\_reaction\_count* (default). If not specified, the previous setting will be used.
     *
     * Please note that this parameter doesn't affect updates created before the call to getUpdates, so unwanted updates may be received for a short period of time.
     */
    allowed_updates?: Exclude<keyof Objects.TelegramUpdate, "update_id">[]
}

/**
 * Params object for {@link APIMethods.setWebhook | setWebhook} method
 */
export interface SetWebhookParams {
    /**
     * HTTPS URL to send updates to. Use an empty string to remove webhook integration
     */
    url: string
    /**
     * Upload your public key certificate so that the root certificate in use can be checked. See our [self-signed guide](https://core.telegram.org/bots/self-signed) for details.
     */
    certificate?: Objects.TelegramInputFile
    /**
     * The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS
     */
    ip_address?: string
    /**
     * The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to *40*. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput.
     */
    max_connections?: number
    /**
     * A JSON-serialized list of the update types you want your bot to receive. For example, specify `["message", "edited_channel_post", "callback_query"]` to only receive updates of these types. See [Update](https://core.telegram.org/bots/api/#update) for a complete list of available update types. Specify an empty list to receive all update types except *chat\_member*, *message\_reaction*, and *message\_reaction\_count* (default). If not specified, the previous setting will be used.
     * Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time.
     */
    allowed_updates?: Exclude<keyof Objects.TelegramUpdate, "update_id">[]
    /**
     * Pass *True* to drop all pending updates
     */
    drop_pending_updates?: boolean
    /**
     * A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed. The header is useful to ensure that the request comes from a webhook set by you.
     */
    secret_token?: string
}

/**
 * Params object for {@link APIMethods.deleteWebhook | deleteWebhook} method
 */
export interface DeleteWebhookParams {
    /**
     * Pass *True* to drop all pending updates
     */
    drop_pending_updates?: boolean
}

/**
 * Params object for {@link APIMethods.sendMessage | sendMessage} method
 */
export interface SendMessageParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Text of the message to be sent, 1-4096 characters after entities parsing
     */
    text: string | { toString(): string }
    /**
     * Mode for parsing entities in the message text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in message text, which can be specified instead of *parse\_mode*
     */
    entities?: Objects.TelegramMessageEntity[]
    /**
     * Link preview generation options for the message
     */
    link_preview_options?: Objects.TelegramLinkPreviewOptions
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.forwardMessage | forwardMessage} method
 */
export interface ForwardMessageParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
     */
    from_chat_id: number | string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the forwarded message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Message identifier in the chat specified in *from\_chat\_id*
     */
    message_id: number
}

/**
 * Params object for {@link APIMethods.forwardMessages | forwardMessages} method
 */
export interface ForwardMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Unique identifier for the chat where the original messages were sent (or channel username in the format `@channelusername`)
     */
    from_chat_id: number | string
    /**
     * A JSON-serialized list of 1-100 identifiers of messages in the chat *from\_chat\_id* to forward. The identifiers must be specified in a strictly increasing order.
     */
    message_ids: number[]
    /**
     * Sends the messages [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the forwarded messages from forwarding and saving
     */
    protect_content?: boolean
}

/**
 * Params object for {@link APIMethods.copyMessage | copyMessage} method
 */
export interface CopyMessageParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Unique identifier for the chat where the original message was sent (or channel username in the format `@channelusername`)
     */
    from_chat_id: number | string
    /**
     * Message identifier in the chat specified in *from\_chat\_id*
     */
    message_id: number
    /**
     * New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the new caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media. Ignored if a new caption isn't specified.
     */
    show_caption_above_media?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.copyMessages | copyMessages} method
 */
export interface CopyMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Unique identifier for the chat where the original messages were sent (or channel username in the format `@channelusername`)
     */
    from_chat_id: number | string
    /**
     * A JSON-serialized list of 1-100 identifiers of messages in the chat *from\_chat\_id* to copy. The identifiers must be specified in a strictly increasing order.
     */
    message_ids: number[]
    /**
     * Sends the messages [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent messages from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to copy the messages without their captions
     */
    remove_caption?: boolean
}

/**
 * Params object for {@link APIMethods.sendPhoto | sendPhoto} method
 */
export interface SendPhotoParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Photo to send. Pass a file\_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    photo: Objects.TelegramInputFile | string
    /**
     * Photo caption (may also be used when resending photos by *file\_id*), 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the photo caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media
     */
    show_caption_above_media?: boolean
    /**
     * Pass *True* if the photo needs to be covered with a spoiler animation
     */
    has_spoiler?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendAudio | sendAudio} method
 */
export interface SendAudioParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Audio file to send. Pass a file\_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    audio: Objects.TelegramInputFile | string
    /**
     * Audio caption, 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the audio caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Duration of the audio in seconds
     */
    duration?: number
    /**
     * Performer
     */
    performer?: string
    /**
     * Track name
     */
    title?: string
    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using multipart/form-data under \<file\_attach\_name\>. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendDocument | sendDocument} method
 */
export interface SendDocumentParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * File to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    document: Objects.TelegramInputFile | string
    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using multipart/form-data under \<file\_attach\_name\>. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Document caption (may also be used when resending documents by *file\_id*), 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the document caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Disables automatic server-side content type detection for files uploaded using multipart/form-data
     */
    disable_content_type_detection?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendVideo | sendVideo} method
 */
export interface SendVideoParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Video to send. Pass a file\_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    video: Objects.TelegramInputFile | string
    /**
     * Duration of sent video in seconds
     */
    duration?: number
    /**
     * Video width
     */
    width?: number
    /**
     * Video height
     */
    height?: number
    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using multipart/form-data under \<file\_attach\_name\>. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Video caption (may also be used when resending videos by *file\_id*), 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the video caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media
     */
    show_caption_above_media?: boolean
    /**
     * Pass *True* if the video needs to be covered with a spoiler animation
     */
    has_spoiler?: boolean
    /**
     * Pass *True* if the uploaded video is suitable for streaming
     */
    supports_streaming?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendAnimation | sendAnimation} method
 */
export interface SendAnimationParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Animation to send. Pass a file\_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    animation: Objects.TelegramInputFile | string
    /**
     * Duration of sent animation in seconds
     */
    duration?: number
    /**
     * Animation width
     */
    width?: number
    /**
     * Animation height
     */
    height?: number
    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using multipart/form-data under \<file\_attach\_name\>. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Animation caption (may also be used when resending animation by *file\_id*), 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the animation caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media
     */
    show_caption_above_media?: boolean
    /**
     * Pass *True* if the animation needs to be covered with a spoiler animation
     */
    has_spoiler?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendVoice | sendVoice} method
 */
export interface SendVoiceParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Audio file to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    voice: Objects.TelegramInputFile | string
    /**
     * Voice message caption, 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the voice message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Duration of the voice message in seconds
     */
    duration?: number
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendVideoNote | sendVideoNote} method
 */
export interface SendVideoNoteParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Video note to send. Pass a file\_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files). Sending video notes by a URL is currently unsupported
     */
    video_note: Objects.TelegramInputFile | string
    /**
     * Duration of sent video in seconds
     */
    duration?: number
    /**
     * Video width and height, i.e. diameter of the video message
     */
    length?: number
    /**
     * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://\<file\_attach\_name\>” if the thumbnail was uploaded using multipart/form-data under \<file\_attach\_name\>. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendPaidMedia | sendPaidMedia} method
 */
export interface SendPaidMediaParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance.
     */
    chat_id: number | string
    /**
     * The number of Telegram Stars that must be paid to buy access to the media; 1-2500
     */
    star_count: number
    /**
     * A JSON-serialized array describing the media to be sent; up to 10 items
     */
    media: Objects.TelegramInputPaidMedia[]
    /**
     * Bot-defined paid media payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes.
     */
    payload?: string
    /**
     * Media caption, 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the media caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media
     */
    show_caption_above_media?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendMediaGroup | sendMediaGroup} method
 */
export interface SendMediaGroupParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * A JSON-serialized array describing messages to be sent, must include 2-10 items
     */
    media: (
        | Objects.TelegramInputMediaAudio
        | Objects.TelegramInputMediaDocument
        | Objects.TelegramInputMediaPhoto
        | Objects.TelegramInputMediaVideo
    )[]
    /**
     * Sends messages [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent messages from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
}

/**
 * Params object for {@link APIMethods.sendLocation | sendLocation} method
 */
export interface SendLocationParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Latitude of the location
     */
    latitude: number
    /**
     * Longitude of the location
     */
    longitude: number
    /**
     * The radius of uncertainty for the location, measured in meters; 0-1500
     */
    horizontal_accuracy?: number
    /**
     * Period in seconds during which the location will be updated (see [Live Locations](https://telegram.org/blog/live-locations), should be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely.
     */
    live_period?: number
    /**
     * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
     */
    heading?: number
    /**
     * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
     */
    proximity_alert_radius?: number
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendVenue | sendVenue} method
 */
export interface SendVenueParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Latitude of the venue
     */
    latitude: number
    /**
     * Longitude of the venue
     */
    longitude: number
    /**
     * Name of the venue
     */
    title: string
    /**
     * Address of the venue
     */
    address: string
    /**
     * Foursquare identifier of the venue
     */
    foursquare_id?: string
    /**
     * Foursquare type of the venue, if known. (For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or “food/icecream”.)
     */
    foursquare_type?: string
    /**
     * Google Places identifier of the venue
     */
    google_place_id?: string
    /**
     * Google Places type of the venue. (See [supported types](https://developers.google.com/places/web-service/supported_types).)
     */
    google_place_type?: string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.sendContact | sendContact} method
 */
export interface SendContactParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Contact's phone number
     */
    phone_number: string
    /**
     * Contact's first name
     */
    first_name: string
    /**
     * Contact's last name
     */
    last_name?: string
    /**
     * Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
     */
    vcard?: string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

export type SendPollType = "quiz" | "regular"

/**
 * Params object for {@link APIMethods.sendPoll | sendPoll} method
 */
export interface SendPollParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Poll question, 1-300 characters
     */
    question: string | { toString(): string }
    /**
     * Mode for parsing entities in the question. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. Currently, only custom emoji entities are allowed
     */
    question_parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the poll question. It can be specified instead of *question\_parse\_mode*
     */
    question_entities?: Objects.TelegramMessageEntity[]
    /**
     * A JSON-serialized list of 2-10 answer options
     */
    options: Objects.TelegramInputPollOption[]
    /**
     * *True*, if the poll needs to be anonymous, defaults to *True*
     */
    is_anonymous?: boolean
    /**
     * Poll type, “quiz” or “regular”, defaults to “regular”
     */
    type?: SendPollType
    /**
     * *True*, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to *False*
     */
    allows_multiple_answers?: boolean
    /**
     * 0-based identifier of the correct answer option, required for polls in quiz mode
     */
    correct_option_id?: number
    /**
     * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
     */
    explanation?: string | { toString(): string }
    /**
     * Mode for parsing entities in the explanation. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    explanation_parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the poll explanation. It can be specified instead of *explanation\_parse\_mode*
     */
    explanation_entities?: Objects.TelegramMessageEntity[]
    /**
     * Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with *close\_date*.
     */
    open_period?: number
    /**
     * Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with *open\_period*.
     */
    close_date?: number
    /**
     * Pass *True* if the poll needs to be immediately closed. This can be useful for poll preview.
     */
    is_closed?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

export type SendDiceEmoji = "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰"

/**
 * Params object for {@link APIMethods.sendDice | sendDice} method
 */
export interface SendDiceParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”. Dice can have values 1-6 for “🎲”, “🎯” and “🎳”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲”
     */
    emoji?: SendDiceEmoji
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

export type SendChatActionAction =
    | "typing"
    | "upload_photo"
    | "record_video"
    | "upload_video"
    | "record_voice"
    | "upload_voice"
    | "upload_document"
    | "choose_sticker"
    | "find_location"
    | "record_video_note"
    | "upload_video_note"

/**
 * Params object for {@link APIMethods.sendChatAction | sendChatAction} method
 */
export interface SendChatActionParams {
    /**
     * Unique identifier of the business connection on behalf of which the action will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread; for supergroups only
     */
    message_thread_id?: number
    /**
     * Type of action to broadcast. Choose one, depending on what the user is about to receive: *typing* for [text messages](https://core.telegram.org/bots/api/#sendmessage), *upload\_photo* for [photos](https://core.telegram.org/bots/api/#sendphoto), *record\_video* or *upload\_video* for [videos](https://core.telegram.org/bots/api/#sendvideo), *record\_voice* or *upload\_voice* for [voice notes](https://core.telegram.org/bots/api/#sendvoice), *upload\_document* for [general files](https://core.telegram.org/bots/api/#senddocument), *choose\_sticker* for [stickers](https://core.telegram.org/bots/api/#sendsticker), *find\_location* for [location data](https://core.telegram.org/bots/api/#sendlocation), *record\_video\_note* or *upload\_video\_note* for [video notes](https://core.telegram.org/bots/api/#sendvideonote).
     */
    action: SendChatActionAction
}

/**
 * Params object for {@link APIMethods.setMessageReaction | setMessageReaction} method
 */
export interface SetMessageReactionParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead.
     */
    message_id: number
    /**
     * A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots.
     */
    reaction?: Objects.TelegramReactionType[]
    /**
     * Pass *True* to set the reaction with a big animation
     */
    is_big?: boolean
}

/**
 * Params object for {@link APIMethods.getUserProfilePhotos | getUserProfilePhotos} method
 */
export interface GetUserProfilePhotosParams {
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Sequential number of the first photo to be returned. By default, all photos are returned.
     */
    offset?: number
    /**
     * Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
     */
    limit?: number
}

/**
 * Params object for {@link APIMethods.setUserEmojiStatus | setUserEmojiStatus} method
 */
export interface SetUserEmojiStatusParams {
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status.
     */
    emoji_status_custom_emoji_id?: string
    /**
     * Expiration date of the emoji status, if any
     */
    emoji_status_expiration_date?: number
}

/**
 * Params object for {@link APIMethods.getFile | getFile} method
 */
export interface GetFileParams {
    /**
     * File identifier to get information about
     */
    file_id: string
}

/**
 * Params object for {@link APIMethods.banChatMember | banChatMember} method
 */
export interface BanChatMemberParams {
    /**
     * Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only.
     */
    until_date?: number
    /**
     * Pass *True* to delete all messages from the chat for the user that is being removed. If *False*, the user will be able to see messages in the group that were sent before the user was removed. Always *True* for supergroups and channels.
     */
    revoke_messages?: boolean
}

/**
 * Params object for {@link APIMethods.unbanChatMember | unbanChatMember} method
 */
export interface UnbanChatMemberParams {
    /**
     * Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Do nothing if the user is not banned
     */
    only_if_banned?: boolean
}

/**
 * Params object for {@link APIMethods.restrictChatMember | restrictChatMember} method
 */
export interface RestrictChatMemberParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * A JSON-serialized object for new user permissions
     */
    permissions: Objects.TelegramChatPermissions
    /**
     * Pass *True* if chat permissions are set independently. Otherwise, the *can\_send\_other\_messages* and *can\_add\_web\_page\_previews* permissions will imply the *can\_send\_messages*, *can\_send\_audios*, *can\_send\_documents*, *can\_send\_photos*, *can\_send\_videos*, *can\_send\_video\_notes*, and *can\_send\_voice\_notes* permissions; the *can\_send\_polls* permission will imply the *can\_send\_messages* permission.
     */
    use_independent_chat_permissions?: boolean
    /**
     * Date when restrictions will be lifted for the user; Unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever
     */
    until_date?: number
}

/**
 * Params object for {@link APIMethods.promoteChatMember | promoteChatMember} method
 */
export interface PromoteChatMemberParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Pass *True* if the administrator's presence in the chat is hidden
     */
    is_anonymous?: boolean
    /**
     * Pass *True* if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages and ignore slow mode. Implied by any other administrator privilege.
     */
    can_manage_chat?: boolean
    /**
     * Pass *True* if the administrator can delete messages of other users
     */
    can_delete_messages?: boolean
    /**
     * Pass *True* if the administrator can manage video chats
     */
    can_manage_video_chats?: boolean
    /**
     * Pass *True* if the administrator can restrict, ban or unban chat members, or access supergroup statistics
     */
    can_restrict_members?: boolean
    /**
     * Pass *True* if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him)
     */
    can_promote_members?: boolean
    /**
     * Pass *True* if the administrator can change chat title, photo and other settings
     */
    can_change_info?: boolean
    /**
     * Pass *True* if the administrator can invite new users to the chat
     */
    can_invite_users?: boolean
    /**
     * Pass *True* if the administrator can post stories to the chat
     */
    can_post_stories?: boolean
    /**
     * Pass *True* if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive
     */
    can_edit_stories?: boolean
    /**
     * Pass *True* if the administrator can delete stories posted by other users
     */
    can_delete_stories?: boolean
    /**
     * Pass *True* if the administrator can post messages in the channel, or access channel statistics; for channels only
     */
    can_post_messages?: boolean
    /**
     * Pass *True* if the administrator can edit messages of other users and can pin messages; for channels only
     */
    can_edit_messages?: boolean
    /**
     * Pass *True* if the administrator can pin messages; for supergroups only
     */
    can_pin_messages?: boolean
    /**
     * Pass *True* if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only
     */
    can_manage_topics?: boolean
}

/**
 * Params object for {@link APIMethods.setChatAdministratorCustomTitle | setChatAdministratorCustomTitle} method
 */
export interface SetChatAdministratorCustomTitleParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * New custom title for the administrator; 0-16 characters, emoji are not allowed
     */
    custom_title: string
}

/**
 * Params object for {@link APIMethods.banChatSenderChat | banChatSenderChat} method
 */
export interface BanChatSenderChatParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target sender chat
     */
    sender_chat_id: number
}

/**
 * Params object for {@link APIMethods.unbanChatSenderChat | unbanChatSenderChat} method
 */
export interface UnbanChatSenderChatParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target sender chat
     */
    sender_chat_id: number
}

/**
 * Params object for {@link APIMethods.setChatPermissions | setChatPermissions} method
 */
export interface SetChatPermissionsParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * A JSON-serialized object for new default chat permissions
     */
    permissions: Objects.TelegramChatPermissions
    /**
     * Pass *True* if chat permissions are set independently. Otherwise, the *can\_send\_other\_messages* and *can\_add\_web\_page\_previews* permissions will imply the *can\_send\_messages*, *can\_send\_audios*, *can\_send\_documents*, *can\_send\_photos*, *can\_send\_videos*, *can\_send\_video\_notes*, and *can\_send\_voice\_notes* permissions; the *can\_send\_polls* permission will imply the *can\_send\_messages* permission.
     */
    use_independent_chat_permissions?: boolean
}

/**
 * Params object for {@link APIMethods.exportChatInviteLink | exportChatInviteLink} method
 */
export interface ExportChatInviteLinkParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.createChatInviteLink | createChatInviteLink} method
 */
export interface CreateChatInviteLinkParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Invite link name; 0-32 characters
     */
    name?: string
    /**
     * Point in time (Unix timestamp) when the link will expire
     */
    expire_date?: number
    /**
     * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
     */
    member_limit?: number
    /**
     * *True*, if users joining the chat via the link need to be approved by chat administrators. If *True*, *member\_limit* can't be specified
     */
    creates_join_request?: boolean
}

/**
 * Params object for {@link APIMethods.editChatInviteLink | editChatInviteLink} method
 */
export interface EditChatInviteLinkParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * The invite link to edit
     */
    invite_link: string
    /**
     * Invite link name; 0-32 characters
     */
    name?: string
    /**
     * Point in time (Unix timestamp) when the link will expire
     */
    expire_date?: number
    /**
     * The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
     */
    member_limit?: number
    /**
     * *True*, if users joining the chat via the link need to be approved by chat administrators. If *True*, *member\_limit* can't be specified
     */
    creates_join_request?: boolean
}

/**
 * Params object for {@link APIMethods.createChatSubscriptionInviteLink | createChatSubscriptionInviteLink} method
 */
export interface CreateChatSubscriptionInviteLinkParams {
    /**
     * Unique identifier for the target channel chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Invite link name; 0-32 characters
     */
    name?: string
    /**
     * The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days).
     */
    subscription_period: number
    /**
     * The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-2500
     */
    subscription_price: number
}

/**
 * Params object for {@link APIMethods.editChatSubscriptionInviteLink | editChatSubscriptionInviteLink} method
 */
export interface EditChatSubscriptionInviteLinkParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * The invite link to edit
     */
    invite_link: string
    /**
     * Invite link name; 0-32 characters
     */
    name?: string
}

/**
 * Params object for {@link APIMethods.revokeChatInviteLink | revokeChatInviteLink} method
 */
export interface RevokeChatInviteLinkParams {
    /**
     * Unique identifier of the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * The invite link to revoke
     */
    invite_link: string
}

/**
 * Params object for {@link APIMethods.approveChatJoinRequest | approveChatJoinRequest} method
 */
export interface ApproveChatJoinRequestParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
}

/**
 * Params object for {@link APIMethods.declineChatJoinRequest | declineChatJoinRequest} method
 */
export interface DeclineChatJoinRequestParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
}

/**
 * Params object for {@link APIMethods.setChatPhoto | setChatPhoto} method
 */
export interface SetChatPhotoParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * New chat photo, uploaded using multipart/form-data
     */
    photo: Objects.TelegramInputFile
}

/**
 * Params object for {@link APIMethods.deleteChatPhoto | deleteChatPhoto} method
 */
export interface DeleteChatPhotoParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.setChatTitle | setChatTitle} method
 */
export interface SetChatTitleParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * New chat title, 1-128 characters
     */
    title: string
}

/**
 * Params object for {@link APIMethods.setChatDescription | setChatDescription} method
 */
export interface SetChatDescriptionParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * New chat description, 0-255 characters
     */
    description?: string
}

/**
 * Params object for {@link APIMethods.pinChatMessage | pinChatMessage} method
 */
export interface PinChatMessageParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be pinned
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Identifier of a message to pin
     */
    message_id: number
    /**
     * Pass *True* if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats.
     */
    disable_notification?: boolean
}

/**
 * Params object for {@link APIMethods.unpinChatMessage | unpinChatMessage} method
 */
export interface UnpinChatMessageParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be unpinned
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Identifier of the message to unpin. Required if *business\_connection\_id* is specified. If not specified, the most recent pinned message (by sending date) will be unpinned.
     */
    message_id?: number
}

/**
 * Params object for {@link APIMethods.unpinAllChatMessages | unpinAllChatMessages} method
 */
export interface UnpinAllChatMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.leaveChat | leaveChat} method
 */
export interface LeaveChatParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.getChat | getChat} method
 */
export interface GetChatParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.getChatAdministrators | getChatAdministrators} method
 */
export interface GetChatAdministratorsParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.getChatMemberCount | getChatMemberCount} method
 */
export interface GetChatMemberCountParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.getChatMember | getChatMember} method
 */
export interface GetChatMemberParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup or channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
}

/**
 * Params object for {@link APIMethods.setChatStickerSet | setChatStickerSet} method
 */
export interface SetChatStickerSetParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Name of the sticker set to be set as the group sticker set
     */
    sticker_set_name: string
}

/**
 * Params object for {@link APIMethods.deleteChatStickerSet | deleteChatStickerSet} method
 */
export interface DeleteChatStickerSetParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

export type CreateForumTopicIconColor =
    | "7322096"
    | "16766590"
    | "13338331"
    | "9367192"
    | "16749490"
    | "16478047"

/**
 * Params object for {@link APIMethods.createForumTopic | createForumTopic} method
 */
export interface CreateForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Topic name, 1-128 characters
     */
    name: string
    /**
     * Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F)
     */
    icon_color?: 0x6fb9f0 | 0xffd67e | 0xcb86db | 0x8eee98 | 0xff93b2 | 0xfb6f5f
    /**
     * Unique identifier of the custom emoji shown as the topic icon. Use [getForumTopicIconStickers](https://core.telegram.org/bots/api/#getforumtopiciconstickers) to get all allowed custom emoji identifiers.
     */
    icon_custom_emoji_id?: string
}

/**
 * Params object for {@link APIMethods.editForumTopic | editForumTopic} method
 */
export interface EditForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread of the forum topic
     */
    message_thread_id: number
    /**
     * New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept
     */
    name?: string
    /**
     * New unique identifier of the custom emoji shown as the topic icon. Use [getForumTopicIconStickers](https://core.telegram.org/bots/api/#getforumtopiciconstickers) to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept
     */
    icon_custom_emoji_id?: string
}

/**
 * Params object for {@link APIMethods.closeForumTopic | closeForumTopic} method
 */
export interface CloseForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread of the forum topic
     */
    message_thread_id: number
}

/**
 * Params object for {@link APIMethods.reopenForumTopic | reopenForumTopic} method
 */
export interface ReopenForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread of the forum topic
     */
    message_thread_id: number
}

/**
 * Params object for {@link APIMethods.deleteForumTopic | deleteForumTopic} method
 */
export interface DeleteForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread of the forum topic
     */
    message_thread_id: number
}

/**
 * Params object for {@link APIMethods.unpinAllForumTopicMessages | unpinAllForumTopicMessages} method
 */
export interface UnpinAllForumTopicMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread of the forum topic
     */
    message_thread_id: number
}

/**
 * Params object for {@link APIMethods.editGeneralForumTopic | editGeneralForumTopic} method
 */
export interface EditGeneralForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
    /**
     * New topic name, 1-128 characters
     */
    name: string
}

/**
 * Params object for {@link APIMethods.closeGeneralForumTopic | closeGeneralForumTopic} method
 */
export interface CloseGeneralForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.reopenGeneralForumTopic | reopenGeneralForumTopic} method
 */
export interface ReopenGeneralForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.hideGeneralForumTopic | hideGeneralForumTopic} method
 */
export interface HideGeneralForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.unhideGeneralForumTopic | unhideGeneralForumTopic} method
 */
export interface UnhideGeneralForumTopicParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.unpinAllGeneralForumTopicMessages | unpinAllGeneralForumTopicMessages} method
 */
export interface UnpinAllGeneralForumTopicMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.answerCallbackQuery | answerCallbackQuery} method
 */
export interface AnswerCallbackQueryParams {
    /**
     * Unique identifier for the query to be answered
     */
    callback_query_id: string
    /**
     * Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
     */
    text?: string
    /**
     * If *True*, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to *false*.
     */
    show_alert?: boolean
    /**
     * URL that will be opened by the user's client. If you have created a [Game](https://core.telegram.org/bots/api/#game) and accepted the conditions via [@BotFather](https://t.me/botfather), specify the URL that opens your game - note that this will only work if the query comes from a [*callback\_game*](https://core.telegram.org/bots/api/#inlinekeyboardbutton) button.
     *
     * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
     */
    url?: string
    /**
     * The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0.
     */
    cache_time?: number
}

/**
 * Params object for {@link APIMethods.getUserChatBoosts | getUserChatBoosts} method
 */
export interface GetUserChatBoostsParams {
    /**
     * Unique identifier for the chat or username of the channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier of the target user
     */
    user_id: number
}

/**
 * Params object for {@link APIMethods.getBusinessConnection | getBusinessConnection} method
 */
export interface GetBusinessConnectionParams {
    /**
     * Unique identifier of the business connection
     */
    business_connection_id: string
}

/**
 * Params object for {@link APIMethods.setMyCommands | setMyCommands} method
 */
export interface SetMyCommandsParams {
    /**
     * A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
     */
    commands: Objects.TelegramBotCommand[]
    /**
     * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
     */
    scope?: Objects.TelegramBotCommandScope
    /**
     * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.deleteMyCommands | deleteMyCommands} method
 */
export interface DeleteMyCommandsParams {
    /**
     * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
     */
    scope?: Objects.TelegramBotCommandScope
    /**
     * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.getMyCommands | getMyCommands} method
 */
export interface GetMyCommandsParams {
    /**
     * A JSON-serialized object, describing scope of users. Defaults to [BotCommandScopeDefault](https://core.telegram.org/bots/api/#botcommandscopedefault).
     */
    scope?: Objects.TelegramBotCommandScope
    /**
     * A two-letter ISO 639-1 language code or an empty string
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.setMyName | setMyName} method
 */
export interface SetMyNameParams {
    /**
     * New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language.
     */
    name?: string
    /**
     * A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name.
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.getMyName | getMyName} method
 */
export interface GetMyNameParams {
    /**
     * A two-letter ISO 639-1 language code or an empty string
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.setMyDescription | setMyDescription} method
 */
export interface SetMyDescriptionParams {
    /**
     * New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language.
     */
    description?: string
    /**
     * A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description.
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.getMyDescription | getMyDescription} method
 */
export interface GetMyDescriptionParams {
    /**
     * A two-letter ISO 639-1 language code or an empty string
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.setMyShortDescription | setMyShortDescription} method
 */
export interface SetMyShortDescriptionParams {
    /**
     * New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language.
     */
    short_description?: string
    /**
     * A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description.
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.getMyShortDescription | getMyShortDescription} method
 */
export interface GetMyShortDescriptionParams {
    /**
     * A two-letter ISO 639-1 language code or an empty string
     */
    language_code?: string
}

/**
 * Params object for {@link APIMethods.setChatMenuButton | setChatMenuButton} method
 */
export interface SetChatMenuButtonParams {
    /**
     * Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
     */
    chat_id?: number
    /**
     * A JSON-serialized object for the bot's new menu button. Defaults to [MenuButtonDefault](https://core.telegram.org/bots/api/#menubuttondefault)
     */
    menu_button?: Objects.TelegramMenuButton
}

/**
 * Params object for {@link APIMethods.getChatMenuButton | getChatMenuButton} method
 */
export interface GetChatMenuButtonParams {
    /**
     * Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
     */
    chat_id?: number
}

/**
 * Params object for {@link APIMethods.setMyDefaultAdministratorRights | setMyDefaultAdministratorRights} method
 */
export interface SetMyDefaultAdministratorRightsParams {
    /**
     * A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared.
     */
    rights?: Objects.TelegramChatAdministratorRights
    /**
     * Pass *True* to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
     */
    for_channels?: boolean
}

/**
 * Params object for {@link APIMethods.getMyDefaultAdministratorRights | getMyDefaultAdministratorRights} method
 */
export interface GetMyDefaultAdministratorRightsParams {
    /**
     * Pass *True* to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
     */
    for_channels?: boolean
}

/**
 * Params object for {@link APIMethods.editMessageText | editMessageText} method
 */
export interface EditMessageTextParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * New text of the message, 1-4096 characters after entities parsing
     */
    text: string | { toString(): string }
    /**
     * Mode for parsing entities in the message text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in message text, which can be specified instead of *parse\_mode*
     */
    entities?: Objects.TelegramMessageEntity[]
    /**
     * Link preview generation options for the message
     */
    link_preview_options?: Objects.TelegramLinkPreviewOptions
    /**
     * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.editMessageCaption | editMessageCaption} method
 */
export interface EditMessageCaptionParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * New caption of the message, 0-1024 characters after entities parsing
     */
    caption?: string | { toString(): string }
    /**
     * Mode for parsing entities in the message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details.
     */
    parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of *parse\_mode*
     */
    caption_entities?: Objects.TelegramMessageEntity[]
    /**
     * Pass *True*, if the caption must be shown above the message media. Supported only for animation, photo and video messages.
     */
    show_caption_above_media?: boolean
    /**
     * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.editMessageMedia | editMessageMedia} method
 */
export interface EditMessageMediaParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * A JSON-serialized object for a new media content of the message
     */
    media: Objects.TelegramInputMedia
    /**
     * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.editMessageLiveLocation | editMessageLiveLocation} method
 */
export interface EditMessageLiveLocationParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * Latitude of new location
     */
    latitude: number
    /**
     * Longitude of new location
     */
    longitude: number
    /**
     * New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current *live\_period* by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then *live\_period* remains unchanged
     */
    live_period?: number
    /**
     * The radius of uncertainty for the location, measured in meters; 0-1500
     */
    horizontal_accuracy?: number
    /**
     * Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
     */
    heading?: number
    /**
     * The maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
     */
    proximity_alert_radius?: number
    /**
     * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.stopMessageLiveLocation | stopMessageLiveLocation} method
 */
export interface StopMessageLiveLocationParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message with live location to stop
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.editMessageReplyMarkup | editMessageReplyMarkup} method
 */
export interface EditMessageReplyMarkupParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id?: number | string
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the message to edit
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
    /**
     * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.stopPoll | stopPoll} method
 */
export interface StopPollParams {
    /**
     * Unique identifier of the business connection on behalf of which the message to be edited was sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Identifier of the original message with the poll
     */
    message_id: number
    /**
     * A JSON-serialized object for a new message [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards).
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.deleteMessage | deleteMessage} method
 */
export interface DeleteMessageParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Identifier of the message to delete
     */
    message_id: number
}

/**
 * Params object for {@link APIMethods.deleteMessages | deleteMessages} method
 */
export interface DeleteMessagesParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * A JSON-serialized list of 1-100 identifiers of messages to delete. See [deleteMessage](https://core.telegram.org/bots/api/#deletemessage) for limitations on which messages can be deleted
     */
    message_ids: number[]
}

/**
 * Params object for {@link APIMethods.sendSticker | sendSticker} method
 */
export interface SendStickerParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Sticker to send. Pass a file\_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files). Video and animated stickers can't be sent via an HTTP URL.
     */
    sticker: Objects.TelegramInputFile | string
    /**
     * Emoji associated with the sticker; only for just uploaded stickers
     */
    emoji?: string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * Additional interface options. A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards), [custom reply keyboard](https://core.telegram.org/bots/features#keyboards), instructions to remove a reply keyboard or to force a reply from the user
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
        | Objects.TelegramReplyKeyboardMarkup
        | { toJSON(): Objects.TelegramReplyKeyboardMarkup }
        | Objects.TelegramReplyKeyboardRemove
        | { toJSON(): Objects.TelegramReplyKeyboardRemove }
        | Objects.TelegramForceReply
        | { toJSON(): Objects.TelegramForceReply }
}

/**
 * Params object for {@link APIMethods.getStickerSet | getStickerSet} method
 */
export interface GetStickerSetParams {
    /**
     * Name of the sticker set
     */
    name: string
}

/**
 * Params object for {@link APIMethods.getCustomEmojiStickers | getCustomEmojiStickers} method
 */
export interface GetCustomEmojiStickersParams {
    /**
     * A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
     */
    custom_emoji_ids: string[]
}

export type UploadStickerFileStickerFormat = "static" | "animated" | "video"

/**
 * Params object for {@link APIMethods.uploadStickerFile | uploadStickerFile} method
 */
export interface UploadStickerFileParams {
    /**
     * User identifier of sticker file owner
     */
    user_id: number
    /**
     * A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See [https://core.telegram.org/stickers](https://core.telegram.org/stickers) for technical requirements. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files)
     */
    sticker: Objects.TelegramInputFile
    /**
     * Format of the sticker, must be one of “static”, “animated”, “video”
     */
    sticker_format: UploadStickerFileStickerFormat
}

export type CreateNewStickerSetStickerType = "mask" | "custom_emoji"

/**
 * Params object for {@link APIMethods.createNewStickerSet | createNewStickerSet} method
 */
export interface CreateNewStickerSetParams {
    /**
     * User identifier of created sticker set owner
     */
    user_id: number
    /**
     * Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in `"_by_<bot_username>"`. `<bot_username>` is case insensitive. 1-64 characters.
     */
    name: string
    /**
     * Sticker set title, 1-64 characters
     */
    title: string
    /**
     * A JSON-serialized list of 1-50 initial stickers to be added to the sticker set
     */
    stickers: Objects.TelegramInputSticker[]
    /**
     * Type of stickers in the set, pass “regular”, “mask”, or “custom\_emoji”. By default, a regular sticker set is created.
     */
    sticker_type?: CreateNewStickerSetStickerType
    /**
     * Pass *True* if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only
     */
    needs_repainting?: boolean
}

/**
 * Params object for {@link APIMethods.addStickerToSet | addStickerToSet} method
 */
export interface AddStickerToSetParams {
    /**
     * User identifier of sticker set owner
     */
    user_id: number
    /**
     * Sticker set name
     */
    name: string
    /**
     * A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed.
     */
    sticker: Objects.TelegramInputSticker
}

/**
 * Params object for {@link APIMethods.setStickerPositionInSet | setStickerPositionInSet} method
 */
export interface SetStickerPositionInSetParams {
    /**
     * File identifier of the sticker
     */
    sticker: string
    /**
     * New sticker position in the set, zero-based
     */
    position: number
}

/**
 * Params object for {@link APIMethods.deleteStickerFromSet | deleteStickerFromSet} method
 */
export interface DeleteStickerFromSetParams {
    /**
     * File identifier of the sticker
     */
    sticker: string
}

/**
 * Params object for {@link APIMethods.replaceStickerInSet | replaceStickerInSet} method
 */
export interface ReplaceStickerInSetParams {
    /**
     * User identifier of the sticker set owner
     */
    user_id: number
    /**
     * Sticker set name
     */
    name: string
    /**
     * File identifier of the replaced sticker
     */
    old_sticker: string
    /**
     * A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged.
     */
    sticker: Objects.TelegramInputSticker
}

/**
 * Params object for {@link APIMethods.setStickerEmojiList | setStickerEmojiList} method
 */
export interface SetStickerEmojiListParams {
    /**
     * File identifier of the sticker
     */
    sticker: string
    /**
     * A JSON-serialized list of 1-20 emoji associated with the sticker
     */
    emoji_list: string[]
}

/**
 * Params object for {@link APIMethods.setStickerKeywords | setStickerKeywords} method
 */
export interface SetStickerKeywordsParams {
    /**
     * File identifier of the sticker
     */
    sticker: string
    /**
     * A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters
     */
    keywords?: string[]
}

/**
 * Params object for {@link APIMethods.setStickerMaskPosition | setStickerMaskPosition} method
 */
export interface SetStickerMaskPositionParams {
    /**
     * File identifier of the sticker
     */
    sticker: string
    /**
     * A JSON-serialized object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position.
     */
    mask_position?: Objects.TelegramMaskPosition
}

/**
 * Params object for {@link APIMethods.setStickerSetTitle | setStickerSetTitle} method
 */
export interface SetStickerSetTitleParams {
    /**
     * Sticker set name
     */
    name: string
    /**
     * Sticker set title, 1-64 characters
     */
    title: string
}

export type SetStickerSetThumbnailFormat = "static" | "animated" | "video"

/**
 * Params object for {@link APIMethods.setStickerSetThumbnail | setStickerSetThumbnail} method
 */
export interface SetStickerSetThumbnailParams {
    /**
     * Sticker set name
     */
    name: string
    /**
     * User identifier of the sticker set owner
     */
    user_id: number
    /**
     * A **.WEBP** or **.PNG** image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a **.TGS** animation with a thumbnail up to 32 kilobytes in size (see [https://core.telegram.org/stickers#animation-requirements](https://core.telegram.org/stickers#animation-requirements) for animated sticker technical requirements), or a **.WEBM** video with the thumbnail up to 32 kilobytes in size; see [https://core.telegram.org/stickers#video-requirements](https://core.telegram.org/stickers#video-requirements) for video sticker technical requirements. Pass a *file\_id* as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. [More information on Sending Files »](https://core.telegram.org/bots/api/#sending-files). Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail.
     */
    thumbnail?: Objects.TelegramInputFile | string
    /**
     * Format of the thumbnail, must be one of “static” for a **.WEBP** or **.PNG** image, “animated” for a **.TGS** animation, or “video” for a **.WEBM** video
     */
    format: SetStickerSetThumbnailFormat
}

/**
 * Params object for {@link APIMethods.setCustomEmojiStickerSetThumbnail | setCustomEmojiStickerSetThumbnail} method
 */
export interface SetCustomEmojiStickerSetThumbnailParams {
    /**
     * Sticker set name
     */
    name: string
    /**
     * Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail.
     */
    custom_emoji_id?: string
}

/**
 * Params object for {@link APIMethods.deleteStickerSet | deleteStickerSet} method
 */
export interface DeleteStickerSetParams {
    /**
     * Sticker set name
     */
    name: string
}

/**
 * Params object for {@link APIMethods.sendGift | sendGift} method
 */
export interface SendGiftParams {
    /**
     * Unique identifier of the target user that will receive the gift
     */
    user_id: number
    /**
     * Identifier of the gift
     */
    gift_id: string
    /**
     * Pass *True* to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver
     */
    pay_for_upgrade?: boolean
    /**
     * Text that will be shown along with the gift; 0-255 characters
     */
    text?: string | { toString(): string }
    /**
     * Mode for parsing entities in the text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom\_emoji” are ignored.
     */
    text_parse_mode?: "HTML" | "MarkdownV2" | "Markdown"
    /**
     * A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of *text\_parse\_mode*. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, and “custom\_emoji” are ignored.
     */
    text_entities?: Objects.TelegramMessageEntity[]
}

/**
 * Params object for {@link APIMethods.verifyUser | verifyUser} method
 */
export interface VerifyUserParams {
    /**
     * Unique identifier of the target user
     */
    user_id: number
    /**
     * Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
     */
    custom_description?: string
}

/**
 * Params object for {@link APIMethods.verifyChat | verifyChat} method
 */
export interface VerifyChatParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description.
     */
    custom_description?: string
}

/**
 * Params object for {@link APIMethods.removeUserVerification | removeUserVerification} method
 */
export interface RemoveUserVerificationParams {
    /**
     * Unique identifier of the target user
     */
    user_id: number
}

/**
 * Params object for {@link APIMethods.removeChatVerification | removeChatVerification} method
 */
export interface RemoveChatVerificationParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
}

/**
 * Params object for {@link APIMethods.answerInlineQuery | answerInlineQuery} method
 */
export interface AnswerInlineQueryParams {
    /**
     * Unique identifier for the answered query
     */
    inline_query_id: string
    /**
     * A JSON-serialized array of results for the inline query
     */
    results: Objects.TelegramInlineQueryResult[]
    /**
     * The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300.
     */
    cache_time?: number
    /**
     * Pass *True* if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query.
     */
    is_personal?: boolean
    /**
     * Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes.
     */
    next_offset?: string
    /**
     * A JSON-serialized object describing a button to be shown above inline query results
     */
    button?: Objects.TelegramInlineQueryResultsButton
}

/**
 * Params object for {@link APIMethods.answerWebAppQuery | answerWebAppQuery} method
 */
export interface AnswerWebAppQueryParams {
    /**
     * Unique identifier for the query to be answered
     */
    web_app_query_id: string
    /**
     * A JSON-serialized object describing the message to be sent
     */
    result: Objects.TelegramInlineQueryResult
}

/**
 * Params object for {@link APIMethods.savePreparedInlineMessage | savePreparedInlineMessage} method
 */
export interface SavePreparedInlineMessageParams {
    /**
     * Unique identifier of the target user that can use the prepared message
     */
    user_id: number
    /**
     * A JSON-serialized object describing the message to be sent
     */
    result: Objects.TelegramInlineQueryResult
    /**
     * Pass *True* if the message can be sent to private chats with users
     */
    allow_user_chats?: boolean
    /**
     * Pass *True* if the message can be sent to private chats with bots
     */
    allow_bot_chats?: boolean
    /**
     * Pass *True* if the message can be sent to group and supergroup chats
     */
    allow_group_chats?: boolean
    /**
     * Pass *True* if the message can be sent to channel chats
     */
    allow_channel_chats?: boolean
}

/**
 * Params object for {@link APIMethods.sendInvoice | sendInvoice} method
 */
export interface SendInvoiceParams {
    /**
     * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    chat_id: number | string
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Product name, 1-32 characters
     */
    title: string
    /**
     * Product description, 1-255 characters
     */
    description: string
    /**
     * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes.
     */
    payload: string
    /**
     * Payment provider token, obtained via [@BotFather](https://t.me/botfather). Pass an empty string for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    provider_token?: string
    /**
     * Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies). Pass “XTR” for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    currency: Objects.TelegramCurrencies
    /**
     * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    prices: Objects.TelegramLabeledPrice[]
    /**
     * The maximum accepted amount for tips in the *smallest units* of the currency (integer, **not** float/double). For example, for a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    max_tip_amount?: number
    /**
     * A JSON-serialized array of suggested amounts of tips in the *smallest units* of the currency (integer, **not** float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed *max\_tip\_amount*.
     */
    suggested_tip_amounts?: number[]
    /**
     * Unique deep-linking parameter. If left empty, **forwarded copies** of the sent message will have a *Pay* button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a *URL* button with a deep link to the bot (instead of a *Pay* button), with the value used as the start parameter
     */
    start_parameter?: string
    /**
     * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
     */
    provider_data?: string
    /**
     * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for.
     */
    photo_url?: string
    /**
     * Photo size in bytes
     */
    photo_size?: number
    /**
     * Photo width
     */
    photo_width?: number
    /**
     * Photo height
     */
    photo_height?: number
    /**
     * Pass *True* if you require the user's full name to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_name?: boolean
    /**
     * Pass *True* if you require the user's phone number to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_phone_number?: boolean
    /**
     * Pass *True* if you require the user's email address to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_email?: boolean
    /**
     * Pass *True* if you require the user's shipping address to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_shipping_address?: boolean
    /**
     * Pass *True* if the user's phone number should be sent to the provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    send_phone_number_to_provider?: boolean
    /**
     * Pass *True* if the user's email address should be sent to the provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    send_email_to_provider?: boolean
    /**
     * Pass *True* if the final price depends on the shipping method. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    is_flexible?: boolean
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Pay `total price`' button will be shown. If not empty, the first button must be a Pay button.
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.createInvoiceLink | createInvoiceLink} method
 */
export interface CreateInvoiceLinkParams {
    /**
     * Unique identifier of the business connection on behalf of which the link will be created. For payments in [Telegram Stars](https://t.me/BotNews/90) only.
     */
    business_connection_id?: string
    /**
     * Product name, 1-32 characters
     */
    title: string
    /**
     * Product description, 1-255 characters
     */
    description: string
    /**
     * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes.
     */
    payload: string
    /**
     * Payment provider token, obtained via [@BotFather](https://t.me/botfather). Pass an empty string for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    provider_token?: string
    /**
     * Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies). Pass “XTR” for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    currency: Objects.TelegramCurrencies
    /**
     * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    prices: Objects.TelegramLabeledPrice[]
    /**
     * The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. Any number of subscriptions can be active for a given bot at the same time, including multiple concurrent subscriptions from the same user. Subscription price must no exceed 2500 Telegram Stars.
     */
    subscription_period?: number
    /**
     * The maximum accepted amount for tips in the *smallest units* of the currency (integer, **not** float/double). For example, for a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    max_tip_amount?: number
    /**
     * A JSON-serialized array of suggested amounts of tips in the *smallest units* of the currency (integer, **not** float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed *max\_tip\_amount*.
     */
    suggested_tip_amounts?: number[]
    /**
     * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
     */
    provider_data?: string
    /**
     * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
     */
    photo_url?: string
    /**
     * Photo size in bytes
     */
    photo_size?: number
    /**
     * Photo width
     */
    photo_width?: number
    /**
     * Photo height
     */
    photo_height?: number
    /**
     * Pass *True* if you require the user's full name to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_name?: boolean
    /**
     * Pass *True* if you require the user's phone number to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_phone_number?: boolean
    /**
     * Pass *True* if you require the user's email address to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_email?: boolean
    /**
     * Pass *True* if you require the user's shipping address to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    need_shipping_address?: boolean
    /**
     * Pass *True* if the user's phone number should be sent to the provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    send_phone_number_to_provider?: boolean
    /**
     * Pass *True* if the user's email address should be sent to the provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    send_email_to_provider?: boolean
    /**
     * Pass *True* if the final price depends on the shipping method. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).
     */
    is_flexible?: boolean
}

/**
 * Params object for {@link APIMethods.answerShippingQuery | answerShippingQuery} method
 */
export interface AnswerShippingQueryParams {
    /**
     * Unique identifier for the query to be answered
     */
    shipping_query_id: string
    /**
     * Pass *True* if delivery to the specified address is possible and *False* if there are any problems (for example, if delivery to the specified address is not possible)
     */
    ok: boolean
    /**
     * Required if *ok* is *True*. A JSON-serialized array of available shipping options.
     */
    shipping_options?: Objects.TelegramShippingOption[]
    /**
     * Required if *ok* is *False*. Error message in human readable form that explains why it is impossible to complete the order (e.g. “Sorry, delivery to your desired address is unavailable”). Telegram will display this message to the user.
     */
    error_message?: string
}

/**
 * Params object for {@link APIMethods.answerPreCheckoutQuery | answerPreCheckoutQuery} method
 */
export interface AnswerPreCheckoutQueryParams {
    /**
     * Unique identifier for the query to be answered
     */
    pre_checkout_query_id: string
    /**
     * Specify *True* if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use *False* if there are any problems.
     */
    ok: boolean
    /**
     * Required if *ok* is *False*. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
     */
    error_message?: string
}

/**
 * Params object for {@link APIMethods.getStarTransactions | getStarTransactions} method
 */
export interface GetStarTransactionsParams {
    /**
     * Number of transactions to skip in the response
     */
    offset?: number
    /**
     * The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100.
     */
    limit?: number
}

/**
 * Params object for {@link APIMethods.refundStarPayment | refundStarPayment} method
 */
export interface RefundStarPaymentParams {
    /**
     * Identifier of the user whose payment will be refunded
     */
    user_id: number
    /**
     * Telegram payment identifier
     */
    telegram_payment_charge_id: string
}

/**
 * Params object for {@link APIMethods.editUserStarSubscription | editUserStarSubscription} method
 */
export interface EditUserStarSubscriptionParams {
    /**
     * Identifier of the user whose subscription will be edited
     */
    user_id: number
    /**
     * Telegram payment identifier for the subscription
     */
    telegram_payment_charge_id: string
    /**
     * Pass *True* to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass *False* to allow the user to re-enable a subscription that was previously canceled by the bot.
     */
    is_canceled: boolean
}

/**
 * Params object for {@link APIMethods.setPassportDataErrors | setPassportDataErrors} method
 */
export interface SetPassportDataErrorsParams {
    /**
     * User identifier
     */
    user_id: number
    /**
     * A JSON-serialized array describing the errors
     */
    errors: Objects.TelegramPassportElementError[]
}

/**
 * Params object for {@link APIMethods.sendGame | sendGame} method
 */
export interface SendGameParams {
    /**
     * Unique identifier of the business connection on behalf of which the message will be sent
     */
    business_connection_id?: string
    /**
     * Unique identifier for the target chat
     */
    chat_id: number
    /**
     * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only
     */
    message_thread_id?: number
    /**
     * Short name of the game, serves as the unique identifier for the game. Set up your games via [@BotFather](https://t.me/botfather).
     */
    game_short_name: string
    /**
     * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
     */
    disable_notification?: boolean
    /**
     * Protects the contents of the sent message from forwarding and saving
     */
    protect_content?: boolean
    /**
     * Pass *True* to allow up to 1000 messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance
     */
    allow_paid_broadcast?: boolean
    /**
     * Unique identifier of the message effect to be added to the message; for private chats only
     */
    message_effect_id?: string
    /**
     * Description of the message to reply to
     */
    reply_parameters?: Objects.TelegramReplyParameters
    /**
     * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots/features#inline-keyboards). If empty, one 'Play game\_title' button will be shown. If not empty, the first button must launch the game.
     */
    reply_markup?:
        | Objects.TelegramInlineKeyboardMarkup
        | { toJSON(): Objects.TelegramInlineKeyboardMarkup }
}

/**
 * Params object for {@link APIMethods.setGameScore | setGameScore} method
 */
export interface SetGameScoreParams {
    /**
     * User identifier
     */
    user_id: number
    /**
     * New score, must be non-negative
     */
    score: number
    /**
     * Pass *True* if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters
     */
    force?: boolean
    /**
     * Pass *True* if the game message should not be automatically edited to include the current scoreboard
     */
    disable_edit_message?: boolean
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat
     */
    chat_id?: number
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the sent message
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
}

/**
 * Params object for {@link APIMethods.getGameHighScores | getGameHighScores} method
 */
export interface GetGameHighScoresParams {
    /**
     * Target user id
     */
    user_id: number
    /**
     * Required if *inline\_message\_id* is not specified. Unique identifier for the target chat
     */
    chat_id?: number
    /**
     * Required if *inline\_message\_id* is not specified. Identifier of the sent message
     */
    message_id?: number
    /**
     * Required if *chat\_id* and *message\_id* are not specified. Identifier of the inline message
     */
    inline_message_id?: string
}
