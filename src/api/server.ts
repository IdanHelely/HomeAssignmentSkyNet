import fs from 'fs';

export const changeJSON = () => {
  fs.writeFile(
    '../data/initialUsersData.json',
    JSON.stringify([{ country: '', email: '', id: '', name: '', phone: '' }]),
    () => {
      console.log(111);
    }
  );
};
