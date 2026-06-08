# SecureVault Backend

## Setup

- Copy `.env.example` to `.env` and set `JWT_SECRET` and `ENCRYPTION_KEY_BASE64`.
- `ENCRYPTION_KEY_BASE64` must be a base64-encoded 32-byte key. Example:

```
openssl rand -base64 32
```

- Install dependencies and run:

```
cd backend
npm install
npm run dev
```

## Database

This uses SQLite. The database file `securevault.db` will be created automatically in the `backend` folder.

## Notes on encryption

- AES-256-GCM key is loaded from `ENCRYPTION_KEY_BASE64` environment variable.
- For this assignment the server returns the encryption key to the client on login so the client can encrypt notes before sending them. This is NOT recommended for production; see the README encryption write-up for details.
