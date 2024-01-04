let contactSelection = [];
let isOpen = true;


/**
 * shows the elements of the userselection depending if its open or closed
 * @param {Boolean} isClosed 
 */
async function userSelection(isClosed) {
  isOpen = isClosed;
  await loadContacts();
  let select = elementByID('user_selection');
  let selectedUser = elementByID('selected_user');
  let selectBG = elementByID('user_selection-background');
  let search = elementByID('search_contact');
  let arrowDropdown = document.getElementById('arrow_dropdown_addTask');
  adjustArrowDropdown(select, selectBG, arrowDropdown, isClosed);
  if (isOpen) {
    closeUserSelection(selectedUser, select, selectBG)
  } else {
    renderUsersInUserselection(select, search, isClosed);
  }
  if (!isClosed) {
    whoAmi();
  }
}


/**
 * renders the user within the userselection
 * @param {Element} select element user_selection
 * @param {Element} search element search_contact
 * @param {Boolean} isClosed status of userSelection
 */
function renderUsersInUserselection(select, search, isClosed){
  contacts.sort((a, b) =>
  a.register_entry[0].contact_name.localeCompare(
    b.register_entry[0].contact_name,
  ),);
  select.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i]['register_entry'][0];
    let name = contact['contact_name'];
    let initials = contact['contact_initials'];
    let color = contact['contact_color'];
    let ID = contact['contact_ID'];
    select.innerHTML += user_select_html(name, initials, color, ID);
    hiddenBadge(ID);
    changeContactBG(ID);
    search.onkeyup = function () {
      searchContact();
    };}
  select.innerHTML += userSelection_addContact_button();
  showUserSelection(isClosed);
}


/**
 * closes userselection
 * @param {Element} selectedUser 
 */
function closeUserSelection(selectedUser, select, selectBG){
  select.classList.add('d-none');
  selectBG.classList.add('d-none');
  selectedUser.classList.remove('d-none');
  isOpen = false;
}


/**
 * Adjusts the Arrow for the dropdown menu of the user selection
 * @param {Element} select  element user_selection
 * @param {Element} selectBG  element user_selection-background
 * @param {Element} arrowDropdown  element arrow_dropdown_addTask'
 * @param {Boolean} isClosed  status of userSelection
 */
function adjustArrowDropdown(select, selectBG, arrowDropdown, isClosed){
  if (select.classList.contains('d-none')) {
    select.classList.remove('d-none');
    if (isClosed !== undefined) {
      arrowDropdown.style.transform = 'rotate(360deg)';
    }
  } else {
    select.classList.add('d-none');
    selectBG.classList.add('d-none');
    if (isClosed !== undefined) {
      arrowDropdown.style.transform = 'rotate(180deg)';
    }
  }
}


/**
 * adjusts the visibillity of the userSelection
 * @param {Boolean} isClosed 
 */
function showUserSelection(isClosed){
  if (isClosed !== undefined) {
    select.classList.remove('d-none');
    selectBG.classList.remove('d-none');
    selectedUser.classList.add('d-none');
    isOpen = true;
  }
}


/**
 * Filter all Contacts by name, hide unmatching
 */
function searchContact() {
  let searchContact = elementByID('search_contact').value.toLowerCase();
  for (let i = 0; i < contacts.length; i++) {
    let contactName = contacts[i]['register_entry'][0]['contact_name'];
    let contactID = contacts[i]['register_entry'][0]['contact_ID'];
    let userDiv = userElement(contactID);

    if (contactName.toLowerCase().includes(searchContact)) {
      userDiv.classList.remove('d-none');
    } else {
      userDiv.classList.add('d-none');
    }
  }
}


/**
 * creates badge for the user with according ID
 * @param {Number} ID ID of user
 */
function createBadge(ID) {
  let selectedUser = elementByID('selected_user');
  checkBadge(ID);
  selectedUser.innerHTML = '';
  for (let i = 0; i < contactSelection.length; i++) {
    let selection = contactSelection[i];
    let initials = getIndexOfJson('ID', selection)['contact_initials'];
    let color = getIndexOfJson('ID', selection)['contact_color'];
    selectedUser.innerHTML += user_selectedUser_html(selection, initials);

    let userInitial = elementByID(`user_inital_${selection}`);
    userInitial_style(userInitial, i, color);
  }
}


/**
 * checks badge of user with according ID
 * @param {Number} ID ID of user
 */
function checkBadge(ID) {
  getBadge(ID);
  hiddenBadge(ID);
  changeContactBG(ID);
}


/**
 * gets badge of user with according ID
 * @param {Number} ID ID of user
 */
function getBadge(ID) {
  if (userIndex(ID) == -1) {
    contactSelection.push(ID);
  } else {
    contactSelection.splice(userIndex(ID), 1);
  }
}


/**
 * Hide badge of user with according ID
 * @param {Number} ID ID of user
 */
function hiddenBadge(ID) {
  if (userIndex(ID) == -1) {
    if (uncheckedIMG(ID) && checkedIMG(ID)) {
      uncheckedIMG(ID).classList.remove('d-none');
      checkedIMG(ID).classList.add('d-none');
    }
  } else {
    if (uncheckedIMG(ID) && checkedIMG(ID)) {
      uncheckedIMG(ID).classList.add('d-none');
      checkedIMG(ID).classList.remove('d-none');
    }
  }
}


/**
 * Changes background of user with according ID
 * @param {Number} ID ID of user
 */
function changeContactBG(ID) {
  if (userIndex(ID) == -1) {
    if (userElement(ID) && userName(ID)) {
      userElement(ID).classList.remove('user-active');
      userName(ID).classList.remove('user-name-active');
    }
  } else {
    if (userElement(ID) && userName(ID)) {
      userElement(ID).classList.add('user-active');
      userName(ID).classList.add('user-name-active');
    }
  }
}


/**
 * Styles the user-initial element
 * @param {String} userInitial userinitials of user
 * @param {Number} i value for z-index
 * @param {Hex} color color for badge
 * @returns 
 */
function userInitial_style(userInitial, i, color) {
  return (userInitial.style.cssText = `background-color: ${color}; z-index: ${i + 10
    }; margin-left: -10px;`);
}


/**
 * @param {Number} ID ID of user
 * @returns the HTML-img_checked-element with the according ID
 */
function checkedIMG(ID) {
  return elementByID(`img_checked_${ID}`);
}


/**
 * @param {Number} ID ID of user
 * @returns the HTML-img_unchecked-element with the according ID
 */
function uncheckedIMG(ID) {
  return elementByID(`img_unchecked_${ID}`);
}


/**
 * @param {Number} contactID contactID of user
 * @returns the HTML-user-element with the according contactID
 */
function userElement(contactID) {
  return elementByID(`user_element_${contactID}`);
}


/**
 * @param {Number} contactID contactID of user
 * @returns the HTML-name-element with the according contactID
 */
function userName(contactID) {
  return elementByID(`user_name_${contactID}`);
}


/**
 * @param {Number} ID ID of user
 * @returns index of the contacts array for the the given ID
 */
function userIndex(ID) {
  return contactSelection.indexOf(ID);
}
