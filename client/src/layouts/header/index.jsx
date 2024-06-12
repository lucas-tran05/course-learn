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
  }

  const changeBackground = () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  }

  useEffect(() => {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }, []);

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
          <p style={{ fontSize: "var(--size-text-medium)", color: "var(--color-text-light)", fontWeight: "bold" }}>
            COURSE LEARN
          </p>
        </Link>
      </div>
      <div className="middle">
        <Link to="/client/home" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Trang chủ</Link>
        <Link to="/client/class" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Lớp học</Link>
        <Link to="/client/exercise" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Bài tập</Link>
      </div>
      <div className="right d-flex align-items-center">
        <Link to="/client/profile" className="p-0">
          <p style={{ fontSize: "var(--size-text-medium)", fontWeight: "bold", color: "var(--color-text-light)" }}>
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
            alt="logo"
            draggable="false"
            style={{ width: 'calc(65 * var(--header-height) / 100)' }}
          />
        </button>
        <ul className="dropdown-menu shadow-sm border-1">
          <li><Link className="dropdown-item" to='/client/profile'>Thông tin</Link></li>
          <li><button className="dropdown-item" onClick={changeBackground}>Switch mode</button></li>
          <li><Link className="dropdown-item" to='/client/setting'>Cài đặt</Link></li>
          <li><button className="dropdown-item" onClick={handelLogOut}>Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  );
});

export default Header;
