import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import * as Sentry from '@sentry/react';
import WavesLedger from '@waves/ledger';
import { Account } from 'accounts/types';
import Background from 'ui/services/Background';
import { LedgerSignRequest } from './types';

export enum LedgerServiceStatus {
  Disconnected = 'DISCONNECTED',
  UsedBySomeOtherApp = 'USED_BY_SOME_OTHER_APP',
  Ready = 'READY',
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class LedgerService {
  private _connectionRetryIsNeeded: boolean;
  private _ledger: WavesLedger;
  private _networkCode: string = null;
  private _signRequestPromise = Promise.resolve();
  private _status = LedgerServiceStatus.Disconnected;

  get ledger() {
    return this._ledger;
  }

  get status() {
    return this._status;
  }

  async connectUsb(networkCode: string) {
    await this.disconnect();

    this._networkCode = networkCode;

    this._ledger = new WavesLedger({
      debug: true,
      openTimeout: 3000,
      listenTimeout: 30000,
      exchangeTimeout: 30000,
      networkCode: networkCode.charCodeAt(0),
      transport: TransportWebUSB,
    });

    while (this._ledger && this._status !== LedgerServiceStatus.Ready) {
      await this.updateStatus(networkCode);

      if (this._connectionRetryIsNeeded) {
        await delay(1000);
        continue;
      }
    }
  }

  async updateStatus(networkCode: string) {
    this._connectionRetryIsNeeded = false;

    if (!this._ledger) {
      return;
    }

    if (this._networkCode !== networkCode) {
      this.disconnect();
      return;
    }

    try {
      if (await this._ledger.probeDevice()) {
        this._status = LedgerServiceStatus.Ready;
      } else {
        this._connectionRetryIsNeeded = true;
      }
    } catch (err) {
      if (err instanceof Error) {
        if (
          /No device selected|device was disconnected|user gesture to show a permission request/i.test(
            err.message
          )
        ) {
          this.disconnect();
        } else if (/Unable to claim interface/i.test(err.message)) {
          this.disconnect(LedgerServiceStatus.UsedBySomeOtherApp);
        } else if (
          /An operation that changes the device state is in progress/i.test(
            err.message
          )
        ) {
          this._connectionRetryIsNeeded = true;
        } else {
          console.error('NO MATCH FOR ERROR', err);
          Sentry.captureException(err);
        }
      } else {
        console.error('NON-ERROR THROWN', err);

        Sentry.captureException(
          new Error('Non-Error was thrown, trying to connect to ledger'),
          {
            extra: {
              thrownValue: err,
            },
          }
        );
      }
    }
  }

  private async sendSignRequest(
    selectedAccount: Partial<Account>,
    request: LedgerSignRequest
  ) {
    try {
      if (selectedAccount.type !== 'ledger') {
        throw new Error('Active account is not a ledger account');
      }

      const userData = await ledgerService.ledger.getUserDataById(
        selectedAccount.id
      );

      if (userData.address !== selectedAccount.address) {
        throw new Error(
          'Account saved in CubensisConnect does not match the one in ledger'
        );
      }

      let signature: string;

      switch (request.type) {
        case 'order':
          signature = await ledgerService.ledger.signOrder(selectedAccount.id, {
            ...request.data,
            dataBuffer: new Uint8Array(request.data.dataBuffer),
          });
          break;
        case 'request':
          signature = await ledgerService.ledger.signRequest(
            selectedAccount.id,
            {
              ...request.data,
              dataBuffer: new Uint8Array(request.data.dataBuffer),
            }
          );
          break;
        case 'someData':
          signature = await ledgerService.ledger.signSomeData(
            selectedAccount.id,
            {
              ...request.data,
              dataBuffer: new Uint8Array(request.data.dataBuffer),
            }
          );
          break;
        case 'transaction':
          signature = await ledgerService.ledger.signTransaction(
            selectedAccount.id,
            {
              ...request.data,
              dataBuffer: new Uint8Array(request.data.dataBuffer),
            }
          );
          break;
        default:
          throw new Error(`Unknown request type: "${(request as any).type}"`);
      }

      await Background.ledgerSignResponse(request.id, null, signature);
    } catch (err) {
      if (err) {
        if (err.name === 'TransportStatusError' && err.statusCode === 37120) {
          await Background.ledgerSignResponse(
            request.id,
            new Error('Request is rejected on ledger')
          );
          return;
        }
      }

      await Background.ledgerSignResponse(request.id, err);
    }
  }

  async queueSignRequest(
    selectedAccount: Partial<Account>,
    request: LedgerSignRequest
  ) {
    try {
      await this._signRequestPromise;
    } finally {
      this._signRequestPromise = this.sendSignRequest(selectedAccount, request);

      return this._signRequestPromise;
    }
  }

  async disconnect(status = LedgerServiceStatus.Disconnected) {
    const ledger = this._ledger;
    this._ledger = null;
    this._networkCode = null;
    this._status = status;

    if (ledger) {
      await ledger.disconnect();
    }
  }
}

export const ledgerService = new LedgerService();
