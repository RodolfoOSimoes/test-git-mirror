const STATEMENT_EXPIRATION_TIME = 90;

export function getExpirationDate(): Date {
  const expiration: Date = new Date();
  expiration.setDate(expiration.getDate() + STATEMENT_EXPIRATION_TIME);
  return expiration;
}
