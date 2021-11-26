import {Modal} from 'react-responsive-modal';
import modalStyles from "react-responsive-modal/styles.css";
import globalStyles from "../global.module.css";
import {useState,useEffect} from 'react';
import styles from "./GameHelp.module.css";
import questionMark from '../icons/question-mark.png';
import { GameHelpViewModel } from '../viewModel/GameHelpViewModel';
import ReactTooltip from 'react-tooltip';
import {useSelector} from 'react-redux'

const GameHelp = () => {

    const inputPanelRef = useSelector((state)=>state.view.inputPanelRef);
    const deleteButtonRef = useSelector((state)=>state.view.deleteButtonRef);
    const confirmButtonRef = useSelector((state)=>state.view.confirmButtonRef);
    const outcomeIndicatorRef = useSelector((state)=>state.view.outcomeIndicatorRef);
    const attemptConfirmed = useSelector((state)=>state.view.attemptConfirmed);

    const combInProgress = useSelector((state)=>state.view.combInProgress);
  
    const ghvm = new GameHelpViewModel();

    const [state, setState] = useState(
        {open: false, isWalkThroughActive: false, currentStep: 'step-0'}
    );

    ghvm.setStateCallback(state, setState)

    const isWalkthroughActive = state.isWalkThroughActive;

    useEffect(() => {
       ghvm.showWalkthrough(combInProgress,inputPanelRef,deleteButtonRef,confirmButtonRef,attemptConfirmed,outcomeIndicatorRef);
    },[combInProgress,inputPanelRef,deleteButtonRef,confirmButtonRef,isWalkthroughActive,attemptConfirmed,outcomeIndicatorRef]);

    return (
        <div style={modalStyles}>
            <div className={styles.helpWrapper}>
                <img 
                className={globalStyles.inputBtn} 
                src={questionMark} 
                alt="help" 
                onClick={() => ghvm.onOpenModal()}
                />
            </div>
            {state.isWalkThroughActive && <ReactTooltip 
                effect='solid' 
                border={true} 
                place='top'
                type='dark'
                getContent={()=>{return ghvm.getCurrentStepContent()}}
                eventOff='none'
                event='none'
            />}
            <Modal open={state.open} onClose={() => ghvm.onCloseModal()}>
                <h2>Code guess game</h2>
                <p>
                    Code guess game is code-breaking single player game.<br/>
                    You have to guess the right four icons combination, out of six others.<br/>
                    Winning combination is already predefined.<br/>
                    The Player tries to guess the right pattern in five steps.<br/>
                    If the guessing is successful in three steps, the score will be 21 points.<br/>
                    The fourth successful attempt will bring 13 and the fifth 8 points.<br/>
                    There is no points if the fifth attempt was bad.<br/>     
                </p>
                <button 
                    onClick={() => ghvm.onCloseModal()}
                    className={`${globalStyles.gameBtn} ${styles.gameBtn}`}
                >
                    Close
                </button>
                <button 
                    onClick={() => {ghvm.startWalkthrough()}}  
                
                    className={`${globalStyles.gameBtn} ${styles.gameBtn}`}
                >
                    Start walkthrough
                </button>
            </Modal>
        </div>
    );

};

export default GameHelp;