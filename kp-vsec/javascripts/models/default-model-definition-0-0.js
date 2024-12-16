
/* File: default-model-definition-0-0.js */

const model00 = {
    modelName: "INTRODUCTORY MODEL", //"Introductory Model",
    modelKey: "Model-0-0",
    stateDrivenBehavior: true,
    inputDrivenBehavior: false,
    hasExternalInput: false,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: true,

    initialStateVector: ["A","M","Z"],

    externalInputSequence: [
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"],
                         ["-","-","-"]
                       ],

   recognitionMatrix: [
                         ["-","M","Z"],
                         ["A","-","D"],
                         ["S","M","-"],
                         ["-","C","D"],
                         ["S","-","H"],
                         ["E","C","-"],
                         ["-","L","H"],
                         ["E","-","Z"],
                         ["A","L","-"],

                       ],

    generationMatrix: [
                      ["-","S","-","-","E","-","-","A","-"],
                      ["-","-","C","-","-","L","-","-","M"],
                      ["D","-","-","H","-","-","Z","-","-"]
                      ],

    getModel00: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model00;
    },

    getInitialStateVectorData: function() {
        let vectorCopy = getVectorCopy(this.initialStateVector);
        return vectorCopy;
    },

    getExternalInputSequence: function() {
        let matrixCopy = getMatrixCopy(this.externalInputSequence);
//        printMatrix(this.modelName+": Model Input", matrixCopy);
        return matrixCopy;
    },

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
};

    function getModel00() {
        return model00;
    };

    function printModel00() {
        console.log(typeof model00); // object

        // accessing the object value
        console.log(model00.modelKey);
        console.log(model00.recognitionMatrix);
    };

   ///////////////////   Private Methods   ////////////////////////////////////////////////////////////////////////////



//    let recMatrix = [
//        ["0","1","2","3","4"],
//        ["5","6","7","8","9"],
//    ]
//
//    let genMatrix = [
//        ["0","1","2","3","4"],
//        ["5","6","7","8","9",],
//    ]