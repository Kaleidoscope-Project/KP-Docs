    //   ===========================
    //   I n i t i a l i z a t i o n
    //   ===========================

        allPopupsInitialized = false;

//        const element01 = "element01ToHover";
        const popup01 = "element01ToPopup";

//        const element02 = "element02ToHover";
        const popup02 = "element02ToPopup";

//        const element03 = "element03ToHover";
        const popup03 = "element03ToPopup";

//        const element04 = "element04ToHover";
        const popup04 = "element04ToPopup";

//        const element05 = "element05ToHover";
        const popup05 = "element05ToPopup";

//        const element06 = "element06ToHover";
        const popup06 = "element06ToPopup";

        var currentElement = null;
        var currentPopupID = 0;
        var currentPopup = 0;
        const urlArg = "../kp-qds/kp-qds.html";

    //
    //   This function add window listener, but is not in user at this point
    //
//    https://stackoverflow.com/questions/32294568/is-it-possible-to-detect-a-mouse-click-on-a-page-on-every-element
//    How to detect mouse click in HTML
    function init(){
        console.log("INITIALIZING");
        document.addEventListener('keyup', keyboardEventListener);
//        window.addEventListener('scroll', function() {
//        if(currentElement != null){
//         const localRect = currentElement.getBoundingClientRect();
//         console.log("text position T = ",localRect.top, " L = ", localRect.left, " B = ", localRect.bottom, " W = ", localRect.width, " H = ", localRect.height);
//         console.log("");
//         }
//        });
//        $('a').click(function(){
//            $(this).addClass("visited");
//        });
//        settingPopupListeners(element01, popup01);
//        settingPopupListeners(element02, popup01);
//        settingPopupListeners(element03, popup01);
//        settingPopupListeners(element04, popup01);
//        settingPopupListeners(element05, popup05);
//        settingPopupListeners(element06, popup06);

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
//        console.log("Listener set to "+element01);
//        console.log("Listener set to "+element02);
        console.log("ALL POPUP HOVER LISTENERS ARE SET");
//        setTimeout(function () {
//                gofish('projectile');
//            }, 500);
//        document.addEventListener('keydown', function(event) {
//            console.log('Key pressed: ' + event.key);
//        });

    }

    function keyboardEventListener(event) {
        console.log('keyboardEventListener:' );
        console.log('keyboardEventListener: Key up: ' + event.key);
        if (event.key === "Escape") {
            console.log('keyboardEventListener: This is Escape');
            if (currentPopup != 0){
                console.log('keyboardEventListener: currentPopup is:', currentPopup);
                currentPopup.style.display = 'none';
                currentPopup = 0;
                currentPopupID = 0
            }
        }
    }



    //   ===========================
    //     Setting popup listeners   https://stackoverflow.com/questions/22728013/pass-css-id-as-a-parameter-in-javascript-function

//    https://stackoverflow.com/questions/60781547/how-to-add-hover-effect-upon-mouseover-to-all-divs-on-a-page
    //   ===========================
    var textToHover;

    /*
        Function responds on Scroll Bar clicked event
    */
    var settingPopupListeners = function(elementToHover, popupToOpenOrClose){
        textToHover = document.getElementById(elementToHover);
         console.log("settingPopup1Listeners: Element ", elementToHover, "  ",textToHover  );
          start_x = textToHover.offsetLeft;
          start_y = textToHover.offsetTop;
        console.log("settingPopup1Listeners: Element \"" + elementToHover +"\" location: x = "+start_x+", y = "+start_y);

        console.log("settingPopup1Listeners"+"   "+elementToHover+"   "+popupToOpenOrClose);
        console.log("text holder = ",textToHover);

        textToHover.addEventListener('mouseenter',
            () => {
                console.log('mouse enter'+"   "+elementToHover, popupToOpenOrClose);
                const textToHover = document.getElementById(elementToHover);
                const textX = textToHover.offsetLeft;
                const textY = textToHover.offsetTop;
                console.log("textHoverListener Element \"" + textToHover +"\" location: x = "+textX+", y = "+textY);
//                var w = window.innerWidth;
//                var h = window.innerHeight;
//                console.log('size: ',w, "   ", h);


//    var bodyRect = document.body.getBoundingClientRect(),
//        elemRect = textToHover.getBoundingClientRect(),
//        offset   = elemRect.top - bodyRect.top;
//        console.log('mouse enter'+"   "+'Element is ' + offset + ' vertical pixels from <body>');
//    //alert('Element is ' + offset + ' vertical pixels from <body>');
//    console.log('body rect: ','left is ', bodyRect.left, '  top = ',bodyRect.top, 'right = ', bodyRect.right, '  bottom = ',bodyRect.bottom);
//    bodyRect
//     const rect = textToHover.getBoundingClientRect();
//        var left = rect.left;
//        var top = rect.top ;
//        var right = rect.right;
//      var  bottom = rect.bottom ;
//    console.log('text rect: ','left is ', left, '  top = ',top, 'right = ', right, '  bottom = ',bottom);


                const elementToPopup = document.getElementById(popupToOpenOrClose);
//                 elementToPopup.style.left = left+'pt';
//                  elementToPopup.style.top = (bottom+30)+'pt';
//                   elementToPopup.offsetTop = 30;
                elementToPopup.style.display = 'block';
        });

        textToHover.addEventListener('mouseleave',
            () => {
                console.log('mouse leave'+"   "+elementToHover, popupToOpenOrClose);
                const elementToPopup = document.getElementById(popupToOpenOrClose);
                elementToPopup.style.display = 'none';
        });
    }

function openPopup2(e, popupID) {
    console.log("openPopup2 e ",e);
    console.log("openPopup2 t ",e.target);
    console.log("openPopup2 p ",popupID);
    openPopup(e, popupID);
}
    function openPopup(e, popupID) {
        if (currentPopupID != 0){
            return;
        }
    //    document.getElementById('overlay').style.display = 'block';

        currentPopupID = popupID;
        currentPopup = document.getElementById(popupID);



//        console.log('openPopup: currentPopup is:', currentPopup);
        currentPopup.style.display = 'block';
        positionPopup(e, currentPopup);
//        console.log("openPopup ",popupID);
console.log("positionPopup ",currentPopup.style.left, "  ", currentPopup.style.top,  "  ", currentPopup.offsetHeight);
    }

    var elem ;
    var elemRect;

//    var bodyRect = document.body.getBoundingClientRect();
    function positionPopup(e, currentPopup) {
        var bodyRect = document.body.getBoundingClientRect();
        currentElement = e.target;
        const elemRect = e.target.getBoundingClientRect();
        var popupRect = currentPopup.getBoundingClientRect();
        offsetY   = elemRect.bottom - bodyRect.top;
        offsetX   = elemRect.left/2 - bodyRect.left/2;

//        offsetX   = elemRect.left - bodyRect.left;
//        offsetY   = elemRect.bottom + 130;
console.log("positionPopup-elemRect: ",elemRect);
        console.log("positionPopup ",elemRect.top, "  ", elemRect.bottom, " W = ", elemRect.width, " H = ", elemRect.height);
        console.log("Popup rect ",popupRect.left, "  ", popupRect.bottom, " W = ", popupRect.width, " H = ", popupRect.height);
//                currentPopup.style.left = bodyRect.width/2 - (bodyRect.width - popupRect.width)/2 + 'px';
//               currentPopup.style.left = document.body.offsetLeft + (bodyRect.width -  popupRect.width)/  + 'px';
//                currentPopup.style.left = (e.clientX + offsetX) + 'px';
        const popupTop = elemRect.top - 10 - popupRect.height;
        console.log("POPUP TOP = ", popupTop);
        if(popupTop > 0){
            offsetY = elemRect.top  - bodyRect.top + 10;
            var popupY = popupRect.height ;
            currentPopup.style.top = (offsetY-popupY) + 'px';
        }else{
            currentPopup.style.top = (offsetY+10) + 'px';
        }
//        currentPopup.style.left = ( 200) + 'px';
//        currentPopup.style.top = 299 + 'px';

    }

    function findPopupLocation(e, currentPopup){
    const placePopupAboveText = false;
    }


//(elemRect.left+elemRect.width/2) + 'px';
     function positionPopupThisFunctionWorks(e, currentPopup) {
            var bodyRect = document.body.getBoundingClientRect();
            var elemRect = e.target.getBoundingClientRect();
            offsetY   = elemRect.bottom - bodyRect.top;
            offsetX   = elemRect.left - bodyRect.left;

            offsetX   = elemRect.left - bodyRect.left;
            offsetY   = elemRect.bottom + 130;

            console.log("positionPopup ",elemRect.left, "  ", elemRect.bottom);
            //        currentPopup.style.left = (e.clientX + offsetX) + 'px';
            //        currentPopup.style.top = offsetY + 'px';
            currentPopup.style.left = ( offsetX) + 'px';
            currentPopup.style.top = offsetY + 'px';

        }

    function closePopup() {
//        console.log("closePopup ",currentPopupID);
                if (currentPopupID == 0){
                    return;
                }
    //    document.getElementById('overlay').style.display = 'none';

        currentPopup.style.display = 'none';
        currentPopupID = 0;
        currentPopup = 0;
    }

    function jumpToPage(urlArg) {
    //urlArg = "../"+urlArg1+"/"+urlArg2;
        console.log("jumpToPage ", urlArg);
    //    document.getElementById('overlay').style.display = 'none';
    //    document.getElementById(popupID).style.display = 'none';
    //location.replace(urlArg, "_blank");
    if (currentPopup != 0){
                  console.log('jumpToPage: currentPopup is:', currentPopup);
                    currentPopup.style.display = 'none';
                    currentPopup = 0;
                  }
                window.open(urlArg, "_blank");

    }

