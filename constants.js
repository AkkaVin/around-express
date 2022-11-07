const URL_REGEXP = /(((http(s)?):\/\/)?(www\.)?)?[a-zA-Z0-9@:%_\-~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
const NOT_FOUND_CODE = 404;
const INVALID_DATA_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;

const LIMITER_CONFIG = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

module.exports = {
  URL_REGEXP,
  NOT_FOUND_CODE,
  INVALID_DATA_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  LIMITER_CONFIG,
};
