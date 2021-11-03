/**
 * @author Programerika
 */
 import allActions from "../redux/actions";
 import { WebGejmikaService } from "../services/WebGejmikaService";
 import globalStyles from "../global.module.css";
 import scoreBoardStyles from "../components/ScoreBoard.module.css";
 
 export class ScoreBoardViewModel {
   constructor(scoreState, dispatcher) {
     this.dispatcher = dispatcher;
     this.scoreState = scoreState;
     this.webGejmikaService = new WebGejmikaService();
     this.viewModel = null;
   }

   dispatchUpdateScoreBoard = (newStateBoard) => {
    this.dispatcher(allActions.inputActions.updateScoreBoard(newStateBoard));
  };



}
 