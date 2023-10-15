import data from '../data/initialUsersData.json';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { randomId } from '../libs/essentials';
import { isValidName, isValidEmail, isValidPhoneNum } from '../libs/validations';
import { changeJSON } from '../api/server';

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

type StoreContent = {
  usersData: UserData[];
  setUsersData: (state: any) => void;
  setInitialData: () => void;
  addNewUser: () => void;
  deleteUser: (index: number) => void;
  saveData: (data: UserData[]) => void;
  error: { msg: string; shown: boolean };
  setError: (err: string) => void;
};

const createNewUserTemplate: () => UserData = () => ({
  id: randomId(),
  name: '',
  country: '',
  email: '',
  phone: '',
});

/**
 *
 * @param data needs work
 */
const saveData = (data: UserData[]) => {
  changeJSON();
};

export const useUserStore: UseBoundStore<StoreApi<StoreContent>> = create((set) => ({
  usersData: [],
  setUsersData: (state) => set(state),
  setInitialData: () => set({ usersData: data }),
  addNewUser: async () => {
    set((state) => ({ usersData: [...state.usersData, createNewUserTemplate()] }));
  },
  saveData: (data: UserData[]) => saveData(data),
  deleteUser: (index) =>
    set((state) => {
      const newState: StoreContent['usersData'] = [...state.usersData];
      newState.splice(index, 1);

      return { usersData: newState };
    }),
  error: { msg: 'walahi', shown: true },
  setError: (err) => {
    set({ error: { msg: err, shown: true } });

    setTimeout(() => {
      set({ error: { msg: err, shown: false } });
    }, 3000);
  },
}));
