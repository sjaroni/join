let currentDraggedElement;
let contactsTask = [];
let tasks = [];
let taskCategory = [];
let progressHTML = '';
let allContactIDs = [];
let statuses = ['todo', 'inProgress', 'awaitFeedback', 'done'];

async function init() {
  await loadTasks();
  await loadTaskCategory();
  await loadContacts();
  await loadData();
  await includeHTML();
  updateHTML();
  adjustQuicklinkBG();
  setStylesheet();
  detectDarkmode();
  hideButtons();
}

/**
 * Enable/Disable the recognized stylesheet
 */
function setStylesheet() {
  document.getElementById('defaultStyle').disabled = false;
  document.getElementById('smallScreenStyle').disabled = true;
}

/**
 * Update-Function with filter
 * @param {string} search - part of the title or description
 */
function updateHTML(search) {
  let longText = [
    'No tasks To do',
    'No tasks in progress',
    'No await feedback',
    'No tasks done',
  ];

  let filteredTasks = search
    ? tasks.filter(
        (t) =>
          statuses.includes(t['status']) &&
          (t['title'].toLowerCase().includes(search) ||
            t['description'].toLowerCase().includes(search)),
      )
    : tasks;

  statuses.forEach((status, index) => {
    let filteredByStatus = filteredTasks.filter((t) => t['status'] === status);
    issue(status, filteredByStatus, longText[index]);
  });
  hideButtons();
}

/**
 * Generates all tasks (cards) on board
 * @param {string} name - name of the board-status
 * @param {string} job - array of task-values
 * @param {string} longText - long Name for placeholder
 */
async function issue(name, job, longText) {
  if (job.length) {
    document.getElementById(name).innerHTML = '';
    for (let index = 0; index < job.length; index++) {
      let element = job[index];
      document.getElementById(name).innerHTML += generateTasksHTML(element);
    }
  } else {
    document.getElementById(
      name,
    ).innerHTML = `<div class="no_tasks_feedback">${longText}</div>`;
  }
  generatePlaceholer(name);
}

/**
 * Starts dragging on elements
 * @param {number} id - current element-id for dragging
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Rotate dragged element
 * @param {number} id - current element-id
 * @param {string} status - active status of element
 */
function startTransform(id, status) {
  document.getElementById(id).style.transform = 'scale(0.9) rotate(5deg)';
  addHighlight(status);
}

/**
 * Reset rotation on draggend element
 * @param {number} id - current element-id
 * @param {string} status - active status of element
 */
function stopTransform(id, status) {
  document.getElementById(id).style.transform = 'scale(0.9) rotate(0deg)';
  removeHighlight(status);
}

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Sets new status on dragged element
 * @param {string} status - active status of element
 */
async function moveTo(status) {
  let id = getTaskIndex(currentDraggedElement);
  tasks[id]['status'] = status;
  await putStorageData('/tasks/' + id, tasks[id]);
  updateHTML();
}

/**
 * Highlight status on board exclude given status
 * @param {string} status - active status of element
 */
function addHighlight(status) {
  let matches = document.querySelectorAll('div.placeholderCard');
  let excludeContainer = document.getElementById(status);

  matches.forEach(function (placeholderItem) {
    if (!excludeContainer.contains(placeholderItem)) {
      placeholderItem.classList.add('highlight');
    }
  });
}

/**
 * Remove highlighting
 */
function removeHighlight() {
  let matches = document.querySelectorAll('div.placeholderCard');
  matches.forEach((placeholderItem) => {
    placeholderItem.classList.remove('highlight');
  });
}

/**
 * Calculating progress on subtasks
 * @param {number} doneSubtaskCount - number of all done subtasks
 * @param {number} allSubtaskCount - number of all subtasks
 * @returns
 */
function calculateProgress(doneSubtaskCount, allSubtaskCount) {
  const basis = 128;
  let percent = (doneSubtaskCount * 100) / allSubtaskCount;
  let resultProgress = (basis * percent) / 100;
  resultProgress = basis - resultProgress;
  return resultProgress;
}

/**
 * Filtering tasks by given value
 */
function filterTasks() {
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  updateHTML(search);
}

/**
 * Visualize the taskprogress
 * @param {number} element - number of current task-element
 */
function taskProgress(element) {
  let doneSubtaskCount = 0;

  if (element['subtasks']) {
    let allSubtaskCount = element['subtasks'].length;
    if (element['subtasks'] && allSubtaskCount > 0) {
      for (const subtask of element['subtasks']) {
        if (subtask['substatus'] === 'done') {
          doneSubtaskCount++;
        }
      }
      let resultProgress = calculateProgress(doneSubtaskCount, allSubtaskCount);
      generateProgressHTML(resultProgress, doneSubtaskCount, allSubtaskCount);
    }
  }
}

/**
 * Generating profile-badges on board
 * @param {number} task - number of current task-element
 */
async function assignedTo(task) {
  let pixelLeft = 0;
  let counterMember = 0;
  let rest = 0;

  for (let i = 0; i < task['member'].length; i++) {
    const element = task['member'][i];

    for (let j = 0; j < contactsTask.length; j++) {
      let contactTask = contactsTask[j];
      if (contactTask['register_entry'][0]['contact_ID'] === element) {
        if (counterMember > 3) {
          rest++;
        } else {
          let contactInitials =
            contactTask['register_entry'][0]['contact_initials'];
          let contactColor = contactTask['register_entry'][0]['contact_color'];
          pixelLeft = counterMember % 5 === 0 ? 0 : pixelLeft;
          generateProfileBadgesBoard(contactInitials, contactColor, pixelLeft);
          pixelLeft = pixelLeft + 8;
        }
        counterMember++;
      }
    }
  }

  if (rest > 0) {
    return (restHTML += /*html*/ `<div class="rest">+ ${rest}</div>`);
  }
}

/**
 * Generating profile-badges on taskview
 * @param {number} task - number of current task-element
 */
function assignedToTask(task) {
  for (let i = 0; i < contactsTask.length; i++) {
    let contactTask = contactsTask[i];
    let contactId = contactTask['register_entry'][0]['contact_ID'];

    if (tasks[task]['member'].includes(contactId)) {
      let contactInitials =
        contactTask['register_entry'][0]['contact_initials'];
      let contactColor = contactTask['register_entry'][0]['contact_color'];
      let contactName = contactTask['register_entry'][0]['contact_name'];

      generateProfileBadgesTaskOverlay(
        contactInitials,
        contactColor,
        contactName,
      );
    }
  }
}

/**
 * Load all contacts from remote-storage
 */
async function loadContacts() {
  try {    
    contactsTask = await loadStorageData('/contacts');
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Load all tasks from remote-storage
 */
async function loadTasks() {
  try {
    tasks = await loadStorageData('/tasks');
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Load all categories from remote-storage
 */
async function loadTaskCategory() {
  try {    
    taskCategory = await loadStorageData('/taskCategory');
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Get array-index of task
 * @param {number} searchId - id of current task
 * @returns
 */
function getTaskIndex(searchId) {
  return tasks.findIndex((item) => item.id === searchId);
}

/**
 * Delete task
 * @param {number} searchId - id of current task
 */
async function deleteTask(searchId) {
  let taskIndex = getTaskIndex(searchId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    closeTaskOverlay();    
    deleteStorageData('/tasks/' + searchId);
    init();
  }
}

/**
 * change the Task status on onclick
 * @param {string} status - status of currentTask
 * @param {string} direction - the symbol plus or minus
 */
function changeStatus(status, direction) {
  let position = statuses.indexOf(status);

  if (position !== -1) {
    let operations = {
      '+': (pos) => pos + 1,
      '-': (pos) => pos - 1,
    };

    let operation = operations[direction];
    let destination = operation(position);
    moveTo(statuses[destination]);
  }
}

/**
 * Hide unnecessary buttons to change status (in todo and done)
 */
function hideButtons() {
  let buttons = document.querySelectorAll('.card_headline button');
  buttons.forEach(function (button) {
    if (
      button.dataset.value === 'todo_down' ||
      button.dataset.value === 'done_up'
    ) {
      button.style.display = 'none';
    }
  });
}
