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

    function excuteAfterGetAllItem(globalStateNewest) {
        if (!globalStateNewest.user.isSuccess) {
            const variant = "error";
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(globalStateNewest.user.errorMessage, { variant });
        }
    }

    function excuteAfterDeleteItem(globalStateNewest) {
        if (globalStateNewest.user.isSuccess) {
            setTimeout(() => {
                dispatch(ListService.getAllItem(allList.USER, excuteAfterGetAllItem));
            });
            const variant = "success";
            // variant could be success, error, warning, info, or default
            enqueueSnackbar("Delete success", { variant });
        } else {
            const variant = "error";
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(globalStateNewest.user.errorMessage, { variant });
        }
    }

    useEffect(() => {
        // li??n quan t???i data grid ph???i c?? set time out
        //c?? set time out v?? c?? l???i n???u ko d??ng, xem ??? day 17 s??? th???y l???i ???? v?? c??ch gi???i th??ch
        setTimeout(() => {
            dispatch(ListService.getAllItem(allList.USER, excuteAfterGetAllItem));
        });
    }, []);

    const onDeleteUser = () => {
        //c?? set time out v?? c?? l???i n???u ko d??ng, xem ??? day 17 s??? th???y l???i ???? v?? c??ch gi???i th??ch
        if (selectionModel.length === 1) {
            setTimeout(() => {
                dispatch(ListService.deleteItem(allList.USER, selectionModel[0], excuteAfterDeleteItem));
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
