import React, { useState, useEffect } from "react";
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';

function App() {
  const [searchContact, setSearchContact] = useState("");
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(true);

  // search
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:5000/contacts';
        if (searchContact) {
          url += `?search=${searchContact}`;
        }
        console.log("Fetching URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data from server:", data);
        setContacts(data);
        setLoading(false);
      } catch (err) {
        console.error('Not able to fetch the contacts', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchContact]);

  // when user types into the search bar
  const handleChangeSearch = (event) => {
    setSearchContact(event.target.value);
  };

  return (
    <>      
      <SearchBar 
        searchContact={searchContact} 
        onChangeSearch={handleChangeSearch}
      />

      <ContactList contacts={contacts} loading={loading} searchContact={searchContact} />
    </>
  )
}

export default App
