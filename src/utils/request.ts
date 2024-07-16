import axios from "axios";

// create an axios instance
const service = axios.create({
  // baseURL: '/api/...', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // const satoken = window.sessionStorage.getItem('satoken')
    // if (satoken) {
    //   config.headers.satoken = satoken
    // } else {
    //   config.headers.satoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJhbGlwYXkiLCJsb2dpbklkIjoxNjQ4ODg2MTc0Mjc4ODA3NTU0LCJyblN0ciI6Im1wcGVsVEZDRFJBWUtUTzEwSkJYRXJZVG93T3Myd2MwIn0.J96YbKxcZ8R9qkYItFmrwf5N0gFJdzUazGJAerOZoek'
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response: any) => {
    // console.log('response', response)
    const res = response.data;

    // if the custom code is not 200, it is judged as an error.
    // if (res?.errorCode !== 200)
    //   return Promise.reject(new Error(res.message || "Error"));

    if (res?.data?.error)
      return Promise.reject(new Error(res?.data?.description || "Error"));

    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
