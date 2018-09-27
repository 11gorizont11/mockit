import axios from 'axios';
// TODO: make HttpClient
export default class ApiService {
  constructor(options = {}) {
    // TODO: try to rethink that
    const userCreds = this.getUserCreds();

    this.client = options.client || axios.create();
    this.token = options.token || userCreds.token;
    this.refreshToken = options.refreshToken || userCreds.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }
        const newConfig = {
          headers: {
          },
          ...config
        };
        newConfig.headers.Authorization = `Bearer ${this.token}`
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
          return Promise.reject(error);
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

  login = async ({ login, password }) => this.client.post("/api/auth/login", { login, password }).then(({ data }) => this.setUserCreds(data))

  signUp = async ({ login, email, password }) => this.client.post('/api/auth/sign-up', { login, email, password }).then(({ data }) => this.setUserCreds(data))

  get = async url => this.client.get(url).then(({ data }) => data);


  post = async (url, payload) => this.client.post(url, payload).then(({ data }) => data);


  delete = async (url, payload) => this.client.delete(url, { data: payload }).then(({ data }) => data);

  setUserCreds = (creds) => {
    localStorage.setItem('mockitUserCreds', JSON.stringify(creds))
  }
  getUserCreds = () => JSON.parse(localStorage.getItem('mockitUserCreds'))
}

