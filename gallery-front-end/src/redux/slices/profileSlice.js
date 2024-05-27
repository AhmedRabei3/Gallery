import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfilePhotoCreated: false,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setCreatingProfilePhoto(state) {
      state.isProfilePhotoCreated = true;
      state.loading = false;
    },
    clearProfilePhotoCreating(state) {
      state.isProfilePhotoCreated = false;
    },
    deleteImageFromProfile(state, action) {
      state.profile.images = state.profile.images.filter((img) => img._id !== action.payload);
    },
    updateProfileInfo(state , action){
      state.profile.username = action.payload.username
      state.profile.bio = action.payload.bio
    },
  },
});

const profileReduser = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReduser, profileActions };
