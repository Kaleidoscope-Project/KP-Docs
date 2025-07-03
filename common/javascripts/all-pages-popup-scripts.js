//   ===========================
//   I n i t i a l i z a t i o n
//   ===========================

    allPopupsInitialized = false;

    const qds01 = "elementQDS01ToPopup";
    const qds02 = "elementQDS02ToPopup";
    const qds03 = "elementQDS03ToPopup";

    const popup01 = "element01ToPopup";
    const popup02 = "element02ToPopup";
    const popup03 = "element03ToPopup";
    const popup04 = "element04ToPopup";
    const popup05 = "element05ToPopup";
    const popup06 = "element06ToPopup";

    const gmf01 = "elementGMF01ToPopup";
    const gmf02 = "elementGMF02ToPopup";

    // Downloads
    const dwl01 = "elementDWL01ToPopup";
    const dwl02 = "elementDWL02ToPopup";

    // MSE
    const mse01 = "elementMSE01ToPopup";

    // SEM
    const sem01 = "elementSEM01ToPopup";

    // VSP
    const vsp01 = "elementVSP01ToPopup";
    const vsp02 = "elementVSP02ToPopup";

    var currentPopupID = 0;
    var currentPopup = 0;
    var closingPopupID = 0;
    const urlArg = "../kp-qds/kp-qds.html";

    //
    //   Initializer for MMT page
    //
//    function initQDSPage(){
//        console.log("initMMTPage: INITIALIZING");
//        document.addEventListener('keyup', keyboardEventListener);
//
//        currentPopup = document.getElementById(popup01);
//        currentPopup.style.display = 'none';
//        currentPopup = document.getElementById(popup02);
//        currentPopup.style.display = 'none';
//        currentPopup = document.getElementById(popup03);
//        currentPopup.style.display = 'none';
//        currentPopup = document.getElementById(popup04);
//        currentPopup.style.display = 'none';
//        currentPopup = document.getElementById(popup05);
//        currentPopup.style.display = 'none';
//        currentPopup = document.getElementById(popup06);
//        currentPopup.style.display = 'none';
//
//        allPopupsInitialized = true;
//        console.log("ALL POPUP HOVER LISTENERS ARE SET");
//    }

    /*
        ESC click listener
    */
    function keyboardEventListener(event) {
//        console.log('keyboardEventListener:' );
//        console.log('keyboardEventListener: Key up: ' + event.key);
        if (event.key === "Escape") {
//            console.log('keyboardEventListener: This is Escape');
            if (currentPopup != 0){
//                console.log('keyboardEventListener: currentPopup is:', currentPopup);
                currentPopup.style.display = 'none';
                currentPopup = 0;
                currentPopupID = 0
            }
        }
    }

    /*
        O p e n i n g   P o p u p
    */
    function openPopup(e, popupID) {
//        console.log("openPopup e ",e);
//        console.log("openPopup t ",e.target);
//        console.log("openPopup p ",popupID);
        currentPopupID = popupID;
        currentPopup = $('#'+popupID).get(0);
//        currentPopup = document.getElementById(popupID);
//        currentPopup.style.display = 'block';
        $('#'+popupID).stop(true, false).fadeIn(150,
        function() {
            // Code to execute after fade-in is complete
            // console.log("Fade in complete");
            currentPopupID = 0;
            currentPopup = 0;
        });

        positionPopup(e, currentPopup);
//          console.log("openPopup ",popupID);
//          console.log("positionPopup ",currentPopup.style.left, "  ", currentPopup.style.top,  "  ", currentPopup.offsetHeight);
    }

    /*
        P o s i t i o n i n g
    */
    function positionPopup(e, currentPopup) {
        var bodyRect = document.body.getBoundingClientRect();
        const elemRect = e.target.getBoundingClientRect();
        var popupRect = currentPopup.getBoundingClientRect();
        var offsetY   = elemRect.bottom - bodyRect.top;
//        console.log("positionPopup-elemRect: ",elemRect);
//        console.log("positionPopup ",elemRect.top, "  ", elemRect.bottom, " W = ", elemRect.width, " H = ", elemRect.height);
//        console.log("Popup rect ",popupRect.left, "  ", popupRect.bottom, " W = ", popupRect.width, " H = ", popupRect.height);
        const popupTop = elemRect.top - 10 - popupRect.height;
//        console.log("POPUP TOP = ", popupTop);

        const noShift = false;
        if (noShift) {
            // NO SHIFT
            if(popupTop > 0){
                // placing popup above text
                offsetY = elemRect.top  - bodyRect.top + 10;
                var popupY = popupRect.height ;
                currentPopup.style.top = (offsetY-popupY) + 'px';
            } else {
                // placing popup below text
                currentPopup.style.top = (offsetY+10) + 'px';
            }
        } else {
            // APPLYING SHIFT
            if(popupTop > 0){
                // placing popup above text
//                offsetY = elemRect.top  - bodyRect.top + 1;
                offsetY = elemRect.top  - bodyRect.top - 1 ;
                var popupY = popupRect.height;
                currentPopup.style.top = (offsetY-popupY ) + 'px';
                $('#'+currentPopupID).animate({top: (offsetY-popupY+9) + 'px'});
            } else {
                // placing popup below text
                currentPopup.style.top = (offsetY+15) + 'px';
                $('#'+currentPopupID).animate({top: (offsetY+9) + 'px'});
            }
        }
    }

    /*
    */
    function closePopup(popupID) {
        // console.log("closePopup fading in ",fading in);
        closingPopupID = popupID;

        // currentPopup.style.display = 'none';
        $('#'+closingPopupID).stop(true, false).fadeOut(150,
        function() {
            // Code to execute after fade-out is complete
            // console.log("Fade out complete");
            closingPopupID = 0;
        });
    }

    /*
        Currently not in use
    */
    function jumpToPage(urlArg) {
//        console.log("jumpToPage ", urlArg);
        if (currentPopup != 0){
//            console.log('jumpToPage: currentPopup is:', currentPopup);
            currentPopup.style.display = 'none';
            currentPopup = 0;
        }
        window.open(urlArg, "_blank");
    }

