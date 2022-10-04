import moment from "moment";
import React, { useState } from "react";
import { fetchListItem } from "../../actions/api";
import { DeleteModal } from "../modal/DeleteModal";
import { EditModal } from "../modal/EditModal";

/**
 * It returns an array of two elements, the first element is a table row, the second element is a table
 * row that expands only when the row is clicked
 * @returns An array of two elements.
 */

export const ListItem = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [expanded, setExpanded] = useState(false);

  const toggleExpander = async (id) => {
    setIsLoading(true);
    if (!expanded) {
      const data = await fetchListItem(id);
      if (data && data.data) {
        setDetails(data.data);
      }
    }
    setExpanded(!expanded);
    setIsLoading(false);
  };

  /* Returning an array of two elements. */
  return [
    <tr key="main" onClick={() => toggleExpander(item.id)}>
      <td>{item.id}.</td>
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td>{item.description}</td>
      <td>{moment(item.createdAt).format("YYYY/MM/DD")}</td>
      <td>
        <EditModal item={item} />
      </td>
      <td>
        <DeleteModal item={item} />
      </td>
    </tr>,
    expanded &&
      (isLoading || !details ? (
        <div>Loading...</div>
      ) : (
        <tr className="expandable" key="tr-expander">
          <td colSpan={12}>
            <div>
              <div>
                <h5>{details.name}</h5>
                <p>
                  ID:
                  {details.id}
                  &nbsp; Type: {details.type}
                </p>
                <p>Description: {details.description}</p>
                <p>
                  Date of creation: {moment(details.createdAt).format("LL")}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )),
  ];
};
