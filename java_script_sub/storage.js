// const STORAGE_TOKEN = 'IW4WUCWUXM0BDH36L7L8D1T3TYC0RCB38BFN8FPA'; // Token S. Jaroni
// const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const BASE_URL = 'https://remotestorage-a5c8d-default-rtdb.europe-west1.firebasedatabase.app/';

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

async function putStorageData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

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

async function loadStorageData(path = '') {
  const response = await fetch(BASE_URL + path + '.json');
  const data = await response.json();
  return data ? Object.values(data).filter(item => item !== null) : [];
}

async function deleteStorageData(path = '') {
  let response = await fetch(BASE_URL + path + '.json', {
    method: 'DELETE',    
  });

  return (responseToJson = await response.json());
}