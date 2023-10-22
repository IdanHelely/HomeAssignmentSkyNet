import TrashIconButton from '../../../components/userRow/TrashIconButton';
import css from './userRow.module.scss';

// user country must be one of those - for select/autocomplete implementation

import React, { useMemo } from 'react';
import DataInput from '../../../components/userRow/userDataInput';
import countryOptions from '../../../data/countries.json';
import { isValidEmail, isValidName, isValidPhoneNum } from '../../../libs/validations';

const countriesOptions = Object.keys(countryOptions).map((country) => ({
  label: country,
  value: country,
}));

type Props = {
  index: number;
  user: {
    id: string;
    name: string;
    country: string;
    email: string;
    phone: string;
  };
};

type InputsCondence = (
  | {
      type: 'select';
      options: { label: string; value: string }[];
    }
  | {
      type: 'stringInput';
      isValid: (
        val: string,
        country?: string
      ) => { valid: false; errorMsg: string } | { valid: true };
    }
) & {
  key: string;
  title: string;
};

const inputsCondence: InputsCondence[] = [
  {
    key: 'name',
    type: 'stringInput',
    title: 'name',
    isValid: (name: string) => isValidName(name),
  },
  {
    key: 'country',
    type: 'select',
    title: 'country',
    options: countriesOptions,
  },
  {
    key: 'email',
    type: 'stringInput',
    title: 'email',
    isValid: (email: string) => isValidEmail(email),
  },
  {
    key: 'phone',
    type: 'stringInput',
    title: 'phone',
    isValid: (phone: string, country: string) => isValidPhoneNum(phone, country),
  },
];

export default function UserRow({ user, index }: Props) {
  const inputsRow = useMemo(
    () =>
      inputsCondence.map((value) => (
        <DataInput
          key={`${user.id} ${value.key}`}
          type={value.type}
          title={value.title}
          defaultValue={user[value.key]}
          index={index}
          options={value.type === 'select' && value.options}
          isValid={(inputVal) => {
            if (value.type !== 'stringInput') return;
            if (value.title === 'phone') return value.isValid(inputVal, user.country);
            return value.isValid(inputVal);
          }}
        />
      )),
    []
  );

  return (
    <div className={css['row-container']}>
      <div className={css['index-number']}>{index + 1}</div>
      {inputsRow}
      <TrashIconButton index={index} />
    </div>
  );
}
