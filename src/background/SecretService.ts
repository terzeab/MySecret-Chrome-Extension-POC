import { AES, enc } from 'crypto-js';
import { generateSecret } from './utils.ts';

const generateNewEncryptedSecret = (
  providedSecret: string | undefined = undefined
): {
  encryptionKeyHex: string;
  ivHex: string;
  encrypted: string;
} => {
  const encryptionKeyHex = generateSecret(32, true);
  const ivHex = generateSecret(32, true);
  const secret = providedSecret ?? generateSecret(32);

  const encryptionKey = enc.Hex.parse(encryptionKeyHex);
  const iv = enc.Hex.parse(ivHex);

  const encrypted = AES.encrypt(secret, encryptionKey, { iv }).toString();

  return {
    encryptionKeyHex,
    ivHex,
    encrypted
  };
};

const decodeEncryptedSecret = (encryptionKeyHex, ivHex, encrypted) => {
  const encryptionKey = enc.Hex.parse(encryptionKeyHex);
  const iv = enc.Hex.parse(ivHex);

  return AES.decrypt(encrypted, encryptionKey, { iv }).toString(enc.Utf8);
};

export const SecretService = {
  generateNewEncryptedSecret,
  decodeEncryptedSecret
};
