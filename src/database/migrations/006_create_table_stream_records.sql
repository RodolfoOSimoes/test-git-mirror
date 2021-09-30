CREATE TABLE IF NOT EXISTS stream_records (
  id              BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  date            DATE         NOT NULL,
  track_name      VARCHAR(255) NOT NULL,
  track_uri       VARCHAR(255) NOT NULL,
  artists_name    VARCHAR(255) NOT NULL,
  playlist_uri    VARCHAR(255) NOT NULL,
  stream_quantity INT          NOT NULL,
  created_at      DATETIME     NOT NULL,
  updated_at      DATETIME     NOT NULL
)