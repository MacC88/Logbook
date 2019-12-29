import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, marginTop: 50, clear: "both", textAlign: "center", backgroundColor: "#343a40", color: "white"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
