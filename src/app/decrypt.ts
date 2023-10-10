import * as CryptoJS from "crypto-js";

export async function encryptBlobToBlob(blob: Blob, secret: string): Promise<Blob> {
  // @ts-ignore crypto-js 的 ts 描述文件有问题，可以直接忽略这个错误
  const wordArray = CryptoJS.lib.WordArray.create(await blob.arrayBuffer());
  const result = CryptoJS.AES.encrypt(wordArray, secret);
  return new Blob([result.toString()]);
}
export async function decryptBlobToBlob(blob: Blob, secret: string): Promise<Blob> {
  const decryptedRaw = CryptoJS.AES.decrypt(await blob.text(), secret);
  return new Blob([wordArrayToByteArray(decryptedRaw)]);
}

function wordToByteArray(word: number, length: number) {
  const ba = [];
  const xFF = 0xff;
  if (length > 0) ba.push(word >>> 24);
  if (length > 1) ba.push((word >>> 16) & xFF);
  if (length > 2) ba.push((word >>> 8) & xFF);
  if (length > 3) ba.push(word & xFF);

  return ba;
}

function wordArrayToByteArray({ words, sigBytes }: { sigBytes: number; words: number[] }) {
  const result = [];
  let bytes;
  let i = 0;
  while (sigBytes > 0) {
    bytes = wordToByteArray(words[i], Math.min(4, sigBytes));
    sigBytes -= bytes.length;
    result.push(bytes);
    i++;
  }
  return new Uint8Array(result.flat());
}
