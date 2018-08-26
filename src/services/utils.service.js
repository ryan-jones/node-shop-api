
function createURL(path = '', schema = '', id = '') {
  return `${path}/${schema}/${id}`;
}

function passwordIsInvalid(password = '') {
  return password.length <= 6;
}

module.exports = { createURL, passwordIsInvalid };