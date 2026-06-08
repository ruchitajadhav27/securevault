# SecureVault

SecureVault is a simple full-stack encrypted notes application. The backend is Node.js + SQLite; the frontend is a React web app. Notes are encrypted with AES-256-GCM before being stored on the server.

## Run

- Backend:

```
cd backend
cp .env.example .env
# set JWT_SECRET and ENCRYPTION_KEY_BASE64 (base64 32 bytes)
npm install
npm run dev
```

- Frontend:

```
cd frontend
npm install
npm run dev
```

The backend runs on port 4000 by default.

## Database

This project uses SQLite; the database file `securevault.db` is created automatically in the `backend` folder.

## Encryption Write-Up

Why AES-256-GCM? AES-256 provides a strong symmetric cipher with a 256-bit key size. GCM (Galois/Counter Mode) is an authenticated encryption mode that provides both confidentiality and integrity in a single primitive. Unlike CBC (Cipher Block Chaining), GCM includes an authentication tag which protects the ciphertext from tampering and also allows for parallelizable encryption/decryption, which is performant in modern environments. For SecureVault, integrity matters: we must be confident that stored notes were not modified; GCM gives that guarantee.

IV handling: Each note uses a unique, randomly generated IV (12 bytes) produced by a secure RNG. The IV is stored alongside the ciphertext in the database (it's not secret). Reusing an IV with the same key in GCM is catastrophic: it can leak keystream information and allow forgery. Therefore a fresh IV per encryption is mandatory.

Auth tag protection: The auth tag (typically 16 bytes) ensures the ciphertext's integrity and authenticity. It defends against tampering and active chosen-ciphertext attacks—if the tag is missing or modified decryption fails and the library throws an error, preventing the application from returning corrupted plaintext.

Known weakness and mitigation: This implementation returns the encryption key to the client after login so the browser can encrypt before sending. That exposes the symmetric key to the client and increases risk (key leakage, cross-site compromises). A stronger approach is to derive per-user keys from the user's password using a KDF (e.g., PBKDF2/Argon2) and never store raw keys server-side; the server would store only encrypted blobs or use envelope encryption where a server master key encrypts per-user keys stored server-side. For production, use TLS, rotate keys, consider using public-key (hybrid) encryption, and implement secure key exchange / zero-knowledge protocols so plaintext keys are never revealed to servers or clients unnecessarily.
