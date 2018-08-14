import { injectable } from "inversify";
import HttpMiddlewareInterface from "varie/lib/http/HttpMiddlewareInterface";

@injectable()
export default class temp implements HttpMiddlewareInterface {
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
