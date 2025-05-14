CREATE DATABASE IF NOT EXISTS entornosAA2;
GRANT ALL PRIVILEGES ON entornosAA2.* TO alvaro;
USE entornosAA2;

CREATE TABLE devs (
  name VARCHAR(50) PRIMARY KEY,
  country VARCHAR(50) NOT NULL,
  foundation_year INT UNSIGNED NOT NULL,
  yearly_income BIGINT UNSIGNED NOT NULL,
  years_active INT UNSIGNED NOT NULL
);

INSERT INTO devs (name, country, foundation_year, yearly_income, years_active) VALUES
('Epic Games', 'United States', 1991, 1000000000, 34),
('Nintendo', 'Japan', 1889, 5000000000, 136),
('Rockstar Games', 'United States', 1998, 2000000000, 27),
('Valve Corporation', 'United States', 1996, 1500000000, 29),
('Ubisoft', 'France', 1986, 3000000000, 39);

CREATE TABLE games (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  year INT UNSIGNED NOT NULL,
  dev VARCHAR(50),
  CONSTRAINT fk_dev FOREIGN KEY (dev) REFERENCES devs(name) ON DELETE SET NULL
);


INSERT INTO games (name, genre, year, dev) VALUES
('Fortnite', 'Battle Royale', 2017, 'Epic Games'),
('The Legend of Zelda: Breath of the Wild', 'Action-adventure', 2017, 'Nintendo'),
('Grand Theft Auto V', 'Action-adventure', 2013, 'Rockstar Games'),
('Half-Life 2', 'First-person shooter', 2004, 'Valve Corporation'),
('Assassins Creed Valhalla', 'Action role-playing', 2020, 'Ubisoft');
