import React, { useState } from "react";
import { Modal, Input, notification } from "antd";
import { isURL } from "../../utils/helpers";

const CreatePresentationModal = ({ isModalOpen, submitData, handleCancel }) => {
  const [id, setId] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState("");
  const [holder, setHolder] = useState("");

  const handleOk = () => {
    if (!id || !type || !holder || !context) {
      notification.warning({ message: "Fill up all the fields" });
      return;
    }
    if (!isURL(id)) {
      notification.warning({ message: "ID should be in URL format only." });
      return;
    }
    submitData({
      id,
      context,
      type,
      holder,
    });
    resetValues();
  };

  const resetValues = () => {
    setId("");
    setContext("");
    setType("");
    setHolder("");
  };

  return (
    <Modal
      title=" Create Presentations"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        style={{ margin: "5px" }}
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        style={{ margin: "5px" }}
        placeholder="Enter Context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <Input
        style={{ margin: "5px" }}
        placeholder="Enter Holder"
        value={holder}
        onChange={(e) => setHolder(e.target.value)}
      />
      <Input
        style={{ margin: "5px" }}
        placeholder="Enter Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
    </Modal>
  );
};

export default CreatePresentationModal;
