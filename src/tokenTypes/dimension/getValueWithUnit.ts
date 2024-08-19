const unitMap = {
  Percent: "%",
  Pixels: "px",
};

export const getValueWithUnit = (value) => {
  if (!value) return null;

  const { unit, measure } = value;
  const unitMapValue = unitMap[unit];

  if (!unitMapValue) {
    throw new Error(`Unit "${unit}" is not supported.`);
  }

  return `${measure}${unitMapValue}`;
};
