/**
 * rendering page "legal  notice"
 */
async function legalInit(){
    await includeHTML();
    adjustQuicklinkBG();
    detectDarkmode();
}

/**
 * opens last visited page
 */
function openLastSite(){
    window.history.back();
}