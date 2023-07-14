import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-preset-newsletter";
import "./styles/main.scss";

const App = () => {
const [editor, setEditor] = useState(null);

useEffect(() => {
const editor = grapesjs.init({
container: "#gjs",
// ...
plugins: [plugin],
pluginsOpts: {
[plugin]: {
/_ options _/
},
},
});
setEditor(editor);
}, []);

return (

<div className="App">
<div id="gjs"></div>
</div>
);
};

export default App;

//child component
//----------------------------------------------------------------------------->>Okay 2
// import React, { useState, useEffect, useRef } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";

// const ChildComponent = ({ htmlCode }) => {
// const [editor, setEditor] = useState(null);
// const [showEditor, setShowEditor] = useState(false);
// const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);
// const designContainerRef = useRef(null);

// useEffect(() => {
// const initEditor = () => {
// const editor = grapesjs.init({
// container: "#gjs",
// plugins: [plugin],
// pluginsOpts: {
// [plugin]: {
// /_ options _/
// },
// },
// storageManager: false,
// });

// setEditor(editor);
// };

// initEditor();
// }, []);

// useEffect(() => {
// if (editor) {
// editor.setComponents(updatedHtmlCode);
// }
// }, [editor, updatedHtmlCode]);

// const handleEdit = () => {
// setShowEditor(true);
// };

// const handleSave = () => {
// const updatedCode = editor.getHtml();
// setUpdatedHtmlCode(updatedCode);
// setShowEditor(false);
// };

// return (
// <div>
// <h2>Design:</h2>
// {!showEditor ? (
// <div
// id="design-container"
// ref={designContainerRef}
// dangerouslySetInnerHTML={{ __html: updatedHtmlCode }}
// ></div>
// ) : (
// <div id="gjs"></div>
// )}
// <div>
// {!showEditor && <button onClick={handleEdit}>Edit</button>}
// {showEditor && (
// <div>
// <button onClick={handleSave}>Save</button>
// <button onClick={() => setShowEditor(false)}>Cancel</button>
// </div>
// )}
// </div>
// </div>
// );
// };

// export default ChildComponent;
//------------------------------------------------------------------------------->>>>>Okay2
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";

// const ChildComponent = ({ htmlCode, setHtmlCode }) => {
// const [editor, setEditor] = useState(null);
// const [showEditor, setShowEditor] = useState(false);
// const [designSaved, setDesignSaved] = useState(false);
// const [modifiedHtmlCode, setModifiedHtmlCode] = useState(htmlCode); // New state for modified HTML code

// useEffect(() => {
// const initEditor = () => {
// const editor = grapesjs.init({
// container: "#gjs",
// plugins: [plugin],
// pluginsOpts: {
// [plugin]: {
// /_ options _/
// },
// },
// storageManager: false,
// });

// setEditor(editor);
// };

// initEditor();
// }, []);

// useEffect(() => {
// setModifiedHtmlCode(htmlCode); // Update modifiedHtmlCode state whenever htmlCode changes
// }, [htmlCode]);

// const handleEdit = () => {
// editor.setComponents(htmlCode);
// setShowEditor(true);
// };

// const handleSave = () => {
// const updatedHtmlCode = editor.getHtml();
// setHtmlCode(updatedHtmlCode);
// setModifiedHtmlCode(updatedHtmlCode); // Update modifiedHtmlCode with the updated HTML code
// const blob = new Blob([updatedHtmlCode], { type: "text/html" });
// saveAs(blob, "design.html");
// setDesignSaved(true);
// setShowEditor(false);
// };

// const handleSendForReview = () => {
// // Implement the logic to send the design for review
// alert("Sending design for review...");
// };

// return (
// <div style={{ backgroundColor: "#cbbdedcf" }}>
// <h2>Design:</h2>
// <div id="gjs"></div>
// {!showEditor && (
// <div>
// <div
// id="design-container"
// dangerouslySetInnerHTML={{ __html: modifiedHtmlCode }} // Use modifiedHtmlCode to display the modified design
// ></div>
// <button onClick={handleEdit}>Edit</button>
// </div>
// )}
// {showEditor && (
// <div>
// <button onClick={handleSave} disabled={designSaved}>
// {designSaved ? "Saved" : "Save"}
// </button>
// <button onClick={() => setShowEditor(false)}>Cancel</button>
// </div>
// )}
// {designSaved && (
// <div>
// <button onClick={handleSendForReview}>Send for Review</button>
// </div>
// )}
// </div>
// );
// };

// export default ChildComponent;

//code 3 ----Okay ------------------------------------------------------------>>>Okay
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";
// import { saveAs } from "file-saver";

// const ChildComponent = ({ htmlCode }) => {
// const [editor, setEditor] = useState(null);
// const [showEditor, setShowEditor] = useState(false);
// const [designSaved, setDesignSaved] = useState(false);

// useEffect(() => {
// const initEditor = () => {
// const editor = grapesjs.init({
// container: "#gjs",
// plugins: [plugin],
// pluginsOpts: {
// [plugin]: {
// /_ options _/
// },
// },
// storageManager: false,
// });

// setEditor(editor);
// };

// initEditor();
// }, []);

// const handleEdit = () => {
// editor.setComponents(htmlCode);
// setShowEditor(true);
// };

// const handleSave = () => {
// const updatedHtmlCode = editor.getHtml();
// // Handle saving the updated HTML code
// console.log("Updated HTML code:", updatedHtmlCode);
// const blob = new Blob([updatedHtmlCode], { type: "text/html" });
// saveAs(blob, "design.html");
// setDesignSaved(true);
// setShowEditor(false);
// };

// const handleSendForReview = () => {
// // Implement the logic to send the design for review
// alert("Sending design for review...");
// };

// useEffect(() => {
// setDesignSaved(false);
// }, [htmlCode]);

// return (
// <div>
// <h2>Design:</h2>
// <div id="gjs"></div>
// {!showEditor && (
// <div>
// <div
// id="design-container"
// dangerouslySetInnerHTML={{ __html: htmlCode }}
// ></div>
// <button onClick={handleEdit}>Edit</button>
// </div>
// )}
// {showEditor && (
// <div>
// <button onClick={handleSave} disabled={designSaved}>
// {designSaved ? "Saved" : "Save"}
// </button>
// <button onClick={() => setShowEditor(false)}>Cancel</button>
// </div>
// )}
// {designSaved && (
// <div>
// <button onClick={handleSendForReview}>Send for Review</button>
// </div>
// )}
// </div>
// );
// };

// export default ChildComponent;

//Code 1-------------------------------------------------------------------------->>>
// import React, { useState, useEffect } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-preset-newsletter";

// const ChildComponent = ({ htmlCode }) => {
// const [editor, setEditor] = useState(null);
// const [showEditor, setShowEditor] = useState(false);

// useEffect(() => {
// const initEditor = () => {
// const editor = grapesjs.init({
// container: "#gjs",
// plugins: [plugin],
// pluginsOpts: {
// [plugin]: {
// /_ options _/
// },
// },
// storageManager: false,
// });

// setEditor(editor);
// };

// initEditor();
// }, []);

// const handleEdit = () => {
// editor.setComponents(htmlCode);
// setShowEditor(true);
// };

// const handleSave = () => {
// const updatedHtmlCode = editor.getHtml();
// // Handle saving the updated HTML code
// console.log("Updated HTML code:", updatedHtmlCode);
// };

// return (
// <div>
// <h2>Design:</h2>
// <div id="gjs"></div>
// {!showEditor && <button onClick={handleEdit}>Edit</button>}
// {showEditor && (
// <div>
// <button onClick={handleSave}>Save</button>
// <button onClick={() => setShowEditor(false)}>Cancel</button>
// </div>
// )}
// </div>
// );
// };

// export default ChildComponent;

//code1 only html view----------------------------------------------------------------->>>>

// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";

// const ChildComponent = ({ htmlCode }) => {
// const [designSaved, setDesignSaved] = useState(false);

// const handleSave = () => {
// const blob = new Blob([htmlCode], { type: "text/html" });
// saveAs(blob, "design.html");
// setDesignSaved(true);
// };

// const handleSendForReview = () => {
// // Implement the logic to send the design for review
// alert("Sending design for review...");
// };

// useEffect(() => {
// setDesignSaved(false);
// }, [htmlCode]);

// return (
// <div>
// <h2>Design:</h2>
// <div
// id="design-container"
// dangerouslySetInnerHTML={{ __html: htmlCode }}
// ></div>
// <div>
// <button onClick={handleSave} disabled={designSaved}>
// {designSaved ? "Saved" : "Save"}
// </button>
// <button onClick={handleSendForReview}>Send for Review</button>
// </div>
// </div>
// );
// };

// export default ChildComponent;

// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";

// const ChildComponent = ({ htmlCode, onSave }) => {
// const [designSaved, setDesignSaved] = useState(false);
// const [editingMode, setEditingMode] = useState(false);
// const [updatedHtmlCode, setUpdatedHtmlCode] = useState(htmlCode);

// const handleSave = () => {
// onSave(updatedHtmlCode);
// setDesignSaved(true);
// };

// const handleSendForReview = () => {
// // Implement the logic to send the design for review
// console.log("Sending design for review...");
// };

// const handleEdit = () => {
// setEditingMode(true);
// };

// const handleCodeChange = (event) => {
// setUpdatedHtmlCode(event.target.value);
// setDesignSaved(false);
// };

// useEffect(() => {
// setDesignSaved(false);
// setUpdatedHtmlCode(htmlCode);
// }, [htmlCode]);

// return (
// <div>
// <h2>Design:</h2>
// {!editingMode ? (
// <div
// id="design-container"
// dangerouslySetInnerHTML={{ __html: htmlCode }}
// ></div>
// ) : (
// <textarea
// value={updatedHtmlCode}
// onChange={handleCodeChange}
// rows={10}
// cols={50}
// />
// )}
// <div>
// {!editingMode && <button onClick={handleEdit}>Edit</button>}
// {editingMode && (
// <>
// <button onClick={handleSave} disabled={designSaved}>
// {designSaved ? "Saved" : "Save"}
// </button>
// <button onClick={handleSendForReview}>Send for Review</button>
// </>
// )}
// </div>
// </div>
// );
// };

// export default ChildComponent;
