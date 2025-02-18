import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ListItem } from './ListItem';
import * as styles from './list.styl';

class ListComponent extends React.PureComponent<IProps> {
  render(): React.ReactNode {
    const { t, origins, showType, showSettings, toggleApprove } = this.props;
    const originsNames = Object.keys(getFilteredOrigins(origins, showType));

    if (originsNames.length === 0) {
      return (
        <div className={styles.emptyBlock}>
          <div className={styles.icon}></div>
          <div
            className={`body3 margin-main-top basic500 center ${styles.emptyBlockDescription}`}
          >
            {t('permissionsSettings.empty')}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.permissionList}>
        {originsNames.map(name => (
          <ListItem
            key={name}
            originName={name}
            permissions={origins[name]}
            permissionsText={this.getPermissionsText(t, origins[name])}
            showSettings={showSettings}
            toggleApprove={toggleApprove}
          />
        ))}
      </div>
    );
  }

  getPermissionsText(t, perms) {
    let hasApproved = false;
    let hasAuto = false;

    if (perms.length) {
      hasApproved = perms.includes('approved');
      hasAuto =
        hasApproved &&
        perms.find(item =>
          typeof item !== 'object' ? false : item.type === 'allowAutoSign'
        );
    }

    return (
      <React.Fragment>
        {t(
          hasApproved
            ? 'permissionsSettings.approvedOrigin'
            : 'permissionsSettings.rejectedOrigin'
        )}
        {hasAuto ? (
          <span>{t('permissionsSettings.automaticOrigin')}</span>
        ) : null}
      </React.Fragment>
    );
  }
}

const getFilteredOrigins = (origins: any, attr: TTabTypes) => {
  return Object.keys(origins)
    .filter(name => {
      const permissions = origins[name] || [];

      if (attr !== 'customList') {
        return permissions.includes(attr);
      }

      return (
        !permissions.includes('whiteList') && !permissions.includes('blackList')
      );
    })
    .reduce((acc, name) => {
      acc[name] = origins[name] || [];
      return acc;
    }, Object.create(null));
};

type TTabTypes = 'customList' | 'whiteList' | 'blackList';

interface IProps extends WithTranslation {
  origins: { [key: string]: Array<string | IAutoAuth> };
  showType: TTabTypes;
  showSettings: (origin: string) => void;
  toggleApprove: (origin: string, enable: boolean) => void;
}

interface IAutoAuth {
  type: 'allowAutoSign';
  totalAmount: number;
  interval: number;
  approved: Array<any>;
}

export const List = withTranslation()(ListComponent);
