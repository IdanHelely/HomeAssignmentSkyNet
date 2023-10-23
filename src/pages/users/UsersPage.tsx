import { writeFileSync } from 'fs';
import React, { useRef, useState } from 'react';
import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import css from './usersPage.module.scss';
import { useUserStore } from '../../context/usersContext';
import { isValidUsers } from '../../libs/validations';

export default function UsersPage() {
  const { saveData, error, usersData, setError } = useUserStore();
  const [scrollToIndex, setScrollToIndex] = useState<number>(0);
  const scrollRef = useRef(null);

  const scrollTo = (
    scrollData: { type: 'bottom' } | { type: 'custom'; length: number }
  ) => {
    scrollRef.current.scrollTo({
      top: scrollData.type === 'bottom' ? usersData.length * 40 : scrollData.length * 40,
      behavior: 'smooth',
    });
  };

  const handleSave = () => {
    const validation = isValidUsers(usersData);

    if (validation.valid === false) {
      setError(`the user number ${validation.index + 1} seems to be invalid`);

      scrollTo({ type: 'custom', length: validation.index });
      return;
    }

    saveData(usersData);
  };

  return (
    <div className={css.pageRoot}>
      <div className={css.pageContentContainer}>
        <UsersList scrollRef={scrollRef} scrollTo={scrollTo} />
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
