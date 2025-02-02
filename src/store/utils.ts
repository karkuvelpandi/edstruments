export function generateUniqueId() {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomPart}`;
}

export function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
