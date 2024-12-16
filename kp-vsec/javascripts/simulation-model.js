
//
//  Simulation Model is the holder of the data of selected model
//

    const GENERAL_ACTIVE_VECTOR_BACKGROUND_COLOR = "#FFE8E8";
    const GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR = "#FFAAAA";

    const EXTERNAL_INPUT_VECTOR_BACKGROUND_COLOR = "#ECF8ff";
    const EXTERNAL_INPUT_VECTOR_STATE_CHANGED_COLOR =  "#BBD6FF" // "#C0DEFF"; //"#CCE7FF"; // "#DDAAFF";

    const STATE_VECTOR_BACKGROUND_COLOR = "#E8FFE8";
    const STATE_VECTOR_STATE_CHANGED_COLOR = "#94D352";

    const ALL_VECTORS_BACKGROUND_COLOR = "#FFFFE8";
    const ALL_VECTORS_STATE_CHANGED_COLOR = "#FFE088"; //"#FFDFAA"; // "#FFC888"; // "#FF8800";

//    let stateChangedColorForOriginalBackground = #FF8800;

    const currentModel = {
        MATRIX_BACKGROUND_COLOR: "#FFFFEE",
        MATRIX_ROW_HIGHLIGHTED_BACKGROUND_COLOR: "#E5E5FF", // "#BB88FF", //"#94D352",
        selectedModel: "",
        selectedModelName: "Model-X-X",
        selectedModelKey: "Model-X-X",

        // Attribute that, when is true, switches computation procedure
        // to alternative, per target based, variable dependence schema.
        targetBasedComputation: false,

        // Both flags: hasExternalInput and noExternalInput should exist.
        // They are used in different places for convenience.
        stateDrivenBehavior: false,
        inputDrivenBehavior: false,
        hasExternalInput: false,
        noExternalInput: false,
        stateVectorIsExternalInput: true,

        initialStateVectorData: null,

//        selfDrivenSimulation: false,
        inputStateVectorObject: {
            name: "External Input Vector",
            vector: ["-","-","-"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: EXTERNAL_INPUT_VECTOR_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: EXTERNAL_INPUT_VECTOR_STATE_CHANGED_COLOR,
            currentBGColor: EXTERNAL_INPUT_VECTOR_BACKGROUND_COLOR,
        },
        currentStateVectorObject: {
            name: "State Vector",
            vector: ["0","0","0"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            highlightAsExternalVector: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: STATE_VECTOR_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: STATE_VECTOR_STATE_CHANGED_COLOR,
            currentBGColor: STATE_VECTOR_BACKGROUND_COLOR,
        },
        recognizedSituationsVectorObject: {
            name: "Recognized Situations Vector",
            vector: ["-","-","-","-","-","-","-","-"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: ALL_VECTORS_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: ALL_VECTORS_STATE_CHANGED_COLOR,
            currentBGColor: ALL_VECTORS_BACKGROUND_COLOR,
        },
        proposedStateVectorObject: {
            name: "Proposed State Vector",
            vector: ["-","-","-"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: ALL_VECTORS_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: ALL_VECTORS_STATE_CHANGED_COLOR,
            currentBGColor: ALL_VECTORS_BACKGROUND_COLOR,
        },
        dubbedCurrentStateVectorObject: {
            name: "Dubbed State Vector",
            vector: ["0","0","0"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: STATE_VECTOR_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: STATE_VECTOR_STATE_CHANGED_COLOR,
            currentBGColor: STATE_VECTOR_BACKGROUND_COLOR,
        },
        nextStateVectorObject: {
            name: "Next State Vector",
            vector: ["-","-","-"],
            highlightedElements: Array.apply(false, Array(1)),
            activeBackground: false,
            ACTIVE_VECTOR_STATE_CHANGED_COLOR: GENERAL_ACTIVE_VECTOR_STATE_CHANGED_COLOR,
            VECTOR_BACKGROUND_COLOR: ALL_VECTORS_BACKGROUND_COLOR,
            VECTOR_STATE_CHANGED_COLOR: ALL_VECTORS_STATE_CHANGED_COLOR,
            currentBGColor: ALL_VECTORS_BACKGROUND_COLOR,
        },

        inputVectorCurrentIndex: 0,
        modelExternalInputSource: ["-","-","-"],

        recognitionMatrix: [
                             ["0","0","0"],
                             ["0","0","1"],
                             ["0","1","0"],
                             ["0","1","1"],
                             ["1","0","0"],
                             ["1","0","1"],
                             ["1","1","0"],
                             ["1","1","1"]
                           ],
        generationMatrix: [
                          ["0","0","0","0","0","1","0","0"],
                          ["0","0","1","0","1","0","1","1"],
                          ["1","0","0","1","0","1","1","1"]
                          ],

    /*
        Neither the variable itself nor the function below are currently used in the application
    */
//    isSelfDrivenSimulation: function() {
////        console.log('Input State Vector = '+inputStateVector);
//        return this.selfDrivenSimulation;
//    },

        getInputStateVectorData: function() {
    //        console.log('Input State Vector = ' +this.inputStateVector);
            return this.inputStateVectorObject.vector; //vectorCopy;
        },

        getCurrentStateVectorData: function() {
    //        console.log('Current State Vector = '+this.currentStateVector);
            return this.currentStateVectorObject.vector; //vectorCopy;
        },

        getRecognizedSituationsVectorData: function() {
    //        console.log('Recognized Situations Vector = '+this.recognizedSituationsVector);
            return this.recognizedSituationsVectorObject.vector;
        },

        getProposedStateVectorData: function() {
    //        console.log('Proposed State Vector = '+this.proposedStateVector);
            return this.proposedStateVectorObject.vector;
        },

        getNextStateVectorData: function() {
    //        console.log('Next State Vector = '+this.nextStateVector);
            return this.nextStateVectorObject.vector;
        },

        // --------------- Method below return Vector Object

        getInputStateVectorObject: function() {
            return this.inputStateVectorObject;
        },

        // ---------------

        getRecognitionMatrixData: function() {
            let matrixCopy = getMatrixCopy(this.recognitionMatrix);
    //        printMatrix(this.modelName+": Recognition", matrixCopy);
            return matrixCopy;
        },

        getGenerationMatrixData: function() {
            let matrixCopy = getMatrixCopy(this.generationMatrix);
    //        printMatrix(this.modelName+": Generation", matrixCopy);
            return matrixCopy;
        },

        // ////////////////////////////////////////////////////////////////////
        //  Update given vector background color and State Change Highlighting
        // ////////////////////////////////////////////////////////////////////

        setVectorNewValue: function(vectorObject, index, newValue) {
            let prevValue = vectorObject.vector[index];
            let changed = prevValue != newValue;
            vectorObject.highlightedElements[index] = changed;
            vectorObject.vector[index] = newValue;
        },

        setVectorNewValueForRecognition: function(vectorObject, index, newValue) {
            let prevValue = vectorObject.vector[index];
            if(newValue == "!" || prevValue == "!"){
                let changed = prevValue != newValue;
                vectorObject.highlightedElements[index] = changed;
                vectorObject.vector[index] = newValue;
            } else {
                vectorObject.highlightedElements[index] = false;
                vectorObject.vector[index] = newValue;
            }
        },

        updateVectorStatus: function(vectorObject, active, index, value) {
            if(active) {
                vectorObject.currentBGColor = GENERAL_ACTIVE_VECTOR_BACKGROUND_COLOR;
                vectorObject.activeBackground = true;
            }else{
                vectorObject.currentBGColor = vectorObject.VECTOR_BACKGROUND_COLOR;
                vectorObject.activeBackground = false;
            }
            if(index != -1){
                vectorObject.highlightedElements[index] = value;
            }
        },

        /*
            Result: updated External Input Vector
        */
        resetModelToInitialState: function() {

            this.inputVectorCurrentIndex = 0;

            this.inputStateVectorObject.currentBGColor = EXTERNAL_INPUT_VECTOR_BACKGROUND_COLOR;
            this.currentStateVectorObject.currentBGColor = STATE_VECTOR_BACKGROUND_COLOR;
            this.recognizedSituationsVectorObject.currentBGColor = ALL_VECTORS_BACKGROUND_COLOR;
            this.proposedStateVectorObject.currentBGColor = ALL_VECTORS_BACKGROUND_COLOR;
            this.dubbedCurrentStateVectorObject.currentBGColor = STATE_VECTOR_BACKGROUND_COLOR;
            this.nextStateVectorObject.currentBGColor = ALL_VECTORS_BACKGROUND_COLOR;

             // This vector is created again
            let inputStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
            this.inputStateVectorObject.vector = inputStateVector;

            // This vector is a defensive copy of the selected model
            let currentStateVector = getVectorCopy(this.initialStateVectorData);
            this.currentStateVectorObject.vector = currentStateVector;
            this.dubbedCurrentStateVectorObject.vector = currentStateVector;

            // This vector is a defensive copy of the selected model
            let recognizedSituationsVector = Array(currentModel.recognitionMatrix.length).fill("-");
            this.recognizedSituationsVectorObject.vector = recognizedSituationsVector;

            // This vector is created again
            let proposedStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
            this.proposedStateVectorObject.vector = proposedStateVector;

            // This vector is created again
            let nextStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
            this.nextStateVectorObject.vector = nextStateVector;

            this.inputStateVectorObject.highlightedElements.fill(false);
            this.inputStateVectorObject.activeBackground = false;
            this.currentStateVectorObject.highlightedElements.fill(false);
            this.currentStateVectorObject.activeBackground = false;
            this.dubbedCurrentStateVectorObject.highlightedElements.fill(false);
            this.dubbedCurrentStateVectorObject.activeBackground = false;
            this.recognizedSituationsVectorObject.highlightedElements.fill(false);
            this.recognizedSituationsVectorObject.activeBackground = false;
            this.proposedStateVectorObject.highlightedElements.fill(false);
            this.proposedStateVectorObject.activeBackground = false;
            this.nextStateVectorObject.highlightedElements.fill(false);
            this.nextStateVectorObject.activeBackground = false;
        },

        // //////////////////////////////////////
        //  Model Next State Computation Methods
        // //////////////////////////////////////

        advanceModelInputVector: function(){
            let tmpVector = this.modelExternalInputSource[this.inputVectorCurrentIndex]
            let externalInputVector = getVectorCopy(tmpVector);
            this.inputVectorCurrentIndex++;
            this.inputVectorCurrentIndex %= this.modelExternalInputSource.length;
            console.log("\nAdvance Input Vector: next Input Vector = " + this.inputStateVectorObject.vector);

            let vectorSize = this.inputStateVectorObject.vector.length;
            for(let i = 0; i < vectorSize; i++){
                let newValue = externalInputVector[i];

//                if(newValue != "-"){
                    if(this.stateVectorIsExternalInput){
                        this.currentStateVectorObject.highlightedElements[i] = false;
                        let prevValue = this.currentStateVectorObject.vector[i];
                        let changed = prevValue != newValue;
                        this.currentStateVectorObject.highlightedElements[i] = changed;
                        this.currentStateVectorObject.vector[i] = newValue;
                    } else {
                        this.inputStateVectorObject.highlightedElements[i] = false;
                        let prevValue = this.inputStateVectorObject.vector[i];
                        let changed = prevValue != newValue;
                        this.inputStateVectorObject.highlightedElements[i] = changed;
                        this.inputStateVectorObject.vector[i] = newValue;
                    }
//                }
            }

            if(this.stateVectorIsExternalInput){
                this.currentStateVectorObject.highlightAsExternalVector = true;
            }
        },

        /*
            Result: updated Current State Vector
        */
        applyExternalInputVectorToModelCurrentStateVector: function(){
            let vectorSize = this.currentStateVectorObject.vector.length;
            for(let i = 0; i < vectorSize; i++){
                let leftOperand = this.currentStateVectorObject.vector[i];
                let rightOperand = this.inputStateVectorObject.vector[i]
                let operationResult = AlgebraOfSymbols.application(leftOperand, rightOperand);
                this.setVectorNewValue(this.currentStateVectorObject, i, operationResult);
            }
            this.clearGivenVector(this.inputStateVectorObject, false, true);

//            this.updateVectorStatus(this.inputStateVectorObject, false, 0, true);
//            this.updateVectorStatus(this.inputStateVectorObject, true, 0, false);
//            this.updateVectorStatus(this.currentStateVectorObject, false, 0, true);
        },

        /*
            Result: Recognized Situations Vector computed
        */
        multiplyStateVectorByRecognitionMatrix: function(){
            let recognitionMatrixRowsSize = this.recognitionMatrix.length;
            for(let i = 0; i < recognitionMatrixRowsSize; i++){
                let conjunctionResult = this.stateVectorByRecognitionMatrixRowMultiplicationProcedure(
                                                                   this.recognitionMatrix[i],
                                                                   this.currentStateVectorObject.vector);
                this.setVectorNewValueForRecognition(this.recognizedSituationsVectorObject, i, conjunctionResult);
            }
            this.clearGivenVector(this.currentStateVectorObject, false, true);
        },

        /*
            STATE VECTOR BY RECOGNITION MATRIX MULTIPLICATION IN MICRO STEPS
            Result: Recognized Situations Vector computed
        */
        multiplyStateVectorByRecognitionMatrixInMicroSteps: function(matrixRowIndex){
            let conjunctionResult = this.stateVectorByRecognitionMatrixRowMultiplicationProcedure(
                                                                       this.recognitionMatrix[matrixRowIndex],
                                                                       this.currentStateVectorObject.vector);
            this.setVectorNewValueForRecognition(this.recognizedSituationsVectorObject, matrixRowIndex, conjunctionResult);

            matrixRowIndex++;
            let recognitionMatrixRowsSize = this.recognitionMatrix.length;
            if(matrixRowIndex == recognitionMatrixRowsSize){
                this.clearGivenVector(this.currentStateVectorObject, false, true);
                matrixRowIndex = -1;
            }
            return matrixRowIndex;
        },

        /*
            Result: element of Recognized Situations Vector computed
        */
        stateVectorByRecognitionMatrixRowMultiplicationProcedure: function(recognitionMatrixRow, vector){
            let conjunctionResult = "-";
            let recognitionMatrixRowsSize = recognitionMatrixRow.length;
            for(let j = 0; j < recognitionMatrixRowsSize; j++){
                let operand1 = recognitionMatrixRow[j];
                let operand2 = vector[j];
                let comparisonResult = AlgebraOfSymbols.equivalence(operand1, operand2);
                conjunctionResult = AlgebraOfSymbols.conjunction(conjunctionResult, comparisonResult);
            }
            return conjunctionResult;
        },

        /*
            Result: Proposed State Vector computed
        */
        multiplyRecognizedSituationsVectorByGenerationMatrix: function(){
            let generationMatrixRowsSize = this.generationMatrix.length;
            for(let i = 0; i < generationMatrixRowsSize; i++){
                let disjunctionResult = this.recognizedSituationsVectorByGenerationMatrixRowMultiplicationProcedure(
                                                                      this.generationMatrix[i],
                                                                      this.recognizedSituationsVectorObject.vector);
                this.setVectorNewValue(this.proposedStateVectorObject, i, disjunctionResult);
            }
        },

        /*
            RECOGNIZED SITUATIONS VECTOR BY GENERATION MATRIX MULTIPLICATION IN MICRO STEPS
            Result: Proposed Next State Vector computed
        */
        multiplyRecognizedSituationsVectorByGenerationMatrixInMicroSteps: function(matrixRowIndex){
            let disjunctionResult = this.recognizedSituationsVectorByGenerationMatrixRowMultiplicationProcedure(
                                                                  this.generationMatrix[matrixRowIndex],
                                                                  this.recognizedSituationsVectorObject.vector);
            this.setVectorNewValue(this.proposedStateVectorObject, matrixRowIndex, disjunctionResult);

            matrixRowIndex++;
            let generationMatrixRowsSize = this.generationMatrix.length;
            if(matrixRowIndex == generationMatrixRowsSize){
                this.clearGivenVector(this.recognizedSituationsVectorObject, false, true);
                matrixRowIndex = -1;
            }
            return matrixRowIndex;
        },

        /*
            Result: element of Proposed Next State Vector computed
        */
        recognizedSituationsVectorByGenerationMatrixRowMultiplicationProcedure: function(generationMatrixRow, vector){
            let disjunctionResult = "-";
            let generationMatrixRowSize = generationMatrixRow.length;
            for(let j = 0; j < generationMatrixRowSize; j++){
                let operand1 = generationMatrixRow[j];
                let operand2 = vector[j];
                let productionResult = AlgebraOfSymbols.production(operand1, operand2);
                if(operand1 == "H"){
                let a = 0;
                }
                disjunctionResult = AlgebraOfSymbols.disjunction(disjunctionResult, productionResult);
                if(disjunctionResult == "#"){
                let a = 0;
                }
            }
            return disjunctionResult;
        },

        /*
            Result: updated Next State Vector
        */
        applyProposedNextStateVectorToModelCurrentStateVector: function(){
            let vectorSize = this.proposedStateVectorObject.vector.length;
            for(let i = 0; i < vectorSize; i++){
                let leftOperand = this.currentStateVectorObject.vector[i];
                let rightOperand = this.proposedStateVectorObject.vector[i];
                let operationResult = AlgebraOfSymbols.application(leftOperand, rightOperand);
//                this.nextStateVectorObject.vector[i] = operationResult;
                this.nextStateVectorObject.vector[i] = this.currentStateVectorObject.vector[i];
                this.setVectorNewValue(this.nextStateVectorObject, i, operationResult);
            }
        },

        /*
            Result: reinitialized Current State Vector
        */
        assignNextStateVectorToModelCurrentStateVector: function(){
            let vectorSize = this.proposedStateVectorObject.vector.length;
            for(let i = 0; i < vectorSize; i++){
//                this.currentStateVectorObject.vector[i] = this.nextStateVectorObject.vector[i];
                this.setVectorNewValue(this.currentStateVectorObject, i, this.nextStateVectorObject.vector[i]);
            }
//            this.clearIteration();
        },

        /*
            Clears all vectors state excep for Current State Vector
        */
        clearIteration: function(){
            this.clearGivenVector(this.recognizedSituationsVectorObject, true, true);
            this.clearGivenVector(this.proposedStateVectorObject, true, true);
            this.clearGivenVector(this.nextStateVectorObject, true, true);
        },

        clearGivenVector: function(vectorObject, clearValues, clearHighlights){
            let vectorSize = vectorObject.vector.length;
            for(let i = 0; i < vectorSize; i++){
                if(clearValues){
                    vectorObject.vector[i] = "-";
                }
                if(clearHighlights){
                    vectorObject.highlightedElements[i] = false;
                }
            }
        },

        shuffle: function(array) {
          let currentIndex = array.length,  randomIndex;
          // While there remain elements to shuffle.
          while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
          }
          return array;
        },

        shuffleArray: function(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        // Example of ternary operator
//        let i2 = shuffled.length == 2 ? 2 : rand(shuffled.length + 1);

    }; /////////////////   End of Model

    /*

    */
    function setUserSelectedModelAsCurrent(userChoiceModelID) {

        let selectedModelDefinition = getModelDefinitionFromModelStorage(userChoiceModelID)
        if(selectedModelDefinition == null){
            console.log("\nModel for User Provided Model ID "+userChoiceModelID + " not FOUND");
            return;
        }

        console.log("\nModel for User Provided Model ID "+userChoiceModelID + " FOUND. Setting it as current model.");

        currentModel.selectedModelDefinition = selectedModelDefinition;
        currentModel.selectedModelName = selectedModelDefinition.modelName;
        currentModel.selectedModelKey = selectedModelDefinition.modelKey;

        currentModel.stateDrivenBehavior = selectedModelDefinition.stateDrivenBehavior;
        currentModel.inputDrivenBehavior = selectedModelDefinition.inputDrivenBehavior;

        currentModel.hasExternalInput = selectedModelDefinition.hasExternalInput;
        currentModel.noExternalInput = !selectedModelDefinition.hasExternalInput;
        currentModel.stateVectorIsExternalInput = selectedModelDefinition.stateVectorIsExternalInput;
//        currentModel.selfDrivenSimulation = selectedModelDefinition.selfDrivenSimulation;

        // This vector data defines Model State Vector content and size.
        currentModel.initialStateVectorData = selectedModelDefinition.getInitialStateVectorData();

        currentModel.modelExternalInputSource = selectedModelDefinition.getExternalInputSequence();
        currentModel.recognitionMatrix = selectedModelDefinition.getRecognitionMatrixData();
        currentModel.generationMatrix = selectedModelDefinition.getGenerationMatrixData();
//        printMatrix(currentModel.selectedModelDefinitionName +": Model Input", currentModel.modelExternalInputSource);

        // This vector is a defensive copy of the selected model
        let inputStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
        currentModel.inputStateVectorObject.vector = inputStateVector;
        currentModel.inputStateVectorObject.highlightedElements = Array(inputStateVector.length).fill(false);

        // This vector is a defensive copy of the selected model
        let currentStateVector = getVectorCopy(currentModel.initialStateVectorData);
        currentModel.currentStateVectorObject.vector = currentStateVector;
        currentModel.currentStateVectorObject.highlightedElements = Array(currentStateVector.length).fill(false);
        currentModel.dubbedCurrentStateVectorObject.vector = currentStateVector;
        currentModel.dubbedCurrentStateVectorObject.highlightedElements = Array(currentStateVector.length).fill(false);

        // This vector is a defensive copy of the selected model
        let recognizedSituationsVector = Array(currentModel.recognitionMatrix.length).fill("-");
        currentModel.recognizedSituationsVectorObject.vector = recognizedSituationsVector;
        currentModel.recognizedSituationsVectorObject.highlightedElements = Array(recognizedSituationsVector.length).fill(false);

        // This vector is a defensive copy of the selected model
        let proposedStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
        currentModel.proposedStateVectorObject.vector = proposedStateVector;
        currentModel.proposedStateVectorObject.highlightedElements = Array(proposedStateVector.length).fill(false);

        // This vector is a defensive copy of the selected model
        let nextStateVector = Array(currentModel.initialStateVectorData.length).fill("-");
        currentModel.nextStateVectorObject.vector = nextStateVector;
        currentModel.nextStateVectorObject.highlightedElements = Array(nextStateVector.length).fill(false);

        console.log(currentModel);
        return currentModel;
    }