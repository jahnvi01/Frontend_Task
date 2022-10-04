import React, { useEffect, useState } from "react";
import { editListItem } from "../../actions/api";
import editIcon from "../../assets/pencil.png";
import { Modal } from "./Modal";

/**
 * It's a modal that allows you to edit the description of a list item
 * @returns A modal that allows the user to edit the description of a list item.
 */

export const EditModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setDescription(item.description);
    }
  }, [item]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleEdit = async () => {
    setLoading(true);
    const result = await editListItem(item.id, { description });
    if (result.data) {
      setOpen(false);
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div>
      <img
        src={editIcon}
        onClick={() => toggleOpen()}
        alt={"edit" + item.id}
        width="15"
        height="15"
      />
      {open && (
        <Modal
          handleClose={toggleOpen}
          title={"Edit Description"}
          button={loading ? "Saving..." : "Save"}
          handleSubmit={() => handleEdit()}
        >
          <input
            className="modal-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
};
