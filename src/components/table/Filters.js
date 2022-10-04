/**
 * It renders a search bar that allows the user to search for a keyword
 * @returns A React component that renders a search bar and a button.
 */

import React, { useState } from "react";
import searchIcon from "../../assets/search.png";

export const Filters = ({ search, setSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="topnav">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search.."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          name="search"
        />
        <button
          className="search-button"
          onClick={() => setSearch(searchKeyword)}
        >
          <img src={searchIcon} alt="Search" width="20" height="20" />
        </button>
      </div>
    </div>
  );
};
