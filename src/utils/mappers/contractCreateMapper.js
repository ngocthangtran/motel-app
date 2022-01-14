import { unMask } from 'react-native-mask-text';

const formatStartAt = st => {
  return st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate();
};

export default (contract, roomId) => {
  return {
    roomId,
    startAt: formatStartAt(contract.startAt),
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
