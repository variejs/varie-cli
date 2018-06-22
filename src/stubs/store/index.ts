import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import { injectable } from "inversify";

@injectable()
export default class temp {
  public name;
  public state;
  public actions;
  public getters;
  public mutations;
  public namespaced;

  constructor() {
    this.name = "temp";
    this.state = state;
    this.namespaced = true;
    this.actions = new actions();
    this.getters = new getters();
    this.mutations = new mutations();
  }
}
