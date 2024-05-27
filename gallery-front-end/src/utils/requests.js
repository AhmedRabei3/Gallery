import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:8000",
});

export const LOGIN_URL = "/api/auth/login";
export const REGISTER_URL = "/api/auth/reg";
export const PROFILE_URL = "/api/users/profile/";
export const GET_ALL_IMAES = "/api/images"
