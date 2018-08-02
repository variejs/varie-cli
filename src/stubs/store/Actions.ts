import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { tempState } from "./stateInterface";
import getDecorators from "inversify-inject-decorators";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";

const { lazyInject } = getDecorators($app.$container);

export default class Actions {
  @lazyInject("$http")
  private $http: HttpServiceInterface;

  sampleTest = (context: ActionContext<tempState, RootState>, data) => {};
}
