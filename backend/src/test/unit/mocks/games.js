// Mock games array with sample data
exports.mockGamesArray = [
  {
    id: 1,
    name: "Fortnite",
    genre: "Battle Royale",
    year: 2017,
    dev: "Epic Games",
  },
  {
    id: 2,
    name: "The Legend of Zelda: Breath of the Wild",
    genre: "Action-Adventure",
    year: 2017,
    dev: "Nintendo",
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    genre: "Action-Adventure",
    year: 2013,
    dev: "Rockstar Games",
  },
  {
    id: 4,
    name: "Half-Life: Alyx",
    genre: "VR FPS",
    year: 2020,
    dev: "Valve",
  },
  {
    id: 5,
    name: "Assassin's Creed Valhalla",
    genre: "Action RPG",
    year: 2020,
    dev: "Ubisoft",
  },
  {
    id: 6,
    name: "Red Dead Redemption 2",
    genre: "Action-Adventure",
    year: 2018,
    dev: "Rockstar Games",
  },
];

// Mock game to be deleted in tests
exports.mockGameToDelete = {
  name: "Assassin's Creed Valhalla",
  genre: "Action RPG",
  year: 2020,
  dev: "Ubisoft",
};

// Mock game to be retrieved in tests
exports.mockGameToGet = {
  name: "Grand Theft Auto V",
  genre: "Action-Adventure",
  year: 2013,
  dev: "Rockstar Games",
};

// Mock game registration data for POST tests
exports.mockGameRegister = {
  name: "CyberRealm 2077",
  genre: "Sci-Fi RPG",
  year: 2025,
  dev: "Rockstar Games",
};

// Mock game to be modified in PUT tests
exports.mockGameToModify = {
  name: "Fortnite",
  genre: "Battle Royale MOBA",
  year: 2017,
  dev: "Epic Games",
};

// Mock game response for various operations
exports.mockGameResponse = {
  name: "Half-Life 3",
  genre: "FPS",
  year: 2026,
  dev: "Valve",
};

// Mock game registration response
exports.mockGameRegisterResponse = {
  name: "CyberRealm 2077",
  genre: "Sci-Fi RPG",
  year: 2025,
  dev: "Rockstar Games",
  status: "created",
};

// Mock game update response
exports.mockGameUpdateResponse = {
  name: "Fortnite",
  genre: "Battle Royale MOBA",
  year: 2017,
  dev: "Epic Games",
  status: "modified",
};
