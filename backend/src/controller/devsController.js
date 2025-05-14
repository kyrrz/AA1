const {
  findAllDevs,
  findDev,
  registerDev,
  modifyDev,
  removeDev,
} = require("../service/devsService");

const { getYears } = require("../dateUtils");
const { getStudioValue } = require("../economyUtils");

//Operacion que devuelve todos los devs de la BBDD

const getDevs = async (req, res) => {
  const data = await findAllDevs();

  if (data === undefined) {
    res.status(404).json({
      status: "not-found",
      message: "Devs not found",
    });
    return;
  }
  res.status(200).json(data);
};

//Operacion que devuelve un dev determinado

const getDev = async (req, res) => {
  if (req.params.dev === undefined || req.params.dev === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Dev name is required",
    });
    return;
  }
  const data = await findDev(req.params.dev);
  if (data === undefined) {
    res.status(404).json({
      status: "not-found",
      message: "Dev not found",
    });
    return;
  }
  res.status(200).json(data);
};

//Operacion que registra un nuevo dev

const postDev = async (req, res) => {
  devFound = await findDev(req.body.name);
  if (devFound) {
    return res.status(409).json({
      status: "conflict",
      message: "Dev already registered",
    });
  }

  if (req.body.name === undefined || req.body.name === "") {
    return res.status(400).json({
      status: "bad-request",
      message: "Dev name is required",
    });
  }

  if (req.body.country === undefined || req.body.country === "") {
    return res.status(400).json({
      status: "bad-request",
      message: "Dev country is required",
    });
  }

  if (
    req.body.foundation_year === undefined ||
    req.body.foundation_year === ""
  ) {
    return res.status(400).json({
      status: "bad-request",
      message: "Dev year is required",
    });
  }
  const yearsActive = getYears(req.body.foundation_year);
  const studioValue = getStudioValue(req.body.yearly_income, yearsActive);

  await registerDev(
    req.body.name,
    req.body.country,
    req.body.foundation_year,
    req.body.yearly_income,
    yearsActive
  );

  res.status(201).json({
    name: req.body.name,
    country: req.body.country,
    foundation_year: req.body.foundation_year,
    yearly_income: req.body.yearly_income,
    years_active: yearsActive,
    studio_value: studioValue,
    status: "created",
  });
};
//Operacion que modifica los datos de un dev en la BBDD

const putDev = async (req, res) => {
  const devsFound = await findDev(req.params.dev);

  if (!devsFound) {
    res.status(404).json({
      status: "not-found",
      message: "Dev not found",
    });
    return;
  }
  if (req.params.dev === undefined || req.params.dev === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Dev name is required",
    });
    return;
  }
  if (req.body.country === undefined || req.body.country === "") {
    res.status(400).json({
      status: "bad-request",
      message: "Dev country is required",
    });
    return;
  }

  if (
    req.body.foundation_year === undefined ||
    req.body.foundation_year === ""
  ) {
    res.status(400).json({
      status: "bad-request",
      message: "Dev year is required",
    });
    return;
  }
  const yearsActive = getYears(req.body.foundation_year);
  const studioValue = getStudioValue(req.body.yearly_income, yearsActive);

  await modifyDev(
    req.params.dev,
    req.body.country,
    req.body.foundation_year,
    req.body.yearly_income,
    yearsActive
  );

  res.status(200).json({
    name: req.body.name,
    country: req.body.country,
    foundation_year: req.body.foundation_year,
    yearly_income: req.body.yearly_income,
    yearsActive: yearsActive,
    studioValue: studioValue,
    status: "modified",
  });
};

//Operacion que elimina un dev de la BBDD

const deleteDev = async (req, res) => {
  const removed = await removeDev(req.params.dev);
  if (!removed) {
    res.status(404).json({
      status: "not-found",
      message: "Dev not found",
    });
    return;
  }

  res.status(204).json();
};

module.exports = {
  getDevs,
  getDev,
  postDev,
  putDev,
  deleteDev,
};
