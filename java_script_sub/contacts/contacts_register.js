let contacts = [];
let activeUserID;
let activeUserLoginMail;
let activeUserLoginData;

const generatedIDs = new Set();
const generatedColors = new Set();

/**
 * Create a new contact
 * @returns abort if condition is true
 */
async function createContact() {
    let nameIsValid = checkName();
    let mailIsValid = checkNewMail();
    if (!nameIsValid || !mailIsValid) {
        return;
    }
    create_btn.disabled = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();
    createRegisterEntry();

    closeContactOverlay();
    smallAnimatedLabel('Contact succesfully created');
    await contactsInit();
    showContact(getLastJsonObjectID());
}

/**
 * Create a new contact from board
 * @returns abort if condition is true
 */
async function createContactLight() {
    let nameIsValid = checkName();
    let mailIsValid = checkNewMail();
    if (!nameIsValid && !mailIsValid) {
        return;
    }
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();

    closeContactOverlay();
    smallAnimatedLabel('Contact succesfully created');
}

/**
 * Getting values
 */
async function getValues() {
    getCategoryLetter();
    getJSON_Entry();
}

/**
 * This function get all names of JSON contacts and iterate it for the first letters and create a new array
 * 
 */
function getCategoryLetter() {
    categories = [];
    for (let i = 0; i < contacts.length; i++) {
        let contactName = contacts[i]['register_entry'][0]['contact_name'];
        let firstLetter = contactName[0].toUpperCase();
        if (!categories.includes(firstLetter)) {
            categories.push(firstLetter);
        }
    }
}


/**
 * This function push a contact data structure
 * 
 */
function getJSON_Entry() {
    contacts.push({
        register_entry: [
            {
                contact_name: contact_name.value,
                contact_mail: contact_mail.value,
                contact_phone: `${contact_phone.value}`,
                contact_color: randomColor(),
                contact_initials: getContactFirstLetters(),
                contact_ID: randomID(),
            },
        ],
    });
}

/**
 * A function to compact several functions to save datas in remote Storage
 * 
 */
async function saveData() {
    await saveToStorage('categories', categories);
    await saveToStorage('contacts', contacts);
}

/**
 * This function set the data for the remote storage or gives a error
 * 
 * @param {string} key - This is the key for the remote storage 
 * @param {string} data - This is the value for the remote storage
 */
async function saveToStorage(key, data) {
    try {
        await setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Saving error:', e);
    }
}

/**
 * A function to compact several functions to load datas in remote Storage
 * 
 */
async function loadData() {
    await loadFromStorage('contacts', contacts);
    await loadFromStorage('categories', categories);
}

/**
 * This function get the data for the remote storage or gives a error
 * 
 * @param {string} key - This is the key for the remote storage 
 * @param {string} data - This is the value for the remote storage
 */
async function loadFromStorage(key, data) {
    try {
        const storedData = await getItem(key);
        if (storedData) {
            Object.assign(data, JSON.parse(storedData));
        }
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * This function created the contact register
 * 
 */
async function createRegister() {
    let register = elementByID('register');
    register.innerHTML = createRegisterEntry();
}

/**
 * This function get the information for creating contact register
 * 
 */
function createRegisterEntry() {
    createRegisterInfo();
}

/**
 * This function craft the construct for the contact register
 * 
 */
function createRegisterInfo() {
    let register = elementByID('register');
    let infoHTML = '';

    for (let category of categories.sort()) {
        let categoryContacts = contacts.filter((contact) => {
            let firstLetter = contact['register_entry'][0]['contact_name'][0].toUpperCase();
            return firstLetter === category;
        });
        infoHTML += createContactCategory_html(category);
        infoHTML += sortContactToCategory(categoryContacts);
    }
    register.innerHTML = infoHTML;
}

/**
 * This function sorts the contacts into the appropriate category
 * 
 * @param {JSON} categoryContacts - a JSON structure of a contact
 * @returns the html structure of sorted contacts
 */
function sortContactToCategory(categoryContacts) {
    let infoHTML = '';

    for (let contact of categoryContacts) {
        let registerEntry = contact['register_entry'][0];
        let name = registerEntry['contact_name'];
        let mail = registerEntry['contact_mail'];
        let initials = registerEntry['contact_initials'];
        let ID = registerEntry['contact_ID'];
        let color = registerEntry['contact_color'];
        let contactHTML = createContactEntry_html(ID, color, initials, name, mail);
        infoHTML += contactHTML;
    }

    return infoHTML;
}


/**
 * Get initials from logged-in User
 * @param {string} nameFromLogin - name from logged-in user
 * @returns - initials of logged-in user
 */
function getContactFirstLetters(nameFromLogin) {
    let loginName = nameFromLogin;
    if (loginName) {
        let words = loginName.split(' ');

        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();

        let initials = firstInitial + secondInitial;

        return initials;
    } else {
        let name = contact_name.value;
        let words = name.split(' ');

        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();

        let initials = firstInitial + secondInitial;

        return initials;
    }
}

/**
 * Reset html-form (set inputs empty)
 */
function resetContactsForm() {
    contact_name.value = '';
    contact_mail.value = '';
    contact_phone.value = '';
    create_btn.disabled = false;
}

/**
 * Add active User to contacts if not exist on first login
 */
async function addActiveUserToContacts() {
    getLoginData();
    let isFound = false;
    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i]['register_entry'][0]['contact_mail'] == activeUserLoginMail) {
            isFound = true;
        }
    }
    pushContact(isFound);

}

/**
 * Pushes user to contactslist if the user is not already in it
 * @param {Boolean} isFound returns true if user is already in the contactslist
 */
async function pushContact(isFound) {
    if (!isFound) {
        contacts.push({
            register_entry: [
                {
                    contact_name: activeUserLoginData[0].name,
                    contact_mail: activeUserLoginData[0].email,
                    contact_phone: `please add phonenumber`,
                    contact_color: randomColor(),
                    contact_initials: getContactFirstLetters(activeUserLoginData[0].name),
                    contact_ID: randomID(),
                },
            ],
        });
        await saveData();
    }
}

/**
 * This function selected the active Loginuser and check with contacts if is your contact and write a YOU behind it
 * 
 */
function loginIsYourContact() {

    getLoginData();
    for (let i = 0; i < contacts.length; i++) {
        let contactMail = contacts[i]['register_entry'][0]['contact_mail'];
        let checkedMail = contactMail.includes(activeUserLoginMail);
        if (checkedMail) {
            let contactEntry = getIndexOfJson('mail', contactMail);
            let entryMail = contactEntry['contact_mail'];
            let entryName = contactEntry['contact_name'];
            let entryID = contactEntry['contact_ID'];
            let contactRegisterName = elementByID(`contact_name_${entryID}`);
            if (entryMail == activeUserLoginMail) {
                contactRegisterName.innerHTML += ` <b>(You)`;
            } else {
                contactRegisterName.innerHTML = entryName;
            }
        }
    }
}

/**
 * Get all Data from localstorage for the active User
 */
function getLoginData() {
    let activeUserContactAsText = localStorage.getItem('loginData');
    if (activeUserContactAsText) {
        activeUserLoginData = JSON.parse(activeUserContactAsText);
        activeUserLoginMail = activeUserLoginData[0].email;
    }
}