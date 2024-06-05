import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/refresh", {
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const axiosInstance = (user, dispatch, stateSuccess) => {
  const instance = axios.create();
  instance.interceptors.request.use(
    async (config) => {
      const decodeToken = jwtDecode(user?.accessToken);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        try {
          const data = await refreshToken();
          const refreshUser = {
            ...user,
            accessToken: data.accessToken
          };
          dispatch(stateSuccess(refreshUser));
          config.headers["Authorization"] = `Bearer ${refreshUser?.accessToken}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
