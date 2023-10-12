import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { randomId } from '../libs/essentials';

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

type StoreContent = {
  usersData: Record<string, UserData>;
  setUsersData: (state: any) => void;
  setInitialData: () => void;
  addNewUser: () => void;
  deleteUser: (id: string) => void;
};

const prepareInitialData = () => {
  const usersData = {};
  for (const user of data) {
    usersData[user.id] = { ...user };
  }

  return usersData;
};

const createNewUserTemplate: () => Record<string, UserData> = () => {
  const id = randomId();

  return {
    [id]: {
      id,
      name: '',
      country: '',
      email: '',
      phone: '',
    },
  };
};

const confirmAllFieldsFull = (users: Record<string, UserData>) => {
  for (const user of Object.values(users)) {
    if (user.country === '') return false;
  }
};

export const useUserStore: UseBoundStore<StoreApi<StoreContent>> = create((set) => ({
  usersData: {},
  setUsersData: (state) => set(state),
  setInitialData: () => set({ usersData: prepareInitialData() }),
  addNewUser: async () => {
    set((state) => ({ usersData: { ...state.usersData, ...createNewUserTemplate() } }));
  },
  deleteUser: (id) =>
    set((state) => {
      const newState: StoreContent['usersData'] = { ...state.usersData };
      delete newState[id];

      return { usersData: newState };
    }),
}));

// // initial value
// const UsersContext = createContext({
//   loading: false,
// });

// // value provider
// export const ContextProvider = ({ children }) => {
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   console.log('usersData', usersData);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       setUsersData(data);
//     }, 2000);

//     return () => {
//       clearTimeout(t);
//     };
//   }, []);

//   const contextValue = useMemo(() => ({ usersData, setUsersData }), [usersData]);

//   return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
// };

// // consumer
// export const useUsersContext = () => useContext(UsersContext);

// export default UsersContext;
