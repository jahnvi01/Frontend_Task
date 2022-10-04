import React, { useEffect } from "react";

export const Modal = ({
  title,
  handleClose,
  handleSubmit,
  button,
  children,
}) => {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        handleClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">{title}</h3>
        {children}
        <div className="modal-footer">
          <button className="modal-button" type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className="modal-button" type="button" onClick={handleSubmit}>
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};
