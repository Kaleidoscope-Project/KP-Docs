

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    /*
        Method created empty vector and copies values
        of given vector to newly created one.
    */
    function getVectorCopy(data) {
        let rows = data.length;
        let copy = Array.apply("-", Array(rows));
        for (let i = 0; i < rows; i++) {
            copy[i] = data[i];
        }
        return copy;
    }

     /*
        Method created empty matrix and copies values
        of given matrix to newly created one.
     */
     function getMatrixCopy(data) {
        let rows = data.length;
        let cols = data[0].length;
        let copy = Array.apply("-", Array(rows));
        for (let i = 0; i < rows; i++) {
            let rowData = Array.apply(null, Array(cols));
            copy[i] = rowData;
            for (let j = 0; j < cols; j++) {
                copy[i][j] = data[i][j];
            }
        }
        return copy;
    }

    /*
        Method prints given matrix on console.
    */
    function printMatrix(name, matrix){
        console.log("\nMatrix: "+name+": rows = "+matrix.length + ", cols = " + matrix[0].length);
        let rows = matrix.length;
        for (let i = 0; i < rows; i++) {
            let result = i.toString().padStart(3, ' ');
            console.log("Row: "+result+"  "+matrix[i]);
        }
    }

    function printSimulationModelObject(modelObject) {
            console.log("\n===============  Printing Simulation Model Object  ===============");
            console.log("Type: " + typeof modelObject); // object

            // accessing the object value
            console.log("Selected Model Name: " + modelObject.selectedModelKey);

            // Model View attributes
            console.log("\n----  Model View attributes:  ----\n");
            console.log("Has External Input: " + modelObject.hasExternalInput);
            console.log("No External Input: " + modelObject.noExternalInput);
            console.log("State Vector Is External Input: " + modelObject.stateVectorIsExternalInput);
//            console.log("Self Driven Simulation: " + modelObject.selfDrivenSimulation);
            console.log(  "------------------------------------\n");

            printMatrix("Model External Input Source: ", modelObject.modelExternalInputSource);

            printVectorObject(modelObject.inputStateVectorObject);
            printVectorObject(modelObject.currentStateVectorObject);
            printVectorObject( modelObject.recognizedSituationsVectorObject);
            printVectorObject(modelObject.proposedStateVectorObject);
            printVectorObject(modelObject.dubbedCurrentStateVectorObject);
            printVectorObject(modelObject.nextStateVectorObject);

            printMatrix("Recognition Matrix", modelObject.recognitionMatrix);
            printMatrix("Generation Matrix", modelObject.generationMatrix);

            console.log("============ !! ===============");
    };

    function printVectorObject(vectorObject) {
        console.log("\n---------------------\n" + vectorObject.name + ":");
        console.log("   Vector value: " + vectorObject.vector);
        console.log("   Background color: " + vectorObject.backgroundColor);
        console.log("   State Changed color: " + vectorObject.stateChangedColor);
        console.log("   Highlighted elements: " + vectorObject.highlightElements);
        console.log("---------------------\n");
    }

