import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { tempState } from "./stateInterface";
import HttpServiceInterface from "varie/lib/http/HttpServiceInterface";

const $http : HttpServiceInterface = $app.make('$http');

export const action = (
  context: ActionContext<tempState, RootState>,
  data
) => {};
