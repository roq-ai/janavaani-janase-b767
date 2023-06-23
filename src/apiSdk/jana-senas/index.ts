import axios from 'axios';
import queryString from 'query-string';
import { JanaSenaInterface, JanaSenaGetQueryInterface } from 'interfaces/jana-sena';
import { GetQueryInterface } from '../../interfaces';

export const getJanaSenas = async (query?: JanaSenaGetQueryInterface) => {
  const response = await axios.get(`/api/jana-senas${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJanaSena = async (janaSena: JanaSenaInterface) => {
  const response = await axios.post('/api/jana-senas', janaSena);
  return response.data;
};

export const updateJanaSenaById = async (id: string, janaSena: JanaSenaInterface) => {
  const response = await axios.put(`/api/jana-senas/${id}`, janaSena);
  return response.data;
};

export const getJanaSenaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/jana-senas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJanaSenaById = async (id: string) => {
  const response = await axios.delete(`/api/jana-senas/${id}`);
  return response.data;
};
