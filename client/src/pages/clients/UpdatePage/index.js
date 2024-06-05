import { memo } from "react";
import { Link } from "react-router-dom";
import {registerGif} from "../../../components/imageRender";
import { useSelector } from "react-redux";
import './style.css';

const UpdatePage = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <>
      <div className="register-page position-relative">
        <form className="col-5 d-flex gap-3 flex-column align-items-center justify-content-center p-5 shadow-lg rounded-end overflow-auto position-absolute">
          <h2>Cập nhật thông tin</h2>
          <div className="form__create-client gap-3 d-flex flex-column w-100 p-5 pt-0 pb-0">
            <div>
              <label htmlFor="create-client-name" className='form-label'>Họ và tên</label>
              <input type="text" id="create-client-name" className='form-control' placeholder={user?.name ? user?.name : "Họ và tên"} />
            </div>
            <div className="create-client">
              <label htmlFor="create-client-id" className='form-label'>Mã học viên</label>
              <input type="text" id="create-client-id" className='form-control' placeholder={user?.stuID ? user?.stuID : "Mã học viên"} />
            </div>
            <div className="row g-0 gap-3 d-flex align-items-center justify-content-between w-100">
              <div className="col-5 ">
                  <label htmlFor="birth" className='col col-form-label'>Ngày sinh</label>
                  <input type="date" id="birth" className='col form-control' placeholder={user?.birth ? user?.birth : ""} />
              </div>
              <div className="col-5">
                  <label htmlFor="gender" className='col col-form-label' placeholder={user?.gender ? user?.gender : ""}>Giới tính</label>
                  <select id="gender" className='col form-control'>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
              </div>
            </div>
            <div>
              <label htmlFor="create-email" className='form-label'>Email</label>
              <input type="email" id="create-email" className='form-control' placeholder={user?.email ? user?.email : "Email"} />
            </div>
            <div>
              <label htmlFor="phone" className='form-label'>Số điện thoại</label>
              <input type="text" id="phone" className='form-control' placeholder={user?.phone ? user?.phone : "Số điện thoại"} />
            </div>
            <div>
              <label htmlFor="address" className='form-label'>Địa chỉ</label>
              <input type="text" id="address" className='form-control' placeholder={user?.address ? user?.address : "Địa chỉ"} />
            </div>
          </div>
          <div className="d-flex gap-4 mt-3" >
            <button type="submit" className='btn btn-style-1' style={{ minWidth: '120px' }}>Cập nhật</button>
            <Link className='btn btn-style-2' to="/client/profile" style={{ minWidth: '120px' }}>Hủy</Link>
          </div>
        </form >
        <img src={registerGif} alt="register" className='gif-update position-absolute right-0'></img>
      </div >
    </>
  );
})

export default UpdatePage