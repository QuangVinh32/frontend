import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const BookingChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8888/bookings/count-by-status-and-month", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [token]);

  // Hàm để vẽ biểu đồ
  const drawChart = () => {
    if (loading) {
      return;
    }

    const canvas = document.getElementById("custom-chart");
    const ctx = canvas.getContext("2d");

    // Dữ liệu biểu đồ
    const labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const failedData = data.FAILED || [];
    const pendingData = data.PENDING || [];
    const successfulData = data.SUCCESSFUL || [];

    // Thiết lập kích thước biểu đồ
    canvas.width = 600;
    canvas.height = 400;

    // Thiết lập màu sắc
    const colors = ["red", "orange", "green"];

    // Vẽ biểu đồ
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.strokeStyle = colors[i];
      ctx.lineWidth = 2;
      ctx.moveTo(50, 350);

      const dataToUse = i === 0 ? failedData : i === 1 ? pendingData : successfulData;

      for (let j = 0; j < dataToUse.length; j++) {
        const x = 50 + (j * 50);
        const y = 350 - (dataToUse[j] * 50);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }

    // Vẽ các đường dẫn
    for (let i = 0; i < labels.length; i++) {
      const x = 50 + (i * 50);
      const y = 350;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 5);
      ctx.stroke();

      // Vẽ số lượng booking
      ctx.fillText(labels[i], x - 20, y + 20);
      ctx.fillText(failedData[i], x - 20, 350 - (failedData[i] * 50) - 20);
      ctx.fillText(pendingData[i], x - 20, 350 - (pendingData[i] * 50) - 20);
      ctx.fillText(successfulData[i], x - 20, 350 - (successfulData[i] * 50) - 20);
    }
  };

  useEffect(() => {
    drawChart();
  }, [loading]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <canvas id="custom-chart"></canvas>
          <div>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "red", display: "inline-block" }}></div>
              <span style={{ marginLeft: "5px" }}>FAILED</span>
            </div>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "orange", display: "inline-block" }}></div>
              <span style={{ marginLeft: "5px" }}>PENDING</span>
            </div>
            <div style={{ display: "inline-block" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "green", display: "inline-block" }}></div>
              <span style={{ marginLeft: "5px" }}>SUCCESSFUL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingChart;
