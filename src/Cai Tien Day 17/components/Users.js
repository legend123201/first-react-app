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
    { field: "name", headerName: "Name", width: 150 },
    { field: "username", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
];

const Users = () => {
    const users = useSelector((state) => state.user.listData);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isSuccess = useSelector((state) => state.user.isSuccess);
    const errorMessage = useSelector((state) => state.user.errorMessage);
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const history = useHistory();

    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        fetchAllUser();
    }, []);

    function excuteAfterDispatch(globalStateNewest) {
        if (globalStateNewest.todo.isSuccess) {
        } else {
            const variant = "error";
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(globalStateNewest.todo.errorMessage, { variant });
        }
    }

    const fetchAllUser = () => {
        dispatch(ListService.getAllItem(allList.USER, excuteAfterDispatch));
    };

    const onDeleteUser = () => {
        //có set time out vì có lỗi nếu ko dùng, xem ở day 17 sẽ thấy lỗi đó và cách giải thích
        if (selectionModel.length === 1) {
            setTimeout(() => {
                dispatch(ListService.deleteItem(allList.USER, selectionModel[0], excuteAfterDispatch));
            });
        }
    };

    const onEditUser = () => {
        history.push(`/edit-user/${selectionModel[0]}`);
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Stack direction="row" spacing={2} sx={{ pb: 2 }}>
                <Button onClick={onDeleteUser} variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
                <Button onClick={onEditUser} variant="contained" endIcon={<SendIcon />}>
                    Edit
                </Button>
            </Stack>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    index
                    checkboxSelection
                    loading={isLoading}
                    rows={users}
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
            <Users />
        </SnackbarProvider>
    );
}
