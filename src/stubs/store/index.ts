import state from "./state";
import actions from "./actions";
import * as getters from "./getters";
import { injectable, inject } from "inversify";
import * as mutations from "./mutations";

@injectable()
export default class temp {
  public name;
  public state;
  public actions;
  public getters;
  public mutations;
  public namespaced;

  constructor(@inject("$http") $http) {
    this.name = "temp";
    this.state = state;
    this.actions = new actions();
    this.getters = new getters.default();
    this.mutations = new mutations.default();
    this.namespaced = true;
  }
}
