export function generateUniqueId() {
  // Generate 16 random bytes (128 bits)
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Convert bytes to hex string
  const randomHex = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  // Add high-resolution time and optional entropy source
  const timestamp = Date.now().toString(16);
  const perfTime = (performance.now() * 1000).toString(16);
  const entropy = Math.random().toString(36).substring(2, 10);

  // Combine all parts to ensure uniqueness
  return `${timestamp}-${perfTime}-${randomHex}-${entropy}`;
}
