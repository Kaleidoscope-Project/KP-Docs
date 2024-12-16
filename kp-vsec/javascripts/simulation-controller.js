
    //
    // Model Simulation Controller
    //

    const TICK_INTERVAL = 1000;
    let timer;
    let timerStarted = false;
    let tickCounter = 0;

    //
    // Simulation State Variables
    //

    let simulatedModel; // Current model.

    let simulationEnabled = false;
    let autoSimulationStarted = false;

    let simulationIsRunning = false;
    let majorStepExecuted = false;
    let miniStepExecuted = false;
    let microStepExecuted = false;

    let majorStepsCounter = 0;
    let mediumStepsCounter = 0;
    let microStepsCounter = 0;
    let microStepMatrixRowIndex = -1;

    // Model Setter
    function initSimulationControllerWIthCurrentModel(chosenModel) {
        simulatedModel = chosenModel;
        console.log("Simulation Controller: Current Model is " + currentModel.selectedModelKey);
        printSimulationModelObject(currentModel);
    }

    // Getters
    function isSimulationRunning() {
        return simulationIsRunning;
    }

    function autoSimulationTicker() {
         console.log("Timer tick: "+tickCounter);
         switch(previousStepType) {
            case MAJOR_STEP_BUTTON_ID:
                processMajorSimulationStep();
                break;
            case MEDIUM_STEP_BUTTON_ID:
                processMediumSimulationStep();
                break;
            case MICRO_STEPS_BUTTON_ID:
                processMicroSimulationStep();
                break;
            default:
                processMajorSimulationStep();
         }
         updateViewElementsAsModelStateChanged(simulatedModel);
//        if (!(simulationEnabled && autoSimulationStarted) || requestInProgress) {
//            // console.log("Timer paused");
//            return;
//        }
        tickCounter++;
        paintAutoSimulationCounter(tickCounter)
    }

    //   ===============================================================================================================
    //              U s e r   I n p u t   P r o c e s s o r s
    //   ===============================================================================================================

    /*
    */
    function processStartStopButtonClicked(startSimulation) {
        if(startSimulation){
            autoSimulationStarted = true;
            simulationIsRunning = true;
            tickCounter = 0;
            if (!timerStarted) {
                timer = window.setInterval(function() {
                    autoSimulationTicker()
                }, TICK_INTERVAL);
                timerStarted = true;
            }
            paintAutoSimulationCounter(tickCounter);
        } else {
            stopAutoSimulation();
        }
    }

    /*
    */
    function stopAutoSimulation() {
        window.clearInterval(timer);
        autoSimulationStarted = false;
        timerStarted = false;
        tickCounter = 0;
    }

    /*
    */
    function resetSimulationProcess() {
        stopAutoSimulation();
        setStartStopButtonIntoGivenState(false);
        // Auto Simulation Execution State Variables
        simulationIsRunning = false;
        majorStepExecuted = false;
        miniStepExecuted = false;
        microStepExecuted = false;

        majorStepsCounter = 0;
        mediumStepsCounter = 0;
        microStepsCounter = 0;
        microStepMatrixRowIndex = -1;

        // Simulation Execution State Variables reinitialization
        previousStepType = UNDEFINED;

        simulatedModel.clearIteration();
        simulatedModel.resetModelToInitialState();
        clearMatricesHighlighting();
        updateViewElementsAsModelStateChanged(simulatedModel);
    }

    //
    //  Step Button Click Handles
    //

    const UNDEFINED = "BUTTON UNDEFINED";
    const MAJOR_STEP_BUTTON_ID = "MAJOR STEP BUTTON";
    const MEDIUM_STEP_BUTTON_ID = "MEDIUM STEP BUTTON";
    const MICRO_STEPS_BUTTON_ID = "MICRO STEP BUTTON";
    const SIMULATION_RESET_BUTTON_ID = "SIMULATION_RESET_BUTTON";

    let previousStepType = UNDEFINED;
    let currentStepID = UNDEFINED;

    /*
    */
    function processTwoStepsButtonClicked(){
        simulationIsRunning = true;
        processSimulationButtonClick(MAJOR_STEP_BUTTON_ID);
        showSimulationStepExecuted(MAJOR_STEP_BUTTON_ID);
    }

    /*
    */
    function processThreeStepsButtonClicked(){
        simulationIsRunning = true;
        processSimulationButtonClick(MEDIUM_STEP_BUTTON_ID);
        showSimulationStepExecuted(MEDIUM_STEP_BUTTON_ID);
    }

    /*
    */
    function processMicroStepsButtonClicked(){
        simulationIsRunning = true;
        processSimulationButtonClick(MICRO_STEPS_BUTTON_ID);
        showSimulationStepExecuted(MICRO_STEPS_BUTTON_ID);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    */
    function processSimulationButtonClick(buttonID){

        switch(buttonID) {

            case MAJOR_STEP_BUTTON_ID:
                switch(previousStepType) {
                    case MEDIUM_STEP_BUTTON_ID:
                        resetFromMediumToMajorStepsSimulation();
                    break;
                    case MICRO_STEPS_BUTTON_ID:
                        resetFromMicroToMajorStepsSimulation();
                    break;
                }
                processMajorSimulationStep();  // Continue simulation in two steps
                previousStepType = buttonID;
                updateViewElementsAsModelStateChanged(simulatedModel);
            break;

            case MEDIUM_STEP_BUTTON_ID:
                switch(previousStepType) {
                    case MAJOR_STEP_BUTTON_ID:
                        resetFromMajorToMediumStepsSimulation();
                    break;

                    case MICRO_STEPS_BUTTON_ID:
                        resetFromMicroToMediumStepsSimulation();
                    break;
                }
                processMediumSimulationStep();
                previousStepType = buttonID;
                updateViewElementsAsModelStateChanged(simulatedModel);
                break;

            case MICRO_STEPS_BUTTON_ID:
                 switch(previousStepType) {
                     case MAJOR_STEP_BUTTON_ID:
                        resetFromMajorToMicroStepsSimulation();
                     break;

                     case MEDIUM_STEP_BUTTON_ID:
                        resetFromMediumToMicroStepsSimulation();
                     break;
                 }
                 processMicroSimulationStep();  // Continue simulation in micro steps
                 previousStepType = buttonID;
                 updateViewElementsAsModelStateChanged(simulatedModel);
            break;
        }  // End of Main Switch
    }

    // -----------------------------------------------------------------------------------------------------------------

    //
    //  COMMON EXTERNAL INPUT STEPS
    //

    function processCommonExternalInputSteps(currentStepCounter){
        let nextCounter;
        switch(currentStepCounter) {
            // External Input can be applied to either External Input Vector or Current State Vector.
            // First case is used when external input is applied to External Input Vector abd then
            // this vector is merged into Current State Vector that holds current state of the model.
            // Second case is used when external input is applied to Current State Vector directly.
            case 0: // HIGHLIGHTING EXTERNAL INPUT VECTOR AS ACTIVE
                //  Updating model view highlighting
                if(simulatedModel.stateVectorIsExternalInput){
                    simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
                } else{
                    simulatedModel.updateVectorStatus(simulatedModel.inputStateVectorObject, true, -1, true);
                }
                nextCounter = 1;
                break;
            case 1: // ADVANCE EXTERNAL INPUT VECTOR
                simulatedModel.advanceModelInputVector();
                if(simulatedModel.stateVectorIsExternalInput){
                    nextCounter = 3;
                } else {
                    nextCounter = 2;
                }
                break;
            case 2: // INJECTING EXTERNAL INPUT INTO CURRENT STATE
                simulatedModel.applyExternalInputVectorToModelCurrentStateVector();

                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.inputStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
                nextCounter = 3;
                break;
        }
        return nextCounter;
    }

    //
    //  COMMON LAST STEPS
    //

    function processAssigningNextStateVectorToModelSourceVector(currentStepCounter){

        //
        // ASSIGNING NEXT STATE VECTOR TO CURRENT STATE VECTOR
        // The task of the function is to assign next state vector to either
        // External Input Vector or Current State Vector
        //

        let nextCounter;
        if(simulatedModel.hasExternalInput){
            if(simulatedModel.stateVectorIsExternalInput){
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, true);
            } else {
                simulatedModel.assignNextStateVectorToModelCurrentStateVector();
                simulatedModel.updateVectorStatus(simulatedModel.inputStateVectorObject, true, -1, false);
            }
            nextCounter = 1;
        } else{
            // No External Input
            simulatedModel.assignNextStateVectorToModelCurrentStateVector();
            simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
            nextCounter = 3;
        }
        //  Updating model view highlighting
        simulatedModel.clearIteration();
        simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, false, -1, false);
        return nextCounter;
    }

    //
    //  MAJOR STEP SIMULATION
    //

    /*
    */
    function processMajorSimulationStep(){
        console.log("\nProcessing MAJOR Simulation Step: " + majorStepsCounter);

        if(simulatedModel.noExternalInput && majorStepsCounter == 0){
            simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
            majorStepsCounter = 3;
            return;
        }

        switch(majorStepsCounter) {
            // Handling External Input in processCommonExternalInputSteps preprocessor.
            case 0:
            case 1:
            case 2:
                majorStepsCounter = processCommonExternalInputSteps(majorStepsCounter);
                break;
            case 3:
                // MULTIPLYING CURRENT STATE BY RECOGNITION MATRIX; RESULT IS IN RECOGNIZED SITUATIONS VECTOR
                simulatedModel.multiplyStateVectorByRecognitionMatrix();
                // MULTIPLYING RECOGNIZED SITUATIONS VECTOR BY GENERATION MATRIX; RESULT IS IN PROPOSED STATE VECTOR
                simulatedModel.multiplyRecognizedSituationsVectorByGenerationMatrix();
                // INJECTING PROPOSED NEXT STATE VECTOR INTO PREVIOUS STATE VECTOR; RESULT IS IN NEXT STATE VECTOR
                simulatedModel.applyProposedNextStateVectorToModelCurrentStateVector();

                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
                majorStepsCounter = 4;
                break;
            case 4: // ASSIGNING NEXT STATE VECTOR TO CURRENT STATE VECTOR
                majorStepsCounter = processAssigningNextStateVectorToModelSourceVector(majorStepsCounter);
                break;
        }
        console.log("\nProcessing MAJOR Simulation Step: " + majorStepsCounter);
    }

    /*
    */
    function resetFromMediumToMajorStepsSimulation(){
        console.log("\nResetting From MEDIUM to MAJOR Steps Simulation");
        switch(mediumStepsCounter){
            case 0:
            case 1:
            case 2:
                majorStepsCounter = mediumStepsCounter;
                break;
            case 3:
            case 4:
            case 5:
                simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
                majorStepsCounter = 3;
                break;
            case 6:
                majorStepsCounter = 4;
        }
    }

    /*
    */
    function resetFromMicroToMajorStepsSimulation(){
        console.log("\nResetting From MICRO to MAJOR Steps Simulation");
        switch(microStepsCounter){
            case 0:
            case 1:
            case 2:
                majorStepsCounter = microStepsCounter;
                break;
            case 3:
                if (microStepMatrixRowIndex != -1) {
                   highlightingRecognitionMatrixRow(false, microStepMatrixRowIndex);
                   microStepMatrixRowIndex = -1;
                }
            case 4:
                if (microStepMatrixRowIndex != -1) {
                   highlightingGenerationMatrixRow(false, microStepMatrixRowIndex);
                   microStepMatrixRowIndex = -1;
                }
            case 5:
                simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
                majorStepsCounter = 3;
                break;
            case 6:
                majorStepsCounter = 4;
        }
    }

    //
    //  MEDIUM STEP SIMULATION
    //

    /*
    */
    function processMediumSimulationStep(){
        console.log("\nProcessing MEDIUM Simulation Step: " + mediumStepsCounter);

         if(simulatedModel.noExternalInput && mediumStepsCounter == 0){
            simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
            mediumStepsCounter = 3;
            return;
         }

        switch(mediumStepsCounter) {
            // Handling External Input in processCommonExternalInputSteps preprocessor.
            case 0:
            case 1:
            case 2:
                mediumStepsCounter = processCommonExternalInputSteps(mediumStepsCounter);
                break;
            case 3:
                // MULTIPLYING CURRENT STATE BY RECOGNITION MATRIX; RESULT IS IN RECOGNIZED SITUATIONS VECTOR
                simulatedModel.multiplyStateVectorByRecognitionMatrix();
//
                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, true, -1, false);
                mediumStepsCounter = 4;
                break;
            case 4: // MULTIPLYING RECOGNIZED SITUATIONS VECTOR BY GENERATION MATRIX; RESULT IS IN PROPOSED STATE VECTOR
                simulatedModel.multiplyRecognizedSituationsVectorByGenerationMatrix();

                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, true, -1, false);
                mediumStepsCounter = 5;
                break;
            case 5: // INJECTING PROPOSED NEXT STATE VECTOR INTO PREVIOUS STATE VECTOR; RESULT IS IN NEXT STATE VECTOR
                simulatedModel.applyProposedNextStateVectorToModelCurrentStateVector();

                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
                mediumStepsCounter = 6;
                break;
            case 6: // ASSIGNING NEXT STATE VECTOR TO CURRENT STATE VECTOR
                mediumStepsCounter = processAssigningNextStateVectorToModelSourceVector(mediumStepsCounter);
                break;
        }
        console.log("\nProcessing MEDIUM Simulation Step: " + mediumStepsCounter);
    }

    /*
    */
    function resetFromMajorToMediumStepsSimulation(){
        console.log("\nResetting From MAJOR to MEDIUM Steps Simulation");
        switch(majorStepsCounter){
            case 0:
            case 1:
            case 2:
            case 3:
                mediumStepsCounter = majorStepsCounter;
            break;
            case 4:
                mediumStepsCounter = 6;
        }
    }

    /*
    */
    function resetFromMicroToMediumStepsSimulation(){
        console.log("\nResetting From MICRO to MEDIUM Steps Simulation");
        switch(microStepsCounter){
        case 0:
        case 1:
        case 2:
           mediumStepsCounter = microStepsCounter;
           break;
        case 3:
           if (microStepMatrixRowIndex != -1) {
               highlightingRecognitionMatrixRow(false, microStepMatrixRowIndex);
               microStepMatrixRowIndex = -1;
           }
           simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, false, -1, false);
           mediumStepsCounter = microStepsCounter;
           break;
        case 4:
           if (microStepMatrixRowIndex != -1) {
               highlightingGenerationMatrixRow(false, microStepMatrixRowIndex);
               microStepMatrixRowIndex = -1;
           }
           simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, false, -1, false);
           mediumStepsCounter = microStepsCounter;
           break;
        case 5:
           simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
           simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
           mediumStepsCounter = microStepsCounter;
           break;
        case 6:
           mediumStepsCounter = microStepsCounter;
        }
    }

    //
    //  MICRO STEPS SIMULATION
    //

    /*
    */
    function processMicroSimulationStep(){
        console.log("\nProcessing MICRO Simulation Step: " + microStepsCounter);

        if(!simulatedModel.hasExternalInput && microStepsCounter == 0){
            simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, true, -1, false);
            microStepsCounter = 3;
            return;
        }

        switch(microStepsCounter) {
            // Handling External Input in processCommonExternalInputSteps preprocessor.
            case 0:
            case 1:
            case 2:
                microStepsCounter = processCommonExternalInputSteps(microStepsCounter);
                break;
            case 3:
                // MULTIPLYING CURRENT STATE BY RECOGNITION MATRIX; RESULT IS IN RECOGNIZED SITUATIONS VECTOR
                if (microStepMatrixRowIndex == -1) {
                    microStepMatrixRowIndex = 0;
                    highlightingRecognitionMatrixRow(true, microStepMatrixRowIndex);
                    break;
                }
                highlightingRecognitionMatrixRow(false, microStepMatrixRowIndex);
                microStepMatrixRowIndex =
                simulatedModel.multiplyStateVectorByRecognitionMatrixInMicroSteps(microStepMatrixRowIndex);
                if (microStepMatrixRowIndex != -1) {
                    highlightingRecognitionMatrixRow(true, microStepMatrixRowIndex);
                } else {
                    //  Multiplication completed. Updating model view highlighting
                    simulatedModel.updateVectorStatus(simulatedModel.currentStateVectorObject, false, -1, false);
                    simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, true, -1, false);
                    microStepsCounter = 4;
                }
                break;
            case 4: // MULTIPLYING RECOGNIZED SITUATIONS VECTOR BY GENERATION MATRIX; RESULT IS IN PROPOSED STATE VECTOR
                if (microStepMatrixRowIndex == -1) {
                    microStepMatrixRowIndex = 0;
                    highlightingGenerationMatrixRow(true, microStepMatrixRowIndex);
                    break;
                }
                highlightingGenerationMatrixRow(false, microStepMatrixRowIndex);
                microStepMatrixRowIndex =
                simulatedModel.multiplyRecognizedSituationsVectorByGenerationMatrixInMicroSteps(microStepMatrixRowIndex);
                if (microStepMatrixRowIndex != -1) {
                    highlightingGenerationMatrixRow(true, microStepMatrixRowIndex);
                } else {
                    // Multiplication completed. Updating model view highlighting.
                    simulatedModel.updateVectorStatus(simulatedModel.recognizedSituationsVectorObject, false, -1, false);
                    simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, true, -1, false);
                    microStepsCounter = 5;
                }
                break;
            case 5: // INJECTING PROPOSED NEXT STATE VECTOR INTO PREVIOUS STATE VECTOR; RESULT IS IN NEXT STATE VECTOR
                simulatedModel.applyProposedNextStateVectorToModelCurrentStateVector();

                //  Updating model view highlighting
                simulatedModel.updateVectorStatus(simulatedModel.proposedStateVectorObject, false, -1, false);
                simulatedModel.updateVectorStatus(simulatedModel.nextStateVectorObject, true, -1, false);
                microStepsCounter = 6;
                break;
            case 6: // ASSIGNING NEXT STATE VECTOR TO CURRENT STATE VECTOR
                microStepsCounter = processAssigningNextStateVectorToModelSourceVector(microStepsCounter);
                break;
        }
        console.log("\nProcessing MICRO Simulation Step: " + microStepsCounter);
    }

    /*
    */
    function resetFromMajorToMicroStepsSimulation(){
        console.log("\nResetting From MAJOR to MICRO Steps Simulation");
        switch(majorStepsCounter){
            case 0:
            case 1:
            case 2:
            case 3:
                microStepsCounter = majorStepsCounter;
                break;
            case 4:
                microStepsCounter = 6;
        }
    }

    /*
    */
    function resetFromMediumToMicroStepsSimulation(){
        console.log("\nResetting From MEDIUM to MICRO Steps Simulation");
        microStepsCounter = mediumStepsCounter;
    }
