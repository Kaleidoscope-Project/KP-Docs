
    //
    //   Token
    //

    var Type = {
        "OPERATION":"Operation", "VAR":"Variable", "CONST":"Constant",
        "LEFT_PARENTHESIS":"Opening Parenthesis", "RIGHT_PARENTHESIS":"Closing Parenthesis",
        "UNDEFINED":"Undefined", "EOE":"End of Expression"};




//     var Type = {
//        UNDEFINED("Undefined"), OPERATION("Operation"), VAR("Variable"),
//        LEFT_PARENTHESIS("Opening Parenthesis"), RIGHT_PARENTHESIS("Closing Parenthesis"), EOE("End of Expression");
//
//        private final String name;
//
//        Type(String name) {
//            this.name = name;
//        }
//
//        public String getName() {
//            return name;
//        }
//    };

    var Priorities = {"=": 1, "<": 2, "|": 3, "*": 4, "&": 5, "?": 6 };

    var OperationNames =  {
         "=": "Assignment",
         "&lt;": "Application",
         "<": "Application",
         "|": "Disjunction",
         "*": "Production",
         "&": "Conjunction",
         "?": "Equivalence",
      };

class AoSToken {


    static createUndefinedToken(lexeme, startingIndex) {
        return new AoSToken(Type.UNDEFINED, lexeme, startingIndex, startingIndex + 1, null);
    }

    static createOperationToken(lexeme, startingIndex) {
        return new AoSToken(Type.OPERATION, lexeme, startingIndex, startingIndex + 1, null);
    }

    static createVarToken(lexeme, startingIndex, endingIndex, variableValue) {
        return new AoSToken(Type.VAR, lexeme, startingIndex, endingIndex, variableValue);
    }

    static createConstToken(lexeme, startingIndex) {
        return new AoSToken(Type.CONST, lexeme, startingIndex, startingIndex + 1, null);
    }

    static createLeftParenthesisToken(lexeme, startingIndex) {
        return new AoSToken(Type.LEFT_PARENTHESIS, lexeme, startingIndex, startingIndex + 1, null);
    }

    static createRightParenthesisToken(lexeme, startingIndex) {
        return new AoSToken(Type.RIGHT_PARENTHESIS, lexeme, startingIndex, startingIndex + 1, null);
    }

    // this method called when semicolon character ";" found
    static createEndOfExpressionToken(lexeme, startingIndex) {
        return new AoSToken(Type.EOE, lexeme, startingIndex, startingIndex+1, null);
    }

    // this method called when end of string found
    static createEndOfExpressionToken(startingIndex) {
        return new AoSToken(Type.EOE, "", startingIndex, startingIndex, null);
    }

    //   I n s t a n c e

//    let int priority;
//    let Type type;
//    let String lexeme;
//
//    let int startingIndex;
//    let int endingIndex;
//    let boolean dimmed;

    constructor(type, lexeme, startingIndex, endingIndex, variableValue) {
        this.private = 0;
        this.type = type;
        this.lexeme = lexeme;
        this.assignmentOperation = false;
        this.applicationOperation = false;
        if(this.type == Type.OPERATOR){
            this.priority = priorities[this.lexeme];
            if(lexeme === "="){
                this.assignmentOperation = true;
            } else if(lexeme === "<"){
                this.applicationOperation = true;
            }
        }
        this.variableValue = variableValue;
        this.startingIndex = startingIndex;
        this.endingIndex = endingIndex;
    }

    getValue(){
        return this.isVar()? this.variableValue : this.lexeme;
    }

    setNewValue(newValue){
         this.variableValue = this.isVar()? newValue : null;
    }

    getStartingIndex() {
        return this.startingIndex;
    }

    getStartingPosition() {
        return this.startingIndex + 1;
    }

//    public void setStartingPosition(int startingIndex) {
//        this.startingIndex = startingIndex;
//    }

    getEndingIndex() {
        return this.endingIndex;
    }

    updateEndingIndex(newEndingIndex) {
        this.dimmed = true;
        this.endingIndex = newEndingIndex;
    }

    isDimmed() {
        return this.dimmed;
    }

    getOperationName(lexeme) {
        var operationName = OperationNames[lexeme];
        return operationName != null ? operationName : "No name";
    }

    isHigherThenOther(otherOperation) {
        return priority > otherOperation.priority;
    }

    isUndefined() {
        return this.type == Type.UNDEFINED;
    }

    isOperator() {
        return this.type == Type.OPERATION;
    }

    isAssignmentOperation() {
        return this.assignmentOperation;
    }

    isApplicationOperation(){
        return this.applicationOperation;
    }

    isVar() {
        return this.type == Type.VAR;
    }

    isConst() {
        return this.type == Type.CONST;
    }

    isLeftParenthesis() {
        return this.type == Type.LEFT_PARENTHESIS;
    }

    isRightParenthesis() {
        return this.type == Type.RIGHT_PARENTHESIS;
    }

    isTerminalToken() {
        return this.isOperator() || this.isLeftParenthesis() || this.isRightParenthesis();
    }

    isEoE() {
        return this.type == Type.EOE;
    }

    getType() {
        return this.type;
    }

    getLexeme() {
        return !this.isEoE() ? this.lexeme : this.lexeme.equalsIgnoreCase(";")? "EoE" : "End of Expression";
    }

    isExpectedOperation(expectedOperation) {
        return this.isOperator() && this.lexeme.toLowerCase() === expectedOperation.toLowerCase();
    }

    isExpectedTerminalToken(expectedTerminalLexeme) {
        return this.isTerminalToken() &&this.lexeme.toLowerCase() === expectedTerminalLexeme.toLowerCase();
    }

    getTypeName() {
        return this.type.value;
    }

    getTokenName() {
        var tokenName = "None";
        if (isOperator()) {
            tokenName = this.getOperationName(this.lexeme)+ " operation";
        } else if (this.isLeftParenthesis() || this.isRightParenthesis()) {
            tokenName = this.type.getName();
        } else if (this.isVar() || this.isConst()) {
            tokenName = this.type.getName();
        } else if (this.isUndefined()) {
            tokenName = this.type.getName();
        } else if (isEoE()) {
            tokenName = this.type.getName();
        }
        return tokenName;
    }

    toString() {
        return "Token: type = " + this.type + ",  lexeme = \"" + this.lexeme + "\""+
        ",  startingIndex = \"" + this.startingIndex + "\"" + ",  endingIndex = \"" + this.endingIndex + "\"" +
        ",  value = \"" + this.variableValue + "\"";
    }
}
