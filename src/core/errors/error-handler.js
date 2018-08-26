
const errorTypes = require('./errors');
const _has = require('lodash/has');
/**
 * Normalise error
 * @param {Error} err
 */
const cleanError = err => {
  if (err.errors) {
    if (err.errors.email) {
      return errorTypes.badRequest(err, err.errors.email.message);
    }
    if (err.errors.password) {

    }
  }
}
/**
 * Handle all API errors
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 */
module.exports = (err, req, res, next) => {
  console.log('err****************************', err);
  console.log('req********************', req.body);

  err = cleanError(err);

  const response = {
    code: err.code || err.status || 500,
    message: err.message
  };

  res.status(err.code).json(response);
  res.end();
};