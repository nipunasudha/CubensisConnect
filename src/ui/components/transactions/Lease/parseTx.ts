import { TRANSACTION_TYPE } from '@waves/ts-types';

export const messageType = 'lease';
export const txType = 'transaction';

export function getAssetsId(tx): Array<string> {
  const feeAssetId =
    tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'DCC';
  const amountAssetId =
    tx.amount && tx.amount.assetId ? tx.amount.assetId : tx.assetId || 'DCC';

  if (feeAssetId === amountAssetId) {
    return [amountAssetId];
  }

  return [amountAssetId, feeAssetId];
}

export { getFee } from '../BaseTransaction/parseTx';

export function getAmount(tx = null) {
  return typeof tx.amount === 'object'
    ? tx.amount
    : { coins: tx.amount, assetId: 'DCC' };
}

export function getAmountSign() {
  return '-' as const;
}

export function isMe(tx: any, type: string) {
  return tx.type === TRANSACTION_TYPE.LEASE && type === txType;
}
