import { mask } from 'react-native-mask-text';

export const vndFormatter = value =>
  mask(value, 'AAA-9999', 'currency', {
    suffix: 'đ',
    decimalSeparator: '.',
    groupSeparator: '.',
    precision: 3,
  });

export const unitFormatter = (value, unit) =>
  currencyFormatter.format(value, {
    symbol: unit || '',
    format: `%v${unit ? ' ' : ''}%s`,
    precision: 0,
  });

export const dateToApiDate = date => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
