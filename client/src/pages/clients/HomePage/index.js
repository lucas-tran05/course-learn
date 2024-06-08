import { memo } from "react";
import Header from "../../../layouts/header/index";
import { Link } from "react-router-dom";
import './style.css';
import { courseList } from "../../../services/getCourses";
import { courseIMG } from "../../../components/imageRender";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = memo(() => {
  const listCourse = courseList();
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  if(!user){
    navigate("/client/login");
  }
  return (
    <>
      <Header />
      <div className="home-page container-fluid d-flex justify-content-center mb-4 fix-header">
        <div className="p-5 shadow rounded-4">
          <h3 className="font-weight-bold">Danh khóa học</h3>
          <div className="container-fluid row gy-5 align-items-center justify-content-around m-0">
            {
              listCourse.map((course) => {
                return (
                  <div className="card col-3 p-4" style={{ width: '30%' }}>
                    <img alt='course' className="card-img-top rounded-2 border border-1" style={{ width: '100%', height: 'calc(50/100 * 30/100* 100vw)', objectFit: 'cover' }} src={course.img !== '' ?course.img: courseIMG}></img>
                    <div className="card-body">
                      <h5 className="card-title">{course.courseName}</h5>
                      <p className="card-text d-flex gap-2"><p style={{ fontWeight: '500' }}>Fee: </p> {course.cost}</p>
                      <Link to={{ pathname: `/client/course/${course._id}` }} className="btn btn-style-1 mt-3">Đăng ký ngay</Link>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </>
  );
});

export default HomePage;