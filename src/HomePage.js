import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/app">
        <button className="button-3">Create Label Button</button>
      </Link>
      <Link to="/labels">
        <button>All label</button>
      </Link>
      <Link to="/allcards">
        <button>All Cards</button>
      </Link>
    </div>
  );
};

export default HomePage;
