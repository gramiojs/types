/**
 * Based on Bot API 10.3; generated from Swagger/OpenAPI JSON. Do not edit.
 */

import type * as Objects from "./objects"
import type * as Params from "./params"
import type {
    CallAPI,
    CallAPIWithOptionalParams,
    CallAPIWithoutParams,
} from "./utils"

export interface APIMethods {
    /**
     * Use this method to receive incoming updates using long polling ([wiki](https://en.wikipedia.org/wiki/Push_technology#Long_polling)). Returns an Array of [Update](https://core.telegram.org/bots/api#update) objects on success.
     *
     * >**Notes**
     * **1.** This method will not work if an outgoing webhook is set up.
     * **2.** In order to avoid getting duplicate updates, recalculate *offset* after each server response.
     */
    getUpdates: CallAPIWithOptionalParams<
        Params.GetUpdatesParams,
        Objects.TelegramUpdate[]
    >
    /**
     * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized [Update](https://core.telegram.org/bots/api#update). In case of an unsuccessful request (a request with response [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) different from `2XY`), we will repeat the request and give up after a reasonable amount of attempts. Returns *True* on success.
     *
     * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter *secret_token*. If specified, the request will contain a header "X-Telegram-Bot-Api-Secret-Token" with the secret token as content. If the URL contains a username and a password, as in `https://username:password@example.com/webhook`, the request will also contain them in a header "Authorization", using HTTP basic authentication.
     *
     * >**Notes**
     * **1.** You will not be able to receive updates using [getUpdates](https://core.telegram.org/bots/api#getupdates) for as long as an outgoing webhook is set up.
     * **2.** To use a self-signed certificate, you need to upload your [public key certificate](https://core.telegram.org/bots/self-signed) using *certificate* parameter. Please upload as InputFile, sending a String will not work.
     * **3.** Ports currently supported *for webhooks*: **443, 80, 88, 8443**.
     *
     * >If you're having any trouble setting up webhooks, please check out this [amazing guide to webhooks](https://core.telegram.org/bots/webhooks).
     */
    setWebhook: CallAPI<Params.SetWebhookParams, true>
    /**
     * Use this method to remove webhook integration if you decide to switch back to [getUpdates](https://core.telegram.org/bots/api#getupdates). Returns *True* on success.
     */
    deleteWebhook: CallAPIWithOptionalParams<Params.DeleteWebhookParams, true>
    /**
     * Use this method to get current webhook status. If the bot is using [getUpdates](https://core.telegram.org/bots/api#getupdates), will return an object with the *url* field empty. Returns [WebhookInfo](https://core.telegram.org/bots/api#webhookinfo) on success.
     */
    getWebhookInfo: CallAPIWithoutParams<Objects.TelegramWebhookInfo>
    /**
     * A simple method for testing your bot's authentication token. Returns basic information about the bot as [User](https://core.telegram.org/bots/api#user) on success.
     */
    getMe: CallAPIWithoutParams<Objects.TelegramUser>
    /**
     * Use this method to log out from the cloud Bot API server before launching the bot locally. You **must** log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns *True* on success.
     */
    logOut: CallAPIWithoutParams<true>
    /**
     * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns *True* on success.
     */
    close: CallAPIWithoutParams<true>
    /**
     * Use this method to send text messages. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendMessage: CallAPI<Params.SendMessageParams, Objects.TelegramMessage>
    /**
     * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    forwardMessage: CallAPI<
        Params.ForwardMessageParams,
        Objects.TelegramMessage
    >
    /**
     * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. Returns the identifiers of the sent messages as an Array of [MessageId](https://core.telegram.org/bots/api#messageid) objects on success.
     */
    forwardMessages: CallAPI<
        Params.ForwardMessagesParams,
        Objects.TelegramMessageId[]
    >
    /**
     * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api#poll) can be copied only if the value of the field *correct_option_ids* is known to the bot. The method is analogous to the method [forwardMessage](https://core.telegram.org/bots/api#forwardmessage), but the copied message doesn't have a link to the original message. The sent [Message](https://core.telegram.org/bots/api#message) is returned only for messages sent on behalf of a business account. Returns [MessageId](https://core.telegram.org/bots/api#messageid) or [Message](https://core.telegram.org/bots/api#message) on success.
     */
    copyMessage: CallAPI<
        Params.CopyMessageParams,
        Objects.TelegramMessageId | Objects.TelegramMessage
    >
    /**
     * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api#poll) can be copied only if the value of the field *correct_option_ids* is known to the bot. The method is analogous to the method [forwardMessages](https://core.telegram.org/bots/api#forwardmessages), but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. Returns the identifiers of the sent messages as an Array of [MessageId](https://core.telegram.org/bots/api#messageid) objects on success.
     */
    copyMessages: CallAPI<
        Params.CopyMessagesParams,
        Objects.TelegramMessageId[]
    >
    /**
     * Use this method to send photos. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendPhoto: CallAPI<Params.SendPhotoParams, Objects.TelegramMessage>
    /**
     * Use this method to send live photos. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendLivePhoto: CallAPI<Params.SendLivePhotoParams, Objects.TelegramMessage>
    /**
     * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     *
     * For sending voice messages, use the [sendVoice](https://core.telegram.org/bots/api#sendvoice) method instead.
     */
    sendAudio: CallAPI<Params.SendAudioParams, Objects.TelegramMessage>
    /**
     * Use this method to send general files. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendDocument: CallAPI<Params.SendDocumentParams, Objects.TelegramMessage>
    /**
     * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as [Document](https://core.telegram.org/bots/api#document)). Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendVideo: CallAPI<Params.SendVideoParams, Objects.TelegramMessage>
    /**
     * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendAnimation: CallAPI<Params.SendAnimationParams, Objects.TelegramMessage>
    /**
     * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as [Audio](https://core.telegram.org/bots/api#audio) or [Document](https://core.telegram.org/bots/api#document)). Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendVoice: CallAPI<Params.SendVoiceParams, Objects.TelegramMessage>
    /**
     * Use this method to send a rounded square MPEG4 video of up to 1 minute long. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendVideoNote: CallAPI<Params.SendVideoNoteParams, Objects.TelegramMessage>
    /**
     * Use this method to send paid media. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendPaidMedia: CallAPI<Params.SendPaidMediaParams, Objects.TelegramMessage>
    /**
     * Use this method to send a group of photos, live photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. Returns an Array of [Message](https://core.telegram.org/bots/api#message) objects on success.
     */
    sendMediaGroup: CallAPI<
        Params.SendMediaGroupParams,
        Objects.TelegramMessage[]
    >
    /**
     * Use this method to send point on the map. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendLocation: CallAPI<Params.SendLocationParams, Objects.TelegramMessage>
    /**
     * Use this method to send information about a venue. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendVenue: CallAPI<Params.SendVenueParams, Objects.TelegramMessage>
    /**
     * Use this method to send phone contacts. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendContact: CallAPI<Params.SendContactParams, Objects.TelegramMessage>
    /**
     * Use this method to send a native poll. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendPoll: CallAPI<Params.SendPollParams, Objects.TelegramMessage>
    /**
     * Use this method to send a checklist on behalf of a connected business account. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendChecklist: CallAPI<Params.SendChecklistParams, Objects.TelegramMessage>
    /**
     * Use this method to send an animated emoji that will display a random value. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendDice: CallAPI<Params.SendDiceParams, Objects.TelegramMessage>
    /**
     * Use this method to stream a partial message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you **must** call [sendMessage](https://core.telegram.org/bots/api#sendmessage) with the complete message to persist it in the user's chat. Returns *True* on success.
     */
    sendMessageDraft: CallAPI<Params.SendMessageDraftParams, true>
    /**
     * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns *True* on success.
     *
     * >Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use [sendChatAction](https://core.telegram.org/bots/api#sendchataction) with *action* = *upload_photo*. The user will see a "sending photo" status for the bot.
     *
     * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
     */
    sendChatAction: CallAPI<Params.SendChatActionParams, true>
    /**
     * Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns *True* on success.
     */
    setMessageReaction: CallAPI<Params.SetMessageReactionParams, true>
    /**
     * Use this method to get a list of profile pictures for a user. Returns [UserProfilePhotos](https://core.telegram.org/bots/api#userprofilephotos) on success.
     */
    getUserProfilePhotos: CallAPI<
        Params.GetUserProfilePhotosParams,
        Objects.TelegramUserProfilePhotos
    >
    /**
     * Use this method to get a list of profile audios for a user. Returns [UserProfileAudios](https://core.telegram.org/bots/api#userprofileaudios) on success.
     */
    getUserProfileAudios: CallAPI<
        Params.GetUserProfileAudiosParams,
        Objects.TelegramUserProfileAudios
    >
    /**
     * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method [requestEmojiStatusAccess](https://core.telegram.org/bots/webapps#initializing-mini-apps). Returns *True* on success.
     */
    setUserEmojiStatus: CallAPI<Params.SetUserEmojiStatusParams, true>
    /**
     * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling [getFile](https://core.telegram.org/bots/api#getfile) again. Returns [File](https://core.telegram.org/bots/api#file) on success.
     *
     * **Note:** This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received.
     */
    getFile: CallAPI<Params.GetFileParams, Objects.TelegramFile>
    /**
     * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless [unbanned](https://core.telegram.org/bots/api#unbanchatmember) first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    banChatMember: CallAPI<Params.BanChatMemberParams, true>
    /**
     * Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat. If you don't want this, use the parameter *only_if_banned*. Returns *True* on success.
     */
    unbanChatMember: CallAPI<Params.UnbanChatMemberParams, true>
    /**
     * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass *True* for all permissions to lift restrictions from a user. Returns *True* on success.
     */
    restrictChatMember: CallAPI<Params.RestrictChatMemberParams, true>
    /**
     * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass *False* for all boolean parameters to demote a user. Returns *True* on success.
     */
    promoteChatMember: CallAPI<Params.PromoteChatMemberParams, true>
    /**
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns *True* on success.
     */
    setChatAdministratorCustomTitle: CallAPI<
        Params.SetChatAdministratorCustomTitleParams,
        true
    >
    /**
     * Use this method to set a tag for a regular member in a group or a supergroup. The bot must be an administrator in the chat for this to work and must have the *can_manage_tags* administrator right. Returns *True* on success.
     */
    setChatMemberTag: CallAPI<Params.SetChatMemberTagParams, true>
    /**
     * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is [unbanned](https://core.telegram.org/bots/api#unbanchatsenderchat), the owner of the banned chat won't be able to send messages on behalf of **any of their channels**. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    banChatSenderChat: CallAPI<Params.BanChatSenderChatParams, true>
    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    unbanChatSenderChat: CallAPI<Params.UnbanChatSenderChatParams, true>
    /**
     * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the *can_restrict_members* administrator rights. Returns *True* on success.
     */
    setChatPermissions: CallAPI<Params.SetChatPermissionsParams, true>
    /**
     * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as *String* on success.
     *
     * >Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) or by calling the [getChat](https://core.telegram.org/bots/api#getchat) method. If your bot needs to generate a new primary invite link replacing its previous one, use [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink) again.
     */
    exportChatInviteLink: CallAPI<Params.ExportChatInviteLinkParams, string>
    /**
     * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api#revokechatinvitelink). Returns the new invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) on success.
     */
    createChatInviteLink: CallAPI<
        Params.CreateChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) on success.
     */
    editChatInviteLink: CallAPI<
        Params.EditChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to create a [subscription invite link](https://telegram.org/blog/superchannels-star-reactions-subscriptions#star-subscriptions) for a channel chat. The bot must have the *can_invite_users* administrator rights. The link can be edited using the method [editChatSubscriptionInviteLink](https://core.telegram.org/bots/api#editchatsubscriptioninvitelink) or revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api#revokechatinvitelink). Returns the new invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) on success.
     */
    createChatSubscriptionInviteLink: CallAPI<
        Params.CreateChatSubscriptionInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to edit a subscription invite link created by the bot. The bot must have the *can_invite_users* administrator rights. Returns the edited invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) on success.
     */
    editChatSubscriptionInviteLink: CallAPI<
        Params.EditChatSubscriptionInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as [ChatInviteLink](https://core.telegram.org/bots/api#chatinvitelink) on success.
     */
    revokeChatInviteLink: CallAPI<
        Params.RevokeChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the *can_invite_users* administrator right. Returns *True* on success.
     */
    approveChatJoinRequest: CallAPI<Params.ApproveChatJoinRequestParams, true>
    /**
     * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the *can_invite_users* administrator right. Returns *True* on success.
     */
    declineChatJoinRequest: CallAPI<Params.DeclineChatJoinRequestParams, true>
    /**
     * Use this method to process a received chat join request query. Returns *True* on success.
     */
    answerChatJoinRequestQuery: CallAPI<
        Params.AnswerChatJoinRequestQueryParams,
        true
    >
    /**
     * Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Call [answerChatJoinRequestQuery](https://core.telegram.org/bots/api#answerchatjoinrequestquery) to resolve the join request query based on the user interaction with the Mini App. Returns *True* on success.
     */
    sendChatJoinRequestWebApp: CallAPI<
        Params.SendChatJoinRequestWebAppParams,
        true
    >
    /**
     * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    setChatPhoto: CallAPI<Params.SetChatPhotoParams, true>
    /**
     * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    deleteChatPhoto: CallAPI<Params.DeleteChatPhotoParams, true>
    /**
     * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    setChatTitle: CallAPI<Params.SetChatTitleParams, true>
    /**
     * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     */
    setChatDescription: CallAPI<Params.SetChatDescriptionParams, true>
    /**
     * Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns *True* on success.
     */
    pinChatMessage: CallAPI<Params.PinChatMessageParams, true>
    /**
     * Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns *True* on success.
     */
    unpinChatMessage: CallAPI<Params.UnpinChatMessageParams, true>
    /**
     * Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively. Returns *True* on success.
     */
    unpinAllChatMessages: CallAPI<Params.UnpinAllChatMessagesParams, true>
    /**
     * Use this method for your bot to leave a group, supergroup or channel. Returns *True* on success.
     */
    leaveChat: CallAPI<Params.LeaveChatParams, true>
    /**
     * Use this method to get up-to-date information about the chat. Returns [ChatFullInfo](https://core.telegram.org/bots/api#chatfullinfo) on success.
     */
    getChat: CallAPI<Params.GetChatParams, Objects.TelegramChatFullInfo>
    /**
     * Use this method to get a list of administrators in a chat. Returns an Array of [ChatMember](https://core.telegram.org/bots/api#chatmember) objects on success.
     */
    getChatAdministrators: CallAPI<
        Params.GetChatAdministratorsParams,
        Objects.TelegramChatMember[]
    >
    /**
     * Use this method to get the number of members in a chat. Returns *Integer* on success.
     */
    getChatMemberCount: CallAPI<Params.GetChatMemberCountParams, number>
    /**
     * Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns [ChatMember](https://core.telegram.org/bots/api#chatmember) on success.
     */
    getChatMember: CallAPI<
        Params.GetChatMemberParams,
        Objects.TelegramChatMember
    >
    /**
     * Use this method to get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user. Returns an Array of [Message](https://core.telegram.org/bots/api#message) objects on success.
     */
    getUserPersonalChatMessages: CallAPI<
        Params.GetUserPersonalChatMessagesParams,
        Objects.TelegramMessage[]
    >
    /**
     * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can_set_sticker_set* optionally returned in [getChat](https://core.telegram.org/bots/api#getchat) requests to check if the bot can use this method. Returns *True* on success.
     */
    setChatStickerSet: CallAPI<Params.SetChatStickerSetParams, true>
    /**
     * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can_set_sticker_set* optionally returned in [getChat](https://core.telegram.org/bots/api#getchat) requests to check if the bot can use this method. Returns *True* on success.
     */
    deleteChatStickerSet: CallAPI<Params.DeleteChatStickerSetParams, true>
    /**
     * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Returns an Array of [Sticker](https://core.telegram.org/bots/api#sticker) objects on success.
     */
    getForumTopicIconStickers: CallAPIWithoutParams<Objects.TelegramSticker[]>
    /**
     * Use this method to create a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator right. Returns information about the created topic as [ForumTopic](https://core.telegram.org/bots/api#forumtopic) on success.
     */
    createForumTopic: CallAPI<
        Params.CreateForumTopicParams,
        Objects.TelegramForumTopic
    >
    /**
     * Use this method to edit name and icon of a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     */
    editForumTopic: CallAPI<Params.EditForumTopicParams, true>
    /**
     * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     */
    closeForumTopic: CallAPI<Params.CloseForumTopicParams, true>
    /**
     * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     */
    reopenForumTopic: CallAPI<Params.ReopenForumTopicParams, true>
    /**
     * Use this method to delete a forum topic along with all its messages in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the *can_delete_messages* administrator rights. Returns *True* on success.
     */
    deleteForumTopic: CallAPI<Params.DeleteForumTopicParams, true>
    /**
     * Use this method to clear the list of pinned messages in a forum topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the *can_pin_messages* administrator right in the supergroup. Returns *True* on success.
     */
    unpinAllForumTopicMessages: CallAPI<
        Params.UnpinAllForumTopicMessagesParams,
        true
    >
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights. Returns *True* on success.
     */
    editGeneralForumTopic: CallAPI<Params.EditGeneralForumTopicParams, true>
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights. Returns *True* on success.
     */
    closeGeneralForumTopic: CallAPI<Params.CloseGeneralForumTopicParams, true>
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights. The topic will be automatically unhidden if it was hidden. Returns *True* on success.
     */
    reopenGeneralForumTopic: CallAPI<Params.ReopenGeneralForumTopicParams, true>
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights. The topic will be automatically closed if it was open. Returns *True* on success.
     */
    hideGeneralForumTopic: CallAPI<Params.HideGeneralForumTopicParams, true>
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can_manage_topics* administrator rights. Returns *True* on success.
     */
    unhideGeneralForumTopic: CallAPI<Params.UnhideGeneralForumTopicParams, true>
    /**
     * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the *can_pin_messages* administrator right in the supergroup. Returns *True* on success.
     */
    unpinAllGeneralForumTopicMessages: CallAPI<
        Params.UnpinAllGeneralForumTopicMessagesParams,
        true
    >
    /**
     * Use this method to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards). The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. Returns *True* on success.
     *
     * > Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via [@BotFather](https://t.me/botfather) and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
     */
    answerCallbackQuery: CallAPI<Params.AnswerCallbackQueryParams, true>
    /**
     * Use this method to reply to a received guest message. Returns [SentGuestMessage](https://core.telegram.org/bots/api#sentguestmessage) on success.
     */
    answerGuestQuery: CallAPI<
        Params.AnswerGuestQueryParams,
        Objects.TelegramSentGuestMessage
    >
    /**
     * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns [UserChatBoosts](https://core.telegram.org/bots/api#userchatboosts) on success.
     */
    getUserChatBoosts: CallAPI<
        Params.GetUserChatBoostsParams,
        Objects.TelegramUserChatBoosts
    >
    /**
     * Use this method to get information about the connection of the bot with a business account. Returns [BusinessConnection](https://core.telegram.org/bots/api#businessconnection) on success.
     */
    getBusinessConnection: CallAPI<
        Params.GetBusinessConnectionParams,
        Objects.TelegramBusinessConnection
    >
    /**
     * Use this method to get the token of a managed bot. Returns the token as *String* on success.
     */
    getManagedBotToken: CallAPI<Params.GetManagedBotTokenParams, string>
    /**
     * Use this method to revoke the current token of a managed bot and generate a new one. Returns the new token as *String* on success.
     */
    replaceManagedBotToken: CallAPI<Params.ReplaceManagedBotTokenParams, string>
    /**
     * Use this method to get the access settings of a managed bot. Returns [BotAccessSettings](https://core.telegram.org/bots/api#botaccesssettings) on success.
     */
    getManagedBotAccessSettings: CallAPI<
        Params.GetManagedBotAccessSettingsParams,
        Objects.TelegramBotAccessSettings
    >
    /**
     * Use this method to change the access settings of a managed bot. Returns *True* on success.
     */
    setManagedBotAccessSettings: CallAPI<
        Params.SetManagedBotAccessSettingsParams,
        true
    >
    /**
     * Use this method to change the list of the bot's commands. See [this manual](https://core.telegram.org/bots/features#commands) for more details about bot commands. Returns *True* on success.
     */
    setMyCommands: CallAPI<Params.SetMyCommandsParams, true>
    /**
     * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, [higher level commands](https://core.telegram.org/bots/api#determining-list-of-commands) will be shown to affected users. Returns *True* on success.
     */
    deleteMyCommands: CallAPIWithOptionalParams<
        Params.DeleteMyCommandsParams,
        true
    >
    /**
     * Use this method to get the current list of the bot's commands for the given scope and user language. If commands aren't set, an empty list is returned. Returns an Array of [BotCommand](https://core.telegram.org/bots/api#botcommand) objects on success.
     */
    getMyCommands: CallAPIWithOptionalParams<
        Params.GetMyCommandsParams,
        Objects.TelegramBotCommand[]
    >
    /**
     * Use this method to change the bot's name. Returns *True* on success.
     */
    setMyName: CallAPIWithOptionalParams<Params.SetMyNameParams, true>
    /**
     * Use this method to get the current bot name for the given user language. Returns [BotName](https://core.telegram.org/bots/api#botname) on success.
     */
    getMyName: CallAPIWithOptionalParams<
        Params.GetMyNameParams,
        Objects.TelegramBotName
    >
    /**
     * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns *True* on success.
     */
    setMyDescription: CallAPIWithOptionalParams<
        Params.SetMyDescriptionParams,
        true
    >
    /**
     * Use this method to get the current bot description for the given user language. Returns [BotDescription](https://core.telegram.org/bots/api#botdescription) on success.
     */
    getMyDescription: CallAPIWithOptionalParams<
        Params.GetMyDescriptionParams,
        Objects.TelegramBotDescription
    >
    /**
     * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns *True* on success.
     */
    setMyShortDescription: CallAPIWithOptionalParams<
        Params.SetMyShortDescriptionParams,
        true
    >
    /**
     * Use this method to get the current bot short description for the given user language. Returns [BotShortDescription](https://core.telegram.org/bots/api#botshortdescription) on success.
     */
    getMyShortDescription: CallAPIWithOptionalParams<
        Params.GetMyShortDescriptionParams,
        Objects.TelegramBotShortDescription
    >
    /**
     * Changes the profile photo of the bot. Returns *True* on success.
     */
    setMyProfilePhoto: CallAPI<Params.SetMyProfilePhotoParams, true>
    /**
     * Removes the profile photo of the bot. Returns *True* on success.
     */
    removeMyProfilePhoto: CallAPIWithoutParams<true>
    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns *True* on success.
     */
    setChatMenuButton: CallAPIWithOptionalParams<
        Params.SetChatMenuButtonParams,
        true
    >
    /**
     * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns [MenuButton](https://core.telegram.org/bots/api#menubutton) on success.
     */
    getChatMenuButton: CallAPIWithOptionalParams<
        Params.GetChatMenuButtonParams,
        Objects.TelegramMenuButton
    >
    /**
     * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns *True* on success.
     */
    setMyDefaultAdministratorRights: CallAPIWithOptionalParams<
        Params.SetMyDefaultAdministratorRightsParams,
        true
    >
    /**
     * Use this method to get the current default administrator rights of the bot. Returns [ChatAdministratorRights](https://core.telegram.org/bots/api#chatadministratorrights) on success.
     */
    getMyDefaultAdministratorRights: CallAPIWithOptionalParams<
        Params.GetMyDefaultAdministratorRightsParams,
        Objects.TelegramChatAdministratorRights
    >
    /**
     * Returns the list of gifts that can be sent by the bot to users and channel chats. Returns [Gifts](https://core.telegram.org/bots/api#gifts) on success.
     */
    getAvailableGifts: CallAPIWithoutParams<Objects.TelegramGifts>
    /**
     * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns *True* on success.
     */
    sendGift: CallAPI<Params.SendGiftParams, true>
    /**
     * Gifts a Telegram Premium subscription to the given user. Returns *True* on success.
     */
    giftPremiumSubscription: CallAPI<Params.GiftPremiumSubscriptionParams, true>
    /**
     * Verifies a user [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns *True* on success.
     */
    verifyUser: CallAPI<Params.VerifyUserParams, true>
    /**
     * Verifies a chat [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns *True* on success.
     */
    verifyChat: CallAPI<Params.VerifyChatParams, true>
    /**
     * Removes verification from a user who is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns *True* on success.
     */
    removeUserVerification: CallAPI<Params.RemoveUserVerificationParams, true>
    /**
     * Removes verification from a chat that is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns *True* on success.
     */
    removeChatVerification: CallAPI<Params.RemoveChatVerificationParams, true>
    /**
     * Marks incoming message as read on behalf of a business account. Requires the *can_read_messages* business bot right. Returns *True* on success.
     */
    readBusinessMessage: CallAPI<Params.ReadBusinessMessageParams, true>
    /**
     * Delete messages on behalf of a business account. Requires the *can_delete_sent_messages* business bot right to delete messages sent by the bot itself, or the *can_delete_all_messages* business bot right to delete any message. Returns *True* on success.
     */
    deleteBusinessMessages: CallAPI<Params.DeleteBusinessMessagesParams, true>
    /**
     * Changes the first and last name of a managed business account. Requires the *can_change_name* business bot right. Returns *True* on success.
     */
    setBusinessAccountName: CallAPI<Params.SetBusinessAccountNameParams, true>
    /**
     * Changes the username of a managed business account. Requires the *can_change_username* business bot right. Returns *True* on success.
     */
    setBusinessAccountUsername: CallAPI<
        Params.SetBusinessAccountUsernameParams,
        true
    >
    /**
     * Changes the bio of a managed business account. Requires the *can_change_bio* business bot right. Returns *True* on success.
     */
    setBusinessAccountBio: CallAPI<Params.SetBusinessAccountBioParams, true>
    /**
     * Changes the profile photo of a managed business account. Requires the *can_edit_profile_photo* business bot right. Returns *True* on success.
     */
    setBusinessAccountProfilePhoto: CallAPI<
        Params.SetBusinessAccountProfilePhotoParams,
        true
    >
    /**
     * Removes the current profile photo of a managed business account. Requires the *can_edit_profile_photo* business bot right. Returns *True* on success.
     */
    removeBusinessAccountProfilePhoto: CallAPI<
        Params.RemoveBusinessAccountProfilePhotoParams,
        true
    >
    /**
     * Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the *can_change_gift_settings* business bot right. Returns *True* on success.
     */
    setBusinessAccountGiftSettings: CallAPI<
        Params.SetBusinessAccountGiftSettingsParams,
        true
    >
    /**
     * Returns the amount of Telegram Stars owned by a managed business account. Requires the *can_view_gifts_and_stars* business bot right. Returns [StarAmount](https://core.telegram.org/bots/api#staramount) on success.
     */
    getBusinessAccountStarBalance: CallAPI<
        Params.GetBusinessAccountStarBalanceParams,
        Objects.TelegramStarAmount
    >
    /**
     * Transfers Telegram Stars from the business account balance to the bot's balance. Requires the *can_transfer_stars* business bot right. Returns *True* on success.
     */
    transferBusinessAccountStars: CallAPI<
        Params.TransferBusinessAccountStarsParams,
        true
    >
    /**
     * Returns the gifts received and owned by a managed business account. Requires the *can_view_gifts_and_stars* business bot right. Returns [OwnedGifts](https://core.telegram.org/bots/api#ownedgifts) on success.
     */
    getBusinessAccountGifts: CallAPI<
        Params.GetBusinessAccountGiftsParams,
        Objects.TelegramOwnedGifts
    >
    /**
     * Returns the gifts owned and hosted by a user. Returns [OwnedGifts](https://core.telegram.org/bots/api#ownedgifts) on success.
     */
    getUserGifts: CallAPI<Params.GetUserGiftsParams, Objects.TelegramOwnedGifts>
    /**
     * Returns the gifts owned by a chat. Returns [OwnedGifts](https://core.telegram.org/bots/api#ownedgifts) on success.
     */
    getChatGifts: CallAPI<Params.GetChatGiftsParams, Objects.TelegramOwnedGifts>
    /**
     * Converts a given regular gift to Telegram Stars. Requires the *can_convert_gifts_to_stars* business bot right. Returns *True* on success.
     */
    convertGiftToStars: CallAPI<Params.ConvertGiftToStarsParams, true>
    /**
     * Upgrades a given regular gift to a unique gift. Requires the *can_transfer_and_upgrade_gifts* business bot right. Additionally requires the *can_transfer_stars* business bot right if the upgrade is paid. Returns *True* on success.
     */
    upgradeGift: CallAPI<Params.UpgradeGiftParams, true>
    /**
     * Transfers an owned unique gift to another user. Requires the *can_transfer_and_upgrade_gifts* business bot right. Requires *can_transfer_stars* business bot right if the transfer is paid. Returns *True* on success.
     */
    transferGift: CallAPI<Params.TransferGiftParams, true>
    /**
     * Posts a story on behalf of a managed business account. Requires the *can_manage_stories* business bot right. Returns [Story](https://core.telegram.org/bots/api#story) on success.
     */
    postStory: CallAPI<Params.PostStoryParams, Objects.TelegramStory>
    /**
     * Reposts a story on behalf of a business account from another business account. Both business accounts must be managed by the same bot, and the story on the source account must have been posted (or reposted) by the bot. Requires the *can_manage_stories* business bot right for both business accounts. Returns [Story](https://core.telegram.org/bots/api#story) on success.
     */
    repostStory: CallAPI<Params.RepostStoryParams, Objects.TelegramStory>
    /**
     * Edits a story previously posted by the bot on behalf of a managed business account. Requires the *can_manage_stories* business bot right. Returns [Story](https://core.telegram.org/bots/api#story) on success.
     */
    editStory: CallAPI<Params.EditStoryParams, Objects.TelegramStory>
    /**
     * Deletes a story previously posted by the bot on behalf of a managed business account. Requires the *can_manage_stories* business bot right. Returns *True* on success.
     */
    deleteStory: CallAPI<Params.DeleteStoryParams, true>
    /**
     * Use this method to set the result of an interaction with a [Web App](https://core.telegram.org/bots/webapps) and send a corresponding message on behalf of the user to the chat from which the query originated. Returns [SentWebAppMessage](https://core.telegram.org/bots/api#sentwebappmessage) on success.
     */
    answerWebAppQuery: CallAPI<
        Params.AnswerWebAppQueryParams,
        Objects.TelegramSentWebAppMessage
    >
    /**
     * Stores a message that can be sent by a user of a Mini App. Returns [PreparedInlineMessage](https://core.telegram.org/bots/api#preparedinlinemessage) on success.
     */
    savePreparedInlineMessage: CallAPI<
        Params.SavePreparedInlineMessageParams,
        Objects.TelegramPreparedInlineMessage
    >
    /**
     * Stores a keyboard button that can be used by a user within a Mini App. Returns [PreparedKeyboardButton](https://core.telegram.org/bots/api#preparedkeyboardbutton) on success.
     */
    savePreparedKeyboardButton: CallAPI<
        Params.SavePreparedKeyboardButtonParams,
        Objects.TelegramPreparedKeyboardButton
    >
    /**
     * Use this method to edit text, rich and [game](https://core.telegram.org/bots/api#games) messages. *True* is returned for inline messages. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    editMessageText: CallAPIWithOptionalParams<
        Params.EditMessageTextParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit captions of messages. *True* is returned for inline messages. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    editMessageCaption: CallAPIWithOptionalParams<
        Params.EditMessageCaptionParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit animation, audio, document, live photo, photo, or video messages, or to replace a text or a rich message with a media. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo, a live photo, or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. *True* is returned for inline messages. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    editMessageMedia: CallAPI<
        Params.EditMessageMediaParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit live location messages. A location can be edited until its *live_period* expires or editing is explicitly disabled by a call to [stopMessageLiveLocation](https://core.telegram.org/bots/api#stopmessagelivelocation). *True* is returned for inline messages. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    editMessageLiveLocation: CallAPI<
        Params.EditMessageLiveLocationParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to stop updating a live location message before *live_period* expires. *True* is returned for inline messages. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    stopMessageLiveLocation: CallAPIWithOptionalParams<
        Params.StopMessageLiveLocationParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit a checklist on behalf of a connected business account. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    editMessageChecklist: CallAPI<
        Params.EditMessageChecklistParams,
        Objects.TelegramMessage
    >
    /**
     * Use this method to edit only the reply markup of messages. *True* is returned for inline messages. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    editMessageReplyMarkup: CallAPIWithOptionalParams<
        Params.EditMessageReplyMarkupParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to stop a poll which was sent by the bot. Returns [Poll](https://core.telegram.org/bots/api#poll) on success.
     */
    stopPoll: CallAPI<Params.StopPollParams, Objects.TelegramPoll>
    /**
     * Use this method to edit an ephemeral text or rich message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. Returns *True* on success.
     */
    editEphemeralMessageText: CallAPI<
        Params.EditEphemeralMessageTextParams,
        true
    >
    /**
     * Use this method to edit the media of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. Returns *True* on success.
     */
    editEphemeralMessageMedia: CallAPI<
        Params.EditEphemeralMessageMediaParams,
        true
    >
    /**
     * Use this method to edit the caption of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. Returns *True* on success.
     */
    editEphemeralMessageCaption: CallAPI<
        Params.EditEphemeralMessageCaptionParams,
        true
    >
    /**
     * Use this method to edit only the reply markup of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. Returns *True* on success.
     */
    editEphemeralMessageReplyMarkup: CallAPI<
        Params.EditEphemeralMessageReplyMarkupParams,
        true
    >
    /**
     * Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat. Returns *True* on success.
     */
    approveSuggestedPost: CallAPI<Params.ApproveSuggestedPostParams, true>
    /**
     * Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat. Returns *True* on success.
     */
    declineSuggestedPost: CallAPI<Params.DeclineSuggestedPostParams, true>
    /**
     * Use this method to delete a message, including service messages, with the following limitations:
     * - A message can only be deleted if it was sent less than 48 hours ago.
     * - Service messages about a supergroup, channel, or forum topic creation can't be deleted.
     * - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
     * - Bots can delete outgoing messages in private chats, groups, and supergroups.
     * - Bots can delete incoming messages in private chats.
     * - Bots granted *can_post_messages* permissions can delete outgoing messages in channels.
     * - If the bot is an administrator of a group, it can delete any message there.
     * - If the bot has *can_delete_messages* administrator right in a supergroup or a channel, it can delete any message there.
     * - If the bot has *can_manage_direct_messages* administrator right in a channel, it can delete any message in the corresponding direct messages chat.
     * Returns *True* on success.
     */
    deleteMessage: CallAPI<Params.DeleteMessageParams, true>
    /**
     * Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns *True* on success.
     */
    deleteMessages: CallAPI<Params.DeleteMessagesParams, true>
    /**
     * Use this method to delete an ephemeral message. Note that it is not guaranteed that the user will receive the message deletion event, especially if they are offline. Returns *True* on success.
     */
    deleteEphemeralMessage: CallAPI<Params.DeleteEphemeralMessageParams, true>
    /**
     * Use this method to remove a reaction from a message in a group or a supergroup chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns *True* on success.
     */
    deleteMessageReaction: CallAPI<Params.DeleteMessageReactionParams, true>
    /**
     * Use this method to remove up to 10000 recent reactions in a group or a supergroup chat added by a given user or chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns *True* on success.
     */
    deleteAllMessageReactions: CallAPI<
        Params.DeleteAllMessageReactionsParams,
        true
    >
    /**
     * Use this method to send static .WEBP, [animated](https://telegram.org/blog/animated-stickers) .TGS, or [video](https://telegram.org/blog/video-stickers-better-reactions) .WEBM stickers. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendSticker: CallAPI<Params.SendStickerParams, Objects.TelegramMessage>
    /**
     * Use this method to get a sticker set. Returns [StickerSet](https://core.telegram.org/bots/api#stickerset) on success.
     */
    getStickerSet: CallAPI<
        Params.GetStickerSetParams,
        Objects.TelegramStickerSet
    >
    /**
     * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of [Sticker](https://core.telegram.org/bots/api#sticker) objects on success.
     */
    getCustomEmojiStickers: CallAPI<
        Params.GetCustomEmojiStickersParams,
        Objects.TelegramSticker[]
    >
    /**
     * Use this method to upload a file with a sticker for later use in the [createNewStickerSet](https://core.telegram.org/bots/api#createnewstickerset), [addStickerToSet](https://core.telegram.org/bots/api#addstickertoset), or [replaceStickerInSet](https://core.telegram.org/bots/api#replacestickerinset) methods (the file can be used multiple times). Returns the uploaded file as [File](https://core.telegram.org/bots/api#file) on success.
     */
    uploadStickerFile: CallAPI<
        Params.UploadStickerFileParams,
        Objects.TelegramFile
    >
    /**
     * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns *True* on success.
     */
    createNewStickerSet: CallAPI<Params.CreateNewStickerSetParams, true>
    /**
     * Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns *True* on success.
     */
    addStickerToSet: CallAPI<Params.AddStickerToSetParams, true>
    /**
     * Use this method to move a sticker in a set created by the bot to a specific position. Returns *True* on success.
     */
    setStickerPositionInSet: CallAPI<Params.SetStickerPositionInSetParams, true>
    /**
     * Use this method to delete a sticker from a set created by the bot. Returns *True* on success.
     */
    deleteStickerFromSet: CallAPI<Params.DeleteStickerFromSetParams, true>
    /**
     * Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling [deleteStickerFromSet](https://core.telegram.org/bots/api#deletestickerfromset), then [addStickerToSet](https://core.telegram.org/bots/api#addstickertoset), then [setStickerPositionInSet](https://core.telegram.org/bots/api#setstickerpositioninset). Returns *True* on success.
     */
    replaceStickerInSet: CallAPI<Params.ReplaceStickerInSetParams, true>
    /**
     * Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns *True* on success.
     */
    setStickerEmojiList: CallAPI<Params.SetStickerEmojiListParams, true>
    /**
     * Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns *True* on success.
     */
    setStickerKeywords: CallAPI<Params.SetStickerKeywordsParams, true>
    /**
     * Use this method to change the [mask position](https://core.telegram.org/bots/api#maskposition) of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns *True* on success.
     */
    setStickerMaskPosition: CallAPI<Params.SetStickerMaskPositionParams, true>
    /**
     * Use this method to set the title of a created sticker set. Returns *True* on success.
     */
    setStickerSetTitle: CallAPI<Params.SetStickerSetTitleParams, true>
    /**
     * Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns *True* on success.
     */
    setStickerSetThumbnail: CallAPI<Params.SetStickerSetThumbnailParams, true>
    /**
     * Use this method to set the thumbnail of a custom emoji sticker set. Returns *True* on success.
     */
    setCustomEmojiStickerSetThumbnail: CallAPI<
        Params.SetCustomEmojiStickerSetThumbnailParams,
        true
    >
    /**
     * Use this method to delete a sticker set that was created by the bot. Returns *True* on success.
     */
    deleteStickerSet: CallAPI<Params.DeleteStickerSetParams, true>
    /**
     * Use this method to send rich messages. If the message contains a block with a media element, then the bot must have the right to send the media to the chat. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendRichMessage: CallAPI<
        Params.SendRichMessageParams,
        Objects.TelegramMessage
    >
    /**
     * Use this method to stream a partial rich message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you **must** call [sendRichMessage](https://core.telegram.org/bots/api#sendrichmessage) with the complete message to persist it in the user's chat. Returns *True* on success.
     */
    sendRichMessageDraft: CallAPI<Params.SendRichMessageDraftParams, true>
    /**
     * Use this method to send answers to an inline query. Returns *True* on success.
     */
    answerInlineQuery: CallAPI<Params.AnswerInlineQueryParams, true>
    /**
     * Use this method to send invoices. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendInvoice: CallAPI<Params.SendInvoiceParams, Objects.TelegramMessage>
    /**
     * Use this method to create a link for an invoice. Returns the created invoice link as *String* on success.
     */
    createInvoiceLink: CallAPI<Params.CreateInvoiceLinkParams, string>
    /**
     * If you sent an invoice requesting a shipping address and the parameter *is_flexible* was specified, the Bot API will send an [Update](https://core.telegram.org/bots/api#update) with a *shipping_query* field to the bot. Use this method to reply to shipping queries. Returns *True* on success.
     */
    answerShippingQuery: CallAPI<Params.AnswerShippingQueryParams, true>
    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an [Update](https://core.telegram.org/bots/api#update) with the field *pre_checkout_query*. Use this method to respond to such pre-checkout queries. **Note:** The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. Returns *True* on success.
     */
    answerPreCheckoutQuery: CallAPI<Params.AnswerPreCheckoutQueryParams, true>
    /**
     * A method to get the current Telegram Stars balance of the bot. Returns [StarAmount](https://core.telegram.org/bots/api#staramount) on success.
     */
    getMyStarBalance: CallAPIWithoutParams<Objects.TelegramStarAmount>
    /**
     * Returns the bot's Telegram Star transactions in chronological order. Returns [StarTransactions](https://core.telegram.org/bots/api#startransactions) on success.
     */
    getStarTransactions: CallAPIWithOptionalParams<
        Params.GetStarTransactionsParams,
        Objects.TelegramStarTransactions
    >
    /**
     * Refunds a successful payment in [Telegram Stars](https://t.me/BotNews/90). Returns *True* on success.
     */
    refundStarPayment: CallAPI<Params.RefundStarPaymentParams, true>
    /**
     * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns *True* on success.
     */
    editUserStarSubscription: CallAPI<
        Params.EditUserStarSubscriptionParams,
        true
    >
    /**
     * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns *True* on success.
     *
     * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
     */
    setPassportDataErrors: CallAPI<Params.SetPassportDataErrorsParams, true>
    /**
     * Use this method to send a game. Returns [Message](https://core.telegram.org/bots/api#message) on success.
     */
    sendGame: CallAPI<Params.SendGameParams, Objects.TelegramMessage>
    /**
     * Use this method to set the score of the specified user in a game message. *True* is returned for inline messages. Returns an error, if the new score is not greater than the user's current score in the chat and *force* is *False*. Returns [Message](https://core.telegram.org/bots/api#message) or *True* on success.
     */
    setGameScore: CallAPI<
        Params.SetGameScoreParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of [GameHighScore](https://core.telegram.org/bots/api#gamehighscore) objects on success.
     *
     * >This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
     */
    getGameHighScores: CallAPI<
        Params.GetGameHighScoresParams,
        Objects.TelegramGameHighScore[]
    >
}
