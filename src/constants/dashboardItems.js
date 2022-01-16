import t from '../utils/i18n';
import { CONTRACTS, SERVICES, SERVICE_CLOSING, TENANT } from './navigation';

export default [
  { title: t('dashboard_services'), icon: 'ceiling-light', path: SERVICES },
  { title: t('dashboard_record'), icon: 'timeline-clock-outline', path: SERVICE_CLOSING },
  { title: t('dashboard_bills'), icon: 'pencil-box-outline', path: '' },
  { title: t('dashboard_tenants'), icon: 'human', path: TENANT },
  { title: t('dashboard_contract'), icon: 'handshake', path: CONTRACTS },
  { title: t('dashboard_deposit'), icon: 'cash-marker', path: '' },
];
