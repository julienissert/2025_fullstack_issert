import axios from 'axios';

const BACK_URL = 'http://localhost:3000';
const STATS_API_URL = `${BACK_URL}/api/admin/stats`;

export const fetchStats = async () => {
  const response = await axios.get(STATS_API_URL);
  return response.data;
};