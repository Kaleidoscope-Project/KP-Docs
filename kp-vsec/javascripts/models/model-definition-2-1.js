
/* File: model-definition-2-1.js */

const model21 = {
    modelName: "Input driven model",
    modelKey: "Model-2-1",
    stateDrivenBehavior: true,
    inputDrivenBehavior: true,
    hasExternalInput: true,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: true,

    initialStateVector: ["X","Y","Z"],

    externalInputSequence: [
                            ["1","0","1"],
                            ["0","1","0"],
                            ["0","0","0"],
                            ["1","0","0"],
                            ["0","0","1"],
                            ["0","1","1"],
                            ["1","1","0"],
                            ["1","1","1"]
                            ],

    recognitionMatrix: [
                         ["1","0","1"],
                         ["0","1","0"],
                         ["1","1","1"],
                         ["0","0","1"],
                         ["1","0","0"],
                         ["0","0","0"],
                         ["0","1","1"],
                         ["1","1","0"]
                       ],

    generationMatrix: [
                      ["1","0","0","0","1","0","1","1"],
                      ["1","1","0","1","0","0","0","1"],
                      ["0","1","0","0","1","1","0","1"]
                      ],

    getModel21: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model21;
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

    function getModel21() {
        return model21;
    };

    function printModel21() {
        console.log(typeof model21); // object

        // accessing the object value
        console.log(model21.modelKey);
        console.log(model21.recognitionMatrix);
    };


//    let recMatrix = [
//        ["0","1","2","3","4"],
//        ["5","6","7","8","9"],
//    ]
//
//    let genMatrix = [
//        ["0","1","2","3","4"],
//        ["5","6","7","8","9",],
//    ]