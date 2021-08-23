import { Model } from "../model/Model";
import all_actions from "../redux/actions";
import { ModelFunctions } from "../model/ModelFunctions";

export class ViewModel {
  constructor(state, dispatcher) {
    this.state = state;
    this.dispatcher = dispatcher;
    this.modelFunctions = new ModelFunctions();
  }

  dispatch_update(newState) {
    console.log("State from dispatcher: " + JSON.stringify(newState));
    this.dispatcher(all_actions.input_actions.update(newState));
  }

  input_click(input) {
    if (this.state.attp_in_progress.length >= 4) {
      return;
    } else {
      // const newState = {
      //   ...this.state,
      //   attp_in_progress: [...this.state.attp_in_progress, input],
      // };
      // console.log("From input click: " + JSON.stringify(newState));
      this.dispatch_update({
        ...this.state,
        attp_in_progress: [...this.state.attp_in_progress, input],
      });
      // this.state.attp_in_progress.push(input);
      // this.dispatch_update(this.state);
    }
  }

  input_confirm() {
    if (this.state.attp_in_progress.length !== 4) {
      return;
    } else {
      const newState = {
        ...this.state,
        attp_in_progress: [],
        attempts: [
          ...this.state.attempts,
          {
            attempt_id: this.state.attp_id + 1,
            attempt_code: this.state.attp_in_progress,
            attempt_outcome: this.modelFunctions.compare_code(
              this.state.attp_in_progress,
              this.state.secret_comb
            ),
          },
        ],
        attp_id: this.state.attp_id + 1,
      };

      // const newAttp = {
      //   attempt_id: this.state.attp_id + 1,
      //   attempt_code: this.state.attp_in_progress,
      //   attempt_outcome: this.modelFunctions.compare_code(
      //     this.state.attp_in_progress,
      //     this.state.secret_comb
      //   ),
      // };
      // this.state.attempts.push(newAttp);
      // this.state.attp_id = this.state.attp_id + 1;
      // this.state.attp_in_progress = [];

      // this.dispatch_update(newState);
      if (this.modelFunctions.is_target_reached(newState.attempts)) {
        newState.score = this.modelFunctions.score(newState.attempts);
        this.dispatch_update(newState);
      } else {
        this.dispatch_update(newState);
      }
    }
  }

  input_cancel() {
    this.dispatch_update({
      ...this.state,
      attp_in_progress: [],
    });
  }

  start_game() {
    this.dispatch_update({
      ...this.state,
      attp_in_progress: [],
      attempts: [],
      attp_id: -1,
      score: -1,
      secret_comb: this.modelFunctions.secret_code(),
    });
  }

  comb_to_icon = (comb) => {
    var icons = [];
    for (let index = 0; index < comb.length; index++) {
      switch (comb[index]) {
        case "K":
          icons[index] = "/icons/diamond.png";
          break;
        case "H":
          icons[index] = "/icons/heart.png";
          break;
        case "P":
          icons[index] = "/icons/symbol-of-spades.png";
          break;
        case "T":
          icons[index] = "/icons/clubs.png";
          break;
        case "L":
          icons[index] = "/icons/star.png";
          break;
        case "S":
          icons[index] = "/icons/traffic-light.png";
          break;
        default:
          icons[index] = "/icons/circle.png";
          break;
      }
    }
    return icons;
  };

  outcome_to_color = (outcome) => {
    let colors = [];
    let out = [...outcome];
    out.sort().reverse();
    for (let index = 0; index < out.length; index++) {
      switch (out[index]) {
        case 2:
          colors[index] = "green";
          break;
        case 1:
          colors[index] = "yellow";
          break;
        case 0:
          colors[index] = "gray";
          break;
        default:
          break;
      }
    }

    return colors;
  };
}
