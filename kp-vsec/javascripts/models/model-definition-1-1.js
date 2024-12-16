
/* File: model-definition-1-1.js */

let mountains = [
  { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
  { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
  { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
  { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
  { name: "Monte Amiata", height: 1738, place: "Siena" }
];

const model11 = {
    modelName: "Counter from 0 to 7",
    modelKey: "Model-1-1",
    stateDrivenBehavior: true,
    inputDrivenBehavior: false,
    hasExternalInput: false,
    stateVectorIsExternalInput: false,
//    selfDrivenSimulation: true,

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
                      ["0","0","0","1","1","1","1","0"],
                      ["0","1","1","0","0","1","1","0"],
                      ["1","0","1","0","1","0","1","0"]
                      ],

    getModel11: function() {
//        console.log('Input State Vector = '+inputStateVector);
        return this.model11;
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

    function getModel11() {
        return model11;
    };

    function printModel11() {
        console.log(typeof model11); // object

        // accessing the object value
        console.log(model11.modelKey);
        console.log(model11.recognitionMatrix);
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