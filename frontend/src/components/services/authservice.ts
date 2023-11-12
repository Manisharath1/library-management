import User from "@/model/User";
import { UserRole } from "@/model/UserRole";
import axios from "./api";

const BASE_URL = "/login";
const noauth = { noauth: true };

export function isAuthenticate() {
  if (!localStorage.getItem("key")) {
    return false;
  }

  return true;
}

export function storeKey(key: string) {
  localStorage.setItem("key", key);
}

export function loginUser(login: { username: string; password: string }) {
  return axios.post(BASE_URL, login, { headers: { ...noauth } });
}

export function currentUser() {
  return axios.get(`${BASE_URL}/user`);
}

export function returnHomeUrl(user: User) {
  return user.role === UserRole[UserRole.ADMIN]
    ? "/library/dashboard"
    : "/library/user/home";
}
