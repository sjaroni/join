/**
 * HELP FUNCTION: get smaller code for document.getElementById('.....')
 * 
 * @param {string} id - This is the ID from a html element
 * @returns 
 */
function elementByID(id) {
    return document.getElementById(id);
}

/**
 * Create random-Color for each contact
 * @returns - returns a color code like #fa995e
 */
function randomColor() {
    let color;

    do {
        color = Math.floor(Math.random() * 16777215).toString(16);
        color = '#' + '0'.repeat(6 - color.length) + color; // Stellt sicher, dass color immer 6 Zeichen hat
    } while (generatedColors.has(color));

    generatedColors.add(color);
    return color;
}

/**
 * HELP FUNCTION: Created a random id (number) and save it in a array
 * 
 * @returns - the id (number)
 */
function randomID() {
    let id;

    do {
        id = Math.floor(Math.random() * 10000);
    } while (generatedIDs.has(id));

    generatedIDs.add(id);

    return id;
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - string to edit
 * @returns 
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert hex-values to rgb-colors
 * @param {string} hex - color code like #fa995e
 * @returns rgb-value
 */
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(function (char) {
            return char + char;
        }).join('');
    }

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}

/**
 * Set background-color on initials
 * @param {string} color - color-name like #fa995e
 * @returns style for background-color
 */
function contactFirstLettersBG(color) {
    let rgb = hexToRgb(color);

    let backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    return `style="background-color: ${backgroundColor};"`;
}

/**
 * HELP FUNCTION: compares the JSON Array with the Input to find the index
 * 
 * @param {string} value - the value... example: "ID", "mail"...
 * @param {string or number} input - the input... example: 4733, "mail.mail@google.com"
 * @returns 
 */
function getIndexOf(value, input) {
    // let position = contacts.findIndex(entry => entry.register_entry[0][`contact_${value}`] === input);
    let position = contacts.findIndex(entry => entry[`contact_${value}`] === input);
    return position;
}

/**
 * HELP FUNCTION: find and get the index from JSON entry
 * 
 * @param {string} value - the value... example: "ID", "mail"...
 * @param {string or number} input - the input... example: 4733, "mail.mail@google.com"
 * @returns 
 */
function getIndexOfJson(value, input) {
    // let pos = contacts[getIndexOf(value, input)][0];
    let pos = contacts[getIndexOf(value, input)];
    return pos;
}
