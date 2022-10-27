import Cookies from "js-cookie";
import api from "./https_request";
const upload = {
  async upload(params) {
    const token = Cookies.get("token");
    return await api.upload({
      path: "/file",
      headers: { token: token },
      body: params,
    });
  },
  async show(params) {
    const token = Cookies.get("token");
    return await api.get({
      path: `/file/${params}`,
      headers: { token: token },
    });
  },
  async download(params) {
    const token = Cookies.get("token");
    return await api.get({
      path: `/download_file/${params}`,
      headers: { token: token },
    });
  },
};

export default upload;
