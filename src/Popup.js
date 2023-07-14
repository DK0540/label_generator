import React, { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import "./Popup.css"; // Assuming you have a separate CSS file for styles

const Popup = ({ onClose }) => {
  const [productName, setProductName] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (showBarcode && barcodeRef.current) {
      JsBarcode(
        barcodeRef.current,
        `${productName}-${productQuality}-${productPrice}`,
        {
          format: "CODE128",
          width: 2,
          height: 50,
          displayValue: false,
        }
      );
    }
  }, [showBarcode, productName, productQuality, productPrice]);

  const handleGenerateBarcode = () => {
    setShowBarcode(true);
  };

  const handleDownloadBarcode = () => {
    const svg = barcodeRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "barcode.png";
      a.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="popup">
      <div>
        <button className="download-btn" onClick={() => setShowForm(true)}>
          Open Form
        </button>
        {showForm && (
          <form className="my-form">
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productQuality">Product Quality:</label>
              <input
                type="text"
                id="productQuality"
                value={productQuality}
                onChange={(e) => setProductQuality(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productPrice">Product Price:</label>
              <input
                type="text"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                className="generate-barcode-btn"
                type="button"
                onClick={handleGenerateBarcode}
              >
                Generate Barcode
              </button>
            </div>
            {showBarcode && (
              <div>
                <svg ref={barcodeRef} />
                <div className="form-group">
                  <button
                    className="download-btn"
                    onClick={handleDownloadBarcode}
                  >
                    Download Barcode
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
      <button onClick={onClose}>Close Popup</button>
    </div>
  );
};

export default Popup;

// import React from "react";
// import "./Popup.css"; // Assuming you have a separate CSS file for styles

// const Popup = ({ onClose }) => {
//   return (
//     <div className="popup">
//       <h2>This is a Popup</h2>
//       <button onClick={onClose}>Close Popup</button>
//     </div>
//   );
// };

// export default Popup;
