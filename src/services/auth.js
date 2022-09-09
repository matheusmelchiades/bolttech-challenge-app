import api from './api';

class AuthService {
  async login(username, password) {
    const result = { data: null, error: null };

    try {
      const credentials = btoa(`${username}:${password}`);

      const {
        data: { user, token },
      } = await api.post('/signin', null, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!token || !user || !user?.id)
        return { error: 'Credentials incorrects!' };

      api.applyToken(token);

      result.data = { user, token };
    } catch (err) {
      result.error = err.message;
    }

    return result;
  }

  async register(username, password) {
    const result = { data: null, error: null };

    try {
      const { data: user } = await api.post('/users', { username, password });

      if (!user || !user?.id)
        return { error: 'Ocurred a problem to create a user!' };

      result.data = { user };
    } catch (err) {
      if (err.response.data.message) {
        result.error = err.response.data.message;
      } else {
        result.error = err.message;
      }
    }

    return result;
  }
}

const authService = new AuthService();
export default authService;
