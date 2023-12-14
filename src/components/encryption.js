// encryption.js

import * as crypto from 'crypto-js';

// Encryption key - It's important to keep this key safe and private in production.
const ENCRYPTION_KEY = 'YourSecretEncryptionKey';

// Function to encrypt a string
const encryptString = (text) => {
  const ciphertext = crypto.AES.encrypt(text, ENCRYPTION_KEY).toString();
  const base64 = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(ciphertext));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Function to decrypt a string
const decryptString = (cipherText) => {
  const base64 = cipherText.replace(/-/g, '+').replace(/_/g, '/');
  const ciphertext = crypto.enc.Base64.parse(base64).toString(crypto.enc.Utf8);
  return crypto.AES.decrypt(ciphertext, ENCRYPTION_KEY).toString(crypto.enc.Utf8);
};

module.exports = { encryptString, decryptString };
