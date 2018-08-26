const httpStatus = require('http-status');

module.exports = {
  unauthorized,
  unavailable,
  forbidden,
  internal,
  badRequest,
  notFound
}

const cleanError = err => {
  if (err.code) {
    return err;
  } else if (err.hasOwnProperty('email') && err.email.hasOwnProperty('message')) {
    return errorTypes.badRequest(err);
  } else {
    return errorTypes.internal(err);
  }
}

/**
 * Normalize error message
 * @param {Number} statusCode
 * @param {String} message
 */
function buildErrorMessage(statusCode, message = '') {
  return message ? `${httpStatus[statusCode]} - ${message}` : httpStatus[statusCode];
};

/**
 * Build common API error
 * @param {Number} statusCode - HTTP status code
 * @param {Error} err - API Error
 */
function buildError(statusCode = 500, err, message) {

  const error = new Error(buildErrorMessage(statusCode, message));

  error.name = 'API Error';
  error.code = statusCode;
  error.status = false;


  if (!error.stack) {
    Error.captureStackTrace(this, this);
  }
  return error;
};

function badRequest(err, message) {
 return buildError(400, err, message);
} 

function unauthorized(err, message) {
 return buildError(401, err, message);
} 

function forbidden(err, message) {
 return buildError(403, err, message);
} 

function notFound(err, message) {
 return buildError(404, err, message);
} 

function internal(err, message) {
 return buildError(500, err, message);
} 

function unavailable(err, message) {
 return buildError(503, err, message);
} 