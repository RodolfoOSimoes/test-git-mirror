ALTER TABLE settings
ADD COLUMN show_cookie_consent BOOLEAN NOT NULL DEFAULT false AFTER terms_and_conditions,
ADD COLUMN cookie_consent_title VARCHAR(255) NOT NULL DEFAULT "" AFTER show_cookie_consent,
ADD COLUMN cookie_consent_text TEXT NOT NULL DEFAULT "" AFTER cookie_consent_title;