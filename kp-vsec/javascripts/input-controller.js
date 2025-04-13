
// Filename: user-input-controller

    /*
        Method is used to handle <select> tag Dropdown Options Menu behavior.
        Flag "dropDownShown (true)" indicates state when user clicked on the
        selector and Dropdown Options Menu just get shown. Selector listener
        should ignore this state as he is supposed to make another  click on
        the menu to chose a model he will be working with. So listener  sets
        the flag to state "false", processes click made on the open menu and
        then sets "dropDownShown" flag to "true" to  ignore  Menu Open event
        when user clicks on Selector and make Dropdown  Options  Menu  shown
        again.
    */
    function onResize() {
        dropDownShown = true;
//        console.log("On RESIZE event: Dropdown Shown = " + dropDownShown);
    }

    /*
        Function responds on Scroll Bar clicked event
    */
    var clickedOnScrollbar = function(mouseX){
        if( $(window).outerWidth() <= mouseX ){
            dropDownShown = true;
//            console.log("On SCROLL BAR CLICKED event: Dropdown Shown = " + dropDownShown);
        }
    }

    /*
        Function responds on Scroll event
    */
    function onScroll(event){
        dropDownShown = true;
//        console.log("On SCROLL event: Dropdown Shown = " + dropDownShown);
    }

    /*
        Function responds on Selector Dropdown Menu focus lost event
    */
    function dropdownFocusOutHandler(e){
        // document.getElementById("dropdown").style.borderColor = null;
        dropDownShown = true;
//        console.log("On SELECTOR FOCUS LOST event: Dropdown Shown = " + dropDownShown);
    }

    // =================================================================================================================

    const INTRODUCTORY_MODEL_USER_ID = "Model 0.0: Introductory Example.";

    let modelSelected = false;
    let startStopButtonIsInStartState = true;
    let dropDownShown = true;
    let selectedIndex;

    function isModelSelected(){
        return modelSelected;
    }

    //   ===========================
    //   I n i t i a l i z a t i o n
    //   ===========================

    //
    //   This function add window listener, but is not in user at this point
    //
    function init(){
        console.log("INITIALIZING");
        modelSelected = false;
//        prompt("What's your name?");

//        document.getElementById("input").innerHTML = "";
//
//        if ((/MSIE 10/i.test(navigator.userAgent)) ||
//        /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||
//        /Edge\/\d./i.test(navigator.userAgent)
//        ) {
//            document.getElementById('IE').setAttribute("style","font-size:15pt");
//            document.getElementById('IE').style.backgroundColor = "#FF0000";
//            document.getElementById('IE').style.color = "#FFFFFF";
//            document.getElementById('IE').innerHTML = "Do not run this page in Internet Explorer";
//        }

        // Calling Model Storage methods to Building models and initialize All Models Map

        initModelsAndAllModelsMap();

        // This listener resets <select> element in initial state
        // when dropdown is open and click is done outside it.
//        let window  = document.getElementById("window");  scroll
//        window.addEventListener("click", function(event){
//            console.log("WINDOWS click"+dropDownShown);
//            dropDownShown = true;
//            console.log("WINDOWS click"+dropDownShown);
//        });

        /*
        */
        $(document).mousedown(function(e){
             clickedOnScrollbar(e.clientX);
        });

        /*
        */
        window.addEventListener("scroll", onScroll(event));

        //
        // Presenting Introductory Model
        //

        // Setting default introductory model as current simulation model.
//        let introductoryModelKey = selectorDropDownChoicesToModelKeyMap.get(INTRODUCTORY_MODEL_USER_ID);
        let introductoryModelKey = getModelKeyByUserChoiceID(INTRODUCTORY_MODEL_USER_ID)
        let currentModel = setUserSelectedModelAsCurrent(introductoryModelKey);
        if (currentModel != null) {
            modelSelected = true;
        }
//        console.log("Current Model is " + currentModel.selectedModelKey );
        initSimulationControllerWIthCurrentModel(currentModel);

        // Creating current simulation model view
        createModelView(currentModel);
        showModelBehaviorMode(currentModel)

        // enable control buttons
        enableDisableButtons(true);
        enableDisableStartStopButton(true);
        enableDisableResetButton(true)
// =====================================================================================================================
        // This code might be needed later, in case if all
        // listeners located at the top of the file do not
        // work well.

//        document.addEventListener("click", function(event){
//            let selector = document.getElementById("dropdown");
//            let optionValue = selector.value;
//
//            if(selector !== event.target  ){
////                         console.log("DOCUMENT click RESET "+dropDownShown);
////                         dropDownShown = true;
////                         console.log("DOCUMENT click RESET NEW "+dropDownShown);
////                             selector.selectedIndex = selectedIndex;
//                         }
//
////            console.log("!"+optionValue);
////            if(optionValue.length != 0){
//////                console.log("CLOSED");
////            } else{
//////             console.log("OPEN");
////                         if(selector !== event.target  ){
////                         console.log("RESET "+dropDownShown);
////                         dropDownShown = true;
////                         console.log("RESET NEW "+dropDownShown);
//////                             selector.selectedIndex = selectedIndex;
////                         } else{
//////                         selector.selectedIndex = 0;
////                         }
////            }
////            if(selector !== event.target  ){
////                selector.selectedIndex = 0;
////            }
//        });


//        document.addEventListener("click", function(event){
//            let selector = document.getElementById("dropdown");
//            let optionValue = selector.value;
//
////            console.log("!"+optionValue);
//            if(optionValue.length != 0){
////                console.log("CLOSED");
//            } else{
////             console.log("OPEN");
//                         if(selector !== event.target  ){
//                             selector.selectedIndex = selectedIndex;
//                         } else{
////                         selector.selectedIndex = 0;
//                         }
//            }
////            if(selector !== event.target  ){
////                selector.selectedIndex = 0;
////            }
//        });
    }

    //   =====================================================================
    //   M o d e l   S e l e c t i o n   C a l l b a c k   F u n c t i o n
    //  ======================================================================

    function optionSelectionHandler(sel) {
        console.log("argument \""+argument+"\"");
//        if (sel.value === "exp00") {
//            return;
//        }

        // reset original expression as it might be set on previous calculation
        // originalExpression = "";

        // presenting selected expression letiable list     getAttribute('value');
        let groupLabel = sel.options[sel.selectedIndex].parentNode.label;
//        console.log("O P T I O N: groupLabel \""+groupLabel+"\"");
        let groupValue = sel.options[sel.selectedIndex].parentNode.getAttribute('value');
//        console.log("O P T I O N: groupValue \""+groupValue+"\"");
        let optionValue = sel.value;
//        console.log("O P T I O N: optionValue \""+optionValue+"\"");
        let selectedIndex = sel.selectedIndex;
//        console.log("O P T I O N: selectedIndex \""+selectedIndex+"\"");
        let selectedText = sel.options[sel.selectedIndex].text;
//        console.log("O P T I O N: selectedText \""+selectedText+"\"");
    }

    function dropDownSelectionHandler(sel) {

        // Ignoring first click on Model Selector that just opens
        // Selector Dropdown Menu.  Next call is going to be when
        // a model is selected. This call will be processed.

        if (dropDownShown) {
//            console.log("dropDownSelectionHandler DROPDOWN SHOWN: CALL IGNORED");
            dropDownShown = false;
            return;
        }

//        console.log("dropDownSelectionHandler MODEL SELECTED");

        if(true){
            dropDownSelectionProcessor(sel)
            dropDownShown = true;
            return;
        }

        // reset original expression as it might be set on previous calculation
        // originalExpression = "";

        // presenting selected expression letiable list     getAttribute('value');
        let groupLabel = sel.options[sel.selectedIndex].parentNode.label;
//        console.log("S E L E C T: groupLabel \""+groupLabel+"\"");
        let groupValue = sel.options[sel.selectedIndex].parentNode.getAttribute('value');
//        console.log("S E L E C T: groupValue \""+groupValue+"\"");
        let optionValue = sel.value;
//        console.log("S E L E C T: optionValue \""+optionValue+"\"");
        let selectedIndex = sel.selectedIndex;
//        console.log("S E L E C T: selectedIndex \""+selectedIndex+"\"");
        let selectedText = sel.options[sel.selectedIndex].text;
//        console.log("S E L E C T: selectedText \""+selectedText+"\"");
        dropDownShown = true;
    }

//    function dropdownFocusHandler(e) {
////            document.getElementById("dropdown").style.borderColor = "skyblue";
////            document.getElementById("dropdown").style.borderColor = "#FFC7CE";
////            console.log("focus gained" + e);
//        }
//

    //   ===============================================================================================================
    //              B u t t o n s   C a l l b a c k   F u n c t i o n s
    //  ================================================================================================================

    function twoStepsSimulationButtonClicked(e){
        console.log("\n\nMajor Step Simulation Button Clicked. Simulation is running = "+isSimulationRunning());
        processTwoStepsButtonClicked();
    }

    function threeStepsSimulationButtonClicked(e){
        console.log("\n\nMedium Step Simulation Button Clicked ");
        processThreeStepsButtonClicked();
    }

    function microStepsSimulationButtonClicked(e){
        console.log("\n\nMicro Step Simulation Button Clicked ");
        processMicroStepsButtonClicked();
    }

    function startStopSimulationButtonClicked(e){
        if(!isModelSelected()){
//            console.log("Model is not selected. Auto Simulation can not be started. Start Auto Button click ignored");
            return
        }

        processStartStopButtonClicked(startStopButtonIsInStartState);
        setStartStopButtonIntoGivenState(startStopButtonIsInStartState);
    }

    function resetSimulationButtonClicked(e){
        if(!isSimulationRunning()){
//            console.log("Simulation is not running. Reset Simulation call ignored");
            return
        }
        console.log("Reset Simulation Button Clicked ");
//        if(!startStopButtonIsInStartState){
//            setStartStopButtonIntoGivenState(startStopButtonIsInStartState);
//        }
        resetSimulationProcess();
        showSimulationStepExecuted(SIMULATION_RESET_BUTTON_ID);
    }

    //   ===============================================================================================================
    //              D r o p d o w n   E x p r e s s i o n   S e l e c t o r   P r o c e s s o r
    //   ===============================================================================================================

    function dropDownSelectionProcessor(sel) {
        if (sel.value === "exp00") {
            return;
        }
        if(modelSelected) {
//            setStartStopButtonIntoGivenState(false);
            showHideModelName(null);
            resetSimulationProcess();
        }

        // reset original expression as it might be set on previous calculation
        // originalExpression = "";

        // presenting selected expression letiable list     getAttribute('value');
        let groupLabel = sel.options[sel.selectedIndex].parentNode.label;
        let groupValue = sel.options[sel.selectedIndex].parentNode.getAttribute('value');
//        console.log("groupValue \""+groupValue+"\"");
        let optionValue = sel.value;
        let key = groupValue + "-" + optionValue;
        let selectedText = sel.options[sel.selectedIndex].text;
//        console.log("selectedText \""+selectedText+"\"");
        selectedIndex = sel.selectedIndex;
//        console.log("optionValue \""+optionValue+"\"");
//        console.log("key \""+key+"\"");

//        selectedInitializationMap = expChoiceToVarValMap[key];
//        let initialization = selectedInitializationMap["x"];

//        let variableListForExpression = getVariableListForExpression(key);
//        console.log("variableListForExpression  = \""+variableListForExpression+"\"");
//        document.getElementById("variables").innerHTML = variableListForExpression;
//        document.getElementById("variables").innerHTML = selectedText;
//        document.getElementById("variables").style.backgroundColor = ACTIVE_BACKGROUND;
//
//        console.log();
//        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//        console.log("drop Down SelectionHandler: selected value: "+selectedText);
        let userChoiceModelKey = null;
        for(i = 0; i < selectorDropDownChoices.length; i++){
//            console.log("Expected text "+i+ "   " +selectorDropDownChoices[i]);
            if(selectedText == selectorDropDownChoices[i][0]){
                userChoiceModelKey = selectorDropDownChoices[i][1]
                break;
            } else{
//                console.log("selectedText N O T  RECOGNIZED ");
            }
        }

//        console.log("selectedText RECOGNIZED: user choice ModelID is \""+userChoiceModelKey+"\"");

        // This, as they say, might help to handle Dropdown
        // Menu behavior
        let selector = document.getElementById("dropdown");
//        selector.blur();

        // Setting user choice as current simulation model.
        let currentModel = setUserSelectedModelAsCurrent(userChoiceModelKey);
        if (currentModel != null) {
            modelSelected = true;
        }
//        console.log("Current Model is " + currentModel.selectedModelKey );
        initSimulationControllerWIthCurrentModel(currentModel);

        // Creating current simulation model view
        let currentModelName = currentModel.selectedModelName
        showHideModelName(currentModelName);
        createModelView(currentModel);
        showModelBehaviorMode(currentModel)

        // enable control buttons
        enableDisableButtons(true);
        enableDisableStartStopButton(true);
        enableDisableResetButton(true)
    }

    //   =====================================================================
    //   B u t t o n   E n a b l i n g / D i s a b l i n g   U t i l i t i e s
    //  ======================================================================

    //
    //   Enables buttons when input field is not empty
    //
    let enableDisableButtons = function(enable){
//        console.log("enableDisableButtons expression = 111" );
//        console.log("enableDisableButtons expression = 222" );
        let button;
        if(enable){

            // enabling "Two Steps Simulation" button
            button = document.getElementById("one-step-simulation-button");
            button.style.backgroundColor = "#C5D3E8";   //"#edd8af";
            button.disabled = false;

            // enabling "Three Steps Simulation" button
            button = document.getElementById("two-steps-simulation-button");
            button.style.backgroundColor = "#edd8af";
            button.disabled = false;

            // enabling "Micro Steps Simulation" button
            button = document.getElementById("micro-steps-simulation-button");
            button.style.backgroundColor = "#BDEDBD"; //"#C6F3CE";
            button.disabled = false;

        } else {

            // disabling "Two Steps Simulation" button
            button = document.getElementById("one-step-simulation-button");
            disableButton(button);

            // disabling "Three Steps Simulation" button
            button = document.getElementById("two-steps-simulation-button");
            disableButton(button);

            // enabling "Micro Steps Simulation" button
            button = document.getElementById("micro-steps-simulation-button");
            disableButton(button);
        }
    }

    //
    //   Enables "Clear" button when Input Field holds expression
    //
    let enableDisableStartStopButton = function(enable){
        if(enable){
            // enabling "Fix it" button
            let button = document.getElementById("start-stop-simulation-button");
            button.style.backgroundColor = startButtonBackground; //"#FFFFBC" //"#ffdbdd" // "#FFEF8C";  //"#C5D3DE"; // "#C8D9E2";
            button.disabled = false;
        } else {
            // disabling "Fix it" button
            let button = document.getElementById("start-stop-simulation-button");
            disableButton(button);
        }
    }

    let startButtonBackground = "#FFFFA9";
    let stopButtonBackground = "#FFC7CE" ;

    let setStartStopButtonIntoGivenState = function(setToStartState){
        if(setToStartState){
            startStopButtonIsInStartState = false;
            let button = document.getElementById("start-stop-simulation-button");
            button.textContent = "Stop Auto Simulation";
            button.style.backgroundColor = stopButtonBackground;
            button.style.foregroundColor = "#FFFFFF"
            console.log("Change button text to Stop " );
            showHideAutoSimulationStatus(true);
        } else {
           startStopButtonIsInStartState = true;
           let button = document.getElementById("start-stop-simulation-button");
           button.textContent = "Start Auto Simulation";
           button.style.backgroundColor = startButtonBackground;
           console.log("Change button text to Start " );
           showHideAutoSimulationStatus(false);
        }
    }

    // Reset button methods

    let resetButtonBackground = "#ddddff";
    let resetButtonBrightBackground = "#bbbbff";

    let enableDisableResetButton = function(enable){
        if(enable){
            // enabling "Fix it" button
            let button = document.getElementById("reset-simulation-button");
//            button.style.backgroundColor = "#FFEAFF"
            button.style.backgroundColor = resetButtonBackground;
            button.disabled = false;
        } else {
            // disabling "Fix it" button
            let button = document.getElementById("reset-simulation-button");
            disableButton(button);
        }
    }

    /*
        Currently not in use
    */
    let highlightResetButton = function(highlight){
        if(highlight){
            let button = document.getElementById("reset-simulation-button");
            button.style.backgroundColor = resetButtonBrightBackground;
        } else {
            let button = document.getElementById("reset-simulation-button");
            button.style.backgroundColor = resetButtonBackground;
        }
    }