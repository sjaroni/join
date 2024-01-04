/**
 * Reset Form
 * This function resets all Values from Input,
 * resets added Styles and resets Variables and Arrays
 */
async function resetForm() {  
  document.getElementById('addTaskInputForm').reset();
  document.getElementById('category_selection-background').classList.add('d-none');
  resetArrays();
  addSubtask();
  resetRadioButtonClasses();    
  resetInnerHTML();  
  resetImages();
  resetClassError();
  resetRequiredFields();
}
/**
 * Reset Arrays
 */
function resetArrays() {
  newSubtasks = [];
  contactSelection = [];
}

/**
 * Reset style from Radio-Buttons
 */
function resetRadioButtonClasses(){
  document.getElementById('frame24').classList.remove('frame24_selected');
  document.getElementById('frame25').classList.remove('frame25_selected');
  document.getElementById('frame26').classList.remove('frame26_selected');
}

/**
 * Reset content
 */
function resetInnerHTML() {
  document.getElementById('temporaryStatus').innerHTML = '';
  document.getElementById('prioResult').innerHTML = '';
  document.getElementById('selected_user').innerHTML = '';
  document.getElementById('category_select').innerHTML = "";
}

/**
 * Reset images
 */
function resetImages() {
  document.getElementById('imgUrgent').src = '../../assets/img/add-task/urgent.svg';
  document.getElementById('imgMedium').src = '../../assets/img/add-task/medium.svg';
  document.getElementById('imgLow').src = '../../assets/img/add-task/low.svg';
}

/**
 * Reset style from all elements with class error
 */
function resetClassError() {
  Array.from(document.querySelectorAll('.error')).forEach(
    (el) => el.classList.remove('error')
  );  
}

/**
 * Change style to display: none for every element with class requiredField
 */
function resetRequiredFields() {
  Array.from(document.querySelectorAll('.requiredField')).forEach(
    (el) => el.classList.add('d-none')
  );  
}