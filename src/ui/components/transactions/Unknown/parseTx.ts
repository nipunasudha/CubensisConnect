export const messageType = 'unknown';
export const txType = null;

export function getAssetsId(tx = null): Array<string> {
  return ['DCC'];
}

export function getFee(tx = null) {
  return { coins: 0, assetId: 'DCC' };
}

export function getAmount(tx = null) {
  return { coins: 0, assetId: 'DCC' };
}

export function getAmountSign(tx = null) {
  return '' as const;
}

export function isMe(tx: any, type: string) {
  return true;
}
