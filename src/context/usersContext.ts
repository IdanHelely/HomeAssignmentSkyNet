import data from '../data/usersData.json';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { randomId } from '../libs/essentials';
import axios from 'axios';

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

type StoreContent = {
  usersData: UserData[];
  setUserData: (index: number, fieldKey: string, value: string) => void;
  setInitialData: () => void;
  addNewUser: () => void;
  deleteUser: (index: number) => void;
  saveData: (data: UserData[]) => void;
  error: { msg: string; shown: boolean };
  setError: (err: string) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

const createNewUserTemplate: () => UserData = () => ({
  id: randomId(),
  name: '',
  country: '',
  email: '',
  phone: '',
});

const updateJsonData = (data: UserData[]) => {
  const updatedData = [...data];

  axios.post('http://localhost:5000/api/update-json');

  fetch('http://localhost:5000/api/update-json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
};

let timer;

export const useUserStore: UseBoundStore<StoreApi<StoreContent>> = create((set) => ({
  usersData: [],
  setUserData: (index, fieldKey, value) =>
    set((state) => {
      const usersDataCopy = [...state.usersData];
      usersDataCopy[index][fieldKey] = value;

      return { usersData: usersDataCopy };
    }),
  setInitialData: () =>
    Object.keys(data).length === 0 ? set({ usersData: [] }) : set({ usersData: data }),
  addNewUser: async () => {
    set((state) => ({ usersData: [...state.usersData, createNewUserTemplate()] }));
  },
  saveData: (data: UserData[]) => {
    updateJsonData(data);
  },
  deleteUser: (index) =>
    set((state) => {
      const newState: StoreContent['usersData'] = [...state.usersData];
      newState.splice(index, 1);

      return { usersData: newState };
    }),
  error: { msg: '', shown: false },
  setError: (err) => {
    set({ error: { msg: err, shown: true } });

    if (typeof timer === 'number') clearTimeout(timer);

    timer = setTimeout(() => {
      set({ error: { msg: err, shown: false } });
    }, 3000);
  },
  searchValue: '',
  setSearchValue: (searchValue) => set({ searchValue }),
}));
