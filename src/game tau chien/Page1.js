import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Page1 = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/page2");
  };
  return (
    <div>
      <h1>Page 1</h1>
      <button onClick={handleClick}>Click</button>
      <Link to="/page2">Link to page2</Link>
    </div>
  );
};

export default Page1;
