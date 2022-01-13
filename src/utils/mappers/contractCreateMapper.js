const formatStartAt = st => {
  return st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate();
};

export default (contract, roomId) => {
  return {
    roomId,
    startAt: formatStartAt(contract.startAt),
    paymentCycle: contract.paymentCycle,
    price: contract.price,
    deposit: contract.deposit,
    serviceIds: contract.services.map(s => s.serviceId),
    renterIds: contract.renters.map(r => r.renterId),
  };
};
