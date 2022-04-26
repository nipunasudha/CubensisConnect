import { libs } from '@decentralchain/waves-transactions';

export function networkByteFromAddress(address) {
  const rawNetworkByte = libs.crypto.base58Decode(address).slice(1, 2);
  return String.fromCharCode(rawNetworkByte);
}
