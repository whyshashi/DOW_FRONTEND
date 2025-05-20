import { createSlice } from "@reduxjs/toolkit";
// import UserManagement from "../../../pages/UserManagement";
import DashBoard from "../../../pages/DashBoard";

const initialState = {
  documentManagementData: [],
  safetyManagementData: [],
  allDocumentCategory: [],
  allSafetyCategory: [],
  userManagementSearchData: [],
  incidentReportingData: [],
  dashboardSafetyTrainingData: [],
  dashboardDocumentData: [],
  dashboardIncidentReportingData: [],
  incidentData: [], 
 
  documentpreviewdataback: [],
  storetrainingpreviewdata: {},
  trainingpreviewdatafront: {},
  docpreviewdatafront: {},
  trainingpreviewquestionsfront: {},
  safetytrainingDatacard: {},
  trainingpreviewquestionsbackend: {},
  searchLoading: false,
  safetyTrainingCard: [],
  pageTotalCount: {},
  incidentData: [],
  dashboardLineChartData: {
    IncidentReportingLineChartData: {},
    UserLineChartData: {},
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    storeDocumentManagementData(state, action) {
      console.log("Document manage data", action.payload);
      state.documentManagementData = action.payload;
    },
    storeSafetyTrainingData(state, action) {
      console.log("storeSafetyTrainingData data", action.payload);
      state.safetytrainingDatacard = action.payload;
    },
    storeSafetyTrainingCardData(state, action) {
      console.log("safetyTrainingCard data", action.payload);
      state.safetyTrainingCard = action.payload;
    },
    storeDocumentPreviewData(state, action) {
      console.log("DocumentPreviewDatabackend", action.payload);
      state.documentpreviewdataback = action.payload;
    },
    storeTrainingPreviewData(state, action) {
      console.log("TrainingPreviewDatabackend", action.payload);
      state.storetrainingpreviewdata = action.payload;
    },
    storeDocPrevData(state, action) {
      console.log("storeDocPrevData", action.payload);
      state.docpreviewdatafront = action.payload;
    },
    storeTrainPrevData(state, action) {
      // console.log("TrainPrevData", action.payload);
      state.trainingpreviewdatafront = action.payload;
    },
    storeTrainingPreviewQuestionsFront(state, action) {
      console.log("training q front", action.payload);
      state.trainingpreviewquestionsfront = action.payload;
    },
    storeTrainingPreviewQuestionsBackend(state, action) {
      console.log("training q backend", action.payload);
      state.trainingpreviewquestionsbackend = action.payload;
    },
    storeSafetyManagementData(state, action) {
      state.safetyManagementData = action.payload;
    },
    storeAllDocumentCategories(state, action) {
      console.log("all document cate in redux", action.payload);
      state.allDocumentCategory = action.payload;
    },
    storeAllSafetyCategories(state, action) {
      console.log("all document cate in redux", action.payload);
      state.allSafetyCategory = action.payload;
    },
    storeUserManagementSearchData(state, action) {
      console.log("storeUserManagementSearchData", action.payload);
      state.userManagementSearchData = action.payload;
    },
    storeIncidentData(state, action) {
      state.incidentData = action.payload; 
    },
    setFilters(state, action) {
      state.filters = action.payload; 
    },
    storeIncidentReportingData(state, action) {
      state.incidentReportingData = action.payload;
    },
    storeDashboardSafetyTrainingData(state, action) {
      state.dashboardSafetyTrainingData = action.payload;
    },
    storeDashboardDocumentData(state, action) {
      state.dashboardDocumentData = action.payload;
    },
    storeDashboardIncidentReportingData(state, action) {
      state.dashboardIncidentReportingData = action.payload;
    },
    changeSearchLoading(state, action) {
      state.searchLoading = action.payload;
    },
    storeTotalCount(state, action) {
      state.pageTotalCount = action.payload;
    },
    storeLineChartData(state, action) {
      const { key, data } = action.payload;

      state.dashboardLineChartData = {
        ...state.dashboardLineChartData,
        [key]: data,
      };
    },
    storeIncidentData(state, action) {
      state.incidentData = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { storeIncidentData, setFilters } = counterSlice.actions;
// Action creators are generated for each case reducer function
export const counterSliceActions = counterSlice.actions;

export default counterSlice.reducer;
