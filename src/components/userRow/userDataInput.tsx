import React, { useState, useEffect } from 'react';
import css from './styles/userDataInput.module.scss';
import Select from 'react-select';
import { useDebounce } from '../../libs/essentials';
import { useUserStore } from '../../context/usersContext';

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
    zIndex: 10,
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
  | {
      type: 'stringInput';
      isValid: (val: string) => { valid: false; errorMsg: string } | { valid: true };
    }
  | { type: 'select'; options: { label: string; value: string }[] }
) & {
  title: string;
  defaultValue: string;
  index: number;
};

export default function UserDataInput(props: Props) {
  const [errorState, setErrorState] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<string>(props.defaultValue);
  const { usersData, setError, setUserData } = useUserStore();

  // uses debounce so that the state won't change with every single change, updates when the timer runs out
  const debouncedInputValue = useDebounce(inputValue, 700);

  useEffect(() => {
    setUserData(props.index, props.title, debouncedInputValue);
  }, [debouncedInputValue]);

  const validInput = (inputVal: string) => {
    if (props.type !== 'stringInput') return;

    const validation = props.isValid(inputVal);

    if (validation.valid === false) {
      setErrorState(true);
      setError(validation.errorMsg);
    } else if (validation.valid && errorState) {
      setErrorState(false);
    }
  };

  // when the country changes the validation of the phone changes as well
  useEffect(() => {
    if (props.title === 'phone' && usersData[props.index].country !== '') {
      validInput(inputValue);
    }
  }, [usersData[props.index].country]);

  if (props.type === 'stringInput') {
    return (
      <input
        data-is-not-valid={errorState}
        placeholder={props.title}
        className={css['string-input']}
        onChange={(e) => {
          validInput(e.target.value);
          setInputValue(e.target.value);
        }}
        value={inputValue}
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
          menuPlacement="auto"
          onChange={({ value }) => {
            setUserData(props.index, props.title, value);
          }}
        />
      </div>
    );
  }
  return null;
}
