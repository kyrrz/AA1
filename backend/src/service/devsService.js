const db = require("../configuration/database").db;

const findAllDevs = async () => {
  const result = await db("devs").select("*");

  return result;
};

const findDev = async (devName) => {
  const result = await db("devs").select("*").where({ name: devName }).first();
  return result || null;
};

const registerDev = async (
  devName,
  devCountry,
  devFoundationYear,
  devYearlyIncome,
  devYearsActive
) => {
  const result = await db("devs")
    .insert({
      name: devName,
      country: devCountry,
      foundation_year: devFoundationYear,
      yearly_income: devYearlyIncome,
      years_active: devYearsActive,
    })
    .then(async (ids) => {
      devId = ids[0];
    });
  return result;
};

const modifyDev = async (
  devName,
  devCountry,
  devFoundationYear,
  devYearlyIncome,
  devYearsActive
) => {
  const result = await db("devs")
    .where({
      name: devName,
    })
    .update({
      country: devCountry,
      foundation_year: devFoundationYear,
      yearly_income: devYearlyIncome,
      years_active: devYearsActive,
    })
    .returning("id");
  return result;
};

const removeDev = async (devName) => {
  const result = await db("devs").del("*").where({ name: devName });

  return result;
};
console.log("Dev services loaded");
module.exports = {
  findAllDevs,
  findDev,
  registerDev,
  modifyDev,
  removeDev,
};
