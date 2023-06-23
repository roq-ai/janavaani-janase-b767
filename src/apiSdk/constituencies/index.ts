import axios from 'axios';
import queryString from 'query-string';
import { ConstituencyInterface, ConstituencyGetQueryInterface } from 'interfaces/constituency';
import { GetQueryInterface } from '../../interfaces';

export const getConstituencies = async (query?: ConstituencyGetQueryInterface) => {
  const response = await axios.get(`/api/constituencies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createConstituency = async (constituency: ConstituencyInterface) => {
  const response = await axios.post('/api/constituencies', constituency);
  return response.data;
};

export const updateConstituencyById = async (id: string, constituency: ConstituencyInterface) => {
  const response = await axios.put(`/api/constituencies/${id}`, constituency);
  return response.data;
};

export const getConstituencyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/constituencies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteConstituencyById = async (id: string) => {
  const response = await axios.delete(`/api/constituencies/${id}`);
  return response.data;
};
