
    //
    //   AoSParser processes token array, detects
    //   errors, and calculates expression result
    //
    function parseAndCalculateExpression(calculatorContext) {
        var tokenArray = calculatorContext.getTokens();
        console.log("AoSExpressionParser: Parsing begins. Token size = "+tokenArray.length);
        // print tokens
//        for(var k = 0; k < tokenArray.length; k++){
//            var aosToken = tokenArray[k];
//            console.log(""+(k+1),aosToken.toString());
//        }

        //
        //   Top Down Parsing Procedure
        //

        console.log("parseAndCalculateExpression: recursiveDescendingParsingAndCalculation started");
        // initializing current token
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        console.log("parseAndCalculateExpression: token to process = " + calculatorContext.getCurrentToken().toString());

        var targetVariableCalculatedValueToken = calculatorContext.getCurrentToken();
        var targetVariableCurrentValueToken = calculatorContext.getCurrentToken();

        calculatorContext = parseTargetVariable(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        var assignmentOperation = calculatorContext.getCurrentToken().getLexeme();
        var applicationOperation = calculatorContext.getCurrentToken().getLexeme();

        // assume expression starts with assignment operation;
        if (checkIfAssignmentOperation(calculatorContext)) {
            // processing target variable with current value
            targetVariableCurrentValueToken = calculatorContext.getCurrentToken();
            calculatorContext = parseTargetVariable(calculatorContext);
            if (calculatorContext.isError()) {
                return calculatorContext;
            }
        }

        // this is not equation, initially found
        // target variable represents current value
        applicationOperation = calculatorContext.getCurrentToken().getLexeme();
        calculatorContext = parseApplicationOperation(calculatorContext);
        if (calculatorContext.isError()) {
           return calculatorContext;
        }

        calculatorContext = parseAOSDisjunctiveNormalForm(calculatorContext);
        if (calculatorContext.isError()) {
            console.log("parseAOSExpression: Parsing ended with error " + calculatorContext.getCurrentToken().getLexeme());
            return calculatorContext;
        }

        var disjunctiveNormalFormValue = calculatorContext.getOperationResult();
        var currentToken = calculatorContext.getCurrentToken();

        if (!currentToken.isEoE()) {
            console.log("parseAoSExpression: EoE expected but token found: " + calculatorContext.getCurrentToken());

            var endingIndex = currentToken.getEndingIndex();
            var sourceExpressionLength = calculatorContext.getSourceExpressionLength();
            if (sourceExpressionLength - endingIndex <= 0) {
                calculatorContext.setUnexpectedElementErrorDetected(currentToken);
            } else {
                currentToken.updateEndingIndex(sourceExpressionLength);
                calculatorContext.setParserError("E-001", currentToken);
            }
            return calculatorContext;
        } else {
//            calculatorContext.setParserError("E-002", currentToken);
        }

        var leftOperand = targetVariableCurrentValueToken.getValue();
        var operationResult = executeOperation(leftOperand, applicationOperation, disjunctiveNormalFormValue);
        calculatorContext.setOperationResult(operationResult);
        calculatorContext.setCalculatedResult(operationResult);

        console.log("AoSExpressionParser: Parsing and calculation complete ! "+targetVariableCurrentValueToken.toString());
        console.log("AoSExpressionParser: Parsing and calculation complete ! ");
        return calculatorContext;
    }

    //
    //
    //
    function isTerminalTokenCurrent(expectedChar, currentToken) {
        var tokenIsCurrent = currentToken.isExpectedTerminalToken(expectedChar);
        return tokenIsCurrent;
    }

    //
    //
    //
    function checkIfAssignmentOperation(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseAssignmentOperation: token to process = " + currentToken.toString());
        var tokenIsCurrent = isTerminalTokenCurrent("=", currentToken);
        if (!tokenIsCurrent) {
            return false;
        }
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        return true;
    }


    //
    //
    //
    function parseTargetVariable(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseTargetVariable: token to process = " + currentToken.toString());
        if (!currentToken.isVar()) {
            console.log("parsePreviousValue: Var expected but " + currentToken.getLexeme());
//            var followingToken = calculatorContext.peekNextToken();
//            if(followingToken.isAssignmentOperation() || followingToken.isApplicationOperation()){
//                calculatorContext.setParserGeneralError("G-VAR", "Target Variable", currentToken);
//            } else {
//                calculatorContext.setParserGeneralError("G-VAR", "Target Variable Current Value", currentToken);
//            }

            calculatorContext.setParserGeneralError("G-VAR", "Target Variable", currentToken);
            return calculatorContext;
        }
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        return calculatorContext;
    }

    //
    //
    //
    function parseApplicationOperation(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseApplicationOperation: token to process = " + currentToken.toString());
        var tokenIsCurrent = isTerminalTokenCurrent("<", currentToken);
        if (!tokenIsCurrent) {
            console.log("parseApplicationOperation: tokenIsCurrent < operation but token not found");
            calculatorContext.setParserGeneralError("G-OPN", "&lt;", currentToken);
            return calculatorContext;
        }
        console.log("parseApplicationOperation: token \"<\" confirmed");
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        console.log("parseApplicationOperation: token "<" confirmed, next tpken to process = " + calculatorContext.getCurrentToken().toString());
        return calculatorContext;
    }

    //
    //
    //
    function parseAOSDisjunctiveNormalForm(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseAOSDisjunctiveNormalForm: token to process = " + currentToken.toString());

        //         tokenIsCurrent = isTerminalTokenCurrent("(", currentToken);
        //        if (!tokenIsCurrent) {
        //            System.out.println("parseAOSDisjunctiveNormalForm: with NO parentheses");
        //            calculatorContext = parseDisjunctiveExpression(calculatorContext);
        //            System.out.println("parseAOSDisjunctiveNormalForm: with NO parentheses COMPLETE");
        //            // As this point Disjunctive Normal Form is completely processed
        //            // the Parsing Result is supposed to hold the End Of Expression token;
        //            return calculatorContext;
        //        }

        var tokenIsOpeningParentheses = isTerminalTokenCurrent("(", currentToken);
        var followingToken = calculatorContext.peekNextToken();
        var followingTokenIsOpeningParentheses = followingToken.isLeftParenthesis();
        if (!tokenIsOpeningParentheses || !followingTokenIsOpeningParentheses) {
            // if there is no "(" go directly to Disjunctive Expression method
            // However if there is "(", but following token is possible but now
            // is not "(", the current "(" is deemed to belonging Disjunctive Expression method

            console.log("parseAOSDisjunctiveNormalForm: with NO parentheses");
            calculatorContext = parseDisjunctiveExpression(calculatorContext);
            console.log("parseAOSDisjunctiveNormalForm: with NO parentheses COMPLETE");
            // As this point Disjunctive Normal Form is completely processed
            // the Parsing Result is supposed to hold the End Of Expression token;
            return calculatorContext;
        }

        // taking next token after opening parentheses was detected
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());

        // processing Disjunction Expression
        console.log("parseAOSDisjunctiveNormalForm: with OPEN pararantheses");
        calculatorContext = parseDisjunctiveExpression(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        // The expression loop ended, this token ended the loop
        currentToken = calculatorContext.getCurrentToken();

        var tokenIsClosingParentheses = isTerminalTokenCurrent(")", currentToken);
        if (!tokenIsClosingParentheses) {
            console.log("parseAOSDisjunctiveNormalForm: checking of ) parenthesis but token is " + currentToken.toString());
            calculatorContext.setParserGeneralError("G-RPS", ")", currentToken);
            return calculatorContext;
        }

        console.log("parseAOSDisjunctiveNormalForm: with OPEN parentheses COMPLETE");
        // As Disjunctive Normal Form closing parenthesis confirmed,
        // returning next token
        // This is supposed to be End Of Expression token;
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        console.log("parseAOSDisjunctiveNormalForm: next token is " + calculatorContext.getCurrentToken().toString());
        return calculatorContext;
    }

    //
    //
    //
    function parseDisjunctiveExpression(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseDisjunctiveNormalForm: token to process = " + currentToken.toString());

        calculatorContext = parseAOSDisjunct(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        var leftOperand = calculatorContext.getOperationResult();

        //
        // processing " | another production rule"
        //
        while (true) {
            currentToken = calculatorContext.getCurrentToken();
            console.log("parseDisjunctiveExpression: checking Or token,  currentToken = " + currentToken.toString());

             tokenIsCurrent = isTerminalTokenCurrent("|", currentToken);
            if (!tokenIsCurrent) {
                // No AoS Production rule to process
                return calculatorContext;
            }

            var disjunctionOperation = currentToken.getLexeme();

            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
            calculatorContext = parseAOSDisjunct(calculatorContext);
            if (calculatorContext.isError()) {
                console.log("parseDisjunctiveExpression: And not found - break the loop, token to process = " +
                        calculatorContext.getCurrentToken().toString());
                return calculatorContext;
            }

            // calculate disjunction operation
            var rightOperand = calculatorContext.getOperationResult();
            var operationResult = executeOperation(leftOperand, disjunctionOperation, rightOperand);
            var leftOperand = operationResult;
            calculatorContext.setOperationResult(operationResult);
            calculatorContext.setCalculatedResult(operationResult);
        }
    }

    //
    //
    //
    function parseAOSDisjunct(calculatorContext) {
            var currentToken = calculatorContext.getCurrentToken();
            console.log("parseAOSDisjunct: token to process = " + currentToken.toString());
            var tokenIsCurrent = isTerminalTokenCurrent("(", currentToken);
            if (!tokenIsCurrent) {
                console.log("parseAOSDisjunct: NO parentheses");
                calculatorContext = parseProductionRule(calculatorContext);
                console.log("parseAOSDisjunct: with NO parentheses COMPLETE");
                return calculatorContext;
            }

            // taking next token after opening parentheses was detected
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());

            calculatorContext = parseProductionRule(calculatorContext);
            console.log("parseAOSDisjunct: parseProductionRule complete token to process = " +
                    calculatorContext.getStatusAsString().toString());
            console.log("parseAOSDisjunct: validationResult = " + calculatorContext.getStatusAsString());
            if (calculatorContext.isError()) {
                return calculatorContext;
            }

            currentToken = calculatorContext.getCurrentToken();
            console.log("parseAOSDisjunct: parseProductionRule complete next ! Token = " + currentToken.toString());
            tokenIsCurrent = isTerminalTokenCurrent(")", currentToken);
            if (!tokenIsCurrent) {
                console.log("parseAOSDisjunct: expected ) parentheses token not current");
                calculatorContext.setParserGeneralError("G-RPS", ")", currentToken);
                return calculatorContext;
            }

            console.log("parseAOSDisjunction: with OPEN parentheses COMPLETE");
            // As Conjunction Expression closing parenthesis confirmed,
            // returning next token
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
            console.log("parseAOSDisjunction: complete ! next Token  = " + calculatorContext.getCurrentToken().toString());
            return calculatorContext;
    }

    //
    //
    //
    function parseProductionRule(calculatorContext) {
            var currentToken = calculatorContext.getCurrentToken();
            var generatedValue = currentToken.getLexeme();
            console.log("parseProductionRule: token to process = " + currentToken.toString());
            calculatorContext = parseGeneratedValue(calculatorContext);
            if (calculatorContext.isError()) {
                return calculatorContext;
            }

            var productionOperation = calculatorContext.getCurrentToken().getLexeme();
            calculatorContext = parseProductionOperation(calculatorContext);
            if (calculatorContext.isError()) {
                return calculatorContext;
            }

            calculatorContext = parseAOSConjunction(calculatorContext);
            currentToken = calculatorContext.getCurrentToken();
            console.log("parseProductionRule: complete aosSParserToken = " + currentToken.toString());

            var conjunctionResult = calculatorContext.getOperationResult();
console.log("parseProductionRule: complete executing production operation, conjunctionResult = " + conjunctionResult);
            var operationResult = executeOperation(generatedValue, productionOperation, conjunctionResult);
            calculatorContext.setOperationResult(operationResult);
            calculatorContext.setCalculatedResult(operationResult);
            return calculatorContext;
        }

        //
        //
        //
        function parseGeneratedValue(calculatorContext) {
            var currentToken = calculatorContext.getCurrentToken();
            console.log("parseGeneratedValue: token to proces = " + currentToken.toString());
            if (!currentToken.isConst()) {
                console.log("parseGeneratedValue: Var expected but " + currentToken.getLexeme());
                calculatorContext.setParserGeneralError("G-VAR", "Generated Value", currentToken);
                return calculatorContext;
            }

            // returning next token
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
            console.log("parseGeneratedValue: expected Var confirmed, " + currentToken.getLexeme());
            return calculatorContext;
        }

        //
        //
        //
        function parseProductionOperation(calculatorContext) {
            var currentToken = calculatorContext.getCurrentToken();
            console.log("parseProductionOperation: token to proces = " + currentToken.toString());
            var tokenIsCurrent = isTerminalTokenCurrent("*", currentToken);
            if (!tokenIsCurrent) {
                console.log("parseProductionOperation: expected * operation but token not found");
                calculatorContext.setParserGeneralError("G-OPN", "*", currentToken);
                return calculatorContext;
            }

            // returning next token
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
            return calculatorContext;
        }

        //
        //
        //
        function parseAOSConjunction(calculatorContext) {
            var currentToken = calculatorContext.getCurrentToken();
            console.log("parseAOSConjunction: token to proces = " + currentToken.toString());

    //         tokenIsCurrent = isTerminalTokenCurrent("(", currentToken);
    //        if (!tokenIsCurrent) {
    //            console.log("parseAOSConjunction: NO parentheses");
    //            calculatorContext = parseConjunctionExpression(calculatorContext);
    //            console.log("parseAOSConjunction: with NO parentheses COMPLETE");
    //            return calculatorContext;
    //        }


             var tokenIsOpeningParentheses = isTerminalTokenCurrent("(", currentToken);
             var followingToken = calculatorContext.peekNextToken();
             var followingTokenIsOpeningParentheses = followingToken.isLeftParenthesis();
            if (!tokenIsOpeningParentheses || !followingTokenIsOpeningParentheses) {
                // if there is no "(" then go directly to Conjunctive Expression method
                // However, if there is "(", and following token is possible but it
                // is not "(", the current "(" is deemed belongs to Equals Expression method

                console.log("parseAOSConjunction: with NO parentheses");
                calculatorContext = parseConjunctionExpression(calculatorContext);
                console.log("parseAOSConjunction: with NO parentheses COMPLETE");
                // As this point Disjunctive Normal Form is completely processed
                // the Parsing Result is supposed to hold the End Of Expression token;
                return calculatorContext;
            }

            console.log("parseAOSConjunction: with OPEN parentheses 11/26");

            // taking next token after opening parentheses was detected
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());

            calculatorContext = parseConjunctionExpression(calculatorContext);
            if (calculatorContext.isError()) {
                return calculatorContext;
            }

            // The expression loop ended, this token ended the loop
            currentToken = calculatorContext.getCurrentToken();
            var tokenIsCurrent = isTerminalTokenCurrent(")", currentToken);
            console.log("parseAOSConjunction: ConjunctionExpression complete,  aosSParserToken = " + currentToken.toString());
            if (!tokenIsCurrent) {
                console.log("parseAOSConjunction: expected ) parenthesis but token not found");
    //            calculatorContext.setErrorStatus("");
                calculatorContext.setParserGeneralError("G-RPS", ")", currentToken);
                return calculatorContext;
            }

            console.log("parseAOSConjunction: with OPEN parentheses COMPLETE");
            // As Conjunction Expression closing parenthesis confirmed
            // returning next token
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
            console.log("parseAOSConjunction: complete next token is " + calculatorContext.getCurrentToken().toString());
            return calculatorContext;
        }

        //
        //
        //
    //    private final calculatorContext parseConjunctionExpression(calculatorContext calculatorContext) {
    //
    //        console.log("parseConjunctionExpression: token to proces = " + calculatorContext.getCurrentToken().toString());
    //
    //        //
    //        // processing equivalence following " & another equivalence"
    //        //
    //
    //        calculatorContext = parseAOSConjunct(calculatorContext);
    //        if (calculatorContext.isError()) {
    //            return calculatorContext;
    //        }
    //         leftOperand = calculatorContext.getOperationResult();
    //
    //        //
    //        // processing equivalence following " & another equivalence"
    //        //
    //        while (true) {
    //             currentToken = calculatorContext.getCurrentToken();
    //            console.log("parseConjunctionExpression: doing And current token = " + currentToken.toString());
    //             tokenIsCurrent = isTerminalTokenCurrent("&", currentToken);
    //            if (!tokenIsCurrent) {
    //                // No AoS Equal expressions to process
    //                return calculatorContext;
    //            }
    //
    //             operation = currentToken.getLexeme();
    //
    //            // As & operation found we take next token that is supposed to
    //            // be either opening parenthesis or Equal operation left operand
    //            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
    //            calculatorContext = parseAOSConjunct(calculatorContext);
    //            if (calculatorContext.isError()) {
    //                return calculatorContext;
    //            }
    //
    //            // calculate conjunction operation
    //             rightOperand = calculatorContext.getOperationResult();
    //             operationResult = executeOperation(leftOperand, operation, rightOperand);
    //            calculatorContext.setOperationResult(operationResult);
    //            calculatorContext.setCalculatedResult(operationResult);
    //            leftOperand = operationResult;
    //
    //        }
    //    }

    //
    //
    //
    function parseConjunctionExpression(calculatorContext) {
        console.log("parseConjunctionExpression: token to proces = " + calculatorContext.getCurrentToken().toString());

        var leftOperand = null;
        var operation = "&";
        var conjunctionOperationDetected;
        while (true) {
            // processing equivalence
            calculatorContext = parseAOSConjunct(calculatorContext);
            if (calculatorContext.isError()) {
                return calculatorContext;
            }

            // calculation conjunction operation
            if (leftOperand == null) {
                // preparing first operand
                leftOperand = calculatorContext.getOperationResult();
            } else {
                // calculating conjunction result
                var rightOperand = calculatorContext.getOperationResult();
                 console.log("parseConjunctionExpression: next rightOperand = " + rightOperand);
                var operationResult = executeOperation(leftOperand, operation, rightOperand);
                console.log("parseConjunctionExpression: next operationResult = " + rightOperand);
                calculatorContext.setOperationResult(operationResult);
                calculatorContext.setCalculatedResult(operationResult);
                // preparing first operand for next operation
                leftOperand = operationResult;
            }

            // processing equivalence following " & another equivalence"
            var currentToken = calculatorContext.getCurrentToken();
            console.log("parseConjunctionExpression: doing And current token = " + currentToken.toString());
            conjunctionOperationDetected = isTerminalTokenCurrent("&", currentToken);
            if (!conjunctionOperationDetected) {
                // No AoS Equal expressions to process
                return calculatorContext;
            }

            // As "&" operation detected we take next token that is supposed to
            // be either opening parenthesis or next Equivalence operation left operand
            calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        }
    }

    //
    //
    //
    function parseAOSConjunct(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        console.log("parseAOSConjunct: token to process = " + currentToken.toString());
        var tokenIsCurrent = isTerminalTokenCurrent("(", currentToken);
        if (!tokenIsCurrent) {
            console.log("parseAOSConjunct: NO parentheses");
            calculatorContext = parseEqualsPredicate(calculatorContext);
//            if (!calculatorContext.isError()) {
//                calculatorContext.setOperationResult();
//            }
            console.log("parseAOSConjunct: with NO parentheses COMPLETE");
            return calculatorContext;
        }

        // taking next token after opening parentheses was detected
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());

        calculatorContext = parseEqualsPredicate(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        currentToken = calculatorContext.getCurrentToken();
        tokenIsCurrent = isTerminalTokenCurrent(")", currentToken);
        if (!tokenIsCurrent) {
//            console.log("parseAOSConjunct: expected ) parenthesis but token not found");
            calculatorContext.setParserGeneralError("G-RPS", ")", currentToken);
            return calculatorContext;
        }

//        console.log("parseAOSConjunct: with OPEN parentheses COMPLETE");
        // returning next token
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        console.log("parseAOSConjunct: complete aosSParserToken = " + calculatorContext.getCurrentToken().toString());
        return calculatorContext;
    }

    //
    //
    //
    function parseEqualsPredicate(calculatorContext) {
//        console.log("parseEqualsPredicate: token to process = " + calculatorContext.getCurrentToken().toString());

//        console.log("parseEqualsPredicate: Done - next token = " + calculatorContext.getCurrentToken().toString());
        var leftOperandToken = calculatorContext.getCurrentToken();
        calculatorContext = parseEqualLeftOperand(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        var operationToken = calculatorContext.getCurrentToken();
        calculatorContext = parseEqualsOperation(calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        var rightOperandToken = calculatorContext.getCurrentToken();
        calculatorContext = parseEqualRightOperand(leftOperandToken, calculatorContext);
        if (calculatorContext.isError()) {
            return calculatorContext;
        }

        // Executing Equals operator
        var leftOperand = leftOperandToken.getValue();
        var operation = operationToken.getLexeme();
        var rightOperand = rightOperandToken.getValue();
        var operationResult = executeOperation ( leftOperand,  operation,  rightOperand);
        calculatorContext.setOperationResult(operationResult);
        calculatorContext.setCalculatedResult(operationResult);

        /*
           Returns next not yet process token
         */
//        console.log("parseEqualsPredicate: Done - next token = " + calculatorContext.getCurrentToken().toString());
        return calculatorContext;
    }

    //
    //
    //
    function parseEqualLeftOperand(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
        if (!(currentToken.isVar() || currentToken.isConst())) {
            calculatorContext.setParserGeneralError("G-VAR", "Equals operation operand", currentToken);
            return calculatorContext;
        }
        // returning next token
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        return calculatorContext;
    }

    /**
     * @param calculatorContext
     * @return
     */
    function parseEqualsOperation(calculatorContext) {
        var currentToken = calculatorContext.getCurrentToken();
//        console.log("parseEqualsOperation: token to process = " + currentToken.toString());
        var tokenIsCurrent = isTerminalTokenCurrent("?", currentToken);
        if (!tokenIsCurrent) {
            calculatorContext.setParserGeneralError("G-OPN", "?", currentToken);
            return calculatorContext;
        }
        // returning next token
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        return calculatorContext;
    }

    //
    //
    //
    function parseEqualRightOperand(leftOperandToken, calculatorContext) {
        var rightOperandToken = calculatorContext.getCurrentToken();
        if (leftOperandToken.isVar()) {
            if (!rightOperandToken.isConst()) {
                calculatorContext.setParserGeneralError("G-UNEXPECTED-OPERAND", "Expected value constant", rightOperandToken);
                return calculatorContext;
            }
        } else {
            if (!rightOperandToken.isVar()) {
                calculatorContext.setParserGeneralError("G-UNEXPECTED-OPERAND", "Variable", rightOperandToken);
                return calculatorContext;
            }
        }

        // returning next token
        calculatorContext.setCurrentToken(calculatorContext.getNextToken());
        return calculatorContext;
    }

    //
    //
    //
    function executeOperation ( leftOperand,  operation,  rightOperand) {
//     console.log("entered executeOperation: leftOperand = " + leftOperand+", operation = "+operation+
//                    ", rightOperand = "+rightOperand );
        var operationResult = "#";
        switch (operation) {
            case "<":
                operationResult = AoSAlgebra.application(leftOperand, rightOperand);
                break;
            case "|":
                operationResult = AoSAlgebra.disjunction(leftOperand, rightOperand);
                break;
            case "*":
                operationResult = AoSAlgebra.production(leftOperand, rightOperand);
                break;
            case "&":
                operationResult = AoSAlgebra.conjunction(leftOperand, rightOperand);
                break;
            case "?":
                operationResult = AoSAlgebra.equivalence(leftOperand, rightOperand);
                break;
        }
//         console.log("exiting executeOperation: leftOperand = " + leftOperand+", operation = "+operation+
//                ", rightOperand = "+rightOperand+",  operationResult = "+operationResult);
        return operationResult;
    }

