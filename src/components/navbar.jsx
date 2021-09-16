import React, { Component } from "react";

//đây là stateless function, nó là 1 cách làm khác của class, ý nghĩa y chang
//nhưng nó ko có các biến state, life cycle, props,...gì cả.
//nghe nói phiên bản react hooks mới thì có.
const NavBar = (props) => {
  console.log("NavBar - render()");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Total
        <span className="badge badge-pill badge-secondary m-2">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;

// class NavBar extends React.Component {
//   render() {
//     return (
//       <nav className="navbar navbar-light bg-light">
//         <a className="navbar-brand" href="#">
//           Total
//           <span className="badge badge-pill badge-secondary m-2">
//             {this.props.totalCounters}
//           </span>
//         </a>
//       </nav>
//     );
//   }
// }

// export default NavBar;
