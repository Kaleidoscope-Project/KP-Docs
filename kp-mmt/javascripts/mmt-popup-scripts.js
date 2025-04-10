//   ===========================
//   I n i t i a l i z a t i o n
//   ===========================

    allPopupsInitialized = false;

    const popup01 = "element01ToPopup";
    const popup02 = "element02ToPopup";
    const popup03 = "element03ToPopup";
    const popup04 = "element04ToPopup";
    const popup05 = "element05ToPopup";
    const popup06 = "element06ToPopup";

    var currentElement = null;
    var currentPopupID = 0;
    var currentPopup = 0;
    const urlArg = "../kp-qds/kp-qds.html";

    //
    //   Initializer for MMT page
    //
    function initMMTPage(){
//        console.log("initMMTPage: INITIALIZING");
        document.addEventListener('keyup', keyboardEventListener);

        currentPopup = document.getElementById(popup01);
        currentPopup.style.display = 'none';
        currentPopup = document.getElementById(popup02);
        currentPopup.style.display = 'none';
        currentPopup = document.getElementById(popup03);
        currentPopup.style.display = 'none';
        currentPopup = document.getElementById(popup04);
        currentPopup.style.display = 'none';
        currentPopup = document.getElementById(popup05);
        currentPopup.style.display = 'none';
        currentPopup = document.getElementById(popup06);
        currentPopup.style.display = 'none';

        allPopupsInitialized = true;
//        console.log("ALL POPUP HOVER LISTENERS ARE SET");
    }

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

    function openPopup(e, popupID) {
//        console.log("openPopup e ",e);
//        console.log("openPopup t ",e.target);
//        console.log("openPopup p ",popupID);
        if (currentPopupID != 0){
            return;
        }
        currentPopupID = popupID;
        currentPopup = document.getElementById(popupID);
        currentPopup.style.display = 'block';
        positionPopup(e, currentPopup);
        //        console.log("openPopup ",popupID);
//            console.log("positionPopup ",currentPopup.style.left, "  ", currentPopup.style.top,  "  ", currentPopup.offsetHeight);
        }

    function positionPopup(e, currentPopup) {
        var bodyRect = document.body.getBoundingClientRect();
        currentElement = e.target;
        const elemRect = e.target.getBoundingClientRect();
        var popupRect = currentPopup.getBoundingClientRect();
        var offsetY   = elemRect.bottom - bodyRect.top;
        var offsetX   = elemRect.left/2 - bodyRect.left/2;

//        console.log("positionPopup-elemRect: ",elemRect);
//        console.log("positionPopup ",elemRect.top, "  ", elemRect.bottom, " W = ", elemRect.width, " H = ", elemRect.height);
//        console.log("Popup rect ",popupRect.left, "  ", popupRect.bottom, " W = ", popupRect.width, " H = ", popupRect.height);
        const popupTop = elemRect.top - 10 - popupRect.height;
//        console.log("POPUP TOP = ", popupTop);
        if(popupTop > 0){
            offsetY = elemRect.top  - bodyRect.top + 10;
            var popupY = popupRect.height ;
            currentPopup.style.top = (offsetY-popupY) + 'px';
        }else{
            currentPopup.style.top = (offsetY+10) + 'px';
        }
    }

    function closePopup() {
        if (currentPopupID == 0){
            return;
        }
        currentPopup.style.display = 'none';
        currentPopupID = 0;
        currentPopup = 0;
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

