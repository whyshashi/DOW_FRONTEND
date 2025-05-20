import { useEffect, useState } from "react";

import { incident_reporting_stats } from "../api/api_calls/apiCalls";

const useIncidentReportingData = () => {
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    const fetchIncidentReportingData = async () => {
      try {
        const res = await incident_reporting_stats("");
        console.log(res, "cards res");
        const keys = Object.keys(res);
        const values = Object.values(res);
        console.log(res, "card number");
        console.log(values, "values of card");
        const color = ["#E49614", "#00B473", "#F04141"];

        const data = [
          {
            number: values[0] || 0,
            title: "Total Incidents",
            color: "#333333",
          },
          ...(Array.isArray(values[1])
            ? values[1].map((item, index) => ({
                number: item.count || 0,
                title: item._id,
                color: color[index % color.length],
              }))
            : []),
        ];

        setIncidentData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchIncidentReportingData();
  }, []);

  return incidentData;
};

export default useIncidentReportingData;
