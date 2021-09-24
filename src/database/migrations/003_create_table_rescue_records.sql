CREATE TABLE IF NOT EXISTS rescue_records (
  id         BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  user_id    BIGINT(20) NOT NULL,
  uri        VARCHAR(255) NOT NULL,
  name       VARCHAR(255) NOT NULL,
  date       DATE NOT NULL,
  played_at  DATETIME NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
)