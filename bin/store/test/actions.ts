import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { TestState } from "./stateInterface";

export default function($http) {
  return {
    sampleAction: (context: ActionContext<TestState, RootState>, data) => {
      return $http.post("/some-url", {
        data
      });
    }
  };
}
