
/* File: model-definition-2-3.js */

const model23 = {
    modelName: "Mixed: own & input driven, process; partially defined state changes",
    modelKey: "Model-2-3",
    stateDrivenBehavior: true,
    inputDrivenBehavior: true,
    hasExternalInput: true,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: false,

    initialStateVector: ["-","A","-","-","A","-","A"],

    externalInputSequence: [
                         ["-","-","-","-","-","-","-"],
                         ["-","-","-","-","-","-","-"],
                         ["-","B","-","-","-","-","-"],
                         ["-","-","-","-","-","-","-"],
                         ["-","-","-","D","-","-","-"],
                         ["-","-","-","-","-","-","-"],
                         ["-","-","-","G","-","-","-"],
                         ["-","-","-","-","-","-","-"],
                         ["-","-","-","-","-","-","M"],
                         ["-","-","-","-","-","-","-"],
                         ["-","P","-","-","-","-","-"],
               ],

    recognitionMatrix: [
                         ["-","A","-","-","A","-","A"],
                         ["-","B","-","-","B","-","A"],
                         ["C","-","-","C","-","-","C"],
                         ["D","-","-","D","-","-","C"],
                         ["-","H","-","H","-","H","-"],
                         ["-","H","-","G","-","G","-"],
                         ["-","L","-","-","L","-","L"],
                         ["-","M","-","-","L","-","M"],
                         ["-","N","N","N","-","-","-"],
                         ["-","P","N","P","-","-","-"],
                         ["-","-","-","Q","Q","Q","-"],
                       ],

    generationMatrix: [
                        ["-","C","D","-","-","-","-","-","-","-","-"],
                        ["-","-","-","H","-","L","M","N","-","-","A"],
                        ["-","-","-","-","-","-","-","N","-","-","-"],
                        ["-","C","-","H","-","-","-","N","P","Q","-"],
                        ["B","-","-","-","-","L","-","-","-","Q","A"],
                        ["-","-","-","H","G","-","-","-","-","Q","-"],
                        ["-","C","-","-","-","L","-","-","-","-","A"],
                      ],

    getModel23: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model23;
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

    function getModel23() {
        return model23;
    };

    function printModel23() {
        console.log(typeof model23); // object

        // accessing the object value
        console.log(model23.modelKey);
        console.log(model23.recognitionMatrix);
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