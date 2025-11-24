export default function timezoneMiddleware(req, _res, next) {
  const tz = req.headers['x-user-timezone'] || null;
  if (tz) req.userTimezone = tz;
  next();
}
