
    //
    //   AoS Lexical Analyzer
    //


    let input;
    let varToValMap;
    let tokenArray = new Array();
    let i = 0;
    let char;

    //
    //   AoSLexAn processes input expression, detects
    //   errors, and  finally creates  AosToken array
    //
    function expressionLexicalAnalysis(aosCalculatorContext, expression, initializationMap) {
        console.log("expression: "+expression);


        var calculatorContext = aosCalculatorContext;
        input = expression;
        varToValMap = initializationMap;
         console.log("AoS LexAn: initialization is = "+varToValMap);

        tokenArray = new Array();
        calculatorContext.setTokens(tokenArray);
        i = 0;

        console.log("AoS LexAn: expression length is = "+input.length);
        if(input.length <= 0){
            console.log("AoS LexAn: expression length is = "+input.length);
            calculatorContext.setLexAnError("L-000", null);
            return calculatorContext;
        }

        console.log("AoS LexAn: starting index = "+i);
        char = input[i];
        while (i < input.length) {
            console.log("AoS LexAn: BEGINNING processing index = "+i+" char is: \""+char+"\"");
            if (isWhiteSpace(char)){
            console.log("AoS LexAn: processing isWhiteSpace index = "+i+" char is: \""+char+"\"");
                advance();
            } else if (isOperator(char)) {
             console.log("AoS LexAn: processing isOperator index = "+i+" char is: \""+char+"\"");
                addOperatorToken(char, i);
                advance();
            } else if (isLeftParenthesis(char)) {
             console.log("AoS LexAn: processing isLeftParenthesis index = "+i+" char is: \""+char+"\"");
                let aosToken = AoSToken.createLeftParenthesisToken(char,i);
                tokenArray.push(aosToken);
                advance();
            } else if (isRightParenthesis(char)) {
             console.log("AoS LexAn: processing isRightParenthesis index = "+i+" char is: \""+char+"\"");
                let aosToken = AoSToken.createRightParenthesisToken(char,i);
                tokenArray.push(aosToken);
                advance();
            } else if (isIdentifier(char)) {
             console.log("AoS LexAn: processing isIdentifier index = "+i+" char is: \""+char+"\"");
             if(isLowerCaceLetter(char)){
              let identifier = char;
                while ((advance() != null) && isIdentifier(char) ){
                 identifier += char;
                 console.log("AoS LexAn: processing in side isIdentifier index = "+i+" identifier is: \""+identifier+"\"");
                }
                console.log("AoS LexAn: processing isIdentifier final index = "+i+" identifier is: \""+identifier+"\"");

                if(identifier.length > 3){
                 let aosToken = addVarToken(identifier, i-identifier.length, i, null);
                 calculatorContext.setLexAnError("L-002", aosToken);
                 return calculatorContext;
                }

                var varVal = varToValMap[identifier];
                console.log("AoS LexAn: processing isIdentifier vame = "+identifier+",  value is = \""+varVal+"\"");
                let aosToken = addVarToken(identifier, i-identifier.length, i, varVal);
             } else {
                let aosToken = AoSToken.createConstToken(char,i);
                tokenArray.push(aosToken);
                advance();
             }

            } else {
                console.log("AoS LexAn: processing Unrecognized char index = "+i+" char is: \""+char+"\"");
//                let aosToken = AoSToken.createUndefinedToken(char, i);
//                tokenArray.push(aosToken);
                var aosToken = addUndefinedToken(char, i);
                calculatorContext.setLexAnError("L-001", aosToken);
                return calculatorContext;
            }
        }
        console.log("AoS LexAn: processing Last char index = "+i+" char is: \""+char+"\"");
        addEOEToken(i);
        console.log("Tokens size = "+tokenArray.length);
        return calculatorContext;
    };

    //
    //   private function
    //

    const isOperator = function (c) { return /[?&*|<=]/.test(c); };
    const isLeftParenthesis = function (c) { return /[(]/.test(c); };
    const isRightParenthesis = function (c) { return /[)]/.test(c); };
    const isDigit = function (c) { return /[0-9]/.test(c); };
    const isWhiteSpace = function (c) { return /^\s/.test(c); };

    const isLowerCaceLetter = function (c) {
        var a = /^[a-z]/.test(c);
        console.log("checking  isIdentifier index = "+i+" char is: \""+c+"\""+" a is: \""+a+"\"");
        return a;
    }

    const isIdentifier = function (c) {
     console.log("AoS LexAn: isIdentifier index = "+i+" char is: \""+c+"\"");
//     console.log("AoS LexAn: isOperator index = "+i+" char is: \""+isOperator(c)+"\"");
//     console.log("AoS LexAn: isLeftParenthesis index = "+i+" char is: \""+isLeftParenthesis(c)+"\"");
//     console.log("AoS LexAn: isRightParenthesis index = "+i+" char is: \""+isRightParenthesis(c)+"\"");
//     console.log("AoS LexAn: isDigit index = "+i+" char is: \""+isDigit(c)+"\"");
//     console.log("AoS LexAn: isWhiteSpace index = "+i+" char is: \""+isWhiteSpace(c)+"\"");
//        var yes =  !isOperator(c) && !isLeftParenthesis(c) && !isRightParenthesis(c) &&
//           !isDigit(c) && !isWhiteSpace(c);
        var a = /^[0-9a-zA-Z]/.test(c);
        console.log("checking  isIdentifier index = "+i+" char is: \""+c+"\""+" a is: \""+a+"\"");
        return a;
    };

//    const isEndOfInput = function(){
//        return (i+1) >= input.length;
//    }

    const advance = function () {
        if( i >= input.length){
            return char;
        }
        char = ((++i) < input.length)? input[i] : null;
        console.log("Advanced  index = "+i+" "+input.length+",  char is: \""+char+"\"");
        return char;
    };

    const addOperatorToken = function (value, index) {
        var aosToken = AoSToken.createOperationToken(value, index);
        tokenArray.push(aosToken);
    };

    const addVarToken = function (lexeme, startingIndex, endingIndex, varVal) {
        var aosToken = AoSToken.createVarToken(lexeme, startingIndex, endingIndex, varVal);
        tokenArray.push(aosToken);
        return aosToken;
    };

    const addUndefinedToken = function (lexeme, index) {
        let aosToken = AoSToken.createUndefinedToken(lexeme, index);
        tokenArray.push(aosToken);
        return aosToken;
    };

    const addEOEToken = function(startingIndex) {
        var aosToken = AoSToken.createEndOfExpressionToken(startingIndex);
        tokenArray.push(aosToken);
    };

    // ============================================================