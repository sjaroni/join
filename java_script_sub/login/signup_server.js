let isChecked = false;
const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}

let users = [];
let emailAddresses = [];

/**
 * pushes all existing mail addresse from user database into an array 
 */
function searchMailsInJSON() {
    for (let i = 0; i < users.length; i++) {
        const element = users[i];     
        emailAddresses.push(element['email']);
    }
}


/**
 * starts the sign up procedure
 */
async function registerUser(){
    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value.toLowerCase();    
    if(!checkMail(email)){return;}
    let password = document.getElementById('signupPassword').value;
    let confirmation = document.getElementById('signupConfirmation').value;
    if(await checkName()){
        if(password == confirmation){
            pushUser(name, email, password);
            await putStorageData('/users', users);
            await openSignUpOverlay();
            setTimeout(openSuccessfullRegistered, 1500);
        }
        else{
            showMsgBoxInvalidConfirmation();
        }
    };
}


/**
 * checks if the signup name includes exactly two names which starts with a 
 * capital letter
 * @returns true or false 
 */
async function checkName() {
    let nameInput = elementByID("signupName").value;
    let namenParts = nameInput.split(" ");
    if (namenParts.length !== 2) {
        exactlyTwoNames();
        return false;
    }
    for (let i = 0; i <= namenParts.length - 1; i++) {
        if (namenParts[i][0] !== namenParts[i][0].toUpperCase()) {
            capitalLetters()
            return false;
        }
    }
    return true;
}


/**
 * shows error Message with the requirements of the user name
 */
function exactlyTwoNames(){
    document.getElementById('signupMsgBox').classList.remove('dNone');
    document.getElementById('signupMsgBox').innerHTML = /*html*/`
        <span>Please enter exactly two names with a space in between.</span><br>
        <span>The names should start with a capital letter.</span>
    `;  
}


/**
 * shows error Message with the requirements of the user name
 */
function capitalLetters(){
    document.getElementById('signupMsgBox').classList.remove('dNone');
    document.getElementById('signupMsgBox').innerHTML = /*html*/`
        <span>Please enter exactly two names with a space in between.</span><br>
        <span>The names should start with a capital letter.</span>
    `; 
}


/**
 * checks if the email address is already used for another user
 * @param {String} email 
 * @returns true or false
 */
function checkMail(email) {
    searchMailsInJSON();    
    if (emailAddresses.includes(email)) {            
        document.getElementById('signupMsgBox').classList.remove('dNone');
        document.getElementById('signupMsgBox').innerHTML = /*html*/`
            <span>This Email already exists!</span>  
        `;
        return false;
    } 
    return true;
}


/**
 * opens login page after successfully registered
 */
function openSuccessfullRegistered(){
    window.location.href = 'https://stefan-jaroni.developerakademie.net/join-me/join/index.html?msg=userregistered';
}


/**
 * pushs user Data to an array and saves it to local storage
 * @param {String} email of the logged in user
 * @param {String} password of the logged in user
 * @param {String} name of the logged in user
 */
async function pushUser(name, email, password){
    users.push({
        name: name,
        email: email,
        password: password,
    });
}


/**
 * loads all users from backend
 */
async function loadUsers(){
    try {        
        users = await loadStorageData('/users');
    } catch(e){
        console.error('Loading error:', e);
    }
}


/**
 * shows an error message if the confirmation of the password is wrong
 */
function showMsgBoxInvalidConfirmation(){
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderBlack')
    document.getElementById('decoSignupConfirmation').classList.add('changeBorderRed')
    document.getElementById('signupMsgBox').classList.remove('dNone');
    document.getElementById('signupMsgBox').innerHTML = /*html*/`
        <span>Ups! your password don´t match.</span>  
    `;
}


/**
 * checks if the checkbox of "remember me" is checked or unchecked
 */
function changeCheckbox(){
    if(isChecked){
        signupCheckboxOff()
    }
    else{
        signupCheckboxOn()
    }
}


/**
 * changes the status of the checkbox to unchecked
 */
function signupCheckboxOff(){
    document.getElementById('signupCheckboxUnchecked').classList.remove('dNone');
    document.getElementById('signupCheckboxChecked').classList.add('dNone');
    document.getElementById('signupFakeSubmit').classList.remove('dNone');
    document.getElementById('signupSubmit').classList.add('dNone');
    isChecked = false;
}


/**
 * changes the status of the checkbox to checked
 */
function signupCheckboxOn(){
    document.getElementById('signupCheckboxUnchecked').classList.add('dNone');
    document.getElementById('signupCheckboxChecked').classList.remove('dNone');
    document.getElementById('signupFakeSubmit').classList.add('dNone');
    document.getElementById('signupSubmit').classList.remove('dNone');
    isChecked = true;
}


/**
 * identifies which inputfield is pressed and is going to be changed
 * to either blue or black borders
 * @param {String} id can be "signupName", "signupEmail", "signupPassword" or "signupConfirmation"
 */
function changeBorderOnFocus(id){
    let identifiers = ['signupName', 'signupEmail', 'signupPassword', 'signupConfirmation'];
    let decorations = ['decoSignupName', 'decoSignupEmail', 'decoSignupPassword', 'decoSignupConfirmation'];
    document.getElementById('signupMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            signupChangeBorderToBlue(decorations, index)
        }
        else{
            signupChangeBorderToStandard(decorations, index)
        } 
    }
}


/**
 * changes the bordercolor of the clicked inputfield to blue
 * @param {array} decorations can be either "decoLoginName" or "decoLoginPassword" depending on index
 * @param {number} index either 0 or 1 and determines the value of the array
 */
function signupChangeBorderToBlue(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderRed')
    showLock();
}


/**
 * changes the bordercolor of the clicked inputfield to black
 * @param {array} decorations can be either "decoLoginName" or "decoLoginPassword" depending on index
 * @param {number} index either 0 or 1 and determines the value of the array
 */
function signupChangeBorderToStandard(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderRed')
    showLock();
}


/**
 * shows the locksymbol of the inputfield "password"
 */
function showLock(){
    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('signupPassword').type = 'password';

    document.getElementById('confirmationLock').classList.remove('dNone');
    document.getElementById('confirmationVisibilityOff').classList.add('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
    document.getElementById('signupConfirmation').type = 'password';
}


/**
 * controls the visisbility of the inputfield "password"
 * @param {string} id can be "passwordLock" "passwordVisibilityOff" or "passwordVisibility"
 */
function passwordVisibilityLock(id){
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                singupRevealPassword();
            }
            else if(index == 1){
                singupRevealPassword();
            }else{
                signupCoverPassword();
            }
        }
    }
}


/**
 * reveals the password at the signup page
 */
function singupRevealPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');  
    document.getElementById('signupPassword').type = 'text';
}


/**
 * covers the password at the signup page
 */
function signupCoverPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('signupPassword').type = 'password';
}


/**
 * controls the visisbility of the inputfield "confirmation"
 * @param {string} id can be "confirmationLock" "confirmationVisibilityOff" or "confirmationVisibility"
 */
function confirmationVisibilityLock(id){
    let identifiers = ['confirmationLock', 'confirmationVisibilityOff', 'confirmationVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                signupRevealConfirmation();
            }
            else if(index == 1){
                signupRevealConfirmation();
            }else{
                signupCoverConfirmation();
            }
        }
    }
}


/**
 * reveals the confirmation of the password at the signup page
 */
function signupRevealConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.add('dNone');
    document.getElementById('confirmationVisibility').classList.remove('dNone');
    document.getElementById('signupConfirmation').type = 'text';
}


/**
 * covers the confirmation of the password at the signup page
 */
function signupCoverConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.remove('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
    document.getElementById('signupConfirmation').type = 'password';
}


/**
 * opens the login page
 */
function openLogin(){
    window.location.href = 'https://stefan-jaroni.developerakademie.net/join-me/join/index.html';
}


/**
 * opens the privacy data protection as a non user/guest
 */
function openPrivacy(){
    window.open('https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/privacy_data_protection_external.html', '_blank');
}


/**
 * opens the legal notice as a non user/guest
 */
function openLegal(){
    window.open('https://stefan-jaroni.developerakademie.net/join-me/join/html-sub/legal_notice_external.html', '_blank');
}


async function openSignUpOverlay() {
    //added following 2 lines
    let signup = elementByID("screen");
    let legal = elementByID("signupLegalPrivacy");
    
    let overlayBg = elementByID("overlay-bg-signup");
    let overlayContent = elementByID("overlay-content-signup");
    
    //added following 2 lines
    legal.classList.add("dNone");
    signup.classList.add("dNone");
    

    overlayContent.classList.remove("slideOut");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("dNone");

    overlayContent.classList.add("slide-in");
    overlayContent.style.right = "0";

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("dNone");        
    }  
}