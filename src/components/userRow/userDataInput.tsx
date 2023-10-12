import React, { useState, useEffect } from 'react';
import css from './styles/userDataInput.module.scss';
import Select from 'react-select';
import { useDebounce } from '../../libs/essentials';
import { useUserStore } from '../../context/usersContext';
import { isValidName } from '../../libs/validations';

const selectStyle = {
  // general select
  control: (provided: any) => ({
    ...provided,
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#909296',
    boxShadow: 'none',
    padding: '2px',
    minHeight: 'none',
  }),
  container: (provided: any) => ({
    ...provided,
    width: '100%',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0',
    width: '100%',
    // outerWidth: "800px",
  }),
  // Line between option and the arrow
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: '0px',
  }),
  // options in the dropdown
  option: (provided: any) => ({
    ...provided,
    color: 'black',
    backgroundColor: '#909296',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#90929605',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#9b9b9b',
    borderRadius: '5px',
    overflowY: 'hidden',
  }),

  menuList: (provided: any) => ({
    ...provided,
    padding: '0 0 0 0',
    borderRadius: '5px',
    '::-webkit-scrollbar': {
      width: '0px',
    },
  }),
  // chosen value
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
};

type Props = (
  | { type: 'stringInput'; isValid: (val: string) => boolean }
  | { type: 'select'; options: { label: string; value: string }[] }
) & {
  id: string;
  title: string;
  defaultValue: string | number;
};

export default function UserDataInput(props: Props) {
  const [error, setError] = useState<Boolean>(false);

  const validName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type !== 'stringInput') return;
    const { value } = e.target;

    if (!props.isValid(value)) {
      setError(true);
    } else if (props.isValid(value) && error) {
      setError(false);
    }
  };

  if (props.type === 'stringInput') {
    return (
      <input
        data-is-not-valid={error}
        placeholder={props.title}
        className={css['string-input']}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          validName(e);
        }}
      />
    );
  } else if (props.type === 'select') {
    return (
      <div className={css['select-container']}>
        <Select
          options={props.options ? [...props.options] : []}
          styles={selectStyle}
          placeholder={props.title}
          defaultValue={{ label: props.defaultValue, value: props.defaultValue }}
        />
      </div>
    );
  }
  return null;
}
