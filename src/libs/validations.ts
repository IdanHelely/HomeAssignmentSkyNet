const isValidName = (name: string): boolean => {
  const splittedName: string[] = name.split(' ');

  let valid = true;

  for (const singleName of splittedName) {
    valid = valid && /^[A-Z]([a-z]+){1,2}$/.test(singleName);
  }

  return valid;
};

const isValidEmail = (email: string): boolean =>
  /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]{2,}@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(email);

const isValidPhoneNum = (phone: string) => true;

export { isValidName, isValidEmail, isValidPhoneNum };
