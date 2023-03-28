import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./TestList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllTests,
  deleteTests
} from "../../actions//testAction";

import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";


const TestList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, tests } = useSelector((state) => state.producttests);
  
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.test
  );

  const deletetestHandler = (id) => {
    dispatch(deleteTests(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
    }

    dispatch(getAllTests());
  }, [dispatch, alert, error, history,deleteError,isDeleted]);

  const columns = [
    { field: "id", headerName: "Request ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      type:"text",
      minWidth: 250,
      flex: 0.3,
    },
    {
        field: "phoneno",
        headerName: "Phone Number",
        type:"text",
        minWidth: 200,
        flex: 0.3,
      },

    {
      field: "email",
      headerName: "Email Address",
      type: "text",
      minWidth: 250,
      flex: 0.3,
    },
    {
        field: "andharno",
        headerName: "Andhar Card Number",
        type: "text",
        minWidth: 300,
        flex: 0.3,
    },
    {
        field: "carname",
        headerName: "Car Name",
        type: "text",
        minWidth: 270,
        flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() =>
                deletetestHandler(params.getValue(params.id, "id"))
              }>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  tests &&
    tests.forEach((item) => {
      rows.push({
        id:item._id,
        name: item.name,
        phoneno:item.phoneno,
        email:item.email,
        andharno:item.andharno,
        carname:item.carname
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REQUESTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Requests</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default TestList;
