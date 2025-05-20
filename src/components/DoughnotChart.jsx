import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { changeText } from "../Utils/Common";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ key, title, chartData = [] }) => {
  console.log({ key });
  const [id, setId] = useState([]);
  const [count, setCount] = useState([]);
  // const totalCount = count.reduce((acc, curr) => acc + curr, 0);
  // console.log("Total count:", totalCount);

  useEffect(() => {
    if (Array.isArray(chartData) && chartData.length > 0) {
      setId(chartData.map((item) => item._id || "Unknown"));
      setCount(chartData.map((item) => item.count || 0));
    } else {
      setId(["No Data"]);
      setCount([0]); // Default value for no data
    }
  }, [chartData]);

  const centerText = {
    id: "centerText",
    beforeDraw(chart) {
      if (!chart.chartArea) return;
      const { chartArea, ctx, data } = chart;

      // Compute totalCount dynamically from chart data
      const totalCount = data.datasets[0].data.reduce(
        (acc, curr) => acc + curr,
        0
      );

      const centerX = (chartArea.left + chartArea.right) / 2; // Centering horizontally
      const centerY = (chartArea.top + chartArea.bottom) / 2; // Centering vertically

      ctx.save();
      ctx.font = "bold 30px Inter"; // Large font for the number
      ctx.fillStyle = "#091E42"; // Dark blue color
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(totalCount, centerX, centerY - 10); // Main number
      ctx.font = "14px Inter"; // Smaller font for subtitle
      ctx.fillText(title, centerX, centerY + 20); // Subtitle
      ctx.restore();
    },
  };

  const data = {
    labels: id.length > 0 ? id : ["No Data"],
    datasets: [
      {
        data: count.length > 0 ? count : [1],
        backgroundColor: ["#62CB8D", "#F2DA77", "#E57878"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%", // Creates the hole in the middle
    responsive: false,
    layout: {},
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 4,
          boxHeight: 7,
          padding: 12,
          font: {
            size: 15,
            family: "Inter",
          },
          color: "#091E42",
          generateLabels: (chart) => {
            return chart.data.labels.map((label, index) => {
              const value = changeText(chart.data.datasets[0].data[index]);

              // ✅ Capitalize first letter
              let formattedLabel = changeText(
                label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
              );

              // ✅ If label is longer than 10 characters, truncate it
              if (formattedLabel.length > 10) {
                formattedLabel = formattedLabel.substring(0, 10) + "...";
              }

              return {
                text: `${formattedLabel}  ${value}`,
                fillStyle: chart.data.datasets[0].backgroundColor[index],
                hidden: chart.getDatasetMeta(0).data[index].hidden,
                index: index,
              };
            });
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "250px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "250px", // ✅ Fixed size for chart
          height: "200px",
        }}
      >
        <Doughnut data={data} options={options} plugins={[centerText]} />
      </div>
    </div>
  );
};

export { DoughnutChart };
