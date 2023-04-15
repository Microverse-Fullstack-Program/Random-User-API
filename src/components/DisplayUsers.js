import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers } from "../store/user/usersSlice";
import { DataGrid } from '@mui/x-data-grid';

const DisplayUsers = () => {
    const { users, isLoading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, [dispatch]);
    
    if (isLoading) {
        return <p>Please wait it is loading...</p>;
    }

    if (error) {
        return <p>Error: {error} occurred while fetching users</p>;
    }

    if (!users.results) {
        return;
    }
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'title', headerName: 'Title', width: 75 },
      { field: 'firstName', headerName: 'First name', width: 130 },
      { field: 'lastName', headerName: 'Last name', width: 130 },
    ];
  
    const rows = [];
    users.results.map((user, index) => rows.push(
      { id: index + 1,
        title: user.name.title,
        firstName: user.name.first,
        lastName: user.name.last})
      );

    return (
    <>
    <h1>List of Random Users API</h1>
      <div className="table" style={{ height: 550, width: '35%' }}>
        <DataGrid pagination
          rows={rows}
          columns={columns}
          pageSize={200}
          rowsPerPageOptions={[200]}
        />
      </div>
    </>
    );
}

export default DisplayUsers;
