import all_actions from "../redux/actions";
import { ModelFunctions } from "../model/ModelFunctions";

export class ViewModel {
  constructor(model_state, view_state, dispatcher) {
    this.model_state = model_state;
    this.view_state = view_state;
    this.dispatcher = dispatcher;
    this.modelFunctions = new ModelFunctions();
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

      const icons = this.comb_to_icon(newState_model.attp_in_progress);

      const newState_view = {
        ...this.view_state,
        comb_in_progress: icons,
      };

      this.dispatch_update(newState_model, newState_view);
    }
  }

  input_confirm() {
    if (this.model_state.attp_in_progress.length !== 4) {
      return;
    } else {
      const attp_outcome = this.modelFunctions.compare_code(
        this.model_state.attp_in_progress,
        this.model_state.secret_comb
      );
      const newState = {
        ...this.model_state,
        attp_in_progress: [],
        attempts: [
          ...this.model_state.attempts,
          {
            attempt_id: this.model_state.attp_id + 1,
            attempt_code: this.model_state.attp_in_progress,
            attempt_outcome: attp_outcome,
          },
        ],
        attp_id: this.model_state.attp_id + 1,
      };
      const outcome = this.outcome_to_color(attp_outcome);

      const newState_view = {
        ...this.view_state,

        attempts_view: [
          ...this.view_state.attempts_view,
          {
            attempt_view_id: this.model_state.attp_id + 1,
            attempt_view_comb: this.view_state.comb_in_progress,
            attempt_view_outcome: outcome,
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
      if (this.modelFunctions.is_target_reached(newState.attempts)) {
        newState.score = this.modelFunctions.score(newState.attempts);
        newState_view.correct_view = this.comb_to_icon(newState.secret_comb);
        this.dispatch_update(newState, newState_view);
      } else {
        this.dispatch_update(newState, newState_view);
      }
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
    this.dispatch_update(
      {
        ...this.model_state,
        attp_in_progress: [],
        attempts: [],
        attp_id: -1,
        score: -1,
        secret_comb: this.modelFunctions.secret_code(),
      },
      {
        comb_in_progress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
        attempts_view: [],
        correct_view: [],
        id: -1,
      }
    );
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
