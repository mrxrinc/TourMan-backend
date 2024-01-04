const uniqueSuffix =
  Date.now() +
  '-' +
  Math.round(Math.random() * 1e9)
    .toString(36)
    .substring(2);

export default uniqueSuffix;
