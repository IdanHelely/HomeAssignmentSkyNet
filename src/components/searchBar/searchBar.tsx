import { useEffect, useState } from 'react';
import { useUserStore } from '../../context/usersContext';
import css from './searchBar.module.scss';
import { useDebounce } from '../../libs/essentials';

export default function SearchBar() {
  const [searchValueState, setSearchValueState] = useState('');
  const { setSearchValue } = useUserStore();

  const debouncedSearchValue = useDebounce(searchValueState, 700);

  useEffect(() => {
    setSearchValue(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <input
      className={css['search']}
      placeholder="search"
      value={searchValueState}
      onChange={(e) => {
        setSearchValueState(e.target.value);
      }}
    />
  );
}
