import React, { useContext,useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdminHeader from "../../Admin/components/Headers/AdminHeader";
import Routers from "../../router/Routers";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footers from "../../Admin/components/Footers/Footers";
const Layout = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sử dụng useEffect để chuyển hướng khi role là "admin" hoặc "manager"
  useEffect(() => {
    if (role === "ADMIN" || role === "MANAGER") {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      {/* Sử dụng câu lệnh điều kiện để hiển thị AdminHeader cho role là "ADMIN" hoặc "MANAGER" */}
      {role === "ADMIN" || role === "MANAGER" ? <AdminHeader /> : <Header />}
      <Routers />
      {role === "ADMIN" || role === "MANAGER" ? <Footers /> : <Footer />} 
    </>
  );
};

export default Layout;
