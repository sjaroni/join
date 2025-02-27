let showMenu = false;
let guest;
const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');
const login = urlParams.get('login');
let users = [];
let activeUserMail;
let activeUserInitials;
let activeUserName;

const QUICKLINK_LOGIN = {
     quickSummary: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/summary.html?msg=summary&login=true',
     quickAddTask: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/add_task.html?msg=addtask&login=true',
     quickBoard: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/board.html?msg=board&login=true',
     quickContacts: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/contacts.html?msg=contacts&login=true',
     privacy: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/privacy_data_protection.html?msg=privacy&login=true',
     legal: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/legal_notice.html?msg=legal&login=true',
     help: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/help.html?msg=help&login=true'
 }

const QUICKLINK_GUEST = {
     quickSummary: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/summary.html?msg=summary',
    quickAddTask: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/add_task.html?msg=addtask',
     quickBoard: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/board.html?msg=board',
     quickContacts: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/contacts.html?msg=contacts',
     privacy: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/privacy_data_protection.html?msg=privacy',
     legal: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/legal_notice.html?msg=legal',
     help: 'https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/help.html?msg=help'
 }


/**
 * adjusts the backgroundcolor of the quicklinks in the sidebar and makes sure that the
 * initials are carried over to the next page
 */
async function adjustQuicklinkBG(){
    loadFromLocalStorage();
    await loadUsers();
    setActiveUser();
    activeUserInitials = getActiveUserInitials();
    identifyGuest();
    if(msg) {
        identifyQuicklink(msg);
    }
}


/**
 * opens the quicklink to the next page according to the msg parameter
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function identifyQuicklink(msg){
    switch (msg) {
        case 'summary':
            addBgToQuickSummary();
            addBgToQuickSummaryResp();
        break;
    
        case 'addtask':
            addBgToQuickAddTask();
            addBgToQuickAddTaskResp();
        break;

        case 'board':
            addBgToQuickBoard();
            addBgToQuickBoardResp();
        break;

        case 'contacts':
            addBgToQuickContacts();
            addBgToQuickContactsResp();
        break;

        default:
            addBgToQuickSummary();
            addBgToQuickSummaryResp();
        break;
    }
}


/**
 * load email for current active user from local storage
 */
function loadFromLocalStorage(){
    activeUserMail = localStorage.getItem('activeUser');
}


/**
 * load user-data from backend
 */
async function loadUsers(){
    try {
        users = await loadStorageData('/users');
    } catch(e){
        console.error('Loading error:', e);
    }
    detectDarkmode();
}


/**
 * identifies the current active user
 */
async function setActiveUser(){
    let user = users.find(u => u.email == activeUserMail);
    if(user){
        activeUserName = user.name; 
    }
    return activeUserName
}


/**
 * identifies the first letter of both user names to combine them as
 * their initials to be viewed in the profile picture
 * @returns first letter of both user names as capital letters
 */
function getActiveUserInitials() {
    let name = activeUserName
    if(name != 'undefined' &&  name != undefined){
        let words = name.split(' ');
        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();
        let initials = firstInitial + secondInitial;
        return initials;
    }
}


/**
 * identifies the role of the user either a guest, logged in member or entering from a
 * diefferent site
 */
async function identifyGuest(){
    if(msg == 'guest'){
        enteringAsAGuest();
    }else if(login == 'true'){
        enteringAsAUser();
    }
    else if(!msg){
        enteringWithoutLoginOrGuest();
    }
    else{
        continueAsAGuest();
    }
}


/**
 * sets the values according to the guest status after first guest login
 */
function enteringAsAGuest(){
    document.getElementById('headerInitials').textContent = 'G';
    document.getElementById('headerInitialsLogin').classList.add('dNone');
    activeUserInitials = "";
    guest = true;
}


/**
 * sets the values according to the user status
 */
function enteringAsAUser(){
    document.getElementById('headerInitialsLogin').textContent = activeUserInitials;
    document.getElementById('headerInitials').classList.add('dNone');
    guest = false;
}


/**
 * redirects to login page if user try to enter without login or guest login
 */
function enteringWithoutLoginOrGuest(){
    window.open("https://stefan-jaroni.developerakademie.net/join-me/join/index.html", "_self");
}


/**
 * sets the values according to the guest status, when moving from site to site within join
 */
function continueAsAGuest(){
    document.getElementById('headerInitials').textContent = 'G';
    document.getElementById('headerInitialsLogin').classList.add('dNone')
    guest = true;
}


/**
 * shows the the submenu from headers usericon/initials
 */
function showSubmenu(){
    if(showMenu){
        document.getElementById('subMenu').classList.add('dNone');
        document.getElementById('overlay-bg-subMenu').classList.add('dNone');
        showMenu = false;
    }
    else{
        document.getElementById('subMenu').classList.remove('dNone');
        document.getElementById('overlay-bg-subMenu').classList.remove('dNone');
        showMenu = true;
    }
}


/**
 * logs out the user and opens the loginpage
 */
function logOut(){
    localStorage.removeItem('loginData');
    window.open("https://stefan-jaroni.developerakademie.net/join-me/join/index.html", "_self");
}


/** 
 * opens the the next page of Join according to id as a guest or as a logged in user
 * @param {string} id can be "quickSummary", "quickAddTask", "quickBoard", "quickContacts", "privacy", "legal" or "help"
 */
async function openSelectedQuicklink(id){
    if(guest){
        await openGuestQuicklinks(id);
    }
    else{
       await openLoginQuicklinks(id);
    }
}


/**
 * opens the legal notice as a non user/guest
 */
function showLegalExternal(){
    window.open('https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/legal_notice_external.html?msg=legal', '_blank');
}


/**
 * opens the privacy data protection as a non user/guest
 */
function showPrivacyExternal(){
    window.open('https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/privacy_data_protection_external.html?msg=privacy', '_blank');
}


/**
 * opens the the next page of Join according to id as a guest
 * @param {string} id can be "quickSummary", "quickAddTask", "quickBoard", "quickContacts", "privacy", "legal" or "help"
 */
async function openGuestQuicklinks(id){
    let quicklink = QUICKLINK_GUEST[id];
    window.open(quicklink, "_self");
}

 
/**
 * opens the the next page of Join according to id as a logged in member 
 * @param {string} id can be "quickSummary", "quickAddTask", "quickBoard", "quickContacts", "privacy", "legal" or "help"
 *            
 */
async function openLoginQuicklinks(id){ 
    let quicklink = QUICKLINK_LOGIN[id];
    window.open(quicklink, "_self");
}


/**
 * adding dark blue background to quicklink "summary" in desktop view
 */
function addBgToQuickSummary(){
    document.getElementById('quickSummary').classList.add('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.remove('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "add task" in desktop view
 */
function addBgToQuickAddTask(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.add('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.remove('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "board" in desktop view
 */
function addBgToQuickBoard(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.add('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.remove('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "contacts" in desktop view
 */
function addBgToQuickContacts(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.add('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.remove('hoverBG');
}


/**
 * adding dark blue background to quicklink "summary" in mobile view
 */
function addBgToQuickSummaryResp(){
    document.getElementById('respQuickSummary').classList.add('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.remove('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "add task" in mobile view
 */
function addBgToQuickAddTaskResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.add('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.remove('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "board" in mobile view
 */
function addBgToQuickBoardResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.add('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.remove('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}


/**
 * adding dark blue background to quicklink "contacts" in mobile view
 */
function addBgToQuickContactsResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.add('isActiveColor');
    
    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.remove('hoverBG');
}


/**
 * opens board page
 */
function openBoard(){
    window.open("https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/board.html?msg=board", "_self");
}