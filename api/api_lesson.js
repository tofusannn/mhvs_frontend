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
  async postUserLesson(id) {
    const token = Cookies.get("token");
    return await api.post({
      path: "/user_lesson",
      headers: { token: token },
      body: id,
    });
  },
  async postUserLessonState(params) {
    const token = Cookies.get("token");
    return await api.post({
      path: "/user_lesson_state",
      headers: { token: token },
      body: params,
    });
  },
  async getUserLessonList() {
    const token = Cookies.get("token");
    return await api.get({ path: "/user_lesson", headers: { token: token } });
  },
};

export default Lesson;
