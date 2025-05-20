import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { get_safetyTraining_CardData } from "../api/api_calls/apiCalls";
import Card from "../components/Card";
import { counterSliceActions } from "../redux/features/counter/CounterSlice";
import CircularIndeterminate from "../components/Loader";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../Animations/NoUser2.json";

const SafetyTraining = () => {
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(false); // track if there is no data
  const dispatch = useDispatch();
  const location = useLocation();
  const safetyTrainingData = useSelector(
    (state) => state?.documents?.safetyTrainingCard
  );
  const searchLoader = useSelector((state) => state?.documents?.searchLoading);
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const newPageNumber = searchParams.get("page");
  console.log({ newPageNumber });

  const fetchData = async () => {
    try {
      setLoader(true);
      setNoData(false); // Reset before fetching new data

      const response = await get_safetyTraining_CardData(
        category,
        newPageNumber ?? 1
      );
      console.log("Safety training card data:", response);

      dispatch(counterSliceActions.storeTotalCount(response.totalPages));

      if (response?.doc?.length > 0) {
        dispatch(
          counterSliceActions.storeSafetyTrainingCardData(response?.doc)
        );
        setNoData(false);
      } else {
        setNoData(true); // Set noData to true if no data found
      }
    } catch (error) {
      console.error("Error fetching safety training data:", error);
      setNoData(true); // Handle error by showing no data
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (category) fetchData();
  }, [category, newPageNumber]);

  // Show Loader
  if (loader) {
    return (
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
    );
  }

  // Show Lottie Animation if no data
  if (noData) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: "60%" }}
        />
      </div>
    );
  }

  // Show Data if available
  return (
    <div className="grid-container">
      {(Array.isArray(safetyTrainingData) ? safetyTrainingData : []).map(
        (item, index) => (
          <Card
            key={index}
            headingName={item?.title || "Untitled"}
            image={item?.imageUrl || ""}
            category={item?.category || "Unknown"}
            documentNo={item?.documentNo || "N/A"}
            revisionNo={item?.revisionNo || "N/A"}
            revisionDate={item?.updatedAt ? item.updatedAt.slice(0, 10) : "N/A"}
            publishDate={item?.createdAt ? item.createdAt.slice(0, 10) : "N/A"}
            categoryId={item?._id || ""}
            viewedBy={item?.viewedBy || "No "}
            fetchData={fetchData}
            isquepresent={
              Array.isArray(item?.questionID) && item?.questionID.length > 0
                ? 1
                : 0
            }
          />
        )
      )}
    </div>
  );
};

export default SafetyTraining;
