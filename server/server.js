import express from 'express';
import cors from 'cors';
import pgPromise from 'pg-promise';

const app = express();
const port = 5000;
const pgp = pgPromise();
const db = pgp('postgres://tpl622_6@localhost:5432/wkcontactlistapp');

app.use(cors());
app.use(express.json());

// Testing to make sure it connects to back end
app.get('/test-connection', (req, res) => {
  res.json('Welcome! back end to contatct-list-app is connected');
});

// Display all the contacts and join with groups too
app.get('/contacts', async (req, res) => {
  const { search } = req.query; 
  try {
    let query = `
      SELECT
        contacts.id AS id,
        contacts.first_name,
        contacts.last_name,
        contacts.email,
        contacts.phone_number,
        contacts.notes,
        contacts.group_id,
        contacts.created_at,
        contacts.updated_at,
        groups.group_name
      FROM
        contacts
      LEFT JOIN
        groups ON contacts.group_id = groups.id
    `;
    let values = [];

    if (search) {
      query += `
        WHERE
          contacts.first_name ILIKE $1 OR
          contacts.last_name ILIKE $1 OR
          contacts.email ILIKE $1 OR
          contacts.phone_number LIKE $1
      `;
      values = [`%${search}%`];
    }

    const contacts = await db.any(query, values);

    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get the groups 
app.get('/groups', async (req, res) => {
  try {
    const groups = await db.any('SELECT id, group_name FROM groups');
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a group
app.post('/groups', async (req, res) => {
  try {
    const { group_name } = req.body;
    const newGroup = await db.one(
      'INSERT INTO groups (group_name) VALUES ($1) RETURNING *',
      [group_name]
    );
    res.json(newGroup);
  } catch (error) {
    console.error('Error adding group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const { first_name, last_name, email, phone_number, group_id, notes } = req.body;
    // console.log('Backend received: id:', contactId, 'data:', req.body);
    // console.log('Values:', {first_name, last_name, email, phone_number, group_id, notes});

    const updatedContact = await db.one(
      'UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone_number = $4, group_id = $5, notes = $6 WHERE id = $7 RETURNING *',
      [first_name, last_name, email, phone_number, group_id, notes, contactId]
    );

    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new contact
app.post('/contacts', async (req, res) => {
  try {
      const { first_name, last_name, email, phone_number, group_id, notes } = req.body;
      const newContact = await db.one(
          'INSERT INTO contacts (first_name, last_name, email, phone_number, group_id, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [first_name, last_name, email, phone_number, group_id, notes]
      );
      res.json(newContact);
  } catch (error) {
      console.error('Error adding contact:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    await db.none('DELETE FROM contacts WHERE id = $1', [contactId]);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});