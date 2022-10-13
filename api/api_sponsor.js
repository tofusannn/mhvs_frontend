import api from "./https_request";

const Sponsor = {
  async getSponsor() {
    return await api.get({ path: "/sponsor" });
  },
};

export default Sponsor;
