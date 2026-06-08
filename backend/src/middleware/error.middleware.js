function errorMiddleware(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorMiddleware;
