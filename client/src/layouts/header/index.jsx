import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../api/apiRequest";
import { clientIMG, logo } from "../../components/imageRender";
import "../header/style.css";

const Header = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const id = user?._id;

  const handelLogOut = () => {
    logOutUser(dispatch, id, navigate, accessToken);
  };

  const changeBackground = () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  };

  useEffect(() => {
    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const showMenu = () => {
    const menuNav = document.getElementById("menu-nav");
    menuNav.classList.toggle("menu-nav-visible");
    menuNav.classList.toggle("menu-nav-hidden");
  };

  return (
    <div className="container-fluid d-flex justify-content-around align-items-center fixed-top shadow-sm header-style">
      <div className="left d-flex align-items-center">
        <Link to="/client/home">
          <img
            className="logo rounded-2 shadow-sm"
            draggable="false"
            style={{ width: "calc(65 * var(--header-height) / 100)" }}
            src={logo}
            alt="logo"
          />
        </Link>
        <Link to="/client/home" className="p-0">
          <p
            style={{
              fontSize: "var(--size-text-medium)",
              color: "var(--color-text-light)",
              fontWeight: "bold",
            }}
          >
            COURSE LEARN
          </p>
        </Link>
      </div>
      <div id="lg-view" className="middle d-flex">
        <Link
          to="/client/home"
          className="pl-10 pr-10 align-items-center justify-content-center d-flex gap-1"
          style={{ fontWeight: "bold" }}
        >
          <span className="material-symbols-outlined">home</span>
          Trang chủ
        </Link>
        <Link
          to="/client/class"
          className="pl-10 pr-10 align-items-center justify-content-center d-flex gap-1"
          style={{ fontWeight: "bold" }}
        >
          <span className="material-symbols-outlined">class</span>
          Lớp học
        </Link>
        <Link
          to="/client/exercise"
          className="pl-10 pr-10 align-items-center justify-content-center d-flex gap-1"
          style={{ fontWeight: "bold" }}
        >
          <span className="material-symbols-outlined">exercise</span>
          Bài tập
        </Link>
      </div>
      <div className="right d-flex align-items-center">
        <Link to="/client/profile" className="p-0">
          <p
            style={{
              fontSize: "var(--size-text-medium)",
              fontWeight: "bold",
              color: "var(--color-text-light)",
            }}
          >
            {user?.name}
          </p>
        </Link>
        <button
          className="btn dropdown-toggle bg-transparent border-0"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            className="client-img rounded-circle shadow-sm"
            src={user?.avatar ? user?.avatar : clientIMG}
            alt="avatar"
            draggable="false"
            style={{ width: "calc(65 * var(--header-height) / 100)" }}
          />
        </button>
        <ul className="dropdown-menu shadow-sm border-1">
          <li>
            <Link className="dropdown-item" to="/client/profile">
              Thông tin
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={changeBackground}>
              Switch mode
            </button>
          </li>
          <li>
            <Link className="dropdown-item" to="/client/setting">
              Cài đặt
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handelLogOut}>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
      
      <div className="responsive-header align-items-center justify-content-center d-flex">
        <span className="material-symbols-outlined position-relative p-3" onClick={showMenu}>menu</span>
        <ul
          id="menu-nav"
          className="menu-nav position-absolute p-3 col-md-3 col-12 d-flex flex-column gap-3 align-items-center justify-content-center menu-nav-hidden"
          style={{
            top: "var(--header-height)",
            right: "0",
            zIndex: "1000",
            backdropFilter: "blur(50px)",
          }}
        >
          <li>
            <Link to="/client/profile">
              <span className="material-symbols-outlined">person</span>
              Thông tin
            </Link>
          </li>
          <li>
            <Link to="/client/home">
              <span className="material-symbols-outlined">home</span>Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/client/class">
              <span className="material-symbols-outlined">class</span>Lớp học
            </Link>
          </li>
          <li>
            <Link to="/client/exercise">
              <span className="material-symbols-outlined">exercise</span>Bài tập
            </Link>
          </li>
          <li>
            <Link to="/client/setting">
              <span className="material-symbols-outlined">settings</span>Cài dặt
            </Link>
          </li>
          <li>
            <Link onClick={handelLogOut}>
              <span className="material-symbols-outlined">logout</span>Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Header;
