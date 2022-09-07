const URL_REGEXP = new RegExp(/(((http(s)?):\/\/)?(www\.)?)?[a-zA-Z0-9@:%_\-\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, "gi");
const NOT_FOUND_CODE = 404;
const INVALID_DATA_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

module.exports = {
  URL_REGEXP,
  NOT_FOUND_CODE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE
};