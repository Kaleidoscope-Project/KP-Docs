
// Model Storage

    let selectorDropDownChoices = [
        ["Model 0.0: Introductory Example.","Model-0-0"],

        ["Model 1.1: State driven model. Each system state is a situation.","Model-1-1"],
        ["Model 1.2: State driven model with partial sub-situations.","Model-1-2"],
        ["Model 1.3: Two State driven sub-processes with two independent partial sub-situations.","Model-1-3"],

        ["Model 2.1: State Input driven model. Full situations input. Situations are reordered.","Model-2-1"],
        ["Model 2.2: Two State Input driven processes. One process is finite, the other is endless.","Model-2-2"],
        ["Model 2.3: One State Input driven process. Sporadic situations, fragmentary state changes.","Model-2-3"],
    ]

    const selectorDropDownChoicesToModelKeyMap = new Map(selectorDropDownChoices);

    function getModelKeyByUserChoiceID(userChoiceID){
        var modelKey = selectorDropDownChoicesToModelKeyMap.get(userChoiceID);
        return modelKey;
    }

    const allModelsMap = new Map();

//    let ModelNameToModelDefinition = [
//            ["Model 1.1: Each model state is a situation.","Model-1-1"],
//            ["Model 1.2: Some model states are situations but the others are not.","Model-1-2"],
//            ["Model 1.3: More Than One Process. One Process is finite while the other is endless.","Model-1-3"],
//        ]

    function initModelsAndAllModelsMap(){

        console.log("INITIALIZING MODELS");
//        printSelectorDropDownChoicesToModelIDMap();

        // Initializing Model-0-0. Introductory Example.
        let model00 = getModel00();
        let model00Key = model00.modelKey;
        console.log("Model 00 Key = "+model00Key );
        storeModel(model00);

        // Initializing Model-1-1
        let model11 = getModel11();
        let model11Key = model11.modelKey;
        console.log("Model 11 Key = "+model11Key );
        storeModel(model11);

        // Initializing Model-1-2
        let model12 = getModel12();
        let model12Key = model12.modelKey;
        console.log("Model 12 Key = "+model12Key );
        storeModel(model12);

        // Initializing Model-1-3
        let model13 = getModel13();
        let model13Key = model13.modelKey;
        console.log("Model 13 Key = "+model13Key );
        storeModel(model13);

        // Initializing Model-1-4
//        let model14 = getModel14();
//        let model14Key = model14.modelKey;
//        console.log("Model 14 Key = "+model14Key );
//        storeModel(model14);

        // Initializing Model-2-1
        let model21 = getModel21();
        let model21Key = model21.modelKey;
        console.log("Model 21 Key = "+model21Key );
        storeModel(model21);

        // Initializing Model-2-2
        printModel22();
        let model22 = getModel22();
        let model22Key = model22.modelKey;
        console.log("Model 22 Key = "+model22Key );
        storeModel(model22);

        // Initializing Model-2-3
        let model23 = getModel23();
        let model23Key = model23.modelKey;
        console.log("Model 23 Key = "+model23Key );
        storeModel(model23);

//        printAllModelsMap();
//        printSelectorDropDownChoicesToModels();
    }

//    function initSelectorDropDownChoicesToModelKeyMap(){
//        selectorDropDownChoicesToModelKeyMap = new Map(selectorDropDownChoices);
//    }

    function printSelectorDropDownChoicesToModelIDMap(){
        console.log("*******************************************************");
        console.log("Printing Selector DropDown Choices To Model IDs ");
        let userChoiceKeys = selectorDropDownChoicesToModelKeyMap.keys();
        let userChoiceKeyIndex = 0;
        console.log("Selector DropDown Choices To Model IDs Map size =  " + selectorDropDownChoicesToModelKeyMap.size);
        for (const key of userChoiceKeys) {
            console.log("Index: "+userChoiceKeyIndex+" User choice key: " + key);
            let modelID = selectorDropDownChoicesToModelKeyMap.get(key);
            console.log("Index: "+userChoiceKeyIndex + " Model ID = "+modelID );
            userChoiceKeyIndex++
        }
    }

    // -----------------------------------------------------------------------------------------------------------------

    function printAllModelsMap(){
        console.log("*******************************************************");
        console.log("Printing All Models Map");
        let allModelMapKeys = allModelsMap.keys();
        let modelKeyIndex = 0;
        console.log("All Models Map size =  " + allModelsMap.size);
        for (const key of allModelMapKeys) {
            console.log("Index: "+modelKeyIndex+" modelID key: " + key);
            let model = allModelsMap.get(key);
            let modelKey = model.modelKey;
            console.log("Index: "+modelKeyIndex + " Model name = " + modelKey);
            modelKeyIndex++;
        }
    }

    // -----------------------------------------------------------------------------------------------------------------

     function printSelectorDropDownChoicesToModels(){
                console.log("*******************************************************");
                console.log("Printing Selector DropDown Choices To AllModelMap Names");
                let userChoiceKeys = selectorDropDownChoicesToModelKeyMap.keys();
                let userChoiceKeyIndex = 0;
                for (const key of userChoiceKeys) {
                    // Taking Model ID from User Choice to Model ID Map
                    console.log("Index: "+userChoiceKeyIndex+" User choice key: " + key);
                    let modelID = selectorDropDownChoicesToModelKeyMap.get(key);
                    console.log("Index: "+userChoiceKeyIndex + " Model ID = "+modelID );

                    // Taking Model from All Model ID to Model Map
                    let currentModel = getModelDefinitionFromModelStorage(modelID);
                    if(currentModel == null){
                        console.log("Index: "+userChoiceKeyIndex + " Model, for Model ID = "+modelID + " NOT found." );
                        userChoiceKeyIndex++;
                        continue;
                    }
                    let modelKey = currentModel.modelKey;
                    console.log("Index: "+userChoiceKeyIndex + " Model, Model Name = "+modelKey + " FOUND.");
                    userChoiceKeyIndex++;
                }
            }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function initChosenModelToModelKeyMap(userChoiceToModelKeyPairs){
        chosenModelToModelKeyMap
    }

    function storeModel(model){
        let key = model.modelKey;
//        console.log("Model 01 Name = "+key );
        allModelsMap.set(key, model);
    }

    function getModelDefinitionFromModelStorage(key){
        value = allModelsMap.get(key);
        return value;
    }

    function getAllModelsMapKeys(){
       return allModelsMap.keys();
    }
