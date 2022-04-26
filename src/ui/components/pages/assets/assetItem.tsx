import * as React from 'react';
import * as styles from './assetItem.module.css';
import { Balance, Loader } from '../../ui';
import { Money } from '@waves/data-entities';
import cn from 'classnames';
import { AssetLogo } from './assetLogo';
import { Trans } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store';
import { favoriteAsset } from '../../../actions';
import { Tooltip } from '../../ui/tooltip';
import { MoreActions } from './moreActions';
import { isSwappableAsset } from 'assets/utils';

interface Props {
  balance: Money;
  assetId: string;
  className?: string;
  onInfoClick: (assetId: string) => void;
  onSendClick: (assetId: string) => void;
  onSwapClick: (assetId: string) => void;
}

export function AssetItem({
  balance,
  assetId,
  className,
  onInfoClick,
  onSendClick,
  onSwapClick,
}: Props) {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(state => state.assets);
  const currentNetwork = useAppSelector(state => state.currentNetwork);
  const asset = assets[assetId];

  const displayName = asset?.displayName;
  const isFavorite = asset?.isFavorite;
  const isLoading = !asset;

  return (
    <div
      className={cn(styles.assetCard, className, 'flex', 'relative')}
      data-testid={assetId}
    >
      <AssetLogo
        className={cn(styles.assetIcon, isLoading && 'skeleton-glow')}
        assetId={assetId}
        name={displayName}
        hasSponsorship={balance?.asset?.minSponsoredFee.isPositive()}
        hasScript={balance?.asset?.hasScript}
      />

      <div className={cn('body1', styles.assetData)}>
        <div className={cn('basic500', styles.assetTitle)}>
          <div className={styles.assetName}>{displayName || <Loader />}</div>
          {asset?.isFavorite && (
            <svg
              className={styles.assetStatusIcon}
              fill={isFavorite ? 'var(--color-submit400)' : 'none'}
              stroke={
                isFavorite ? 'var(--color-submit400)' : 'var(--color-submit200)'
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M10.6472 6.66036L10.7648 6.9373L11.0645 6.96315L15.2801 7.32666L12.0848 10.0999L11.8574 10.2972L11.9254 10.5904L12.8808 14.7108L9.25837 12.5244L9 12.3685L8.74163 12.5244L5.12113 14.7096L6.08193 10.5911L6.15049 10.2972L5.92239 10.0996L2.72308 7.32803L6.93477 6.97071L7.2352 6.94522L7.35286 6.66761L9.00035 2.78048L10.6472 6.66036Z" />
            </svg>
          )}
          {asset?.isSuspicious && (
            <svg
              className={styles.assetStatusIcon}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.1024 9.98229C16.1407 9.65706 16.1612 9.33037 16.1612 9.00221C16.1596 8.67279 16.1402 8.34484 16.1019 8.01704C16.0081 7.40681 15.8451 6.80756 15.6153 6.23421C15.3642 5.66318 15.0499 5.12234 14.6765 4.62356C14.2923 4.14107 13.853 3.70353 13.37 3.31852C12.875 2.94838 12.3386 2.63528 11.7725 2.38693C11.194 2.15445 10.5891 1.98997 9.97304 1.89605C9.32629 1.81945 8.67056 1.81945 8.0238 1.89605C7.41029 1.98959 6.80779 2.1531 6.23146 2.38407C5.66047 2.63521 5.11965 2.9495 4.62089 3.32296C4.13843 3.70716 3.70091 4.14645 3.31592 4.62947C2.9458 5.12454 2.63271 5.66094 2.38437 6.22708C2.1519 6.80559 1.98743 7.41056 1.89352 8.02663C1.81692 8.67342 1.81692 9.32917 1.89352 9.97596C1.98705 10.5895 2.15055 11.192 2.38151 11.7684C2.63264 12.3394 2.94691 12.8802 3.32037 13.379C3.70454 13.8615 4.14382 14.2991 4.62682 14.6841C5.12186 15.0542 5.65822 15.3673 6.22432 15.6156C6.8028 15.8481 7.40773 16.0126 8.02376 16.1065C8.67055 16.1831 9.3263 16.1831 9.97308 16.1065C10.5866 16.013 11.1891 15.8495 11.7654 15.6185C12.3364 15.3674 12.8772 15.0531 13.3759 14.6796C13.8584 14.2954 14.2959 13.8561 14.6809 13.3731C15.0511 12.878 15.3641 12.3416 15.6125 11.7755C15.8441 11.199 16.0083 10.5962 16.1024 9.98229ZM14.6112 13.465C14.617 13.4575 14.6228 13.4499 14.6285 13.4424C14.6228 13.45 14.617 13.4575 14.6112 13.465ZM13.462 14.6143C13.4545 14.6201 13.447 14.6258 13.4395 14.6315C13.447 14.6258 13.4545 14.62 13.462 14.6143ZM11.8825 15.5705C11.8614 15.5793 11.8403 15.5881 11.8191 15.5967C11.8404 15.5879 11.8615 15.5791 11.8825 15.5705ZM6.11455 15.5706C6.1145 15.5706 6.11445 15.5705 6.1144 15.5705L6.11436 15.5705C6.11442 15.5705 6.11448 15.5706 6.11455 15.5706ZM4.53488 14.6143C4.54245 14.6201 4.54999 14.6259 4.55751 14.6317C4.54996 14.6259 4.54242 14.6201 4.53488 14.6143ZM3.38567 13.465C3.37992 13.4576 3.37418 13.4501 3.36846 13.4426C3.37419 13.4501 3.37993 13.4575 3.38567 13.465ZM2.42952 11.8855C2.42069 11.8644 2.41195 11.8433 2.40329 11.8222C2.41216 11.8434 2.42092 11.8645 2.42952 11.8855ZM3.38567 4.53754C3.37989 4.5451 3.37411 4.55263 3.36833 4.56015C3.37409 4.5526 3.37987 4.54507 3.38567 4.53754ZM4.53488 3.38827C4.54234 3.38253 4.54981 3.3768 4.55729 3.37109C4.54984 3.37682 4.54237 3.38254 4.53488 3.38827ZM6.11436 2.43208C6.13543 2.42325 6.15653 2.41451 6.17768 2.40586C6.15645 2.41473 6.13532 2.42348 6.11436 2.43208ZM13.462 3.38827C13.4544 3.38249 13.4469 3.37672 13.4394 3.37094C13.4469 3.3767 13.4544 3.38248 13.462 3.38827ZM14.6112 4.53754C14.6169 4.545 14.6227 4.55247 14.6284 4.55995C14.6226 4.5525 14.6169 4.54503 14.6112 4.53754ZM15.5673 6.11709C15.5762 6.13817 15.5849 6.15928 15.5936 6.18043C15.5847 6.15919 15.5759 6.13806 15.5673 6.11709ZM17.9978 9.07102C17.9994 9.04834 18.0001 9.0254 18 9.00221C17.9981 8.07912 17.8602 7.14132 17.5752 6.26236C17.2976 5.40914 16.9004 4.58535 16.38 3.8535C16.1024 3.46367 15.799 3.08671 15.4662 2.74101C15.1334 2.39715 14.7711 2.09374 14.3924 1.80321C13.6753 1.2534 12.8754 0.837822 12.0296 0.52706C11.1654 0.208943 10.2405 0.0434488 9.32296 0.00667231C8.39256 -0.0301042 7.44009 0.0857419 6.54279 0.3395C5.68409 0.584064 4.84563 0.959184 4.0991 1.45015C3.35625 1.93928 2.67408 2.52954 2.10774 3.21542C1.80435 3.58319 1.51935 3.96934 1.2748 4.37756C1.02473 4.79498 0.820626 5.23446 0.636752 5.68313C0.285553 6.53818 0.0943238 7.4484 0.0244516 8.36966C-0.0472592 9.3001 0.0410003 10.2508 0.25981 11.1573C0.471265 12.0308 0.827981 12.8858 1.29502 13.6544C1.75287 14.4084 2.32655 15.109 2.98666 15.6955C3.65412 16.2876 4.40249 16.797 5.21705 17.1648C5.66019 17.3652 6.11252 17.5417 6.57956 17.6723C7.06315 17.8065 7.55409 17.8893 8.05239 17.9463C8.98463 18.0548 9.93342 17.9941 10.851 17.8084C11.7372 17.63 12.6014 17.299 13.3903 16.8577C14.1607 16.4274 14.8796 15.8721 15.4883 15.234C16.1024 14.5922 16.6356 13.853 17.031 13.0568C17.4355 12.2441 17.7334 11.3761 17.8713 10.4788C17.943 10.0117 17.9931 9.543 17.9978 9.07102ZM8.07997 4.95128V6.58232V9.18426V9.78371C8.07997 10.0191 8.18294 10.2673 8.34843 10.4347C8.5084 10.5946 8.7695 10.7142 8.99934 10.7031C9.23654 10.6921 9.48293 10.6149 9.65026 10.4347C9.81574 10.2545 9.91871 10.0338 9.91871 9.78371V8.15267V5.55073V4.95128C9.91871 4.71591 9.81574 4.46767 9.65026 4.30033C9.49029 4.14035 9.22919 4.02083 8.99934 4.03186C8.76215 4.0429 8.51575 4.12013 8.34843 4.30033C8.18478 4.48054 8.07997 4.7012 8.07997 4.95128ZM8.99934 13.625C8.92693 13.625 8.85671 13.6161 8.78904 13.5994C8.56637 13.5555 8.36606 13.4572 8.20133 13.2812C7.99907 13.0715 7.89794 12.7975 7.88874 12.5089C7.87771 12.2165 8.01746 11.9186 8.22156 11.7145C8.34475 11.5913 8.52863 11.4828 8.69595 11.4387C8.78973 11.4148 8.90373 11.3964 9.00118 11.3964C9.16115 11.3964 9.29354 11.4313 9.43512 11.492C9.57119 11.549 9.68887 11.6225 9.79552 11.7292C9.92055 11.8542 10.018 12.0252 10.0677 12.1944C10.0971 12.2974 10.1173 12.4059 10.1136 12.5107C10.1044 12.8123 9.9941 13.0881 9.78081 13.3051C9.6192 13.4681 9.39891 13.5749 9.1715 13.6112C9.11331 13.623 9.05522 13.6282 8.99934 13.625ZM8.98975 11.786L8.99106 11.7862C8.93705 11.7867 8.88241 11.7925 8.82827 11.8032L8.83386 11.8009L8.82631 11.8036L8.99106 11.7862L9.00412 11.7864L8.99934 11.7862C8.99615 11.7862 8.99295 11.7862 8.98975 11.786Z"
                fill="#EF4829"
              />
            </svg>
          )}
        </div>

        <div className={styles.balance}>
          <Balance
            isShortFormat={false}
            split={true}
            balance={balance}
            assetId={isLoading ? 'WAVES' : assetId}
            showUsdAmount
          />
        </div>
      </div>

      {!isLoading && (
        <MoreActions>
          {assetId !== 'DCC' && (
            <Tooltip content={<Trans i18nKey="assetInfo.infoTooltip" />}>
              {props => (
                <button
                  className={styles.infoBtn}
                  type="button"
                  onClick={() => onInfoClick(assetId)}
                  {...props}
                >
                  <svg className={styles.infoIcon} viewBox="0 0 28 26">
                    <path d="M25 13c0 6.075-4.925 11-11 11S3 19.075 3 13 7.925 2 14 2s11 4.925 11 11ZM4 13c0 5.523 4.477 10 10 10s10-4.477 10-10S19.523 3 14 3 4 7.477 4 13Z" />
                    <path d="M14 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 1a.75.75 0 0 0-.75.75v5.5a.75.75 0 0 0 1.5 0v-5.5A.75.75 0 0 0 14 11Z" />
                  </svg>
                </button>
              )}
            </Tooltip>
          )}
          <Tooltip
            content={
              <Trans
                i18nKey={
                  isFavorite
                    ? 'assetInfo.favRemoveTooltip'
                    : 'assetInfo.favAddTooltip'
                }
              />
            }
          >
            {props => (
              <button
                className={styles.favBtn}
                type="button"
                onClick={() => dispatch(favoriteAsset(assetId))}
                {...props}
              >
                <svg
                  className={styles.favIcon}
                  fill={isFavorite ? 'var(--color-submit400)' : 'none'}
                  stroke={
                    isFavorite
                      ? 'var(--color-submit400)'
                      : 'var(--color-basic200)'
                  }
                  width="26"
                  height="26"
                  viewBox="0 0 18 18"
                >
                  <path d="M10.6472 6.66036L10.7648 6.9373L11.0645 6.96315L15.2801 7.32666L12.0848 10.0999L11.8574 10.2972L11.9254 10.5904L12.8808 14.7108L9.25837 12.5244L9 12.3685L8.74163 12.5244L5.12113 14.7096L6.08193 10.5911L6.15049 10.2972L5.92239 10.0996L2.72308 7.32803L6.93477 6.97071L7.2352 6.94522L7.35286 6.66761L9.00035 2.78048L10.6472 6.66036Z" />
                </svg>
              </button>
            )}
          </Tooltip>

          <Tooltip content={<Trans i18nKey={'assetInfo.sendAssetTooltip'} />}>
            {props => (
              <button
                className={styles.sendBtn}
                type="button"
                onClick={() => onSendClick(assetId)}
                {...props}
                data-testid="sendBtn"
              >
                <svg
                  className={styles.sendIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.19 7.77178L4.08117 18.8806L5.46862 20.2681L16.5774 9.15923L18.6586 11.2404L19.5743 4.77489L13.1088 5.69061L15.19 7.77178Z" />
                </svg>
              </button>
            )}
          </Tooltip>

          {currentNetwork === 'mainnet' &&
            isSwappableAsset(currentNetwork, assetId) && (
              <Tooltip content={<Trans i18nKey="assetInfo.swapAssetTooltip" />}>
                {props => (
                  <button
                    className={styles.swapBtn}
                    type="button"
                    onClick={() => onSwapClick(assetId)}
                    {...props}
                  >
                    <svg
                      className={styles.swapIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                    >
                      <path d="m11.56 4.01-1.266-1.268a.6.6 0 0 1 .848-.848l2.291 2.29a.6.6 0 0 1 0 .85l-2.29 2.29a.6.6 0 1 1-.85-.848l1.268-1.267H4.99a.6.6 0 0 1 0-1.2h6.57ZM2.44 9.99l1.266 1.268a.6.6 0 1 1-.848.848L.567 9.816a.6.6 0 0 1 0-.85l2.29-2.29a.6.6 0 1 1 .849.848L2.439 8.791h6.57a.6.6 0 0 1 0 1.2h-6.57Z" />
                    </svg>
                  </button>
                )}
              </Tooltip>
            )}
        </MoreActions>
      )}
    </div>
  );
}
