import React, { Component } from "react";
import ReactDOM from "react-dom";
import Counter from "./counter";

class Counters extends React.Component {
  render() {
    console.log("Counters - render()");

    //khai báo biến như này để code ko phải thêm quá nhiều dòng "this.props.something", bên navbar và counter ko dùng cách này để có sự so sánh xem cách nào hay hơn
    const { onReset, counters, onDelete, onIncrement } = this.props;

    return (
      <div>
        <button onClick={onReset} className="btn btn-primary m-2">
          Reset
        </button>
        {counters.map((data) => (
          <Counter
            key={data.id}
            counter={data}
            onDelete={onDelete}
            onIncrement={onIncrement}
          >
            <h4>Counter #{data.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
