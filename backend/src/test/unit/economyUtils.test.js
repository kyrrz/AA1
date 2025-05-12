const expect = require("chai").expect;
const { getYears, getStudioValue } = require("../../economyUtils");

describe("economyUtils", () => {
  it("getStudioValue", () => {
    let value = getStudioValue(200, 5);
    expect(value).to.equal(1000);

    value = getStudioValue(100, 10);
    expect(value).to.equal(1000);

    value = getStudioValue(0, 10);
    expect(value).to.equal(0);
  });
});
