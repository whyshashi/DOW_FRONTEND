// import { DoughnotChart } from "../components/DoughnotChart";
import LineChart from "../components/LineChart";
import { useSelector } from "react-redux";
import { DoughnutChart } from "../components/DoughnotChart";
import { useState } from "react";
import { useEffect } from "react";
import { get_incident_data } from "../api/api_calls/apiCalls";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { get_user_data } from "../api/api_calls/apiCalls";
import { use } from "react";

const ChartElementsData = () => {
  const [chartData, setChartData] = useState();
  const [userchartdata, setUserchartdata] = useState();
  const [userCount, setUserCount] = useState(0);
  const [chartDataCount, setChartDataCount] = useState(0);
  const incidentReportingData = useSelector(
    (state) => state?.counter?.dashboardIncidentReportingData || {}
  );

  const documentsData = useSelector(
    (state) => state?.counter?.dashboardDocumentData || []
  );

  const safetyTrainingData = useSelector(
    (state) => state?.counter?.dashboardSafetyTrainingData || []
  );
  console.log(incidentReportingData, "incidentReportingData");
  console.log(documentsData, "documentsData");
  console.log(safetyTrainingData, "safetyTrainingData");

  // return incidentReportingData;

  // Fetch data once and use it in `chartElements`
  // const incidentReportingData = ChartElementsData();
  // console.log(incidentReportingData);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const usersYear = searchParams.get("users") || "2025";
  const incidentYear = searchParams.get("incident_reporting") || "2025";

  const [filters, setFilters] = useState({
    date: "2025",
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        console.log("Fetching data for year:", usersYear);
        const res = await get_user_data(usersYear);
        console.log(res.registrations, "user response");
        setUserchartdata(res.registrations);
        setUserCount(res.totalRegistrations);
        const response = await get_incident_data(incidentYear);
        console.log(response.incidents, "chart response");
        setChartData(response.incidents);
        setChartDataCount(response.totalIncidents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();
  }, [usersYear, incidentYear]);

  // const fetchdata = async (year) => {
  //   try {
  //     console.log("Fetching data for year:", year);
  //     const response = await get_incident_data(year);
  //     console.log(response.incidents, "chart response");
  //     setChartData(response.incidents);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (filters.date) {
  //     fetchdata(filters.date);
  //   }
  // }, [filters.date]);
  // useEffect(() => {
  //   if (year && year !== filters.date) {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       date: year,
  //     }));
  //   }
  // }, [year]);

  const chartElements = [
    {
      title: "Incident Reporting",
      unique: "inciRepoDate",
      children: (
        <DoughnutChart title="Incidents" chartData={incidentReportingData} />
      ),
    },
    {
      title: "Documents",
      unique: "documentDate",
      children: <DoughnutChart title="Documents" chartData={documentsData} />,
    },
    {
      title: "Safety Training",
      unique: "safetyDate",
      children: (
        <DoughnutChart title="Safety Training" chartData={safetyTrainingData} />
      ),
    },
  ];

  const chartLineElements = [
    {
      title: "Incident Reporting",
      children: <LineChart chartData={chartData} />,
      number: chartDataCount,
    },
    {
      title: "Users",
      children: <LineChart key={"users"} chartData={userchartdata} />,
      number: userCount,
    },
  ];

  return { chartElements, chartLineElements };
};

export default ChartElementsData;
// import React, { useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from "recharts";
// import { Box, Select, MenuItem, Typography, InputAdornment, OutlinedInput } from "@mui/material";

// const dummyData = [
//   { month: "Jan", incidents: 50 },
//   { month: "Feb", incidents: 80 },
//   { month: "Mar", incidents: 120 },
//   { month: "Apr", incidents: 180 },
//   { month: "May", incidents: 220 },
//   { month: "Jun", incidents: 300 },
//   { month: "Jul", incidents: 500 },
//   { month: "Aug", incidents: 700 },
//   { month: "Sep", incidents: 800 },
//   { month: "Oct", incidents: 600 },
//   { month: "Nov", incidents: 400 },
//   { month: "Dec", incidents: 200 },
// ];

// const IncidentGraph = () => {
//   const [timeRange, setTimeRange] = useState("Yearly");
//   const totalIncidents = dummyData.reduce((sum, d) => sum + d.incidents, 0);

//   return (
//     <Box
//       sx={{
//         background: "#fff",
//         borderRadius: "12px",
//         padding: "20px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           Incident Reporting
//         </Typography>

//         {/* Dropdown for selecting time range */}
//         <Select
//           value={timeRange}
//           onChange={(e) => setTimeRange(e.target.value)}
//           sx={{
//             fontSize: "14px",
//             height: "34px",
//             "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CED4DA" },
//             "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4F4F4F" },
//           }}
//           input={
//             <OutlinedInput
//               startAdornment={
//                 <InputAdornment position="start">
//                   <span
//                     style={{
//                       padding: "8px 10px 8px 15px",
//                       marginRight: "8px",
//                       height: "34px",
//                       boxSizing: "border-box",
//                       display: "inline-block",
//                       minWidth: "75px",
//                       fontSize: "14px",
//                       borderRight: "1px solid #CED4DA",
//                       color: "#4F4F4F",
//                     }}
//                   >
//                     Date:
//                   </span>
//                 </InputAdornment>
//               }
//             />
//           }
//         >
//           <MenuItem value="Quarterly">Quarterly</MenuItem>
//           <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
//           <MenuItem value="Yearly">Yearly</MenuItem>
//         </Select>
//       </Box>

//       {/* Incident Count */}
//       <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: "10px" }}>
//         {totalIncidents}
//       </Typography>

//       {/* Graph */}
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart data={dummyData}>
//           <XAxis dataKey="month" axisLine={false} tickLine={false} />
//           <YAxis domain={[0, "dataMax + 100"]} axisLine={false} tickLine={false} />
//           <Tooltip contentStyle={{ background: "#fff", borderRadius: "8px", padding: "5px" }} />

//           {/* Area for smooth effect */}
//           <Area
//             type="monotone"
//             dataKey="incidents"
//             stroke="#E63946"
//             fill="rgba(230, 57, 70, 0.2)"
//             strokeWidth={2}
//           />

//           {/* Line */}
//           <Line
//             type="monotone"
//             dataKey="incidents"
//             stroke="#E63946"
//             strokeWidth={3}
//             dot={{ fill: "#E63946", r: 5 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// };

// export default IncidentGraph;
