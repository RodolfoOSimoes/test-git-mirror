CREATE TABLE IF NOT EXISTS user_stream_records (
  id         BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  quantity   INT NOT NULL,
  date       DATE NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
)