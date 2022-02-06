import {request} from './Api';

export const getAllEmployees = (search) => {
 return request({url: 'employee', params: {search}})
}

export const addEmployee = (body) => {
  return request({url: "employee", method: 'post', data: body});
};

export const deleteEmployee = (id) => {
  return request({url: "employee/" + id, method: 'delete'});
};

export const getEmployeeDetails = (id) => {
  return request({url: "employee/" + id, method: 'get'});
};

export const updateEmployeeDetails = ({employeeId, data}) => {
  return request({url: "employee/" + employeeId, method: 'put', data: data});
};
