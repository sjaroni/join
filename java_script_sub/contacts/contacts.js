/**
 * Init-function onload
 */
async function contactsInit() {
    includeHTML();
    await loadData();
    getCategoryLetter();
    createRegisterEntry();
    loginIsYourContact();
    adjustQuicklinkBG();
    detectDarkmode();
}