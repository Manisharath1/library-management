import Notification from "@/model/Notification";
import axios from "./api";

const BASE_URL = "/notification";

export function getAllNotification() {
    return axios.get(BASE_URL);
}

export function createNotification(notification: Notification) {
    return axios.post(BASE_URL, notification);
}

export function markAsReadNotification(receiverUserId: string) {
    return axios.post(`${BASE_URL}/${receiverUserId}`);
}

export function getAllUnreadNotifications() {
    return axios.get(`${BASE_URL}/user/unread`);
}

export function getAllReadNotifications(receiverUserId: string) {
    return axios.post(`${BASE_URL}/${receiverUserId}/read`);
}