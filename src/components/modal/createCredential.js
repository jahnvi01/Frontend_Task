import React, { useState } from "react";
import { Modal, Input, notification } from "antd";
import { isURL } from "../../utils/helpers";

const CreateCredentialModal = ({ isModalOpen, submitData, handleCancel }) => {
  const [id, setId] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const handleOk = () => {
    if (!id || !type || !subject || !subjectId) {
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
      subject,
      subjectId,
    });
    resetValues();
  };

  const resetValues = () => {
    setId("");
    setContext("");
    setType("");
    setSubject("");
    setSubjectId("");
    resetValues();
  };

  return (
    <Modal
      title="Issue Credentails"
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
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Input
        style={{ margin: "5px" }}
        placeholder="Enter Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
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

export default CreateCredentialModal;
