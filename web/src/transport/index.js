import axios from 'axios';
// TODO: make HttpClient
export default class HttpClient {
    constructor(options = {}) {
        this.client = options.client || axios.create();
        this.token = options.token;
        this.refreshToken = options.refreshToken;
        this.refreshRequest = null;
    }

    makeRequest = async () => { }
}