import React from 'react';
import css from './styles/userDataInput.module.scss';
import { create } from 'zustand';
import Select from 'react-select';

type Props =
  | (({ type: 'stringInput' } | { type: 'numberInput' }) & {
      placeholder: string;
      regex: string;
    })
  | { type: 'select'; options: string[] };

export default function StringInput(props: Props) {
  if (props.type === 'stringInput') {
    return <input placeholder={props.placeholder} className={css['string-input']} />;
  } else if (props.type === 'numberInput') {
    return (
      <input
        type="number"
        placeholder={props.placeholder}
        className={css['number-input']}
      />
    );
  } else if (props.type === 'select') {
    <Select />;
  }
  return null;
}
