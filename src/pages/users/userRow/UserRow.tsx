import TrashIconButton from '../../../components/userRow/TrashIconButton';
import css from './userRow.module.scss';

// user country must be one of those - for select/autocomplete implementation

import React, { useMemo } from 'react';
import DataInput from '../../../components/userRow/userDataInput';
import countryOptions from '../../../data/countries.json';

const countriesOptions = countryOptions.map((country) => ({
  label: country,
  value: country,
}));

type Props = {
  user: {
    id: string;
    name: string;
    country: string;
    email: string;
    phone: string;
  };
};

export default function UserRow({ user }: Props) {
  return (
    <div className={css['row-container']}>
      <DataInput
        type="stringInput"
        placeholder="name"
        regex=""
        defaultValue={user.name}
      />
      <DataInput
        type="select"
        options={countriesOptions}
        placeholder="country"
        defaultValue={user.country}
      />
      <DataInput
        type="stringInput"
        placeholder="email"
        regex=""
        defaultValue={user.email}
      />
      <DataInput
        type="stringInput"
        placeholder="phone"
        regex=""
        defaultValue={user.phone}
      />
      <TrashIconButton />
    </div>
  );
}

// const UserRow = () => {
//   return (
//     <Grid container className={css.userRow}>
//       {/* Render each user row inputs and trash icon at the end of each row */}
//       {/* <TrashIconButton /> */}
//     </Grid>
//   );
// };

// export default UserRow;
