import "./nav-bar.css";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  get_safety_categories,
  get_manage_categories,
  search_data,
  user_management_search,
  incident_reporting_table_data,
  search_training_doc,
} from "../../api/api_calls/apiCalls";
import { counterSliceActions } from "../../redux/features/counter/CounterSlice";
import BreadCrumbs from "../BreadCrumbs";
import Input from "../Input";
import Button from "../button/Button";
import { set } from "lodash";

const Navbar = ({ handleClickOpenDrawer, handleClickOpenManage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const documentManagementData = useSelector(
    (state) => state.counter?.documentManagementData || []
  );
  const demo = useSelector(
    (state) => state?.documents?.allDocumentCategory || []
  );
  const safetycat = useSelector(
    (state) => state?.documents?.allSafetyCategory || []
  );
  const userManagementSearchData = useSelector(
    (state) => state.counter?.userManagementSearchData || []
  );

  const searchParams = new URLSearchParams(location.search);
  const heading = searchParams.get("heading");
  const categoryId = searchParams.get("category");
  const incidentID = searchParams.get("incidentID");
  const newPageNumber = searchParams.get("page");
  const date = searchParams.get("date");
  const severity = searchParams.get("severity");
  const status = searchParams.get("status");
  // console.log(incidentID, "incidents");
  // console.log(date, severity, status, "specific-page-filters");
  const [inputText, setInputText] = useState("");
  const [chooseCat, setChooseCat] = useState(null);
  // useEffect(() => {
  //   setInputText("");
  // }, [location.pathname]);

  const fetchCategories = async () => {
    try {
      const response = await get_manage_categories();
      console.log("Fetched categories:", response.categories);
      dispatch(
        counterSliceActions.storeAllDocumentCategories(response?.categories)
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/document-management") {
      fetchCategories();
    }
  }, [location.pathname]); // Ensure categories are fetched on page switch

  const appendCatToParams = (category) => {
    if (location?.pathname?.includes("/document-management")) {
      navigate(`/document-management?category=${category}`);
    }
  };
  const fetchsafetyCategories = async () => {
    try {
      const response = await get_safety_categories();
      console.log("Fetched categories:", response.categories);
      dispatch(
        counterSliceActions.storeAllSafetyCategories(response?.categories)
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/safety-training") {
      fetchsafetyCategories();
    }
  }, [location.pathname]);

  if (location.pathname.includes("/safety-training/user") && inputText)
    navigate(`/safety-training/user?search=${inputText}`);

  const appendCatToParamssafety = (category) => {
    setChooseCat(category);
    if (location?.pathname?.includes("/safety-training")) {
      navigate(`/safety-training?category=${category}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("Current Path:", location.pathname);

      if (inputText !== null) {
        console.log("Searching for:", inputText);
        try {
          dispatch(counterSliceActions.changeSearchLoading(true));
          if (location.pathname === "/document-management") {
            const response = await search_data(inputText, categoryId);
            dispatch(
              counterSliceActions.storeDocumentManagementData(
                response?.documents
              )
            );
          } else if (location.pathname === "/safety-training") {
            const response = await search_training_doc(inputText, categoryId);
            console.log("search data", response);
            dispatch(
              counterSliceActions.storeSafetyTrainingCardData(
                response?.checkTitle
              )
            );
          } else if (location.pathname === "/user-management") {
            // const response = await user_management_search(inputText);
            // dispatch(
            //   counterSliceActions.storeUserManagementSearchData(
            //     response?.allUser
            //   )
            // );
            if (inputText) {
              navigate(`/user-management?search=${inputText}`);
            } else {
              navigate(`/user-management`);
            }

            console.log(userManagementSearchData, "userManagementSearchData");
          }
        } catch (error) {
          console.error("Error during search:", error);
        } finally {
          dispatch(counterSliceActions.changeSearchLoading(false));
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputText, categoryId, location.pathname, dispatch, incidentID]);

  const setIncidentData = async () => {
    try {
      dispatch(counterSliceActions.changeSearchLoading(true));
      if (location.pathname === "/incident-reporting") {
        console.log("Calling incident_reporting_table_data...");
        // console.log("incidentId inside API", incidentID);

        const response = await incident_reporting_table_data(
          inputText || "",
          incidentID ? incidentID : "",
          severity || "",
          status || "",
          date || "",
          newPageNumber ?? 1
        );
        console.log("Incident API Response:", response);
        dispatch(counterSliceActions.storeTotalCount(newPageNumber ?? 1));

        dispatch(counterSliceActions.storeIncidentReportingData(response));
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      dispatch(counterSliceActions.changeSearchLoading(false));
    }
  };

  useEffect(() => {
    setIncidentData();
  }, [
    incidentID,
    inputText,
    location.pathname,
    dispatch,
    date,
    severity,
    status,
  ]);

  useEffect(() => {
    if (
      Array.isArray(demo) &&
      demo.length > 0 &&
      location.pathname === "/document-management"
    ) {
      if (!categoryId || !demo.some((item) => item._id === categoryId)) {
        const firstCategory = demo[0]?._id;
        if (firstCategory) {
          appendCatToParams(firstCategory); // Ensure first category is set
        }
      }
    }
  }, [demo, categoryId, location.pathname]); // Keep categoryId dependency to track changes
  useEffect(() => {
    if (
      Array.isArray(safetycat) &&
      safetycat.length > 0 &&
      location.pathname === "/safety-training"
    ) {
      if (!categoryId || !safetycat.some((item) => item._id === categoryId)) {
        const firstCategory = safetycat[0]?._id;
        if (firstCategory) {
          appendCatToParamssafety(firstCategory); // Ensure first category is set
        }
      }
    }
  }, [safetycat, categoryId, location.pathname]); // Keep categoryId dependency to track changes

  return (
    <nav>
      <div
        className={
          ["/safety-training", "/document-management"].includes(
            location.pathname
          )
            ? "main-safety-navbar"
            : "nav-bar"
        }
      >
        <div className="heading-name">
          {location.pathname === "/" ? "Dashboard" : <BreadCrumbs />}
        </div>
        <div className="right-section-navbar">
          {location.pathname !== "/dashboard" &&
            !location.pathname.startsWith("/incident-reporting/IncidentID") && (
              <Input
                placeholder="Search here"
                inputText={inputText}
                handleSearch={(e) => setInputText(e.target.value)}
              />
            )}
          {["/document-management", "/safety-training"].includes(
            location.pathname
          ) && (
            <Button
              label={
                location.pathname === "/safety-training"
                  ? "Create New Training"
                  : "Create New Document"
              }
              isIcon={true}
              onActionClick={handleClickOpenDrawer}
            />
          )}
        </div>
      </div>
      {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
      {location.pathname === "/document-management" && (
        <div className="added-safety-values">
          <div className="safety-navbar-added-left">
            {demo?.map((item, index) => (
              <span
                style={{
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color: categoryId === item?._id ? "#F04141" : "#333333",
                  borderBottom:
                    categoryId === item?._id
                      ? "2px solid #F04141"
                      : "2px solid transparent",
                  padding: "20px",
                  transition:
                    "border-bottom 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
                key={index}
                onClick={() =>
                  appendCatToParams(item?._id) || fetchCategories()
                }
              >
                {item.name}
              </span>
            ))}
          </div>
          <button className="manage" onClick={handleClickOpenManage}>
            Manage Categories
          </button>
        </div>
      )}
      {location.pathname === "/safety-training" && (
        <div className="added-safety-values">
          <div className="safety-navbar-added-left">
            {safetycat?.map((item, index) => (
              <span
                style={{
                  cursor: "pointer",
                  textTransform: "capitalize",
                  color: categoryId === item?._id ? "#F04141" : "#333333",
                  borderBottom:
                    categoryId === item?._id
                      ? "2px solid #F04141"
                      : "2px solid transparent",
                  padding: "20px",
                  transition:
                    "border-bottom 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
                key={index}
                onClick={() =>
                  appendCatToParamssafety(item?._id) || fetchsafetyCategories()
                }
              >
                {item.name}
              </span>
            ))}
          </div>
          <button className="manage" onClick={handleClickOpenManage}>
            Manage Categories
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
