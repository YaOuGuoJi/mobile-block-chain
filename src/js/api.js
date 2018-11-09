'use strict';

import app from '../main.js'
import axios from 'axios'
import qs from 'qs'

export function service(method, url, params = {}) {
  if (url !== '/user/login') {
    return axios({
      url: '/api/user/isLogin',
      method: 'get'
    }).then(response => {
      console.log(response.data.data);
      if (!response.data.data) {
        app.$router.replace('/login');
      } else {
        return doRequest(method, url, params);
      }
    });
  }
  return doRequest(method, url, params);
}

function doRequest(method, url, params) {
  return axios({
    url: '/api' + url,
    method: method,
    data: 'post' === method ? qs.stringify(params) : {},
    params: 'get' === method ? params : {}
  }).then(
    response => {
      if (response === null || response.status !== 200) {
        window.alert('请求失败！');
        console.log('请求失败');
        return null;
      }
      return response.data;
    },
    error => {
      console.log(error);
    })
}
