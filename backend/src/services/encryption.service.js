const crypto = require('crypto');

function getEncryptionKey() {
  const b64 = process.env.ENCRYPTION_KEY_BASE64;
  if (!b64) {
    const error = new Error('Missing ENCRYPTION_KEY_BASE64');
    error.status = 500;
    throw error;
  }
  return Buffer.from(b64, 'base64');
}

function decryptNote(record) {
  const key = getEncryptionKey();
  const iv = Buffer.from(record.iv, 'base64');
  const authTag = Buffer.from(record.authTag, 'base64');
  const encrypted = Buffer.from(record.encryptedContent, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = {
  getEncryptionKey,
  decryptNote,
};
