import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Page2 = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/page3");
  };

  return (
    <div>
      <h1>Page 2</h1>
      <button onClick={handleClick}>Click</button>
      <Link to="/page3">Link to page3</Link>
    </div>
  );
};

export default Page2;
