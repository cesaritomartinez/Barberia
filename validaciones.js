function isValidPhone(phone) {
  return /^\d{9}$/.test(phone.trim());
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email.trim());
}

function isValidName(name) {
  return name.trim().length > 0;
}

function isValidDate(dateStr) {
  return Boolean(Date.parse(dateStr));
}

function isValidServiceId(serviceId, serviceList) {
  return serviceList.some((s) => s.id === serviceId);
}

module.exports = {
  isValidPhone,
  isValidEmail,
  isValidName,
  isValidDate,
  isValidServiceId
};
