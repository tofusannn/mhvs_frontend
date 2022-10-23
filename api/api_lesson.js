import api from "./https_request";
import Cookies from "js-cookie";

const Lesson = {
  async getLessonList() {
    return await api.get({ path: "/lesson" });
  },
  async getLessonById(id) {
    return await api.get({ path: `/lesson/${id}` });
  },
  async getChapterByLessonId(id) {
    const token = Cookies.get("token");
    return await api.get({ path: `/chapter/${id}`, headers: { token: token } });
  },
};

export default Lesson;
