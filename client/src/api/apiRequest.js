import axios from "axios";
import {  loginStart, loginSuccess, loginFailure, 
          registerStart, registerSuccess, registerFailure, 
          logoutStart, logoutSuccess, logoutFailure 
        } from "../redux/authSlice";
import {  getUsersStart, getUsersSuccess, getUsersFailure, 
          deleteUserStart, deleteUserSuccess, deleteUserFailure 
        } from "../redux/userSlice";

const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/client/login", user);
    dispatch(loginSuccess(res.data));
    if (res.data.admin === true) {
      navigate("/admin/home");
    }
    else {
      navigate("/client/home");
    }
  } catch (err) {
    alert("Đăng nhập thất bại");
    dispatch(loginFailure());
  }
}

const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:5000/api/auth/client/register", user);
    dispatch(registerSuccess());
    alert("Đăng ký thành công");
    return true;
  } catch (err) {
    alert("Đăn ký thất bại");
    dispatch(registerFailure());
  }
}

const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://localhost:5000/api/user/get/", {
      headers: { token: `Bearer ${accessToken}` }
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
}

const deleteUser = async (id, accessToken, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`http://localhost:5000/api/user/delete/${id}`, {
      headers: { token: `Bearer ${accessToken}` }
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
    alert("Xóa thất bại!")
  }
}

const logOutUser = (dispatch,id, navigate, accessToken) => {
  dispatch(logoutStart());
  try{
    axios.post("http://localhost:5000/api/auth/logout",id, {
      headers: { token: `Bearer ${accessToken}` }
    });
    dispatch(logoutSuccess());
    localStorage.removeItem("accessToken", accessToken);
    navigate("/client/login");
  }
  catch(err){
    dispatch(logoutFailure());
  }
}

export { loginUser, registerUser, getAllUsers, deleteUser, logOutUser }