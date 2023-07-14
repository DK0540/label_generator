import React from "react";
import "./PopupComponent.scss"; // Add styling specific to the PopupComponent

const CustomPopupComponent = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-card">
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomPopupComponent;
