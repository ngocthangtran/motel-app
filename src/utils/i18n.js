import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import vi from '../locales/vi.json';

i18n.translations = {
  'vi-VN': vi,
};

i18n.locale = Localization.locale;

export default function t(text) {
  return i18n.t(text);
}
