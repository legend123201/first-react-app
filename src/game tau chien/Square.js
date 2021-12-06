//rsc
import React from "react";

const Square = (props) => {
  //props là những gì mà cha của nó trả về (dạng object)
  return (
    <div>
      {props.value} {props.i}
    </div>
  );
};

export default Square;
