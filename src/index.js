import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//_------------------------------------------------------------------>>>>

// import { React, useState } from "react";
// import ReactDOM from "react-dom";
// import "grapesjs/dist/css/grapes.min.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import App from "./App";
// import HomePage from "./HomePage";
// import Labels from "./Labels";

// const Index = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/app" element={<App />} />
//         <Route path="/labels" element={<Labels />} />
//       </Routes>
//     </Router>
//   );
// };

// ReactDOM.render(<Index />, document.getElementById("root"));
//------------------------------------------------------------------------->>>>>
// import React from "react";
// import ReactDOM from "react-dom";
// import "grapesjs/dist/css/grapes.min.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import App from "./App";
// import HomePage from "./HomePage";
// import Labels from "./Labels";
// import DownloadedFileCard from "./DownloadedFileCard";

// const Routing = () => {
//   // Define the downloadedHTML variable here or fetch it from a data source
//   const downloadedHTML = "Your downloaded HTML goes here";

//   const handleDesignData = (designData) => {
//     // Perform actions with the design data
//     console.log("Design data received:", designData);
//     // ... Additional logic here
//   };
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route path="/app" element={<App onDesignData={handleDesignData} />} />
//         <Route path="/labels" element={<Labels />} />
//         <Route
//           path="/cardfile"
//           element={<DownloadedFileCard downloadedFile={downloadedHTML} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// ReactDOM.render(<Routing />, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom";
// import "grapesjs/dist/css/grapes.min.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import App from "./App";
// import HomePage from "./HomePage";
// import Labels from "./Labels";
// import DownloadedFileCard from "./DownloadedFileCard";

// const Routing = () => {
//   // Define the downloadedHTML variable here or fetch it from a data source
//   const downloadedHTML = "Your downloaded HTML goes here";

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route path="/app" element={<App downloadedHTML={downloadedHTML} />} />
//         <Route path="/labels" element={<Labels />} />
//         <Route
//           path="/cardfile"
//           element={<DownloadedFileCard createdDesign={createdDesign} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// ReactDOM.render(<Routing />, document.getElementById("root"));

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "grapesjs/dist/css/grapes.min.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
