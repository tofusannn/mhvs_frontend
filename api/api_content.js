import api from "./https_request";

const Content = {
  async getContent(locale) {
    return await api.get({ path: `/content/${locale}` });
  },
};

export default Content;
