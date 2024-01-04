/**
 * Renderfunction to generate HTML
 * @param {string} view - Name of the Variable which defines the View (add or edit)
 * @param {string} viewName - Name of the Variable which defines the viewName (Add or Edit)
 */
async function taskContainerRenderHTML(view, viewName) {

  taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';
  taskContainer.innerHTML = /*html*/ `
  <div id="overlay-bg-${view}Task" class="overlay-bg-${view}Task d-none" onclick="close${viewName}TaskOverlay()">
    <div id="overlay-content-${view}Task" class="overlay-content-${view}Task overlay-content-task d-flex" onclick="doNotClose(event)">
      <div id="overlay${viewName}TaskContent"></div>
      <div id="header" w3-include-html="../assets/templates/task_form.html"></div>

    </div>
    `;
  await includeHTML();
  setDateRange();
  addSubtask();
  eventListener('addTaskInputForm');
}