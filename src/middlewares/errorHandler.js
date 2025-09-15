export function notFoundHandler(req, res, next) {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ success: false, message });
}
