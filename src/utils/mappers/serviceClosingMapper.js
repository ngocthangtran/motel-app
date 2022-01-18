import { unMask } from 'react-native-mask-text';

const dateFormat = date => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

const serviceClosingMapper = (data, contractId, services) => {
  return {
    date: dateFormat(data.date),
    contractId,
    services: services.map(s => {
      return {
        lastValue: unMask(data[s.serviceId + '_lastValue']),
        currentValue: unMask(data[s.serviceId + '_curValue']),
        quantily: null,
        serviceId: s.serviceId,
        priceService: unMask(s.price),
      };
    }),
  };
};

export default serviceClosingMapper;
