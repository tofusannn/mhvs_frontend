var axios = require("axios");
const url = "https://api.aorsortoronline.org/v1";

const api = {
  async post({ path, headers, body }) {
    var config = {
      method: "post",
      url: `${url}${path}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
    };
    let payload;
    await axios(config)
      .then(function (response) {
        payload = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return payload;
  },

  async get({ path, headers, body }) {
    var config = {
      method: "get",
      url: `${url}${path}`,
      headers: { accept: "application/json", ...headers },
      data: body,
    };
    let payload;
    await axios(config)
      .then(function (response) {
        payload = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return payload;
  },

  async put({ path, headers, body }) {
    var config = {
      method: "put",
      url: `${url}${path}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
    };
    let payload;
    await axios(config)
      .then(function (response) {
        payload = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return payload;
  },

  async upload({ path, headers, body }) {
    var formData = new FormData();
    formData.append("file", body);
    var config = {
      method: "post",
      url: `${url}${path}`,
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
        ...headers,
      },
      data: formData,
    };
    let payload;
    await axios(config)
      .then(function (response) {
        payload = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return payload;
  },
};

export default api;
