
//
//   Calculator Context
//

    let ERROR_PREFIX = "<span style=\"color:#AA0000;\"><b>Error detected:&nbsp; </b></span>";

//    let   sourceAoSExpression;
//
//    let errorStatus;
//    let errorExplanationKey;
//    let expectedLexeme = "none";
//    //    private String errorExplanation = "none";
//    let previousToken;
//    let currentToken;
//
//    let leftOperandToken;
//    let operationToken;
//    let rightOperandToken;
//
//    let leftOperand;
//    let operation;
//    let rightOperand;
//    let calculatedResult;
//      let operationResult;

class CalculatorContext {

    //   I n s t a n c e

    constructor(sourceAoSExpression) {
        this.sourceAoSExpression = sourceAoSExpression;
        this.errorStatus = false;
        this.currentTokenIndex = 0;
        this.currentToken = null;

        this.leftOperandToken = null;
        this.operationToken = null;
        this.rightOperandToken = null;
        this.operationResult = null;
    }

    initRecalculation() {
        this.errorStatus = false;
        this.currentTokenIndex = 0;
        this.currentToken = null;

        this.leftOperandToken = null;
        this.operationToken = null;
        this.rightOperandToken = null;
        this.operationResult = null;
    }

    getSourceExpressionLength() {
        return this.sourceAoSExpression.length;
    }

    setTokens(tokensArray) {
        this.tokensArray = tokensArray;
    }

    getTokens() {
        return this.tokensArray;
    }

    getNextToken() {
        console.log("CalculatorContext.getNextTokens: "+ this.currentTokenIndex + ".  Token array = " + this.tokensArray.length);
        if (this.currentTokenIndex >= this.tokensArray.length) {
            console.log("CalculatorContext.getNextTokens: No more tokens "+ this.currentTokenIndex);
            return null;
        }
        var currentToken = this.tokensArray[this.currentTokenIndex];
        console.log("CalculatorContext.getNextToken: "+ this.currentTokenIndex + ".  Token = " + currentToken.toString());
        this.currentTokenIndex++;
        return currentToken;
    }

    peekNextToken() {
        if ((this.currentTokenIndex) >= this.tokensArray.length) {
            console.log("No more tokens !");
            return null;
        }
        var currentToken = this.tokensArray[this.currentTokenIndex];
        console.log("CalculatorContext.peekNextToken: "+ this.currentTokenIndex + ".  Token = " + currentToken.toString());
        return currentToken;
    }

    setLexAnError(errorExplanationKey, currentToken) {
        this.errorStatus = true;
        this.errorExplanationKey = errorExplanationKey;
        this.expectedLexeme = "";
        this.currentToken = currentToken;
    }

    isTokenAvailable(){
        return this.currentToken != null;
    }

    setParserGeneralError(errorExplanationKey, expectedLexeme,  currentToken) {
        this.errorStatus = true;
        this.errorExplanationKey = errorExplanationKey;
        this.expectedLexeme = expectedLexeme;
        this.currentToken = currentToken;
    }

//    public void setParserSpecificError(errorExplanationKey,  currentToken) {
//        errorStatus = true;
//        this.errorExplanationKey = errorExplanationKey;
//        this.expectedLexeme = "";
//        this.currentToken = currentToken;
//    }

    setUnexpectedElementErrorDetected(currentToken) {
        this.errorStatus = true;
        this.errorExplanationKey = "U-ALL";
        this.expectedLexeme = "";
        this.currentToken = currentToken;
    }

    setParserError(errorExplanationKey, currentToken) {
        this.errorStatus = true;
        this.errorExplanationKey = errorExplanationKey;
        this.expectedLexeme = "";
        this.currentToken = currentToken;
    }

    getCurrentToken() {
        return this.currentToken;
    }

    setCurrentToken(currentToken) {
        this.previousToken = this.currentToken;
        this.currentToken = currentToken;
    }

    getPreviousToken() {
        return this.previousToken;
    }

    //
    //
    //

    isSuccess() {
            return !this.errorStatus;
        }

    isError() {
        return this.errorStatus;
    }

//    public getErrorExplanation() {
//        String tmpExplanation = errorExplanation.toLowerCase();
//        tmpExplanation = tmpExplanation.replace("$$$", currentToken.getLexeme());
//        return tmpExplanation;
//    }

    getErrorExplanation() {
//        if (this.currentToken == null) {
//            throw new RuntimeException("CurrentToken is null !!!");
//        }
        var tmpExplanation = "Unknown error type";
        var messageType = this.errorExplanationKey.charAt(0);
        console.log("Context: errorExplanationKey = "+this.errorExplanationKey+"   "+messageType);
        if (messageType == 'L') {

            if(this.errorExplanationKey === "L-000"){
                tmpExplanation = ErrorMessageStore.getErrorMessageByMessageID(this.errorExplanationKey);
            } else{
                tmpExplanation = ErrorMessageStore.getLexAnErrorMessage(this.errorExplanationKey,
                    this.currentToken.getLexeme(), this.currentToken.getStartingPosition());
            }

        } else if (messageType == 'G') {
            if (this.equalsIgnoreCase(this.errorExplanationKey, "G-OPN")) {
                tmpExplanation = ErrorMessageStore.getGeneralOperationErrorMessage(this.errorExplanationKey,
                this.currentToken.getOperationName(this.expectedLexeme),
                this.expectedLexeme, this.currentToken.getLexeme());
            } else if (this.equalsIgnoreCase(this.errorExplanationKey, "G-UNEXPECTED-OPERAND")) {
                tmpExplanation = ErrorMessageStore.getGeneralOperandErrorMessage(this.errorExplanationKey,
                this.expectedLexeme,
                this.currentToken.getType(), this.currentToken.getLexeme());
            } else {
                tmpExplanation = ErrorMessageStore.getGeneralErrorMessage(this.errorExplanationKey,
                this.expectedLexeme, this.currentToken.getLexeme());
            }
        } else if (messageType == 'U') {

            tmpExplanation =
                    ErrorMessageStore.getUnexpectedElementMessage(currentToken.getTokenName(), currentToken.getLexeme(),
                            currentToken.getStartingPosition());

        } else if (messageType == 'E') {
            tmpExplanation =
                    ErrorMessageStore.getErrorMessage(this.errorExplanationKey);
        }
        console.log("CalculatorContext.getErrorExplanation: "+tmpExplanation);
        tmpExplanation = ERROR_PREFIX + tmpExplanation;
        return tmpExplanation;
    }

    equalsIgnoreCase(strOne, strTwo){
        return strOne.toLowerCase() === strTwo.toLowerCase();
    }

    getErrorStartingIndex() {
        if (this.currentToken == null) {
            throw new RuntimeException("CurrentToken is null !!!");
        }
        let startingIndex = this.currentToken.getStartingIndex();
        return startingIndex;
    }

    getErrorEndingIndex() {
        if (this.currentToken == null) {
            throw new RuntimeException("CurrentToken is null !!!");
        }
        let endingIndex = this.currentToken.getEndingIndex();
        return endingIndex;
    }

    toErrorDescription() {
        let errorDescription = "Error at: " + getErrorStartingIndex() +
                "-" + getErrorEndingIndex() +
                ",  key = " + errorExplanationKey +
                ", decription = " + getErrorExplanation();

        return errorDescription;
    }

    //
    // calculation data
    //

    getSourceAoSExpression() {
        return this.sourceAoSExpression;
    }

    getLeftOperand() {
        return this.leftOperand;
    }

    setLeftOperand(leftOperand) {
        this.leftOperand = leftOperand;
    }

    getOperation() {
        return this.operation;
    }

    setOperation(operation) {
        this.operation = operation;
    }

    getRightOperand() {
        return this.rightOperand;
    }

    setRightOperand(rightOperand) {
        this.rightOperand = rightOperand;
    }

    getCalculatedResult() {
        return this.calculatedResult;
    }

    setCalculatedResult(calculatedResult) {
        this.calculatedResult = calculatedResult;
    }

    getOperationResult() {
        return this.operationResult;
    }

    setOperationResult(operationResult) {
        this.operationResult = operationResult;
    }

    updateDependentVariableValue(newValue){
         var tokenArray = this.getTokens();
         console.log("CalculatorContext.updateVariableValue: Token size = "+tokenArray.length);
         var dependentVarToken = this.tokensArray[0];
         console.log("dependentVarToken = " + dependentVarToken.toString());
         var dependentVarName = dependentVarToken.getLexeme();

        for(var k = 0; k < tokenArray.length; k++){
            var aosToken = tokenArray[k];
            console.log(""+(k+1),aosToken.toString());
            if(!aosToken.isVar()){
                continue;
            }
            if(aosToken.getLexeme() !== dependentVarName){
                continue;
            }
            aosToken.setNewValue(newValue);
            console.log(""+(k+1),"Updated ", aosToken.toString());
        }
        console.log("");
    }

    getStatusAsString() {
        return this.errorStatus ? "Error Found" : "OK";
    }
}
