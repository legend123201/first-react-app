import React, { Component } from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  //thích hợp để gọi ajax call để update data
  componentDidUpdate(prevProps, prevState) {
    console.log(
      "Counter - componentDidUpdate(): chạy khi state hoặc props của nó có sự thay đổi, chạy sau khi render() lại xong xuôi!"
    );

    console.log("prevProps: ", prevProps);
    console.log("prevState: ", prevState);

    if (prevProps.counter.value !== this.props.counter.value) {
      //ajax call to the server
    }
  }

  //thích hợp để xóa những biến như timer hay counter gì đó đi cùng nó trc khi xóa nó nếu ko sẽ làm memory leak
  componentWillUnmount() {
    console.log(
      "Counter - componentWillUnmount(): chạy khi component chỉ định bị xóa, chạy sau khi render() lại xong xuôi!"
    );
  }

  render() {
    //console.log("props", this.props);
    console.log("Counter - render()");
    return (
      <div>
        {this.props.children}
        <span className="badge badge-primary m-2">
          {this.props.counter.value}
        </span>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Counter;
