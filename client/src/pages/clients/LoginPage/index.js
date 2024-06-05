import React , { useState } from 'react';
import { memo } from 'react';
import { logo, loginIMG } from '../../../components/imageRender';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../api/apiRequest';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password
    };
    loginUser(newUser, dispatch, navigate);
  }

  return (
    <div className="login-page container-fluid d-flex justify-content-center align-items-center position-relative">
      <img src={loginIMG} alt="logo" className='position-absolute bottom-0 right-0 w-100 left-0' style={{filter: 'blur(2px)' }}></img>
      <form 
        className="login-page__form col-3 d-flex gap-3 flex-column align-items-center justify-content-center shadow-lg rounded-4 p-5" 
        style={{ zIndex: 100, background: 'rgba(255, 255, 255)' }}
        onSubmit={handelLogin}
        >
        <img className='bg-transparent mt-3 border-none rounded justify-self-center' draggable="false" src={logo} alt="logo" style={{ width: '50px' }} />
        <h4>Đăng nhập</h4>
        <div className="w-100 p-3 pb-0 pt-0">
          <div className="mb-3">
            <label htmlFor="username" className='form-label'>Tài khoản</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='form-label'>Mật khẩu</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className='form-control' 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="checkbox"></input>
            <label className="form-check-label" htmlFor="checkbox">Nhớ tôi</label>
          </div>
          <button type="submit" className="btn btn-style-1 w-100">Đăng nhập </button>
        </div>
        <p>Hoặc</p>
        <Link to="/client/register" className='w-100 p-3 pt-0 pb-0'><button className="btn btn-style-2 w-100">Đăng ký </button></Link>
      </form>
    </div>
  )
};

export default memo(LoginPage);
