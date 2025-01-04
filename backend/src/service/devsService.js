const db = require("../../knexfile.js").db;

const findAllDevs = async () => {
  const result = await db("vapor").select("*").from("devs");
  return result;
};

const findDev = async () => {
  const result = await db("vapor")
    .select("*")
    .from("devs")
    .where({ name: devName })
    .first();
  return result;
};

const registerDev = async (devName, devCountry, devYear) => {
  const result = await db("vapor").insert({
    name: devName,
    country: devCountry,
    year: devYear,
  });
  return result;
};

const modifyDev = async (devName, devCountry, devYear) => {
  const result = await db("vapor")
    .where({
      name: devName,
    })
    .update({ country: devCountry, year: devYear });

  return result;
};

const removeDev = async (devName) => {
  const result = await db("vapor").del().from("devs").where({ name: devName });

  return result;
};

module.exports = {
  findAllDevs,
  findDev,
  registerDev,
  modifyDev,
  removeDev,
};
