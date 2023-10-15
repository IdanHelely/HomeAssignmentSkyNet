import { useMemo } from 'react';
import { UserData } from '../context/usersContext';
import countryData from '../data/countries.json';

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

const isValidPhoneNum = (phone: string, country?: string) => {
  if (!country) return /^[+][0-9]{4,}/.test(phone);

  const { prefix, numberOfDigits } = countryData[country];
  return new RegExp(`^[+]${prefix}[0-9]{${numberOfDigits - prefix.length}}$`).test(phone);
};

const isValidUser = (user: UserData): boolean => {
  if (
    isValidName(user.name) &&
    isValidEmail(user.email) &&
    isValidPhoneNum(user.phone) &&
    user.country !== ''
  )
    return true;

  return false;
};

export { isValidName, isValidEmail, isValidPhoneNum, isValidUser };
