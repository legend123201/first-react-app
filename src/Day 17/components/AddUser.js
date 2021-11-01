import React from "react";
import { TextField, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../redux/action";
import { useHistory } from "react-router";
import UserService from "../services/UserService";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";

const AddUser = () => {
  const initialUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialUser);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  function excuteAfterDispatch(isSuccessNewest, errorMessageNewest) {
    if (isSuccessNewest) {
      history.push("/");
    } else {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(errorMessageNewest, { variant });
    }
  }

  const onAddUser = () => {
    dispatch(UserService.postUser(user, excuteAfterDispatch));

    //đây là những dòng code hồi xưa, chỉ để note rằng khi push về trang chủ thì hàm useEffect lại đc gọi chạy lại
    //ko cần dispatch luôn vì bên /user nó có useEffect trong đó có hàm fetchAll ()
    // dispatch({
    //   type: ACTIONS.ADD_USER,
    //   payload: res.data,
    // });
  };

  const ComponentLoading = <CircularProgress />;

  const ComponentAddUser = (
    <Paper component="main" sx={{ flexGrow: 1, p: 6 }}>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="name"
            label="Name"
            name="name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="username"
            label="User Name"
            name="username"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="email"
            label="Email"
            name="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={onAddUser}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
  return !isLoading ? ComponentAddUser : ComponentLoading;
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddUser />
    </SnackbarProvider>
  );
}
