// Helpers for Web Crypto AES-GCM encryption/decryption
export async function importKeyFromBase64(b64) {
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  return await window.crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt'])
}

export function toBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

export function fromBase64(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

export async function encryptText(keyBase64, plaintext) {
  const key = await importKeyFromBase64(keyBase64)
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const enc = new TextEncoder().encode(plaintext)
  const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc)
  const encryptedBytes = new Uint8Array(encrypted)
  // split auth tag (last 16 bytes)
  const authTag = encryptedBytes.slice(encryptedBytes.length - 16)
  const ciphertext = encryptedBytes.slice(0, encryptedBytes.length - 16)
  return {
    encryptedContent: toBase64(ciphertext.buffer),
    iv: toBase64(iv.buffer),
    authTag: toBase64(authTag.buffer)
  }
}
