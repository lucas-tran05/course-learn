import { Routes, Route } from "react-router-dom";
import { ROUTER } from './router.js';
import HomePage from '../pages/clients/HomePage/index.js';
import ProfilePage from "../pages/clients/ProfilePage/index.js";
import HomePageAdmin from '../pages/admin/HomePageAdmin/index.js';
import LoginPage from "../pages/clients/LoginPage/index.js";
import RegisterPage from "../pages/clients/RegisterPage/index.js";
import ClassPage from "../pages/clients/ClassPage/index.js";
import ExercisePage from "../pages/clients/ExercisePage/index.js";
import UpdatePage from "../pages/clients/UpdatePage/index.js";


const renderUserRouter = () => {
  const clientRouters = [
    {
      path: ROUTER.CLIENT.HOME,
      component: <HomePage />
    },
    {
      path: ROUTER.CLIENT.PROFILE,
      component: <ProfilePage />
    },
    {
      path: ROUTER.CLIENT.CLASS,
      component: <ClassPage />
    },
    {
      path: ROUTER.CLIENT.EXERCISE,
      component: <ExercisePage />
    },
    {
      path: ROUTER.CLIENT.UPDATE,
      component: <UpdatePage />

    }
  ]

  return (
    <Routes>
      {
        clientRouters.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={item.component}
            />
          )
        })
      }
    </Routes>
  )
}

const renderAdminRouter = () => {
  const adminRouters = [
    {
      path: ROUTER.ADMIN.HOME,
      component: <HomePageAdmin />
    },

  ]

  return (
    <Routes>
      {
        adminRouters.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={item.component}
            />
          )
        })
      }
    </Routes>
  )
}

const renderAuthRouter = () => {
  const authRouter = [
    {
      path: ROUTER.CLIENT.LOGIN,
      component: <LoginPage />
    },
    {
      path: ROUTER.CLIENT.REGISTER,
      component: <RegisterPage />
    }]
  return (
    <Routes>
      {
        authRouter.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              element={item.component}
            />
          )
        })
      }
    </Routes>
  )
}


export { renderUserRouter, renderAdminRouter, renderAuthRouter }