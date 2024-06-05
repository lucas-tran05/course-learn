import { memo } from "react";
import { useSelector } from "react-redux";
import { clientIMG} from "../../../components/imageRender";


const BubbleReviewBox = memo(() => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <div
      id="reviewBox"
      className='row g-0 h-100 w-100 justify-content-center align-content-center position-absolute'
      style={{ zIndex: '1000', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'none' }}
    >
      <button
        className="btn-style-close rounded-4 position-absolute top-0 end-0 d-flex justify-content-center align-items-center mt-3 me-3 p-3"
        onClick={() => document.getElementById('reviewBox').style.display = 'none'}
        style={{ zIndex: '1000', width: '50px', height: '50px' }}
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </button>
      <div className='rounded-4 profile-page__left col-4 overflow-auto text-center p-5 shadow p-0 m-0 w-content' style={{ zIndex: '1000' , backgroundColor: 'white'}}>
          <img src={user?.avatar ? user?.avatar : clientIMG} alt="avatar" className='rounded-circle shadow' draggable="false" style={{ width: "120px" }} />
          <h2 className='mt-4 mb-4'> {user?.name?user?.name:"NULL"} </h2>
          <ul className='d-flex flex-column gap-3 mt-3 flex-wrap p-0'>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                person
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Mã học viên:</li>
              <li>{user?.stuID?user?.stuID:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                school
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Chuyên ngành:</li>
              <li>{user?.major?user?.major:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                celebration
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Ngày sinh:</li>
              <li>{user?.birth?user?.birth:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                wc
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Giới tính:</li>
              <li>{user?.gender?'Nam':'Nữ'}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                mail
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Email:</li>
              <li>{user?.email?user?.email:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                call
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Số điện thoại:</li>
              <li>{user?.phone?user.phone:"NULL"}</li>
            </ul>
            <ul className='d-flex gap-2'>
              <span className="material-symbols-outlined">
                home
              </span>
              <li className='list__item--title' style={{fontWeight: 'bold'}}>Địa chỉ:</li>
              <li>{user?.address?user.address:"NULL"}</li>
            </ul>
          </ul>
        </div>
    </div>
  );
});

export default BubbleReviewBox;
