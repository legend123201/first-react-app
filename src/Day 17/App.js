import { Route, Switch } from "react-router";
import "./App.css";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import EditUser from "./components/EditUser";
import Box from "@mui/material/Box";
import SideBar from "./common-components/SideBar";
import NotFoundCom from "./common-components/NotFoundCom";
import useToken from "./customHook/useToken";
import SignIn from "./components/SignIn";

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
          <Route exact path="/" component={Users}></Route>
          <Route path="/add-user" component={AddUser}></Route>
          <Route path="/edit-user/:id" component={EditUser}></Route>
          <Route path="/login" component={SignIn}></Route>
          <Route component={NotFoundCom}></Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default App;
