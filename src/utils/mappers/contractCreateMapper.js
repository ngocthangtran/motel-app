import { unMask } from 'react-native-mask-text';

const formatDate = date => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

export default (contract, roomId) => {
  return {
    roomId,
    startAt: contract?.startAt ? formatDate(contract.startAt) : null,
    endAt: contract?.startAt ? formatDate(contract.endAt) : null,
    paymentCycle: contract.paymentCycle,
    price: unMask(contract.price),
    deposit: unMask(contract.deposit),
    serviceIds: contract.services.map(s => {
      const service = {
        serviceId: s.serviceId,
      };
      if (s.fee_base_ons_id === '8b0871c8-5f03-4507-997f-c2008e67937d') {
        const key = s.serviceId + '_startValue';
        service.startValue = contract[key];
      }
      return service;
    }),
    renterIds: contract.renters.map(r => r.renterId),
  };
};
