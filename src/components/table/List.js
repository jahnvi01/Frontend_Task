import React from "react";
import { ListItem } from "./ListItem";
import sortIcon from "../../assets/sort.png";
import ascSort from "../../assets/up-arrow.png";
import descSort from "../../assets/down-arrow.png";
/**
 * It's a function that takes in a list and a loading state and returns a table with the list items
 */
const List = ({ list, loading, sort, setSort }) => {
  return (
    <>
      <div className="table-container">
        <div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  Name{" "}
                  <span
                    onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
                  >
                    <img
                      src={
                        sort === "asc"
                          ? ascSort
                          : sort === "desc"
                          ? descSort
                          : sortIcon
                      }
                      width="15"
                      height="15"
                      alt="src"
                    />
                  </span>
                </th>
                <th>Type</th>
                <th>description</th>
                <th>CreatedAt</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="loading-text">
                    <em>Loading...</em>
                  </td>
                </tr>
              ) : (
                list.map((item, index) => (
                  <ListItem key={index} index={index + 1} item={item} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;
