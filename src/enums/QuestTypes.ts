export enum QuestType {
  QUEST_SPOTIFY = 0,
  QUEST_QUESTION = 5,
  // QUEST_YOUTUBE_SUBSCRIBE =6, not implemented
  QUEST_YOUTUBE = 7,
  // QUEST_FOLLOW_SPOTIFY_USER = 8, not implemented
  QUEST_PRE_SAVE = 10,
  QUEST_OPT = 11,
  QUEST_PLAYLIST = 12,
}

export enum QuestMissionType {
  spotify_follow_artist = 0,
  spotify_follow_playlist = 1,
  spotify_save_track = 2,
  spotify_save_album = 3,
  spotify_listen_track = 4,
  question = 5,
  youtube_subscribe = 6,
  youtube_watch_video = 7,
  spotify_follow_user = 8,
  badge_challenge = 9,
  pre_save = 10,
  opt = 11,
  quest_spotify_playlist = 12,
}

export enum YoutubeKind {
  channel = 0,
  watch = 1,
}
