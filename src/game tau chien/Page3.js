import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Page3 = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };
  return (
    <div>
      <h1>Page 3</h1>
      <button onClick={handleClick}>Click</button>
      <Link to="/">Link to page1</Link>
    </div>
  );
};

export default Page3;
