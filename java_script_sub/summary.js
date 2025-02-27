let amountTodos;
let amountDone;
let amountUrgent;
let amountInBoard;
let amountInProgress;
let amountAwaitingFeedback;
let todos = [];
let urgentDueDates = [];
let urgentDueDate;
let currentGreeting;
let deviceWidth;
let currentUser;
let user;
let greeting = false;


/**
 * Function is called to decide how the summary is rendered. Possibilities are desktop or mobile view where each can be rendered 
 * as a guest or logged in member.
 */
async function renderSummary() {
    getDeviceWidth();
    if (deviceWidth <= 910) {
        await getLoginType();
        if (login) {
            renderMobileLoginView();
        }
        else {
            renderMobileGuestView();
        }
    } else {
        renderDesktopContent();
    }
}


/**
 * renders mobile view as a logged in member
 */
function renderMobileLoginView() {
    getCurrentGreeting();
    greetingUser1();
    setTimeout(greetingUser2, 2000);
    setTimeout(renderMobileContent, 4000);
}


/**
 * renders mobile view as guest
 */
function renderMobileGuestView() {
    getCurrentGreeting();
    greetingGuest();
    setTimeout(renderMobileContent, 2000);
}


/**
 * Function is called to render the content of summary in mobile view
 */
async function renderMobileContent() {
    includeHTML();
    await loadTodos();
    getCurrentGreeting();
    await getLoginType();
    getAmountInBoard();
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback();
    getDueDate();
    await getInitialHTMLTemplate();
    getHTMLTemplateforSummary();
    adjustQuicklinkBG();
}


/**
 * Function is called to render the content of summary in desktop view
 */
async function renderDesktopContent() {
    includeHTML();
    await loadTodos();
    getCurrentGreeting();
    await getLoginType();
    getAmountInBoard();
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback();
    getDueDate();
    getHTMLTemplateforSummary();
    adjustQuicklinkBG();
}


/**
 * Function is loading the mail from activeUser from local storage
 */
function loadFromLocalStorage() {
    activeUserMail = localStorage.getItem('activeUser');    
}


/**
 * Function identifies if  user is logged in an sets the activeUserName
 * to the according value
 */
async function getLoginType() {
    if (login) {
        await loadUsers();
        loadFromLocalStorage();
        activeUserName = await setActiveUser();
    }
    else {
        activeUserName = "undefined";
    }
}


/**
 * identifies the current greeting-string depending on the current time
 */
function getCurrentGreeting() {
    let hours = new Date().getHours();
    if (hours >= 18 && hours <= 5) {
        currentGreeting = 'Good evening!';
    }
    else if (hours >= 6 && hours <= 11) {
        currentGreeting = 'Good morning!';
    }
    else {
        currentGreeting = 'Good afternoon!';
    }
}


/**
 * rendering the greeting according to the current time
 */
async function greetingGuest() {
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
    `
}


/**
 * rendering the greeting according to the current time
 */
async function greetingUser1() {
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
    `
}


/**
 * rendering the name to be greeted after the greeting span
 */
async function greetingUser2() {
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanName">${activeUserName}</span>
    `
}


/**
 * loads all toDos from board
 */
async function loadTodos() {
    try {
        todos = await loadStorageData('/tasks');
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * loads all todos from board into a variable
 */
function getAmountInBoard() {
    amountInBoard = todos.length;
}


/**
 * determines the amount of all todos from board
 */
function getAmountTodos() {
    amountTodos = 0;
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].status == 'todo') {
            amountTodos++
        }
    }
}


/**
 * determines the amount with the status "done" from all todos
 */
function getAmountDone() {
    amountDone = 0
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].status == 'done') {
            amountDone++
        }
    }
}


/**
 * determines the amount with the status "urgent" from all todos
 */
function getAmountUrgent() {
    amountUrgent = 0
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].prio == 'Urgent') {
            amountUrgent++
            let dateInSeconds = todos[index].duedate;
            urgentDueDates.push(dateInSeconds);
        }
    }
}


/**
 * identifies the nearest Date of all tasks with the  status "urgent"
 * from board and formates it to the needed date format or formates
 * the date which is given via the parameter "date"
 * @param {number} date date as number
 * @returns returns date in form of day/month/year
 */
function getDueDate(date) {
    let nearestDate = Math.min.apply(Math, urgentDueDates)
    let dueDate;
    if (date) {dueDate = new Date(date);}
    else {dueDate = new Date(nearestDate);}
    let currentday = String(dueDate.getDate()).padStart(2, '0');
    let currentMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
    let currentYear = String(dueDate.getFullYear());
    let formattedDate = `${currentday}/${currentMonth}/${currentYear}`;
    if (urgentDueDates.length > 0) {
        let urgentDate = `${currentday}-${currentMonth}-${currentYear}`;
        urgentDueDate = urgentDate;
    }
    else {urgentDueDate = 'No';}
    return formattedDate;
}


/**
 * determines the amount with the status "in progress" from all todos
 */
function getAmountInProgress() {
    amountInProgress = 0
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].status == 'inProgress') {
            amountInProgress++
        }
    }
}


/**
 * determines the amount with the status "awaiting feedback" from all todos
 */
function getAmountAwaitingFeedback() {
    amountAwaitingFeedback = 0
    for (let index = 0; index < todos.length; index++) {
        if (todos[index].status == 'awaitFeedback') {
            amountAwaitingFeedback++
        }
    }
}


/**
 * determines the current width of the device
 */
function getDeviceWidth() {
    deviceWidth = window.innerWidth;
}