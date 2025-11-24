// backend/src/middlewares/timezone.js
export default function timezoneMiddleware(req, res, next) {
  // Set timezone for the request
  req.timezone = req.headers['timezone'] || 'UTC';
  next();
}