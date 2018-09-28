import axios from 'axios';
// TODO: make HttpClient

const env = process.env.NODE_ENV;
export default class ApiService {
  constructor(options = {}) {
    this.apiUrl = env === 'development' ? '/api' : 'http://api:4000';
    this.client = options.client || axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    const userCreds = this.getUserCreds();

    if (userCreds && userCreds.token && userCreds.refreshToken) {
      this.token = userCreds.token;
      this.refreshToken = userCreds.refreshToken;
    }

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
          this.refreshRequest = this.client.post('/auth/refresh', {
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

  login = async ({ login, password }) => this.post("/auth/login", { login, password }).then(data => { this.setUserCreds(data) })

  signUp = async ({ login, email, password }) => this.post('/auth/sign-up', { login, email, password }).then((data) => this.setUserCreds(data))

  get = async url => this.client.get(this.apiUrl + url).then(({ data }) => data);


  post = async (url, payload) => this.client.post(this.apiUrl + url, payload).then(({ data }) => data);


  delete = async (url, payload) => this.client.delete(this.apiUrl + url, { data: payload }).then(({ data }) => data);

  setUserCreds = (creds) => {

    localStorage.setItem('mockitUserCreds', JSON.stringify(creds))
    this.token = creds.token;
    this.refreshToken = creds.refreshToken;
  }
  getUserCreds = () => JSON.parse(localStorage.getItem('mockitUserCreds'))
}

