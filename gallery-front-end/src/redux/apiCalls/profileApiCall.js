import { profileActions } from "../slices/profileSlice";
import { request } from "../../utils/requests";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import { AxiosError } from "axios";

export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload Profile photo
export function uploadProfilePhoto(photo) {
  return async (dispatch) => {
    try {
      const res = localStorage.getItem("userInfo");
      const { data } = await request.post(`/api/users/profile`, photo, {
        headers: {
          Authorization: `Bearer ${JSON.parse(res).token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      dispatch(profileActions.setCreatingProfilePhoto());
      setTimeout(
        () => dispatch(profileActions.clearProfilePhotoCreating()),
        2000
      );
      toast.success(data.message);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update profile info
export function updateProfile(profileId, userInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${profileId}`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );

      dispatch(profileActions.updateProfileInfo(data.user));
      dispatch(authActions.setUpdateUsername(data.user));
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.user?.username;
      user.bio = data?.user?.bio;
      localStorage.setItem("userInfo", JSON.stringify(user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteAccount(profileId){
  return async (dispatch , getState) =>{
    try {
      await request.delete(`/api/users/profile/${profileId}`,{
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        }
      })
      dispatch(authActions.logout());
      localStorage.removeItem("userInfo");
      toast.success("Your account has been Delted ");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message
        ,AxiosError.response.data.message
      )
    }
  }
}
