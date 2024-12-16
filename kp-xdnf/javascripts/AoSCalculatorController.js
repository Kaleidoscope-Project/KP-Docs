
//
//  AoS Expression Controller
//

    var userInputDisabled = true;
    var ACTIVE_BACKGROUND_WHITE = "#FFFFFF";  // white
    var ACTIVE_BACKGROUND = "#FFFFEE";  // light yellow
//    var ACTIVE_BACKGROUND = 'rgb(' + 246 + ',' + 216 + ',' + 124 + ')';

    //
    var variableInitialization = {
           "c01-exp01":
           "Variable initial values: &nbsp;y = <b>H</b>, &nbsp;&nbsp;x = <b>J</b> &nbsp;&nbsp;&nbsp;&nbsp;// &nbsp;Expected calculated result is <b>H</b>",

            "c01-exp02": "v01 = <b>H</b>, &nbsp;&nbsp;x01 = <b>A</b> "+
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;Expected calculated result is <b>A</b>",
             "c01-exp03": "v01 = <b>H</b>, &nbsp;&nbsp;x01 = <b>B</b> "+
             "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;Expected calculated result is <b>B</b>",
              "c02-exp01": "v01 = <b>H</b>, &nbsp;&nbsp;x01 = <b>B</b>, &nbsp;&nbsp;x02 = <b>B</b>, &nbsp;&nbsp;x03 = <b>B</b> "+
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;Expected calculated result is <b>B</b>",
               "c02-exp02": "v01 = <b>H</b>, &nbsp;&nbsp;x01 = <b>B</b>, &nbsp;&nbsp;x02 = <b>B</b>, &nbsp;&nbsp;x03 = <b>B</b> "+
               "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;Expected calculated result is <b>B</b>",
           };

    // Case 01
    var c01Exp01VarValMap = {
        "y": "H", "x": "J"
    };
    var c01Exp02VarValMap = {
        "y": "H", "x": "A"
    };
    var c01Exp03VarValMap = {
        "y": "H", "x": "B"
    };

    // Case 02  y < (M * (x1 ? A)) | (N * ((x2 ? Y) & (x3 ? Z)))
    var c02Exp01VarValMap = {
        "y": "G", "x1": "P", "x2": "Y", "x2": "U"
    };
    var c02Exp02VarValMap = {
        "y": "G", "x1": "E", "x2": "Y", "x3": "Z"
    };
    var c02Exp03VarValMap = {
        "y": "G", "x1": "P", "x2": "Y", "x3": "Z"
    };

    // Case 03
    var c03Exp01VarValMap = {
        "y": "A", "y": "B", "y": "C", "y": "L", "y": "M", "y": "A"
    };

    var expChoiceToVarValMap = {
        "c01-exp01": c01Exp01VarValMap,
        "c01-exp02": c01Exp02VarValMap,
        "c01-exp03": c01Exp03VarValMap,

        "c02-exp01": c02Exp01VarValMap,
        "c02-exp02": c02Exp02VarValMap,
        "c02-exp03": c02Exp03VarValMap,

        "c03-exp01": c03Exp01VarValMap,
    }

    var originalExpression = "";
    var selectedInitializationMap = null;
    var calculatorContext = null;

    //   ===========================
    //   I n i t i a l i z a t i o n
    //   ===========================

    //
    //   This function add window listener, but is not in user at this point
    //
    function init(){
        console.log("initialized");
        document.getElementById("input").innerHTML = "";

        if ((/MSIE 10/i.test(navigator.userAgent)) ||
        /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)
        ) {
            document.getElementById('IE').setAttribute("style","font-size:15pt");
            document.getElementById('IE').style.backgroundColor = "#FF0000";
            document.getElementById('IE').style.color = "#FFFFFF";
            document.getElementById('IE').innerHTML = "Do not run this page in Internet Explorer";
        }
    }

    //
    // Creates string's "insertAt" function as needed
    //
    String.prototype.insertAt=function(index, string) {
        console.log("String \"insertAt\" function created");
        return this.slice(0, index) + string + this.slice(index);
    }

    //
    // Creates string's "replaceBetween" function as needed
    //
    String.prototype.replaceBetween = function(start, end, what) {
        console.log("String \"replaceBetween\" function created");
        return this.substring(0, start) + what + this.substring(end);
    };

    function getVariableListForExpression(key){
        var variableListForExpression = variableInitialization[key];
        return variableListForExpression;
    }

    //   =========================================================================
    //   D r o p d o w n   E x p r e s s i o n   S e l e c t i o n   h a n d l e r
    //   =========================================================================

    function dropDownSelectionHandler(sel) {
        dropDownSelectionProcessor(sel);
    }

    function dropdownFocusHandler(e) {
        document.getElementById("dropdown").style.borderColor = "skyblue";
//        console.log("focus " + e);
    }

    function dropdownFocusOutHandler(e){
        document.getElementById("dropdown").style.borderColor = null;
//        console.log("focus out "+e);
    }


    //   ===================================================
    //   I n p u t   F i e l d   E v e n t   h a n d l e r s
    //   ===================================================


    //
    //   Restores original  expression
    //
    function mouseDownEventHandler(){
        console.log("IF mouseDownEventHandler");
        restoreOriginalExpression();
        // clicking on the Input Field restores expression as plain string, but
        // keeps Fix It button enabled,  user might still want to fix the error
        <!--enableDisableFixItButton(false);-->
    }

    //
    //   Restores original  expression,
    //   ignores Enter key pressed
    //
    function keyPressedEventHandler(event){
        restoreOriginalExpression();
        <!--var textValue = document.getElementById("input").value;-->
        var charCode = (event.which) ? event.which : event.keyCode;
        console.log("onKeyboardKeyPressed "+charCode+"   ");
        if (charCode == 13) {
            <!--alert("asterix not allowed");-->
            <!--textValue = '';-->
            return false;
        } else {
            return true;
        }
    }

    //
    //   Enables buttons when expression created or exists,
    //   otherwise clears controls when expression deleted
    //
    function expressionChangedEventHandler(){
            var expression = document.getElementById("input").textContent;
            // this will remove highlighting, if any
            document.getElementById("input").textContent = expression;
            console.log("onExpressionChanged expression = \""+expression+"\"" );
            console.log("onExpressionChanged expression  x = \""+expression.length+"\"" );

            if(expression.length > 0){
                document.getElementById("input").style.backgroundColor = ACTIVE_BACKGROUND;//"#f8f8ee";
                document.getElementById("variables").style.backgroundColor = ACTIVE_BACKGROUND;
                enableDisableButtons(true);
                enableDisableClearButton(true);
                return true;
            }
            clearExpression();
            return false;
        }

    //
    //   Highlights Input Field outline on focus gained
    //
    function inputFieldFocusHandler(e) {
        console.log("inputFieldFocusHandler: " + e);
        var source = e.target || e.srcElement;
        console.log("inputFieldFocusHandler: "+source);
        console.log("inputFieldFocusHandler: originalExpression \"" + originalExpression+"\"");
        console.log("inputFieldFocusHandler: currentExpression " + document.getElementById("input").innerHTML);

        document.getElementById("input").style.borderColor = "skyblue";
        var expression = document.getElementById("input").textContent;
        console.log("inputFieldFocusHandler: expression "+expression.length);
        console.log("inputFieldFocusHandler: expression \""+expression+"\"");
        if(expression.length > 0){
            document.getElementById("input").style.backgroundColor = ACTIVE_BACKGROUND;
            document.getElementById("variables").style.backgroundColor = ACTIVE_BACKGROUND;
        } else {
            document.getElementById("input").style.backgroundColor = null;
            document.getElementById("variables").style.backgroundColor = null;
        }
    }

    //
    //   Clears Input Field outline highlighting on focus lost
    //
    function inputFieldFocusOutHandler(e){
        document.getElementById("input").style.borderColor = null;
        if(document.getElementById("input").textContent.length > 0){
            return;
        }
        document.getElementById("input").style.backgroundColor = null;
        document.getElementById("input").innerHTML = "";
        console.log("focus out "+e);
    }


    //   =========================================
    //   B u t t o n   E v e n t   H a n d l e r s
    //  ==========================================


    //
    //    "Clear" button's on click action
    //
    function clearButtonHandler(){
        clearExpression();
        enableDisableClearButton(false);
    }

    //
    //    "Insert Blanks" button's on click action
    //
    function insertBlanksButtonHandler(){
//        var buttonText = document.getElementById("insert-blanks-button").textContent;
//        if(buttonText == "Insert Blanks"){
            var expression = document.getElementById("input").textContent;
            expression = removeBlanksFromExpression(expression)
            var expressionWithBlanks = addBlanksToExpression(expression);
            document.getElementById("input").innerHTML = expressionWithBlanks;
//            document.getElementById("insert-blanks-button").textContent = "Insert Parenthesis";
//        }
//        if(buttonText == "Insert Parenthesis"){
//            var expression = document.getElementById("input").textContent;
//            expression = removeBlanksFromExpression(expression)
//            var expressionWithBlanks = addBlanksToExpression(expression);
//            document.getElementById("input").innerHTML = expressionWithBlanks;
//            document.getElementById("insert-blanks-button").textContent = "Insert Blanks";
//        }
    }

    //
    //    "Remove Blanks" button's on click action
    //
    function removeBlanksButtonHandler(){
//        var buttonText = document.getElementById("remove-blanks-button").textContent;
//        if(buttonText == "Remove Blanks"){
            var expression = document.getElementById("input").textContent;
            var expressionWithoutBlanks = removeBlanksFromExpression(expression);
//             console.log("removeBlanksButtonHandler "+expressionWithoutBlanks);
            document.getElementById("input").textContent = expressionWithoutBlanks;
//            document.getElementById("remove-blanks-button").textContent = "Remove Parenthesis";
//        }
//        if(buttonText == "Remove Parenthesis"){
//            var expression = document.getElementById("input").textContent;
//            var expressionWithoutBlanks = removeBlanksFromExpression(expression);
//            document.getElementById("input").innerHTML = expressionWithoutBlanks;
//            document.getElementById("remove-blanks-button").textContent = "Remove Blanks";
//        }
    }

    //
    //    "Calculate" button's on click action
    //
    function calculateButtonHandler() {
        processCalculateButtonClick();
    }

    //
    //    "Fix It" button's on click action
    //
    function fixItButtonHandler(){
        console.log("fixItButtonHandler");
        var expression = document.getElementById("input").textContent;
        console.log("fixItButtonHandler expression = \""+expression+"\"" );
        var fixedExpression = fixError(expression);
        console.log("fixItButtonHandler fixedExpression = \""+fixedExpression +"\"");
        document.getElementById("input").innerHTML = fixedExpression;
        document.getElementById("result").innerHTML = "Fixed.";
        enableDisableFixItButton(false);
    }


    //                            ===============================
    //                            E v e n t   P r o c e s s o r s
    //                            ===============================


    //   ===========================================================================
    //   D r o p d o w n   E x p r e s s i o n   S e l e c t o r   P r o c e s s o r
    //   ===========================================================================


    function dropDownSelectionProcessor(sel) {
        if (sel.value === "exp00") {
            return;
        }

        // reset original expression as it might be set on previous calculation
        originalExpression = "";

        // presenting selected expression variable list     getAttribute('value');
        var groupLabel = sel.options[sel.selectedIndex].parentNode.label;
        var groupValue = sel.options[sel.selectedIndex].parentNode.getAttribute('value');
        console.log("groupValue \""+groupValue+"\"");
        var optionValue = sel.value;
        var key = groupValue + "-" + optionValue;
        var selectedText = sel.options[sel.selectedIndex].text;
        console.log("selectedText \""+selectedText+"\"");
//        console.log("optionValue \""+optionValue+"\"");
//        console.log("key \""+key+"\"");

        selectedInitializationMap = expChoiceToVarValMap[key];
//        var initialization = selectedInitializationMap["x"];

        var variableListForExpression = getVariableListForExpression(key);
//        console.log("variableListForExpression  = \""+variableListForExpression+"\"");
//        document.getElementById("variables").innerHTML = variableListForExpression;
        document.getElementById("variables").innerHTML = selectedText;
        document.getElementById("variables").style.backgroundColor = ACTIVE_BACKGROUND;

        console.log("drop Down SelectionHandler: selected valueus: "+selectedText);
        document.getElementById("input").innerHTML = groupLabel
        document.getElementById("input").style.backgroundColor = ACTIVE_BACKGROUND;
        document.getElementById("input").focus();

        // clear Result panel
        document.getElementById("result").innerHTML = "";
        document.getElementById("result").style.backgroundColor = null; //'#FFFFFF';

        // enable control buttons
        enableDisableButtons(true);
        enableDisableClearButton(true);

        // restore initial option text
        var select = document.getElementsByTagName("SELECT")[0];
        select.selectedIndex = 0;
        calculatorContext = null;
    }


    //   ===================================================================
    //   " C a l c u l a t e "   B u t t o n   C l i c k   P r o c e s s o r
    //   ===================================================================


    function processCalculateButtonClick() {
        enableDisableFixItButton(false);

        if(calculatorContext === null){

            // Tokenizing, parsing and calculating selected expression

            var x = document.getElementById("input").textContent;
            console.log("calculateButtonHandler x = \""+x+"\"" );

            var expression = x.trim().replace( "&lt;" , "<");
            console.log("calculateButtonHandler expression = \""+expression +"\"");

            // saving obtained from Input Field plain string
            // expression right before it is sent to Calculator
            originalExpression = expression;
            console.log("calculateButtonHandler originalExpression "+originalExpression );

            // Processing Calculator's result
            calculatorContext = calculateAoSExpression(expression, selectedInitializationMap);

        } else {

            // Updating changed variable, re-parsing and calculating earlier selected expression

            let calculatedResult = calculatorContext.getCalculatedResult();
            calculatorContext.updateDependentVariableValue(calculatedResult)
            calculatorContext.initRecalculation();
            calculatorContext = recalculateExistingExpression(calculatorContext);
        }

        var result;

        if(calculatorContext.isError()){
            // presenting error in Input Field
            highlightErrorInExpression(calculatorContext);
            // presenting error explanation in Result Field
            console.log("Calculate Button Click Handler: error !");
            result = calculatorContext.getErrorExplanation();
            // enabling "Fix It" button
            console.log("Calculate Button Click Handler: error message = "+result);
            enableDisableFixItButton(true);
        } else {
            // cleaning saved expression sent to Calculator
            originalExpression = "";
            // preparing calculated result
            var calculatedResult = calculatorContext.getCalculatedResult();
            result = "y = <b>"+calculatedResult+"</b>";
        }

        // setting focus to Input Field
        document.getElementById("input").focus();

        // presenting error explanation or calculated result in Result Field
        document.getElementById("result").style.backgroundColor = ACTIVE_BACKGROUND;  //"#FFFFFF";
        document.getElementById("result").innerHTML = result;
    }


    //   =====================================================================
    //   B u t t o n   E n a b l i n g / D i s a b l i n g   U t i l i t i e s
    //  ======================================================================


    //
    //   Enables buttons when input field is not empty
    //
    var enableDisableButtons = function(enable){
        <!--var expression = document.getElementById("input").textContent;-->
        <!--console.log("enableDisableButtons expression = \""+expression+"\"" );-->
        <!--console.log("enableDisableButtons expression = \""+expression.length+"\"" );-->
        var button;
        if(enable){

            <!--// enabling "Fix it" button-->
            <!--button = document.getElementById("fix-it-button");-->
            <!--button.style.backgroundColor = "#ffdbdd" // "#FFEF8C";  //"#C5D3DE"; // "#C8D9E2";-->
            <!--button.disabled = false;-->

            // enabling "Remove blanks" button
            button = document.getElementById("remove-blanks-button");
            button.style.backgroundColor = "#C5D3E8";   //"#edd8af";
            button.disabled = false;

            // enabling "Insert blanks" button
            button = document.getElementById("insert-blanks-button");
            button.style.backgroundColor = "#edd8af";
            button.disabled = false;

            // enabling "Calculate" button
            button = document.getElementById("calculate-button");
            button.style.backgroundColor = "#BDEDBD"; //"#C6F3CE";
            button.disabled = false;

        } else {
            <!--// disabling "Fix it" button-->
            <!--button = document.getElementById("fix-it-button");-->
            <!--disableButton(button);-->

            // disabling "Remove blanks" button
            button = document.getElementById("remove-blanks-button");
            disableButton(button);

            // disabling "Insert blanks" button
            button = document.getElementById("insert-blanks-button");
            disableButton(button);

            // enabling "Calculate" button
            button = document.getElementById("calculate-button");
            disableButton(button);
        }
    }

    //
    //   Enables "Clear" button when Input Field holds expression
    //
    var enableDisableClearButton = function(enable){
        if(enable){
            // enabling "Fix it" button
            var button = document.getElementById("clear-button");
            button.style.backgroundColor = "#FFFFA9" //"#FFFFBC" //"#ffdbdd" // "#FFEF8C";  //"#C5D3DE"; // "#C8D9E2";
            button.disabled = false;
        } else {
            // disabling "Fix it" button
            var button = document.getElementById("clear-button");
            disableButton(button);
        }
    }

    //
    //   Enables "Fix It" button when Calculator found error in the expression
    //
    var enableDisableFixItButton = function(enable){
        if(userInputDisabled){
            return;
        }
        if(enable){
            // enabling "Fix it" button
            var button = document.getElementById("fix-it-button");
            button.style.backgroundColor = "#ffcccc" //"#ffdbdd" // "#FFEF8C";  //"#C5D3DE"; // "#C8D9E2";
            button.disabled = false;
        } else {
            // disabling "Fix it" button
            var button = document.getElementById("fix-it-button");
            disableButton(button);
        }
    }

    //   ===================================
    //   U t i l i t y   P r o c e s s o r s
    //  ====================================

    //
    //   Highlights detected error in Input Field.
    //
    function highlightErrorInExpression(calculatorContext) {
        if(!calculatorContext.isTokenAvailable()){
            return;
        }
        var errorStartingIndex = calculatorContext.getErrorStartingIndex();
        var errorEndingIndex = calculatorContext.getErrorEndingIndex();
        console.log("***********Highlighting: errorStartingIndex = " + errorStartingIndex + ", errorEndingIndex = " + errorEndingIndex);
        var highlightedExpression;
        if (calculatorContext.getCurrentToken().isDimmed()) {
            <!--textPaneStyledDocument.setCharacterAttributes(errorStartingIndex, errorEndingIndex - errorStartingIndex,-->
                    <!--dimmedStyle, true);-->
    <!---->
            <!--AoSParserToken previousToken = calculatorContext.getPreviousToken();-->
            <!--int previousTokenStartingIndex = previousToken.getStartingIndex();-->
            <!--int previousTokenEndingIndex = previousToken.getEndingIndex();-->
            <!--textPaneStyledDocument.setCharacterAttributes(previousTokenStartingIndex,-->
                    <!--previousTokenEndingIndex - previousTokenStartingIndex,-->
                    <!--highlightedStyle, true);-->
        } else {
            var highlightingSection = "<span style=\"color:red;\"><b>abs</b></span>";
            var highlightingPrefixSection = "<span style=\"color:red;\"><b>";
            var highlightingSuffixSection = "</b></span>";

        <!--var highlightedExpression = originalExpression.replaceBetween(errorStartingIndex, errorEndingIndex, highlightingSection);-->

       var highlightedExpression = originalExpression.insertAt(errorEndingIndex, highlightingSuffixSection);
       console.log("highlightedExpression 1 " + highlightedExpression );
       highlightedExpression = highlightedExpression.insertAt(errorStartingIndex, highlightingPrefixSection);
       console.log("highlightedExpression 2 " + highlightedExpression );
        console.log("highlightedExpression: \""+highlightedExpression+"\"");
        <!--document.getElementById("input").value = highlightedExpression;-->
         document.getElementById("input").innerHTML = highlightedExpression;
            <!--textPaneStyledDocument.setCharacterAttributes(errorStartingIndex, errorEndingIndex - errorStartingIndex,-->
                    <!--highlightedStyle, true);-->
        }
    }

    //
    //   Just disables eny given button
    //
    var disableButton = function(button){
        button.style.backgroundColor = null;
        button.style.color = null;
        button.disabled = true;
    }

    //
    //
    //
    var restoreOriginalExpression = function(){
        console.log("restoreOriginalExpression");
        if(originalExpression == null || originalExpression.length <= 0){
            return;
        }
        document.getElementById("input").innerHTML = originalExpression;
        originalExpression = "";
    }

    //
    //   Clear expression
    //
    var clearExpression = function(){
        originalExpression = "";
        document.getElementById("variables").style.backgroundColor = null;
        document.getElementById("variables").textContent = "";
        document.getElementById("variables").innerHTML = "";
        document.getElementById("input").style.backgroundColor = null;
        document.getElementById("input").textContent = "";
        document.getElementById("input").innerHTML = "";
        document.getElementById("result").style.backgroundColor = null;
        document.getElementById("result").innerHTML = "";
        enableDisableButtons(false);
        enableDisableFixItButton(false);
        enableDisableClearButton(false);
    }

    //
    //
    //
    function addBlanksToExpression(expression){
        expression = expression.trim();
        if(expression.length = 0){
            return expression;
        }
        var wasCharOfVariable = false;
        var expressionWithBlanks = "";
        for(var i = 0; i < expression.length; i++){
            var charAtIndex = expression.charAt(i);
            var charOfVariable = /^[0-9a-zA-Z-]/.test(charAtIndex);
            if(charOfVariable){
                expressionWithBlanks += charAtIndex;
            } else { // current char is not variable
                if(wasCharOfVariable){
                    expressionWithBlanks += " ";
                }
                expressionWithBlanks += charAtIndex;
                if((i+1) != expression.length){
                    expressionWithBlanks += " ";
                }
            }
            wasCharOfVariable = charOfVariable;
        }
        return expressionWithBlanks;
    }

    //
    //
    //
    function removeBlanksFromExpression(expression){
        expression = expression.trim();
        if(expression.length = 0){
            return expression;
        }
        expression = expression.replace( "&lt;" , "<");
        var expressionWithoutBlanks = "";
        for(var i = 0; i < expression.length; i++){
            var charAtIndex = expression.charAt(i);
            if(charAtIndex != ' '){
            expressionWithoutBlanks += charAtIndex;
            }
//            console.log(""+(i+1),expressionWithoutBlanks);
        }
        return expressionWithoutBlanks;
    }
