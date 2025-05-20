import { Drawer } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CreateDoc from "..//components/Create-Doc/CreateDoc";
import CreateTraining from "..//components/CreateTraining/CreateTraining";
import "../maincss/layout.css";
import { useLocation, useNavigate } from "react-router-dom";
import ManageCategories from "../components/ManageCategories/ManageCategories";
import DocPreview from "../components/DocPreview/DocPreview";
import CreateQues from "../components/CreateQues/CreateQues";
import Navbar from "../components/navbar/Navbar";
// // import Navbar from "../components/navbar/Navbar.jsx";
import QuestionPreview from "../components/QuestionPreview/QuestionPreview";
import SafetyTrainnigCategories from "../components/SafetyTrainningCategories/SafetyTrainnigCategories";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { counterSliceActions } from "../redux/features/counter/CounterSlice";
const MainLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openques, setOpenques] = useState(false);
  const [manageopen, setmanageopen] = useState(false);
  const [openPreview, setopenPreview] = useState(false);
  const [openquesPreview, setopenquesPreview] = useState(false);

  const pagesCount = useSelector((state) => state?.documents?.pageTotalCount);
  const dispatch = useDispatch();
  const handleClickOpenDrawer = () => {
    dispatch(counterSliceActions.storeDocumentPreviewData([])); //saved preview should be empty in doc
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(counterSliceActions.storeDocPrevData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
    //  dispatch(counterSliceActions.storeDocumentPreviewData([]));
    setOpen(false);
  };
  const handleClickOpenManage = () => {
    setmanageopen(true);
  };

  const handleCloseManage = () => {
    setmanageopen(false);
  };
  const handleOpenPreview = () => {
    setopenPreview(true);
  };
  const handleClosePreview = () => {
    //  dispatch(counterSliceActions.storeDocPrevData({}));
    //  dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    setopenPreview(false);
  };
  const handleCloseQues = () => {
    // dispatch(counterSliceActions.storeDocPrevData({}));
    // dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    setOpenques(false);
  };
  const handleOpenQues = () => {
    setOpenques(true);
  };
  const handleOpenquesPreview = () => {
    setopenquesPreview(true);
  };
  const handleClosequesPreview = () => {
    // dispatch(counterSliceActions.storeDocPrevData({}));
    // dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    setopenquesPreview(false);
  };
  return (
    <div className="layout">
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div className="main-content">
          <div>
            <Navbar
              handleClickOpenDrawer={handleClickOpenDrawer}
              handleClose={handleClose}
              handleClickOpenManage={handleClickOpenManage}
              handleCloseManage={handleCloseManage}
              handleOpenPreview={handleOpenPreview}
              handleClosePreview={handleClosePreview}
            />
            <div
              className={
                location.pathname === "/dashboard"
                  ? "outlet-dashboard"
                  : location.pathname.includes("/incident-reporting") ||
                    location.pathname.includes("/user-management")
                  ? "outlet-change"
                  : "outlet"
              }
            >
              <Outlet />
            </div>
          </div>
        </div>

        {["/dashboard", "/incident-reporting/IncidentID"].includes(
          location.pathname
        ) ? null : (
          <Pagination pages={pagesCount} />
        )}
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        transitionDuration={500}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50vw",
            height: "100vh",
          },
        }}
      >
        {location.pathname === "/document-management" && (
          <CreateDoc
            handleClose={handleClose}
            handleOpenPreview={handleOpenPreview}
            handleClosePreview={handleClosePreview}
          />
        )}
        {location.pathname === "/safety-training" && (
          <CreateTraining
            handleClose={handleClose}
            handleOpenPreview={handleOpenPreview}
            handleClosePreview={handleClosePreview}
            handleOpenQues={handleOpenQues}
            handleCloseQues={handleCloseQues}
          />
        )}
      </Drawer>
      <Drawer
        anchor="right"
        open={manageopen}
        onClose={handleCloseManage}
        transitionDuration={500}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50vw",
            height: "100vh",
          },
        }}
      >
        {location.pathname === "/document-management" && (
          <ManageCategories handleCloseManage={handleCloseManage} />
        )}
        {location.pathname === "/safety-training" && (
          <SafetyTrainnigCategories handleCloseManage={handleCloseManage} />
        )}
      </Drawer>
      <Drawer
        anchor="right"
        open={openPreview}
        onClose={handleClosePreview}
        transitionDuration={500}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50vw",
            height: "100vh",
          },
        }}
      >
        {location.pathname === "/document-management" && (
          <DocPreview
            handleClose={handleClose}
            handleOpenPreview={handleOpenPreview}
            handleClosePreview={handleClosePreview}
          />
        )}
        {location.pathname === "/safety-training" && (
          <DocPreview
            handleClose={handleClose}
            handleOpenPreview={handleOpenPreview}
            handleClosePreview={handleClosePreview}
          />
        )}
      </Drawer>
      <Drawer
        anchor="right"
        open={openquesPreview}
        onClose={handleClosequesPreview}
        transitionDuration={500}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50vw",
            height: "100vh",
          },
        }}
      >
        {location.pathname === "/safety-training" && (
          <QuestionPreview
            handleOpenquesPreview={handleOpenquesPreview}
            handleClosequesPreview={handleClosequesPreview}
          />
        )}
      </Drawer>
      <Drawer
        anchor="right"
        open={openques}
        onClose={handleCloseQues}
        transitionDuration={500}
        sx={{
          "& .MuiDrawer-paper": {
            width: "70vw",
            height: "100vh",
          },
        }}
      >
        {location.pathname === "/safety-training" && (
          <CreateQues
            handleClose={handleClose}
            handleOpenQues={handleOpenQues}
            handleCloseQues={handleCloseQues}
            handleOpenquesPreview={handleOpenquesPreview}
            handleClosequesPreview={handleClosequesPreview}
          />
        )}
      </Drawer>
    </div>
  );
};
export default MainLayout;
