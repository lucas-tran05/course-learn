import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getAllUsers } from "../../../api/apiRequest"; // Ensure correct import path

const BubbleUpdateBox = memo(({ userId, onClose, userCurrent }) => {
  const allUsers = useSelector((state) => state.user.users?.allUsers);
  const user = allUsers?.find((u) => u._id === userId);
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const [name, setName] = useState('');
  const [stuID, setStuID] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('true');
  const [birth, setBirth] = useState('');
  const [major, setMajor] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setStuID(user.stuID || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setGender(user.gender || 'true');
      setBirth(user.birth || '');
      setMajor(user.major || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      stuID,
      email,
      username,
      major,
      phone,
      address,
      gender,
      birth,
    };

    try {
      await updateUser(userId, currentUser?.accessToken, dispatch, updatedUser);
      await getAllUsers(currentUser?.accessToken, dispatch);
      alert("User updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating user: ", error);
      alert("Failed to update user. Please try again.");
    }
  };

  if (!user) return null;

  onClose = () => {
    document.getElementById(`updateBox-${userId}`).style.display = 'none';
  }

  return (
    <div
      id={`updateBox-${userId}`}
      className='row g-0 h-100 w-100 justify-content-center align-content-center position-absolute'
      style={{ zIndex: '1000', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <button
        className="btn-style-close rounded-4 position-absolute top-0 end-0 d-flex justify-content-center align-items-center mt-3 me-3 p-3"
        onClick={onClose}
        style={{ zIndex: '1000', width: '50px', height: '50px' }}
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
      <form
        className='position-relative shadow rounded-4 d-flex flex-column justify-content-center align-items-center overflow-auto p-5'
        style={{ background: "white", zIndex: '1000', width: '40%', height: '95vh' }}
        onSubmit={handleUpdate}
      >
        <h2>Update User</h2>
        <div className="w-100">
          <div className="row">
            <div className="mb-2">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input type="text" value={name} className="form-control" id="inputName" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2 col">
              <label htmlFor="inputUsername" className="col-form-label">Username</label>
              <input type="text" value={username} className="form-control" id="inputUsername" onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col">
              <label htmlFor="inputID" className="form-label">Student ID</label>
              <input type="text" value={stuID} className="form-control" id="inputID" onChange={(e) => setStuID(e.target.value)} />
            </div>
            <div className="mb-2 col">
              <label htmlFor="inputMajor" className="form-label">Major</label>
              <input type="text" value={major} className="form-control" id="inputMajor" onChange={(e) => setMajor(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="mb-2 col">
              <label htmlFor="inputPhone" className="form-label">Phone number</label>
              <input type="text" value={phone} className="form-control" id="inputPhone" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-2 col">
              <label htmlFor="inputEmail1" className="form-label">Email address</label>
              <input type="email" value={email} className="form-control" id="inputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" value={address} className="form-control" id="inputAddress" onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="row g-0 gap-3 d-flex align-items-center justify-content-between w-100">
          <div className="col-5">
            <label htmlFor="gender" className='col col-form-label'>Gender</label>
            <select id="gender" className='col form-control' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>
          <div className="col-6 ">
            <label htmlFor="birth" className='col col-form-label'>Date of Birth</label>
            <input type="date" id="birth" className='col form-control' value={birth} onChange={(e) => setBirth(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn mt-5 btn-success w-75">Update</button>
      </form>
    </div>
  );
});

export default BubbleUpdateBox;
