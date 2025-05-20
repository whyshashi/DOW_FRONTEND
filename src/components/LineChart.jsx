import React from "react";
import { Line } from "react-chartjs-2";
import "../maincss/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // ✅ Required for area fill
} from "chart.js";
import { colors } from "@mui/material";
import { useSelector } from "react-redux";

// Register Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const getLastSixMonthsData = () => {
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const allData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const today = new Date();
  const lastSixMonths = [];
  const lastSixData = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (today.getMonth() - i + 12) % 12; // Adjust for negative index
    lastSixMonths.push(allMonths[monthIndex]);
    lastSixData.push(allData[monthIndex]);
  }

  return {
    labels: lastSixMonths,
    datasets: [
      {
        label: "Monthly Data",
        data: lastSixData,
        tension: 0.4,
        borderColor: "#E57878",
        backgroundColor: "rgba(229, 120, 120, 0.2)",
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#E57878",
      },
    ],
  };
};

const LineChart = ({ title, chartData }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Data",
        data: chartData,
        tension: 0.4,
        borderColor: "#E57878",
        backgroundColor: "rgba(229, 120, 120, 0.2)",
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#E57878",
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 14,
          family: "Inter, sans-serif",
          color: "#808080",
          weight: "400",
          height: "20px",
        },
      },
    },
  };

  return (
    <>
      <div style={{ width: "100%" }} className="graph">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
