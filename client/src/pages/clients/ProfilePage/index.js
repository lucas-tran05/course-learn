import React from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clientIMG } from "../../../components/imageRender";
import './style.css';
import Header from '../../../layouts/header/index';
import { useSelector } from 'react-redux';
import { logOutUser } from '../../../api/apiRequest';
import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../../redux/authSlice';
// import {axiosInstance} from '../../../createIntance';
const ProfilePage = () => {
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
    <div>
      <Header />
      <div className="profile-page row g-0 container-fluid position-relative w-100">
        <div className='profile-page__left col-4 overflow-auto text-center fixed-left left-0 p-5 shadow rounded-end p-0 m-0'>
          <img src={user?.avatar ? user?.avatar : clientIMG} alt="avatar" className='rounded-circle shadow' draggable="false" style={{ width: "120px" }} />
          <h2 className='mt-4 mb-4'> {user?.name?user?.name:"NULL"} </h2>
          <Link to="/client/update"><button className='btn btn-style-1 mb-4'> Cập nhật thông tin </button></Link>
          <ul className='d-flex flex-column gap-3 mt-3 flex-wrap p-0'>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                person
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Mã học viên:</li>
              <li>{user?.stuID?user?.stuID:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                school
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Lớp:</li>
              <li>{user?.class?user?.class:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                celebration
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Ngày sinh:</li>
              <li>{user?.birth?user?.birth:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                wc
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Giới tính:</li>
              <li>{user?.gender?'Nam':'Nữ'}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                mail
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Email:</li>
              <li>{user?.email?user?.email:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                call
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Số điện thoại:</li>
              <li>{user?.phone?user.phone:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                home
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Địa chỉ:</li>
              <li>{user?.address?user.address:"NULL"}</li>
            </ul>
          </ul>
        </div>
        <div className='profile-page__right  col justify-content-between d-flex p-4 d-flex flex-column align-items-center'>
          <div>
            <ul className='d-flex gap-3 mt-3 flex-wrap'>
              <li>NULL</li>
              <li>NULL</li> 
              <li>NULL</li>
            </ul>
          </div>
          <button 
            className='btn btn-style-1' 
            style={{ minWidth: "200px" }}
            onClick={handelLogOut}
            > Đăng xuất </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProfilePage);
