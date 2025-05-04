import axios from 'axios';

const BACK_URL = 'http://localhost:3000';
const PROJECT_API_URL = `${BACK_URL}/api/projects`;
const ADMIN_API_URL = `${BACK_URL}/api/admin/projects`;


export async function getProjects() {
  const response = await axios.get(PROJECT_API_URL);
  return response.data;
}

export async function addProject(projectData) {
  const response = await axios.post(ADMIN_API_URL, projectData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}


export async function editProject(id, updatedData) {
  const response = await axios.put(`${ADMIN_API_URL}/${id}`, updatedData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function deleteProject(id) {
  await axios.delete(`${ADMIN_API_URL}/${id}`);
}
