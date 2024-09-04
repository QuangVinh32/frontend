import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Container, Row, Col } from "reactstrap";

const BookingChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8888/bookings/total-amount-by-month", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  const chartData = [
    { month: "Tháng 1", revenue: data[0] },
    { month: "Tháng 2", revenue: data[1] },
    { month: "Tháng 3", revenue: data[2] },
    { month: "Tháng 4", revenue: data[3] },
    { month: "Tháng 5", revenue: data[4] },
    { month: "Tháng 6", revenue: data[5] },
    { month: "Tháng 7", revenue: data[6] },
    { month: "Tháng 8", revenue: data[7] },
    { month: "Tháng 9", revenue: data[8] },
    { month: "Tháng 10", revenue: data[9] },
    { month: "Tháng 11", revenue: data[10] },
    { month: "Tháng 12", revenue: data[11] },
  ];

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs="12" sm="8" md="6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <BarChart width={600} height={400} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="red" name="Doanh thu" />
            </BarChart>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingChart;
