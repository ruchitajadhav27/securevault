export function toBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function fromBase64(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export async function importEncryptionKey(keyBase64) {
  const rawKey = fromBase64(keyBase64);
  return window.crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

export async function encryptText(keyBase64, plaintext) {
  const key = await importEncryptionKey(keyBase64);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const encryptedBuffer = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const encrypted = new Uint8Array(encryptedBuffer);
  const tag = encrypted.slice(encrypted.length - 16);
  const ciphertext = encrypted.slice(0, encrypted.length - 16);

  return {
    encryptedContent: toBase64(ciphertext.buffer),
    iv: toBase64(iv.buffer),
    authTag: toBase64(tag.buffer),
  };
}
