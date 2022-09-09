import api from './api';

class ProjectService {
  async getAll() {
    const result = { data: null, error: null };

    try {
      const { data = [] } = await api.get('/projects/tasks');

      result.data = data;
    } catch (err) {
      result.error = err.message;
    }

    return result;
  }

  async create(project) {
    const result = { data: null, error: null };

    try {
      const { data: projectCreated } = await api.post('/projects', {
        name: project.name,
      });

      if (!projectCreated || !projectCreated?.id)
        return { error: 'Ocurred a problem to create a project!' };

      result.data = projectCreated;
    } catch (err) {
      if (err?.response?.data?.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message;
      }
    }

    return result;
  }

  async update(id, project) {
    const result = { data: null, error: null };

    try {
      const { data: projectCreated } = await api.put(`/projects/${id}`, {
        name: project.name,
      });

      if (!projectCreated || !projectCreated?.id)
        return { error: 'Ocurred a problem to update a project!' };

      result.data = projectCreated;
    } catch (err) {
      if (err?.response?.data?.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message;
      }
    }

    return result;
  }

  async delete(id) {
    const result = { data: null, error: null };

    try {
      await api.delete(`/projects/${id}`);

      result.data = true;
    } catch (err) {
      if (err?.response?.data?.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message || 'Ocurred a problem to update a project!';
      }
    }

    return result;
  }
}

const projectService = new ProjectService();
export default projectService;
