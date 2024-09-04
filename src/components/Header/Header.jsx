import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "./../../context/AuthContext";

const nav__links = [
  {
    path: "/home",
    display: "Trang Chủ",
  },
  {
    path: "/about",
    display: "Giới Thiệu Về Chúng Tôi",
  },
  {
    path: "/tours",
    display: "Danh Sách Tour",
  },
 
];
const Header = () => {
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const { username, dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (headerRef.current) {
       
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
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
                    <Button className="btn secondary__btn">
                      <Link to="/login">Đăng Nhập</Link>
                    </Button>

                    <Button className="btn primary__btn">
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

export default Header;
