import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomSelect from "../components/Select";
import "../maincss/incidentReportingSpecificPage.css";
import Input from "../components/Input";
import { useSelector } from "react-redux";
import { changeDate } from "../Utils/Common";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import SelectBox from "../components/SelectBox";
import {
  update_specific_incident,
  incident_reporting_table_data,
} from "../api/api_calls/apiCalls";
import WhiteCircularIndeterminate from "../components/WhiteLoader";
// import { Box } from "@mui/material";
import CircularIndeterminate from "../components/Loader";
import { Snackbar, Alert } from "@mui/material";

const IncidentReportingSpecificPage = () => {
  const [status, setStatus] = useState("In-Progress");
  const [loader, setLoader] = useState({
    updateIncident: false,
    loadIncident: false,
  });
  const [snackbar, setSnackBar] = useState(false);
  const [snackBar1, setSnackBar1] = useState(false);
  const [changingbtnvalue, setchangingbtnvalue] = useState(false);
  const [incidentData, setIncidentData] = useState();
  const [hitApi, setHitApi] = useState(null);
  const [actionTaken, setActionTaken] = useState("");
  const DropDowndata = [
    { value: "0", name: "In-Progress" },
    { value: "1", name: "Pending" },
    { value: "2", name: "Closed" },
  ];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("incidentID");
  console.log(id, "id get");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      setLoader((prev) => ({
        ...prev,
        loadIncident: true,
      }));
      const data = await incident_reporting_table_data("", id, "", "", "");
      const { Incidents } = data;
      setIncidentData(Incidents);
    } catch (e) {
      console.error(error.message);
    } finally {
      setLoader((prev) => ({
        ...prev,
        loadIncident: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [loader.updateIncident]);

  const handleSaveChanges = async (actionTaken, status) => {
    if (actionTaken === "") {
      setSnackBar1(true);
      return;
    } else {
      setchangingbtnvalue(true);
      setLoader((prev) => ({
        ...prev,
        updateIncident: true,
      }));
      try {
        const res = await update_specific_incident(id, actionTaken, status);
      } catch (error) {
        // setActionTaken("") || setStatus("In-progress");
        console.error("Error");
      } finally {
        setSnackBar(true);
        setActionTaken("");
        setStatus("In-Progress");
        setchangingbtnvalue(false);
        setLoader((prev) => ({
          ...prev,
          updateIncident: false,
        }));
      }
      setHitApi(true);
    }
  };

  function handleActionTaken(e) {
    console.log(e.target.value);
    setActionTaken(e.target.value);
  }

  console.log({ actionTaken });

  // actionTaken: "NA";
  // attachments: (2)[
  //   ("https://example.com/images/leak1.jpg",
  //   "https://example.com/images/leak2.jpg")
  // ];
  // createdAt: "2025-03-03T06:36:59.389Z";
  // description: "Water leakage in the server room, posing a risk to equipment.";
  // incidentId: 2;
  // incidentLocation: "locationA";
  // incidentStatus: "Pending";
  // reportedBy: "67bd6c0d54b8ed384bb7808a";
  // riskLevel: "High";
  // _id: "67c54e0bf3b00ca37251f7c2";
  return !loader.loadIncident ? (
    <div>
      <div className="both-incident-update-action-div">
        <div className="incident-data-div">
          {incidentData?.map((item) => (
            <div className="incident-data-inner-div" key={item._id}>
              <div className="data-top-layer">
                <div
                  style={{
                    color:
                      item.riskLevel === "High"
                        ? "#E49614"
                        : item.riskLevel === "Severe"
                        ? "#E73F3F"
                        : "#F041411A",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "0.6rem" }} />
                  {item.riskLevel}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      paddingTop: "3px",
                    }}
                  >
                    Incident ID:
                    <p
                      style={{
                        color: "#333333",
                        font: "Inter",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      {item.incidentId}
                    </p>
                  </span>

                  <button
                    style={{
                      borderRadius: "39px",
                      border: "1px solid",
                      padding: "2px 12px",
                      gap: "4px",
                      fontFamily: "Inter",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "20px",
                      color:
                        item.incidentStatus === "Pending"
                          ? "#E49614"
                          : item.incidentStatus === "Closed"
                          ? "#E73F3F"
                          : "#00B473",
                      backgroundColor:
                        item.incidentStatus === "Pending"
                          ? "#E496141A"
                          : item.incidentStatus === "Closed"
                          ? "#E73F3F1A"
                          : "#00B4731A",
                    }}
                  >
                    {item.incidentStatus}
                  </button>
                </div>
                <div>
                  <span>Location: </span>
                  {item.incidentLocation}
                </div>
              </div>
              <div
                style={{
                  font: "Inter",
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#333333",
                  height: "56%",
                }}
              >
                {item.description}
              </div>
              <div className="data-top-layer">
                <div className="images">
                  <img src={item?.attachments}></img>
                </div>
                <div>
                  <span>Raised by: </span>
                  {item.reportedBy.firstName + " " + item.reportedBy.lastName}
                </div>
                <div>
                  <span>Raised Date: </span>
                  {changeDate(item.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="update-action-div">
          <div className="full_box">
            <div className="update-status">
              <label>Update Status</label>
              <SelectBox
                data={DropDowndata}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div
              className="action-div"
              style={{ width: "100%", marginTop: "20px" }}
            >
              <label>Action taken</label>
              <textarea
                value={actionTaken}
                onChange={handleActionTaken}
                className="action-box"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              ></textarea>
            </div>
          </div>

          {/* <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbar}
            onClose={() => setSnackBar(false)}
            message="Saved Successfully"
            autoHideDuration={5000}
            size={100}
          /> */}
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={() => setSnackBar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackBar(false)}
              sx={{
                width: "100%",
                zIndex: 40,
                backgroundColor: "#333333",
                color: "white",
                "& .MuiAlert-icon": { color: "white" }, // Change icon color
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {"Saved Successfully"}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackBar1}
            autoHideDuration={5000}
            onClose={() => setSnackBar1(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackBar1(false)}
              sx={{
                width: "100%",
                zIndex: 40,
                backgroundColor: "#F04141",
                color: "white",
                "& .MuiAlert-icon": { color: "white" },
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {"Action Taken is empty"}
            </Alert>
          </Snackbar>

          <button
            className="action-btn"
            style={{
              alignSelf: "flex-end",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "bold",
            }}
            onClick={() => handleSaveChanges(actionTaken, status)}
          >
            {loader.updateIncident ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "right",
                  justifyContent: "right",
                  textAlign: "right",
                }}
              >
                <WhiteCircularIndeterminate />
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "90vh",
        justifyContent: "center",
      }}
    >
      <CircularIndeterminate />
    </Box>
  );
};

export default IncidentReportingSpecificPage;
