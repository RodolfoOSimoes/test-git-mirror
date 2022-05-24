ALTER TABLE quest_spotify_playlists
ADD COLUMN tracks text DEFAULT '' AFTER isrcs;

ALTER TABLE user_quest_spotify_playlists
ADD COLUMN tracks text DEFAULT '' AFTER isrcs;

ALTER TABLE user_quest_spotify_playlists
ADD COLUMN tracks text DEFAULT '' AFTER isrcs;
