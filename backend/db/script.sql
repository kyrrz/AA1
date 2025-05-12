CREATE DATABASE IF NOT EXISTS entornosAA2;

CREATE USER IF NOT EXISTS 'alvaro'@'%' IDENTIFIED BY 'alvaro';
GRANT ALL PRIVILEGES ON entornosAA2.* TO 'alvaro'@'%';

FLUSH PRIVILEGES;

USE entornosAA2;

CREATE TABLE devs (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL UNIQUE,
	country	VARCHAR(50),
	foundation_year	INT,
	yearly_income BIGINT,
	years_active INT
);

INSERT INTO devs (name, country, foundation_year, yearly_income, years_active) VALUES
('Epic Games', 'United States', 1991, 1000000000, 32),
('Nintendo', 'Japan', 1889, 5000000000, 134),
('Rockstar Games', 'United States', 1998, 2000000000, 25),
('Valve Corporation', 'United States', 1996, 1500000000, 27),
('Ubisoft', 'France', 1986, 3000000000, 37);

CREATE TABLE games (
	id	INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name	VARCHAR(100) NOT NULL,
	genere	VARCHAR(50) NOT NULL,
	year	INT,
	dev	VARCHAR(100) NOT NULL,
	devId INT UNSIGNED NOT NULL,
	CONSTRAINT fk_dev FOREIGN KEY (devId) REFERENCES devs(id)
);

INSERT INTO games (name, genere, year, dev, devId) VALUES
('Fortnite', 'Battle Royale', 2017, 'Epic Games', 1),
('The Legend of Zelda: Breath of the Wild', 'Action-adventure', 2017, 'Nintendo', 2),
('Grand Theft Auto V', 'Action-adventure', 2013, 'Rockstar Games', 3),
('Half-Life 2', 'First-person shooter', 2004, 'Valve Corporation', 4),
('Assassins Creed Valhalla', 'Action role-playing', 2020, 'Ubisoft', 5);
