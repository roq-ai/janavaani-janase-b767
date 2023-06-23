import axios from 'axios';
import queryString from 'query-string';
import { IssueInterface, IssueGetQueryInterface } from 'interfaces/issue';
import { GetQueryInterface } from '../../interfaces';

export const getIssues = async (query?: IssueGetQueryInterface) => {
  const response = await axios.get(`/api/issues${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createIssue = async (issue: IssueInterface) => {
  const response = await axios.post('/api/issues', issue);
  return response.data;
};

export const updateIssueById = async (id: string, issue: IssueInterface) => {
  const response = await axios.put(`/api/issues/${id}`, issue);
  return response.data;
};

export const getIssueById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/issues/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteIssueById = async (id: string) => {
  const response = await axios.delete(`/api/issues/${id}`);
  return response.data;
};
