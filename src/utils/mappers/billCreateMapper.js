import { dateToApiDate } from '../common';
import { unMask } from 'react-native-mask-text';

export default values => {
  const data = {
    date: dateToApiDate(new Date()),
    startDay: values.info.startDay,
    endDay: values.info.endDay,
    rent: values.info.rent,
    diffDays: values.info.diffDays,
    contractId: values.info.contractId,
    service: values.info.service.map(s => {
      switch (s.feeBaseOnId) {
        case '8b0871c8-5f03-4507-997f-c2008e67937d':
          return {
            ...s,
            lastValue: unMask(values[s.serviceId + '_last']),
            currentValue: unMask(values[s.serviceId + '_curr']),
          };

        case 'd6122b9b-3718-4e05-bb5d-406e8efe7875': {
          // phong
          return s;
        }
        case '6c368419-c07c-4b72-b8a0-a2b5c96ee030': {
          // nguoi
          return {
            ...s,
            intoMoney: +s.price * +values[s.serviceId + '_rc'],
          };
        }
      }
    }),
  };
  return data;
};
