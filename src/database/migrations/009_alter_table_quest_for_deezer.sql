ALTER TABLE quest_spotify_playlists
ADD COLUMN tracks text DEFAULT '' AFTER isrcs;

ALTER TABLE user_quest_spotify_playlists
ADD COLUMN tracks text DEFAULT '' AFTER isrcs;

ALTER TABLE rescues
ADD COLUMN track bigint(20) AFTER id;
