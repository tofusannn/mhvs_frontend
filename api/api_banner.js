import api from "./https_request";

const BannerService = {
  async getBanner(locale) {
    return await api.get({ path: `/banner/${locale}` });
  },
};

export default BannerService;
