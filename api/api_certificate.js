import Cookies from "js-cookie";
import api from "./https_request";

const certificate = {
  async getQuestCertificate(params) {
    const token = Cookies.get("token");
    return await api.get({
      path: "/questionnaire_cer",
      headers: { token: token },
    });
  },
  async postUserQuestCertificate(params) {
    const token = Cookies.get("token");
    return await api.post({
      path: "/user_questionnaire_cer",
      headers: { token: token },
      body: params,
    });
  },
  async getCertificate(id) {
    const token = Cookies.get("token");
    return await api.get({
      path: `/certificate/${id}`,
      headers: { token: token },
    });
  },
};

export default certificate;
