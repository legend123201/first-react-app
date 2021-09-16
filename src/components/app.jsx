import React, { Component } from "react";
import Counters from "./counters";
import NavBar from "./navbar";

class App extends React.Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  //thích hợp để khởi tạo giá trị ban đầu, như là state object nhận giá trị từ props, trong này ko dùng hàm setState đc, hàm setState chỉ đc gọi khi dom đã load hết
  constructor(props) {
    super(props);
    console.log("App - constructor(): chạy khi class App được khởi tạo!");
    //console.log(this.props);
  }

  //thích hợp call ajax lấy data từ server, bỏ vào đâu đó như biến state chẳng hạn
  componentDidMount() {
    console.log(
      "App - componentDidMount(): chạy khi các element đã được render()!"
    );
  }

  render() {
    console.log("App - render()");

    return (
      <>
        <NavBar
          totalCounters={
            this.state.counters.filter((data) => data.value > 0).length
          }
        ></NavBar>
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
          ></Counters>
        </main>
      </>
    );
  }

  handleDelete = (id) => {
    let newCounters = this.state.counters.filter((data) => data.id !== id);
    this.setState({ counters: newCounters });
  };

  handleIncrement = (counter) => {
    let newCounters = [...this.state.counters];
    let index = newCounters.indexOf(counter);
    newCounters[index] = { ...counter };
    newCounters[index].value++;
    this.setState({ counters: newCounters });
  };

  handleReset = () => {
    let newCounters = this.state.counters.map((data) => {
      data.value = 0;
      return data;
    });
    this.setState({ counters: newCounters });
  };
}

export default App;
