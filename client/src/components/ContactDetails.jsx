import React from "react";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";

function ContactDetails({ selectedContact, contactEmojis, showIdSecret, setShowIdSecret, handleBackClick, handleEditClick }) {
  // if no contact selected: 
  if (!selectedContact) {
    return null; 
  }

  return (
    <div>
      <div className="flex justify-between items-center mt-25">
        {/* if medium and large screens show side by side.
        if smaller screen show the contact detail over the contact list. */}

        {/* back button for smaller screen. if it's a bigger screen we don't need the back button */}
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
      </div>

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

      {/* Lock button to show or hide the group uuid and contact uuid */}
      <button
        className="mt-4 p-2 text-white flex item-center"
        onClick={() => setShowIdSecret(!showIdSecret)}
      >
        {showIdSecret ? 
          <>
            <EyeClosedIcon className="text-blue-200 hover:text-blue-500" /> 
            <span className="text-blue-200 hover:text-blue500 ml-2"> Hide IDs & Timestamps </span>
          </> 
          :
          <>
            <EyeOpenIcon className="text-blue-200 hover:text-blue-500" />
            <span className="text-blue-200 hover:text-blue500 ml-2"> Show IDs & Timestamps </span>
          </>
        }
      </button>
      {showIdSecret && (
        <div className="mt-4">
          <p className="text-slate-300">
            <strong>UUID:</strong> {selectedContact.id}
          </p>
          <p className="text-slate-300">
            <strong>Group ID:</strong> {selectedContact.group_id || "Not in a group"}
          </p>
          <p className="text-slate-300">
            <strong>Created at:</strong> {selectedContact.created_at}
          </p>
          <p className="text-slate-300">
            <strong>Updated at:</strong> {selectedContact.updated_at}
            {/* will have to revisit this. It is displaying the same time as created at */}
          </p>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;