import { Description } from "@mui/icons-material";
import axios from "axios";
import { config } from "dotenv";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Attaching token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const API_FETCHER = async ({
  url,
  method = "GET",
  data = {},
  params = {},
  headers = {},
}) => {
  try {
    const config = {
      url,
      method,
      data,
      params,
      headers,
    };
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default API_FETCHER;

export function changeText(text) {
  console.log(text);
  switch (text) {
    case "firstName":
      return "First Name";
    case "lastName":
      return "Last Name";
    case "createdAt":
      return "Registered Date";
    case "totalincidents":
      return "Total Incidents";
    case "pendingIncidents":
      return "Pending Incidents";
    case "inProgressIncidents":
      return "In Progress Incidents";
    case "closedIncidents":
      return "Closed Incidents";
    case "incidentId":
      return "Incident Id";
    case "riskLevel":
      return "Severity";
    case "incidentLocation":
      return "Location";
    case "reportedBy":
      return "Raised By";
    case "incidentStatus":
      return "Status";
    case "actionTaken":
      return "Action Taken";
    case "email":
      return "Email";
    case "description":
      return "Description";
    default:
      return text;
  }
}

export function changeDate(date) {
  if (!date || typeof date !== "string") return "N/A"; // Handle undefined/null/non-string cases
  return date.slice(0, 10);
}

export function changeDesc(desc) {
  if (desc.length > 15) {
    return desc.slice(0, 15) + "...";
  } else {
    return desc;
  }
}

export function changeRaisedBy(first, last) {
  return first + " " + last;
}

export function changeHeadingName(desc) {
  if (desc.length > 40) {
    return desc.slice(0, 40) + "...";
  } else {
    return desc;
  }
}
