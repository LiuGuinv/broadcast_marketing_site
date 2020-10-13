import axios from 'axios';
import {message, notification} from 'antd';

let logger = {};

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不正确',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

function header(key, value) {
  axios.defaults.headers[key] = value;
}
header('Access-Control-Allow-Origin', '*');
header('Access-Control-Allow-Headers', '*');
header('Access-Control-Allow-Methods', '*');
header('Content-Type', 'application/json;charset=utf-8');

// 异常处理程序
axios.interceptors.response.use(
  response => {
    let res = (response && response.data) || '';

    try {
      window.sls.pushLog({
        url: logger?.response?.url,
        payload: JSON.stringify(logger?.response?.data || {}),
        method: logger?.response?.method,
        message: `请求成功 ${logger?.response?.url}`,
        level: res?.code === 20000 ? 'INFO' : 'DEBUG',
      });
    } catch (e) {
      console.log('接口报错咯', e);
    }
    switch (res && res.code) {
      case 20018:
        message.error('token过期，请重新获取', 1);
        return false;

      default:
        return response.data;
    }
  },
  error => {
    window.sls.pushLog({
      url: logger?.response?.url,
      payload: JSON.stringify(logger?.response?.data || {}),
      method: logger?.response?.method,
      message: `请求错误 ${logger?.response?.url}`,
    });
    if (error.response) {
      if (codeMessage[status]) {
        notification.error({
          message: `请求错误 ${status}: ${url}`,
          description: codeMessage[status],
        });
        return false;
      }
      return Promise.reject(error);
    } else {
      return error;
    }
  },
);

export default function request(obj) {
  let {url, method, data} = obj;
  logger.response = obj;
  return axios({
    url,
    method,
    data,
  });
}
