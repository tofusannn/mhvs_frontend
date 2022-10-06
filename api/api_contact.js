import api from "./https_request";

const contact = {
  async postContact(params) {
    return await api.post({ path: "/contact", body: params });
  },
};

export default contact;
