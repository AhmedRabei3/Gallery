import { authActions } from "../slices/authSlice";
import { request, LOGIN_URL, REGISTER_URL } from "../../utils/requests";
import { toast } from "react-toastify";

// Login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(LOGIN_URL, user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
}

// Logout user
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.clear();
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(REGISTER_URL, user);
      if (data) {
        dispatch(authActions.register(data.message));
        dispatch(authActions.login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success(data.message);
      }else{
        toast.error("Somthing went wrong!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
