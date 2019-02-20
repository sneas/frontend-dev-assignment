import React from "react";
import ReactDOM from "react-dom";
import Search from "./SearchInput";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Search />, div);
});
