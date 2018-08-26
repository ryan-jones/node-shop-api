
function createURL(schema = '', id = '') {
  return `${process.env.dbURL}/${schema}/${id}`;
}

module.exports = { createURL };