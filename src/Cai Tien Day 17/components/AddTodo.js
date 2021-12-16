import React from "react";
import { TextField, Grid, Paper, Button } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ListService from "../services/ListService";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import allList from "../redux/allList";

const AddTodo = () => {
    const initialTodo = {
        id: "",
        value: "",
        status: "",
    };

    const [todo, setTodo] = useState(initialTodo);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.todo.isLoading);
    const isSuccess = useSelector((state) => state.todo.isSuccess);
    const errorMessage = useSelector((state) => state.todo.errorMessage);
    const { enqueueSnackbar } = useSnackbar();

    const onChangeValue = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };

    const history = useHistory();

    function excuteAfterDispatch(globalStateNewest) {
        if (globalStateNewest.todo.isSuccess) {
            history.push("/all-todo");
        } else {
            const variant = "error";
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(globalStateNewest.todo.errorMessage, { variant });
        }
    }

    const onAddTodo = () => {
        dispatch(ListService.postItem(allList.TODO, todo, excuteAfterDispatch));
    };

    const ComponentLoading = <CircularProgress />;

    const ComponentAddTodo = (
        <Paper component="main" sx={{ flexGrow: 1, p: 6 }}>
            <Grid spacing={3} container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={8}>
                    <TextField onChange={onChangeValue} fullWidth id="value" label="Value" name="value" variant="outlined" />
                </Grid>
                <Grid item xs={8}>
                    <TextField onChange={onChangeValue} fullWidth id="status" label="Status" name="status" variant="outlined" />
                </Grid>

                <Grid item xs={8}>
                    <Button onClick={onAddTodo} variant="contained" endIcon={<SendIcon />}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
    return !isLoading ? ComponentAddTodo : ComponentLoading;
};

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <AddTodo />
        </SnackbarProvider>
    );
}
