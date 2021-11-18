export class GameHelpViewModel {

    constructor() {
        this.steps = this.initialArray();
    }

    initialArray = () => {
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

    setStateCallback = (state, setState) => {
        this.state = state;
        this.setState = setState;
    }

    getCurrentStepContent = () => { 
        return this.steps.find((step)=>step.selector===this.state.currentStep).content
    }
    
}