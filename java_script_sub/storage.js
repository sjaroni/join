const URL = 'http://127.0.0.1:5500';
//const URL = 'https://stefan-jaroni.developerakademie.net/join-me'
const STORAGE_TOKEN = 'IW4WUCWUXM0BDH36L7L8D1T3TYC0RCB38BFN8FPA'; // Token S. Jaroni
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Store a key-value pair in remote storage.
 * @param {string} key - name for the remote-storage key
 * @param {string} value - name for the remote-storage value
 * @returns 
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

allTaskCategories = [
  {
    "id": 0,
    "title": "HTML + CSS",
    "bgColor": "#1dd7c1"
  },
  {
    "id": 1,
    "title": "JavaScript",
    "bgColor": "#0837ff"
  },
  {
    "id": 2,
    "title": "Team",
    "bgColor": "#ff3d00"
  },
  {
    "id": 3,
    "title": "Meeting",
    "bgColor": "#1b5e00"
  },
  {
    "id": 4,
    "title": "Angular",
    "bgColor": "#5f2562"
  }
];
//setItem('taskCategory', allTaskCategories);

/**
 * Get a key-value pair from remote storage.
 * @param {string} key - name for the remote-storage key
 * @returns 
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
