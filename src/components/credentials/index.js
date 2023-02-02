import React, { useEffect, useState } from "react";
import { Button, notification, Table } from "antd";
import CreateCredentialModal from "../modal/createCredential";
import { fetchCredentials, issueCredential } from "../../actions/api";
import { ISSUER_DID } from "../../utils/constants";
import moment from "moment";
import Presentations from "../presentations";

const Credentials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentialslist, setCredentialsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Credential ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Subject Reference",
      dataIndex: "subjectRef",
      key: "subjectRef",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Issuance Date",
      key: "issuanceDate",
      dataIndex: "issuanceDate",
      render: (_) => <>{moment(_.issuanceDate).format("LLL")}</>,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const results = await fetchCredentials();
    if (results.data) {
      setCredentialsList(results.data);
    }
    setLoading(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const submitData = async (data) => {
    const { id, context, type, subject, subjectId } = data;
    const credentialData = {
      persist: false,
      anchor: true,
      credential: {
        id,
        context: [context],
        type: [type],
        subject: {
          id: subjectId,
          degree: {
            type,
            name: subject,
          },
        },
        issuer: ISSUER_DID,
        issuanceDate: moment(new Date()).format(),
      },
    };

    issueCredential(credentialData)
      .then((result) => {
        notification.success({ message: "Credential issued!" });
        fetchData();
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
    <div className="credentials-section">
      <div className="button-section">
        <Button type="primary" className="issue-credential" onClick={showModal}>
          Issue Credential
        </Button>
        <Presentations />
      </div>
      <CreateCredentialModal
        isModalOpen={isModalOpen}
        submitData={submitData}
        handleCancel={handleCancel}
      />

      <div className="table-section">
        <Table
          loading={loading}
          columns={columns}
          dataSource={credentialslist}
        />
      </div>
    </div>
  );
};

export default Credentials;
