const capitalCase = require('capital-case').capitalCase;

module.exports = (str) => {
  const isLayout = str.match(/^_?l-/g);
  let title = capitalCase(str);
  if (isLayout) title = title.replace('L ', 'Layout - ');
  return title;
};
