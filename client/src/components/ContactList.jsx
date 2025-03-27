import { ArrowLeftIcon, LockClosedIcon, LockOpen1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

function ContactList() {
  // declaring the states
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactEmojis, setContactEmojis] = useState({});
  const [showIdSecret, setShowIdSecret] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
        console.log("Data from backend:", data);
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
    console.log(`Editing contact with ID: ${selectedContactId}`);
    setSelectedContact(contacts.find((contact) => contact.id === selectedContactId));
    setShowForm(true);
  };

  // handle the close button
  const handleCloseForm = () => {
    setSelectedContact(null);
    setShowForm(false);
  };

  // handle adding a new contact
  const handleAddContact = (newContactData) => {
    fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContactData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Refresh the contacts after successful addition
        fetch("http://localhost:5000/contacts")
          .then((response) => response.json())
          .then((data) => {
            const emojis = {};
            data.forEach((contact) => {
              emojis[contact.id] = getRandomEmoji();
            });
            setContactEmojis(emojis);
            setContacts(data);
          });
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
      });
  };

  // handle edit contact
  const handleEditContact = (updatedContactData) => {
    console.log("Updating contact with data:", updatedContactData);

    fetch(`http://localhost:5000/contacts/${updatedContactData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContactData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contact updated successfully:", data);
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === data.id ? data : contact
          )
        );
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
      });
  };

  // handle delete contact
  const handleDeleteContact = (contactId) => {
    console.log("Deleting contact with ID:", contactId);
    if (contactId) {
      fetch(`http://localhost:5000/contacts/${contactId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setContacts(contacts.filter((contact) => contact.id !== contactId));
          const updatedEmojis = { ...contactEmojis };
          delete updatedEmojis[contactId];
          setContactEmojis(updatedEmojis);
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    } else {
      console.error("contactId is undefined. Cannot delete.");
    }
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
              key={contact.contact_id}
              className="flex items-center p-4 border rounded-lg hover:shadow-md hover:text-slate-300 transition-shadow text-slate-500 justify-center cursor-pointer"
              onClick={() => handleClickContact(contact)}
            >
              <button
                className="p-2 text-slate-100 rounded"
                onClick={() => {
                  handleEditClick(contact.id);
                }}
              >
                <Pencil1Icon />
              </button>
              <button
                className="p-2 text-slate-100 rounded"
                onClick={() => {
                  console.log("contact.contact_id from delete button:", contact.id);
                console.log("Entire contact object:", contact);
                  handleDeleteContact(contact.id);
                }}
              >
                <TrashIcon />
              </button>
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
        <ContactDetails
          selectedContact={selectedContact}
          contactEmojis={contactEmojis}
          showIdSecret={showIdSecret}
          setShowIdSecret={setShowIdSecret}
          handleBackClick={handleBackClick}
          handleEditClick={handleEditClick}
        />
      </div>

      {showForm && (
        <ContactForm
          selectedContact={selectedContact}
          handleAddContact={handleAddContact}
          handleEditContact={handleEditContact}
          handleCloseForm={handleCloseForm}
        />
      )}
    </div>
  );
}

export default ContactList;