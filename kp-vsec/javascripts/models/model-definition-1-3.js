
/* File: model-definition-1-4.js */

const model13 = {
    modelName: "Two sub-processes with partially defined state changes",
    modelKey: "Model-1-3",
    stateDrivenBehavior: true,
    inputDrivenBehavior: false,
    hasExternalInput: false,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: true,

    initialStateVector: ["0","0","0","-","1","1","1"],

externalInputSequence: [
                         ["0","0","0","-","0","0","0"],
                         ["0","0","1","-","0","0","1"],
                         ["0","1","0","-","0","1","0"],
                         ["0","1","1","-","0","1","1"],
                         ["1","0","0","-","1","0","0"],
                         ["1","0","1","-","1","0","1"],
                         ["1","1","0","-","1","1","0"],
                         ["1","1","1","-","1","1","1"]
                       ],

    recognitionMatrix: [
                        ["-","0","0","-","-","-","-"],
                        ["-","0","1","-","-","-","-"],
                        ["-","1","0","-","-","-","-"],
                        ["0","1","1","-","-","-","-"],
                        ["1","1","1","-","-","-","-"],
                        ["-","-","-","-","0","0","0"],
                        ["-","-","-","-","0","0","1"],
                        ["-","-","-","-","0","1","0"],
                        ["-","-","-","-","0","1","1"],
                        ["-","-","-","-","1","0","0"],
                        ["-","-","-","-","1","0","1"],
                        ["-","-","-","-","1","1","0"],
                        ["-","-","-","-","1","1","1"],
                      ],

    generationMatrix: [
                        ["-","-","-","1","0","-","-","-","-","-","-","-","-"],
                        ["-","1","-","0","0","-","-","-","-","-","-","-","-"],
                        ["1","0","1","0","0","-","-","-","-","-","-","-","-"],
                        ["-","-","-","-","-","-","-","-","-","-","-","-","-"],
                        ["-","-","-","-","-","1","-","-","-","0","-","-","-"],
                        ["-","-","-","-","-","1","-","0","-","1","-","0","-"],
                        ["-","-","-","-","-","1","0","1","0","1","0","1","0"],
                        ],

    getModel13: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model13;
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

    function getModel13() {
        return model13;
    };

    function printModel13() {
        console.log(typeof model13); // object
        // accessing the object value
        console.log(model13.modelKey);
        console.log(model13.recognitionMatrix);
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