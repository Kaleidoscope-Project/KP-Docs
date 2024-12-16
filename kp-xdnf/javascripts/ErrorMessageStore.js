
    //
    //  Message type to Message text mapping
    //

    var MessageType =
    {
        "L-000":
        "The expression is empty. Nothing to calculate !",
        "L-001":
        "Undefined symbol \"<span style=\"color:red;\"><b>$1$</b></span>\" found at position $2$ !",
        "L-002":
        "Variable name \"<span style=\"color:red;\"><b>$1$</b></span>\" at position $2$ has more than 3 characters.",

         "G-OPN":
         "The \"<b>$1$</b>\" operation \"<span style=\"color:red;\"><b>$2$</b></span>\"" +
         " expected, but symbol \"<span style=\"color:red;\"><b>$3$</b></span>\" found !",

        "G-VAR":
        "Literal \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
        " expected, but symbol \"<span style=\"color:red;\"><b>$2$</b></span>\" found !",

        "G-UNEXPECTED-OPERAND":
        "Operand \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
        " expected, but $2$ \"<span style=\"color:red;\"><b>$3$</b></span>\" found !",

        "G-OPS":
        "Opening parenthesis \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
        " expected, but symbol \"<span style=\"color:red;\"><b>$2$</b></span>\" found !",

        "G-CPS":
        "Closing parenthesis \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
        " expected, but symbol \"<span style=\"color:red;\"><b>$2$</b></span>\" found !",

//        "G-EOE":
//         "\"End Of Expression\" expected, " +
//                " but symbol(s) \"<span style=\"color:red;\"><b>$1$</b></span>\" found !",

        "U-ALL":
        "Unexpected $element$ \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
                " found, at position $2$ !",

        "E-001": "Disjunctive Form closing parenthesis found prematurely. Rest of the expression ignored !",
        "E-002": "End of Expression found, but there is some text further on !",

    }

class ErrorMessageStore {

    static getLexAnErrorMessage(messageID, wrongSymbol, position) {
     console.log("ErrorMessageStore:  "+messageID+"   "+wrongSymbol+"   "+position);
        var message = MessageType[messageID];
        if (message == null) {
            return "Unknown message ID \"" + messageID + "\"";
        }
        message = message.replace("$1$", wrongSymbol);
        message = message.replace("$2$", position);
        return message;
    }

    static getGeneralOperationErrorMessage(messageID, expectedOperationName, expectedLexeme, tokenLexeme) {
        var message = MessageType[messageID];
        if (message == null) {
            return "Unknown message ID \"" + messageID + "\"";
        }

        message = message.replace("$1$", expectedOperationName);
//        expectedLexeme = expectedLexeme.replace("<", "&lt;");
//        tokenLexeme = tokenLexeme.replace("<", "&lt;");
        message = message.replace("$2$", expectedLexeme);
        message = message.replace("$3$", tokenLexeme);
        return message;

    }

    //  "Operand \"<span style=\"color:red;\"><b>$1$</b></span>\"" +
    //  " expected, but $2$ \"<span style=\"color:red;\"><b>$3$</b></span>\" found !",
    static getGeneralOperandErrorMessage(messageID, expectedTokenTypeName, foundLexemeTypeName, foundLexeme) {
            var message = MessageType[messageID];
            if (message == null) {
                return "Unknown message ID \"" + messageID + "\"";
            }

            message = message.replace("$1$", expectedTokenTypeName);
    //        expectedLexeme = expectedLexeme.replace("<", "&lt;");
    //        tokenLexeme = tokenLexeme.replace("<", "&lt;");
            message = message.replace("$2$", foundLexemeTypeName);
            message = message.replace("$3$", foundLexeme);
            return message;

        }

    static getGeneralErrorMessage(messageID, expectedLexeme, tokenLexeme) {
        var message = MessageType[messageID];
        if (message == null) {
            return "Unknown message ID \"" + messageID + "\"";
        }

//        expectedLexeme = expectedLexeme.replace("<", "&lt;");
//        tokenLexeme = tokenLexeme.replace("<", "&lt;");
        message = message.replace("$1$", expectedLexeme);
        message = message.replace("$2$", tokenLexeme);
        return message;
    }

    static getUnexpectedElementMessage(foundElement, tokenLexeme, position) {
        var message = MessageType["U-ALL"];
        if (message == null) {
            return "Unknown message: \"U-ALL\"";
        }

        message = message.replace("$element$", foundElement);
//        tokenLexeme = tokenLexeme.replace("<", "&lt;");
        message = message.replace("$1$", tokenLexeme);
        message = message.replace("$2$", position);
        return message;
    }

    static getErrorMessageByMessageID(messageID) {
        var message = MessageType[messageID];
        return message != null ? message : "Unknown message ID \"" + messageID + "\"";
    }
}
