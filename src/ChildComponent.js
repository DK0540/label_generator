import React, { useState, useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-preset-newsletter";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import "./childcomponent.css";

const ChildComponent = ({ htmlCode }) => {
  const [editor, setEditor] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
  const designContainerRef = useRef(null);
  const captureContainerRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    const initializeEditor = () => {
      const editor = grapesjs.init({
        container: "#gjs",
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {
            /* options */
          },
        },
        storageManager: false,
      });

      setEditor(editor);
    };

    initializeEditor();
  }, []);

  useEffect(() => {
    if (editor) {
      editor.setComponents(updatedHtmlCode);
    }
  }, [editor, updatedHtmlCode]);

  const handleEdit = () => {
    setShowEditor(true);
  };

  const handleSave = () => {
    const updatedHtmlCode = editor.getHtml();
    console.log("Updated HTML code:", updatedHtmlCode);
    setUpdatedHtmlCode(updatedHtmlCode);
    const blob = new Blob([updatedHtmlCode], { type: "text/html" });
    saveAs(blob, "design.html");
  };

  const handleSendForReview = () => {
    captureImage();
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("image", imageDataUrl, "design.jpg");

    // Send the formData to the server or handle the submission as needed
    // Example: axios.post("/send-email", formData);

    console.log("Form data:", formData);

    // Reset the form fields
    setName("");
    setEmail("");
    setMessage("");
    setImageDataUrl(null);

    setShowForm(false); // Close the form popup
  };

  const captureImage = () => {
    domtoimage
      .toJpeg(captureContainerRef.current)
      .then(function (dataUrl) {
        setImageDataUrl(dataUrl);
      })
      .catch(function (error) {
        console.error("Error capturing the image:", error);
      });
  };

  return (
    <div className="cmain">
      <nav className="cnav">
        <h2 className="ctitle">Saved Templates</h2>
      </nav>
      <div className="capture-container" ref={captureContainerRef}>
        <div
          id="design-container"
          ref={designContainerRef}
          dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
        ></div>
      </div>
      <div className="cbtns">
        {!showEditor && (
          <div className="fixed-buttons">
            <button className="csend" onClick={handleSendForReview}>
              Send for Review
            </button>
            <button className="csave" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
      <div>
        {!showEditor ? (
          <button className="cbtntwo" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <div>
            <button onClick={() => setShowEditor(false)}>Done</button>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
      {showEditor && <div id="gjs"></div>}
      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleFormSubmit}>
            <h3>Send HTML Code for Review</h3>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {imageDataUrl && (
              <div className="image-preview">
                <h4>Design Preview:</h4>
                <img src={imageDataUrl} alt="Design Preview" />
                <p>Text (HTML)</p>
              </div>
            )}
            <button type="submit">Send</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChildComponent;

//------------------------------------------------------------------>>>>>>>>>>>>>Start
// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import domtoimage from "dom-to-image";
// import "./childcomponent.css";

// const ChildComponent = ({ htmlCode }) => {
//   const [editor, setEditor] = useState(null);
//   const [showEditor, setShowEditor] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
//   const designContainerRef = useRef(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [imageDataUrl, setImageDataUrl] = useState(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         storageManager: false,
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   useEffect(() => {
//     if (editor) {
//       editor.setComponents(updatedHtmlCode);
//     }
//   }, [editor, updatedHtmlCode]);

//   const handleEdit = () => {
//     setShowEditor(true);
//   };

//   const handleSave = () => {
//     const updatedHtmlCode = editor.getHtml();
//     console.log("Updated HTML code:", updatedHtmlCode);
//     setUpdatedHtmlCode(updatedHtmlCode);
//     const blob = new Blob([updatedHtmlCode], { type: "text/html" });
//     saveAs(blob, "design.html");
//   };

//   const handleSendForReview = () => {
//     captureImage();
//     setShowForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("message", message);
//     formData.append("image", imageDataUrl, "design.jpg");

//     // Send the formData to the server or handle the submission as needed
//     // Example: axios.post("/send-email", formData);

//     console.log("Form data:", formData);

//     // Reset the form fields
//     setName("");
//     setEmail("");
//     setMessage("");
//     setImageDataUrl(null);

//     setShowForm(false); // Close the form popup
//   };

//   const captureImage = () => {
//     domtoimage
//       .toJpeg(designContainerRef.current)
//       .then(function (dataUrl) {
//         setImageDataUrl(dataUrl);
//       })
//       .catch(function (error) {
//         console.error("Error capturing the image:", error);
//       });
//   };

//   return (
//     <div className="cmain">
//       <nav className="cnav">
//         <h2 className="ctittle">Saved Templates</h2>
//       </nav>
//       <div
//         id="design-container"
//         ref={designContainerRef}
//         dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
//       ></div>
//       <div className="cbtns">
//         {!showEditor && (
//           <div className="fixed-buttons">
//             <button className="csend" onClick={handleSendForReview}>
//               Send for Review
//             </button>
//             <button className="csave" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <div>
//         {!showEditor ? (
//           <button className="cbtntwo" onClick={handleEdit}>
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button onClick={() => setShowEditor(false)}>Done</button>
//             <button onClick={handleSave}>Save</button>
//           </div>
//         )}
//       </div>
//       {showEditor && <div id="gjs"></div>}
//       {showForm && (
//         <div className="form-popup">
//           <form onSubmit={handleFormSubmit}>
//             <h3>Send HTML Code for Review</h3>
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Message:</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             {imageDataUrl && (
//               <div className="image-preview">
//                 <img src={imageDataUrl} alt="Design Preview" />
//               </div>
//             )}
//             <button type="submit">Send</button>
//             <button
//               type="button"
//               className="cancel-button"
//               onClick={() => setShowForm(false)}
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChildComponent;
//---------------------------------------------------------------->> Getting image code
// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import domToImage from "dom-to-image";
// import "./childcomponent.css";

// const ChildComponent = ({ htmlCode }) => {
//   const [editor, setEditor] = useState(null);
//   const [showEditor, setShowEditor] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
//   const designContainerRef = useRef(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [barcodeImage, setBarcodeImage] = useState(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         storageManager: false,
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   useEffect(() => {
//     if (editor) {
//       editor.setComponents(updatedHtmlCode);
//     }
//   }, [editor, updatedHtmlCode]);

//   const handleEdit = () => {
//     setShowEditor(true);
//   };

//   const handleSave = () => {
//     const updatedHtmlCode = editor.getHtml();
//     console.log("Updated HTML code:", updatedHtmlCode);
//     setUpdatedHtmlCode(updatedHtmlCode);
//     const blob = new Blob([updatedHtmlCode], { type: "text/html" });
//     saveAs(blob, "design.html");
//   };

//   const handleSendForReview = () => {
//     generateBarcode();
//     setShowForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     domToImage
//       .toBlob(designContainerRef.current)
//       .then(function (blob) {
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("message", message);
//         formData.append("image", blob, "design.png");

//         // Send the formData to the server or handle the submission as needed
//         // Example: axios.post("/send-email", formData);

//         console.log("Form data:", formData);

//         // Reset the form fields
//         setName("");
//         setEmail("");
//         setMessage("");
//         setBarcodeImage(null);

//         setShowForm(false); // Close the form popup
//       })
//       .catch(function (error) {
//         console.error("Error capturing the image:", error);
//       });
//   };

//   const generateBarcode = () => {
//     // Call the barcode generation API with the barcode content
//     // Set the generated barcode image URL in the barcodeImage state
//     const barcodeContent = updatedHtmlCode; // Replace with the desired barcode content
//     const barcodeAPI = `https://api.example.com/generateBarcode?content=${encodeURIComponent(
//       barcodeContent
//     )}`;
//     setBarcodeImage(barcodeAPI);
//   };

//   return (
//     <div className="cmain">
//       <nav className="cnav">
//         <h2 className="ctittle">Saved Templates</h2>
//       </nav>
//       <div
//         id="design-container"
//         ref={designContainerRef}
//         dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
//       ></div>
//       <div className="cbtns">
//         {!showEditor && (
//           <div className="fixed-buttons">
//             <button className="csend" onClick={handleSendForReview}>
//               Send for Review
//             </button>
//             <button className="csave" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <div>
//         {!showEditor ? (
//           <button className="cbtntwo" onClick={handleEdit}>
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button onClick={() => setShowEditor(false)}>Done</button>
//             <button onClick={handleSave}>Save</button>
//           </div>
//         )}
//       </div>
//       {showEditor && <div id="gjs"></div>}
//       {showForm && (
//         <div className="form-popup">
//           <form onSubmit={handleFormSubmit}>
//             <h3>Send HTML Code for Review</h3>
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Message:</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             {barcodeImage && (
//               <div className="barcode-container">
//                 <img src={barcodeImage} alt="Barcode" />
//               </div>
//             )}
//             <div className="button-group">
//               <button type="submit">Send</button>
//               <button
//                 type="button"
//                 className="cancel-button"
//                 onClick={() => setShowForm(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChildComponent;

// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import domToImage from "dom-to-image";
// import "./childcomponent.css";

// const ChildComponent = ({ htmlCode }) => {
//   const [editor, setEditor] = useState(null);
//   const [showEditor, setShowEditor] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
//   const designContainerRef = useRef(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         storageManager: false,
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   useEffect(() => {
//     if (editor) {
//       editor.setComponents(updatedHtmlCode);
//     }
//   }, [editor, updatedHtmlCode]);

//   const handleEdit = () => {
//     setShowEditor(true);
//   };

//   const handleSave = () => {
//     const updatedHtmlCode = editor.getHtml();
//     console.log("Updated HTML code:", updatedHtmlCode);
//     setUpdatedHtmlCode(updatedHtmlCode);
//     const blob = new Blob([updatedHtmlCode], { type: "text/html" });
//     saveAs(blob, "design.html");
//   };

//   const handleSendForReview = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     domToImage
//       .toBlob(designContainerRef.current)
//       .then(function (blob) {
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("message", message);
//         formData.append("image", blob, "design.png");

//         // Send the formData to the server or handle the submission as needed
//         // Example: axios.post("/send-email", formData);

//         console.log("Form data:", formData);

//         // Reset the form fields
//         setName("");
//         setEmail("");
//         setMessage("");

//         setShowForm(false); // Close the form popup
//       })
//       .catch(function (error) {
//         console.error("Error capturing the image:", error);
//       });
//   };

//   return (
//     <div className="cmain">
//       <nav className="cnav">
//         <h2 className="ctittle">Saved Templates</h2>
//       </nav>
//       <div
//         id="design-container"
//         ref={designContainerRef}
//         dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
//       ></div>
//       <div className="cbtns">
//         {!showEditor && (
//           <div className="fixed-buttons">
//             <button className="csend" onClick={handleSendForReview}>
//               Send for Review
//             </button>
//             <button className="csave" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <div>
//         {!showEditor ? (
//           <button className="cbtntwo" onClick={handleEdit}>
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button onClick={() => setShowEditor(false)}>Done</button>
//             <button onClick={handleSave}>Save</button>
//           </div>
//         )}
//       </div>
//       {showEditor && <div id="gjs"></div>}
//       {showForm && (
//         <div className="form-popup">
//           <form onSubmit={handleFormSubmit}>
//             <h3>Send HTML Code for Review</h3>
//             <label>Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Message:</label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             <button type="submit">Send</button>
//             <button type="button" onClick={() => setShowForm(false)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChildComponent;

// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import "./childcomponent.css";

// const ChildComponent = ({ htmlCode }) => {
//   const [editor, setEditor] = useState(null);
//   const [showEditor, setShowEditor] = useState(false);
//   const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
//   const designContainerRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         storageManager: false,
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   useEffect(() => {
//     if (editor) {
//       editor.setComponents(updatedHtmlCode);
//     }
//   }, [editor, updatedHtmlCode]);

//   const handleEdit = () => {
//     setShowEditor(true);
//   };

//   const handleSave = () => {
//     const updatedHtmlCode = editor.getHtml();
//     console.log("Updated HTML code:", updatedHtmlCode);
//     setUpdatedHtmlCode(updatedHtmlCode);
//     const blob = new Blob([updatedHtmlCode], { type: "text/html" });
//     saveAs(blob, "design.html");
//   };

//   const handleSendForReview = () => {
//     // Implement the logic to send the design for review
//     alert("Sending design for review...");
//   };

//   return (
//     <div className="cmain">
//       <nav className="cnav">
//         <h2 className="ctittle">Saved Templates</h2>
//       </nav>
//       <div
//         id="design-container"
//         ref={designContainerRef}
//         dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
//       ></div>
//       <div className="cbtns">
//         {!showEditor && (
//           <div className="fixed-buttons">
//             <button className="csend" onClick={handleSendForReview}>
//               Send for Review
//             </button>
//             <button className="csave" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <div>
//         {!showEditor ? (
//           <button className="cbtntwo" onClick={handleEdit}>
//             Edit
//           </button>
//         ) : (
//           <div>
//             <button onClick={() => setShowEditor(false)}>Done</button>
//             <button onClick={handleSave}>Save</button>
//           </div>
//         )}
//       </div>
//       {showEditor && <div id="gjs"></div>}
//     </div>
//   );
// };

// export default ChildComponent;
