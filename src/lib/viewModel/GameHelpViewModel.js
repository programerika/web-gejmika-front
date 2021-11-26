import ReactTooltip from "react-tooltip";

export class GameHelpViewModel {
    #steps;
    constructor() {
        this.#steps = this.getSteps();
        // this.data = this.#steps.filter((step)=>step.selector==='step-1');
    }

    getSteps = () => {
        return [
            {
                selector: 'step-1',
                content: <p> Insert combination by clicking on icons.</p>,
            },
            {
                selector: 'step-2',
                content: <p> If you want to change last input press delete button.</p>,
            },
            {
                selector: 'step-3',
                content: <p> After choosing your combination press confirm button.</p>,
            },
            {
                selector: 'step-4',
                content: <p><span style={{color: 'green'}}>Green</span> color indicates that you have guessed the icon and position. <br/>
                            <span style={{color: 'yellow'}}>Yellow</span> color indicates that you have guessed the icon but not position. <br/>
                            <span style={{color: 'gray'}}>Gray</span> color indicates that you have missed your guess.</p>,
            },
        ]
    }
    
    onOpenModal = () => {
		this.setState({...this.state, open: true });
    };

	onCloseModal = () => {
		this.setState({...this.state, open: false });
    };


    setStateCallback = (state, setState) => {
        this.state = state;
        this.setState = setState;
    }

    startWalkthrough = () => {
        this.setState({...this.state, isWalkThroughActive: true, open: false});
    }

    showWalkthrough = (combInProgress,inputPanelRef,deleteButtonRef,confirmButtonRef,attemptConfirmed,outcomeIndicatorRef) => {
        if (!this.state.isWalkThroughActive) {
            // ReactTooltip.hide();
            return;
        }
        const combLenght = combInProgress.length;
        switch(combLenght) {
            case 0:
                if (attemptConfirmed) {
                    // if (this.state.currentStep === 'step-4') {
                    //     ReactTooltip.hide();
                    //     this.setState({...this.state,currentStep: 'step-1', isWalkThroughActive: false})
                    // }else {
                        
                    // }
                    ReactTooltip.hide();
                    ReactTooltip.show(outcomeIndicatorRef?.current);
                    this.setState({...this.state, currentStep: 'step-4'});
                } else {
                    ReactTooltip.hide();
                    ReactTooltip.show(inputPanelRef?.current);
                    this.setState({...this.state, currentStep: 'step-1'});
                }
                break;
            case 1:
                if (this.state.currentStep === 'step-2') {
                    ReactTooltip.hide();
                }
                break;
            case 2:
                if (this.state.currentStep === 'step-2') {
                    ReactTooltip.hide();
                } 
                break;    
            case 3:
                ReactTooltip.hide();
                ReactTooltip.show(deleteButtonRef?.current);
                this.setState({...this.state, currentStep: 'step-2'});  
                break;
            case 4:
                ReactTooltip.hide();
                ReactTooltip.show(confirmButtonRef?.current);
                this.setState({...this.state, currentStep: 'step-3'});  
                break;
            default:
                break;
        }
        
        
        
    }

    getCurrentStepContent = () => { 
        // console.log(this.#steps);
        // console.log(this.#steps.find((step)=>step.selector === this.state.currentStep));
        // console.log(this.state);
        return this.#steps.find((step)=>step.selector === this.state.currentStep).content;
    }

    
    
}