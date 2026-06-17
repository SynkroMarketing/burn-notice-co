import crypto from 'node:crypto';

const DEV_FALLBACK_SECRET = 'burn-notice-dev-secret-change-me';

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set in production.');
  }
  return DEV_FALLBACK_SECRET;
}

export const ADMIN_COOKIE = 'admin_token';

// Tokens expire after 7 days, matching the cookie maxAge.
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function makeToken() {
  const payload = String(Date.now());
  return `${payload}.${sign(payload)}`;
}

export function isValidToken(token) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  const issuedAt = Number(payload);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > TOKEN_MAX_AGE_MS) return false;
  const expected = Buffer.from(sign(payload), 'hex');
  const provided = Buffer.from(sig || '', 'hex');
  return (
    provided.length === expected.length &&
    crypto.timingSafeEqual(provided, expected)
  );
}
