module.exports = (s, size) => {
  let str = s;
  while (str.length < (size || 2)) {
    str = `0${str}`;
  }
  return str;
};
