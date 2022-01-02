const convertDate = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default tenant => {
  return {
    name: tenant.name,
    phone: tenant.phone,
    birthday: convertDate(tenant.birthday),
    numberCard: tenant.idCode,
    issuedOn: convertDate(tenant.issuedOn),
  };
};
