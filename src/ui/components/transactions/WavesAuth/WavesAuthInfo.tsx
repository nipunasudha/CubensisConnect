import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as styles from './wavesAuth.styl';
import { DateFormat } from '../../ui';

interface IProps extends WithTranslation {
  message: any;
  assets: any;
}

class WavesAuthInfoComponent extends React.PureComponent<IProps> {
  render() {
    const { t, message } = this.props;
    const { messageHash, data } = message;

    return (
      <div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.wavesAuthTimeStamp')}
          </div>
          <div className={'fullwidth'}>
            <DateFormat
              date={data.timestamp}
              showRaw={true}
              className={'fullwidth'}
            />
          </div>
        </div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.publicKey')}
          </div>
          <div className={styles.txValue}>{data.publicKey}</div>
        </div>
        <div className={styles.txRow}>
          <div className="tx-title body3 basic500">
            {t('transactions.dataHash')}
          </div>
          <div className={styles.txValue}>{messageHash}</div>
        </div>
      </div>
    );
  }
}

export const WavesAuthInfo = withTranslation()(WavesAuthInfoComponent);
