-- Create the database
CREATE DATABASE IF NOT EXISTS `freelance-template`;

-- Create the admin user if it doesn't exist
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin123';

-- Grant all privileges to the admin user on the database
GRANT ALL PRIVILEGES ON `freelance-template`.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON `freelance-template`.* TO 'admin'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;
