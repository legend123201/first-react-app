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
import ACTIONS from "../redux/action";
import { useHistory } from "react-router";
import UserService from "../services/UserService";
import { SnackbarProvider, useSnackbar } from "notistack";

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
  const users = useSelector((state) => state.user.userList);
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

  /*
  //Hồi xưa mình ko dùng hàm callBack, mà mình dùng useEffect để load lỗi mỗi lần render, nhưng nó có 1 cái lỗi như thế này, là trong User service thì 1 lệnh api bất kì lúc nào cũng có 2 dispatch, 2 dispatch đó đều thay đổi global state
  //thế là useEffect chạy 2 lần, nó xuất ra 2 thông báo lỗi trong khi mình chỉ cần 1 là đủ
  //có 2 cách sửa, 1 là dùng hàm callback, 2 là vẫn xài useEffect này, nhưng cái dispatch đầu tiên phải set isSuccess là cái gì đó như null, "unknow",...và sau đó để điều kiện trong useEffect này là if(isSuccess === true) thì nó mới ko xuất ra 2 dòng lỗi, nhưng useEffect vẫn chạy 2 lần (đúng rồi tại có state thay đổi 2 lần mà)
  //mình đã test thử trường hợp và thấy là nếu global state diff trong redux nó ghi state equal thì useEffect ko chạy lại
  //=> state thay đổi thì useEffect chạy lại, vì state (state này có thể là state của mình, hoặc là global state có sử dụng trong này với useSelector, vậy thì mình đã dùng global state làm local state cho mình) thay đổi đồng nghĩa là render lại, mà render lại thì nếu useEffect ko có dependency thì nó sẽ chạy lại  
  useEffect(() => {
    console.log("run!");
    if (!isSuccess) {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(errorMessage, { variant });
    }
  }); //ko để isSuccess trong dependency, bởi vì nếu mình bấm xóa lỗi lần đầu thì báo lỗi, mấy lần xóa sau nó ko báo lỗi bởi vì "nó vẫn là false"
  */

  function excuteAfterDispatch(isSuccessNewest, errorMessageNewest) {
    if (isSuccessNewest) {
    } else {
      const variant = "error";
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(errorMessageNewest, { variant });
    }
  }

  const fetchAllUser = () => {
    dispatch(UserService.getAllUser(excuteAfterDispatch));
  };

  const onDeleteUser = () => {
    //có set time out vì có lỗi nếu ko dùng, xem ở day 17 sẽ thấy lỗi đó và cách giải thích
    if (selectionModel.length === 1) {
      setTimeout(() => {
        dispatch(
          UserService.deleteUser(selectionModel[0], excuteAfterDispatch)
        );
      });
    }
  };

  const onEditUser = () => {
    history.push(`/edit-user/${selectionModel[0]}`);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      <Stack direction="row" spacing={2} sx={{ pb: 2 }}>
        <Button
          onClick={onDeleteUser}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
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
