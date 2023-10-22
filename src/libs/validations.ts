import { UserData } from '../context/usersContext';
import countryData from '../data/countries.json';

type ErrorReturnType = { valid: false; errorMsg: string } | { valid: true };

const isValidName = (name: string): ErrorReturnType => {
  const splittedName: string[] = name.split(' ');

  let valid = true;
  let errorMsg = '';

  for (const singleName of splittedName) {
    valid = valid && /^[A-Z]([a-z é]+){1,2}$/.test(singleName);
    if (!valid) {
      if (singleName.length < 2) {
        errorMsg = `the name ${singleName} is too short`;
        break;
      }
      if (!/^[A-Z]/.test(singleName)) {
        errorMsg = `the name ${singleName} cannot start with a lower case`;
        break;
      }
      if (/\W/.test(singleName)) {
        errorMsg = `the name ${singleName} cannot contain ${singleName.match(/\W/)}`;
        break;
      }
      if (/(?<!^)[A-Z]/.test(singleName)) {
        errorMsg = `the name ${singleName} cannot contain an upper case letter but the start`;
        break;
      } else {
        errorMsg = `the name ${singleName} is incorrect`;
        break;
      }
    }
  }

  if (!valid) return { valid, errorMsg };

  return { valid };
};

const isValidEmail = (email: string): ErrorReturnType => {
  const valid = /^[\w-\.]+@([\w]+\.)+[\w]{2,4}$/.test(email);

  let errorMsg = '';

  if (!valid) {
    if (!/^[\w-\.]/.test(email)) {
      errorMsg = `the email address ${email} must start with either number or a letter`;
    } else if (/[\W](?<![@\.])/.test(email)) {
      errorMsg = `the email address ${email} cannot contain ${email.match(
        /[\W](?<![@\.])/
      )}`;
    } else if (!/^[\w\.]+@/.test(email)) {
      errorMsg = `the email address ${email} must contain a @`;
    } else if (email.split('').filter((w) => w === '@').length > 1) {
      errorMsg = `the email address ${email} cannot contain more then one @`;
    } else if (!/@[\w]+/.test(email)) {
      errorMsg = `after @ must come the name of the email company`;
    } else if (!/@([\w]+\.)+[\w]{2,4}$/.test(email)) {
      errorMsg = `the email address ${email} must end with domain extension (.com, .net, .org ext)`;
    } else {
      errorMsg = `the email address ${email} is incorrect`;
    }

    return { valid, errorMsg };
  }

  return { valid };
};

const isValidPhoneNum = (phone: string, country?: string): ErrorReturnType => {
  let valid = true;

  if (!country) valid = /^[+]\d{4,}$/.test(phone);
  else {
    const { prefix, numberOfDigits }: { prefix: string; numberOfDigits: string } =
      countryData[country];
    valid = new RegExp(
      `^[+]${prefix}[0-9]{${parseInt(numberOfDigits) - prefix.length}}$`
    ).test(phone);
  }

  let errorMsg;

  if (!valid) {
    if (!/^[+]/.test(phone)) {
      errorMsg = `the phone number ${phone} must start with +`;
    } else if (phone.length < 5 && !country) {
      errorMsg = `the phone number ${phone} is too short`;
    } else if (/^[+]\d{0,}(\D)/.test(phone)) {
      errorMsg = `the phone number ${phone} cannot contain ${
        phone.match(/^[+]\d{0,}(\D)+/)[1]
      }`;
    } else if (country) {
      const { prefix, numberOfDigits } = countryData[country];
      const numberOfDigitsParsed = parseInt(numberOfDigits);

      if (!new RegExp(`^[+]${prefix}`).test(phone)) {
        errorMsg = `the phone number ${phone} must start with the prefix ${prefix} according to the country of ${country}`;
      } else if (phone.length > numberOfDigitsParsed) {
        errorMsg = `the phone number ${phone} cannot go over ${numberOfDigitsParsed} digits according to the country of ${country}`;
      } else if (phone.length < numberOfDigitsParsed) {
        errorMsg = `the phone number ${phone} cannot be less then ${numberOfDigitsParsed} digits according to the country of ${country}`;
      }
    }
    if (!errorMsg) errorMsg = `the phone number ${phone} is incorrect`;

    return { valid, errorMsg };
  }

  return { valid };
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
