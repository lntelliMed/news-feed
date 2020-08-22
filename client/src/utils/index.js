export const capitalizeFirstLetter = (str, defaultStr) =>
  str ? str[0].toUpperCase() + str.slice(1) : defaultStr;
