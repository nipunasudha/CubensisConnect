import * as styles from './index.styl';
import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { TxIcon } from '../BaseTransaction';
import cn from 'classnames';
import { ShowScript } from '../../ui';
import { messageType } from './parseTx';

interface IProps extends WithTranslation {
  assets: any;
  className?: string;
  collapsed: boolean;
  message: any;
}

class UpdateAssetInfoCardComponent extends React.PureComponent<IProps> {
  render() {
    const className = cn(
      styles.updateAssetInfoTransactionCard,
      this.props.className,
      {
        [styles.updateAssetInfoCard_collapsed]: this.props.collapsed,
      }
    );

    const { t, message } = this.props;
    const { data = {} } = message;
    const tx = { type: data.type, ...data.data };

    return (
      <div className={className}>
        <div className={styles.cardHeader}>
          <div className={styles.updateAssetInfoTxIcon}>
            <TxIcon txType={messageType} />
          </div>
          <div>
            <div className="basic500 body3 margin-min">
              {t('transactions.updateAssetInfo')}
            </div>
          </div>
        </div>

        <div className={styles.cardContent}>
          {!!tx.script && (
            <ShowScript
              script={tx.script}
              showNotify={true}
              optional={true}
              hideScript={this.props.collapsed}
            />
          )}
        </div>
      </div>
    );
  }
}

export const UpdateAssetInfoCard = withTranslation()(
  UpdateAssetInfoCardComponent
);
