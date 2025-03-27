import { Cross1Icon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

function ContactForm({ selectedContact, handleAddContact, handleEditContact, handleCloseForm,}) {
  // setting the states
  // it can be add or edit 
  const [activeTab, setActiveTab] = useState(selectedContact ? "edit" : "add");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    group_id: null, // have to make sure that group_id is defined as null if a string is returned, or else will run into uuid error
    notes: "",
  });

  useEffect(() => {
    if (selectedContact && activeTab === "edit") {
      setFormData({
        first_name: selectedContact.first_name || "",
        last_name: selectedContact.last_name || "",
        email: selectedContact.email || "",
        phone_number: selectedContact.phone_number || "",
        group_id: selectedContact.group_name || null,
        notes: selectedContact.notes || "",
      });
    } else {
      // empty formData
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        group_id: null,
        notes: "",
      });
    }
  }, [selectedContact, activeTab]);

  // take the input of the user
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContact) {
      handleEditContact({ ...formData, id: selectedContact.id }); // Include the id
    } else {
      handleAddContact(formData);
    }
    handleCloseForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-slate-300 p-8 rounded-lg w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            {activeTab === "add" ? "Add Contact" : "Edit Contact"}
          </h2>
          <button className="text-gray-500" onClick={handleCloseForm}>
            <Cross1Icon />
          </button>
        </div>

        <div className="flex mb-4">
          <button
            className={`mr-2 p-2 ${
              activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add
          </button>
          <button
            className={`p-2 ${
              activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="group_id"
              value={formData.group_id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {activeTab === "add" ? "Add Contact" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;