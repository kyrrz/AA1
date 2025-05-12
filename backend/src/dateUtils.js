function getYears(year) {
  const currentYear = new Date().getFullYear();
  const AmountYears = currentYear - year;

  return AmountYears;
}

module.exports = {
  getYears,
};
