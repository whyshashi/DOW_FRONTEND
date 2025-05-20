import React, { useEffect, useState } from "react";
import MuiTable from "../components/Table";
import "../maincss/document_management.css";
import Input from "../components/Input";
import "../maincss/user_management.css";
import { Box, Drawer } from "@mui/material";
import Edit from "../components/Edit";
import Docnavbar from "../components/Docnavbar/Docnavbar";
import { UserManagementView } from "../components/View";
import {
  user_management_staff,
  user_management_view,
} from "../api/api_calls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { counterSliceActions } from "../redux/features/counter/CounterSlice";
import CircularIndeterminate from "../components/Loader";
import animationData from "../Animations/NoUser2.json";
import Lottie from "lottie-react";
import Snackbar from "@mui/material/Snackbar";
import { useLocation } from "react-router-dom";
import CustomDowLoader from "../components/CustomDowLoader";

const UserManagement = ({ calculatePages }) => {
  const [view, setView] = useState("");
  const [snackbar, setSnackBar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [saveLoader, setSaveLoader] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewUserData, setViewUserData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [imageUrl, setImageUrl] = useState([]);
  const [loader, setLoader] = useState({
    userViewLoader: false,
    userTableLoader: false,
  });
  const [formError, setFormError] = useState(false);
  const [isData, setIsData] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const searchData = useSelector(
    (state) => state.documents?.userManagementSearchData || []
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const newPageNumber = searchParams.get("page");
  const inputText = searchParams.get("search");

  const getStaffData = async () => {
    setLoader((prev) => ({ ...prev, userTableLoader: true }));
    try {
      const data = await user_management_staff(
        newPageNumber ?? 1,
        inputText ?? ""
      );
      const { allUser, totalPages } = data;
      dispatch(counterSliceActions.storeTotalCount(totalPages));
      const urls = allUser.map((user) => user.imageUrl); // Extract all image URLs
      setImageUrl(urls);

      if (allUser && allUser.length > 0) {
        setIsData(true);
        setHeaderData(Object.keys(allUser[0] || {}));
        dispatch(
          counterSliceActions.storeUserManagementSearchData(
            Object.values(allUser)
          )
        );
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoader((prev) => ({ ...prev, userTableLoader: false }));
    }
  };

  useEffect(() => {
    getStaffData();
  }, [newPageNumber, inputText]);

  useEffect(() => {
    const viewUser = async () => {
      setLoader((prev) => ({ ...prev, userViewLoader: true }));
      if (view && editId) {
        try {
          const data = await user_management_view(editId);
          setViewUserData(data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoader((prev) => ({ ...prev, userViewLoader: false }));
        }
      }
    };
    viewUser();
  }, [view, editId]);

  const handleView = (userId) => {
    if (editId !== userId || view !== "VIEW") {
      setEditId(userId);
      setView("VIEW");
    }
  };

  const handleEdit = (userId) => {
    if (editId !== userId || view !== "EDIT") {
      setEditId(userId);
      setView("EDIT");
    }
  };

  return (
    <div>
      <div className="user-management-all-content">
        {loader?.userTableLoader ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <CircularIndeterminate />
          </Box>
        ) : isData ? (
          <MuiTable
            headerData={headerData}
            handleView={handleView}
            handleEdit={handleEdit}
          />
        ) : (
          !loader?.userTableLoader &&
          isData !== null && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: " auto ",
              }}
            >
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: "60%" }}
              />
            </div>
          )
        )}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbar || formError}
          onClose={() => {
            setSnackBar(false);
            setFormError(false);
          }}
          message={
            formError ? "Please check validation" : "Edited Successfully"
          }
          autoHideDuration={3000}
        />

        <Drawer
          anchor="right"
          open={view || edit}
          onClose={() => {
            setView("");
            setEdit("");
          }}
          transitionDuration={500}
          sx={{
            "& .MuiDrawer-paper": { width: "40vw", height: "100vh" },
          }}
        >
          {view === "VIEW" && (
            <UserManagementView
              handleClose={() => setView("")}
              footerbtn="Edit User Details"
              viewUserData={viewUserData}
              unique="view"
              inputValues={inputValues}
              setInputValues={setInputValues}
              setEdit={setEdit}
              loader={loader?.userViewLoader}
              edit={edit}
              setView={setView}
              view={view}
              editId={editId}
            />
          )}
          {view === "EDIT" && (
            <UserManagementView
              handleClose={() => setView("")}
              footerbtn="Save"
              unique="edit"
              editUserData={viewUserData}
              editId={editId}
              setEditId={setEditId}
              editedData={editedData}
              setEditedData={setEditedData}
              inputValues={inputValues}
              getStaffData={getStaffData}
              loader={loader?.userViewLoader}
              setInputValues={setInputValues}
              setEdit={setEdit}
              edit={edit}
              view={view}
              setView={setView}
              saveLoader={saveLoader}
              setSaveLoader={setSaveLoader}
              snackbar={snackbar}
              setSnackBar={setSnackBar}
              errors={errors}
              setErrors={setErrors}
              initialImage={imageUrl}
              formError={formError}
              setFormError={setFormError}
            />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default UserManagement;
