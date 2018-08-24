import { TestState } from "./stateInterface";

export default function() {
  return {
    SAMPLE_GETTER: (state: TestState) => {
      return state;
    }
  };
}
