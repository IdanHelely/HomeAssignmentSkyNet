import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import css from './usersList.module.scss';
import { useUserStore } from '../../../context/usersContext';

export default function UsersList() {
  const { usersData, addNewUser } = useUserStore();

  return (
    <div className={css.usersList}>
      <div className={css.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <AddButton handleClick={() => addNewUser()} />
      </div>
      <div className={css.usersListContent}>
        {Object.values(usersData)
          .reverse()
          .map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
}
