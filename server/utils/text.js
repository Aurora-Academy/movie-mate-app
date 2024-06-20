const slugify = require("slugify");

const slugger = (text) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
  });
};

module.exports = { slugger };
