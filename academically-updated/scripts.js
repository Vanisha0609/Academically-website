const assignments = [
    { title: "Math Assignment 1", dueDate: "2024-08-16", priority: "high" },
    { title: "customer segmentation assignment", dueDate: "2024-08-22", priority: "medium" },
];


let tasks = [];


// Function to display assignments in the dashboard as cards
function displayAssignments() {
    const assignmentContainer = document.getElementById('assignments-container');
    assignmentContainer.innerHTML = '';
    assignments.forEach((assignment) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const priorityClass = assignment.priority + '-priority';
        const progressBarClass = assignment.priority + '-priority-bar';


        cardElement.innerHTML = `
            <h3>${assignment.title}</h3>
            <p>Due Date: ${assignment.dueDate}</p>
            <span class="badge ${priorityClass}">${assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority</span>
            <div class="progress-bar ${progressBarClass}"></div>
        `;
        assignmentContainer.appendChild(cardElement);
    });
}


// Function to display tasks in the task list
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.className = task.completed ? 'completed' : '';
        taskElement.setAttribute('draggable', true);


        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
            ${task.title}
            <span class="green-tick">&#10003;</span> <!-- Green tick mark -->
            <span class="delete-task" data-index="${index}">&times;</span>
        `;
        taskList.appendChild(taskElement);
    });


    // Event listener for checkbox changes
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            tasks[index].completed = this.checked;
            displayTasks(); // Re-render the task list to update the tick marks
        });
    });
}






// Event listener to handle adding new tasks
document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskTitle = document.getElementById('task-input').value;
    tasks.push({ title: taskTitle, completed: false });
    document.getElementById('task-input').value = '';
    displayTasks();
});


// Event listener to handle deleting tasks
document.getElementById('task-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-task')) {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1);
        displayTasks();
    }
});


// Drag and drop reordering of tasks
document.getElementById('task-list').addEventListener('dragstart', function (e) {
    e.target.classList.add('dragging');
});


document.getElementById('task-list').addEventListener('dragend', function (e) {
    e.target.classList.remove('dragging');
});


document.getElementById('task-list').addEventListener('dragover', function (e) {
    e.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(draggingItem);
    } else {
        taskList.insertBefore(draggingItem, afterElement);
    }
});


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
   
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


// Function to simulate notifications/alerts
function displayAlerts() {
    const notificationContainer = document.getElementById('notification-container');
    assignments.forEach((assignment) => {
        if (assignment.priority === "high") {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${assignment.title} is due on ${assignment.dueDate}!`;
            notificationContainer.appendChild(notification);
           
            // Automatically remove the notification after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
    });
}


// Simulate page load
document.addEventListener('DOMContentLoaded', function () {
    displayAssignments();
    displayTasks();
    displayAlerts(); // Display alerts for high-priority assignments when the page reloads
});

function addRow() {
    const table = document.getElementById('courseTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = '<input type="text" name="courseCode">';
    cell2.innerHTML = '<input type="number" name="creditsEarned">';
    cell3.innerHTML = `<select name="grade">
                        <option value="10">A+</option>
                        <option value="9">A</option>
                        <option value="8">B+</option>
                        <option value="7">B</option>
                        <option value="6">C+</option>
                        <option value="5">C</option>
                        <option value="4">D</option>
                        <option value="0">F</option>
                      </select>`;
}

function calculateCGPA() {
    const rows = document.getElementById('courseTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < rows.length; i++) {
        const credits = parseFloat(rows[i].getElementsByTagName('input')[1].value);
        const grade = parseFloat(rows[i].getElementsByTagName('select')[0].value);

        totalCredits += credits;
        totalPoints += credits * grade;
    }

    const cgpa = totalPoints / totalCredits;
    document.getElementById('cgpaResult').innerText = `Your CGPA is: ${cgpa.toFixed(2)}`;

    if (cgpa >= 8.5) {
        document.getElementById('domainSelection').style.display = 'block';
        document.getElementById('improvementSuggestions').style.display = 'none';
    } else {
        document.getElementById('domainSelection').style.display = 'none';
        document.getElementById('honorsOptions').style.display = 'none';
        displayImprovementSuggestions();
    }
}

function displayHonorsSuggestions() {
    const domain = document.getElementById('domain').value;
    const honorsList = document.getElementById('honorsList');

    let honorsOptions = {
        dataScience: [
            'Data Science Honors',
            'Big Data Analytics Honors'
        ],
        ai: [
            'Artificial Intelligence Honors',
            'Machine Learning Honors'
        ],
        cybersecurity: [
            'Cybersecurity Honors',
            'Network Security Honors'
        ],
        machineLearning: [
            'Machine Learning Honors',
            'Deep Learning Honors'
        ],
        fullstack: [
            'Fullstack Development Honors',
            'Frontend and Backend Mastery Honors'
        ],
        cloudComputing: [
            'Cloud Computing Honors',
            'AWS Certified Solutions Architect Honors'
        ]
    };

    honorsList.innerHTML = ''; // Clear previous honors suggestions

    if (honorsOptions[domain]) {
        honorsOptions[domain].forEach(honor => {
            const li = document.createElement('li');
            li.textContent = honor;
            honorsList.appendChild(li);
        });
        document.getElementById('honorsOptions').style.display = 'block';
    } else {
        document.getElementById('honorsOptions').style.display = 'none';
    }
}

function displayImprovementSuggestions() {
    const improvementList = document.getElementById('improvementList');
    const futureIdeas = document.getElementById('futureIdeas');

    const suggestions = [
        'Seek help from professors or tutors for difficult subjects.',
        'Develop better study habits and time management skills.',
        'Join study groups for collaborative learning.',
        'Utilize online resources and textbooks to reinforce understanding.',
        'Attend workshops or extra classes if available.'
    ];

    const ideas = [
        'Consider internships or projects to gain practical experience.',
        'Explore additional courses or certifications to boost your skills.',
        'Engage in extracurricular activities related to your field of interest.',
        'Work on personal projects or contribute to open-source projects.',
        'Set specific goals and create a plan to achieve them.'
    ];

    improvementList.innerHTML = ''; // Clear previous improvement suggestions
    futureIdeas.innerHTML = ''; // Clear previous future ideas

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        improvementList.appendChild(li);
    });

    ideas.forEach(idea => {
        const li = document.createElement('li');
        li.textContent = idea;
        futureIdeas.appendChild(li);
    });

    document.getElementById('improvementSuggestions').style.display = 'block';
}



function addEvent() {
    const eventList = document.getElementById('event-list');
    const newEvent = document.createElement('div');
    newEvent.className = 'event';
    newEvent.innerHTML = `
        <h3>Event</h3>
        <p>Date: September 20, 2024</p>
        <p>Location: Room 101</p>
        <p>Description: A fun and engaging math competition.</p>
    `;
    eventList.appendChild(newEvent);
}
function goToHome() {
    document.getElementById('signup-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}
function goToMain() {
    document.getElementById('cgpa-calculator').style.display = 'none';
    document.getElementById('credits-calculator').style.display = 'none';
    document.getElementById('events-section').style.display = 'none';
    document.getElementById('clubs-section').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}


// Add sample event on page load
window.onload = () => {
    addEvent();
};


const courses = {
    HSS: [
        { code: '19EN101', title: 'Communicative English', credits: 4 },
        { code: '19EN102', title: 'Technical English', credits: 4 },
        { code: '19MS151', title: 'Principles of Management', credits: 3 },
        { code: '19MS152', title: 'Total Quality Management', credits: 3 },
        { code: '19MS153', title: 'Management and Quality Principles for Engineering', credits: 3 },
        { code: '22HS101', title: 'Heritage of Tamils', credits: 1 },
        { code: '22HS102', title: 'Tamils and Technology', credits: 1 }
    ],
    BS: [
        { code: '19MA201', title: 'Calculus and Matrix Algebra', credits: 4 },
        { code: '19MA206', title: 'Logic and Combinatorics', credits: 4 },
        { code: '19MA212', title: 'Algebra and Number Theory', credits: 4 },
        { code: '19MA218', title: 'Probability and Queueing Theory', credits: 4 },
        { code: '19PH205', title: 'Computational Physics', credits: 4 },
        { code: '19CY205', title: 'Principles of Chemistry in Engineering', credits: 4 }
    ],
    ES: [
        { code: '19ME302', title: 'Engineering Drawing', credits: 3 },
        { code: '19CS301', title: 'Problem Solving and Python Programming', credits: 4 },
        { code: '19EE305', title: 'Basic Electrical, Electronics and Measurement Engineering', credits: 3 },
        { code: '19EC303', title: 'Digital Principles and System Design', credits: 4 },
        { code: '19EC307', title: 'Communication Engineering', credits: 3 },
        { code: '19CS302', title: 'Programming in C', credits: 4 },
        { code: '19CS305', title: 'Computer Architecture', credits: 3 },
        { code: '19CS308', title: 'Software Testing Laboratory', credits: 2 }
    ],
    PC: [
        { code: '19AI414', title: 'Fundamentals of Web Application Development', credits: 5 },
        { code: '19CS405', title: 'Operating System', credits: 4 },
        { code: '19CS406', title: 'Computer Networks', credits: 4 },
        { code: '19CS404', title: 'Database Management System and Its Applications', credits: 4 },
        { code: '19CS407', title: 'Theory Of Computation', credits: 3 },
        { code: '19CS408', title: 'Software Engineering', credits: 4 },
        { code: '19CS409', title: 'Compiler Design', credits: 4 },
        { code: '19CS401', title: 'Data Structures and Object Oriented Programming using C++', credits: 4 },
        { code: '19CS402', title: 'Design and Analysis of Algorithms', credits: 3 },
        { code: '19CS403', title: 'Programming Paradigms', credits: 4 },
        { code: '19AI307', title: 'Object Oriented Programming using Java', credits: 3 },
        { code: '19CS411', title: 'Virtualization and Cloud Computing', credits: 4 },
        { code: '19CS412', title: 'Cryptography and Network Security', credits: 4 },
        { code: '19CS413', title: 'Artificial Intelligence', credits: 4 },
        { code: '19EC408', title: 'Microprocessor and Microcontroller', credits: 4 },
        { code: '19CS414', title: 'Mobile Application Development', credits: 3 }
    ],
    PE: [
        { code: '19CS542', title: 'Embedded Board Design', credits: 3 },
        { code: '19CS417', title: 'Ethical Hacking Techniques', credits: 3 },
        { code: '19CS418', title: 'Cyberlaw and Compliance', credits: 3 },
        { code: '19AI547', title: 'Blockchain for Business', credits: 3 },
        { code: '19AI513', title: 'Game Programming', credits: 4 },
        { code: '19AM401', title: 'Time Series Analysis and Forecasting', credits: 4 }
    ],
    OE: [
        { code: '19XXXXX', title: 'Open Elective Courses', credits: 8 },
        { code: '19XXXXX', title: 'Online Course I', credits: 2 },
        { code: '19XXXXX', title: 'Online Course II', credits: 2 }
    ],
    EEC: [
        { code: '19CS701', title: 'Mini Project', credits: 1 },
        { code: '19CS702', title: 'Project Work Phase I', credits: 3 },
        { code: '19CS703', title: 'Project Work Phase II', credits: 6 },
        { code: '19EY701', title: 'Soft Skills', credits: 1 },
        { code: '19EY708', title: 'Career Development Skills', credits: 1 },
        { code: '19EY702', title: 'Creative Skills for Communication', credits: 1 },
        { code: '19EY709', title: 'Reasoning Ability', credits: 1 },
        { code: '19EY703', title: 'System of Numerical and Logical Terminologies', credits: 1 },
        { code: '19EY704', title: 'Advanced Quantitative and Logical Reasoning', credits: 1 }
    ],
    Mandatory: [
        { code: '19MC801', title: 'Professional Ethics', credits: 0 },
        { code: '19MC802', title: 'Environmental Science', credits: 0 },
        { code: '19MC803', title: 'Constitution of India', credits: 0 },
        { code: '19MC804', title: 'Internship / Entrepreneurship / Consultancy', credits: 2 },
        { code: '19MC805', title: 'Inplant Training', credits: 1 }
    ]
};

const maxCredits = {
    HSS: 13,
    BS: 24,
    ES: 25,
    PC: 57,
    PE: 15,
    OE: 12,
    EEC: 16,
    Mandatory: 3
};

let categoryCredits = {
    HSS: 0,
    BS: 0,
    ES: 0,
    PC: 0,
    PE: 0,
    OE: 0,
    EEC: 0,
    Mandatory: 0
};

let totalCredits = 0;

function updateCourses() {
    const category = document.getElementById('category').value;
    const courseSelect = document.getElementById('course');
    courseSelect.innerHTML = '<option value="" disabled selected>Select a course</option>';
    courses[category].forEach(course => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ title: course.title, code: course.code, credits: course.credits });
        option.textContent = `${course.code} - ${course.title} (${course.credits} credits)`;
        courseSelect.appendChild(option);
    });
}

function addCourse() {
    const courseSelect = document.getElementById('course');
    const selectedCourse = JSON.parse(courseSelect.value);
    const category = document.getElementById('category').value;

    if (selectedCourse) {
        const { title, code, credits } = selectedCourse;

        categoryCredits[category] += credits;

        if (categoryCredits[category] > maxCredits[category]) {
            alert(`Maximum credits achieved for ${category} (${maxCredits[category]} credits).`);
            categoryCredits[category] -= credits;
        } else {
            const li = document.createElement('li');
            li.textContent = `${code} - ${title} (${credits} credits)`;
            document.getElementById('selectedCourses').appendChild(li);

            totalCredits += credits;
            document.getElementById('totalCredits').textContent = totalCredits;

            if (categoryCredits[category] === maxCredits[category]) {
                alert(`You have achieved the maximum credits for the ${category} category.`);
            }
        }
    }
}
