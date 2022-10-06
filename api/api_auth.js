import api from "./https_request";
import Cookies from "js-cookie";

const auth = {
  async login(params) {
    const data = await api.post({ path: "/login", headers: params });
    data.status && Cookies.set("token", data.result.token);
    return data;
  },
  async logout(params) {
    const token = Cookies.get("token");
    const data = await api.get({
      path: "/logout",
      headers: { token: params ? params : token },
    });
    data.status && Cookies.set("token", "");
    return { msg: data.msg, status: data.status };
  },
  async register(params) {
    return await api.post({ path: "/register", body: params });
  },
  async getUser(params) {
    const token = Cookies.get("token");
    return await api.get({
      path: "/user",
      headers: { token: params ? params : token },
    });
  },
  async putUser(params) {
    const token = Cookies.get("token");
    return await api.put({
      path: "/user",
      headers: { token: token },
      body: params,
    });
  },
};

export default auth;
