import { Model } from "../model/Model";
import all_actions from "../redux/actions";
import { ModelFunctions } from "../model/ModelFunctions";

export class ViewModel {
  constructor(state, dispatcher) {
    this.state = state;
    this.dispatcher = dispatcher;
    this.modelFunctions = new ModelFunctions();
  }

  dispatch_update({ ...state }) {
    console.log("State from dispatcher: " + JSON.stringify(state));
    this.dispatcher(all_actions.input_actions.update(state));
  }

  dispatch_update_2(state) {
    console.log("State from dispatcher_2: " + JSON.stringify(state));
    this.dispatcher(all_actions.input_actions.update_attempts(state));
  }

  input_click(input) {
    if (this.state.attp_in_progress.length >= 4) {
      this.dispatch_update(this.state);
    } else {
      this.state.attp_in_progress.push(input);
      this.dispatch_update(this.state);
    }
  }

  input_confirm() {
    if (this.state.attp_in_progress.length !== 4) {
      this.dispatch_update(this.state);
    } else {
      // this.state = {
      //   ...this.state,
      //   attp_in_progress: [],
      //   attempts: [
      //     ...this.state.attempts,
      //     {
      //       attempt_id: this.state.attp_id + 1,
      //       attempt_code: this.state.attp_in_progress,
      //       attempt_outcome: this.modelFunctions.compare_code(
      //         this.state.attp_in_progress,
      //         this.state.secret_comb
      //       ),
      //     },
      //   ],
      //   attp_id: this.state.attp_id + 1,
      // };

      const newAttp = {
        attempt_id: this.state.attp_id + 1,
        attempt_code: this.state.attp_in_progress,
        attempt_outcome: this.modelFunctions.compare_code(
          this.state.attp_in_progress,
          this.state.secret_comb
        ),
      };
      this.state.attempts.push(newAttp);
      this.state.attp_id = this.state.attp_id + 1;
      this.state.attp_in_progress = [];

      this.dispatch_update({ ...this.state });
    }
  }
}
