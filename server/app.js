import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(express.json());


app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});


