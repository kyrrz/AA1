jest.mock("../../service/gamesService");
jest.mock("../../service/devsService");

const httpMocks = require("node-mocks-http");
const { describe, it, expect, afterEach } = require("@jest/globals");

const gamesController = require("../../controller/gamesController");
const gamesService = require("../../service/gamesService");
const econUtils = require("../../economyUtils.js");
const dateUtils = require("../../dateUtils.js");

const mockedFindGames = jest.spyOn(gamesService, "findAllGames");
const mockedRegisterGame = jest.spyOn(gamesService, "registerGame");
const mockedModifyGame = jest.spyOn(gamesService, "modifyGame");
const mockedFindGame = jest.spyOn(gamesService, "findGame");
const mockedRemoveGame = jest.spyOn(gamesService, "removeGame");
const mockedGeyYears = jest.spyOn(dateUtils, "getYears");
const mockedGetStudioValue = jest.spyOn(econUtils, "getStudioValue");

const {
  mockGameArray,
  mockGameToModify,
  mockGameToDelete,
  mockGameResponse,
  mockGameRegister,
  mockGameRegisterResponse,
  mockGameToGet,
} = require("./mocks/games.js");
const { mockDevRegister } = require("./mocks/devs.js");

afterEach(() => {
  jest.clearAllMocks();
});

describe("games", () => {
  it("GET /games should get a game list", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/games";

    const mockedGameList = jest.fn(async () => {
      return mockGameArray;
    });
    mockedFindGames.mockImplementation(mockedGameList);

    await gamesController.getGames(request, response);
    expect(mockedFindGames).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("GET /games/:game should get a game ", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/games";
    request.params = { game: "Grand Theft Auto V" };

    const mockedGame = jest.fn(async () => {
      return mockGameToGet;
    });
    mockedFindGame.mockImplementation(mockedGame);

    await gamesController.getGame(request, response);
    expect(mockedFindGame).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().name).toEqual("Grand Theft Auto V");
  });

  it("POST /games should register a new game", async () => {
    const findGameMock = jest.fn().mockResolvedValue(null); // Assuming game not found
    mockedFindGame.mockImplementation(findGameMock);

    const findDevMock = jest.fn().mockResolvedValue({ name: "Rockstar Games" });
    jest
      .spyOn(require("../../service/devsService"), "findDev")
      .mockImplementation(findDevMock);

    mockedRegisterGame.mockResolvedValue(mockGameRegisterResponse);
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/games";
    request.body = mockGameRegister;
    const mockedRegisterGameResponse = jest.fn(async () => {
      return mockGameRegisterResponse;
    });
    mockedRegisterGame.mockImplementation(mockedRegisterGameResponse);

    await gamesController.postGame(request, response);
    expect(mockedRegisterGame).toHaveBeenCalledTimes(1);
  });

  it("PUT /games/:game should modify a dev", async () => {
    const findGameMock = jest.fn().mockResolvedValue(mockGameToModify);
    mockedFindGame.mockImplementation(findGameMock);

    const findDevMock = jest.fn().mockResolvedValue({ name: "Epic Games" });
    jest
      .spyOn(require("../../service/devsService"), "findDev")
      .mockImplementation(findDevMock);

    mockedModifyGame.mockResolvedValue({
      ...mockGameToModify,
      status: "modified",
    });
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/games/";
    request.params = { game: "CyberRealm 2077" };
    request.body = mockGameToModify;

    const mockedModifyGameResponse = jest.fn(async () => mockGameResponse);
    mockedModifyGame.mockImplementation(mockedModifyGameResponse);

    await gamesController.putGame(request, response);
      
    expect(mockedModifyGame).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("DELETE /games/:game should delete a game", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/games/Assassin's Creed Valhalla";
    request.params = { game: "Assassin's Creed Valhalla" };

    const mockedDeleteGameResponse = jest.fn(async () => mockGameToDelete);
    mockedRemoveGame.mockImplementation(mockedDeleteGameResponse);

    await gamesController.deleteGame(request, response);

    expect(mockedRemoveGame).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(204);
    expect(response._isEndCalled()).toBeTruthy();
  });
});
