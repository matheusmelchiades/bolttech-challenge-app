class LocalStorageService {
  BASE_KEY = '@bolttech:todo-app';

  save(key, data) {
    localStorage.setItem(`${this.BASE_KEY}:${key}`, JSON.stringify(data));
  }

  load(key) {
    const data = localStorage.getItem(`${this.BASE_KEY}:${key}`);

    return JSON.parse(data);
  }

  clean(key) {
    localStorage.removeItem(`${this.BASE_KEY}:${key}`);
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
