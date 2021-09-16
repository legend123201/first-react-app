import React, { Component } from "react";
import reactDom from "react-dom";

class LearnCounter extends React.Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"],
  };

  styles = {
    fontSize: 28,
    fontWeight: "bold",
  };

  constructor() {
    super();
    this.handleIncrementFixed1 = this.handleIncrementFixed1.bind(this);
  }

  render() {
    return (
      <>
        <div>
          <p>Badge với style import bằng biến và className trực tiếp</p>
          <span style={this.styles} className="badge badge-primary m-2">
            {this.formatCount()}
          </span>
        </div>

        <div>
          <p>Badge với style ghi trực tiếp và className bằng hàm</p>
          <span
            style={{ fontSize: 28, fontWeight: "bold" }}
            className={this.spanClasses(99)}
          >
            {this.formatCount()}
          </span>
        </div>

        <div>
          <p>Xuất ra 1 danh sách</p>
          <ul>
            {this.state.tags.map((data) => (
              <li key={data}>{data}</li>
            ))}
          </ul>
        </div>

        <div>
          <p>
            Để thế này hàm onclick sẽ tự chạy 1 lần khi render lần đầu và ko
            chạy những lần sau luôn, và khi setState thì hàm này cũng chạy, vậy
            là nó chạy cùng hàm render() này luôn @@
          </p>
          <button
            onClick={this.handleIncrement()}
            className="btn btn-secondary"
          >
            Increment
          </button>
        </div>

        <div>
          <p>
            Trong khi để tên hàm ko có ngoặc tròn thì đc, khi render lần đầu
            cũng ko tự ý chạy 1 lần
          </p>
          <button onClick={this.handleIncrement} className="btn btn-secondary">
            Increment
          </button>
        </div>

        <div>
          <p>Gọi hàm này sẽ bị lỗi, chi tiết bấm vào hàm</p>
          <button
            onClick={this.handleIncrementError}
            className="btn btn-secondary"
          >
            Increment
          </button>
        </div>

        <div>{this.renderTags()}</div>

        <div>
          <p>Gọi hàm này sẽ ko bị lỗi, đã đc bind</p>
          <button
            onClick={this.handleIncrementFixed1}
            className="btn btn-secondary"
          >
            Increment
          </button>
        </div>

        <div>
          <p>
            Gọi hàm này sẽ ko bị lỗi, vì nó là arrow function, ko cần bind gì cả
          </p>
          <button
            onClick={this.handleIncrementFixed2}
            className="btn btn-secondary"
          >
            Increment
          </button>
        </div>

        <div>
          <p>Gọi hàm có params</p>
          <button
            onClick={() => {
              this.handleIncrementWithParams(5, 10);
            }}
            className="btn btn-secondary"
          >
            Increment
          </button>
        </div>
      </>
    );
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h6>Zero</h6> : count;
  }

  spanClasses(a) {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    console.log("I am running again!", a);
    return classes;
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {this.state.tags.map((data) => (
          <li key={data}>{data}</li>
        ))}
      </ul>
    );
  }

  handleIncrement() {
    console.log("Increment Clicked!");
  }

  handleIncrementError() {
    //hàm khai báo như thế này thì ko nhận đc biến state, cũng như các biến khác
    console.log("Increment Clicked!", this.state.count);
  }

  handleIncrementFixed1() {
    //hàm này ko lỗi bởi vì nó đã đc bind trong constructor
    console.log("Increment Clicked!", this.state.count);
  }

  handleIncrementFixed2 = () => {
    //hàm này ko lỗi bởi vì nó là arrow function
    console.log("Increment Clicked!", this.state.count);
    this.setState({ count: this.state.count + 1 });
  };

  handleIncrementWithParams = (x, y) => {
    console.log("Output x, y: ", x, y);
  };
}

export default LearnCounter;
