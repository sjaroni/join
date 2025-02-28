let selectedContact = null;

/**
 * This function shows the contact informations when click on a contact in the register
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
function showContact(ID) {
    if (window.innerWidth <= 1200) {
        elementByID('contact_register').classList.add('d-none');
    }

    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];


    let contactElements = document.querySelectorAll('.contact-info');
    contactElements.forEach(contactElement => {
        contactElement.classList.remove('active');
    });

    let selectedContactElement = document.querySelector(`[data-contact-id="contactID_${ID}"]`);
    selectedContactElement.classList.add('active');

    selectedContact = {
        name,
        mail,
        phone,
        initials,
        color,
        ID
    };

    let show = elementByID('show_contact')

    show.style.right = '-65vw';

    setTimeout(function (name, mail, phone, initials, color, ID) {
        show.style.right = '0';

        show.innerHTML = "";
        show.innerHTML += showContact_html(name, mail, phone, initials, color, ID);

    }, 200, name, mail, phone, initials, color, ID);

}

function getLastJsonObjectID() {
    let lastEntry = contacts[contacts.length - 1];
    let lastEntryID = lastEntry['contact_ID']
    return lastEntryID;
}

/**
 * Return to register - Responsive
 */
function returnToRegister() {
    let show = elementByID('show_contact')

    show.style.right = '-100vw';
    setTimeout(() => {
        elementByID('contact_register').classList.remove('d-none');
    }, 200);


}