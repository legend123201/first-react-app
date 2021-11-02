import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import ACTIONS from "../redux/action";
import ListService from "../services/ListService";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import allList from "../redux/allList";

const EditUser = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.user.listData);
  const editUser = users.filter((t) => t.id === id)[0];

  const [user, setUser] = useState(editUser);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  function excuteAfterDispatch(isSuccessNewest, errorMessageNewest) {
    if (isSuccessNewest) {
      history.push("/all-user");
    } else {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(errorMessageNewest, { variant });
    }
  }

  const onEditUser = async () => {
    dispatch(ListService.editItem(allList.USER, user, excuteAfterDispatch));
  };

  const ComponentLoading = <CircularProgress />;
  const ComponentEditUser = (
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
            value={user.name}
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
            value={user.username}
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
            value={user.email}
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
            value={user.phone}
            label="Phone"
            name="phone"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={onEditUser}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
  return !isLoading ? ComponentEditUser : ComponentLoading;
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <EditUser />
    </SnackbarProvider>
  );
}
