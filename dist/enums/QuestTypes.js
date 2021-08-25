"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeKind = exports.QuestMissionType = exports.QuestType = void 0;
var QuestType;
(function (QuestType) {
    QuestType[QuestType["QUEST_SPOTIFY"] = 0] = "QUEST_SPOTIFY";
    QuestType[QuestType["QUEST_QUESTION"] = 5] = "QUEST_QUESTION";
    QuestType[QuestType["QUEST_YOUTUBE"] = 7] = "QUEST_YOUTUBE";
    QuestType[QuestType["QUEST_PRE_SAVE"] = 10] = "QUEST_PRE_SAVE";
    QuestType[QuestType["QUEST_OPT"] = 11] = "QUEST_OPT";
    QuestType[QuestType["QUEST_PLAYLIST"] = 12] = "QUEST_PLAYLIST";
})(QuestType = exports.QuestType || (exports.QuestType = {}));
var QuestMissionType;
(function (QuestMissionType) {
    QuestMissionType[QuestMissionType["spotify_follow_artist"] = 0] = "spotify_follow_artist";
    QuestMissionType[QuestMissionType["spotify_follow_playlist"] = 1] = "spotify_follow_playlist";
    QuestMissionType[QuestMissionType["spotify_save_track"] = 2] = "spotify_save_track";
    QuestMissionType[QuestMissionType["spotify_save_album"] = 3] = "spotify_save_album";
    QuestMissionType[QuestMissionType["spotify_listen_track"] = 4] = "spotify_listen_track";
    QuestMissionType[QuestMissionType["question"] = 5] = "question";
    QuestMissionType[QuestMissionType["youtube_subscribe"] = 6] = "youtube_subscribe";
    QuestMissionType[QuestMissionType["youtube_watch_video"] = 7] = "youtube_watch_video";
    QuestMissionType[QuestMissionType["spotify_follow_user"] = 8] = "spotify_follow_user";
    QuestMissionType[QuestMissionType["badge_challenge"] = 9] = "badge_challenge";
    QuestMissionType[QuestMissionType["pre_save"] = 10] = "pre_save";
    QuestMissionType[QuestMissionType["opt"] = 11] = "opt";
    QuestMissionType[QuestMissionType["quest_spotify_playlist"] = 12] = "quest_spotify_playlist";
})(QuestMissionType = exports.QuestMissionType || (exports.QuestMissionType = {}));
var YoutubeKind;
(function (YoutubeKind) {
    YoutubeKind[YoutubeKind["channel"] = 0] = "channel";
    YoutubeKind[YoutubeKind["watch"] = 1] = "watch";
})(YoutubeKind = exports.YoutubeKind || (exports.YoutubeKind = {}));
//# sourceMappingURL=QuestTypes.js.map