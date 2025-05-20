import React, { useEffect, useState } from "react";
import ChartElementsData from "../Utils/ChartElements";
import ChartCompo from "../components/ChartCompo";
import DashboardSecondLayerChart from "../components/DashboardSecondLayerChart";
import CircularIndeterminate from "../components/Loader.jsx";
import "../maincss/dashboard.css";
import {
  dashboard_safety_training_data,
  dashboard_documents_data,
  incident_reporting_stats,
} from "../api/api_calls/apiCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { counterSliceActions } from "../redux/features/counter/CounterSlice.js";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { chartElements, chartLineElements } = ChartElementsData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract query parameters with default values
  const [filters, setFilters] = useState({
    documentDate: searchParams.get("documentDate") || "2025",
    inciRepoDate: searchParams.get("inciRepoDate") || "2025",
    safetyDate: searchParams.get("safetyDate") || "2025",
  });

  // Redux State Selectors
  const incidentReportingData = useSelector(
    (state) => state?.counter?.dashboardIncidentReportingData || {}
  );
  const documentsData = useSelector(
    (state) => state?.counter?.dashboardDocumentData || []
  );
  const safetyTrainingData = useSelector(
    (state) => state?.counter?.dashboardSafetyTrainingData || []
  );

  // Loaders for individual API calls
  const [loader, setLoader] = useState({
    incidentLoader: false,
    documentsLoader: false,
    safetyLoader: false,
  });

  // Track initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Update filters when query parameters change
  useEffect(() => {
    setFilters({
      documentDate: searchParams.get("documentDate") || "2025",
      inciRepoDate: searchParams.get("inciRepoDate") || "2025",
      safetyDate: searchParams.get("safetyDate") || "2025",
    });
  }, [location.search]);

  // Fetch functions for each API
  const fetchSafetyTrainingData = async (year) => {
    if (isInitialLoad) setLoader((prev) => ({ ...prev, safetyLoader: true }));
    try {
      const safetyData = await dashboard_safety_training_data(year);
      dispatch(
        counterSliceActions.storeDashboardSafetyTrainingData(
          safetyData.documentStats
        )
      );
    } catch (error) {
      console.error("Error fetching safety training data:", error);
    } finally {
      if (isInitialLoad)
        setLoader((prev) => ({ ...prev, safetyLoader: false }));
      setIsInitialLoad(false);
    }
  };

  const fetchDocumentsData = async (year) => {
    if (isInitialLoad)
      setLoader((prev) => ({ ...prev, documentsLoader: true }));
    try {
      const documentData = await dashboard_documents_data(year);
      dispatch(
        counterSliceActions.storeDashboardDocumentData(
          documentData.documentStats
        )
      );
    } catch (error) {
      console.error("Error fetching documents data:", error);
    } finally {
      if (isInitialLoad)
        setLoader((prev) => ({ ...prev, documentsLoader: false }));
      setIsInitialLoad(false);
    }
  };

  const fetchIncidentReportingData = async (year) => {
    if (isInitialLoad) setLoader((prev) => ({ ...prev, incidentLoader: true }));
    try {
      const incidentData = await incident_reporting_stats(year);
      dispatch(
        counterSliceActions.storeDashboardIncidentReportingData(
          incidentData.documentStats
        )
      );
    } catch (error) {
      console.error("Error fetching incident reporting data:", error);
    } finally {
      if (isInitialLoad)
        setLoader((prev) => ({ ...prev, incidentLoader: false }));
      setIsInitialLoad(false);
    }
  };

  // Fetch data when filters change
  useEffect(() => {
    fetchSafetyTrainingData(filters.safetyDate);
  }, [filters.safetyDate]);

  useEffect(() => {
    fetchDocumentsData(filters.documentDate);
  }, [filters.documentDate]);

  useEffect(() => {
    fetchIncidentReportingData(filters.inciRepoDate);
  }, [filters.inciRepoDate]);

  return (
    <>
      {loader.documentsLoader ||
      loader.safetyLoader ||
      loader.incidentLoader ? (
        isInitialLoad && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "80vh",
              justifyContent: "center",
            }}
          >
            <CircularIndeterminate />
          </Box>
        )
      ) : (
        <>
          <div className="both-line-charts">
            {chartLineElements.map((item, index) => (
              <DashboardSecondLayerChart
                key={index}
                title={item.title}
                number={item.number}
                setFilters={setFilters}
                filters={filters}
              >
                {item.children}
              </DashboardSecondLayerChart>
            ))}
          </div>
          <div className="incident-chart-div">
            {chartElements.map((item, index) => (
              <ChartCompo
                key={index}
                unique={item.unique}
                title={item.title}
                number={item.number}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.children}
                </div>
              </ChartCompo>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;
