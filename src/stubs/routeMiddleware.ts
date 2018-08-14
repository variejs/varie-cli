import { injectable, inject } from "inversify";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";

@injectable()
export default class temp implements RouteMiddlewareInterface {
  passes(to, from, next) {
    // your custom logic here
    return true;
  }
}
