import crypto from 'node:crypto';

const SESSION_SECRET =
  process.env.SESSION_SECRET || 'burn-notice-dev-secret-change-me';

export const ADMIN_COOKIE = 'admin_token';

export function makeToken() {
  const payload = String(Date.now());
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${sig}`;
}

export function isValidToken(token) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  const expected = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');
  return sig === expected;
}
