import React from 'react';
import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import css from './usersPage.module.scss';

export default function UsersPage() {
  return (
    <div className={css.pageRoot}>
      <div className={css.pageContentContainer}>
        <UsersList />
        <div className={css.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            // TODO: Implement onClick handler
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
