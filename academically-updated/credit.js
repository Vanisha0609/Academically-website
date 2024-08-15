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