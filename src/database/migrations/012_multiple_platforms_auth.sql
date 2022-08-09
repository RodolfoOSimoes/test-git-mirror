-- This script modifies the authentication structure in the database to add
-- support for multiple platforms.

-- Create and fill platforms table.

CREATE TABLE IF NOT EXISTS `platforms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(48) COLLATE UTF8_UNICODE_CI NOT NULL,
  `name` VARCHAR(255) COLLATE UTF8_UNICODE_CI NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO
  `platforms` (`id`, `code`, `name`)
VALUES
  (1, 'spotify', 'Spotify'),
  (2, 'deezer', 'Deezer'),
  (3, 'youtube', 'YouTube');

-- Create and fill users_platforms table.

CREATE TABLE IF NOT EXISTS `users_platforms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `platform_id` BIGINT NOT NULL,
  `uid` VARCHAR(255) NOT NULL,
  `credentials` JSON DEFAULT NULL,
  `product` VARCHAR(255) DEFAULT NULL,
  `last_product_check` DATETIME DEFAULT NULL,
  `last_activity` DATETIME DEFAULT NULL,
  `last_activity_processing` DATETIME DEFAULT NULL,
  `last_access` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`platform_id`) REFERENCES `platforms` (`id`)
);

DROP PROCEDURE IF EXISTS insert_user_platform;

DELIMITER $$
CREATE PROCEDURE insert_user_platform(IN user_id BIGINT)
BEGIN
  DECLARE user_platform_id BIGINT DEFAULT 0;
    DECLARE user_last_activity_processing datetime DEFAULT null;
    DECLARE user_provider varchar(255);
    DECLARE user_uid varchar(255);
    DECLARE user_credentials json;
    DECLARE user_product varchar(255);
    DECLARE user_last_time_checked_product datetime;
    DECLARE user_last_heard datetime;
    DECLARE user_last_access datetime;
    DECLARE user_last_deezer_history_check datetime;

  DECLARE user_cursor CURSOR FOR SELECT 
    provider,
    uid,
    credentials,
    product,
    last_time_checked_product,
    last_heard,
    last_access,
    last_deezer_history_check
  FROM
    users
  WHERE
    id = user_id;
  
    OPEN user_cursor;
  FETCH user_cursor INTO user_provider, user_uid, user_credentials, user_product, user_last_time_checked_product, user_last_heard, user_last_access, user_last_deezer_history_check;

  IF user_provider = 'spotify' THEN
    SET user_platform_id = 1;
    SET user_last_activity_processing = null;
  ELSEIF user_provider = 'deezer' THEN
    SET user_platform_id = 2;
    SET user_last_activity_processing = user_last_deezer_history_check;
  END IF;

  INSERT INTO users_platforms
  (
    user_id,
    platform_id,
    uid,
    credentials,
    product,
    last_product_check,
    last_activity,
    last_activity_processing,
    last_access,
    created_at,
    updated_at
    )
  VALUES
  (
    user_id,
    user_platform_id,
    user_uid,
    user_credentials,
    user_product,
    user_last_time_checked_product,
    user_last_heard,
    user_last_activity_processing,
    user_last_access,
    NOW(),
    NOW()
    );

    CLOSE user_cursor;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS modify_authentication;

DELIMITER $$
CREATE PROCEDURE modify_authentication()
BEGIN
  DECLARE user_id BIGINT;
  DECLARE users_cursor CURSOR FOR SELECT id FROM users;
  SET @users_count = (SELECT count(*) FROM users);
  SET @i = 0;  

    OPEN users_cursor;  
  WHILE @i < @users_count DO
    FETCH users_cursor INTO user_id;
    CALL insert_user_platform(user_id);
    SET @i := @i + 1;
    END WHILE;
    CLOSE users_cursor;
END $$
DELIMITER ;

call modify_authentication();

DROP PROCEDURE IF EXISTS modify_authentication;
DROP PROCEDURE IF EXISTS insert_user_platform;

DROP INDEX `index_users_on_provider_and_email_and_uid` ON users;
DROP INDEX `index_users_on_provider_and_uid` ON users;

-- TODO: Remove unused columns from users table.

-- TODO: Remove table account_providers.

ALTER TABLE `authentication_tokens`
  CHANGE COLUMN `body` `body2` VARCHAR(255),
  ADD COLUMN `body` VARCHAR(5000) AFTER `id`,
  ADD COLUMN `user_platform_id` BIGINT NOT NULL;

-- TODO: fill user_platform_id column and copy body2 to body.

ALTER TABLE `authentication_tokens`
  DROP COLUMN `body2`;


-- TODO: Fix script below to add foreign key.
-- ALTER TABLE `authentication_tokens`
-- ADD CONSTRAINT `fk_users_platforms_a1` FOREIGN KEY (`user_platform_id`) REFERENCES `users_platforms` (`id`);
