import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';
import { create } from 'zustand';

const useUserStore = create((set) => ({
  usersData: [],
  setUsersData: set((state) => ({})),
}));

// initial value
const UsersContext = createContext({
  loading: false,
});

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('usersData', usersData);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsersData(data);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, setUsersData }), [usersData]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
