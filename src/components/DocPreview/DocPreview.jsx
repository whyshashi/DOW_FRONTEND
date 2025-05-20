import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import nopreview from "../../assets/images/nopreview.png";
import DOMPurify from "dompurify";
import "./DocPreview.css";
import closeimg from "../../assets/images/icon-images/close.svg";
import arrowleft from "../../assets/images/icon-images/arrow-left.svg";

const DocPreview = ({ handleClosePreview }) => {
  const location = useLocation();

  // Fetch data from Redux
  const docFront = useSelector((state) => state?.documents?.docpreviewdatafront);
  const docBackend = useSelector((state) => state?.documents?.documentpreviewdataback);
  const trainFront = useSelector((state) => state?.documents?.trainingpreviewdatafront);
  const trainBackend = useSelector((state) => state?.documents?.storetrainingpreviewdata);

  console.log("docFront:", docFront);
  console.log("docBackend:", docBackend);
  console.log("trainFront:", trainFront);
  console.log("trainBackend:", trainBackend);

  // Check if docFront contains only empty values
  const isDocFrontEmpty =
    !docFront || Object.values(docFront).every(value => value === "" || value === null);

  // Select correct document data
  const docData = docBackend && Object.keys(docBackend).length > 0
  ? docBackend
  : !isDocFrontEmpty && docFront
  ? docFront
  : {};


  // Check if trainFront contains only empty values
  const isTrainFrontEmpty =
    !trainFront || Object.values(trainFront).every(value => value === "" || value === null);

  // Select correct training data
  const trainData = !isTrainFrontEmpty && trainFront
    ? trainFront
    : trainBackend && Object.keys(trainBackend).length > 0
    ? trainBackend
    : {};

  console.log("Final docData:", docData);
  console.log("Final trainData:", trainData);

  return (
    <>
      {location.pathname === "/document-management" ? (
        <div className="doc-preview">
          <div className="doc-navbar">
            <div className="close" onClick={handleClosePreview}>
              <img className="close-img" src={closeimg} alt="Close" />
            </div>
            <div className="nav-title">
              <span>{docData.title || "Untitled Document"}</span>
            </div>
            <div className="revision">
              <span className="revision-text"></span>
            </div>
          </div>

          <div className="doc-preview-content">
            <div className="doc-prev-title">{docData.title}</div>
            <div className="doc-prev-body">
             {(docData?.body===undefined)?<div className="nopreview"><img className="close-img" src={nopreview} alt="Close" /></div>:<p
                style={{ marginLeft: "20px", marginRight: "20px", textWrap: "balance" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(docData.body || "No content available"),
                }}
              />}

            </div>
          </div>
        </div>
      ) : (
        <div className="doc-preview">
          <div className="doc-navbar">
            <div className="close" onClick={handleClosePreview}>
              <img className="close-img" src={arrowleft} alt="Close" />
            </div>
            <div className="nav-title">
              <span>{trainData.title || "Untitled Training"}</span>
            </div>
            <div className="revision">
              <span className="revision-text"></span>
            </div>
          </div>

          <div className="doc-preview-content">
            <div className="doc-prev-title">{trainData.title}</div>
            <div className="doc-prev-body">
            {(trainData?.body===undefined)?<div className="nopreview"><img className="close-img" src={nopreview} alt="Close" /></div>:<p
                style={{ marginLeft: "20px", marginRight: "20px", textWrap: "balance" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(trainData.body || "No content available"),
                }}
              />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocPreview;
