import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Container, Row, Col } from "reactstrap";

const BookingChart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8888/bookings/count-by-status-and-month", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const countsByStatusAndMonth = response.data;
        console.log(countsByStatusAndMonth)
        // Khởi tạo dữ liệu trống cho mỗi trạng thái
        const failedData = [];
        const pendingData = [];
        const successfulData = [];

        // Khởi tạo dữ liệu trống cho mỗi tháng
        const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

        months.forEach((month, index) => {
          const monthData = { month, count: 0 };
          failedData.push(monthData);
          pendingData.push(monthData);
          successfulData.push(monthData);

          // Cập nhật dữ liệu dựa trên dữ liệu trả về từ API
          countsByStatusAndMonth.forEach((item) => {
            if (item.month === month) {
              switch (item.status) {
                case "FAILED":
                  failedData[index].count = item.count;
                  break;
                case "PENDING":
                  pendingData[index].count = item.count;
                  break;
                case "SUCCESSFUL":
                  successfulData[index].count = item.count;
                  break;
                default:
                  break;
              }
            }
          });
        });

        setData({ failed: failedData, pending: pendingData, successful: successfulData });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs="12" sm="8" md="6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AreaChart width={600} height={400} data={data.failed}>
            
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} booking`} />
              <Legend />
              <Area type="monotone" dataKey="count" stroke="red" fill="red" name="FAILED" />
            </AreaChart>
          )}
        </Col>
      </Row>
      {/* ...Các biểu đồ khác ứng với 'pending' và 'successful' */}
    </Container>
  );
};

export default BookingChart;
