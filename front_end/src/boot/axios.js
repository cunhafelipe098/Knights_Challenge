import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ""
});

axios.interceptors.request.use((req) => {
  window.console.log(`${req.method} ${req.url}`);
  return req;
});

axios.interceptors.response.use((res) => {
  window.console.log("data from request ", res.data);
  return res;
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
export { axiosInstance };
