import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

export const getAll = () => axios.get(baseUrl).then(resp => resp.data);
export const create = (newPerson) => axios.post(baseUrl, newPerson).then(resp => resp.data);
export const remove = (id) => axios.delete(`${baseUrl}/${id}`);
export const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson).then(resp => resp.data);