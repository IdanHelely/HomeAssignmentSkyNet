import React, { useEffect, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import css from './usersList.module.scss';
import { useUserStore } from '../../../context/usersContext';

export default function UsersList() {
  const { usersData, addNewUser } = useUserStore();
  const scrollRef = useRef(null);

  const usersDataParsed = Object.values(usersData);

  const handleAddBtn = async () => {
    await addNewUser();
    scrollRef.current.scrollTo({ top: usersDataParsed.length * 50, behavior: 'smooth' });
  };

  return (
    <div className={css.usersList}>
      <div className={css.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <AddButton handleClick={() => handleAddBtn()} />
      </div>
      <div className={css['user-list-wrapper']} ref={scrollRef}>
        <div className={css.usersListContent}>
          {usersData &&
            usersDataParsed.map((user, i) => (
              <UserRow key={user.id} user={user} index={i + 1} />
            ))}
        </div>
      </div>
    </div>
  );
}
