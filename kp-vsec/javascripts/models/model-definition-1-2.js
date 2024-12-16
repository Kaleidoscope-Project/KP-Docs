
/* File: model-definition-1-2.js */

const model12 = {
    modelName: "Counter from 0 to 7 with fragmentary (partially defined) state changes",
    modelKey: "Model-1-2",
    stateDrivenBehavior: true,
    inputDrivenBehavior: false,
    hasExternalInput: false,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: false,

    initialStateVector: ["0","0","0"],

    externalInputSequence: [
                         ["0","0","0"],
                         ["0","0","1"],
                         ["0","1","0"],
                         ["0","1","1"],
                         ["1","0","0"],
                         ["1","0","1"],
                         ["1","1","0"],
                         ["1","1","1"]
               ],

   recognitionMatrix: [
                        ["-","0","0"],
                        ["-","0","1"],
                        ["-","1","0"],
                        ["0","1","1"],
                        ["1","1","1"],
                      ],

   generationMatrix: [
                     ["-","-","-","1","0"],
                     ["-","1","-","0","0"],
                     ["1","0","1","0","0"]
                     ],


    getModel12: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model12;
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

    function getModel12() {
        return model12;
    };

    function printModel12() {
        console.log(typeof model12); // object

        // accessing the object value
        console.log(model12.modelKey);
        console.log(model12.recognitionMatrix);
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