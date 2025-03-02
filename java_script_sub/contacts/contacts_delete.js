/**
 * This function delete the contact from JSON
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
async function deleteContact(ID) {
    let showArea = elementByID('show_contact')

    const indexToDelete = contacts.findIndex(contact => contact['contact_ID'] === ID);

    if (indexToDelete !== -1) {
        const contactCategory = contacts[indexToDelete]['contact_name'][0].toUpperCase();

        contacts.splice(indexToDelete, 1);

        const categoryContactsExist = contacts.some(contact => {
            const firstLetter = contact['contact_name'][0].toUpperCase();
            return firstLetter === contactCategory;
        });

        if (!categoryContactsExist) {
            const categoryIndex = categories.indexOf(contactCategory);
            if (categoryIndex !== -1) {
                categories.splice(categoryIndex, 1);
            }
        }

        await saveData();
        await loadData();

        showArea.style.right = '-65vw';

        setTimeout(function () {
            showArea.innerHTML = '';
        }, 200);

        createRegisterEntry();
    } else {
        console.error('Contact not found for deletion.');
    }

    smallAnimatedLabel("Contact successfully deleted");
    returnToRegister();
}
