// src/controllers/hello.controller.js
export function hello(req, res) {
  res.json({
    ok: true,
    message: 'Hello from backend (structured)!',
    time: new Date().toISOString(),
    timezone: req.userTimezone || null
  });
}
