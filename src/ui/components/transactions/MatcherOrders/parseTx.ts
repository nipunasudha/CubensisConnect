export const messageType = 'matcher_orders';
export const txType = 'request';

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
  return tx.type === 1001 && type === txType;
}
