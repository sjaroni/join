/**
 * This function change the overlay for add contact and go to create contact
 * 
 */
function addContact() {
    openContactOverlay();

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

    overlayTitle.innerHTML = "Add contact";
    createButton.innerHTML = "Create contact <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "Tasks are better with a team!";
    overlayInitials.classList.add('person-bg');
    overlayInitials.src = ('../assets/img/contacts/no_person.png');
    overlayInitials.classList.remove('contact-headline-initials');
    overlayInitials.classList.remove('contact-headline-initials-font');
    overlayName.value = "";
    overlayMail.value = "";
    overlayPhone.value = "";

    if (window.location.href.includes("contacts.html?msg=contacts")) {
        onsubmit.onsubmit = function (event) {
            event.preventDefault();
            if (!validatePhoneNumber(overlayPhone.value, errorMsg)) {
                return;
            }
            createContact();
            return false;
        };
    } else {
        onsubmit.onsubmit = function (event) {
            event.preventDefault();
            if (!validatePhoneNumber(overlayPhone.value, errorMsg)) {
                return;
            }
            createContactLight();
            return false;
        };
    }
}