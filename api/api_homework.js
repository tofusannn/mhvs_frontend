import Cookies from "js-cookie";
import api from "./https_request";

const Homework = {
  async getUserHomework(lg) {
    const token = Cookies.get("token");
    return await api.get({ path: `/user_homework/${lg}`, headers: { token: token } });
  },
  async postUserHomework(params) {
    const token = Cookies.get("token");
    return await api.post({
      path: "/user_homework",
      headers: { token: token },
      body: params,
    });
  },
};

export default Homework;
