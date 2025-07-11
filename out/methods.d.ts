/**
 * @module
 *
 * This module contains [API methods](https://core.telegram.org/bots/api#available-methods) types (functions map with input/output)
 *
 * @example import API methods map
 * ```typescript
 * import { APIMethods } from "@gramio/types/methods";
 *
 * type SendMessageReturn = Awaited<ReturnType<APIMethods["sendMessage"]>>;
 * //   ^? type SendMessageReturn = TelegramMessage"
 * ```
 *
 * Based on Bot API v9.1.0 (03.07.2025)
 *
 * Generated at 11.07.2025, 23:40:10 using [types](https://github.com/gramiojs/types) and [schema](https://ark0f.github.io/tg-bot-api) generators
 */

import type {
    CallAPIWithOptionalParams,
    CallAPI,
    CallAPIWithoutParams,
} from "./utils"
import type * as Params from "./params"
import type * as Objects from "./objects"

/**
 * This object is a map of [API methods](https://core.telegram.org/bots/api#available-methods) types (functions map with input/output)
 */
export interface APIMethods {
    /**
     * Use this method to receive incoming updates using long polling ([wiki](https://en.wikipedia.org/wiki/Push_technology#Long_polling)). Returns an Array of [Update](https://core.telegram.org/bots/api/#update) objects.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getupdates)
     */
    getUpdates: CallAPIWithOptionalParams<
        Params.GetUpdatesParams,
        Objects.TelegramUpdate[]
    >
    /**
     * Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized [Update](https://core.telegram.org/bots/api/#update). In case of an unsuccessful request (a request with response [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) different from `2XY`), we will repeat the request and give up after a reasonable amount of attempts. Returns *True* on success.
     *
     * If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter *secret\_token*. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setwebhook)
     */
    setWebhook: CallAPI<Params.SetWebhookParams, true>
    /**
     * Use this method to remove webhook integration if you decide to switch back to [getUpdates](https://core.telegram.org/bots/api/#getupdates). Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletewebhook)
     */
    deleteWebhook: CallAPIWithOptionalParams<Params.DeleteWebhookParams, true>
    /**
     * Use this method to get current webhook status. Requires no parameters. On success, returns a [WebhookInfo](https://core.telegram.org/bots/api/#webhookinfo) object. If the bot is using [getUpdates](https://core.telegram.org/bots/api/#getupdates), will return an object with the *url* field empty.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getwebhookinfo)
     */
    getWebhookInfo: CallAPIWithoutParams<Objects.TelegramWebhookInfo>
    /**
     * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a [User](https://core.telegram.org/bots/api/#user) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getme)
     */
    getMe: CallAPIWithoutParams<Objects.TelegramUser>
    /**
     * Use this method to log out from the cloud Bot API server before launching the bot locally. You **must** log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns *True* on success. Requires no parameters.
     *
     * [Documentation](https://core.telegram.org/bots/api/#logout)
     */
    logOut: CallAPIWithoutParams<true>
    /**
     * Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns *True* on success. Requires no parameters.
     *
     * [Documentation](https://core.telegram.org/bots/api/#close)
     */
    close: CallAPIWithoutParams<true>
    /**
     * Use this method to send text messages. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendmessage)
     */
    sendMessage: CallAPI<Params.SendMessageParams, Objects.TelegramMessage>
    /**
     * Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#forwardmessage)
     */
    forwardMessage: CallAPI<
        Params.ForwardMessageParams,
        Objects.TelegramMessage
    >
    /**
     * Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an array of [MessageId](https://core.telegram.org/bots/api/#messageid) of the sent messages is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#forwardmessages)
     */
    forwardMessages: CallAPI<
        Params.ForwardMessagesParams,
        Objects.TelegramMessageId[]
    >
    /**
     * Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api/#poll) can be copied only if the value of the field *correct\_option\_id* is known to the bot. The method is analogous to the method [forwardMessage](https://core.telegram.org/bots/api/#forwardmessage), but the copied message doesn't have a link to the original message. Returns the [MessageId](https://core.telegram.org/bots/api/#messageid) of the sent message on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#copymessage)
     */
    copyMessage: CallAPI<Params.CopyMessageParams, Objects.TelegramMessageId>
    /**
     * Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz [poll](https://core.telegram.org/bots/api/#poll) can be copied only if the value of the field *correct\_option\_id* is known to the bot. The method is analogous to the method [forwardMessages](https://core.telegram.org/bots/api/#forwardmessages), but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an array of [MessageId](https://core.telegram.org/bots/api/#messageid) of the sent messages is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#copymessages)
     */
    copyMessages: CallAPI<
        Params.CopyMessagesParams,
        Objects.TelegramMessageId[]
    >
    /**
     * Use this method to send photos. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendphoto)
     */
    sendPhoto: CallAPI<Params.SendPhotoParams, Objects.TelegramMessage>
    /**
     * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
     *
     * For sending voice messages, use the [sendVoice](https://core.telegram.org/bots/api/#sendvoice) method instead.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendaudio)
     */
    sendAudio: CallAPI<Params.SendAudioParams, Objects.TelegramMessage>
    /**
     * Use this method to send general files. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
     *
     * [Documentation](https://core.telegram.org/bots/api/#senddocument)
     */
    sendDocument: CallAPI<Params.SendDocumentParams, Objects.TelegramMessage>
    /**
     * Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as [Document](https://core.telegram.org/bots/api/#document)). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendvideo)
     */
    sendVideo: CallAPI<Params.SendVideoParams, Objects.TelegramMessage>
    /**
     * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendanimation)
     */
    sendAnimation: CallAPI<Params.SendAnimationParams, Objects.TelegramMessage>
    /**
     * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as [Audio](https://core.telegram.org/bots/api/#audio) or [Document](https://core.telegram.org/bots/api/#document)). On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendvoice)
     */
    sendVoice: CallAPI<Params.SendVoiceParams, Objects.TelegramMessage>
    /**
     * As of [v.4.0](https://telegram.org/blog/video-messages-and-telescope), Telegram clients support rounded square MPEG4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendvideonote)
     */
    sendVideoNote: CallAPI<Params.SendVideoNoteParams, Objects.TelegramMessage>
    /**
     * Use this method to send paid media. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendpaidmedia)
     */
    sendPaidMedia: CallAPI<Params.SendPaidMediaParams, Objects.TelegramMessage>
    /**
     * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of [Messages](https://core.telegram.org/bots/api/#message) that were sent is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendmediagroup)
     */
    sendMediaGroup: CallAPI<
        Params.SendMediaGroupParams,
        Objects.TelegramMessage[]
    >
    /**
     * Use this method to send point on the map. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendlocation)
     */
    sendLocation: CallAPI<Params.SendLocationParams, Objects.TelegramMessage>
    /**
     * Use this method to send information about a venue. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendvenue)
     */
    sendVenue: CallAPI<Params.SendVenueParams, Objects.TelegramMessage>
    /**
     * Use this method to send phone contacts. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendcontact)
     */
    sendContact: CallAPI<Params.SendContactParams, Objects.TelegramMessage>
    /**
     * Use this method to send a native poll. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendpoll)
     */
    sendPoll: CallAPI<Params.SendPollParams, Objects.TelegramMessage>
    /**
     * Use this method to send a checklist on behalf of a connected business account. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendchecklist)
     */
    sendChecklist: CallAPI<Params.SendChecklistParams, Objects.TelegramMessage>
    /**
     * Use this method to send an animated emoji that will display a random value. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#senddice)
     */
    sendDice: CallAPI<Params.SendDiceParams, Objects.TelegramMessage>
    /**
     * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns *True* on success.
     *
     * Example: The [ImageBot](https://t.me/imagebot) needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use [sendChatAction](https://core.telegram.org/bots/api/#sendchataction) with *action* = *upload\_photo*. The user will see a “sending photo” status for the bot.
     *
     * We only recommend using this method when a response from the bot will take a **noticeable** amount of time to arrive.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendchataction)
     */
    sendChatAction: CallAPI<Params.SendChatActionParams, true>
    /**
     * Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmessagereaction)
     */
    setMessageReaction: CallAPI<Params.SetMessageReactionParams, true>
    /**
     * Use this method to get a list of profile pictures for a user. Returns a [UserProfilePhotos](https://core.telegram.org/bots/api/#userprofilephotos) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getuserprofilephotos)
     */
    getUserProfilePhotos: CallAPI<
        Params.GetUserProfilePhotosParams,
        Objects.TelegramUserProfilePhotos
    >
    /**
     * Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method [requestEmojiStatusAccess](https://core.telegram.org/bots/webapps#initializing-mini-apps). Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setuseremojistatus)
     */
    setUserEmojiStatus: CallAPI<Params.SetUserEmojiStatusParams, true>
    /**
     * Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a [File](https://core.telegram.org/bots/api/#file) object is returned. The file can then be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling [getFile](https://core.telegram.org/bots/api/#getfile) again.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getfile)
     */
    getFile: CallAPI<Params.GetFileParams, Objects.TelegramFile>
    /**
     * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless [unbanned](https://core.telegram.org/bots/api/#unbanchatmember) first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#banchatmember)
     */
    banChatMember: CallAPI<Params.BanChatMemberParams, true>
    /**
     * Use this method to unban a previously banned user in a supergroup or channel. The user will **not** return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be **removed** from the chat. If you don't want this, use the parameter *only\_if\_banned*. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unbanchatmember)
     */
    unbanChatMember: CallAPI<Params.UnbanChatMemberParams, true>
    /**
     * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass *True* for all permissions to lift restrictions from a user. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#restrictchatmember)
     */
    restrictChatMember: CallAPI<Params.RestrictChatMemberParams, true>
    /**
     * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass *False* for all boolean parameters to demote a user. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#promotechatmember)
     */
    promoteChatMember: CallAPI<Params.PromoteChatMemberParams, true>
    /**
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatadministratorcustomtitle)
     */
    setChatAdministratorCustomTitle: CallAPI<
        Params.SetChatAdministratorCustomTitleParams,
        true
    >
    /**
     * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is [unbanned](https://core.telegram.org/bots/api/#unbanchatsenderchat), the owner of the banned chat won't be able to send messages on behalf of **any of their channels**. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#banchatsenderchat)
     */
    banChatSenderChat: CallAPI<Params.BanChatSenderChatParams, true>
    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unbanchatsenderchat)
     */
    unbanChatSenderChat: CallAPI<Params.UnbanChatSenderChatParams, true>
    /**
     * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the *can\_restrict\_members* administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatpermissions)
     */
    setChatPermissions: CallAPI<Params.SetChatPermissionsParams, true>
    /**
     * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as *String* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#exportchatinvitelink)
     */
    exportChatInviteLink: CallAPI<Params.ExportChatInviteLinkParams, string>
    /**
     * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api/#revokechatinvitelink). Returns the new invite link as [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#createchatinvitelink)
     */
    createChatInviteLink: CallAPI<
        Params.CreateChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editchatinvitelink)
     */
    editChatInviteLink: CallAPI<
        Params.EditChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to create a [subscription invite link](https://telegram.org/blog/superchannels-star-reactions-subscriptions#star-subscriptions) for a channel chat. The bot must have the *can\_invite\_users* administrator rights. The link can be edited using the method [editChatSubscriptionInviteLink](https://core.telegram.org/bots/api/#editchatsubscriptioninvitelink) or revoked using the method [revokeChatInviteLink](https://core.telegram.org/bots/api/#revokechatinvitelink). Returns the new invite link as a [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#createchatsubscriptioninvitelink)
     */
    createChatSubscriptionInviteLink: CallAPI<
        Params.CreateChatSubscriptionInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to edit a subscription invite link created by the bot. The bot must have the *can\_invite\_users* administrator rights. Returns the edited invite link as a [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editchatsubscriptioninvitelink)
     */
    editChatSubscriptionInviteLink: CallAPI<
        Params.EditChatSubscriptionInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as [ChatInviteLink](https://core.telegram.org/bots/api/#chatinvitelink) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#revokechatinvitelink)
     */
    revokeChatInviteLink: CallAPI<
        Params.RevokeChatInviteLinkParams,
        Objects.TelegramChatInviteLink
    >
    /**
     * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the *can\_invite\_users* administrator right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#approvechatjoinrequest)
     */
    approveChatJoinRequest: CallAPI<Params.ApproveChatJoinRequestParams, true>
    /**
     * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the *can\_invite\_users* administrator right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#declinechatjoinrequest)
     */
    declineChatJoinRequest: CallAPI<Params.DeclineChatJoinRequestParams, true>
    /**
     * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatphoto)
     */
    setChatPhoto: CallAPI<Params.SetChatPhotoParams, true>
    /**
     * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletechatphoto)
     */
    deleteChatPhoto: CallAPI<Params.DeleteChatPhotoParams, true>
    /**
     * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchattitle)
     */
    setChatTitle: CallAPI<Params.SetChatTitleParams, true>
    /**
     * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatdescription)
     */
    setChatDescription: CallAPI<Params.SetChatDescriptionParams, true>
    /**
     * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#pinchatmessage)
     */
    pinChatMessage: CallAPI<Params.PinChatMessageParams, true>
    /**
     * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unpinchatmessage)
     */
    unpinChatMessage: CallAPI<Params.UnpinChatMessageParams, true>
    /**
     * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can\_pin\_messages' administrator right in a supergroup or 'can\_edit\_messages' administrator right in a channel. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unpinallchatmessages)
     */
    unpinAllChatMessages: CallAPI<Params.UnpinAllChatMessagesParams, true>
    /**
     * Use this method for your bot to leave a group, supergroup or channel. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#leavechat)
     */
    leaveChat: CallAPI<Params.LeaveChatParams, true>
    /**
     * Use this method to get up-to-date information about the chat. Returns a [ChatFullInfo](https://core.telegram.org/bots/api/#chatfullinfo) object on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getchat)
     */
    getChat: CallAPI<Params.GetChatParams, Objects.TelegramChatFullInfo>
    /**
     * Use this method to get a list of administrators in a chat, which aren't bots. Returns an Array of [ChatMember](https://core.telegram.org/bots/api/#chatmember) objects.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getchatadministrators)
     */
    getChatAdministrators: CallAPI<
        Params.GetChatAdministratorsParams,
        Objects.TelegramChatMember[]
    >
    /**
     * Use this method to get the number of members in a chat. Returns *Int* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getchatmembercount)
     */
    getChatMemberCount: CallAPI<Params.GetChatMemberCountParams, number>
    /**
     * Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a [ChatMember](https://core.telegram.org/bots/api/#chatmember) object on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getchatmember)
     */
    getChatMember: CallAPI<
        Params.GetChatMemberParams,
        Objects.TelegramChatMember
    >
    /**
     * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can\_set\_sticker\_set* optionally returned in [getChat](https://core.telegram.org/bots/api/#getchat) requests to check if the bot can use this method. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatstickerset)
     */
    setChatStickerSet: CallAPI<Params.SetChatStickerSetParams, true>
    /**
     * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field *can\_set\_sticker\_set* optionally returned in [getChat](https://core.telegram.org/bots/api/#getchat) requests to check if the bot can use this method. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletechatstickerset)
     */
    deleteChatStickerSet: CallAPI<Params.DeleteChatStickerSetParams, true>
    /**
     * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of [Sticker](https://core.telegram.org/bots/api/#sticker) objects.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getforumtopiciconstickers)
     */
    getForumTopicIconStickers: CallAPIWithoutParams<Objects.TelegramSticker[]>
    /**
     * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. Returns information about the created topic as a [ForumTopic](https://core.telegram.org/bots/api/#forumtopic) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#createforumtopic)
     */
    createForumTopic: CallAPI<
        Params.CreateForumTopicParams,
        Objects.TelegramForumTopic
    >
    /**
     * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editforumtopic)
     */
    editForumTopic: CallAPI<Params.EditForumTopicParams, true>
    /**
     * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#closeforumtopic)
     */
    closeForumTopic: CallAPI<Params.CloseForumTopicParams, true>
    /**
     * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights, unless it is the creator of the topic. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#reopenforumtopic)
     */
    reopenForumTopic: CallAPI<Params.ReopenForumTopicParams, true>
    /**
     * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_delete\_messages* administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deleteforumtopic)
     */
    deleteForumTopic: CallAPI<Params.DeleteForumTopicParams, true>
    /**
     * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat for this to work and must have the *can\_pin\_messages* administrator right in the supergroup. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unpinallforumtopicmessages)
     */
    unpinAllForumTopicMessages: CallAPI<
        Params.UnpinAllForumTopicMessagesParams,
        true
    >
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editgeneralforumtopic)
     */
    editGeneralForumTopic: CallAPI<Params.EditGeneralForumTopicParams, true>
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#closegeneralforumtopic)
     */
    closeGeneralForumTopic: CallAPI<Params.CloseGeneralForumTopicParams, true>
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. The topic will be automatically unhidden if it was hidden. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#reopengeneralforumtopic)
     */
    reopenGeneralForumTopic: CallAPI<Params.ReopenGeneralForumTopicParams, true>
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. The topic will be automatically closed if it was open. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#hidegeneralforumtopic)
     */
    hideGeneralForumTopic: CallAPI<Params.HideGeneralForumTopicParams, true>
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the *can\_manage\_topics* administrator rights. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unhidegeneralforumtopic)
     */
    unhideGeneralForumTopic: CallAPI<Params.UnhideGeneralForumTopicParams, true>
    /**
     * Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the *can\_pin\_messages* administrator right in the supergroup. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#unpinallgeneralforumtopicmessages)
     */
    unpinAllGeneralForumTopicMessages: CallAPI<
        Params.UnpinAllGeneralForumTopicMessagesParams,
        true
    >
    /**
     * Use this method to send answers to callback queries sent from [inline keyboards](https://core.telegram.org/bots/features#inline-keyboards). The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, *True* is returned.
     *
     * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via [@BotFather](https://t.me/botfather) and accept the terms. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
     *
     * [Documentation](https://core.telegram.org/bots/api/#answercallbackquery)
     */
    answerCallbackQuery: CallAPI<Params.AnswerCallbackQueryParams, true>
    /**
     * Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a [UserChatBoosts](https://core.telegram.org/bots/api/#userchatboosts) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getuserchatboosts)
     */
    getUserChatBoosts: CallAPI<
        Params.GetUserChatBoostsParams,
        Objects.TelegramUserChatBoosts
    >
    /**
     * Use this method to get information about the connection of the bot with a business account. Returns a [BusinessConnection](https://core.telegram.org/bots/api/#businessconnection) object on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getbusinessconnection)
     */
    getBusinessConnection: CallAPI<
        Params.GetBusinessConnectionParams,
        Objects.TelegramBusinessConnection
    >
    /**
     * Use this method to change the list of the bot's commands. See [this manual](https://core.telegram.org/bots/features#commands) for more details about bot commands. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmycommands)
     */
    setMyCommands: CallAPI<Params.SetMyCommandsParams, true>
    /**
     * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, [higher level commands](https://core.telegram.org/bots/api/#determining-list-of-commands) will be shown to affected users. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletemycommands)
     */
    deleteMyCommands: CallAPIWithOptionalParams<
        Params.DeleteMyCommandsParams,
        true
    >
    /**
     * Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of [BotCommand](https://core.telegram.org/bots/api/#botcommand) objects. If commands aren't set, an empty list is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmycommands)
     */
    getMyCommands: CallAPIWithOptionalParams<
        Params.GetMyCommandsParams,
        Objects.TelegramBotCommand[]
    >
    /**
     * Use this method to change the bot's name. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmyname)
     */
    setMyName: CallAPIWithOptionalParams<Params.SetMyNameParams, true>
    /**
     * Use this method to get the current bot name for the given user language. Returns [BotName](https://core.telegram.org/bots/api/#botname) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmyname)
     */
    getMyName: CallAPIWithOptionalParams<
        Params.GetMyNameParams,
        Objects.TelegramBotName
    >
    /**
     * Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmydescription)
     */
    setMyDescription: CallAPIWithOptionalParams<
        Params.SetMyDescriptionParams,
        true
    >
    /**
     * Use this method to get the current bot description for the given user language. Returns [BotDescription](https://core.telegram.org/bots/api/#botdescription) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmydescription)
     */
    getMyDescription: CallAPIWithOptionalParams<
        Params.GetMyDescriptionParams,
        Objects.TelegramBotDescription
    >
    /**
     * Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmyshortdescription)
     */
    setMyShortDescription: CallAPIWithOptionalParams<
        Params.SetMyShortDescriptionParams,
        true
    >
    /**
     * Use this method to get the current bot short description for the given user language. Returns [BotShortDescription](https://core.telegram.org/bots/api/#botshortdescription) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmyshortdescription)
     */
    getMyShortDescription: CallAPIWithOptionalParams<
        Params.GetMyShortDescriptionParams,
        Objects.TelegramBotShortDescription
    >
    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setchatmenubutton)
     */
    setChatMenuButton: CallAPIWithOptionalParams<
        Params.SetChatMenuButtonParams,
        true
    >
    /**
     * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns [MenuButton](https://core.telegram.org/bots/api/#menubutton) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getchatmenubutton)
     */
    getChatMenuButton: CallAPIWithOptionalParams<
        Params.GetChatMenuButtonParams,
        Objects.TelegramMenuButton
    >
    /**
     * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setmydefaultadministratorrights)
     */
    setMyDefaultAdministratorRights: CallAPIWithOptionalParams<
        Params.SetMyDefaultAdministratorRightsParams,
        true
    >
    /**
     * Use this method to get the current default administrator rights of the bot. Returns [ChatAdministratorRights](https://core.telegram.org/bots/api/#chatadministratorrights) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmydefaultadministratorrights)
     */
    getMyDefaultAdministratorRights: CallAPIWithOptionalParams<
        Params.GetMyDefaultAdministratorRightsParams,
        Objects.TelegramChatAdministratorRights
    >
    /**
     * Use this method to edit text and [game](https://core.telegram.org/bots/api/#games) messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagetext)
     */
    editMessageText: CallAPI<
        Params.EditMessageTextParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagecaption)
     */
    editMessageCaption: CallAPIWithOptionalParams<
        Params.EditMessageCaptionParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit animation, audio, document, photo, or video messages, or to add media to text messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file\_id or specify a URL. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagemedia)
     */
    editMessageMedia: CallAPI<
        Params.EditMessageMediaParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit live location messages. A location can be edited until its *live\_period* expires or editing is explicitly disabled by a call to [stopMessageLiveLocation](https://core.telegram.org/bots/api/#stopmessagelivelocation). On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagelivelocation)
     */
    editMessageLiveLocation: CallAPI<
        Params.EditMessageLiveLocationParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to stop updating a live location message before *live\_period* expires. On success, if the message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#stopmessagelivelocation)
     */
    stopMessageLiveLocation: CallAPIWithOptionalParams<
        Params.StopMessageLiveLocationParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to edit a checklist on behalf of a connected business account. On success, the edited [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagechecklist)
     */
    editMessageChecklist: CallAPI<
        Params.EditMessageChecklistParams,
        Objects.TelegramMessage
    >
    /**
     * Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within **48 hours** from the time they were sent.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editmessagereplymarkup)
     */
    editMessageReplyMarkup: CallAPIWithOptionalParams<
        Params.EditMessageReplyMarkupParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to stop a poll which was sent by the bot. On success, the stopped [Poll](https://core.telegram.org/bots/api/#poll) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#stoppoll)
     */
    stopPoll: CallAPI<Params.StopPollParams, Objects.TelegramPoll>
    /**
     * Use this method to delete a message, including service messages, with the following limitations:
     * \- A message can only be deleted if it was sent less than 48 hours ago.
     * \- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
     * \- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
     * \- Bots can delete outgoing messages in private chats, groups, and supergroups.
     * \- Bots can delete incoming messages in private chats.
     * \- Bots granted *can\_post\_messages* permissions can delete outgoing messages in channels.
     * \- If the bot is an administrator of a group, it can delete any message there.
     * \- If the bot has *can\_delete\_messages* permission in a supergroup or a channel, it can delete any message there.
     * Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletemessage)
     */
    deleteMessage: CallAPI<Params.DeleteMessageParams, true>
    /**
     * Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletemessages)
     */
    deleteMessages: CallAPI<Params.DeleteMessagesParams, true>
    /**
     * Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a [Gifts](https://core.telegram.org/bots/api/#gifts) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getavailablegifts)
     */
    getAvailableGifts: CallAPIWithoutParams<Objects.TelegramGifts>
    /**
     * Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendgift)
     */
    sendGift: CallAPI<Params.SendGiftParams, true>
    /**
     * Gifts a Telegram Premium subscription to the given user. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#giftpremiumsubscription)
     */
    giftPremiumSubscription: CallAPI<Params.GiftPremiumSubscriptionParams, true>
    /**
     * Verifies a user [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#verifyuser)
     */
    verifyUser: CallAPI<Params.VerifyUserParams, true>
    /**
     * Verifies a chat [on behalf of the organization](https://telegram.org/verify#third-party-verification) which is represented by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#verifychat)
     */
    verifyChat: CallAPI<Params.VerifyChatParams, true>
    /**
     * Removes verification from a user who is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#removeuserverification)
     */
    removeUserVerification: CallAPI<Params.RemoveUserVerificationParams, true>
    /**
     * Removes verification from a chat that is currently verified [on behalf of the organization](https://telegram.org/verify#third-party-verification) represented by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#removechatverification)
     */
    removeChatVerification: CallAPI<Params.RemoveChatVerificationParams, true>
    /**
     * Marks incoming message as read on behalf of a business account. Requires the *can\_read\_messages* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#readbusinessmessage)
     */
    readBusinessMessage: CallAPI<Params.ReadBusinessMessageParams, true>
    /**
     * Delete messages on behalf of a business account. Requires the *can\_delete\_sent\_messages* business bot right to delete messages sent by the bot itself, or the *can\_delete\_all\_messages* business bot right to delete any message. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletebusinessmessages)
     */
    deleteBusinessMessages: CallAPI<Params.DeleteBusinessMessagesParams, true>
    /**
     * Changes the first and last name of a managed business account. Requires the *can\_change\_name* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setbusinessaccountname)
     */
    setBusinessAccountName: CallAPI<Params.SetBusinessAccountNameParams, true>
    /**
     * Changes the username of a managed business account. Requires the *can\_change\_username* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setbusinessaccountusername)
     */
    setBusinessAccountUsername: CallAPI<
        Params.SetBusinessAccountUsernameParams,
        true
    >
    /**
     * Changes the bio of a managed business account. Requires the *can\_change\_bio* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setbusinessaccountbio)
     */
    setBusinessAccountBio: CallAPI<Params.SetBusinessAccountBioParams, true>
    /**
     * Changes the profile photo of a managed business account. Requires the *can\_edit\_profile\_photo* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setbusinessaccountprofilephoto)
     */
    setBusinessAccountProfilePhoto: CallAPI<
        Params.SetBusinessAccountProfilePhotoParams,
        true
    >
    /**
     * Removes the current profile photo of a managed business account. Requires the *can\_edit\_profile\_photo* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#removebusinessaccountprofilephoto)
     */
    removeBusinessAccountProfilePhoto: CallAPI<
        Params.RemoveBusinessAccountProfilePhotoParams,
        true
    >
    /**
     * Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the *can\_change\_gift\_settings* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setbusinessaccountgiftsettings)
     */
    setBusinessAccountGiftSettings: CallAPI<
        Params.SetBusinessAccountGiftSettingsParams,
        true
    >
    /**
     * Returns the amount of Telegram Stars owned by a managed business account. Requires the *can\_view\_gifts\_and\_stars* business bot right. Returns [StarAmount](https://core.telegram.org/bots/api/#staramount) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getbusinessaccountstarbalance)
     */
    getBusinessAccountStarBalance: CallAPI<
        Params.GetBusinessAccountStarBalanceParams,
        Objects.TelegramStarAmount
    >
    /**
     * Transfers Telegram Stars from the business account balance to the bot's balance. Requires the *can\_transfer\_stars* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#transferbusinessaccountstars)
     */
    transferBusinessAccountStars: CallAPI<
        Params.TransferBusinessAccountStarsParams,
        true
    >
    /**
     * Returns the gifts received and owned by a managed business account. Requires the *can\_view\_gifts\_and\_stars* business bot right. Returns [OwnedGifts](https://core.telegram.org/bots/api/#ownedgifts) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getbusinessaccountgifts)
     */
    getBusinessAccountGifts: CallAPI<
        Params.GetBusinessAccountGiftsParams,
        Objects.TelegramOwnedGifts
    >
    /**
     * Converts a given regular gift to Telegram Stars. Requires the *can\_convert\_gifts\_to\_stars* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#convertgifttostars)
     */
    convertGiftToStars: CallAPI<Params.ConvertGiftToStarsParams, true>
    /**
     * Upgrades a given regular gift to a unique gift. Requires the *can\_transfer\_and\_upgrade\_gifts* business bot right. Additionally requires the *can\_transfer\_stars* business bot right if the upgrade is paid. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#upgradegift)
     */
    upgradeGift: CallAPI<Params.UpgradeGiftParams, true>
    /**
     * Transfers an owned unique gift to another user. Requires the *can\_transfer\_and\_upgrade\_gifts* business bot right. Requires *can\_transfer\_stars* business bot right if the transfer is paid. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#transfergift)
     */
    transferGift: CallAPI<Params.TransferGiftParams, true>
    /**
     * Posts a story on behalf of a managed business account. Requires the *can\_manage\_stories* business bot right. Returns [Story](https://core.telegram.org/bots/api/#story) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#poststory)
     */
    postStory: CallAPI<Params.PostStoryParams, Objects.TelegramStory>
    /**
     * Edits a story previously posted by the bot on behalf of a managed business account. Requires the *can\_manage\_stories* business bot right. Returns [Story](https://core.telegram.org/bots/api/#story) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#editstory)
     */
    editStory: CallAPI<Params.EditStoryParams, Objects.TelegramStory>
    /**
     * Deletes a story previously posted by the bot on behalf of a managed business account. Requires the *can\_manage\_stories* business bot right. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletestory)
     */
    deleteStory: CallAPI<Params.DeleteStoryParams, true>
    /**
     * Use this method to send static .WEBP, [animated](https://telegram.org/blog/animated-stickers) .TGS, or [video](https://telegram.org/blog/video-stickers-better-reactions) .WEBM stickers. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendsticker)
     */
    sendSticker: CallAPI<Params.SendStickerParams, Objects.TelegramMessage>
    /**
     * Use this method to get a sticker set. On success, a [StickerSet](https://core.telegram.org/bots/api/#stickerset) object is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getstickerset)
     */
    getStickerSet: CallAPI<
        Params.GetStickerSetParams,
        Objects.TelegramStickerSet
    >
    /**
     * Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of [Sticker](https://core.telegram.org/bots/api/#sticker) objects.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getcustomemojistickers)
     */
    getCustomEmojiStickers: CallAPI<
        Params.GetCustomEmojiStickersParams,
        Objects.TelegramSticker[]
    >
    /**
     * Use this method to upload a file with a sticker for later use in the [createNewStickerSet](https://core.telegram.org/bots/api/#createnewstickerset), [addStickerToSet](https://core.telegram.org/bots/api/#addstickertoset), or [replaceStickerInSet](https://core.telegram.org/bots/api/#replacestickerinset) methods (the file can be used multiple times). Returns the uploaded [File](https://core.telegram.org/bots/api/#file) on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#uploadstickerfile)
     */
    uploadStickerFile: CallAPI<
        Params.UploadStickerFileParams,
        Objects.TelegramFile
    >
    /**
     * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#createnewstickerset)
     */
    createNewStickerSet: CallAPI<Params.CreateNewStickerSetParams, true>
    /**
     * Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#addstickertoset)
     */
    addStickerToSet: CallAPI<Params.AddStickerToSetParams, true>
    /**
     * Use this method to move a sticker in a set created by the bot to a specific position. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickerpositioninset)
     */
    setStickerPositionInSet: CallAPI<Params.SetStickerPositionInSetParams, true>
    /**
     * Use this method to delete a sticker from a set created by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletestickerfromset)
     */
    deleteStickerFromSet: CallAPI<Params.DeleteStickerFromSetParams, true>
    /**
     * Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling [deleteStickerFromSet](https://core.telegram.org/bots/api/#deletestickerfromset), then [addStickerToSet](https://core.telegram.org/bots/api/#addstickertoset), then [setStickerPositionInSet](https://core.telegram.org/bots/api/#setstickerpositioninset). Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#replacestickerinset)
     */
    replaceStickerInSet: CallAPI<Params.ReplaceStickerInSetParams, true>
    /**
     * Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickeremojilist)
     */
    setStickerEmojiList: CallAPI<Params.SetStickerEmojiListParams, true>
    /**
     * Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickerkeywords)
     */
    setStickerKeywords: CallAPI<Params.SetStickerKeywordsParams, true>
    /**
     * Use this method to change the [mask position](https://core.telegram.org/bots/api/#maskposition) of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickermaskposition)
     */
    setStickerMaskPosition: CallAPI<Params.SetStickerMaskPositionParams, true>
    /**
     * Use this method to set the title of a created sticker set. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickersettitle)
     */
    setStickerSetTitle: CallAPI<Params.SetStickerSetTitleParams, true>
    /**
     * Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setstickersetthumbnail)
     */
    setStickerSetThumbnail: CallAPI<Params.SetStickerSetThumbnailParams, true>
    /**
     * Use this method to set the thumbnail of a custom emoji sticker set. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setcustomemojistickersetthumbnail)
     */
    setCustomEmojiStickerSetThumbnail: CallAPI<
        Params.SetCustomEmojiStickerSetThumbnailParams,
        true
    >
    /**
     * Use this method to delete a sticker set that was created by the bot. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#deletestickerset)
     */
    deleteStickerSet: CallAPI<Params.DeleteStickerSetParams, true>
    /**
     * Use this method to send answers to an inline query. On success, *True* is returned.
     * No more than **50** results per query are allowed.
     *
     * [Documentation](https://core.telegram.org/bots/api/#answerinlinequery)
     */
    answerInlineQuery: CallAPI<Params.AnswerInlineQueryParams, true>
    /**
     * Use this method to set the result of an interaction with a [Web App](https://core.telegram.org/bots/webapps) and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a [SentWebAppMessage](https://core.telegram.org/bots/api/#sentwebappmessage) object is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#answerwebappquery)
     */
    answerWebAppQuery: CallAPI<
        Params.AnswerWebAppQueryParams,
        Objects.TelegramSentWebAppMessage
    >
    /**
     * Stores a message that can be sent by a user of a Mini App. Returns a [PreparedInlineMessage](https://core.telegram.org/bots/api/#preparedinlinemessage) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#savepreparedinlinemessage)
     */
    savePreparedInlineMessage: CallAPI<
        Params.SavePreparedInlineMessageParams,
        Objects.TelegramPreparedInlineMessage
    >
    /**
     * Use this method to send invoices. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendinvoice)
     */
    sendInvoice: CallAPI<Params.SendInvoiceParams, Objects.TelegramMessage>
    /**
     * Use this method to create a link for an invoice. Returns the created invoice link as *String* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#createinvoicelink)
     */
    createInvoiceLink: CallAPI<Params.CreateInvoiceLinkParams, string>
    /**
     * If you sent an invoice requesting a shipping address and the parameter *is\_flexible* was specified, the Bot API will send an [Update](https://core.telegram.org/bots/api/#update) with a *shipping\_query* field to the bot. Use this method to reply to shipping queries. On success, *True* is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#answershippingquery)
     */
    answerShippingQuery: CallAPI<Params.AnswerShippingQueryParams, true>
    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an [Update](https://core.telegram.org/bots/api/#update) with the field *pre\_checkout\_query*. Use this method to respond to such pre-checkout queries. On success, *True* is returned. **Note:** The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
     *
     * [Documentation](https://core.telegram.org/bots/api/#answerprecheckoutquery)
     */
    answerPreCheckoutQuery: CallAPI<Params.AnswerPreCheckoutQueryParams, true>
    /**
     * A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a [StarAmount](https://core.telegram.org/bots/api/#staramount) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getmystarbalance)
     */
    getMyStarBalance: CallAPIWithoutParams<Objects.TelegramStarAmount>
    /**
     * Returns the bot's Telegram Star transactions in chronological order. On success, returns a [StarTransactions](https://core.telegram.org/bots/api/#startransactions) object.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getstartransactions)
     */
    getStarTransactions: CallAPIWithOptionalParams<
        Params.GetStarTransactionsParams,
        Objects.TelegramStarTransactions
    >
    /**
     * Refunds a successful payment in [Telegram Stars](https://t.me/BotNews/90). Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#refundstarpayment)
     */
    refundStarPayment: CallAPI<Params.RefundStarPaymentParams, true>
    /**
     * Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns *True* on success.
     *
     * [Documentation](https://core.telegram.org/bots/api/#edituserstarsubscription)
     */
    editUserStarSubscription: CallAPI<
        Params.EditUserStarSubscriptionParams,
        true
    >
    /**
     * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns *True* on success.
     *
     * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setpassportdataerrors)
     */
    setPassportDataErrors: CallAPI<Params.SetPassportDataErrorsParams, true>
    /**
     * Use this method to send a game. On success, the sent [Message](https://core.telegram.org/bots/api/#message) is returned.
     *
     * [Documentation](https://core.telegram.org/bots/api/#sendgame)
     */
    sendGame: CallAPI<Params.SendGameParams, Objects.TelegramMessage>
    /**
     * Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the [Message](https://core.telegram.org/bots/api/#message) is returned, otherwise *True* is returned. Returns an error, if the new score is not greater than the user's current score in the chat and *force* is *False*.
     *
     * [Documentation](https://core.telegram.org/bots/api/#setgamescore)
     */
    setGameScore: CallAPI<
        Params.SetGameScoreParams,
        Objects.TelegramMessage | true
    >
    /**
     * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of [GameHighScore](https://core.telegram.org/bots/api/#gamehighscore) objects.
     *
     * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and their neighbors are not among them. Please note that this behavior is subject to change.
     *
     * [Documentation](https://core.telegram.org/bots/api/#getgamehighscores)
     */
    getGameHighScores: CallAPI<
        Params.GetGameHighScoresParams,
        Objects.TelegramGameHighScore[]
    >
}
