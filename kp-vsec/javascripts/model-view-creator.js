
// Script: Model View Creator

    // Variable rowMax is used to set Model Simulation Space height for models with different state
    // vector size. It is calculated dynamically and holds number of rows of Recognition Table (and
    // recognized situations vector).
    let rowsMax = 0;

    const equalSignID = "equal-sign";
    const stateApplicationSignID = "state-application-sign";
    const genMultiplicationSignID = "gen-multiplication-sign";
    const recMultiplicationSignID = "rec-multiplication-sign";
    const inpApplicationSignID = "inp-application-sign";

    const inputStateVectorID = "input-state-vector";
    const currentStateVectorID = "current-state-vector-1";
    const recognizedSituationsVectorID = "recognized-situations-vector";
    const proposedStateVectorID = "proposed-state-vector";
    const dubbedCurrentStateVectorID = "current-state-vector-2";
    const nextStateVectorID = "next-state-vector";

    const recognitionMatrixID = "recognition-matrix";
    const generationMatrixID = "generation-matrix";

    const modelNameViewID = "modelNameViewID";
    const autoSimulationStatusViewID = "autoSimulationStatusViewID";
    const modelBehaviorModeViewID = "modelBehaviorModeViewID";
    const simulationStepExecutedViewID = "simulationStepExecutedViewID";

    const MAJOR_STEP_NAME = "Major Step";
    const MEDIUM_STEP_NAME = "Medium Step";
    const MICRO_STEPS_NAME = "Micro Step";
    const EXECUTED = " executed";
    const SIMULATION_RESET_TEXT = "Simulation reset";

    let nextStateVectorData;
    let currentStateVectorData;
    let proposedStateVectorData;
    let recognizedSituationsVectorData;
    let inputStateVectorData;
    let recognitionMatrixData;
    let generationMatrixData;

    /*
        Clear Model View
    */
    function clearModelView() {

        // Removing existing model

        removeMatrix(equalSignID);
        removeMatrix(stateApplicationSignID);
        removeMatrix(genMultiplicationSignID);
        removeMatrix(recMultiplicationSignID);
        removeMatrix(inpApplicationSignID);

        removeMatrix(nextStateVectorID);
        removeMatrix(dubbedCurrentStateVectorID);
        removeMatrix(proposedStateVectorID);
        removeMatrix(recognizedSituationsVectorID);
        removeMatrix(currentStateVectorID);
        removeMatrix(inputStateVectorID);

        removeMatrix(recognitionMatrixID);
        removeMatrix(generationMatrixID);
    }

    /*
        Create Model View
    */
    function createModelView(obtainedCurrentModel) {

        // Clear model view if populated
        clearModelView();
        // Building new model
        rowsMax = 0;

//        console.log("\nModel for User Provided Model ID FOUND. Building the model view.");

        let currentModel = obtainedCurrentModel;
        let currentModelKey = obtainedCurrentModel.selectedModelKey;

        // Taking vector data from model definition

        inputStateVectorData = currentModel.getInputStateVectorData();
//        console.log('\nCREATOR: Input State Vector Data = '+inputStateVectorData);

        currentStateVectorData = currentModel.getCurrentStateVectorData();
//        console.log('\nCREATOR: Current State Vector Data = '+currentStateVectorData);

        recognizedSituationsVectorData = currentModel.getRecognizedSituationsVectorData();
//        console.log('\nCREATOR: Recognized Situations Data Vector = '+recognizedSituationsVectorData);

        proposedStateVectorData = currentModel.getProposedStateVectorData();
//        console.log('\nCREATOR: Proposed State Vector Data = '+proposedStateVectorData);

        nextStateVectorData = currentModel.getNextStateVectorData();
//        console.log('\nCREATOR: Next State Vector Data = '+nextStateVectorData);

        // Taking matrix data from model definition

        recognitionMatrixData = currentModel.getRecognitionMatrixData();
//        console.log('\nCREATOR: Recognition Matrix Data = '+recognitionMatrixData);

        generationMatrixData = currentModel.getGenerationMatrixData();
//        console.log('\nCREATOR: Generation Matrix Data = '+generationMatrixData);

        // Building Model View

        let nextStateVector = document.getElementById(nextStateVectorID);
//        console.log("\nCREATOR: createModelView: Next State Vector table = "+nextStateVector );
        createVector(nextStateVector, nextStateVectorData);

        let equalSign = document.getElementById(equalSignID);
        let operationSignData = "=";
        createOperationSign(equalSign, operationSignData);

        let dubbedCurrentStateVector = document.getElementById(dubbedCurrentStateVectorID);
//        console.log("\nCREATOR: createModelView: Dubbed Current State Vector table = "+dubbedCurrentStateVector );
        createVector(dubbedCurrentStateVector, currentStateVectorData);

        let stateApplicationSign = document.getElementById(stateApplicationSignID);
        let stateApplicationSignData = "<";
        createOperationSign(stateApplicationSign, stateApplicationSignData);

        let proposedStateVector = document.getElementById(proposedStateVectorID);
//        console.log("\nCREATOR: createModelView: Proposed State Vector table = "+proposedStateVector );
        createVector(proposedStateVector, proposedStateVectorData);

        let genMultiplicationSign = document.getElementById(genMultiplicationSignID);
        let genMultiplicationSignData = "*";
        createOperationSign(genMultiplicationSign, genMultiplicationSignData);

        let recognizedSituationsVectorView = document.getElementById(recognizedSituationsVectorID);
//        console.log("\nCREATOR: createModelView: Recognized Situations Vector table = "+recognizedSituationsVector );
        createVector(recognizedSituationsVectorView, recognizedSituationsVectorData);

        let recMultiplicationSign = document.getElementById(recMultiplicationSignID);
        let recMultiplicationSignData = "*";
        createOperationSign(recMultiplicationSign, recMultiplicationSignData);

        let currentStateVector1 = document.getElementById(currentStateVectorID);
//        console.log("\nCREATOR: createModelView: Current State Vector 1 table = "+currentStateVector1 );
        createVector(currentStateVector1, currentStateVectorData);

        let inpApplicationSign = document.getElementById(inpApplicationSignID);
        let inpApplicationSignData = "<";
        let inputStateVector = document.getElementById(inputStateVectorID);

        let stateVectorHolder  = document.getElementById("state-vector-holder");
        let inpAppSignHolder  = document.getElementById("input-app-sign-holder");
        let inputVectorHolder  = document.getElementById("input-vector-holder");

        if (simulatedModel.hasExternalInput && !simulatedModel.stateVectorIsExternalInput) {
            createOperationSign(inpApplicationSign, inpApplicationSignData);
            createVector(inputStateVector, inputStateVectorData);

            let marginRight10 = "10px";
            let marginRight5 = "5px";
            let minWidth = "";

            stateVectorHolder.style.marginRight = marginRight10;
            stateVectorHolder.style.width = minWidth;

            inpAppSignHolder.style.marginRight = marginRight10;
            inpAppSignHolder.style.width = minWidth;

            inputVectorHolder.style.marginRight = marginRight5;
            inputVectorHolder.style.width = minWidth;

            inputStateVector.style.visibility = "visible";

        } else {

            let marginRight0 = "0px";
            let minWidth = "0px";
            let marginRight10 = "10px";

            stateVectorHolder.style.marginRight = marginRight0;
            stateVectorHolder.style.width = minWidth;

            inpAppSignHolder.style.marginRight = marginRight0;
            inpAppSignHolder.style.width = minWidth;

            inputVectorHolder.style.marginRight = marginRight10;
            inputVectorHolder.style.width = minWidth;

            inputStateVector.style.visibility = "hidden";
        }

        // Creating Recognition Matrix

        let recognitionMatrix = document.getElementById(recognitionMatrixID);
//        console.log("\nCREATOR: createModelView: Recognition Matrix table = "+recognitionMatrix );
        createMatrix(recognitionMatrixID, recognitionMatrix, recognitionMatrixData);

        // Creating Generation Matrix

        let generationMatrix = document.getElementById(generationMatrixID);
//        console.log("\nCREATOR: createModelView: Generation Matrix table = "+generationMatrix );
        createMatrix(generationMatrixID, generationMatrix, generationMatrixData);
    //    generationMatrix.style.backgroundColor = 'blue';
    }

    //
    //  Create Table Sign
    //

//    function showTable(id){
//        document.getElementById(id).style.visibility = "visible";
//    }
//    function hideTable(id){
//        document.getElementById(id).style.visibility = "hidden";
//    }

    function createTableTag(div, data) {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(data);
        cell.appendChild(text);
        cell.style.border = 0;
        cell.style.fontWeight = "bold";
        cell.style.fontSize = "18pt";
    }

    //
    //  Create Operation Sign
    //

    function createOperationSign(table, data) {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(data);
        cell.appendChild(text);
        cell.style.border = 0;
        cell.style.fontWeight = "bold";
        cell.style.fontSize = "18pt";
    }

    //
    //  Create Vector
    //

    function createVector(table, data) {
        for (key in data) {
            let row = table.insertRow( );
            let cell = row.insertCell();
            let text = document.createTextNode(data[key]);
            cell.appendChild(text);
            cell.style.fontSize = "9pt";
//            cell.style.backgroundColor = "#FF8800"
        }
    }

    //
    //  Create Matrix
    //

    function createMatrix(id, table, data) {
//        console.log("I am inside createMatrix, dada is: "+ id +'   '+ data);
        for (let element of data) {
            let row = table.insertRow( );
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
                cell.style.fontSize = "9pt";
                cell.style.width = "18pt";
//                cell.style.padding = "4px";
//                cell.style.backgroundColor = "#FF8800"
            }
        }

        let rows = data.length;
        let columns = data[0].length;
//        console.log("rows: " + rows + ", columns: " + columns);
        let tw = columns * 20;
        let tableWidth = '' + tw +'px';
//        console.log("tableWidth is: " + tw);
        table.style.width = tableWidth;

        //
        //  Setting up Model Simulation Space Height
        //

        if (rows > rowsMax){
            rowsMax = rows;
        }

        let rowHeight = table.rows[0].offsetHeight
//        console.log("\nRow Height = "+rowHeight);
        let totalHeight = rowsMax * rowHeight;
        let spaceHeight = ""+totalHeight+"pt";
//        console.log("\nR O W S   M A X   = " + rowsMax);
//        console.log("\nS P A C E   H E I G H T is: " + spaceHeight);

        let modelSimulationSpace = document.getElementById("model-simulation-space");
        modelSimulationSpace.style.height = spaceHeight;
    }

    ///////////////  Highlighting Matrix Row  //////////////////////////////////////////////////////////////////////////

    /*
        This function is called when Reset button
        clicked. It removes matrix rows highlighting
        set by Micro Simulation Step.
    */
    function clearMatricesHighlighting() {

        let matrixTableToBeHighlighted;

        let recognitionMatrixRowsSize = recognizedSituationsVectorData.length;
        matrixTableToBeHighlighted = document.getElementById(recognitionMatrixID);
        for(let i = 0; i < recognitionMatrixRowsSize; i++){
            highlightMatrixRow(matrixTableToBeHighlighted, false, i);
        }
        let generationMatrixRowsSize = nextStateVectorData.length;
        matrixTableToBeHighlighted = document.getElementById(generationMatrixID);
        for(let i = 0; i < generationMatrixRowsSize; i++){
            highlightMatrixRow(matrixTableToBeHighlighted, false, i);
        }
    }

    function highlightingRecognitionMatrixRow(highlight, index) {
        let matrixTableToBeHighlighted = document.getElementById(recognitionMatrixID);
        highlightMatrixRow(matrixTableToBeHighlighted, highlight, index);
    }

    function highlightingGenerationMatrixRow(highlight, index) {
            let matrixTableToBeHighlighted = document.getElementById(generationMatrixID);
            highlightMatrixRow(matrixTableToBeHighlighted, highlight, index);
    }

    function highlightMatrixRow(matrixTableToBeHighlighted, highlight, index) {
        if(matrixTableToBeHighlighted == null){
            console.log("\nmatrixTableToBeHighlighted is null, RETURN");
            return;
        }
        let rows = matrixTableToBeHighlighted.getElementsByTagName("tr");
        if(rows.length == 0){
            console.log("\nMatrix has no rows, RETURN");
            return;
        }
        let rowSize = rows.length;
        if(rowSize == 0){
            console.log("\nMatrix has no columns, RETURN");
            return;
        }

        let row = matrixTableToBeHighlighted.rows[index];
        for(let cell of row.cells) {
            if(highlight){
                cell.style.backgroundColor = simulatedModel.MATRIX_ROW_HIGHLIGHTED_BACKGROUND_COLOR;
            } else {
                cell.style.backgroundColor = simulatedModel.MATRIX_BACKGROUND_COLOR;
            }
        }
    }

    ///////////////  Updating View Elements as Model State Changed  ////////////////////////////////////////////////////

    function updateViewElementsAsModelStateChanged(simulatedModel) {
        if(simulatedModel.hasExternalInput && !simulatedModel.stateVectorIsExternalInput){
            let updatedInputStateVectorObject = simulatedModel.inputStateVectorObject;
            updateVectorAndApplyIndicators(inputStateVectorID, false, updatedInputStateVectorObject);
        }

        let updatedCurrentStateVectorObject = simulatedModel.currentStateVectorObject;
        let updatedRecognizedSituationsVectorObject = simulatedModel.recognizedSituationsVectorObject;
        let updatedProposedStateVectorObject = simulatedModel.proposedStateVectorObject;
        let updatedDubbedCurrentStateVectorObject = simulatedModel.dubbedCurrentStateVectorObject;
        let updatedNextStateVectorObject = simulatedModel.nextStateVectorObject;

        let highlightAsExternalVector = simulatedModel.currentStateVectorObject.highlightAsExternalVector;
        simulatedModel.currentStateVectorObject.highlightAsExternalVector = false;
        updateVectorAndApplyIndicators(currentStateVectorID, highlightAsExternalVector, updatedCurrentStateVectorObject);
        updateVectorAndApplyIndicators(recognizedSituationsVectorID, false, updatedRecognizedSituationsVectorObject);
        updateVectorAndApplyIndicators(proposedStateVectorID, false, updatedProposedStateVectorObject);
        updateVectorAndApplyIndicators(dubbedCurrentStateVectorID, false, updatedDubbedCurrentStateVectorObject);
        updateVectorAndApplyIndicators(nextStateVectorID, false, updatedNextStateVectorObject);
    }

    //
    //  Update Vector
    //

    function updateVectorAndApplyIndicators(id, highlightAsExternalInput, vectorObject) {
    //        console.log("\nI am inside Update Vector, id is: "+ id);
        let vectorToBeUpdated = document.getElementById(id);

        if(vectorToBeUpdated == null){
            console.log("\nvectorToBeUpdated is null, RETURN");
            return;
        }
        let rows = vectorToBeUpdated.getElementsByTagName("tr");
        if(rows.length == 0){
            console.log("\nvector has no rows, RETURN");
            return;
        }
        let rowSize = rows.length;
        if(rowSize == 0){
            console.log("\nCalculated SIZE IS 0, RETURN");
            return;
        }

//        console.log("\nrowSize is "+rowSize);

        let i = 0;
        for (let row of vectorToBeUpdated.rows) {
//            console.log("\nCell Height is "+row.offsetHeight);
            for(let cell of row.cells) {
                cell.innerText = vectorObject.vector[i];
                if(highlightAsExternalInput){
                    cell.style.backgroundColor = EXTERNAL_INPUT_VECTOR_BACKGROUND_COLOR;
                }else{
                    cell.style.backgroundColor = vectorObject.currentBGColor;
                }
                if(vectorObject.highlightedElements[i]) {
                    if(vectorObject.activeBackground) {
                        if(highlightAsExternalInput){
                            cell.style.backgroundColor = EXTERNAL_INPUT_VECTOR_STATE_CHANGED_COLOR;
                        } else{
                            cell.style.backgroundColor = vectorObject.ACTIVE_VECTOR_STATE_CHANGED_COLOR;
                        }
                    } else {
                        cell.style.backgroundColor = vectorObject.VECTOR_STATE_CHANGED_COLOR;
                    }
                }
            }
            i++;
        }
    }

    //
    //  Updating Representation Area Model Name
    //

    function showHideModelName(modelName) {
        let modelNameView = document.getElementById(modelNameViewID);
        if(modelName == null){
            modelNameView.innerText = "";
        }else{
            modelNameView.style.color = "#701000"; //  401000 #803000 "#c27101"; // "#660000";
            modelNameView.style.fontWeight = "normal";
            modelNameView.innerText = modelName;
        }
    }

    //
    //  Updating Model Representation Area attributes
    //

    function showHideAutoSimulationStatus(showAutoSimulationStatus) {
        let autoSimulationStatusView = document.getElementById(autoSimulationStatusViewID);
        if(showAutoSimulationStatus){
            autoSimulationStatusView.style.visibility = "visible";
        }else{
            autoSimulationStatusView.style.visibility ="hidden";
        }
    }

    function paintAutoSimulationCounter(tickCounterValue) {
        let autoSimulationStatusView = document.getElementById(autoSimulationStatusViewID);
        let upperLimitedCounterValue = tickCounterValue % 100;
        let valueToShow = upperLimitedCounterValue.toString().padStart(3, '0');
        autoSimulationStatusView.innerText = "Auto  | tick: "+valueToShow;
    }

    const STATE_DRIVEN_BEHAVIOR = "State driven behavior";
    const MIXED_DRIVEN_BEHAVIOR = "State & Input driven behavior";
    const BEHAVIOR_TYPE_UNDEFINED = "Behavior type undefined";

    function showModelBehaviorMode(currentModel) {
        let modelBehaviorModeView = document.getElementById(modelBehaviorModeViewID);
        if(currentModel.stateDrivenBehavior && !currentModel.inputDrivenBehavior){
            modelBehaviorModeView.innerText = STATE_DRIVEN_BEHAVIOR;
        } else if(currentModel.stateDrivenBehavior && currentModel.inputDrivenBehavior){
            modelBehaviorModeView.innerText = MIXED_DRIVEN_BEHAVIOR;
        } else {
            modelBehaviorModeView.innerText = BEHAVIOR_TYPE_UNDEFINED;
        }
    }

    function showSimulationStepExecuted(button) {
        let simulationStepExecutedView = document.getElementById(simulationStepExecutedViewID);
        switch(button) {
            case MAJOR_STEP_BUTTON_ID:
            simulationStepExecutedView.innerText = MAJOR_STEP_NAME + EXECUTED;
            break;
            case MEDIUM_STEP_BUTTON_ID:
            simulationStepExecutedView.innerText = MEDIUM_STEP_NAME + EXECUTED;
            break;
            case MICRO_STEPS_BUTTON_ID:
            simulationStepExecutedView.innerText = MICRO_STEPS_NAME + EXECUTED;
            break;
            case SIMULATION_RESET_BUTTON_ID:
            simulationStepExecutedView.innerText = SIMULATION_RESET_TEXT;
            break;
        }  // End of Switch
    }

    ///////////////  Clear Model Space  ////////////////////////////////////////////////////////////////////////////////

    //
    //  Remove Matrix or Vector
    //

    function removeMatrix(id) {
//        console.log("I am inside removeMatrix, dada is: "+ id);
        let matrixToBeRemoved = document.getElementById(id);

        if(matrixToBeRemoved == null){
            console.log("matrixToBeRemoved is null, RETURN");
            return;
        }
        let rows = matrixToBeRemoved.getElementsByTagName("tr");
        if(rows.length == 0){
//            console.log("matrix has no rows, RETURN");
            return;
        }
//        console.log("Calling countRows with "+matrixToBeRemoved);
        let rowSize = countRows(matrixToBeRemoved);
        if(rowSize == 0){
            console.log("Calculated SIZE IS 0, RETURN");
            return;
        }
//        console.log("rowSize is "+rowSize);
        for (let i = 0; i < rowSize; i++) {
            let deletionIndex = rowSize -(1+i)
//            console.log("Deleting row " +deletionIndex );
            matrixToBeRemoved.deleteRow(deletionIndex);
        }
//        let matrixToBeRemoved2 = document.getElementById(id);
//        console.log("matrixToBeRemoved2: " + matrixToBeRemoved2);
    }

    function countRows(table) {
        let totalRowCount = 0;
        let rowCount = 0;

        let rows = table.getElementsByTagName("tr")
        for (let i = 0; i < rows.length; i++) {
            totalRowCount++;
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
        }
//        let message = "Total Row Count: " + totalRowCount;
//        message += "\nRow Count: " + rowCount;
//        console.log("CountRows: " + message);
//        alert(message);
        return rowCount;
    }

