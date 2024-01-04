let isChecked = false;
let users = [];
let activeUser;
let activeUserName;
let deviceWidth;
let animationStarted = false;
let loginData = [];


/**
 * rendering the login page
 */
async function renderIndex() {
    await includeHTML();
    await loadUsers();
    await loadStartScreen();
    await loadData();
    detectDarkmode();
}


/**
 * checks if the checkbox for accepted privacy policy is checked or unchecked
 */
function changeCheckbox() {
    if (isChecked) {
        loginCheckboxOff();
    }
    else {
        loginCheckboxOn();
    }
}


/**
 * changes the status of the checkbox to unchecked
 */
function loginCheckboxOff() {
    document.getElementById('loginCheckboxUnchecked').classList.remove('dNone');
    document.getElementById('loginCheckboxChecked').classList.add('dNone');
    isChecked = false;
}


/**
 * changes the status of the checkbox to checked
 */
function loginCheckboxOn() {
    document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
    document.getElementById('loginCheckboxChecked').classList.remove('dNone');
    isChecked = true;
}


/**
 * starts the log in procedure
 */
async function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    checkRememberMe(email, password);
    await loadUsers();
    let user = users.find(u => u.email == email && u.password == password);
    if (user) {
        activeUser = user.email;
        pushLoginData(email, password, user.name);
        await saveUserToLocalStorage('activeUser', activeUser);
        window.location.href = URL + `/html-sub/summary.html?msg=login&login=true`;
    }
    else {
        showMsgBoxInvalidPassword();
    };
}


/**
 * saves active user mail to local storage and adds the mail to contacts list
 * @param {String} key that identifies the value in the local storage "active user"
 * @param {String} value that will be loaded when loaded with the according key "activeuser mail"
 */
async function saveUserToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    await addActiveUserToContacts();
}


/**
 * saves login data to local storage
 * @param {String} key that identifies the value in the local storage "loginData"
 * @param {JSON} value that will be loaded when loaded with the according key "JSON with name mail and password"
 */
function saveLoginDataToLocalStorage(key, value) {
    let valueAsText = JSON.stringify(value)
    localStorage.setItem(key, valueAsText);
}


/**
 * saves the login Data if the remember me checkbox is checked
 * @param {string} email email of the logged in user
 * @param {string} password password of logged in user
 */
function checkRememberMe(email, password) {
    if (isChecked) {
        pushLoginData(email, password)
    }
}


/**
 * pushs login Data to an array and saves it to local storage
 * @param {String} email of the logged in user
 * @param {String} password of the logged in user
 * @param {String} name of the logged in user
 */
function pushLoginData(email, password, name) {
    loginData = [];
    loginData.push({
        email: email,
        password: password,
        name: name
    })
    saveLoginDataToLocalStorage('loginData', loginData);
}


/**
 * loads all users from backend
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * shows an error message if the password is wrong
 */
function showMsgBoxInvalidPassword() {
    document.getElementById('decoLoginPassword').classList.remove('changeBorderBlack')
    document.getElementById('decoLoginPassword').classList.add('changeBorderRed')
    document.getElementById('LoginMsgBox').classList.remove('dNone');
    document.getElementById('LoginMsgBox').innerHTML = /*html*/`
        <span>Wrong passsword Ups! Try again.</span>  
    `;
}


/**
 * identifies which inputfield is pressed and is going to be changed
 * to either blue or black borders
 * @param {String} id can be "loginEmail" or "loginPassword"
 */
function changeBorderOnFocus(id) {
    let identifiers = ['loginEmail', 'loginPassword'];
    let decorations = ['decoLoginName', 'decoLoginPassword'];
    document.getElementById('LoginMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if (idName == id) {
            changeBorderToBlue(decorations, index);
        }
        else {
            changeBorderToStandard(decorations, index);
        }
    }
}


/**
 * changes the bordercolor of the clicked inputfield to blue
 * @param {array} decorations can be either "decoLoginName" or "decoLoginPassword" depending on index
 * @param {number} index either 0 or 1 and determines the value of the array
 */
function changeBorderToBlue(decorations, index) {
    document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


/**
 * changes the bordercolor of the clicked inputfield to black
 * @param {array} decorations can be either "decoLoginName" or "decoLoginPassword" depending on index
 * @param {number} index either 0 or 1 and determines the value of the array
 */
function changeBorderToStandard(decorations, index) {
    document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


/**
 * shows the locksymbol of the inputfield "password"
 */
function showLockSymbol() {
    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';

    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';
}


/**
 * controls the visisbility of the inputfield "password"
 * @param {string} id can be "passwordLock" "passwordVisibilityOff" or "passwordVisibility"
 */
function passwordVisibilityLock(id) {
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if (idName == id) {
            if (index == 0) {
                revealPassword();
            }
            else if (index == 1) {
                revealPassword();
            } else {
                coverPassword();
            }
        }
    }
}


/**
 * covers the password at the login page
 */
function coverPassword() {
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';
}


/**
 * reveals the password at the login page
 */
function revealPassword() {
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');
    document.getElementById('loginPassword').type = 'text';
}


/**
 * opens the app as a guest
 */
function guestLogin() {
    localStorage.removeItem('activeUser');
    window.location.href = URL + '/html-sub/summary.html?msg=guest';
}


/**
 * opens the signup page
 */
function openSignUp() {
    window.location.href = URL + '/html-sub/sign_up.html';
}


/**
 * starts the animation of the join logo
 */
async function loadStartScreen() {
    await setDesktopScreen();
    loadFromLocalStorage();
}


/**
 * controls the animation of the join logo
 */
async function setDesktopScreen() {
    animateLogo();
    document.getElementById('indexContent').classList.remove('dNone');
    setTimeout(() => {
        document.getElementById('startScreen').classList.add('elementToFadeInAndOut');
    }, 1000);

}


/**
 * animates the join logo before showing login page
 */
function animateLogo() {
    if (!animationStarted) {
        animationStarted = true;
        let logo = document.getElementById("startLogo");
        logo.style.animationPlayState = "running";
    }
}


/**
 * opens the legal notice as a non user/guest
 */
function openLegal() {
    window.open(URL + '/html-sub/legal_notice_external.html?msg=legal', '_blank');
}


/**
 * opens the privacy data protection as a non user/guest
 */
function openPrivacy() {
    window.open(URL + '/html-sub/privacy_data_protection_external.html?msg=privacy', '_blank');
}


/**
 * loads loginData from local storage and proceeds to login-function
 */
async function loadFromLocalStorage() {
    let loginDataAsText = localStorage.getItem('loginData');
    if (loginDataAsText) {
        loginData = JSON.parse(loginDataAsText);
        document.getElementById('loginEmail').value = loginData[0].email;
        document.getElementById('loginPassword').value = loginData[0].password;
        document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
        document.getElementById('loginCheckboxChecked').classList.remove('dNone');
        login();
    }
}