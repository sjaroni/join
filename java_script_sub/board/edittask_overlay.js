/**
 * Function to open the Edit-Task-Dialog
 */
async function openEditTaskOverlay(element) {
    resetArrays();
    await taskContainerRenderHTML('edit', 'Edit');

    let overlayBg = elementByID("overlay-bg-editTask");

    let overlayContent = elementByID("overlay-content-editTask");
    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");    

    document.getElementById('defaultStyle').disabled = true;
    document.getElementById('smallScreenStyle').disabled = false;    

    document.getElementById('overlay-bg').classList.add('d-none');
    
    overlayBg.classList.remove("d-none");
    document.getElementById('currentTask').innerHTML = element;
}

/**
 * Function to close the Edit-Task-Dialog
 */
function closeEditTaskOverlay() {    
    let overlayBg = elementByID("overlay-bg-editTask");
    let overlayContent = elementByID("overlay-content-editTask");
    overlayBg.classList.remove("d-flex");
    overlayBg.classList.add("d-none");    
    document.getElementById('defaultStyle').disabled = false;
    document.getElementById('smallScreenStyle').disabled = true;
    document.getElementById('taskContainer').innerHTML = '';
}
