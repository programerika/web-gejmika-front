import {Modal} from 'react-responsive-modal';
import styles from "react-responsive-modal/styles.css";
import globalStyles from "../global.module.css";
import {useState} from 'react';

const GameHelp = ({onOpenModal,onCloseModal}) => {

    const [state, setState] = useState(
        {open: false}
    );

	onOpenModal = () => {
		setState({ open: true });
    };

	onCloseModal = () => {
		setState({ open: false });
    };

    return (
        <div style={styles}>
            <h2>Do you need some help?</h2>
            <button onClick={() => onOpenModal()}>Game Help</button>

            <Modal open={state.open} onClose={() => onCloseModal()}>
                <h2>Code guess game</h2>
                <p>
                    Code guess game is code-breaking single player game.<br/>
                    You have to guess the right four icons combination, out of six others.<br/>
                    Winning combination is already predefined.<br/>
                    The Player tries to guess the right pattern in five steps.<br/>
                    If the guessing is successful in three steps, the score will be 21 points.<br/>
                    The fourth successful guess will bring 13 and the fifth 8 points.<br/>
                    There is no points if the fifth trie is bad.<br/>     
                </p>
                <button 
                    onClick={() => onCloseModal()}
                    className={globalStyles.button}
                >
                    Close
                </button>
                <button 
                    onClick={() => onCloseModal()}
                    className={globalStyles.button}
                >
                    Start walkthrough
                </button>
            </Modal>
        </div>
    );

};

export default GameHelp;