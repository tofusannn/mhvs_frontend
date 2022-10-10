import api from "./https_request";

const Count = {
  async getCount() {
    return await api.get({ path: "/page_stat" });
  },
};

export default Count;
