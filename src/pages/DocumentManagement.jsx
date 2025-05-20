import React, { useEffect, useState } from "react";
import "../maincss/document_management.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { get_documentManagement_safetyPrototol_CardData } from "../api/api_calls/apiCalls.js";
import Card from "../components/Card.jsx";
import { counterSliceActions } from "../redux/features/counter/CounterSlice.js";
import CircularIndeterminate from "../components/Loader.jsx";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../Animations/NoUser2.json";
import { useLayoutEffect } from "react";
import { get_doc_bycategory } from "../api/api_calls/apiCalls.js";

const DocumentManagement = () => {
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const documentManagementData = useSelector(
    (state) => state?.documents?.documentManagementData || []
  );

  console.log("the best thing", documentManagementData);

  const searchLoader = useSelector((state) => state?.documents?.searchLoading);
  console.log(documentManagementData, "document management data in redux");

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const newPage = searchParams.get("page");

  const getcardsdata = async (id) => {
    try {
      const res = await get_doc_bycategory(id);
      console.log("handleviewtraindoc", res);
      dispatch(counterSliceActions.storeTrainingPreviewData(res.document));
      setAnchorEl(null);
      handleOpenPreview();
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await get_documentManagement_safetyPrototol_CardData(
        category,
        newPage ?? 1
      );
      const res = await GET_DOC_Bycategory(id);
      console.log("true data", res);
      console.log(response, "document management data are ridiculous");
      dispatch(
        counterSliceActions.storeDocumentManagementData(
          response?.documents || []
        )
      );
      if (!response?.documents?.length) {
        setNoData(true);
      }
      dispatch(counterSliceActions.storeTotalCount(response.totalPages));
      console.log(response.totalPages, "document management total count");
    } catch (error) {
      console.error(error.message);
      setNoData(true);
    } finally {
      setLoader(false);
    }
  };

  useLayoutEffect(() => {
    if (category) fetchData();
  }, [category, newPage]);

  console.log(noData && !loader);

  return (
    <>
      {loader ? (
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
      ) : documentManagementData?.length > 0 ? (
        <div className="grid-container">
          {documentManagementData?.map((item, index) => {
            return (
              <Card
                headingName={item.title}
                image={item.imageUrl}
                key={index}
                body={item?.body}
                category={item.category}
                documentNo={item.documentNo}
                revisionNo={item.revisionNo}
                revisionDate={item.updatedAt.slice(0, 10)}
                publishDate={item.createdAt.slice(0, 10)}
                categoryId={item._id}
                fetchData={fetchData}
                viewedBy={item?.viewedBy || "No "}
              />
            );
          })}
        </div>
      ) : (
        noData &&
        !loader && (
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
        )
      )}
    </>
  );
};

export default DocumentManagement;
