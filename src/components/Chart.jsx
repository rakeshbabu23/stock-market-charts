// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip,
// } from "chart.js";
// import { format } from "date-fns"; // For formatting timestamps

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip
// );

// const Chart = () => {
//   const [stockData, setStockData] = useState({
//     labels: [],
//     highPrices: [],
//     lowPrices: [],
//   });

//   async function getData() {
//     try {
//       const response = await fetch(
//         "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=5min&apikey=JC01J4CDD9A59CK3"
//       );
//       const info = await response.json();

//       const timeSeries = info["Time Series (5min)"];
//       if (!timeSeries) {
//         console.error("Time Series data is unavailable");
//         return;
//       }

//       // Process data for chart
//       const labels = [];
//       const highPrices = [];
//       const lowPrices = [];

//       for (const timestamp in timeSeries) {
//         const date = new Date(timestamp);
//         const formattedDate = format(date, "HH:mm"); // Format to short time (e.g., 12:30)
//         labels.push(formattedDate); // Add the formatted timestamp as a label
//         highPrices.push(parseFloat(timeSeries[timestamp]["2. high"]));
//         lowPrices.push(parseFloat(timeSeries[timestamp]["3. low"]));
//       }

//       // Update state
//       setStockData({
//         labels: labels.reverse(), // Reverse to ensure oldest data comes first
//         highPrices: highPrices.reverse(),
//         lowPrices: lowPrices.reverse(),
//       });
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "400px", padding: "5px" }}>
//       <Line
//         data={{
//           labels: stockData.labels,
//           datasets: [
//             {
//               label: "High Prices",
//               data: stockData.highPrices,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               fill: false,
//               tension: 0.4,
//               pointRadius: 4, // Add point markers
//               pointHoverRadius: 6, // Enlarged point on hover
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             tooltip: {
//               mode: "index",
//               intersect: false,
//             },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: "Time", // Label for the x-axis
//                 color: "#000",
//                 font: {
//                   size: 14,
//                 },
//               },
//               ticks: {
//                 autoSkip: true,
//                 maxRotation: 45,
//                 minRotation: 45,
//               },
//               grid: {
//                 display: false,
//               },
//             },
//             y: {
//               title: {
//                 display: false,
//                 text: "Price",
//                 color: "#000",
//                 font: {
//                   size: 14,
//                 },
//               },
//               ticks: {
//                 callback: function (value) {
//                   return `${Math.floor(parseFloat(value))}`; // Convert to float first, then apply Math.floor
//                 },
//               },
//               grid: {
//                 display: false,
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default Chart;

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip
// );

// const StockChart = () => {
//   const [stockData, setStockData] = useState({
//     labels: [],
//     data: [],
//   });

//   useEffect(() => {
//     getStockData();
//   }, []);

//   async function getStockData() {
//     try {
//       const currentDate = new Date();
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(currentDate.getDate() - 7); // Get the date 7 days ago

//       const formattedCurrentDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//       const formattedOneWeekAgo = oneWeekAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD

//       const response = await fetch(
//         `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=JC01J4CDD9A59CK3`
//       );
//       const info = await response.json();

//       const timeSeries = info["Time Series (Daily)"];
//       if (!timeSeries) {
//         console.error("Time Series data is unavailable");
//         return;
//       }

//       const labels = [];
//       const data = [];
//       for (const date in timeSeries) {
//         if (date >= formattedOneWeekAgo && date <= formattedCurrentDate) {
//           labels.push(date);
//           data.push(parseFloat(timeSeries[date]["4. close"])); // Get closing price
//         }
//       }

//       setStockData({
//         labels,
//         data,
//       });
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   return (
//     <div className="w-[100%] h-[300px] p-2">
//       <Line
//         data={{
//           labels: stockData.labels,
//           datasets: [
//             {
//               label: "Stock Price (Close)",
//               data: stockData.data,
//               fill: false,
//               lineTension: 0.1,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           scales: {
//             x: {
//               title: {
//                 display: false,
//                 text: "Date",
//               },
//               ticks: {
//                 autoSkip: true,
//                 maxRotation: 45,
//                 minRotation: 45,
//               },
//               grid: {
//                 display: false, // No grid lines
//               },
//             },
//             y: {
//               title: {
//                 display: false,
//                 text: "Price",
//               },
//               ticks: {
//                 callback: function (value) {
//                   return `${Math.floor(parseFloat(value))}`; // Format y-axis as price
//                 },
//               },
//               grid: {
//                 display: false, // No grid lines
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default StockChart;
// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Legend,
//   Tooltip
// );

// const StockChart = () => {
//   const [stockData, setStockData] = useState({
//     labels: [],
//     data: [],
//   });

//   useEffect(() => {
//     getStockData();
//   }, []);

//   async function getStockData() {
//     try {
//       const currentDate = new Date();
//       const oneMonthAgo = new Date();
//       oneMonthAgo.setMonth(currentDate.getMonth() - 1); // Get the date 1 month ago

//       const formattedCurrentDate = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//       const formattedOneMonthAgo = oneMonthAgo.toISOString().split("T")[0]; // Format as YYYY-MM-DD

//       const response = await fetch(
//         `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=JC01J4CDD9A59CK3`
//       );
//       const info = await response.json();

//       const timeSeries = info["Time Series (Daily)"];
//       if (!timeSeries) {
//         console.error("Time Series data is unavailable");
//         return;
//       }

//       const labels = [];
//       const data = [];
//       for (const date in timeSeries) {
//         if (date >= formattedOneMonthAgo && date <= formattedCurrentDate) {
//           labels.push(date);
//           data.push(parseFloat(timeSeries[date]["4. close"])); // Get closing price
//         }
//       }

//       setStockData({
//         labels,
//         data,
//       });
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   return (
//     <div>
//       <Line
//         data={{
//           labels: stockData.labels,
//           datasets: [
//             {
//               label: "Stock Price (Close)",
//               data: stockData.data,
//               fill: false,
//               lineTension: 0.5,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           scales: {
//             x: {
//               title: {
//                 display: false,
//                 text: "Date",
//               },
//               ticks: {
//                 autoSkip: true,
//                 maxRotation: 45,
//                 minRotation: 45,
//               },
//               grid: {
//                 display: false, // No grid lines
//               },
//             },
//             y: {
//               title: {
//                 display: false,
//                 text: "Price",
//               },
//               ticks: {
//                 callback: function (value) {
//                   return `$${value.toFixed(2)}`; // Format y-axis as price
//                 },
//               },
//               grid: {
//                 display: false, // No grid lines
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default StockChart;
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { useFetch } from "../hooks/useFetch";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
);

const StockChart = ({ stockData }) => {
  return (
    <div style={{ width: "100%", height: "400px", padding: "5px" }}>
      <Line
        data={{
          labels: stockData.labels,
          datasets: [
            {
              label: "Stock Price (Close)",
              data: stockData.data,
              fill: false,
              lineTension: 0.1,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              title: {
                display: false,
                text: "Date",
              },
              ticks: {
                autoSkip: true,
                maxRotation: 45,
                minRotation: 45,
              },
              grid: {
                display: false, // No grid lines
              },
            },
            y: {
              title: {
                display: false,
                text: "Price",
              },
              ticks: {
                callback: function (value) {
                  return `${Math.floor(parseFloat(value))}`;
                },
              },
              grid: {
                display: false, // No grid lines
              },
            },
          },
        }}
      />
    </div>
  );
};

export default StockChart;
