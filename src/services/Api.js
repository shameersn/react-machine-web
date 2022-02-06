import axios from 'axios';

const client = axios.create({baseURL : process.env.BASE_URL || 'http://localhost:3000/'});

client.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error?.response?.data);
});

export const request = ({...options}) => {
  const user = localStorage.getItem('user');
  let token = '';
  if(user) {
    token = JSON.parse(user).token;
  }
  client.defaults.headers.common['x-auth'] = token;
  return client(options);
};
