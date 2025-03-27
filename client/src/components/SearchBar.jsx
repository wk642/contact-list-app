import { MagicWandIcon } from '@radix-ui/react-icons';
import React from 'react';

// exporting up here due to suggestion, will go in and change the rest up as well later
function SearchBar({ searchContact, onChangeSearch }) {
  return (
    <div className="p-4 fixed top-0 left-0 w-full bg-black text-slate-500 z-10 shadow-md">
      <input
        type="text"
        placeholder="Search ... "
        value={searchContact}
        onChange={onChangeSearch}
        className="border-b-4 p-5 w-full text-white"
      />
    </div>
  );
}

export default SearchBar;