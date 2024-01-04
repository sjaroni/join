/**
 * Function to open the Task-Dialog
 */
function openTaskOverlay() {
    resetArrays();
    let overlayBg = elementByID("overlay-bg-task");
    let overlayContent = elementByID("overlay-content-task");
    
    overlayContent.classList.remove("slideOut");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");

    overlayContent.classList.add("slide-in");
    overlayContent.style.right = "0";    
    overlayContent.addEventListener("animationend", onAnimationEnd);
    
    function onAnimationEnd() {        
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-none");        
    }    
}

/**
 * Function to close the Task-Dialog
 */
function closeTaskOverlay() {
    let overlayBg = elementByID("overlay-bg-task");
    let overlayContent = elementByID("overlay-content-task");

    overlayContent.classList.add("slideOut");

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-flex");
        overlayBg.classList.add("d-none");
        overlayContent.classList.remove("slideOut");
    }
    updateHTML();
}
