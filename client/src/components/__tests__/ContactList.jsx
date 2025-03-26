import { ArrowLeftIcon, LockClosedIcon, LockOpen1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

function ContactList() {
  // declaring the states
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactEmojis, setContactEmojis] = useState({});
  const [showIdSecret, setShowIdSecret] = useState(false);

  useEffect(() => {
    // all the contacts
    fetch("http://localhost:5000/contacts") 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // setting an emoji for each contact
        // need to come back and learn how to make it so that  the emojis doesn't refresh everytime I refresh
        const emojis = {};
        data.forEach((contact) => {
          emojis[contact.id] = getRandomEmoji();
        });
        setContactEmojis(emojis);
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // handle when a single user is clicked
  const handleClickContact = (contact) => {
    setSelectedContact(contact);
    setShowIdSecret(false);
  };

  // close out the contact details
  const handleBackClick = () => {
    setSelectedContact(null);
    setShowIdSecret(false);
  };

  // handle the edit button
  const handleEditClick = (selectedContactId) => {
    // just going to log this out for now
    console.log(`Editing contact with ID: ${selectedContactId}`);
  };

  // setting up the emojis
  const getRandomEmoji = () => {
    const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "🥺", "🤯", "🤗", "👋", "👏", "🙌", "🙏"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return (
      <p>
        Error loading contacts: {error.message}
      </p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      {/* Displaying the contacts
      If it is on a mid size or larger screenn, split it half and half for the list annd details,
      If it is a smaller screen / mobile, show the details on top of everything / full screen size. */}
      <div
        className={`p-4 overflow-y-auto ${
          selectedContact ? "hidden md:block md:w-1/2" : "w-full"
        }`}
      >
        <h2 className="text-3xl font-semibold text-slate-500 mb-6 text-center">
          Contacts
        </h2>
        <ul>
          {/* Display the contacts as a list */}
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="flex items-center p-4 border rounded-lg hover:shadow-md hover:text-slate-300 transition-shadow text-slate-500 justify-center cursor-pointer"
              onClick={() => handleClickContact(contact)}
            >
              {/* connect the emoji */}
              <div className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-2xl">
                {contactEmojis[contact.id]}
              </div>
              <div>
                {/* Only show the first and last name here */}
                <p className="text-lg font-medium">
                  {contact.first_name} {contact.last_name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`p-4 overflow-y-auto bg-slate-700 shadow-md ${
          selectedContact ? "w-full md:w-1/2" : "hidden"
        }`}
      >
        {selectedContact && (
          <div>
            {/* back button  */}
            <button
              className="mb-4 p-2 text-blue-200 hover:text-blue-500 rounded md:hidden"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>

            {/* Edit button */}
            <button
              className="mt-2 p-2 text-white rounded text-blue-200 hover:text-blue-500"
              onClick={() => handleEditClick(selectedContact.id)}
            >
              <Pencil1Icon />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-slate-300">
              Contact Details
            </h2>
            <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-4xl">
              {contactEmojis[selectedContact.id]}
            </div>
            <p className="text-slate-300">
              <strong>Name:</strong> {selectedContact.first_name} {selectedContact.last_name}
            </p>
            <p className="text-slate-300">
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p className="text-slate-300">
              <strong>Phone:</strong> {selectedContact.phone_number}
            </p>
            <p className="text-slate-300">
              <strong>Group:</strong> {selectedContact.group_name || ""}
            </p>
            <p className="text-slate-300">
              <strong>Notes:</strong> {selectedContact.notes}
            </p>
            <button
              className="mt-4 p-2 text-white rounded"
              onClick={() => setShowIdSecret(!showIdSecret)}
            >
              {showIdSecret ? <LockClosedIcon className="text-blue-200 hover:text-blue-500"/> : <LockOpen1Icon className="text-blue-200 hover:text-blue-500"/>}
            </button>
            {showIdSecret && (
              <div className="mt-4">
                <p className="text-slate-300">
                  <strong>UUID:</strong> {selectedContact.uuid}
                </p>
                <p className="text-slate-300">
                  <strong>Group ID:</strong> {selectedContact.group_id}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;