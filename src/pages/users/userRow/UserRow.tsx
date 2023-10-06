import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import css from './userRow.module.scss';

// user country must be one of those - for select/autocomplete implementation
// import countryOptions from '../../../data/countries.json';

import React from 'react';
import DataInput from '../../../components/usersRowInputs/userDataInput';

export default function UserRow({ user }) {
  return (
    <div>
      UserRow
      <DataInput type="stringInput" placeholder="name" regex="" />
      <DataInput type="numberInput" placeholder="phone" regex="" />
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
