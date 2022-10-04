import React from "react";

/**
 * It takes in the listPerPage, totalList, and paginate props and returns a list of page numbers that
 * are clickable and call the paginate function
 * @returns The pagination component is being returned.
 */

const Pagination = ({ listPerPage, totalList, paginate, loading }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalList / listPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={loading ? "hide" : "show"}>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
