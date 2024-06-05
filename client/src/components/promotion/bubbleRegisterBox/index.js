import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../api/apiRequest";
import { getAllUsers } from "../../../api/apiRequest";
import { useSelector } from "react-redux";


const BubbleRegisterBox = memo(({ onClose }) => {
  const closeRef = useRef(null);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    const closeButton = closeRef.current;
    if (closeButton) {
      closeButton.addEventListener("click", () => setIsVisible(false));
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (closeButton) {
        closeButton.removeEventListener("click", () => setIsVisible(false));
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAnimationEnd = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const user = useSelector((state) => state.auth.login.currentUser);

  const [name, setName] = useState('')
  const [stuID, setStuID] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault()
    const newUser = {
      name,
      stuID,
      email,
      username,
      password,
      phone,
      address
    }
    registerUser(newUser,dispatch,navigate)
    .then(
      () => {
        getAllUsers(user?.accessToken, dispatch)
      }
    )
    .catch((error) => console.error("Error deleting user: ", error));
  }

  return (
    <div
      id="registerBox"
      className='row g-0 h-100 w-100 justify-content-center align-content-center position-absolute'
      style={{ zIndex: '1000', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex' }}
      onAnimationEnd={handleAnimationEnd}
    >
      <form
        ref={formRef}
        className={`position-relative shadow rounded-4 d-flex flex-column justify-content-center align-items-center overflow-auto p-5  ${isVisible ? 'fade-in' : 'fade-out'}`}
        style={{ background: "white", zIndex: '1000', width: '40%', height: '90vh' }}
        onSubmit={handelRegister}
      >
        <button
          ref={closeRef}
          className="btn-close bg-danger position-absolute top-0 end-0 m-3 p-2 rounded-2"
          id="btnClose"
        ></button>
        <h2>Create account</h2>
        <div className="w-100">
          <div className="row">
            <div className="mb-3 col-6">
              <label htmlFor="inputUsername" className="col-form-label">Username</label>
              <input type="text" className="form-control" id="inputUsername" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="inputPassword" className="col-form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputID" className="form-label">Student ID</label>
            <input type="text" className="form-control" id="inputID" onChange={(e) => setStuID(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="row">
            <div className="mb-3 col-4">
              <label htmlFor="inputPhone" className="form-label">Phone number</label>
              <input type="text" className="form-control" id="inputPhone" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3 col">
              <label htmlFor="inputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp"  onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress"  onChange={(e) => setAddress(e.target.value)}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-75">Create</button>
      </form>
    </div>
  );
});

export default BubbleRegisterBox;
