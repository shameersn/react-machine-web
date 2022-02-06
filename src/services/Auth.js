import {request} from "./Api";

export const login = (body) => {
  return request({url: "auth/login", method: 'post', data: body});
};

export const signup = (body) => {
  return request({url: "auth/register", method: 'post', data: body});
};
