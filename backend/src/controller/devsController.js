const {
  findAllDevs,
  findDev,
  registerDev,
  modifyDev,
  removeDev,
} = require("../service/devsService");
console.log("Dev controller loaded");
//Operacion que devuelve todos los devs de la BBDD

const getDevs = async (req, res) => {
  const data = await findAllDevs();

  res.status(200).json(data);
};

//Operacion que devuelve un dev determinado

const getDev = async (req, res) => {
  const data = await findDev(req.params.dev);

  res.status(200).json(data);
};

//Operacion que registra un nuevo dev

const postDev = async (req, res) => {
  await registerDev(req.body.name, req.body.country, req.body.year);

  res.status(201).json({});
};

//Operacion que modifica los datos de un dev en la BBDD

const putDev = async (req, res) => {
  await modifyDev(req.params.dev, req.body.country, req.body.year);

  res.status(204).json({});
};

//Operacion que elimina un dev de la BBDD

const deleteDev = async (req, res) => {
  await removeDev(req.params.dev);

  res.status(204).json({});
};

module.exports = {
  getDevs,
  getDev,
  postDev,
  putDev,
  deleteDev,
};
