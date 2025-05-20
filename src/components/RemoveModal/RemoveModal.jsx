import React from "react";
import "./RemoveModal.css";

const RemoveModal = ({
  isOpen,
  onClose,
  onConfirm,
  mainHeading,
  subHeading,
  openModal,
}) => {
  if (!openModal && !isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="remove-card">
        <div className="remove-heading">
          <h4>{mainHeading}</h4>
          <p>{subHeading}</p>
        </div>
        <div className="remove-footer">
          <button className="remove-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="yes-remove" onClick={() => onConfirm()}>
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
