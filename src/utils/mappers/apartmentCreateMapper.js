const dateToAPICvt = d => {
  return `${d.getHours()}:${d.getMinutes()}`;
};

export default apartment => {
  // const data = new FormData();
  // data.append('name', apartment.name);
  // data.append('address', apartment.address);
  // data.append('wardId', apartment.ward.wardId);
  // apartment.openTime && data.append('openTime', dateToAPICvt(apartment.openTime));
  // data.append('closeTime', dateToAPICvt(apartment.closeTime));
  // apartment.services.forEach(s => {
  //   data.append('serviceIds', s.serviceId);
  // });
  return {
    name: apartment.name,
    address: apartment.address,
    wardId: apartment.ward.wardId,
    openTime: apartment.openTime ? dateToAPICvt(apartment.openTime) : null,
    closeTime: dateToAPICvt(apartment.closeTime),
    serviceIds: apartment.services.map(s => s.serviceId),
  };
};
