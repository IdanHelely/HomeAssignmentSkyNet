import React, { useState, useEffect } from 'react';
import css from './styles/userDataInput.module.scss';
import Select from 'react-select';
import { useDebounce } from '../../libs/essentials';
import { useUserStore } from '../../context/usersContext';
import { selectStyle } from '../../libs/selectStyle';
import Info from '../../libs/svgs/info';

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
  const [errorState, setErrorState] = useState<null | string>(null);
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
      setErrorState(validation.errorMsg);
      setError(validation.errorMsg);
    } else if (validation.valid && errorState) {
      setErrorState(null);
    }
  };

  // when the country changes the validation of the phone changes as well
  useEffect(() => {
    if (props.title === 'phone' && usersData[props.index]?.country !== '') {
      validInput(inputValue);
    }
  }, [usersData[props.index], usersData[props.index]?.country]);

  if (props.type === 'stringInput') {
    return (
      <div className={css['input-container']}>
        <div className={css['info-container']} data-shown={errorState !== null}>
          <div
            className={css['info-tooltip']}
            data-is-last={usersData.length - 1 === props.index}
          >
            {errorState}
          </div>
          <Info className={css['info-svg']} />
        </div>
        <input
          data-is-not-valid={errorState !== null}
          placeholder={props.title}
          className={css['string-input']}
          onChange={(e) => {
            validInput(e.target.value);
            setInputValue(e.target.value);
          }}
          value={inputValue}
        />
      </div>
    );
  } else if (props.type === 'select') {
    return (
      <div className={css['select-container']}>
        <Select
          options={props.options ? [...props.options] : []}
          styles={selectStyle}
          placeholder={props.title}
          defaultValue={
            props.defaultValue
              ? { label: props.defaultValue, value: props.defaultValue }
              : undefined
          }
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
