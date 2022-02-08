const dateToAPICvt = d => {
  return `${d.getHours()}:${d.getMinutes()}`;
};

export default (apartment, buildingId) => {
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
    buildingId: buildingId ? buildingId : null,
    name: apartment.name,
    address: apartment.address,
    wardId: apartment.ward.wardId,
    openTime: apartment.openTime ? dateToAPICvt(apartment.openTime) : null,
    closeTime: apartment.closeTime ? dateToAPICvt(apartment.closeTime) : null,
    serviceIds: apartment.services.map(s => s.serviceId),
  };
};
