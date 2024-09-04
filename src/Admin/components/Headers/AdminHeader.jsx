import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "../../../components/Header/Header";
import { AuthContext } from "../../../context/AuthContext";
import "./header.css";
const nav__links = [

  {
    path: "/admin/users",
    display: "User",
    role: "ADMIN", 
  },
  {
    path: "/admin/tours",
    display: "Tour",
  },
  {
    path: "/admin/bookings",
    display: "Booking",
  },
  {
    path: "/admin/statistical",
    display: "Báo Cáo",
  },
 
];
const AdminHeader = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { username, dispatch } = useContext(AuthContext);
  const { role } = useContext(AuthContext);


  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (headerRef.current) {
      
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          headerRef.current.classList.add("sticky__header");
        } else {
          headerRef.current.classList.remove("sticky__header");
        }
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/*================ logo================*/}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/*================ logo end================*/}

            {/*================ menu srart================*/}

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                   // Kiểm tra vai trò và hiển thị hoặc ẩn mục
                  (item.role === "ADMIN" && role === "ADMIN") ||
                  item.role !== "ADMIN" ? (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ) : null
                ))}
              </ul>
            </div>
            {/*================ menu end================*/}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {username ? (
                  <>
                    <h5 className="mb-0"> {username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Thoát
                    </Button>
                  </>
                ) : (
                  <>
                    <Button  className="btn_secondary__btn">
                      <Link to="/login">Đăng Nhập 1 </Link>
                    </Button>

                    <Button  className="btn primary__btn">
                      <Link to="/register">Đăng kí</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
            </div>
          
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default AdminHeader;
