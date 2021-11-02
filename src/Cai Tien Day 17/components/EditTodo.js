import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import ListService from "../services/ListService";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import allList from "../redux/allList";

const EditTodo = () => {
  const { id } = useParams();

  const todos = useSelector((state) => state.todo.listData);
  const editTodo = todos.filter((t) => t.id === id)[0];

  const [todo, setTodo] = useState(editTodo);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isSuccess = useSelector((state) => state.todo.isSuccess);
  const errorMessage = useSelector((state) => state.todo.errorMessage);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeValue = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  function excuteAfterDispatch(isSuccessNewest, errorMessageNewest) {
    if (isSuccessNewest) {
      history.push("/all-todo");
    } else {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(errorMessageNewest, { variant });
    }
  }

  const onEditTodo = async () => {
    dispatch(ListService.editItem(allList.TODO, todo, excuteAfterDispatch));
  };

  const ComponentLoading = <CircularProgress />;
  const ComponentEditTodo = (
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
            value={todo.value}
            id="value"
            label="Value"
            name="value"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            onChange={onChangeValue}
            fullWidth
            id="status"
            value={todo.status}
            label="Status"
            name="status"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={onEditTodo}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
  return !isLoading ? ComponentEditTodo : ComponentLoading;
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <EditTodo />
    </SnackbarProvider>
  );
}
