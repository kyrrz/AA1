const db = require("../configuration/database").db;

const findAllDevs = async () => {
  const result = await db("devs").select("*");
  return result;
};

const findDev = async () => {
  const result = await db("devs").select("*").where({ name: devName }).first();
  return result;
};

const registerDev = async (devName, devCountry, devYear) => {
  const result = await db("devs").insert({
    name: devName,
    country: devCountry,
    year: devYear,
  });
  return result;
};

const modifyDev = async (devName, devCountry, devYear) => {
  const result = await db("devs")
    .where({
      name: devName,
    })
    .update({ country: devCountry, year: devYear });

  return result;
};

const removeDev = async (devName) => {
  const result = await db("devs").del().where({ name: devName });

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
