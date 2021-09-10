import all_actions from "../redux/actions";
import { ModelFunctions } from "../model/ModelFunctions";

export class ViewModel {
  constructor(model_state, view_state, dispatcher) {
    this.model_state = model_state;
    this.view_state = view_state;
    this.dispatcher = dispatcher;
    this.modelFunctions = new ModelFunctions(model_state);
  }

  // dispatch update to both view and model reducers

  dispatch_update(newState_model, newState_view) {
    this.dispatcher(
      all_actions.input_actions.update(newState_model, newState_view)
    );
  }

  // methods for each button icon clicked

  heartButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/heart.png",
      ],
    };

    this.dispatch_update({ ...this.model_state }, newState_view);
  }

  starButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/star.png",
      ],
    };

    this.dispatch_update({ ...this.model_state }, newState_view);
  }

  diamondButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/diamond.png",
      ],
    };

    this.dispatch_update({ ...this.model_state }, newState_view);
  }

  spadesButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/symbol-of-spades.png",
      ],
    };

    this.dispatch_update(null, newState_view);
  }

  trafficLightButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/traffic-light.png",
      ],
    };

    this.dispatch_update({ ...this.model_state }, newState_view);
  }

  clubsButtonClicked() {
    if (this.view_state.comb_in_progress.length >= 4) {
      return;
    }
    const newState_view = {
      ...this.view_state,
      comb_in_progress: [
        ...this.view_state.comb_in_progress,
        "/icons/clubs.png",
      ],
    };

    this.dispatch_update({ ...this.model_state }, newState_view);
  }

  // methods for each button icon clicked END

  // method for confirming combination and updating model state attempts array

  input_confirm() {
    if (this.view_state.comb_in_progress.length !== 4) {
      return;
    } else {
      const newState = this.modelFunctions.compare_code(
        this.icon_to_comb(this.view_state.comb_in_progress)
      );
      const newState_view = {
        ...this.view_state,

        attempts_view: [
          ...this.view_state.attempts_view,
          {
            attempt_view_id: this.view_state.id + 1,
            attempt_view_comb: this.view_state.comb_in_progress,
            attempt_view_outcome: this.outcome_to_color(
              newState.attempts[newState.attempts.length - 1].attempt_outcome
            ),
          },
        ],
        comb_in_progress: [],
        id: this.view_state.id + 1,
      };

      this.dispatch_update(newState, newState_view);
    }
  }

  // method for deleting last element in combination in progress

  input_cancel() {
    if (this.view_state.comb_in_progress.length > 0) {
      let combInProg = [...this.view_state.comb_in_progress];
      combInProg.pop();

      this.dispatch_update(
        {
          ...this.model_state,
        },
        {
          ...this.view_state,
          comb_in_progress: combInProg,
        }
      );
    }
  }

  // sets both model and view states to default

  start_game() {
    const newState_model = this.modelFunctions.secret_code();
    this.dispatch_update(newState_model, {
      comb_in_progress: [],
      attempts_view: [],
      correct_view: this.comb_to_icon(newState_model.secret_comb),
      id: -1,
    });
  }

  // transforms model state combination to view state combination

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

  // transforms view state combination to model state combination

  icon_to_comb = (icons) => {
    var comb = ["", "", "", ""];
    for (let index = 0; index < comb.length; index++) {
      switch (icons[index]) {
        case "/icons/diamond.png":
          comb[index] = "K";
          break;
        case "/icons/heart.png":
          comb[index] = "H";
          break;
        case "/icons/symbol-of-spades.png":
          comb[index] = "P";
          break;
        case "/icons/clubs.png":
          comb[index] = "T";
          break;
        case "/icons/star.png":
          comb[index] = "L";
          break;
        case "/icons/traffic-light.png":
          comb[index] = "S";
          break;
        default:
          comb[index] = "";
          break;
      }
    }
    return comb;
  };

  // transforms model compare code outcome to colors for view

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
