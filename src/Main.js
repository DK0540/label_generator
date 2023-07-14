import React, { useState, useRef, useEffect } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-preset-newsletter";
import { saveAs } from "file-saver";
import ChildComponent from "./ChildComponent";
import Popup from "./Popup";
import "./main.css";

const Main = () => {
  const [editor, setEditor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [htmlCode, setHtmlCode] = useState(""); // New state for HTML code
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  const editorRef = useRef(null);

  useEffect(() => {
    const initEditor = () => {
      const editor = grapesjs.init({
        container: editorRef.current,
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {
            /* options */
          },
        },
      });

      editor.Commands.add("my-command", {
        run: (editor, sender) => {
          sender && sender.set("active", 0);
          setShowPopup(true);
        },
      });

      editor.Panels.addButton("options", {
        id: "my-button",
        className: "my-button-class",
        label: "My Button",
        command: "my-command",
        attributes: {
          title: "Click me",
        },
      });

      setEditor(editor);
    };

    initEditor();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDownload = () => {
    const code = editor.getHtml();
    console.log(code);
    setHtmlCode(code); // Update the htmlCode state

    const blob = new Blob([code], { type: "text/html" });
    saveAs(blob, "generated_code.html");
  };

  const handleSave = () => {
    const updatedHtmlCode = editor.getHtml();
    setHtmlCode(updatedHtmlCode); // Update the htmlCode state
    setIsEditing(false); // Disable editing mode
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  return (
    <div className="App">
      <header className="mheader">
        <nav className="mmain">
          <button className="mback">Back</button>
        </nav>
        {!isEditing && (
          <button className="medit" onClick={handleEdit}>
            Edit
          </button>
        )}
        {isEditing && (
          <button className="msave" onClick={handleSave}>
            Save
          </button>
        )}
        <button className="mdownload" onClick={handleDownload}>
          Save
        </button>
      </header>
      <div ref={editorRef} id="gjs"></div>
      {showPopup && <Popup onClose={handleClosePopup} />}
      {htmlCode && (
        <ChildComponent
          htmlCode={htmlCode}
          setHtmlCode={setHtmlCode}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Main;

// import React, { useState, useRef, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import ChildComponent from "./ChildComponent";
// import Popup from "./Popup";

// const Main = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [htmlCode, setHtmlCode] = useState(""); // New state for HTML code
//   const [isEditing, setIsEditing] = useState(false); // New state for editing mode

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     console.log(code);
//     setHtmlCode(code); // Update the htmlCode state

//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");
//   };

//   const handleSave = () => {
//     const updatedHtmlCode = editor.getHtml();
//     setHtmlCode(updatedHtmlCode); // Update the htmlCode state
//     setIsEditing(false); // Disable editing mode
//   };

//   const handleEdit = () => {
//     setIsEditing(true); // Enable editing mode
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <button>Back</button>
//         </nav>
//         {!isEditing && <button onClick={handleEdit}>Edit</button>}
//         {isEditing && <button onClick={handleSave}>Save</button>}
//         <button onClick={handleDownload}>Download HTML</button>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//       {htmlCode && (
//         <ChildComponent
//           htmlCode={htmlCode}
//           setHtmlCode={setHtmlCode}
//           isEditing={isEditing}
//         />
//       )}
//     </div>
//   );
// };

// export default Main;

// import React, { useState, useRef, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";
// import ChildComponent from "./ChildComponent";
// import Popup from "./Popup";

// const Main = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [htmlCode, setHtmlCode] = useState(""); // New state for HTML code

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     console.log(code);
//     setHtmlCode(code); // Update the htmlCode state

//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <button>Back</button>
//         </nav>
//         <button onClick={handleDownload}>Download HTML</button>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//       {htmlCode && (
//         <ChildComponent htmlCode={htmlCode} setHtmlCode={setHtmlCode} />
//       )}
//     </div>
//   );
// };

// export default Main;

//--------------------------------------------------------------------------------->>>>
// import React, { useState, useRef, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import "./styles/main.scss";
// import Popup from "./Popup";
// import { Link } from "react-router-dom";
// import ChildComponent from "./ChildComponent";

// const Main = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [htmlCode, setHtmlCode] = useState(""); // New state for HTML code

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     console.log(code);
//     setHtmlCode(code); // Update the htmlCode state

//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <Link to="/">
//             <button>Back</button>
//           </Link>
//         </nav>
//         <button onClick={handleDownload}>Download HTML</button>
//         <Link to="/allcards">
//           <button>View Downloaded File</button>
//         </Link>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//       {htmlCode && <ChildComponent htmlCode={htmlCode} />} // Render the child
//       component with the htmlCode prop
//     </div>
//   );
// };

// // const ChildComponent = ({ htmlCode }) => {
// //   useEffect(() => {
// //     const container = document.getElementById("design-container");
// //     container.innerHTML = htmlCode;
// //   }, [htmlCode]);

// //   return (
// //     <div>
// //       <h2>Design:</h2>
// //       <div id="design-container"></div>
// //     </div>
// //   );
// // };

// export default Main;
//----------------------------------------------------------------------------->>>Last code
// import React, { useState, useRef, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import "./styles/main.scss";
// import Popup from "./Popup";
// import { Link } from "react-router-dom";

// const Main = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [code, setCode] = useState(""); // New state for code

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     console.log(code);
//     setCode(code); // Update the code state

//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <Link to="/">
//             <button>Back</button>
//           </Link>
//         </nav>
//         <button onClick={handleDownload}>Download HTML</button>
//         <Link to="/allcards">
//           <button>View Downloaded File</button>
//         </Link>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//       {code && <ChildComponent code={code} />} // Render the child component
//       with the code prop
//     </div>
//   );
// };

// const ChildComponent = ({ code }) => {
//   return (
//     <div>
//       <h2>Code:</h2>
//       <pre>{code}</pre>
//     </div>
//   );
// };

// export default Main;

// import React, { useState, useRef, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import "./styles/main.scss";
// import Popup from "./Popup";
// import { Link } from "react-router-dom";

// const Main = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     console.log(code);
//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <Link to="/">
//             <button>Back</button>
//           </Link>
//         </nav>
//         <button onClick={handleDownload}>Download HTML</button>
//         <Link to="/allcards">
//           <button>View Downloaded File</button>
//         </Link>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default Main;

// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
// import "./styles/main.scss";
// import Popup from "./Popup";
// import DownloadedHTML from "./DownloadedHTML";
// import { Link } from "react-router-dom";
// import DownloadedFileCard from "./DownloadedFileCard";

// const App = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [downloadedHTML, setDownloadedHTML] = useState("");
//   const [showDownloadedHTML, setShowDownloadedHTML] = useState(false);

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0);
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml();
//     const blob = new Blob([code], { type: "text/html" });
//     saveAs(blob, "generated_code.html");

//     setDownloadedHTML(code);
//     setShowDownloadedHTML(true);
//   };

//   return (
//     <div className="App">
//       <header>
//         <nav>
//           <Link to="/">
//             <button>Back</button>
//           </Link>
//         </nav>
//         <button onClick={handleDownload}>Download HTML</button>
//         <Link to="/cardfile">
//           <button>View Downloaded File</button>
//         </Link>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showDownloadedHTML && (
//         // Pass downloadedHTML as a prop to DownloadedFileCard
//         <DownloadedFileCard downloadedHTML={downloadedHTML} />
//       )}
//       {showPopup && <Popup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default App;

//////////////////////---------------------------------------------------------------------->>
// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import html2canvas from "html2canvas";

// import "./styles/main.scss";
// import Popup from "./Popup";
// import { saveAs } from "file-saver";

// const App = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: editorRef.current,
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0); // turn off the button
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleDownload = () => {
//     const code = editor.getHtml(); // Get the HTML code from the editor
//     const blob = new Blob([code], { type: "text/html" }); // Create a Blob with the HTML code
//     saveAs(blob, "generated_code.html"); // Trigger the download of the HTML file
//   };

//   return (
//     <div className="App">
//       <header>
//         <button onClick={handleDownload}>Download HTML</button>
//       </header>
//       <div ref={editorRef} id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default App;
///////////////////////////////////////////////////////////////////////////////////main original code
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";
// import Popup from "./Popup";

// const App = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

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
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0); // turn off the button
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default App;
/////////////////////////////////////////////////////////////main original code
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const Popup = ({ onClose }) => {
//   return (
//     <div className="popup">
//       <h2>This is a Popup</h2>
//       <button onClick={onClose}>Close Popup</button>
//     </div>
//   );
// };

// const App = () => {
//   const [editor, setEditor] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

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
//       });

//       editor.Commands.add("my-command", {
//         run: (editor, sender) => {
//           sender && sender.set("active", 0); // turn off the button
//           setShowPopup(true);
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//       {showPopup && <Popup onClose={handleClosePopup} />}
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const ExternalComponent = ({ onClose }) => {
//   // Handle the functionality of the external component here
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     // ...
//   };

//   return (
//     <div className="external-component">
//       <div className="external-component-content">
//         <h2>External Component</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Add your form inputs and fields here */}
//           <input type="text" name="name" placeholder="Name" />
//           <input type="email" name="email" placeholder="Email" />
//           {/* ... */}
//           <button type="submit">Submit</button>
//         </form>
//         <button className="close-button" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [editor, setEditor] = useState(null);
//   const [showComponent, setShowComponent] = useState(false);

//   const handleButtonClick = () => {
//     setShowComponent(true);
//   };

//   const handleClose = () => {
//     setShowComponent(false);
//   };

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         // ...
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       // Add a button to the navbar
//       editor.Commands.add("my-command", {
//         run: () => {
//           handleButtonClick();
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//       {showComponent && <ExternalComponent onClose={handleClose} />}
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         // ...
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });

//       // Add a button to the navbar
//       editor.Commands.add("my-command", {
//         run: () => {
//           alert("Button clicked!");
//         },
//       });

//       editor.Panels.addButton("options", {
//         id: "my-button",
//         className: "my-button-class",
//         label: "My Button",
//         command: "my-command",
//         attributes: {
//           title: "Click me",
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;
//-------------------------------------------------------------------------------------->>>>>>>>>>End
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         // ...
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         blockManager: {
//           // Define the blocks with your custom button
//           blocks: [
//             {
//               id: "my-block",
//               label: "My Block",
//               category: "Basic",
//               content: `
//                 <div>
//                   <button id="my-button" style="color: red;">Click Me</button>
//                 </div>
//               `,
//             },
//             {
//               id: "my-block11",
//               label: "My Block1",
//               category: "Basic",
//               content: `
//                               <div>
//                                 <button id="my-button1" style="color: red; border-radius:20px">Click Me</button>
//                               </div>
//                             `,
//             },
//             // Other blocks...
//           ],
//         },
//       });

//       editor.on("component:selected", (component) => {
//         if (component.get("id") === "my-button") {
//           // Open the popup component here
//           console.log("Popup component opened");
//         }
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = grapesjs.init({
//         container: "#gjs",
//         // ...
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//         blockManager: {
//           // Define the blocks with your custom button
//           blocks: [
//             {
//               id: "my-block",
//               label: "My Block",
//               category: "Basic",
//               content: `
//                 <div>
//                   <button style="color: red;">Click Me</button>
//                 </div>
//               `,
//             },
//             // Other blocks...
//           ],
//         },
//       });

//       setEditor(editor);
//     };

//     initEditor();
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const editor = grapesjs.init({
//       container: "#gjs",
//       // ...
//       plugins: [plugin],
//       pluginsOpts: {
//         [plugin]: {
//           /* options */
//         },
//       },
//     });
//     setEditor(editor);
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// // import plugin from "grapesjs-preset-webpage";
// // import plugin from "grapesjs-preset-newsletter";
// import grapesJSMJML from "grapesjs-mjml";
// import "grapesjs/dist/css/grapes.min.css";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const editor = grapesjs.init({
//       fromElement: true,
//       container: "#gjs",
//       plugins: [grapesJSMJML],
//       pluginsOpts: {
//         [grapesJSMJML]: {
//           // The font imports are included on HTML <head/> when fonts are used on the template
//           fonts: {
//             Montserrat: "https://fonts.googleapis.com/css?family=Montserrat",
//             "Open Sans": "https://fonts.googleapis.com/css?family=Open+Sans",
//           },
//         },
//       },
//     });

//     // add custom fonts options on editor's font list
//     editor.on("load", () => {
//       const styleManager = editor.StyleManager;
//       const fontProperty = styleManager.getProperty(
//         "typography",
//         "font-family"
//       );

//       const list = [];
//       // empty list
//       fontProperty.set("list", list);

//       // custom list
//       list.push(
//         fontProperty.addOption({
//           value: "Montserrat, sans-serif",
//           name: "Montserrat",
//         })
//       );
//       list.push(
//         fontProperty.addOption({
//           value: "Open Sans, sans-serif",
//           name: "Open Sans",
//         })
//       );
//       fontProperty.set("list", list);

//       styleManager.render();
//     });

//     setEditor(editor);
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// // import plugin from "grapesjs-preset-webpage";
// import plugin from "grapesjs-preset-newsletter";
// import "./styles/main.scss";

// const App = () => {
//   const [editor, setEditor] = useState(null);

//   useEffect(() => {
//     const editor = grapesjs.init({
//       container: "#gjs",
//       // ...
//       plugins: [plugin],
//       pluginsOpts: {
//         [plugin]: {
//           /* options */
//         },
//       },
//       // or
//       // plugins: [
//       //   editor => plugin(editor, { /* options */ }),
//       // ],
//     });
//     setEditor(editor);
//   }, []);

//   return (
//     <div className="App">
//       <div id="gjs"></div>
//     </div>
//   );
// };

// export default App;
