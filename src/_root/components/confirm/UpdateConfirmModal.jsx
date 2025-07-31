import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";

const UpdateConfirmModal = ({ confirmModalProps }) => {
  const { isModalOpen, handleConfirmOk, handleConfirmCancel } = confirmModalProps;

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={handleConfirmOk}>
      Evet
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={handleConfirmCancel}>
      Hayır
    </Button>,
  ];

  return <Modal title="Değiştirmek istediğinizden emin misiniz?" footer={footer} open={isModalOpen} onOk={handleConfirmOk} onCancel={handleConfirmCancel} />;
};

UpdateConfirmModal.propTypes = {
  confirmModalProps: PropTypes.shape({
    isModalOpen: PropTypes.bool,
    handleConfirmOk: PropTypes.func,
    handleConfirmCancel: PropTypes.func,
  }),
};

export default UpdateConfirmModal;
