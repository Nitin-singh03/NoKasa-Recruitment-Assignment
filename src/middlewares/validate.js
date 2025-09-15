export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ success: false, message: 'Validation error', data: { errors: details } });
    }
    req.body = value; // sanitized
    next();
  };
}
