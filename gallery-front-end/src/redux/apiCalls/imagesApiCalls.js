import { request } from "../../utils/requests";
import { imagesActions } from "../slices/imageSlice";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlice";

// get all images
export function getAllImages(page) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/images?pageNumber=${page}`);

      dispatch(imagesActions.setImages(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}
// crate new image
export function createNewImage(image) {
  return async (dispatch, getState) => {
    try {
      dispatch(imagesActions.setLoading());
      await request.post(`/api/images`, image, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(imagesActions.setCreatingImage());
      setTimeout(() => dispatch(imagesActions.clearImageCreating()), 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(imagesActions.clearLoading());
    }
  };
}

// toggle like
export function toggleLike(imageId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/images/likes/${imageId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      dispatch(imagesActions.setLike(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
}

// get single image
export function getSingleImage(imageId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/images/${imageId}`);
      dispatch(imagesActions.setSingleImage(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

// update Image info
export function updateImageInfo(imageId, newImageInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/images/${imageId}`,
        newImageInfo,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      dispatch(imagesActions.updatImage(data));
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

export function deleteImageCall(imageId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      dispatch(imagesActions.deleteImage(data.imageId));
      dispatch(profileActions.deleteImageFromProfile(data.imageId));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };
}

// get images count
export function getImagesCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/images/count");
      dispatch(imagesActions.setImagesCount(data));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}
