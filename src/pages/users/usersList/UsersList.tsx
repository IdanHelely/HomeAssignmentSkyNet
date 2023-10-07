import React from 'react';
import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import css from './usersList.module.scss';

export default function UsersList() {
  const { usersData } = useUsersContext();

  return (
    <div className={css.usersList}>
      <div className={css.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <AddButton />
      </div>
      <div className={css.usersListContent}>
        {usersData.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
