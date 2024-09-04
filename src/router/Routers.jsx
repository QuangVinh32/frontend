import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import SeachResultList from "./../pages/SeachResultList";
import Register from "./../pages/Register";
import ThankYou from "../pages/ThankYou";
import Login from "../pages/Login";
import Users from "../Admin/pages/user/Users";
import Booking from "../Admin/pages/booking/Booking";
import TourList from "../Admin/pages/tour/TourList";
import Staticcal from "../Admin/pages/statistical/Staticcal";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SeachResultList />} />
      <Route path="/admin" element={<Users />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/tours" element={<TourList />} />
      <Route path="/admin/bookings" element={<Booking />} />
      <Route path="/admin/statistical" element={<Staticcal />} />

    </Routes>
  );
};

export default Routers;
