CREATE TABLE IF NOT EXISTS cash_backs_balance (
  id              BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT(20)    NOT NULL,
  rescue_id       BIGINT(20)    NOT NULL,
  balance         DECIMAL(13,2) NULL,
  created_at      DATETIME      NOT NULL,
  updated_at      DATETIME      NOT NULL,
  FOREIGN KEY (user_id)   REFERENCES users   (id),
  FOREIGN KEY (rescue_id) REFERENCES rescues (id)
)