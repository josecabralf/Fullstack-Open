import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAll = () => axios.get(baseUrl).then(resp => resp.data);
export const create = (newPerson) => axios.post(baseUrl, newPerson).then(resp => resp.data);
