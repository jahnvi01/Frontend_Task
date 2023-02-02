import React, { useState } from "react";
import { Button, notification } from "antd";
import { issuePresentation } from "../../actions/api";
import moment from "moment";
import CreatePresentationModal from "../modal/createPresentation";

const Presentations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const submitData = async (data) => {
    const { id, context, type, holder } = data;
    const presentationData = {
      holder,
      challenge: "string",
      domain: "string",
      credentials: [
        {
          "@context": [context],
          id,
          type: [type],
          proof: {
            type: "Sr25519Signature2020",
            proofPurpose: "assertionMethod",
            verificationMethod: "string",
            created: moment(new Date()).format(),
            proofValue: "string",
          },
        },
      ],
    };

    issuePresentation(presentationData)
      .then((result) => {
        notification.success({ message: "Presentation issued!" });
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.error({ message: "Something went wrong!" });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <Button type="primary" onClick={showModal}>
          Create Presentation
        </Button>
        <CreatePresentationModal
          isModalOpen={isModalOpen}
          submitData={submitData}
          handleCancel={handleCancel}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Presentations;
