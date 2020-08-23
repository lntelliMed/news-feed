import moment from 'moment';

export const capitalizeFirstLetter = (str, defaultStr) => {
  const word = str || defaultStr;
  if (!word) {
    return '';
  }
  return word[0].toUpperCase() + word.slice(1);
};

export const shortenString = (str, desiredLength) => {
  if (!str || !str.length) {
    return '';
  }
  return str.slice(0, desiredLength) + '...';
};

export const formatDate = (str) => {
  if (!str || !str.length) {
    return 'N/A';
  }

  try {
    return moment(str).format('D MMMM YYYY');
  } catch (err) {
    console.error(err);
    return str;
  }
};
