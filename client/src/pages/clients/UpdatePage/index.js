import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerGif } from "../../../components/imageRender";
import { useSelector } from "react-redux";
import { updateUser } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";

import './style.css';

const UpdatePage = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [name, setName] = useState('')
  const [stuID, setStuID] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('true');
  const [birth, setBirth] = useState('');
  const [major, setMajor] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelUpdate = async (e) => {
    e.preventDefault();
    const id = user?._id;
    
    const newUser = {
      name,
      stuID,
      email,
      phone,
      address,
      gender,
      birth,
      major
    };
  
    if (window.confirm("Bạn có muốn cập nhật?")) {
      try {
        await updateUser(id, user?.accessToken, dispatch, newUser);
        
        alert("Cập nhật thành công");
        navigate('/client/profile')
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    }
  };
  

  return (
    <>
      <div className="register-page position-relative">
        <form
          className="col-5 d-flex gap-3 flex-column align-items-center justify-content-center p-5 shadow-lg rounded-end overflow-auto position-absolute"
          onSubmit={handelUpdate}
        >
          <h2>Cập nhật thông tin</h2>
          <div className="gap-3 d-flex flex-column w-100 p-5 pt-0 pb-0">
            <div>
              <label htmlFor="up-name" className='form-label'>Họ và tên</label>
              <input type="text" id="up-name" className='form-control' placeholder="Họ và tên" defaultValue={user?.name ? user?.name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row g-0 gap-3 d-flex align-items-center justify-content-between w-100">
              <div className="col">
                <label htmlFor="up-stuID" className='form-label'>Mã học viên</label>
                <input type="text" id="up-stuID" className='form-control' placeholder="Mã học viên" defaultValue={user?.stuID ? user?.stuID : ""}
                  onChange={(e) => setStuID(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="up-major" className='form-label'>Chuyên ngành</label>
                <input type="text" id="up-major" className='form-control'
                  placeholder="Chuyên ngành" defaultValue={user?.major ? user?.major : ""}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>
            </div>
            <div className="row g-0 gap-3 d-flex align-items-center justify-content-between w-100">
              <div className="col ">
                <label htmlFor="up-birth" className='col col-form-label'>Ngày sinh</label>
                <input type="date" id="up-birth" className='col form-control' defaultValue={user?.birth ? user?.birth : ""} onChange={(e) => setBirth(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="up-gender" className='col col-form-label'>Giới tính</label>
                <select id="up-gender" className='col form-control' defaultValue={user?.gender} onChange={(e) => setGender(e.target.value)}>
                  <option value= {true} >Nam</option>
                  <option value= {false} >Nữ</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="up-email" className='form-label'>Email</label>
              <input type="email" id="up-email" className='form-control' placeholder="Email" defaultValue={user?.email ? user?.email : ""} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="up-phone" className='form-label'>Số điện thoại</label>
              <input type="text" id="up-phone" inputMode="numeric" className='form-control' placeholder="Số điện thoại" defaultValue={user?.phone ? user?.phone : ""} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label htmlFor="up-address" className='form-label'>Địa chỉ</label>
              <input type="text" id="up-address" className='form-control' placeholder="Địa chỉ" defaultValue={user?.address ? user?.address : ""} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="d-flex gap-4 mt-3" >
            <button
              type="submit" className='btn btn-style-1' style={{ minWidth: '120px' }}>Cập nhật</button>
            <Link className='btn btn-style-2' to="/client/profile" style={{ minWidth: '120px' }}>Hủy</Link>
          </div>
        </form >
        <img src={registerGif} alt="register" className='gif-update position-absolute right-0'></img>
      </div >
    </>
  );
})

export default UpdatePage