export const messageType = 'authOrigin';
export const txType = 'authOrigin';

export function getAssetsId(tx = null): Array<string> {
  return ['DCC'];
}

export function getFee(tx = null) {
  return { coins: 0, assetId: 'DCC' };
}

export function getAmount(tx = null) {
  return { coins: 0, assetId: 'DCC' };
}

export function getAmountSign() {
  return '' as const;
}

export function isMe(tx: any, type: string) {
  return type === txType;
}
