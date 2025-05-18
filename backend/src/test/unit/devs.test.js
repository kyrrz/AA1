jest.mock("../../service/devsService");

const httpMocks = require("node-mocks-http");
const { describe, it, expect, afterEach } = require("@jest/globals");

const devsController = require("../../controller/devsController");
const devsService = require("../../service/devsService");
const econUtils = require("../../economyUtils.js");
const dateUtils = require("../../dateUtils.js");

const mockedFindDevs = jest.spyOn(devsService, "findAllDevs");
const mockedRegisterDev = jest.spyOn(devsService, "registerDev");
const mockedModifyDev = jest.spyOn(devsService, "modifyDev");
const mockedFindDev = jest.spyOn(devsService, "findDev");
const mockedRemoveDev = jest.spyOn(devsService, "removeDev");
const mockedGeyYears = jest.spyOn(dateUtils, "getYears");
const mockedGetStudioValue = jest.spyOn(econUtils, "getStudioValue");

const {
  mockDevArray,
  mockDevToModify,
  mockDevToDelete,
  mockDevResponse,
  mockDevRegister,
  mockDevRegisterResponse,
  mockDevToGet,
} = require("./mocks/devs.js");

afterEach(() => {
  jest.clearAllMocks();
});

describe("devs", () => {
  it("GET /devs should get a dev list", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/devs";

    const mockedDevList = jest.fn(async () => {
      return mockDevArray;
    });
    mockedFindDevs.mockImplementation(mockedDevList);

    await devsController.getDevs(request, response);
    expect(mockedFindDevs).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().length).toEqual(5);
  });

  it("GET /devs/:dev should get a dev ", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/devs";
    request.params = { dev: "Rockstar Games" };

    const mockedDev = jest.fn(async () => {
      return mockDevToGet;
    });
    mockedFindDev.mockImplementation(mockedDev);

    await devsController.getDev(request, response);
    expect(mockedFindDev).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().name).toEqual("Rockstar Games");
    expect(response._getJSONData().country).toEqual("USA");
  });

  it("POST /devs should register a new dev", async () => {
    const findDevMock = jest.fn().mockResolvedValue(null); // Assuming dev not found
    const getYearsMock = jest.fn().mockReturnValue(1); // Mock return value
    const getStudioValueMock = jest.fn().mockReturnValue(1000000); // Mock return value
    mockedFindDev.mockImplementation(findDevMock);
    mockedGeyYears.mockImplementation(getYearsMock);
    mockedGetStudioValue.mockImplementation(getStudioValueMock);
    mockedRegisterDev.mockResolvedValue(mockDevRegisterResponse);
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/devs";
    request.body = mockDevRegister;
    const mockedRegisterDevResponse = jest.fn(async () => {
      return mockDevRegisterResponse;
    });
    mockedRegisterDev.mockImplementation(mockedRegisterDevResponse);

    await devsController.postDev(request, response);
    expect(mockedRegisterDev).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(201);
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("PUT /devs/:dev should modify a dev", async () => {
    const findDevMock = jest.fn().mockResolvedValue(mockDevToModify);
    mockedFindDev.mockImplementation(findDevMock);
    const getYearsMock = jest.fn().mockReturnValue(37);
    const getStudioValueMock = jest.fn().mockReturnValue(100000000); // Mock return value
    mockedGeyYears.mockImplementation(getYearsMock);
    mockedGetStudioValue.mockImplementation(getStudioValueMock);

    mockedModifyDev.mockResolvedValue({
      ...mockDevToModify,
      status: "modified",
    });
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/devs/";
    request.params = { dev: "Ubisoft" };
    request.body = mockDevToModify;

    const mockedModifyDevResponse = jest.fn(async () => mockDevResponse);
    mockedModifyDev.mockImplementation(mockedModifyDevResponse);

    await devsController.putDev(request, response);

    expect(mockedModifyDev).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(200);
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("DELETE /devs/:dev should delete a dev", async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.app = {};
    request.app.conf = {};
    request.path = "/devs/Ubisoft";
    request.params = { dev: "Ubisoft" };

    const mockedDeleteDevResponse = jest.fn(async () => mockDevToDelete);
    mockedRemoveDev.mockImplementation(mockedDeleteDevResponse);

    await devsController.deleteDev(request, response);

    expect(mockedRemoveDev).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toEqual(204);
    expect(response._isEndCalled()).toBeTruthy();
  });
});
