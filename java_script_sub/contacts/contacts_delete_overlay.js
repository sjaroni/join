/**
 * This function change the overlay for delete a contact and show the contact informations
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
async function deleteContactOverlay(ID) {
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

    overlayTitle.innerHTML = "Delete contact";

    createButton.innerHTML = "Delete <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "Are you sure to delete?";
    overlayInitials.classList.remove('person-bg');
    overlayInitials.classList.add('contact-headline-initials');
    overlayInitials.classList.add('contact-headline-initials-font');
    overlayInitials.classList.add('person-bg');
    overlayInitials.innerHTML = initials;
    overlayInitials.style = `background-color: ${color}`;

    overlayName.value = name;
    overlayName.disabled = true;
    overlayMail.value = mail;
    overlayMail.disabled = true;
    overlayPhone.value = phone;
    overlayPhone.disabled = true;

    onsubmit.onsubmit = null;

    createButton.onclick = async function (event) {
        event.preventDefault();
        deleteContact(ID);
        closeContactOverlay();
    };

}