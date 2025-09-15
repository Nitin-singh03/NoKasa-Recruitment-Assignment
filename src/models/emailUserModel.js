export function normalizeId(raw) {
  if (!raw) return '';
  return String(raw).trim().toLowerCase();
}

export const schema = {
  id: 'email',
  password: 'string'
};

export default { normalizeId, schema };
