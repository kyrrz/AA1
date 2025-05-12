const expect = require("chai").expect;
const { getYears } = require("../../dateUtils");

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-05-05"));
});

afterAll(() => {
  jest.useRealTimers();
});

describe("dateUtils", () => {
  it("getYears", () => {
    let AmountYears = getYears(2020);
    expect(AmountYears).to.equal(5);

    AmountYears = getYears(2000);
    expect(AmountYears).to.equal(25);

    AmountYears = getYears(2025);
    expect(AmountYears).to.equal(0);

    AmountYears = getYears(2030);
    expect(AmountYears).to.equal(-5);
  });
});
