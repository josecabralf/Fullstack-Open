import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

export const getAll = () => axios.get(`${baseUrl}/all`).then(resp => resp.data);
export const getOne = (name) => axios.get(`${baseUrl}/name/${name}`).then(resp => resp.data);