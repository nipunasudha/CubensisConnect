export const CubensisConnect_DEBUG = process.env.NODE_ENV !== 'production';

export const CONFIG = {
  SEED_MIN_LENGTH: 24,
  NAME_MIN_LENGTH: 1,
  PASSWORD_MIN_LENGTH: 8,
  MESSAGES_CONFIRM_TIMEOUT: 2000,
  BASE_URL: 'https://decentral.exchange',
};

export const I18N_NAME_SPACE = 'extension';

export const ASSETS = {
  BTC: '894W72QK5LV9sQFBGygs6GBfFYV5fXeCH1TctGWhiyVn',
  CRC: 'G9TVbwiiUZd5WxFxoY7Tb6ZPjGGLfynJK4a3aoC59cMo',
  DGFTHR: 'CCcUGv8eoyoF96c8HHbnbGsPdumr7jPpoRS6orPeg6Wb',
  DCC: 'DCC',
};

export const ASSETS_NAMES = {
  [ASSETS.CRC]: 'CR Coin',
  [ASSETS.DGFTHR]: 'Dogefather',
  [ASSETS.DCC]: 'DCC',
  [ASSETS.BTC]: 'Bitcoin',
};
