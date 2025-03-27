import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

function ContactForm({ selectedContact, handleAddContact, handleEditContact, handleCloseForm, formMode}) {
  // setting the states
  // it can be add or edit 
  // taking activeTab out, or else it will always edit even if switch it to add
  // const [activeTab, setActiveTab] = useState(selectedContact ? "edit" : "add");

  // setting up the groups states.
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [showAddGroup, setShowAddGroup] = useState(false);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    group_id: null, // have to make sure that group_id is defined as null if a string is returned, or else will run into uuid error
    notes: "",      
  });

  useEffect(() => {
    // groups
    fetch("http://localhost:5000/groups")
    .then((response) => response.json())
    .then((data) => {
      console.log("Groups data:", data); 
      setGroups(data);
    })
    .catch((error) => console.error("Error fetching groups:", error));

    // for editing form 
    if (selectedContact && formMode === "edit") {
      setFormData({
        first_name: selectedContact.first_name || "",
        last_name: selectedContact.last_name || "",
        email: selectedContact.email || "",
        phone_number: selectedContact.phone_number || "",
        group_id: selectedContact.group_id || null,
        notes: selectedContact.notes || "",
      });
    } else {
      // empty formData
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        group_id: "",
        notes: "",
      });
    }
  }, [selectedContact, formMode]);

  // take the input of the user
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (dataToSend.group_id === "") {
      dataToSend.group_id = ""; 
    }
    // if we are in edit mode
    if (formMode === "edit") { 
      handleEditContact({ ...formData, id: selectedContact.id });
    } else {
      // in add mode
      handleAddContact(formData);
    }
    handleCloseForm();
  };

  // handle adding group
  const handleAddGroup = () => {
    fetch("http://localhost:5000/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name: newGroupName }),
    })
      .then((response) => response.json())
      .then(() => {
        // update the groups list after adding 
        fetch("http://localhost:5000/groups")
          .then((response) => response.json())
          // update the state of the group as well
          .then((data) => setGroups(data));
        setNewGroupName("");
        setShowAddGroup(false);
      })
      .catch((error) => console.error("Error adding group:", error));
  };
 
  return (
    // come back to this and figure out tabs for add and edit
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-slate-300 p-8 rounded-lg w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            {formMode === "add" ? "Add Contact" : "Edit Contact"}
          </h2>
          <button className="text-gray-500" onClick={handleCloseForm}>
            <Cross1Icon />
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
            <div className="flex items-center">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="group_id"
                value={formData.group_id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, group_id: e.target.value || null })
                }
              >
                {/* Display the groups as an option and allowing them to add a group too */}
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.group_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="ml-2 text-slate-700 hover:text-slate-500 py-2 px-4 "
                onClick={() => setShowAddGroup(true)}
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {showAddGroup && (
            <div className="mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="New Group Name"
              />
              <button
                type="button"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddGroup}
              >
                Create Group
              </button>
            </div>
          )}

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
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {formMode === "add" ? "Add" : "Update"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactForm;