/**
 * rendering the initial template for summary.html
 */
async function getInitialHTMLTemplate() {
    document.getElementById('content').innerHTML = /*html*/` 
    
    <!-- insert content and own style from here -->
    <div class="d-flex column">
    <section class="headlineSection">
        <span class="headlineSummary">Summary</span>
        <img class="headlineVector" src="../assets/img/summary/vector_blue.png" alt="">
        <span class="headlineSpan">Everything in a nutshell!</span>
        <img class="headlineVectorMobile" src="../assets/img/summary/vector_blue_mobile.png" alt="">
    </section>

    <div class="table">
        <section class="flex mediumCardSection">
            <div onclick="openBoard()" class="cardMedium svgPen">
                <!--Pen Desktop-->
                <div class="penDesktop"></div>
                <div id="summaryToDo" class="flex column"></div>
            </div>

            <div onclick="openBoard()" class="cardMedium">
                <!--Cehckmark Desktop-->
                <div class="checkmarkDesktop"></div>
                <div id="summaryDone" class="flex column"></div>
            </div>
        </section>
        <section class="flex largeCardSection">
            <div onclick="openBoard()" class="cardLarge">
                <div class="urgentSection">
                    <img class="redArrows" src="../assets/img/summary/red_up_arrows.png" alt="">
                    <img class="redArrowsMobile" src="../assets/img/summary/red_up_arrows_mobile.png"
                        alt="">

                    <div id="summaryUrgent" class="flex column"></div>
                </div>

                <img class="vectorGrey" src="../assets/img/summary/vector_grey.png" alt="">
                <img class="vectorGreyMobile" src="../assets/img/summary/vector_grey_mobile.png" alt="">

                <div id="deadline" class="deadlineSection"></div>
            </div>
         </section>
        <section class="flex smallCardSection">
            <div id="summaryTasks" onclick="openBoard()" class="cardSmall"></div>

            <div id="summaryInProgress" onclick="openBoard()" class="cardSmall"></div>

            <div id="summaryAwaitingFeedback" onclick="openBoard()" class="cardSmall"></div>
        </section>
    </div>
</div>

<div id="greeting" class="greetingSection"></div>`;
}


/**
 * rendering the summary including all needed values from board
 */
async function getHTMLTemplateforSummary() {
    //Amount To-do
    document.getElementById('summaryToDo').innerHTML = /*html*/`
        <span class="tasksAmount">${amountTodos}</span>
        <span class="tasksSpan">To-do</span>
    `;
    //Amount Tasks In Board
    document.getElementById('summaryTasks').innerHTML = /*html*/`
        <span class="tasksAmount">${amountInBoard}</span>
        <span class="tasksSpan">Tasks In</span>
        <span class="tasksSpan">Board</span>
    `;
    //Amount Tasks Done
    document.getElementById('summaryDone').innerHTML = /*html*/`
        <span class="tasksAmount">${amountDone}</span>
        <span class="tasksSpan">Done</span>
    `;
    //Amount Tasks Urgent
    document.getElementById('summaryUrgent').innerHTML = /*html*/`
        <span class="tasksAmount">${amountUrgent}</span>
        <span class="tasksSpan">Urgent</span>
    `;
    //Urgent duedate / Deadline
    document.getElementById('deadline').innerHTML = /*html*/`
        <span class="deadlineSpan">${urgentDueDate}</span>
        <span class="dateTextSpan">Upcoming Deadline</span>
    `;
    //Amount Tasks In Progress
    document.getElementById('summaryInProgress').innerHTML = /*html*/`
        <span class="tasksAmount">${amountInProgress}</span>
        <span class="tasksSpan">Tasks In</span>
        <span class="tasksSpan">Progress</span>
    `;
    //Amount Tasks In Awaiting Feedback
    document.getElementById('summaryAwaitingFeedback').innerHTML = /*html*/`
        <span class="tasksAmount">${amountAwaitingFeedback}</span>
        <span class="tasksSpan">Awaiting</span>
        <span class="tasksSpan">Feedback</span>
    `;

    if (activeUserName == 'undefined') {
        document.getElementById('greeting').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>  
    `;
    }
    else {
        document.getElementById('greeting').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
        <br>
        <span class="spanName">${activeUserName}</span>
    `;
    }
}