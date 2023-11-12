import axios from "./api";

const BASE_URL = "/admin/dashboard";

export function getDashboardDetails() {
  return axios.get(BASE_URL);
}
