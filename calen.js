const calendarData = [
    { week: 0, startDate: '01.07.2024', remarks: [
        'Subject Enrolment Phase -1: 22.07.2024 to 24.07.2024',
        'Phase – 2: 25.07.2024 to 28.07.2024',
        'Placement Training Program for IV Year UG',
        'Internship and Implant Training for II and III Year UG',
        'Mandatory Courses, Training Module and Programming Module Courses for II and III Year UG: 01.07.2024 to 27.07.2024'
    ]},
    { week: 1, startDate: '05.08.2024', remarks: ['Commencement of Classes'] },
    { week: 2, startDate: '12.08.2024', remarks: ['15.08.2024 – Thursday – Independence Day'] },
    { week: 3, startDate: '19.08.2024', remarks: [] },
    { week: 4, startDate: '26.08.2024', remarks: [
        'Event Day -1: 31.08.2024',
        '26.08.2024 – Monday – Krishna Jayanthi - Holiday'
    ]},
    { week: 5, startDate: '02.09.2024', remarks: ['07.09.2024 – Saturday – Vinayakar Chathurthi - Holiday'] },
    { week: 6, startDate: '09.09.2024', remarks: ['CIA –I and Project Review (09.09.2024 to 22.09.2024)'] },
    { week: 7, startDate: '16.09.2024', remarks: ['16.09.2024 – Monday – Milad – un – Nabi - Holiday'] },
    { week: 8, startDate: '23.09.2024', remarks: ['Last Date for Mark Entry of CIA – I is 26.09.2024'] },
    { week: 9, startDate: '30.09.2024', remarks: ['02.10.2024 – Wednesday – Gandhi Jayanthi - Holiday'] },
    { week: 10, startDate: '07.10.2024', remarks: ['11.10.2024 and 12.10.2024 – Pooja Holidays'] },
    { week: 11, startDate: '14.10.2024', remarks: ['Event Day -2: 18.10.2024'] },
    { week: 12, startDate: '21.10.2024', remarks: [] },
    { week: 13, startDate: '28.10.2024', remarks: ['31.10.2024 to 02.11.2024 – Deepavali Holidays'] },
    { week: 14, startDate: '04.11.2024', remarks: ['Drestein ’24 Week'] },
    { week: 15, startDate: '11.11.2024', remarks: ['CIA –II/Model Lab/ and Project Review (11.11.2024 to 23.11.2024)'] },
    { week: 16, startDate: '18.11.2024', remarks: ['Last Working Day – 23.11.2024'] },
    { week: 17, startDate: '25.11.2024', remarks: [
        'Last Date for Mark Entry of CIA – II and Model Lab is 29.11.2024',
        'Last date for mark entry for IAPR and Skill Assessment in CAMU – 29.11.2024',
        'Graduation Day – Saturday – 30.11.2024'
    ]},
    { week: 18, startDate: '02.12.2024', remarks: ['End Semester Practical Exams and End Semester Theory Exams'] },
    { week: 19, startDate: '09.12.2024', remarks: [] },
    { week: 20, startDate: '16.12.2024', remarks: [] },
    { week: 21, startDate: '23.12.2024', remarks: ['25.12.2024 – Wednesday – Christmas – Holiday'] },
    { week: 22, startDate: '30.12.2024', remarks: ['01.01.2025 – Wednesday – New Year – Holiday'] },
    { week: 23, startDate: '06.01.2025', remarks: ['Reopening Date for Even Semester 06.01.2025 (Tentatively)'] }
];

const calendarTableBody = document.querySelector('#calendar tbody');

// Create table rows
calendarData.forEach(entry => {
    const row = document.createElement('tr');
    const rowClass = entry.remarks.length > 0 ? 'remark' : 'regular';
    row.classList.add(rowClass);
    row.innerHTML = `
        <td>${entry.week}</td>
        <td>${entry.startDate}</td>
        <td>${formatRemarks(entry.remarks)}</td>
    `;
    calendarTableBody.appendChild(row);
});

// Format remarks into a list
function formatRemarks(remarks) {
    if (remarks.length === 0) return 'Regular Working Day';
    return `<ul>${remarks.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Show alert for current week
function showWeeklyAlert() {
    const now = new Date();
    const currentWeekStart = getCurrentWeekStartDate(now);
    const currentWeek = calendarData.find(entry => entry.startDate === currentWeekStart);

    if (currentWeek) {
        alert(`Week ${currentWeek.week} starting on ${currentWeek.startDate}: ${currentWeek.remarks.join(' ')}`);
        highlightCurrentWeek(currentWeek.week);
    }
}

// Get start date of the current week (Monday)
function getCurrentWeekStartDate(date) {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
    return formatDate(new Date(date.setDate(diff)));
}

// Format date as DD.MM.YYYY
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Highlight the current week
function highlightCurrentWeek(currentWeek) {
    const rows = document.querySelectorAll('#calendar tbody tr');
    rows.forEach(row => {
        if (parseInt(row.children[0].textContent) === currentWeek) {
            row.classList.add('highlight');
        }
    });
}

showWeeklyAlert();