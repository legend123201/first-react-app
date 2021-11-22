import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ListService from "../services/ListService";
import { SnackbarProvider, useSnackbar } from "notistack";
import allList from "../redux/allList";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: "id", headerName: "Id", width: 150 },
  { field: "value", headerName: "Value", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
];

const Todos = () => {
  const todos = useSelector((state) => state.todo.listData);
  const isLoading = useSelector((state) => state.todo.isLoading);
  const isSuccess = useSelector((state) => state.todo.isSuccess);
  const errorMessage = useSelector((state) => state.todo.errorMessage);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const history = useHistory();

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    // liên quan tới data grid phải có set time out
    //có set time out vì có lỗi nếu ko dùng, xem ở day 17 sẽ thấy lỗi đó và cách giải thích
    setTimeout(() => {
      dispatch(ListService.getAllItem(allList.TODO, excuteAfterDispatch));
    });
  }, []);

  function excuteAfterDispatch(globalStateNewest) {
    if (globalStateNewest.todo.isSuccess) {
    } else {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(globalStateNewest.todo.errorMessage, { variant });
    }
  }

  const onDeleteTodo = () => {
    //có set time out vì có lỗi nếu ko dùng, xem ở day 17 sẽ thấy lỗi đó và cách giải thích
    if (selectionModel.length === 1) {
      setTimeout(() => {
        dispatch(
          ListService.deleteItem(
            allList.TODO,
            selectionModel[0],
            excuteAfterDispatch
          )
        );
      });
    }
  };

  const onEditTodo = () => {
    history.push(`/edit-todo/${selectionModel[0]}`);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      <Stack direction="row" spacing={2} sx={{ pb: 2 }}>
        <Button
          onClick={onDeleteTodo}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button onClick={onEditTodo} variant="contained" endIcon={<SendIcon />}>
          Edit
        </Button>
      </Stack>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          index
          checkboxSelection
          loading={isLoading}
          rows={todos}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>
    </Box>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Todos />
    </SnackbarProvider>
  );
}
