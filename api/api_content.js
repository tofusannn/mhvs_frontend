import api from "./https_request";

const Content = {
  async getContent() {
    return await api.get({ path: "/content" });
  },
};

export default Content;
