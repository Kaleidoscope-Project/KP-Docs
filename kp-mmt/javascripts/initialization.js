    //   ===========================
    //   I n i t i a l i z a t i o n
    //   ===========================

    let popupInitialized = false;

    const element01 = "element01ToHover";
    const element02 = "element02ToHover";

    //
    //   This function add window listener, but is not in user at this point
    //
    function init(){
        console.log("INITIALIZED");
        settingPopupListeners(element01);
        settingPopupListeners(element02);

        console.log("ALL POPUP HOVER LISTENERS ARE SET");
//        setTimeout(function () {
//                gofish('projectile');
//            }, 500);
    }

    //   ===========================
    //     Setting popup listeners   https://stackoverflow.com/questions/22728013/pass-css-id-as-a-parameter-in-javascript-function

    https://stackoverflow.com/questions/60781547/how-to-add-hover-effect-upon-mouseover-to-all-divs-on-a-page
    //   ===========================
    var textToHover;
    /*
        Function responds on Scroll Bar clicked event
    */
    var settingPopupListeners = function(elementToHover){
//        alert(elementToHover);
//        alert(document.getElementById(elementToHover));

         textToHover = document.getElementById(elementToHover);
        start_x = textToHover.offsetLeft;
        start_y = textToHover.offsetTop;
        console.log("Element \"" + elementToHover +"\" location: x = "+start_x+", y = "+start_y);
        popupInitialized = true;

//        const elementToHover = document.
//            getElementById('elementToHover');


        textToHover.addEventListener('mouseenter',
            () => {
            const elementToPopup = document.
                        getElementById('elementToPopup');
                elementToPopup.style.display = 'block';
            });

        textToHover.addEventListener('mouseleave',
            () => {
            const elementToPopup = document.
                        getElementById('elementToPopup');
                elementToPopup.style.display = 'none';
            });
    }