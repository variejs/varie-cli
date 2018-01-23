export default class temp {
  public request(config: object) {
    return config;
  }

  public response(response: object) {
    return response;
  }

  public responseError(error) {
    return Promise.reject(error);
  }
}
