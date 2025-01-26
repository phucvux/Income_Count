import httpClient from './httpClient';

export const createEmployee = async(employeeData) => {
    const response = await httpClient.post('/employee', employeeData);
    return response.data;
}

export const getEmployee = async () => {
    const response = await httpClient.get('/employee');
    return response.data;
}