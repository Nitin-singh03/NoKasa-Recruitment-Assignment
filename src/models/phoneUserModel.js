/**
 * Minimal phone user model (schema-only + normalizer).
 * Service layer performs hashing and stores { id, passwordHash }.
 */

/** Normalize phone: remove non-digits */
export function normalizeId(raw) {
  if (!raw) return '';
  return String(raw).replace(/\D/g, '');
}

export const schema = {
  id: 'digits-only phone (10-15 digits recommended)',
  password: 'string'
};

export default { normalizeId, schema };
