import api from "./https_request";
import Cookies from "js-cookie";

const question = {
  async getQuestionList(id) {
    const token = Cookies.get("token");
    return await api.get({
      path: `/question/${id}`,
      headers: { token: token },
    });
  },
  async postQuestion(params) {
    const token = Cookies.get("token");
    return await api.post({
      path: "/user_question",
      headers: { token: token },
      body: params,
    });
  },
};

export default question;
