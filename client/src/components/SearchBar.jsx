import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

// exporting up here due to suggestion, will go in and change the rest up as well later
function SearchBar({ searchContact, onChangeSearch }) {
  return (
    <div className="p-4 fixed top-0 left-0 w-full bg-black text-slate-500 shadow-md">
      <div className="relative flex items-center">
        {/* Want to make sure that the magnifying glass is on the same line as the search  */}
        <MagnifyingGlassIcon className="h-5 w-5 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search ... "
          value={searchContact}
          onChange={onChangeSearch}
          className="border-b-4 p-5 pl-8 w-full text-white bg-black"
        />
      </div>
    </div>
  );
}

export default SearchBar;