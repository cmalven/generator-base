module.exports = (markup) => {
  // Get all unique css classes in html into dict
  const classRegexp = /class=['"](.*?)['"]/g;
  let dict = [];
  let m;
  while ((m = classRegexp.exec(markup))) {
    let classes = m[1].replace(/\s+/g, ' ').trim();
    classes.split(' ').forEach(function(item) {
      dict[item] = true;
    });
  }

  // convert dict to arr
  let arr = [];
  for (let key in dict) arr.push(key);

  return arr;
};
