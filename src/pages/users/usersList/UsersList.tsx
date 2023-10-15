import React, { useEffect, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import css from './usersList.module.scss';
import { useUserStore } from '../../../context/usersContext';
import { isValidUser } from '../../../libs/validations';

export default function UsersList() {
  const { usersData, addNewUser, setError } = useUserStore();
  const scrollRef = useRef(null);

  const handleAddBtn = async () => {
    // checks if the last user is valid, to limit the number of empty users

    const scrollToBottom = () =>
      scrollRef.current.scrollTo({ top: usersData.length * 50, behavior: 'smooth' });

    if (!isValidUser(usersData[usersData.length - 1])) {
      setError("please check that the last user's data is complete");
      scrollToBottom();
      return;
    }

    await addNewUser();
    scrollToBottom();
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
            usersData.map((user, i) => <UserRow key={user.id} user={user} index={i} />)}
        </div>
      </div>
    </div>
  );
}
