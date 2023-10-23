import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import css from './usersList.module.scss';
import { useUserStore } from '../../../context/usersContext';
import { isValidUser } from '../../../libs/validations';
import Select from 'react-select';
import { selectStyle } from '../../../libs/selectStyle';
import SearchBar from '../../../components/searchBar/searchBar';

const selectOptions = [
  { label: 'none', value: null },
  { label: 'name a-z', value: { key: 'name', order: 'asc' } },
  { label: 'name z-a', value: { key: 'name', order: 'desc' } },
  { label: 'country a-z', value: { key: 'country', order: 'asc' } },
  { label: 'country z-a', value: { key: 'country', order: 'desc' } },
  { label: 'mail a-z', value: { key: 'email', order: 'asc' } },
  { label: 'mail z-a', value: { key: 'email', order: 'desc' } },
];

type Props = {
  scrollTo: (scrollData: { type: 'bottom' } | { type: 'custom'; length: number }) => void;
  scrollRef: React.MutableRefObject<any>;
};

export default function UsersList({ scrollTo, scrollRef }: Props) {
  const { usersData, addNewUser, setError, searchValue } = useUserStore();

  const [sortBy, setSortBy] = useState<{ key: string; order: string } | null>(null);

  const handleAddBtn = async () => {
    // checks if the last user is valid, to limit the number of empty users

    if (!isValidUser(usersData[usersData.length - 1])) {
      setError("please check that the last user's data is complete");
      scrollTo({ type: 'bottom' });
      return;
    }

    await addNewUser();
    scrollTo({ type: 'bottom' });
  };

  const getUsersData = useCallback(() => {
    if (usersData.length === 0) return usersData;

    let usersDataCopy = [...usersData];

    if (searchValue !== '' && usersDataCopy) {
      usersDataCopy = usersDataCopy.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.phone.slice(1).includes(searchValue)
      );
    }

    if (sortBy !== null) {
      usersDataCopy.sort((a, b) => {
        if (sortBy.order === 'asc') return a[sortBy.key] > b[sortBy.key] ? 1 : -1;
        return a[sortBy.key] < b[sortBy.key] ? 1 : -1;
      });
    }

    return usersDataCopy;
  }, [sortBy, searchValue, usersData]);

  return (
    <div className={css.usersList}>
      <div className={css.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        <div className={css['right-side-container']}>
          <SearchBar />
          <div className={css['sorter-container']}>
            <Select
              options={selectOptions}
              styles={selectStyle}
              placeholder="sort by"
              onChange={(val) => {
                setSortBy(val.value);
              }}
            />
          </div>
          <AddButton handleClick={() => handleAddBtn()} />
        </div>
      </div>
      <div className={css['user-list-wrapper']} ref={scrollRef}>
        <div className={css.usersListContent}>
          {getUsersData().map((user, i) => (
            <UserRow key={user.id} user={user} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
