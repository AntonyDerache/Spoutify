export default (params: object) => {
  let toConcatUrl = '?';

  Object.entries(params).forEach(([key, value]) => {
    toConcatUrl = toConcatUrl.concat(`${key}=${value}`);
    toConcatUrl = toConcatUrl.concat('&');
  });
  return toConcatUrl.slice(0, -1);
};
