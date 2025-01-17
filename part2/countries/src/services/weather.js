import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

export const getWeather = async (city) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5'
  const response = await axios.get(`${baseUrl}/weather?q=${city}&appid=${API_KEY}&units=metric`);  

  return response.data
}