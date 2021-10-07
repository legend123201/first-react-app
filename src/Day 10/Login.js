import { useState } from "react";
import { useHistory } from "react-router";
import userList from "./UserList";

const Login = () => {
  const initUser = {
    userName: "",
    password: "",
    todoList: [],
  };

  const history = useHistory();
  const [user, setUser] = useState(initUser);

  const login = () => {
    let findUser = userList.find((item) => {
      return item.userName === user.userName && item.password === user.password;
    });

    if (findUser) {
      setUser(findUser);
      history.push("/todo");
    } else {
      alert("Thông tin đăng nhập chưa hợp lệ! Vui lòng nhập lại!");
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // <form>
    //   <div className="input-group">
    //     <label>User name:</label>
    //     <input name="userName" onChange={handleInputChange} type="text"></input>
    //   </div>
    //   <div className="input-group">
    //     <label>Password:</label>
    //     <input name="password" onChange={handleInputChange} type="text"></input>
    //   </div>
    //   <button onClick={login}>Submit</button>
    // </form>

    <div className="login-box">
      <h1>Login</h1>
      <div className="textbox">
        <i className="fas fa-user"></i>
        <input
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
        />
      </div>

      <div className="textbox">
        <i className="fas fa-lock"></i>
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
      </div>

      <input onClick={login} type="button" className="btn" value="Sign in" />
    </div>
  );
};
export default Login;
