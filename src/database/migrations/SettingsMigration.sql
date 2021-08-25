ALTER TABLE settings 
ADD COLUMN splash_screen_title VARCHAR(255),
ADD COLUMN splash_screen_message TEXT, 
ADD COLUMN enabled_splash_screen TINYINT(4) DEFAULT 1