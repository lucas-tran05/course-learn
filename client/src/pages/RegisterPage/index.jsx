import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logo, loginIMG} from '../../components/imageRender'
import { useState } from 'react'
import { registerUser } from '../../api/apiRequest'
import './style.css'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [stuID, setStuID] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault()
    const newUser = {
      name,
      stuID,
      email,
      username,
      password
    }
    if(registerUser(newUser,dispatch,navigate)){
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }
  return (
    <>
      <div className="register-page position-relative">
        <Link to="/login">
          <button className='btn btn-style-1 position-absolute left-0 mt-5 rounded-end-4 rounded-start-0 p-2 shadow-sm' style={{ minWidth: '150px', zIndex: '10000'}}> Đăng nhập</button>
        </Link>
        <form 
        className="col-lg-5 offset-lg-7 col-sm-8 offset-sm-4 col-12 d-flex gap-2 flex-column align-items-center justify-content-center p-4 shadow-lg rounded-start overflow-auto"
        onSubmit={handelRegister}
        >
          <img src={logo} alt="logo" className='bg-transparent mb-2 border-none rounded-2' draggable="false" style={{ width: '50px'}} />
          <h2>Đăng kí tài khoản</h2>
          <div className="form__create-client w-75 gap-3 d-flex flex-column">
            <div>
              <label htmlFor="create-client-name" className='form-label'>Họ và tên</label>
              <input type="text" id="create-client-name" placeholder="Họ và tên" className='form-control' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="create-client">
              <label htmlFor="create-client-id" className='form-label'>Mã học viên</label>
              <input type="text" id="create-client-id" placeholder="Mã học viên" className='form-control' onChange={(e) => setStuID(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="create-email" className='form-label'>Email</label>
              <input type="email" id="create-email" placeholder="Email"  className='form-control' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="create-username" className='form-label'>Tên đăng nhập</label>
              <input type="text" id="create-username" placeholder="Tên đăng nhập"  className='form-control' onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="create-password" className='form-label'>Mật khẩu</label>
              <input type="password" id="create-password" placeholder="Mật khẩu" className='form-control' onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button type="submit" className='btn btn-style-1 mt-4'>Đăng kí tài khoản</button>
        </form>
      </div>
    </>
  );
};

export default memo(RegisterPage);