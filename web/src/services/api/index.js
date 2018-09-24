import axios from 'axios';
// TODO: make HttpClient
export default class ApiService {
  constructor(options = {}) {
    this.client = options.client || axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }
        const newConfig = {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          ...config
        };
        return newConfig;
      },
      error => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      res => res,
      async error => {
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          Promise.reject(error);
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('api/auth/refresh', {
            refreshToken: this.refreshToken
          });
        }

        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      }
    );
  }

  login = async ({ login, password }) => {
    this.client.post("/api/auth/login", { login, password }).then(({ data }) => data)
  }

  signUp = async ({ login, email, password }) => {
    this.client.post('/api/auth/sign-up', { login, email, password }).then(({ data }) => data)
  }

  get = async url => {
    this.client.get(url).then(({ data }) => data);
  };

  post = async (url, payload) => {
    this.client.post(url, payload).then(({ data }) => data);
  };

  delete = async (url, payload) => {
    this.client.delete(url, payload).then(({ data }) => data);
  };
}
