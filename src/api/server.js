import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/update-json', (req, res) => {
  const updatedData = req.body;

  fs.writeFileSync('src/data/usersData.json', JSON.stringify(updatedData));

  res.json(updatedData);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
