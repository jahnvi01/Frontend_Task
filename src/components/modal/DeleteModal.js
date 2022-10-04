import React, { useEffect, useState } from "react";
import { deleteListItem } from "../../actions/api";
import deleteIcon from "../../assets/bin.png";
import { Modal } from "./Modal";

/**
 * It's a modal that allows you to delete a list item
 * @returns A function that returns a component
 */

export const DeleteModal = ({ item }) => {
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

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteListItem(item.id, { description });
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
        src={deleteIcon}
        onClick={() => toggleOpen()}
        alt={"delete" + item.id}
        width="15"
        height="15"
      />
      {open && (
        <Modal
          handleClose={toggleOpen}
          title={"Delete Item"}
          button={loading ? "Deleting..." : "Delete"}
          handleSubmit={() => handleDelete()}
        >
          <h6>Are you sure you want to delete this item ?</h6>
        </Modal>
      )}
    </div>
  );
};
