export const messageType = 'auth';
export const txType = 'auth';

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
  return tx.type === 1000 && type === txType;
}
