import React from "react"; //import object React từ module react, module này trong nodejs
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import LearnCounter from "./components/learnCounters";
import App from "./components/app";

/*
const element = <h1>Hello World12345!</h1>;
console.log(element);
reactDom.render(element, document.getElementById("root"));
*/

//reactDom.render(<LearnCounter />, document.getElementById("root"));
reactDom.render(<App />, document.getElementById("root"));
