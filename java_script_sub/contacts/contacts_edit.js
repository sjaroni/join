/**
 * This function changes the overlay for edit contact and show the contact informations
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
async function editContact(ID) {
    openContactOverlay();
    let pos = getIndexOfJson('ID', ID);

    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];

    let overlayTitle = elementByID("overlay_title");
    let overlayTitleSub = elementByID("overlay_title_sub");
    let overlayInitials = elementByID("overlay_initials");
    let createButton = elementByID("create_btn");
    let onsubmit = elementByID("onsubmit");
    let overlayName = elementByID("contact_name");
    let overlayMail = elementByID("contact_mail");
    let overlayPhone = elementByID("contact_phone");
    let errorMsg = elementByID("errorMsg");

    overlayPhone.oninput = function () {
        validatePhoneNumberInput(this, errorMsg);
    };

    overlayTitle.innerHTML = "Edit contact";

    createButton.innerHTML = "Save <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "";
    overlayInitials.classList.remove('person-bg');
    overlayInitials.classList.add('contact-headline-initials');
    overlayInitials.classList.add('contact-headline-initials-font');
    overlayInitials.classList.add('person-bg');
    overlayInitials.innerHTML = initials;
    overlayInitials.style = `background-color: ${color}`;

    overlayName.value = name;
    overlayMail.value = mail;
    overlayPhone.value = phone;

    onsubmit.onsubmit = null;

    onsubmit.onsubmit = function (event) {
        event.preventDefault();
        if (!validatePhoneNumber(overlayPhone.value, errorMsg)) {
            return;
        }
        changeContactData(pos, ID);
    };
}

/**
 * This function set and check the validate for the phone number input
 * 
 * @param {string} inputElement - the input element
 * @param {string} errorMsgElement - the warn message element
 */
function validatePhoneNumberInput(inputElement, errorMsgElement) {
    inputElement.value = inputElement.value.replace(/\D/g, "");

    if (inputElement.value.length < 7) {
        errorMsgElement.innerHTML = "The phone number must have at least 7 numbers";
    } else {
        errorMsgElement.innerHTML = "";
    }
}

/**
 * This function check the validate for the phone number
 * 
 * @param {number} phoneNumber - the phone number from phone input
 * @param {string} errorMsgElement - the warn message element
 * @returns 
 */
function validatePhoneNumber(phoneNumber, errorMsgElement) {
    if (phoneNumber.length < 7) {
        errorMsgElement.innerHTML = "The phone number must have at least 7 numbers";
        return false;
    }
    errorMsgElement.innerHTML = "";
    return true;
}

/**
 * This function will change und save the contact in JSON structure
 * 
 * @param {number} pos - This is the index of the contact
 * @param {number} ID - This is the ID from the specific contact
 * @returns - nothing
 */
async function changeContactData(pos, ID) {
    let nameIsValid = checkName();
    let mailIsValid = checkMail(ID);
    if (!nameIsValid || !mailIsValid) {
        return;
    }
    pos['contact_name'] = contact_name.value;
    pos['contact_mail'] = contact_mail.value;
    pos['contact_phone'] = contact_phone.value;
    pos['contact_initials'] = getContactFirstLetters();

    await saveData();
    await loadData();
    createRegisterEntry();
    showContact(ID);
    emailAddresses = [];
    closeContactOverlay();
    smallAnimatedLabel("Contact succesfully edited");
}
