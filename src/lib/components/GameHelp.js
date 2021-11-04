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
            <h2>react-responsive-modal</h2>
            <button onClick={() => onOpenModal()}>Open modal</button>

            <Modal open={state.open} onClose={() => onCloseModal()}>
                <h2>Code guess game</h2>
                <p>Code guess game is ...</p>
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