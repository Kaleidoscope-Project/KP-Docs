

    function calculateAoSExpression(expression, initializationMap) {

            var calculatorContext = new CalculatorContext();

            console.log("Algebra of Symbols Expression Calculator !");
            var result = "Not Defined";
            try {

                //
                //   Lexical Analysis
                //

                calculatorContext = expressionLexicalAnalysis(calculatorContext, expression, initializationMap);
                if(calculatorContext.isError()){
                    console.log("AoS Expression Calculator: LexAn error !");
    //                var errorMessage = calculatorContext.getErrorExplanation();
    //                console.log("AoS Expression Calculator: error message = "+errorMessage);
                    return calculatorContext;
                }
                var tokenArray = calculatorContext.getTokens();
                console.log("AosExpressionCalculator: Lexical Analysis complete! Token size = "+tokenArray.length);
                // print tokens
                for(var k = 0; k < tokenArray.length; k++){
                    var aosToken = tokenArray[k];
                    console.log(""+(k+1),aosToken.toString());
                }
                console.log("");

                //
                //   Syntax Analysis and Expression Calculation
                //

                parseAndCalculateExpression(calculatorContext);


    //           var bytecode = parseExpression(tokenArray);
    //           // print tokens
    //           var strBytecode = "";
    //           for(var k = 0; k < bytecode.length; k++){
    //               var aosToken = bytecode[k];
    //               strBytecode += (aosToken.lexeme+" ");
    //           }
    //           console.log("AosCalculator: Final bytecode: "+strBytecode);
    //
    //            // PRN expression evaluating
    //           result = evaluatePRNExpression(bytecode);

            //    var parseTree = parse(tokens);
            //    var output = evaluate(parseTree);
            //    return output;
            } catch (e) {
                (console.error || console.log).call(console, e.stack || e);
                alert("Exception: "+e);
                return calculatorContext;
            }
            console.log("AosExpressionCalculator: Calculation complete! ");
            return calculatorContext;
    };

    //
    //
    //
    function recalculateExistingExpression(calculatorContext) {
        console.log("Algebra of Symbols Expression Calculator !");
        var result = "Not Defined";
        try {


            var tokenArray = calculatorContext.getTokens();
            console.log("AosExpressionCalculator.recalculateExistingExpression: Recalculating expression. Token size = "+tokenArray.length);
            // print tokens
            for(var k = 0; k < tokenArray.length; k++){
                var aosToken = tokenArray[k];
                console.log(""+(k+1),aosToken.toString());
            }
            console.log("");

            //
            //   Syntax Analysis and Expression Calculation
            //

            parseAndCalculateExpression(calculatorContext);


        } catch (e) {
            (console.error || console.log).call(console, e.stack || e);
            alert("Exception: "+e);
            return calculatorContext;
        }
        console.log("AosExpressionCalculator: Calculation complete! ");
        return calculatorContext;
        };

    //
    //
    //

    function fixError(expression) {
        var fixedExpression = "fixed";
        return fixedExpression
    }