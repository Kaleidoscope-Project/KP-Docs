

    function removeHashTag() {
        const currentURL = window.location.href;
        const newURL = currentURL.substring(0, currentURL.indexOf('#')); // Or use split('#')[0]
        history.replaceState(null, '', newURL);
    }
