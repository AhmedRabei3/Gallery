import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    imagesCount: null,
    loading: false,
    isImageCreated: false,
    image: null,
  },
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
    setImagesCount(state, action) {
      state.imagesCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setCreatingImage(state) {
      state.isImageCreated = true;
      state.loading = false;
    },
    setSingleImage(state, action) {
      state.image = action.payload;
    },
    setLike(state, action) {
      if (state !== null) {
        state.image.likes = action.payload.likes;
      }
    },
    updatImage(state, action) {
      state.image.title = action.payload.title;
      state.image.description = action.payload.description;
    },
    clearImageCreating(state) {
      state.isImageCreated = false;
    },
    deleteImage(state, action) {
      state.images = state.images.filter((img) => img._id !== action.payload);
    },
  },
});

const imagesReduser = imagesSlice.reducer;
const imagesActions = imagesSlice.actions;

export { imagesReduser, imagesActions };
