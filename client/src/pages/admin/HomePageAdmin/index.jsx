import React, { memo, useEffect, useState } from "react";
import BubbleRegisterBox from "../../../components/actions/bubbleRegisterBox/index";
import BubbleReviewBox from "../../../components/actions/bubbleReviewBox/index";
import BubbleUpdateBox from "../../../components/actions/bubbleUpdateBox/index";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, logOutUser } from "../../../api/apiRequest";
import { useNavigate, Link } from "react-router-dom";

const HomePageAdmin = memo(() => {
  // Redux
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.user.users?.allUsers);

  const [currentID, setCurrentID] = useState(null);
  const [boxType, setBoxType] = useState(null); // 'review' or 'update'

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch);
    }
  }, [user, dispatch, navigate]);

  const handleRemove = (id) => {
    if (window.confirm("Bạn có muốn xoá người dùng này ?")) {
      deleteUser(id, user?.accessToken, dispatch)
        .then(() => {
          getAllUsers(user?.accessToken, dispatch);
        })
        .catch((error) => console.error("Error deleting user: ", error));
    }
  };

  const handleLogOut = (id, accessToken) => {
    logOutUser(dispatch, id, navigate, accessToken);
  };

  const showReviewBox = (userId) => {
    setCurrentID(userId);
    setBoxType("review");
  };

  const showUpdateBox = (userId) => {
    setCurrentID(userId);
    setBoxType("update");
  };

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
    <>
      <BubbleRegisterBox />
      {boxType === "review" && (
        <BubbleReviewBox key={currentID} userId={currentID} />
      )}
      {boxType === "update" && (
        <BubbleUpdateBox key={currentID} userId={currentID} />
      )}
      <div
        className="row g-0 w-100 justify-content-center home-admin"
        style={{ minHeight: "100dvh" }}
      >
        <div className="child-page-style col-11 m-3 shadow rounded-4 p-5 position-relative">
          <span id="darkMode" class="material-symbols-outlined position-absolute top-0 end-0 p-3" onClick={changeBackground} style={{cursor: 'pointer'}}>dark_mode</span>
          <div className="table-responsive-lg d-flex align-items-center flex-column">
            <table className="table table-striped table-hover rounded-4 align-middle text-center" >
              <thead >
                <tr>
                  <th scope="col-1">Order</th>
                  <th scope="col-xl-2">Student ID</th>
                  <th scope="col-xl-2">Username</th>
                  <th scope="col-xl-3">Name</th>
                  <th scope="col-xl-3">Email</th>
                  <th scope="col-xl-1">Role</th>
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
                    <td>{user?.admin ? "admin" : "user"}</td>
                    <td className="d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => showReviewBox(user._id)}
                      >
                        Review
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => showUpdateBox(user._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(user._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex gap-3">
              <button
                onClick={() =>
                  (document.getElementById("registerBox").style.display =
                    "flex")
                }
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add new user
              </button>
              <Link
                to="/client/home"
                className="btn btn-secondary d-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
                To view users
              </Link>
              <button
                onClick={() => handleLogOut(user?._id, user?.accessToken)}
                className="btn btn-danger d-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined">logout</span>
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
