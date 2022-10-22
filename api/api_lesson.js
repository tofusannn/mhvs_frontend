import api from "./https_request";

const Lesson = {
  async getLessonList() {
    return await api.get({ path: "/lesson" });
  },
  async getLessonById(id) {
    return await api.get({ path: `/lesson/${id}` });
  },
  async getChapterByLessonId(id) {
    return await api.get({ path: `/chapter/${id}` });
  },
};

export default Lesson;
