import Cookies from "js-cookie";
import api from "./https_request";

const Notification = {
  async getNotification(lg) {
    const token = Cookies.get("token");
    return await api.get({
      path: `/notification/${lg}`,
      headers: { token: token },
    });
  },
  async putNotification(id) {
    const token = Cookies.get("token");
    return await api.put({
      path: `/notification/${id}`,
      headers: { token: token },
    });
  },
};

export default Notification;
