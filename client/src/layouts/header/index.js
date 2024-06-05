import { memo} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../api/apiRequest";
import { clientIMG, logo } from "../../components/imageRender";
import { useSelector } from "react-redux";
import "../header/style.css";

const Header = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const id = user?._id;
  // let axiosJWT = axiosInstance(user,dispatch,loginSuccess);
  const handelLogOut = () => {
    logOutUser(dispatch, id, navigate, accessToken);
  }
  return (
    <div className="container-fluid d-flex justify-content-around align-items-center fixed-top shadow-sm header-style">
      <div className="left d-flex align-items-center">
        <Link to="/client/home">
          <img className="logo rounded-2 shadow-sm " draggable="false" style={{ width: "calc(65 * var(--header-height) / 100)" }} src={logo} alt="logo"></img>
        </Link>
        <Link to="/client/home" className="p-0">
          <p style={{ fontSize: "var(--size-text-medium)", color: "var(--color-text-light)", fontWeight: "bold" }}>COURSE LEARN</p>
        </Link>
      </div>
      <div className="middle">
        <Link to="/client/home" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Trang chủ</Link>
        <Link to="/client/class" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Lớp học </Link>
        <Link to="/client/exercise" className="pl-10 pr-10" style={{ fontWeight: "bold" }}>Bài tập</Link>
      </div>

      <div className="right d-flex align-items-center">
        <Link to="/client/profile" className="p-0">
          <p style={{ fontSize: "var(--size-text-medium)", fontWeight: "bold", color: "var(--color-text-light)" }}>{user?.name}</p>
        </Link>
        <button className="btn dropdown-toggle bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img className="client-img rounded-circle shadow-sm" src={user?.avatar ? user?.avatar :clientIMG} alt="logo" draggable="false" style={{ width: 'calc(65 * var(--header-height) / 100)' }}></img>
        </button>
        <ul className="dropdown-menu shadow-sm border-1">
          <li><Link className="dropdown-item" to='/client/profile'>Thông tin</Link></li>
          <li><Link className="dropdown-item" to='/admin/home'>Chế độ tối</Link></li>
          <li><Link className="dropdown-item" to='/client/setting'>Cài đặt</Link></li>
          <li><button className="dropdown-item" onClick={handelLogOut}>Đăng xuất</button></li>
        </ul>
      </div>
    </div>
  );
});

export default Header;