export const capitalizeFirstLetter = (str, defaultStr) => {
  const word = str || defaultStr;
  if (!word) {
    return '';
  }
  return word[0].toUpperCase() + word.slice(1);
};
