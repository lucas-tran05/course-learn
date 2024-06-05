import React, { memo, useState, useEffect } from "react";
import BubbleRegisterBox from "../../../components/promotion/bubbleRegisterBox/index.js";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../../api/apiRequest.js";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../../api/apiRequest.js";

const HomePageAdmin = memo(() => {
  // Logic show and hidden
  const [showRegisterBox, setShowRegisterBox] = useState(false);
  const handleAddNewUserClick = () => {
    setShowRegisterBox(true);
  };

  const handleCloseRegisterBox = () => {
    setShowRegisterBox(false);
  };

  // Redux
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.user.users?.allUsers);

  useEffect(() => {
    if (!user) {
      navigate("/client/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, []);

  const handleRemove = (id) => {
    if (window.confirm("Bạn có muốn xoá người dùng này ?")) {
      deleteUser(id, user?.accessToken, dispatch)
        .then(
          () => {
            getAllUsers(user?.accessToken, dispatch)
          }
        )
        .catch((error) => console.error("Error deleting user: ", error));
    }
  }

  const handelLogOut = (id, accessToken) => {
    logOutUser(dispatch, id, navigate, accessToken);
  }

  return (
    <>
      {showRegisterBox && <BubbleRegisterBox onClose={handleCloseRegisterBox} />}
      <div className="row g-0 w-100 justify-content-center home-admin" style={{ minHeight: "100dvh" }}>
        <div className="col-11 m-3 shadow rounded-4 p-5">
          <div className="table-responsive d-flex align-items-center flex-column">
            <table className="table table-striped table-hover rounded-4 align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataUser?.map((user, index) => (
                  <tr key={user?.stuID}>
                    <td>{index + 1}</td>
                    <td>{user?.stuID}</td>
                    <td>{user?.username}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.admin ? 'admin' : 'user'}</td>
                    <td className="d-flex justify-content-center gap-3">
                      <button className="btn btn-primary">Review</button>
                      <button className="btn btn-success">Update</button>
                      <button className="btn btn-danger" onClick={() => handleRemove(user._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex gap-3">
              <button onClick={handleAddNewUserClick} className="btn btn-primary d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">
                  add_circle
                </span>
                Add new user
              </button>
              <button onClick={() => handelLogOut(user?._id, user?.accessToken)} className="btn btn-danger d-flex align-items-center gap-2">
                <span className="material-symbols-outlined">
                  logout
                </span>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default HomePageAdmin;
