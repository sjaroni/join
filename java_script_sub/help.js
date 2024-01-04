/**
 * rendering page "help"
 */
async function helpInit(){
    await includeHTML();
    adjustQuicklinkBG();
}

/**
 * opens last visited page
 */
function openLastSite(){
    window.history.back();
}