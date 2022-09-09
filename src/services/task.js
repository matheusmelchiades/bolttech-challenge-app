import api from './api';

class TaskService {
  async create(task) {
    const result = { data: null, error: null };

    try {
      const { data: taskCreated } = await api.post('/tasks', task);

      if (!taskCreated || !taskCreated?.id)
        return { error: 'Ocurred a problem to create a task!' };

      result.data = taskCreated;
    } catch (err) {
      if (err?.response?.data?.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message;
      }
    }

    return result;
  }

  async update(id, task) {
    const result = { data: null, error: null };

    try {
      await api.put(`/tasks/${id}`, task);

      result.data = true;
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
      await api.delete(`/tasks/${id}`);

      result.data = true;
    } catch (err) {
      if (err?.response?.data?.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message || 'Ocurred a problem to delete a project!';
      }
    }

    return result;
  }
}

const taskService = new TaskService();
export default taskService;
