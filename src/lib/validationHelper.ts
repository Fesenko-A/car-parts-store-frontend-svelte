export const validateName = (name: string) => {
  const regex = /^[A-Za-z-]+$/;
  return regex.test(name);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^\+?[\d\-]{7,15}$/;
  return regex.test(phoneNumber);
};

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
