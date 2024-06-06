import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../api/apiRequest";
import { getAllUsers } from "../../../api/apiRequest";
import { useSelector } from "react-redux";


const BubbleRegisterBox = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [name, setName] = useState('')
  const [stuID, setStuID] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('true');
  const [birth, setBirth] = useState('');
  const [major, setMajor] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault()
    const newUser = {
      name,
      stuID,
      email,
      username,
      major,
      password,
      phone,
      address,
      gender,
      birth
    }
    registerUser(newUser, dispatch, navigate)
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
      style={{ zIndex: '1000', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'none' }}
    >
      <button
        className="btn-style-close rounded-4 position-absolute top-0 end-0 d-flex justify-content-center align-items-center mt-3 me-3 p-3"
        onClick={() => document.getElementById('registerBox').style.display = 'none'}
        style={{ zIndex: '1000', width: '50px', height: '50px' }}
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
      <form
        className={`position-relative shadow rounded-4 d-flex flex-column justify-content-center align-items-center overflow-auto p-5`}
        style={{ background: "white", zIndex: '1000', width: '40%', height: '95vh' }}
        onSubmit={handelRegister}
      >

        <h2>Create account</h2>
        <div className="w-100">
          <div className="row">
            <div className="mb-2">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input type="text" className="form-control" id="inputName" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2 col-6">
              <label htmlFor="inputUsername" className="col-form-label">Username</label>
              <input type="text" className="form-control" id="inputUsername" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-2 col-6">
              <label htmlFor="inputPassword" className="col-form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col">
              <label htmlFor="inputID" className="form-label">Student ID</label>
              <input type="text" className="form-control" id="inputID" onChange={(e) => setStuID(e.target.value)} />
            </div>
            <div className="mb-2 col">
              <label htmlFor="inputMajor" className="form-label">Major</label>
              <input type="text" className="form-control" id="inputMajor" onChange={(e) => setMajor(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col">
              <label htmlFor="inputPhone" className="form-label">Phone number</label>
              <input type="text" className="form-control" id="inputPhone" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-2 col">
              <label htmlFor="inputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="row g-0 gap-3 d-flex align-items-center justify-content-between w-100">
          <div className="col-5">
            <label htmlFor="gender" className='col col-form-label' >Giới tính</label>
            <select id="gender" className='col form-control' onChange={(e) => setGender(e.target.value)}>
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>
          <div className="col-6 ">
            <label htmlFor="birth" className='col col-form-label'>Ngày sinh</label>
            <input type="date" id="birth" className='col form-control' onChange={(e) => setBirth(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn mt-5 btn-primary w-75">Create</button>
      </form>
    </div>
  );
});

export default BubbleRegisterBox;
