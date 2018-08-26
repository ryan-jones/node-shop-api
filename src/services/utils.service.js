
function createURL(schema = '', id = '') {
  return `${process.env.dbURL}/${schema}/${id}`;
}

function passwordIsInvalid(password = '') {
  return password.length <= 6;
}

module.exports = { createURL, passwordIsInvalid };