import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";
import { WebGejmikaService } from "../services/WebGejmikaService";

export class WebGejmikaViewModel {
  constructor(modelState, viewState, dispatcher) {
    this.modelState = modelState;
    this.viewState = viewState;
    this.dispatcher = dispatcher;
    this.webGejmikaModel = new WebGejmikaModel(modelState);
    this.WebGejmikaService = new WebGejmikaService();
  }

  // dispatch update to both view and model reducers

  dispatchUpdate(newStateModel, newStateView) {
    this.dispatcher(
      allActions.inputActions.update(newStateModel, newStateView)
    );
  }

  // methods for each button icon clicked

  heartButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/heart.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  starButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/star.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  diamondButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/diamond.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  spadesButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/symbol-of-spades.png",
      ],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  trafficLightButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/traffic-light.png",
      ],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  clubsButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/clubs.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  // methods for each button icon clicked END

  // method for confirming combination and updating model state attempts array

  inputConfirm() {
    if (this.viewState.combInProgress.length !== 4) {
      return;
    } else {
      const newStateModel = this.webGejmikaModel.compareCode(
        this.iconToComb(this.viewState.combInProgress)
      );

      const newStateView = {
        ...this.viewState,

        attemptsView: [
          ...this.viewState.attemptsView,
          {
            attemptViewId: this.viewState.id + 1,
            attemptViewComb: this.viewState.combInProgress,
            attemptViewOutcome: this.outcomeToColor(
              newStateModel.attempts[newStateModel.attempts.length - 1]
                .attemptOutcome
            ),
          },
        ],
        combInProgress: [],
        id: this.viewState.id + 1,
      };

      this.dispatchUpdate(newStateModel, newStateView);
    }
  }

  // method for deleting last element in combination in progress

  inputDeleteLast() {
    if (this.viewState.combInProgress.length > 0) {
      let combInProg = [...this.viewState.combInProgress];
      combInProg.pop();

      this.dispatchUpdate(
        {
          ...this.modelState,
        },
        {
          ...this.viewState,
          combInProgress: combInProg,
        }
      );
    }
  }

  // sets both model and view states to default

  startGame() {
    const newStateModel = this.webGejmikaModel.secretCode();
    this.dispatchUpdate(newStateModel, {
      combInProgress: [],
      attemptsView: [],
      correctView: this.combToIcon(newStateModel.secretComb),
      id: -1,
    });
  }

  // transforms model state combination to view state combination

  combToIcon = (comb) => {
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

  iconToComb = (icons) => {
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

  outcomeToColor = (outcome) => {
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

  testInput = async (input) => {
    if (input.length === 0) {
      return {
        message: "Please enter an username",
        isSaveButtonDisabled: true,
        isValid: "isNotValidInput",
        toolTipStatus: "toolTipVisible",
        messageStatus: "visible",
        messageColor: "messageWhite",
      };
    }

    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
    if (regex.test(input) && localStorage.getItem("username") === null) {
      if ((await this.WebGejmikaService.checkIfUsernameExists(input)) === 200) {
        return {
          message: "*Username already exists",
          isSaveButtonDisabled: true,
          //isValid: "isNotValidInput",
          //toolTipStatus: "visible",
          //messageStatus: "visible",
          messageColor: "messageRed",
        };
      } else {
        return {
          message: "*Username is correct",
          isSaveButtonDisabled: false,
          //isValid: "isValidInput",
          //toolTipStatus: "hiddfden",
          //messageStatus: "hidfdfden",
          messageColor: "messageGreen",
        };
      }
    } else {
      return {
        message: "*Your username is not in valid format",
        isSaveButtonDisabled: true,
        //isValid: "isNotValidInput",
        //toolTipStatus: "visible",
        //messageStatus: "visible",
        messageColor: "messageRed",
      };
    }
  };
}
