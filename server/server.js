import express from 'express';
import cors from 'cors';
import pgPromise from 'pg-promise';

const app = express();
const port = 5000; 
const pgp = pgPromise();
const db = pgp('postgres://tpl622_6@localhost:5432/wkcontactlistapp');

app.use(cors());
app.use(express.json());

// testing to make sure it connects to back end
app.get('/test-connection', (req, res) => {
  res.json("Welcome! back end to contatct-list-app is connected");
});

//display all the contacts
app.get('/contacts', async (req, res) => {
  try{
    const contacts = await db.any('SELECT * FROM contacts');
    res.json(contacts);
  } catch (error) {
    console.error("Error in getting contacts");
    res.status(500).json({error:'Error in getting'});
  }
})

// Add a new contact
app.post('/contacts', async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, group_id, notes } = req.body;
    const newContact = await db.one(
      'INSERT INTO contacts (first_name, last_name, email, phone_number, group_id, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, email, phone_number, group_id, notes]
    );
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Error adding contact' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});