import { Padding } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import MuiTable from "../components/Table.jsx";
import "../maincss/document_management_table.css";
import { document_management_table_data } from "../api/api_calls/apiCalls.js";
import { get_doc_bycategory } from "../api/api_calls/apiCalls.js";
import { useLocation } from "react-router-dom";
import { head } from "lodash";
import CircularIndeterminate from "../components/Loader.jsx";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../Animations/NoUser2.json";
import Button from "../components/button/Button.jsx";

const params = new URLSearchParams(window.location.search);

const heading = params.get("heading");
const id = params.get("id");

const DocumentManagementTable = () => {
  // headerData, rowData
  const [headerData, setHeaderData] = useState();
  const [rowData, setRowData] = useState();
  const [loader, setLoader] = useState(false);
  const [viewers, setViewers] = useState(false);
  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const getTableData = async (id) => {
    setLoader(true);
    try {
      const response = await document_management_table_data(id, search ?? "");
      console.log(response, "usersData");
      console.log("the best solution to life is to be happy");
      const data = response.viewers;
      console.log(data);
      if (data > 0) setViewers(true);
      const head = [...new Set(data.flatMap((obj) => Object.keys(obj)))];
      setRowData(data);
      setHeaderData(head);
    } catch {
      console.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTableData(id);
  }, []);

  console.log(headerData);
  console.log({ rowData });
  return loader ? (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <CircularIndeterminate />
    </Box>
  ) : viewers ? (
    <div className="show-table">
      <MuiTable headerData={headerData} DocTableUserData={rowData} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // width: "60vw",
        // margin: " auto ",
      }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default DocumentManagementTable;
