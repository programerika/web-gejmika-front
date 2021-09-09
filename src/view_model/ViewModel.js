import all_actions from "../redux/actions";
import { ModelFunctions } from "../model/ModelFunctions";

export class ViewModel {
  constructor(model_state, view_state, dispatcher) {
    this.model_state = model_state;
    this.view_state = view_state;
    this.dispatcher = dispatcher;
    this.modelFunctions = new ModelFunctions(model_state);
  }

  dispatch_update(newState_model, newState_view) {
    this.dispatcher(
      all_actions.input_actions.update(newState_model, newState_view)
    );
  }

  input_click(input) {
    if (this.model_state.attp_in_progress.length >= 4) {
      return;
    } else {
      const newState_model = {
        ...this.model_state,
        attp_in_progress: [...this.model_state.attp_in_progress, input],
      };

      const newState_view = {
        ...this.view_state,
        comb_in_progress: this.comb_to_icon(newState_model.attp_in_progress),
      };

      this.dispatch_update(newState_model, newState_view);
    }
  }

  input_confirm() {
    if (this.model_state.attp_in_progress.length !== 4) {
      return;
    } else {
      const newState = this.modelFunctions.compare_code();
      const newState_view = {
        ...this.view_state,

        attempts_view: [
          ...this.view_state.attempts_view,
          {
            attempt_view_id: this.model_state.attp_id + 1,
            attempt_view_comb: this.view_state.comb_in_progress,
            attempt_view_outcome: this.outcome_to_color(
              newState.attempts[newState.attempts.length - 1].attempt_outcome
            ),
          },
        ],
        comb_in_progress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
        id: this.view_state.id + 1,
      };

      this.dispatch_update(newState, newState_view);
    }
  }

  input_cancel() {
    this.dispatch_update(
      {
        ...this.model_state,
        attp_in_progress: [],
      },
      {
        ...this.view_state,
        comb_in_progress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
      }
    );
  }

  start_game() {
    const newState_model = this.modelFunctions.secret_code();
    this.dispatch_update(newState_model, {
      comb_in_progress: [
        "./icons/circle.png",
        "./icons/circle.png",
        "./icons/circle.png",
        "./icons/circle.png",
      ],
      attempts_view: [],
      correct_view: this.comb_to_icon(newState_model.secret_comb),
      id: -1,
    });
  }

  comb_to_icon = (comb) => {
    var icons = ["", "", "", ""];
    for (let index = 0; index < icons.length; index++) {
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
