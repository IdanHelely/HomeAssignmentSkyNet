import React from 'react';
import css from './styles/userDataInput.module.scss';
import Select from 'react-select';

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
    color: 'white',
    backgroundColor: '#909296',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#90929605',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#9b9b9b',
    direction: 'rtl',
    borderRadius: '0.5rem',
    zIndex: 3,
    overflowY: 'hidden',
  }),

  menuList: (provided: any) => ({
    ...provided,
    padding: '0 0 0 0',
    borderRadius: '0.5rem',
    '::-webkit-scrollbar': {
      width: '0px',
    },
  }),
  // chosen value
  singleValue: (provided: any) => ({
    ...provided,
    color: '#4b4b4b',
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
};

type Props = (
  | ({ type: 'stringInput' } & {
      regex: string;
    })
  | { type: 'select'; options: { label: string; value: string }[] }
) & {
  placeholder: string;
  defaultValue: string | number;
};

export default function StringInput(props: Props) {
  if (props.type === 'stringInput') {
    return (
      <input
        placeholder={props.placeholder}
        className={css['string-input']}
        defaultValue={props.defaultValue}
      />
    );
  } else if (props.type === 'select') {
    return (
      <div className={css['select-container']}>
        <Select
          options={[...props.options]}
          styles={selectStyle}
          placeholder={props.placeholder}
          defaultValue={{ label: props.defaultValue, value: props.defaultValue }}
        />
      </div>
    );
  }
  return null;
}
