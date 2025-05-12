function getStudioValue(yearly_income, yearsActive) {
  const value = yearly_income * yearsActive;
  return value;
}

module.exports = {
  getStudioValue,
};
