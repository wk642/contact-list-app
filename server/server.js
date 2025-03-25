import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

// testing to make sure it connects to back end
app.get('/', (req, res) => {
  res.json("Welcome! back end to contatct-list-app is connected");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
