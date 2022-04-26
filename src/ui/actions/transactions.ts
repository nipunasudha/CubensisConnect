import {ACTION} from './constants';

export function signAndPublishTransaction(transaction: any) {
    return {
        type: ACTION.SIGN_AND_PUBLISH_TRANSACTION,
        payload: transaction,
    };
}
