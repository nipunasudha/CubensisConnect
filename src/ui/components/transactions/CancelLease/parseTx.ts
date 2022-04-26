import { TRANSACTION_TYPE } from '@waves/ts-types';

export const messageType = 'cancel-leasing';
export const txType = 'transaction';

export function getAssetsId(tx): Array<string> {
  const feeAssetId =
    tx.fee && tx.fee.assetId ? tx.fee.assetId : tx.feeAssetId || 'DCC';
  const amountAssetId = 'DCC';

  if (feeAssetId === amountAssetId) {
    return [amountAssetId];
  }

  return [amountAssetId, feeAssetId];
}

export { getFee } from '../BaseTransaction/parseTx';

export function getAmount(tx) {
  if (!tx?.lease) {
    return { coins: null, assetId: 'DCC' };
  }

  return { coins: tx.lease.amount, assetId: 'DCC' };
}

export function getAmountSign() {
  return '+' as const;
}

export function isMe(tx: any, type: string) {
  return tx.type === TRANSACTION_TYPE.CANCEL_LEASE && type === 'transaction';
}
