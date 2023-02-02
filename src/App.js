import React from "react";
import "./App.css";
import Credentials from "./components/credentials";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="sub-container">
          <Credentials />
        </div>
      </div>
    </>
  );
};

export default App;
