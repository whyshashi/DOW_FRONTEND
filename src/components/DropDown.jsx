import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import "../maincss/dropdown.css";
import deleteIcon from "/src/assets/images/delete.svg";
import { useState, useEffect } from "react";
// import { delete_data } from "../api/api_calls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_data,
  delete_safety_data,
  get_doc_bycategory,
  get_training_doc,
  view_all_questions,
} from "../api/api_calls/apiCalls";
import eye from "../assets/images/visibility.svg";
import { counterSliceActions } from "../redux/features/counter/CounterSlice";
import RemoveModal from "./RemoveModal/RemoveModal";
import { Drawer } from "@mui/material";
import QuestionPreview from "./QuestionPreview/QuestionPreview";
import DocPreview from "./DocPreview/DocPreview";
import CreateDoc from "./Create-Doc/CreateDoc";
import { useLocation } from "react-router-dom";
import CreateQues from "./CreateQues/CreateQues";

const optionsindoc = [
  { name: "View Document", icon: eye, value: 1 },
  { name: "Edit Document", icon: eye, value: 2 },
  { name: "Delete Document", icon: deleteIcon, value: 3 },
];
const ITEM_HEIGHT = 48;

export default function DropDown(props) {
  const {
    id,
    fetchData,
    isSafetyDocument = false,
    docdata,
    isquepresent,
    categoryidforalldata,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [remove, setRemove] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openquesPreview, setopenquesPreview] = useState(false);
  const [openPreview, setopenPreview] = useState(false);
  const [opendocedit, setopendocedit] = useState(false);
  const [openaadquest, setopenaadquest] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const options = [
    { name: "View Document", icon: eye, value: 1 },
    isquepresent == 1
      ? { name: "View Questionnaire", icon: eye, value: 2 }
      : { name: "Add Questions", icon: eye, value: 2 },
    { name: "Delete Document", icon: deleteIcon, value: 3 },
  ];

  const handleOpenPreview = () => {
    setopenPreview(true);
  };
  const handleClosePreview = () => {
    // dispatch(counterSliceActions.storeDocPrevData({}));
    dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    setopenPreview(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    dispatch(counterSliceActions.storeDocPrevData({}));
    //  dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainingPreviewData({}));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
    setAnchorEl(null);
    if (value === 3) {
      setOpenModal(true); // Open modal when "Delete Document" is clicked
    }
  };

  const handleOpendocedit = (value) => {
    dispatch(counterSliceActions.storeDocPrevData({}));
    setAnchorEl(null);
    setopendocedit(true);
  };
  const handleClosedocedit = () => {
    // setAnchorEl(null);
    // dispatch(counterSliceActions.storeDocPrevData({}));
    // dispatch(counterSliceActions.storeDocPrevData({}));
    dispatch(counterSliceActions.storeDocumentPreviewData([]));
    dispatch(counterSliceActions.storeTrainPrevData({}));
    setopendocedit(false);
  };
  const handleOpenquesPreview = () => {
    setopenquesPreview(true);
  };
  const handleClosequesPreview = () => {
    dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
    setopenquesPreview(false);
  };
  const handleDelete = async () => {
    try {
      if (isSafetyDocument) {
        await delete_safety_data(id); // Call safety delete function
      } else {
        await delete_data(id); // Call normal delete function
      }
      setOpenModal(false);
      await fetchData();
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };
  const handleviewquestions = async (id) => {
    try {
      const res = await view_all_questions(id);
      console.log("handleviewquestions", res);
      dispatch(
        counterSliceActions.storeTrainingPreviewQuestionsBackend(res.questions)
      );
      handleOpenquesPreview();
      setAnchorEl(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleaddquestions = (id) => {
    // dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
    dispatch(counterSliceActions.storeTrainingPreviewQuestionsBackend({}));
    setopenaadquest(true);
    setAnchorEl(null);
  };
  const handleCloseaddques = () => {
    dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
    setopenaadquest(false);
  };
  const handleviewtraindoc = async (id) => {
    try {
      const res = await get_training_doc(id);
      console.log("handleviewtraindoc", res);
      dispatch(counterSliceActions.storeTrainingPreviewData(res.document));
      setAnchorEl(null);
      handleOpenPreview();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleviewdoc = async (id) => {
    try {
      const res = await get_doc_bycategory(id);
      console.log("handleviewdoc", res);
      dispatch(counterSliceActions.storeDocumentPreviewData(res.documents[0]));
      setAnchorEl(null);
      handleOpenPreview();
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("doc data in dropdown", docdata);
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 3.5,
            width: "20ch",
          },
        }}
      >
        {location.pathname === "/document-management" &&
          optionsindoc.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() =>
                option.value == 1
                  ? handleviewdoc(id)
                  : option.value === 2
                  ? handleOpendocedit(id)
                  : handleClose(option.value)
              }
            >
              <img
                src={option.icon}
                alt={option.name}
                style={{ marginRight: "8px" }}
              />
              {option.name}
            </MenuItem>
          ))}
        {location.pathname === "/safety-training" &&
          options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() =>
                option.value === 1
                  ? handleviewtraindoc(id)
                  : option.value === 2
                  ? isquepresent === 1
                    ? handleviewquestions(id)
                    : handleaddquestions(id)
                  : handleClose(option.value)
              }
            >
              <img
                src={option.icon}
                alt={option.name}
                style={{ marginRight: "8px" }}
              />
              {option.name}
            </MenuItem>
          ))}
      </Menu>

      <div>
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
          open={opendocedit}
          onClose={handleClosedocedit}
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
              docdata={docdata}
              handleClose={handleClosedocedit}
              handleOpenPreview={handleOpenPreview}
              handleClosePreview={handleClosePreview}
              isedit={opendocedit}
              docid={id}
            />
          )}
        </Drawer>
        <Drawer
          anchor="right"
          open={openaadquest}
          onClose={handleCloseaddques}
          transitionDuration={500}
          sx={{
            "& .MuiDrawer-paper": {
              width: "50vw",
              height: "100vh",
            },
          }}
        >
          {location.pathname === "/safety-training" && (
            <CreateQues
              // handleCloseaddques={handleCloseaddques}
              handleOpenquesPreview={handleOpenquesPreview}
              handleClosequesPreview={handleClosequesPreview}
              handleCloseQues={handleCloseaddques}
              docid={id}
              categoryidforalldata={categoryidforalldata}
            />
          )}
        </Drawer>
        {openModal && (
          <RemoveModal
            onClose={() => {
              setOpenModal(false);
            }}
            onConfirm={handleDelete}
            mainHeading={"Are you sure you want to delete this Document?"}
            subHeading={
              "This action is irreversible, and all associated data will be permanently lost. Please confirm before proceeding."
            }
            openModal={openModal}
          />
        )}
      </div>
    </div>
  );
}
