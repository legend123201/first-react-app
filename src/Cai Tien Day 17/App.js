import { Route, Switch } from "react-router";
import "./App.css";
import AddUser from "./components/AddUser";
import AddTodo from "./components/AddTodo";
import Users from "./components/Users";
import Todos from "./components/Todos";
import EditUser from "./components/EditUser";
import EditTodo from "./components/EditTodo";
import Box from "@mui/material/Box";
import SideBar from "./common-components/SideBar";
import NotFoundCom from "./common-components/NotFoundCom";
import useToken from "./customHook/useToken";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 12 }}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/all-user" component={Users}></Route>
          <Route path="/add-user" component={AddUser}></Route>
          <Route path="/edit-user/:id" component={EditUser}></Route>
          <Route path="/all-todo" component={Todos}></Route>
          <Route path="/add-todo" component={AddTodo}></Route>
          <Route path="/edit-todo/:id" component={EditTodo}></Route>
          <Route path="/login" component={SignIn}></Route>
          <Route component={NotFoundCom}></Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
