import { writeFileSync } from 'fs';
import React from 'react';
import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import css from './usersPage.module.scss';
import { useUserStore } from '../../context/usersContext';

export default function UsersPage() {
  const { saveData, error } = useUserStore();

  const handleSave = () => {
    saveData([]);
  };

  return (
    <div className={css.pageRoot}>
      <div className={css.pageContentContainer}>
        <UsersList />
        <div className={css['bottom-container']}>
          <div className={css['error-container']} data-is-shown={error.shown}>
            {error.msg}
          </div>
          <div className={css.rightButtonContainer} onClick={() => handleSave()}>
            <PrimaryButton disabled={false}>Save</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
