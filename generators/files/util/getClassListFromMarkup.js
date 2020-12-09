module.exports = (markup) => {
  // Get all unique css classes in html into dict
  var classRegexp = /class=['"](.*?)['"]/g;
  var dict = [];
  var m;
  while ((m = classRegexp.exec(markup))) {
    var classes = m[1].replace(/\s+/g, ' ').trim();
    classes.split(' ').forEach(function(item) {
      dict[item] = true;
    });
  }

  // convert dict to arr
  var arr = [];
  for (var key in dict) arr.push(key);

  return arr;
};
