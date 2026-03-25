// ============================================================
// EXAM MANAGEMENT — COMPLETE & FULLY FUNCTIONAL
// ============================================================

const API_BASE_URL       = 'http://localhost:8084/api/exams';
const CLASS_API_BASE_URL = 'http://localhost:8084/api/classes';

// ============= DUMMY DATA =============
const DUMMY_EXAMS = [
    { examId:1,  examName:"Term 1 Examination",  examCode:"TERM1-2025-CL10", examType:"TERM1",     academicYear:"2024-2025", classId:10, className:"Class 10", section:"A", startDate:"2025-03-01", endDate:"2025-03-10", status:"COMPLETED", description:"First term examination covering all syllabus topics from April to September.", subjects:[{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 101",invigilator:"Mr. Sharma"},{subjectName:"Science",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 102",invigilator:"Mrs. Patel"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 103",invigilator:"Ms. Verma"},{subjectName:"Social Studies",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 104",invigilator:"Mr. Gupta"},{subjectName:"Hindi",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 105",invigilator:"Mrs. Singh"}] },
    { examId:2,  examName:"Mid Term Examination", examCode:"MID-2025-CL9",   examType:"MID_TERM",  academicYear:"2024-2025", classId:9,  className:"Class 9",  section:"B", startDate:"2025-04-05", endDate:"2025-04-15", status:"SCHEDULED", description:"Mid term examination for Class 9 covering chapters 1-8 of all subjects.", subjects:[{subjectName:"Physics",maxMarks:80,passingMarks:27,startTime:"09:00",endTime:"12:00",roomNumber:"Room 201",invigilator:"Dr. Mehta"},{subjectName:"Chemistry",maxMarks:80,passingMarks:27,startTime:"09:00",endTime:"12:00",roomNumber:"Room 202",invigilator:"Mrs. Joshi"},{subjectName:"Biology",maxMarks:80,passingMarks:27,startTime:"09:00",endTime:"12:00",roomNumber:"Room 203",invigilator:"Mr. Rao"},{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"09:00",endTime:"12:00",roomNumber:"Room 204",invigilator:"Mrs. Reddy"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"09:00",endTime:"12:00",roomNumber:"Room 205",invigilator:"Mr. Thomas"}] },
    { examId:3,  examName:"Unit Test 2",          examCode:"UT2-2025-CL8",   examType:"UNIT_TEST", academicYear:"2024-2025", classId:8,  className:"Class 8",  section:"A", startDate:"2025-03-20", endDate:"2025-03-22", status:"ONGOING",   description:"Unit Test 2 for Class 8 covering chapters 5-10.", subjects:[{subjectName:"Mathematics",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 301",invigilator:"Mr. Kumar"},{subjectName:"Science",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 302",invigilator:"Mrs. Nair"},{subjectName:"Social Studies",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 303",invigilator:"Mr. Pillai"}] },
    { examId:4,  examName:"Final Examination",    examCode:"FINAL-2025-CL12",examType:"FINAL",     academicYear:"2024-2025", classId:12, className:"Class 12", section:"C", startDate:"2025-05-01", endDate:"2025-05-20", status:"SCHEDULED", description:"Final board examination for Class 12 students. Students must carry hall ticket.", subjects:[{subjectName:"Physics",maxMarks:70,passingMarks:23,startTime:"10:30",endTime:"13:30",roomNumber:"Hall A",invigilator:"Dr. Sharma"},{subjectName:"Chemistry",maxMarks:70,passingMarks:23,startTime:"10:30",endTime:"13:30",roomNumber:"Hall B",invigilator:"Dr. Gupta"},{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:30",endTime:"13:30",roomNumber:"Hall C",invigilator:"Prof. Verma"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:30",endTime:"13:30",roomNumber:"Hall D",invigilator:"Mrs. DSouza"},{subjectName:"Computer Science",maxMarks:70,passingMarks:23,startTime:"10:30",endTime:"13:30",roomNumber:"Lab 1",invigilator:"Mr. Krishnan"},{subjectName:"Physical Education",maxMarks:100,passingMarks:33,startTime:"07:00",endTime:"09:00",roomNumber:"Ground",invigilator:"Mr. Bhatnagar"}] },
    { examId:5,  examName:"Term 2 Examination",  examCode:"TERM2-2025-CL11",examType:"TERM2",     academicYear:"2024-2025", classId:11, className:"Class 11", section:"A", startDate:"2025-02-10", endDate:"2025-02-20", status:"COMPLETED", description:"Second term examination for Class 11 covering second half syllabus.", subjects:[{subjectName:"Physics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 401",invigilator:"Mr. Iyer"},{subjectName:"Chemistry",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 402",invigilator:"Mrs. Kulkarni"},{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 403",invigilator:"Mr. Menon"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 404",invigilator:"Ms. Chandra"},{subjectName:"Economics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 405",invigilator:"Mrs. Bose"}] },
    { examId:6,  examName:"Unit Test 1",          examCode:"UT1-2025-CL7",   examType:"UNIT_TEST", academicYear:"2024-2025", classId:7,  className:"Class 7",  section:"B", startDate:"2025-01-15", endDate:"2025-01-17", status:"COMPLETED", description:"First Unit Test for Class 7 covering chapters 1-4.", subjects:[{subjectName:"Mathematics",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 501",invigilator:"Mr. Saxena"},{subjectName:"Science",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 502",invigilator:"Mrs. Trivedi"},{subjectName:"Hindi",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 503",invigilator:"Ms. Kapoor"}] },
    { examId:7,  examName:"Term 3 Examination",  examCode:"TERM3-2025-CL6",  examType:"TERM3",     academicYear:"2024-2025", classId:6,  className:"Class 6",  section:"A", startDate:"2025-06-01", endDate:"2025-06-08", status:"SCHEDULED", description:"Third and final term examination for Class 6.", subjects:[{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 601",invigilator:"Mr. Pandey"},{subjectName:"Science",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 602",invigilator:"Mrs. Srivastava"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 603",invigilator:"Mr. Tiwari"},{subjectName:"Social Studies",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 604",invigilator:"Mrs. Agarwal"}] },
    { examId:8,  examName:"Practical Examination",examCode:"PRAC-2025-CL12", examType:"FINAL",     academicYear:"2024-2025", classId:12, className:"Class 12", section:"B", startDate:"2025-04-20", endDate:"2025-04-28", status:"SCHEDULED", description:"Practical examinations for Science stream. Lab coats mandatory.", subjects:[{subjectName:"Physics Practical",maxMarks:30,passingMarks:10,startTime:"09:00",endTime:"12:00",roomNumber:"Physics Lab",invigilator:"Dr. Rao"},{subjectName:"Chemistry Practical",maxMarks:30,passingMarks:10,startTime:"09:00",endTime:"12:00",roomNumber:"Chemistry Lab",invigilator:"Dr. Nair"},{subjectName:"Biology Practical",maxMarks:30,passingMarks:10,startTime:"09:00",endTime:"12:00",roomNumber:"Biology Lab",invigilator:"Dr. Banerjee"},{subjectName:"Computer Practical",maxMarks:30,passingMarks:10,startTime:"09:00",endTime:"12:00",roomNumber:"Computer Lab",invigilator:"Mr. Sinha"}] },
    { examId:9,  examName:"Mid Term Examination", examCode:"MID-2025-CL5",   examType:"MID_TERM",  academicYear:"2025-2026", classId:5,  className:"Class 5",  section:"A", startDate:"2025-08-10", endDate:"2025-08-15", status:"SCHEDULED", description:"Mid-term exam for Class 5. Chapters 1-6 for all subjects.", subjects:[{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 101",invigilator:"Mrs. Mishra"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 102",invigilator:"Mr. Paul"},{subjectName:"Hindi",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 103",invigilator:"Mrs. Yadav"},{subjectName:"EVS",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 104",invigilator:"Mr. Chauhan"}] },
    { examId:10, examName:"Term 1 Examination",  examCode:"TERM1-2025-CL3",  examType:"TERM1",     academicYear:"2025-2026", classId:3,  className:"Class 3",  section:"C", startDate:"2025-07-20", endDate:"2025-07-24", status:"SCHEDULED", description:"First term examination for Class 3.", subjects:[{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 201",invigilator:"Mrs. Jain"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 202",invigilator:"Mr. Desai"},{subjectName:"Hindi",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"12:00",roomNumber:"Room 203",invigilator:"Ms. Ghosh"}] },
    { examId:11, examName:"Unit Test 3",          examCode:"UT3-2025-CL10",  examType:"UNIT_TEST", academicYear:"2024-2025", classId:10, className:"Class 10", section:"D", startDate:"2025-03-25", endDate:"2025-03-27", status:"ONGOING",   description:"Unit Test 3 for Class 10 covering chapters 7-12.", subjects:[{subjectName:"Mathematics",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 301",invigilator:"Mr. Bajaj"},{subjectName:"Science",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 302",invigilator:"Mrs. Arora"},{subjectName:"Social Studies",maxMarks:50,passingMarks:17,startTime:"10:00",endTime:"11:30",roomNumber:"Room 303",invigilator:"Mr. Dubey"}] },
    { examId:12, examName:"Term 2 Examination",  examCode:"TERM2-2025-CL8",  examType:"TERM2",     academicYear:"2024-2025", classId:8,  className:"Class 8",  section:"B", startDate:"2025-04-25", endDate:"2025-05-05", status:"SCHEDULED", description:"Second term examination for Class 8.", subjects:[{subjectName:"Mathematics",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 101",invigilator:"Mr. Shah"},{subjectName:"Science",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 102",invigilator:"Mrs. Kaur"},{subjectName:"English",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 103",invigilator:"Mr. Batra"},{subjectName:"Social Studies",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 104",invigilator:"Mrs. Walia"},{subjectName:"Hindi",maxMarks:100,passingMarks:33,startTime:"10:00",endTime:"13:00",roomNumber:"Room 105",invigilator:"Mr. Malhotra"}] }
];

const DUMMY_SUBJECTS_BY_CLASS = {
    "1": ["Mathematics","English","Hindi","EVS","Drawing"],
    "2": ["Mathematics","English","Hindi","EVS","Drawing"],
    "3": ["Mathematics","English","Hindi","EVS","General Knowledge"],
    "4": ["Mathematics","English","Hindi","Science","Social Studies"],
    "5": ["Mathematics","English","Hindi","Science","Social Studies","EVS"],
    "6": ["Mathematics","English","Hindi","Science","Social Studies","Sanskrit"],
    "7": ["Mathematics","English","Hindi","Science","Social Studies","Sanskrit"],
    "8": ["Mathematics","English","Hindi","Science","Social Studies","Sanskrit"],
    "9": ["Mathematics","English","Hindi","Physics","Chemistry","Biology","Social Studies"],
    "10":["Mathematics","English","Hindi","Physics","Chemistry","Biology","Social Studies"],
    "11":["Mathematics","Physics","Chemistry","Biology","English","Computer Science","Economics"],
    "12":["Mathematics","Physics","Chemistry","Biology","English","Computer Science","Physical Education"]
};

// ============= STATE =============
let currentExams       = [];
let filteredExams      = [];
let subjectsTabData    = [];
let currentPageNumber  = 1;
const ITEMS_PER_PAGE   = 10;
let editingExamId      = null;
let statusUpdateExamId = null;
let nextDummyId        = 200;

// ============= BOOT =============
document.addEventListener('DOMContentLoaded', function () {
    buildModals();
    setupTabNavigation();
    setupFormHandlers();
    setupFilterHandlers();
    setupSidebar();
    setupDropdowns();
    loadExams();
    initAccessControl();
});

// ============= API =============
const ExamAPI = {
    async getAllExams() {
        const r = await fetch(API_BASE_URL + '/get-all-exams', { credentials: 'include' });
        if (!r.ok) throw new Error(r.status);
        return r.json();
    },
    async createExam(d) {
        const r = await fetch(API_BASE_URL + '/create-exam', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        const b = await r.json();
        if (!r.ok) throw new Error(b.error || 'Create failed');
        return b;
    },
    async updateExam(id, d) {
        const r = await fetch(API_BASE_URL + '/update-exam/' + id, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
        const b = await r.json();
        if (!r.ok) throw new Error(b.error || 'Update failed');
        return b;
    },
    async updateStatus(id, status) {
        const r = await fetch(API_BASE_URL + '/update-exam-status/' + id + '?status=' + status, { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' } });
        const b = await r.json();
        if (!r.ok) throw new Error(b.error || 'Status update failed');
        return b;
    },
    async deleteExam(id) {
        const r = await fetch(API_BASE_URL + '/delete-exam/' + id, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } });
        if (!r.ok) throw new Error('Delete failed');
        return true;
    }
};

// ============= MAP =============
function mapExam(e) {
    return {
        id: e.examId,
        name: e.examName || '',
        examCode: e.examCode || '',
        type: e.examType || '',
        academicYear: e.academicYear || '',
        classId: String(e.classId || ''),
        className: e.className || ('Class ' + e.classId),
        section: e.section || 'A',
        startDate: e.startDate || '',
        endDate: e.endDate || '',
        description: e.description || '',
        status: e.status || 'SCHEDULED',
        subjects: (e.subjects || []).map(function (s) {
            return {
                name: s.subjectName || s.name || '',
                subjectName: s.subjectName || s.name || '',
                maxMarks: s.maxMarks || 100,
                passingMarks: s.passingMarks || 33,
                startTime: s.startTime || '',
                endTime: s.endTime || '',
                roomNumber: s.roomNumber || '',
                invigilator: s.invigilator || ''
            };
        })
    };
}

// ============= LOAD =============
async function loadExams() {
    showLoading();
    try {
        const data = await ExamAPI.getAllExams();
        currentExams = data.map(mapExam);
    } catch (_) {
        currentExams = DUMMY_EXAMS.map(mapExam);
    }
    filteredExams = currentExams.slice();
    refreshAll();
    hideLoading();
}

function refreshAll() {
    updateStats();
    renderExamsTable();
    updateFilterStats();
    populateTimetableDropdown();
}

// ============= STATS =============
function updateStats() {
    var subjSet = new Set();
    currentExams.forEach(function (ex) {
        ex.subjects.forEach(function (s) { if (s.name) subjSet.add(s.name); });
    });
    setEl('statTotalExams', currentExams.length);
    setEl('statUpcoming',   currentExams.filter(function (e) { return e.status === 'SCHEDULED' || e.status === 'UPCOMING'; }).length);
    setEl('statCompleted',  currentExams.filter(function (e) { return e.status === 'COMPLETED'; }).length);
    setEl('statOngoing',    subjSet.size);
}

function setEl(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
}

// ============= TAB NAVIGATION =============
// Tabs use style.display exclusively. HTML panels have style="display:none" on
// scheduleContent, timeTableContent, subjectsContent — createExamContent is visible by default.
function setupTabNavigation() {
    var tabMap = {
        createExamTab: 'createExamContent',
        scheduleTab:   'scheduleContent',
        timeTableTab:  'timeTableContent',
        subjectsTab:   'subjectsContent'
    };

    // Set initial active style on Create Exam tab
    var firstBtn = document.getElementById('createExamTab');
    if (firstBtn) {
        firstBtn.style.borderBottomColor = '#3b82f6';
        firstBtn.style.color = '#2563eb';
    }

    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Reset all tab buttons
            document.querySelectorAll('.tab-btn').forEach(function (b) {
                b.style.borderBottomColor = 'transparent';
                b.style.color = '';
            });
            // Activate this tab
            this.style.borderBottomColor = '#3b82f6';
            this.style.color = '#2563eb';

            // Hide all panels
            Object.keys(tabMap).forEach(function (key) {
                var panel = document.getElementById(tabMap[key]);
                if (panel) panel.style.display = 'none';
            });

            // Show target panel
            var targetId = tabMap[this.id];
            var target = document.getElementById(targetId);
            if (target) target.style.display = 'block';

            // Side effects
            if (this.id === 'scheduleTab') renderExamsTable();
            if (this.id === 'subjectsTab') renderSubjectsTable();
        });
    });
}

// ============= FILTERS =============
function setupFilterHandlers() {
    var filterIds = ['scheduleClass', 'scheduleExamType', 'scheduleStatus'];
    filterIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', applyFilters);
    });
    var resetBtn = document.getElementById('resetFilters');
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

    var prevBtn = document.getElementById('prevPage');
    if (prevBtn) prevBtn.addEventListener('click', function () {
        if (currentPageNumber > 1) { currentPageNumber--; renderExamsTable(); }
    });
    var nextBtn = document.getElementById('nextPage');
    if (nextBtn) nextBtn.addEventListener('click', function () {
        var total = Math.ceil(filteredExams.length / ITEMS_PER_PAGE);
        if (currentPageNumber < total) { currentPageNumber++; renderExamsTable(); }
    });
}

function applyFilters() {
    var cls    = document.getElementById('scheduleClass')    ? document.getElementById('scheduleClass').value    : '';
    var type   = document.getElementById('scheduleExamType') ? document.getElementById('scheduleExamType').value : '';
    var status = document.getElementById('scheduleStatus')   ? document.getElementById('scheduleStatus').value   : '';

    filteredExams = currentExams.filter(function (ex) {
        if (cls && ex.classId !== cls) return false;
        if (type && ex.type !== type) return false;
        if (status) {
            var norm   = status === 'UPCOMING' ? 'SCHEDULED' : status;
            var exNorm = ex.status === 'UPCOMING' ? 'SCHEDULED' : ex.status;
            if (exNorm !== norm) return false;
        }
        return true;
    });
    currentPageNumber = 1;
    renderExamsTable();
    updateFilterStats();
}

function resetAllFilters() {
    ['scheduleClass', 'scheduleExamType', 'scheduleStatus'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });
    filteredExams = currentExams.slice();
    currentPageNumber = 1;
    renderExamsTable();
    updateFilterStats();
    showToast('Filters reset', 'success');
}

function updateFilterStats() {
    var el = document.getElementById('filterStats');
    if (el) el.innerHTML = 'Showing <span class="font-bold">' + filteredExams.length + '</span> of <span class="font-bold">' + currentExams.length + '</span> exams';
}

// ============= TABLE =============
function renderExamsTable() {
    var tbody = document.getElementById('examsTableBody');
    var noMsg = document.getElementById('noExamsMessage');
    var info  = document.getElementById('tableInfo');
    if (!tbody) return;

    var start = (currentPageNumber - 1) * ITEMS_PER_PAGE;
    var end   = Math.min(start + ITEMS_PER_PAGE, filteredExams.length);
    var page  = filteredExams.slice(start, end);
    tbody.innerHTML = '';

    if (!page.length) {
        if (noMsg) noMsg.classList.remove('hidden');
        if (info)  info.textContent = 'No exams found';
        renderPagination(0);
        return;
    }
    if (noMsg) noMsg.classList.add('hidden');
    page.forEach(function (ex, i) { tbody.appendChild(buildRow(ex, start + i + 1)); });
    if (info) info.textContent = 'Showing ' + (start + 1) + '\u2013' + end + ' of ' + filteredExams.length + ' exams';
    renderPagination(filteredExams.length);
}

function buildRow(ex, no) {
    var tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50 transition-colors';
    var total = ex.subjects.reduce(function (s, sub) { return s + (sub.maxMarks || 0); }, 0);

    tr.innerHTML =
        '<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">' + no + '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap">' +
            '<div class="font-medium text-gray-900">' + ex.name + '</div>' +
            '<div class="text-xs text-gray-500">' + formatExamType(ex.type) + (ex.examCode ? ' \u00b7 ' + ex.examCode : '') + '</div>' +
        '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">' + ex.className + ' \u2013 ' + ex.section + '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">' + fmtDate(ex.startDate) + ' \u2013 ' + fmtDate(ex.endDate) + '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap">' +
            '<span class="px-2 py-1 text-xs font-semibold rounded-full ' + getStatusClass(ex.status) + '">' + getStatusText(ex.status) + '</span>' +
        '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">' + ex.subjects.length + ' subjects</td>' +
        '<td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">' + total + '</td>' +
        '<td class="px-4 py-4 whitespace-nowrap text-sm font-medium">' +
            '<button data-action="timetable" data-id="' + ex.id + '" title="View Timetable" class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"><i class="fas fa-calendar-alt"></i></button>' +
            '<button data-action="edit"      data-id="' + ex.id + '" title="Edit Exam"      class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-green-600 hover:bg-green-50 transition-colors"><i class="fas fa-edit"></i></button>' +
            '<button data-action="status"    data-id="' + ex.id + '" data-status="' + ex.status + '" title="Update Status" class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"><i class="fas fa-toggle-on"></i></button>' +
            '<button data-action="delete"    data-id="' + ex.id + '" title="Delete Exam"    class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors"><i class="fas fa-trash"></i></button>' +
        '</td>';

    // Single event delegation listener on the row — works 100% reliably
    tr.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-action]');
        if (!btn) return;
        var id = parseInt(btn.dataset.id, 10);
        switch (btn.dataset.action) {
            case 'timetable': showExamTimetable(id); break;
            case 'edit':      openEditModal(id);     break;
            case 'status':    openStatusModal(id, btn.dataset.status); break;
            case 'delete':    deleteExam(id);        break;
        }
    });
    return tr;
}

function renderPagination(total) {
    var pages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
    var prev  = document.getElementById('prevPage');
    var next  = document.getElementById('nextPage');
    var info  = document.getElementById('pageInfo');
    if (prev) { prev.disabled = currentPageNumber <= 1;     prev.classList.toggle('opacity-50', currentPageNumber <= 1); }
    if (next) { next.disabled = currentPageNumber >= pages; next.classList.toggle('opacity-50', currentPageNumber >= pages); }
    if (info) info.textContent = 'Page ' + currentPageNumber + ' of ' + pages;
}

// ============= FORM HANDLERS =============
function setupFormHandlers() {
    // Create exam — button (not submit) to avoid native validation conflicts
    var createBtn = document.getElementById('createExamBtn');
    if (createBtn) createBtn.addEventListener('click', createNewExam);

    // Clear button
    var clearBtn = document.getElementById('clearFormBtn');
    if (clearBtn) clearBtn.addEventListener('click', resetCreateForm);

    // Class dropdown → load subjects
    var classSelect = document.getElementById('examClass');
    if (classSelect) classSelect.addEventListener('change', function () { loadSubjectsForClass(this.value); });

    // Load Timetable button
    var loadTTBtn = document.getElementById('loadTimetableBtn');
    if (loadTTBtn) loadTTBtn.addEventListener('click', loadTimetableTab);

    // Add Subject form submit
    var addSubForm = document.getElementById('addSubjectForm');
    if (addSubForm) addSubForm.addEventListener('submit', function (e) { e.preventDefault(); addSubjectToTable(); });

    // ============= FIX: "Add Subject" button now correctly opens the modal =============
    // Previously this was scrolling to #subjectName which does not exist in the HTML,
    // causing the button to do nothing. The modal (buildAddSubjectModal) is already
    // built and fully functional — we just need to call openAddSubjectModal() here.
    var addSubBtn = document.getElementById('addSubjectBtn');
    if (addSubBtn) addSubBtn.addEventListener('click', function () {
        openAddSubjectModal();
    });
}

// ============= ADD SUBJECT MODAL =============
function buildAddSubjectModal() {
    if (document.getElementById('addSubjectModal')) return;
    var m = document.createElement('div');
    m.id = 'addSubjectModal';
m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;padding:1rem;overflow-y:auto;';    m.innerHTML =
'<div style="background:#fff;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.25);width:100%;max-width:420px;max-height:90vh;overflow-y:auto;padding:0;">' +            '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;">' +
                '<h3 style="font-size:1.1rem;font-weight:700;color:#111827;">Add New Subject</h3>' +
                '<button id="_closeAddSubBtn" style="font-size:1.5rem;color:#9ca3af;background:none;border:none;cursor:pointer;line-height:1;">&times;</button>' +
            '</div>' +
            '<div style="padding:1.5rem;">' +
                '<div style="margin-bottom:1rem;">' +
                    '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Class</label>' +
                    '<select id="modalSubjectClass" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;">' +
                        '<option value="">Select Class</option>' +
                        '<option value="1">Class 1</option><option value="2">Class 2</option>' +
                        '<option value="3">Class 3</option><option value="4">Class 4</option>' +
                        '<option value="5">Class 5</option><option value="6">Class 6</option>' +
                        '<option value="7">Class 7</option><option value="8">Class 8</option>' +
                        '<option value="9">Class 9</option><option value="10">Class 10</option>' +
                        '<option value="11">Class 11</option><option value="12">Class 12</option>' +
                    '</select>' +
                '</div>' +
                '<div style="margin-bottom:1rem;">' +
                    '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Subject Code</label>' +
                    '<input type="text" id="modalSubjectCode" placeholder="e.g., MATH101" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;">' +
                '</div>' +
                '<div style="margin-bottom:1rem;">' +
                    '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Subject Name</label>' +
                    '<input type="text" id="modalSubjectName" placeholder="e.g., Mathematics" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;">' +
                '</div>' +
                '<div style="margin-bottom:1rem;">' +
                    '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Max Marks</label>' +
                    '<input type="number" id="modalSubjectMax" placeholder="100" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;">' +
                '</div>' +
                '<div style="margin-bottom:1.5rem;">' +
                    '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Passing Marks</label>' +
                    '<input type="number" id="modalSubjectPass" placeholder="33" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;">' +
                '</div>' +
                '<div style="display:flex;justify-content:flex-end;gap:.75rem;">' +
                    '<button id="_cancelAddSubBtn" style="padding:.5rem 1.25rem;border:1px solid #d1d5db;color:#374151;border-radius:.5rem;cursor:pointer;font-size:.875rem;background:#fff;">Cancel</button>' +
                    '<button id="_saveAddSubBtn"   style="padding:.5rem 1.25rem;background:#2563eb;color:#fff;border:none;border-radius:.5rem;cursor:pointer;font-size:.875rem;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Add Subject</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(m);
    document.getElementById('_closeAddSubBtn').addEventListener('click',  closeAddSubjectModal);
    document.getElementById('_cancelAddSubBtn').addEventListener('click', closeAddSubjectModal);
    document.getElementById('_saveAddSubBtn').addEventListener('click',   saveAddSubjectModal);
    m.addEventListener('click', function (e) { if (e.target === m) closeAddSubjectModal(); });
}

function openAddSubjectModal() {
    if (!document.getElementById('addSubjectModal')) buildAddSubjectModal();
    // Reset modal fields
    ['modalSubjectClass','modalSubjectCode','modalSubjectName','modalSubjectMax','modalSubjectPass'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });
    var m = document.getElementById('addSubjectModal');
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAddSubjectModal() {
    var m = document.getElementById('addSubjectModal');
    if (m) m.style.display = 'none';
    document.body.style.overflow = '';
}

function saveAddSubjectModal() {
    var codeVal = (document.getElementById('modalSubjectCode') || {value:''}).value.trim();
    var nameVal = (document.getElementById('modalSubjectName') || {value:''}).value.trim();
    var maxVal  = parseInt((document.getElementById('modalSubjectMax')  || {value:'100'}).value) || 100;
    var passVal = parseInt((document.getElementById('modalSubjectPass') || {value:'33'}).value)  || 33;

    if (!nameVal) { showToast('Subject name is required', 'error'); return; }

    var code = codeVal || makeCode(nameVal);
    var idx  = subjectsTabData.length;
    subjectsTabData.push({ code: code, name: nameVal, maxMarks: maxVal, passingMarks: passVal });

    var tbody = document.getElementById('subjectsTableBody');
    // Remove placeholder row if present
    if (tbody) {
        var ph = tbody.querySelector('tr td[colspan]');
        if (ph) ph.closest('tr').remove();
    }

    var tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML =
        '<td class="px-4 py-3 text-sm font-mono text-gray-600">' + code + '</td>' +
        '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + nameVal + '</td>' +
        '<td class="px-4 py-3 text-sm text-gray-700">' + maxVal + '</td>' +
        '<td class="px-4 py-3 text-sm text-gray-700">' + passVal + '</td>' +
        '<td class="px-4 py-3 text-sm"><button class="remove-subject-btn text-red-500 hover:text-red-700" title="Remove"><i class="fas fa-trash"></i></button></td>';
    (function (capturedIdx) {
        tr.querySelector('.remove-subject-btn').addEventListener('click', function () { removeSubject(capturedIdx); });
    })(idx);
    if (tbody) tbody.appendChild(tr);

    setEl('subjectsTabHeading', 'Subjects (' + subjectsTabData.length + ')');
    closeAddSubjectModal();
    showToast('"' + nameVal + '" added successfully!', 'success');
}

// ============= CREATE EXAM =============
async function createNewExam() {
    var fd  = collectFormData();
    var err = validateForm(fd);
    if (err) { showToast(err, 'error'); return; }

    showLoading();
    try {
        var created;
        try {
            var res = await ExamAPI.createExam(buildAPIRequest(fd));
            created = mapExam(res);
        } catch (_) {
            created = buildLocalExam(fd);
        }
        currentExams.unshift(created);
        filteredExams = currentExams.slice();
        refreshAll();
        resetCreateForm();
        showToast('Exam "' + created.name + '" created successfully!', 'success');
        // Switch to schedule tab to show new entry
        document.getElementById('scheduleTab').click();
    } catch (e) {
        showToast(e.message || 'Failed to create exam', 'error');
    } finally {
        hideLoading();
    }
}

function collectFormData() {
    var subjects = [];
    document.querySelectorAll('.subject-checkbox:checked').forEach(function (cb) {
        var item  = cb.closest('.subject-item');
        var label = item ? (item.querySelector('label') ? item.querySelector('label').textContent.trim() : '') : '';
        var marks = parseInt(item ? (item.querySelector('.subject-marks') ? item.querySelector('.subject-marks').value : '100') : '100') || 100;
        if (label) subjects.push({ name: label, maxMarks: marks, passingMarks: Math.floor(marks * 0.33) });
    });
    return {
        name:        (document.getElementById('examName')        || {value:''}).value.trim(),
        type:        (document.getElementById('examType')        || {value:''}).value,
        academicYear:(document.getElementById('academicYear')    || {value:''}).value,
        classId:     (document.getElementById('examClass')       || {value:''}).value,
        section:     (document.getElementById('examSection')     || {value:''}).value,
        startDate:   (document.getElementById('startDate')       || {value:''}).value,
        endDate:     (document.getElementById('endDate')         || {value:''}).value,
        description: (document.getElementById('examDescription') || {value:''}).value.trim(),
        subjects:    subjects
    };
}

function validateForm(fd) {
    if (!fd.name)                  return 'Exam name is required';
    if (!fd.type)                  return 'Exam type is required';
    if (!fd.classId)               return 'Class is required';
    if (!fd.section)               return 'Section is required';
    if (!fd.startDate)             return 'Start date is required';
    if (!fd.endDate)               return 'End date is required';
    if (fd.startDate > fd.endDate) return 'End date must be after start date';
    if (!fd.subjects.length)       return 'Please select at least one subject';
    return null;
}

function buildAPIRequest(fd) {
    return {
        examName: fd.name, examType: fd.type, academicYear: fd.academicYear,
        classId: parseInt(fd.classId), section: fd.section,
        startDate: fd.startDate, endDate: fd.endDate, description: fd.description,
        subjects: fd.subjects.map(function (s) { return { subjectName: s.name, maxMarks: s.maxMarks, passingMarks: s.passingMarks }; })
    };
}

function buildLocalExam(fd) {
    var id = nextDummyId++;
    var names = {"1":"Class 1","2":"Class 2","3":"Class 3","4":"Class 4","5":"Class 5","6":"Class 6","7":"Class 7","8":"Class 8","9":"Class 9","10":"Class 10","11":"Class 11","12":"Class 12"};
    return {
        id: id, name: fd.name, examCode: 'EX-' + id, type: fd.type,
        academicYear: fd.academicYear, classId: fd.classId,
        className: names[fd.classId] || ('Class ' + fd.classId),
        section: fd.section, startDate: fd.startDate, endDate: fd.endDate,
        description: fd.description, status: 'SCHEDULED',
        subjects: fd.subjects.map(function (s) {
            return { name: s.name, subjectName: s.name, maxMarks: s.maxMarks, passingMarks: s.passingMarks, startTime: '', endTime: '', roomNumber: '', invigilator: '' };
        })
    };
}

function resetCreateForm() {
    var form = document.getElementById('createExamForm');
    if (form) {
        // Reset all inputs manually so no native submit issues
        form.querySelectorAll('input').forEach(function (inp) { inp.value = ''; });
        form.querySelectorAll('select').forEach(function (sel) { sel.selectedIndex = 0; });
        form.querySelectorAll('textarea').forEach(function (ta) { ta.value = ''; });
    }
    // Reset subjects panel
    var list = document.getElementById('subjectsList');
    if (list) list.innerHTML = '<div class="col-span-3 text-center py-8 text-gray-400"><i class="fas fa-hand-point-up text-3xl mb-2 block"></i><p class="text-sm">Select a class above to load its subjects</p></div>';
    editingExamId = null;
    showToast('Form cleared', 'success');
}

// ============= LOAD SUBJECTS FOR CLASS =============
async function loadSubjectsForClass(classId) {
    var list = document.getElementById('subjectsList');
    if (!list) return;
    if (!classId) {
        list.innerHTML = '<div class="col-span-3 text-center py-8 text-gray-400"><i class="fas fa-hand-point-up text-3xl mb-2 block"></i><p class="text-sm">Select a class to load its subjects</p></div>';
        return;
    }
    list.innerHTML = '<div class="col-span-3 text-center py-8 text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-2 block"></i>Loading subjects...</div>';

    var subjects = [];
    try {
        var r = await fetch(CLASS_API_BASE_URL + '/get-class-by-id/' + classId, { credentials: 'include' });
        if (!r.ok) throw new Error('not found');
        var data = await r.json();
        var map  = new Map();
        (data.otherTeacherSubject || []).forEach(function (t) {
            (t.subjects || []).forEach(function (s) {
                if (s.subjectName && !map.has(s.subjectName))
                    map.set(s.subjectName, { name: s.subjectName, maxMarks: s.totalMarks || 100 });
            });
        });
        subjects = Array.from(map.values());
        if (!subjects.length) throw new Error('empty');
    } catch (_) {
        subjects = (DUMMY_SUBJECTS_BY_CLASS[String(classId)] || []).map(function (n) { return { name: n, maxMarks: 100 }; });
    }

    if (!subjects.length) {
        list.innerHTML = '<div class="col-span-3 text-center py-6 text-amber-500"><i class="fas fa-exclamation-triangle text-2xl mb-2 block"></i>No subjects found for this class.</div>';
        return;
    }

    list.innerHTML = '';
    subjects.forEach(function (s, i) {
        var cbId = 'sub_' + i + '_' + Date.now();
        var div  = document.createElement('div');
        div.className = 'subject-item flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors';
        div.innerHTML =
            '<input type="checkbox" id="' + cbId + '" class="subject-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer">' +
            '<label for="' + cbId + '" class="ml-3 text-sm text-gray-700 flex-1 cursor-pointer select-none">' + s.name + '</label>' +
            '<span class="text-xs text-gray-400 mr-1">Max:</span>' +
            '<input type="number" value="' + s.maxMarks + '" data-default="' + s.maxMarks + '" class="subject-marks w-20 px-2 py-1 border border-gray-300 rounded text-sm" disabled>';

        var cb  = div.querySelector('.subject-checkbox');
        var inp = div.querySelector('.subject-marks');
        cb.addEventListener('change', function () {
            inp.disabled = !cb.checked;
            if (!cb.checked) inp.value = inp.dataset.default;
            div.classList.toggle('bg-blue-50',     cb.checked);
            div.classList.toggle('border-blue-400', cb.checked);
        });
        list.appendChild(div);
    });
    showToast(subjects.length + ' subjects loaded for Class ' + classId, 'success');
}

// ============= BUILD ALL MODALS ONCE =============
function buildModals() {
    buildEditModal();
    buildStatusModal();
    buildTimetableModal();
}

// ============= EDIT MODAL =============
function buildEditModal() {
    if (document.getElementById('editExamModal')) return;
    var m = document.createElement('div');
    m.id = 'editExamModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;padding:1rem;overflow-y:auto;';
    m.innerHTML =
        '<div style="background:#fff;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.25);width:100%;max-width:760px;max-height:90vh;overflow-y:auto;margin:auto;">' +
            '<div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #e5e7eb;padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;z-index:10;border-radius:12px 12px 0 0;">' +
                '<h3 style="font-size:1.125rem;font-weight:700;color:#111827;">Edit Exam</h3>' +
                '<button id="_closeEditBtn" style="font-size:1.5rem;color:#9ca3af;background:none;border:none;cursor:pointer;line-height:1;">&times;</button>' +
            '</div>' +
            '<div style="padding:1.5rem;">' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Exam Name *</label>' +
                        '<input id="editExamName" type="text" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;"></div>' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Exam Type *</label>' +
                        '<select id="editExamType" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;">' +
                            '<option value="TERM1">Term 1 Examination</option><option value="TERM2">Term 2 Examination</option>' +
                            '<option value="TERM3">Term 3 Examination</option><option value="UNIT_TEST">Unit Test</option>' +
                            '<option value="MID_TERM">Mid Term Examination</option><option value="FINAL">Final Examination</option>' +
                        '</select></div>' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Academic Year *</label>' +
                        '<select id="editAcademicYear" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;">' +
                            '<option value="2024-2025">2024-2025</option><option value="2025-2026">2025-2026</option><option value="2026-2027">2026-2027</option>' +
                        '</select></div>' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Section *</label>' +
                        '<select id="editSection" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;">' +
                            '<option value="A">Section A</option><option value="B">Section B</option><option value="C">Section C</option><option value="D">Section D</option>' +
                        '</select></div>' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Start Date *</label>' +
                        '<input id="editStartDate" type="date" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;"></div>' +
                    '<div><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">End Date *</label>' +
                        '<input id="editEndDate" type="date" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;box-sizing:border-box;"></div>' +
                    '<div style="grid-column:1/-1;"><label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.4rem;">Description</label>' +
                        '<textarea id="editDescription" rows="2" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;resize:none;box-sizing:border-box;"></textarea></div>' +
                '</div>' +
                '<div style="border:1px solid #e5e7eb;border-radius:.5rem;padding:1rem;margin-bottom:1rem;">' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">' +
                        '<h4 style="font-size:.875rem;font-weight:600;color:#374151;">Subjects</h4>' +
                        '<span style="font-size:.75rem;color:#9ca3af;">Name | Max Marks | Pass Marks</span>' +
                    '</div>' +
                    '<div id="editSubjectsList" style="display:flex;flex-direction:column;gap:.5rem;"></div>' +
                    '<button id="_addEditSubRow" type="button" style="margin-top:.75rem;font-size:.875rem;color:#2563eb;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:.25rem;">' +
                        '<i class="fas fa-plus"></i> Add Subject' +
                    '</button>' +
                '</div>' +
                '<div style="display:flex;justify-content:flex-end;gap:.75rem;padding-top:.75rem;border-top:1px solid #f3f4f6;">' +
                    '<button id="_cancelEditBtn" style="padding:.5rem 1.25rem;border:1px solid #d1d5db;color:#374151;border-radius:.5rem;cursor:pointer;font-size:.875rem;background:#fff;">Cancel</button>' +
                    '<button id="_saveEditBtn"   style="padding:.5rem 1.25rem;background:#2563eb;color:#fff;border:none;border-radius:.5rem;cursor:pointer;font-size:.875rem;"><i class="fas fa-save" style="margin-right:.3rem;"></i>Save Changes</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(m);
    document.getElementById('_closeEditBtn').addEventListener('click',  closeEditModal);
    document.getElementById('_cancelEditBtn').addEventListener('click', closeEditModal);
    document.getElementById('_saveEditBtn').addEventListener('click',   submitEditExam);
    document.getElementById('_addEditSubRow').addEventListener('click', addEditSubjectRow);
    m.addEventListener('click', function (e) { if (e.target === m) closeEditModal(); });
}

function openEditModal(examId) {
    var ex = currentExams.find(function (e) { return e.id === examId; });
    if (!ex) { showToast('Exam not found', 'error'); return; }
    editingExamId = examId;
    document.getElementById('editExamName').value     = ex.name;
    document.getElementById('editExamType').value     = ex.type;
    document.getElementById('editAcademicYear').value = ex.academicYear;
    document.getElementById('editSection').value      = ex.section;
    document.getElementById('editStartDate').value    = ex.startDate;
    document.getElementById('editEndDate').value      = ex.endDate;
    document.getElementById('editDescription').value  = ex.description;
    var list = document.getElementById('editSubjectsList');
    list.innerHTML = '';
    ex.subjects.forEach(function (s) { list.appendChild(makeEditSubjectRow(s.name, s.maxMarks, s.passingMarks)); });
    var m = document.getElementById('editExamModal');
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    var m = document.getElementById('editExamModal');
    if (m) m.style.display = 'none';
    document.body.style.overflow = '';
    editingExamId = null;
}

function makeEditSubjectRow(name, max, pass) {
    name = name || ''; max = max || 100; pass = pass || 33;
    var div = document.createElement('div');
    div.className = 'edit-subject-row';
    div.style.cssText = 'display:flex;gap:.5rem;align-items:center;';
    div.innerHTML =
        '<input type="text"   value="' + name + '" placeholder="Subject name" class="edit-subject-name"  style="flex:1;padding:.375rem .625rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.875rem;">' +
        '<input type="number" value="' + max  + '" placeholder="Max"          class="edit-subject-max"   style="width:5rem;padding:.375rem .5rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.875rem;">' +
        '<input type="number" value="' + pass + '" placeholder="Pass"         class="edit-subject-pass"  style="width:5rem;padding:.375rem .5rem;border:1px solid #d1d5db;border-radius:.375rem;font-size:.875rem;">';
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.style.cssText = 'width:2rem;height:2rem;border:none;background:none;cursor:pointer;color:#ef4444;font-size:1rem;flex-shrink:0;';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.addEventListener('click', function () { div.remove(); });
    div.appendChild(removeBtn);
    return div;
}

function addEditSubjectRow() {
    var list = document.getElementById('editSubjectsList');
    if (list) list.appendChild(makeEditSubjectRow('', 100, 33));
}

async function submitEditExam() {
    if (!editingExamId) return;
    var name  = document.getElementById('editExamName').value.trim();
    var type  = document.getElementById('editExamType').value;
    var yr    = document.getElementById('editAcademicYear').value;
    var sect  = document.getElementById('editSection').value;
    var sDate = document.getElementById('editStartDate').value;
    var eDate = document.getElementById('editEndDate').value;
    var desc  = document.getElementById('editDescription').value.trim();

    if (!name)            { showToast('Exam name is required', 'error'); return; }
    if (!sDate || !eDate) { showToast('Both dates are required', 'error'); return; }
    if (sDate > eDate)    { showToast('End date must be after start date', 'error'); return; }

    var subjects = [];
    document.querySelectorAll('#editSubjectsList .edit-subject-row').forEach(function (row) {
        var n  = row.querySelector('.edit-subject-name') ? row.querySelector('.edit-subject-name').value.trim() : '';
        var mx = parseInt(row.querySelector('.edit-subject-max')  ? row.querySelector('.edit-subject-max').value  : '100') || 100;
        var ps = parseInt(row.querySelector('.edit-subject-pass') ? row.querySelector('.edit-subject-pass').value : '33')  || 33;
        if (n) subjects.push({ name: n, subjectName: n, maxMarks: mx, passingMarks: ps, startTime: '', endTime: '', roomNumber: '', invigilator: '' });
    });
    if (!subjects.length) { showToast('Add at least one subject', 'error'); return; }

    var existing = currentExams.find(function (e) { return e.id === editingExamId; });
    showLoading();
    try {
        var updated;
        try {
            var req = { examName: name, examType: type, academicYear: yr, classId: parseInt(existing.classId), section: sect, startDate: sDate, endDate: eDate, description: desc, subjects: subjects.map(function (s) { return { subjectName: s.name, maxMarks: s.maxMarks, passingMarks: s.passingMarks }; }) };
            var res = await ExamAPI.updateExam(editingExamId, req);
            updated = mapExam(res);
        } catch (_) {
            updated = Object.assign({}, existing, { name: name, type: type, academicYear: yr, section: sect, startDate: sDate, endDate: eDate, description: desc, subjects: subjects });
        }
        var idx = currentExams.findIndex(function (e) { return e.id === editingExamId; });
        if (idx !== -1) currentExams[idx] = updated;
        filteredExams = currentExams.slice();
        closeEditModal();
        refreshAll();
        showToast('Exam "' + updated.name + '" updated successfully!', 'success');
    } catch (e) {
        showToast('Update failed', 'error');
    } finally {
        hideLoading();
    }
}

// ============= STATUS MODAL =============
function buildStatusModal() {
    if (document.getElementById('statusModal')) return;
    var m = document.createElement('div');
    m.id = 'statusModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;padding:1rem;';
    m.innerHTML =
        '<div style="background:#fff;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.25);width:100%;max-width:380px;padding:1.5rem;">' +
            '<h3 style="font-size:1.125rem;font-weight:700;color:#111827;margin-bottom:.5rem;">Update Exam Status</h3>' +
            '<p style="font-size:.875rem;color:#6b7280;margin-bottom:1rem;">Current: <strong id="currentStatusDisplay" style="color:#111827;"></strong></p>' +
            '<div style="margin-bottom:1.25rem;">' +
                '<label style="display:block;font-size:.875rem;font-weight:500;color:#374151;margin-bottom:.5rem;">Select New Status</label>' +
                '<select id="newStatusSelect" style="width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:.5rem;font-size:.875rem;">' +
                    '<option value="SCHEDULED">SCHEDULED (Upcoming)</option>' +
                    '<option value="ONGOING">ONGOING (In Progress)</option>' +
                    '<option value="COMPLETED">COMPLETED (Finished)</option>' +
                '</select>' +
            '</div>' +
            '<div style="display:flex;justify-content:flex-end;gap:.75rem;">' +
                '<button id="_cancelStatusBtn" style="padding:.5rem 1rem;border:1px solid #d1d5db;color:#374151;border-radius:.5rem;cursor:pointer;font-size:.875rem;background:#fff;">Cancel</button>' +
                '<button id="_submitStatusBtn" style="padding:.5rem 1rem;background:#f59e0b;color:#fff;border:none;border-radius:.5rem;cursor:pointer;font-size:.875rem;"><i class="fas fa-check" style="margin-right:.25rem;"></i>Update Status</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(m);
    document.getElementById('_cancelStatusBtn').addEventListener('click', closeStatusModal);
    document.getElementById('_submitStatusBtn').addEventListener('click', submitStatusUpdate);
    m.addEventListener('click', function (e) { if (e.target === m) closeStatusModal(); });
}

function openStatusModal(examId, currentStatus) {
    statusUpdateExamId = examId;
    var norm = (currentStatus === 'UPCOMING' ? 'SCHEDULED' : currentStatus) || 'SCHEDULED';
    setEl('currentStatusDisplay', norm);
    var sel = document.getElementById('newStatusSelect');
    if (sel) sel.value = norm;
    var m = document.getElementById('statusModal');
    if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closeStatusModal() {
    var m = document.getElementById('statusModal');
    if (m) m.style.display = 'none';
    document.body.style.overflow = '';
    statusUpdateExamId = null;
}

async function submitStatusUpdate() {
    if (!statusUpdateExamId) return;
    var newStatus = document.getElementById('newStatusSelect') ? document.getElementById('newStatusSelect').value : '';
    if (!newStatus) return;
    showLoading();
    try {
        var updated;
        try {
            var res = await ExamAPI.updateStatus(statusUpdateExamId, newStatus);
            updated = mapExam(res);
        } catch (_) {
            var ex = currentExams.find(function (e) { return e.id === statusUpdateExamId; });
            updated = Object.assign({}, ex, { status: newStatus });
        }
        var idx = currentExams.findIndex(function (e) { return e.id === statusUpdateExamId; });
        if (idx !== -1) currentExams[idx] = updated;
        filteredExams = currentExams.slice();
        closeStatusModal();
        refreshAll();
        showToast('Status updated to "' + newStatus + '"', 'success');
    } catch (e) {
        showToast('Failed to update status', 'error');
    } finally {
        hideLoading();
    }
}

// ============= DELETE =============
async function deleteExam(examId) {
    var ex = currentExams.find(function (e) { return e.id === examId; });
    if (!ex) return;
    if (!confirm('Delete "' + ex.name + '"?\nThis cannot be undone.')) return;
    showLoading();
    try {
        try { await ExamAPI.deleteExam(examId); } catch (_) { /* local fallback */ }
        currentExams  = currentExams.filter(function (e) { return e.id !== examId; });
        filteredExams = filteredExams.filter(function (e) { return e.id !== examId; });
        refreshAll();
        showToast('Exam deleted successfully', 'success');
    } catch (e) {
        showToast('Failed to delete exam', 'error');
    } finally {
        hideLoading();
    }
}

// ============= SUBJECTS TAB =============
function renderSubjectsTable() {
    var tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;
    var map = new Map();
    currentExams.forEach(function (ex) {
        ex.subjects.forEach(function (s) {
            var n = s.name || s.subjectName;
            if (n && !map.has(n)) map.set(n, { code: makeCode(n), name: n, maxMarks: s.maxMarks || 100, passingMarks: s.passingMarks || 33 });
        });
    });
    subjectsTabData = Array.from(map.values());
    tbody.innerHTML = '';
    if (!subjectsTabData.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-10 text-center text-gray-400"><i class="fas fa-book text-3xl mb-2 block"></i>No subjects added yet</td></tr>';
        setEl('subjectsTabHeading', 'Subjects');
        return;
    }
    subjectsTabData.forEach(function (s, i) {
        var tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        tr.innerHTML =
            '<td class="px-4 py-3 text-sm font-mono text-gray-600">' + s.code + '</td>' +
            '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + s.name + '</td>' +
            '<td class="px-4 py-3 text-sm text-gray-700">' + s.maxMarks + '</td>' +
            '<td class="px-4 py-3 text-sm text-gray-700">' + s.passingMarks + '</td>' +
            '<td class="px-4 py-3 text-sm"><button class="remove-subject-btn text-red-500 hover:text-red-700" title="Remove"><i class="fas fa-trash"></i></button></td>';
        (function (idx) {
            tr.querySelector('.remove-subject-btn').addEventListener('click', function () { removeSubject(idx); });
        })(i);
        tbody.appendChild(tr);
    });
    setEl('subjectsTabHeading', 'Subjects (' + subjectsTabData.length + ')');
}

function addSubjectToTable() {
    // Read by ID — reliable, no fragile indexing
    var codeVal = (document.getElementById('subjectCode')     || {value:''}).value.trim();
    var nameVal = (document.getElementById('subjectName')     || {value:''}).value.trim();
    var maxVal  = parseInt((document.getElementById('subjectMaxMarks')  || {value:'100'}).value) || 100;
    var passVal = parseInt((document.getElementById('subjectPassMarks') || {value:'33'}).value)  || 33;

    if (!nameVal) { showToast('Subject name is required', 'error'); return; }

    var code = codeVal || makeCode(nameVal);
    var idx  = subjectsTabData.length;
    subjectsTabData.push({ code: code, name: nameVal, maxMarks: maxVal, passingMarks: passVal });

    var tbody = document.getElementById('subjectsTableBody');
    // Remove placeholder row if present
    if (tbody) {
        var ph = tbody.querySelector('tr td[colspan]');
        if (ph) ph.closest('tr').remove();
    }

    var tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML =
        '<td class="px-4 py-3 text-sm font-mono text-gray-600">' + code + '</td>' +
        '<td class="px-4 py-3 text-sm font-medium text-gray-900">' + nameVal + '</td>' +
        '<td class="px-4 py-3 text-sm text-gray-700">' + maxVal + '</td>' +
        '<td class="px-4 py-3 text-sm text-gray-700">' + passVal + '</td>' +
        '<td class="px-4 py-3 text-sm"><button class="remove-subject-btn text-red-500 hover:text-red-700" title="Remove"><i class="fas fa-trash"></i></button></td>';
    (function (capturedIdx) {
        tr.querySelector('.remove-subject-btn').addEventListener('click', function () { removeSubject(capturedIdx); });
    })(idx);
    if (tbody) tbody.appendChild(tr);

    // Reset form fields by ID
    var toReset = ['subjectCode', 'subjectName', 'subjectMaxMarks', 'subjectPassMarks', 'subjectClassSelect'];
    toReset.forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });

    setEl('subjectsTabHeading', 'Subjects (' + subjectsTabData.length + ')');
    showToast('"' + nameVal + '" added successfully!', 'success');
}

function removeSubject(idx) {
    if (!confirm('Remove this subject?')) return;
    subjectsTabData.splice(idx, 1);
    renderSubjectsTable();
    showToast('Subject removed', 'success');
}

function makeCode(name) {
    var parts = name.trim().toUpperCase().split(' ');
    return parts.length === 1 ? parts[0].substring(0, 5) : parts.map(function (p) { return p[0]; }).join('').substring(0, 5);
}

// ============= TIMETABLE MODAL =============
function buildTimetableModal() {
    if (document.getElementById('timetableModal')) return;
    var m = document.createElement('div');
    m.id = 'timetableModal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:flex-start;justify-content:center;padding:1rem;overflow-y:auto;';
    m.innerHTML =
        '<div style="background:#fff;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.25);width:100%;max-width:1100px;margin:2rem auto;">' +
            '<div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #e5e7eb;padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;z-index:10;">' +
                '<div><h3 style="font-size:1.125rem;font-weight:700;color:#111827;" id="modalExamName">Timetable</h3>' +
                    '<p style="font-size:.875rem;color:#6b7280;margin-top:.15rem;" id="modalExamDetails"></p></div>' +
                '<button id="_closeTimetableBtn" style="font-size:1.5rem;color:#9ca3af;background:none;border:none;cursor:pointer;line-height:1;">&times;</button>' +
            '</div>' +
            '<div style="padding:1.5rem;">' +
                '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">' +
                    '<div style="background:#eff6ff;border-radius:.75rem;padding:1rem;"><p style="font-size:.75rem;color:#2563eb;font-weight:500;text-transform:uppercase;">Exam Type</p><p style="font-size:1rem;font-weight:700;color:#111827;margin-top:.25rem;" id="modalExamType">-</p></div>' +
                    '<div style="background:#ecfdf5;border-radius:.75rem;padding:1rem;"><p style="font-size:.75rem;color:#059669;font-weight:500;text-transform:uppercase;">Duration</p><p style="font-size:1rem;font-weight:700;color:#111827;margin-top:.25rem;" id="modalDuration">-</p></div>' +
                    '<div style="background:#f3e8ff;border-radius:.75rem;padding:1rem;"><p style="font-size:.75rem;color:#7c3aed;font-weight:500;text-transform:uppercase;">Subjects</p><p style="font-size:1rem;font-weight:700;color:#111827;margin-top:.25rem;" id="modalTotalSubjects">-</p></div>' +
                    '<div style="background:#fffbeb;border-radius:.75rem;padding:1rem;"><p style="font-size:.75rem;color:#d97706;font-weight:500;text-transform:uppercase;">Total Marks</p><p style="font-size:1rem;font-weight:700;color:#111827;margin-top:.25rem;" id="modalTotalMarks">-</p></div>' +
                '</div>' +
                '<div style="overflow-x:auto;border-radius:.75rem;border:1px solid #e5e7eb;">' +
                    '<table style="min-width:100%;border-collapse:collapse;font-size:.875rem;">' +
                        '<thead style="background:#f9fafb;">' +
                            '<tr>' +
                                ['#','Date','Day','Subject','Time','Duration','Max Marks','Pass Marks','Room','Invigilator'].map(function (h) {
                                    return '<th style="padding:.75rem 1rem;text-align:left;font-size:.75rem;font-weight:600;color:#6b7280;text-transform:uppercase;white-space:nowrap;">' + h + '</th>';
                                }).join('') +
                            '</tr>' +
                        '</thead>' +
                        '<tbody id="timetableModalBody"></tbody>' +
                    '</table>' +
                '</div>' +
                '<div style="margin-top:1rem;background:#f9fafb;border-radius:.75rem;padding:1rem;">' +
                    '<p style="font-size:.875rem;font-weight:600;color:#374151;margin-bottom:.25rem;">\uD83D\uDCDD Description</p>' +
                    '<p style="font-size:.875rem;color:#6b7280;" id="modalDescription"></p>' +
                '</div>' +
                '<div style="margin-top:1rem;background:#eff6ff;border-radius:.75rem;padding:1rem;border:1px solid #bfdbfe;">' +
                    '<p style="font-size:.875rem;font-weight:600;color:#374151;margin-bottom:.5rem;">\uD83D\uDCCC Instructions</p>' +
                    '<ul style="font-size:.875rem;color:#4b5563;list-style:disc;padding-left:1.25rem;line-height:1.75;">' +
                        '<li>Carry hall ticket and school ID card.</li>' +
                        '<li>No electronic devices in the exam hall.</li>' +
                        '<li>Be seated 15 minutes before start time.</li>' +
                        '<li>Use blue/black pen only. Pencil for diagrams.</li>' +
                    '</ul>' +
                '</div>' +
                '<div style="margin-top:1.25rem;display:flex;gap:.75rem;justify-content:flex-end;">' +
                    '<button id="_printTTBtn"  style="padding:.5rem 1rem;border:1px solid #d1d5db;color:#374151;border-radius:.5rem;cursor:pointer;font-size:.875rem;background:#fff;"><i class="fas fa-print" style="margin-right:.25rem;"></i>Print</button>' +
                    '<button id="_closeTTBtn2" style="padding:.5rem 1rem;background:#2563eb;color:#fff;border:none;border-radius:.5rem;cursor:pointer;font-size:.875rem;">Close</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(m);
    document.getElementById('_closeTimetableBtn').addEventListener('click', closeTimetableModal);
    document.getElementById('_closeTTBtn2').addEventListener('click',       closeTimetableModal);
    document.getElementById('_printTTBtn').addEventListener('click',        printTimetable);
    m.addEventListener('click', function (e) { if (e.target === m) closeTimetableModal(); });
}

function showExamTimetable(examId) {
    var ex = currentExams.find(function (e) { return e.id === examId; });
    if (!ex) { showToast('Exam not found', 'error'); return; }

    setEl('modalExamName',     ex.name);
    setEl('modalExamDetails',  ex.className + ' \u2013 Section ' + ex.section + ' | ' + ex.academicYear);
    setEl('modalExamType',     formatExamType(ex.type));
    setEl('modalTotalSubjects',ex.subjects.length);
    setEl('modalTotalMarks',   ex.subjects.reduce(function (t, s) { return t + (s.maxMarks || 0); }, 0));
    setEl('modalDescription',  ex.description || 'No description provided.');

    if (ex.startDate && ex.endDate) {
        var days = Math.ceil((new Date(ex.endDate + 'T00:00:00') - new Date(ex.startDate + 'T00:00:00')) / 86400000) + 1;
        setEl('modalDuration', days + ' day' + (days !== 1 ? 's' : ''));
    } else setEl('modalDuration', 'TBA');

    var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var tbody    = document.getElementById('timetableModalBody');
    tbody.innerHTML = '';

    if (!ex.subjects.length) {
        tbody.innerHTML = '<tr><td colspan="10" style="padding:2rem;text-align:center;color:#9ca3af;">No subjects found</td></tr>';
    } else {
        var base = new Date(ex.startDate + 'T00:00:00');
        ex.subjects.forEach(function (s, i) {
            var d    = new Date(base);
            d.setDate(base.getDate() + i);
            var time = (s.startTime && s.endTime) ? s.startTime + ' \u2013 ' + s.endTime : '10:00 \u2013 13:00';
            var dur  = '3 hrs';
            if (s.startTime && s.endTime) {
                try {
                    var sh = parseInt(s.startTime.split(':')[0]), sm = parseInt(s.startTime.split(':')[1]);
                    var eh = parseInt(s.endTime.split(':')[0]),   em = parseInt(s.endTime.split(':')[1]);
                    var mins = (eh * 60 + em) - (sh * 60 + sm);
                    dur = mins >= 60 ? Math.floor(mins / 60) + 'h' + (mins % 60 ? ' ' + (mins % 60) + 'm' : '') : mins + 'm';
                } catch (_) {}
            }
            var tr = document.createElement('tr');
            tr.style.background = i % 2 === 0 ? '#fff' : '#f9fafb';
            var cells = [
                i + 1,
                fmtDate(d.toISOString().split('T')[0]),
                dayNames[d.getDay()],
                '<strong>' + (s.name || s.subjectName) + '</strong>',
                time, dur,
                '<span style="color:#2563eb;font-weight:600;">' + (s.maxMarks || 100) + '</span>',
                s.passingMarks || 33,
                s.roomNumber   || 'TBA',
                s.invigilator  || 'TBA'
            ];
            tr.innerHTML = cells.map(function (c) {
                return '<td style="padding:.75rem 1rem;border-bottom:1px solid #f3f4f6;white-space:nowrap;">' + c + '</td>';
            }).join('');
            tbody.appendChild(tr);
        });
    }

    var m = document.getElementById('timetableModal');
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTimetableModal() {
    var m = document.getElementById('timetableModal');
    if (m) m.style.display = 'none';
    document.body.style.overflow = '';
}

function printTimetable() {
    var inner = document.querySelector('#timetableModal > div');
    if (!inner) return;
    var w = window.open('', '_blank');
    w.document.write('<html><head><title>Exam Timetable</title>' +
        '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">' +
        '<style>body{font-family:sans-serif;padding:2rem;}button{display:none!important;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #e5e7eb;padding:.5rem .75rem;text-align:left;font-size:.8rem;}thead{background:#f9fafb;}</style>' +
        '</head><body>' + inner.outerHTML + '</body></html>');
    w.document.close();
    setTimeout(function () { w.print(); w.close(); }, 600);
}

// ============= TIMETABLE TAB =============
function populateTimetableDropdown() {
    var sel = document.getElementById('timetableExam');
    if (!sel) return;
    sel.innerHTML = '<option value="">Choose Exam</option>';
    currentExams.forEach(function (ex) {
        var o = document.createElement('option');
        o.value = ex.id;
        o.textContent = ex.name + ' (' + ex.academicYear + ') \u2013 ' + ex.className;
        sel.appendChild(o);
    });
}

function loadTimetableTab() {
    var examId = document.getElementById('timetableExam') ? document.getElementById('timetableExam').value : '';
    var cls    = document.getElementById('timetableClass') ? document.getElementById('timetableClass').value : '';
    if (!examId) { showToast('Please select an exam', 'error'); return; }
    if (!cls)    { showToast('Please select a class', 'error'); return; }
    var ex = currentExams.find(function (e) { return String(e.id) === String(examId); });
    if (!ex) { showToast('Exam not found', 'error'); return; }

    showLoading();
    setTimeout(function () {
        var tbody = document.getElementById('timetableBody');
        if (!tbody) { hideLoading(); return; }
        tbody.innerHTML = '';

        if (!ex.subjects.length) {
            tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No subjects found for this exam</td></tr>';
            hideLoading(); return;
        }

        var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var base     = new Date(ex.startDate + 'T00:00:00');
        ex.subjects.forEach(function (s, i) {
            var d    = new Date(base);
            d.setDate(base.getDate() + i);
            var time = (s.startTime && s.endTime) ? s.startTime + ' \u2013 ' + s.endTime : '10:00 \u2013 13:00';
            var dur  = '3 hrs';
            if (s.startTime && s.endTime) {
                try {
                    var sh = parseInt(s.startTime.split(':')[0]), sm = parseInt(s.startTime.split(':')[1]);
                    var eh = parseInt(s.endTime.split(':')[0]),   em = parseInt(s.endTime.split(':')[1]);
                    var mins = (eh * 60 + em) - (sh * 60 + sm);
                    dur = mins >= 60 ? Math.floor(mins / 60) + 'h' + (mins % 60 ? ' ' + (mins % 60) + 'm' : '') : mins + 'm';
                } catch (_) {}
            }
            var tr = document.createElement('tr');
            tr.className = i % 2 === 0 ? 'bg-white' : 'bg-gray-50';
            tr.innerHTML =
                '<td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">' + fmtDate(d.toISOString().split('T')[0]) + '</td>' +
                '<td class="px-6 py-4 text-sm text-gray-700">' + dayNames[d.getDay()] + '</td>' +
                '<td class="px-6 py-4 text-sm font-medium text-gray-900">' + (s.name || s.subjectName) + '</td>' +
                '<td class="px-6 py-4 text-sm text-gray-700">' + time + '</td>' +
                '<td class="px-6 py-4 text-sm text-gray-700">' + dur + '</td>' +
                '<td class="px-6 py-4 text-sm font-semibold text-blue-700">' + (s.maxMarks || 100) + '</td>' +
                '<td class="px-6 py-4 text-sm"></td>';

            var viewBtn = document.createElement('button');
            viewBtn.className = 'text-blue-600 hover:text-blue-800 text-xs border border-blue-300 rounded px-2 py-1';
            viewBtn.innerHTML = '<i class="fas fa-expand mr-1"></i>Full View';
            (function (examIdCaptured) {
                viewBtn.addEventListener('click', function () { showExamTimetable(examIdCaptured); });
            })(ex.id);
            tr.querySelector('td:last-child').appendChild(viewBtn);
            tbody.appendChild(tr);
        });
        showToast('Timetable loaded: ' + ex.name, 'success');
        hideLoading();
    }, 300);
}

// ============= SIDEBAR =============
function setupSidebar() {
    var sidebar  = document.getElementById('sidebar');
    var toggle   = document.getElementById('sidebarToggle');
    var overlay  = document.getElementById('sidebarOverlay');
    var main     = document.getElementById('mainContent');
    if (!sidebar || !toggle) return;

    var mobile    = window.innerWidth < 1024;
    var collapsed = false;

    toggle.addEventListener('click', function () {
        if (mobile) {
            var open = sidebar.classList.toggle('mobile-open');
            if (overlay) overlay.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        } else {
            collapsed = !collapsed;
            sidebar.classList.toggle('collapsed', collapsed);
            if (main) main.classList.toggle('sidebar-collapsed', collapsed);
        }
    });
    if (overlay) {
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    window.addEventListener('resize', function () {
        var was = mobile;
        mobile = window.innerWidth < 1024;
        if (was && !mobile) {
            sidebar.classList.remove('mobile-open');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) window.location.href = '/login.html';
        });
    }
}

// ============= DROPDOWNS =============
function setupDropdowns() {
    var pairs = [['notificationsBtn','notificationsDropdown'],['userMenuBtn','userMenuDropdown']];
    pairs.forEach(function (pair) {
        var btn = document.getElementById(pair[0]);
        var dd  = document.getElementById(pair[1]);
        if (btn && dd) {
            btn.addEventListener('click', function (e) { e.stopPropagation(); dd.classList.toggle('hidden'); });
        }
    });
    document.addEventListener('click', function () {
        ['notificationsDropdown','userMenuDropdown'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
    });
}

// ============= UTILITIES =============
function fmtDate(str) {
    if (!str) return 'TBA';
    try {
        var d = new Date(str.indexOf('T') !== -1 ? str : str + 'T00:00:00');
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (_) { return str; }
}

function formatExamType(t) {
    var map = { TERM1:'Term 1 Exam', TERM2:'Term 2 Exam', TERM3:'Term 3 Exam', UNIT_TEST:'Unit Test', MID_TERM:'Mid Term Exam', FINAL:'Final Exam', PRACTICAL:'Practical', VIVA:'Viva Voce' };
    return map[t] || t || 'Exam';
}

function getStatusClass(s) {
    var n = (s || '').toUpperCase();
    if (n === 'SCHEDULED' || n === 'UPCOMING') return 'bg-green-100 text-green-700';
    if (n === 'ONGOING')   return 'bg-yellow-100 text-yellow-700';
    if (n === 'COMPLETED') return 'bg-gray-100 text-gray-600';
    return 'bg-blue-100 text-blue-700';
}

function getStatusText(s) {
    var n = (s || '').toUpperCase();
    if (n === 'SCHEDULED' || n === 'UPCOMING') return 'UPCOMING';
    if (n === 'ONGOING')   return 'ONGOING';
    if (n === 'COMPLETED') return 'COMPLETED';
    return 'SCHEDULED';
}

// ============= TOAST =============
function showToast(msg, type) {
    type = type || 'info';
    var box = document.getElementById('toastContainer');
    if (!box) return;
    var colors = {
        success: 'background:#f0fdf4;border:1px solid #4ade80;color:#166534;',
        error:   'background:#fef2f2;border:1px solid #f87171;color:#991b1b;',
        warning: 'background:#fffbeb;border:1px solid #fbbf24;color:#92400e;',
        info:    'background:#eff6ff;border:1px solid #60a5fa;color:#1e40af;'
    };
    var icons = { success:'fa-check-circle', error:'fa-exclamation-circle', warning:'fa-exclamation-triangle', info:'fa-info-circle' };
    var t = document.createElement('div');
    t.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.75rem 1rem;border-radius:.75rem;box-shadow:0 4px 12px rgba(0,0,0,.1);min-width:260px;max-width:380px;margin-bottom:.5rem;' + (colors[type] || colors.info);
    t.innerHTML =
        '<div style="display:flex;align-items:center;gap:.5rem;font-size:.875rem;font-weight:500;"><i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + msg + '</span></div>' +
        '<button style="background:none;border:none;cursor:pointer;font-size:1.125rem;opacity:.6;line-height:1;">&times;</button>';
    t.querySelector('button').addEventListener('click', function () { t.remove(); });
    box.appendChild(t);
    setTimeout(function () {
        t.style.transition = 'opacity .3s';
        t.style.opacity = '0';
        setTimeout(function () { if (t.parentNode) t.remove(); }, 300);
    }, 4000);
}

function showLoading() { var el = document.getElementById('loadingOverlay'); if (el) el.classList.remove('hidden'); }
function hideLoading() { var el = document.getElementById('loadingOverlay'); if (el) el.classList.add('hidden');    }

// Expose for any edge case usage
window.showExamTimetable   = showExamTimetable;
window.closeTimetableModal = closeTimetableModal;
window.openEditModal       = openEditModal;
window.closeEditModal      = closeEditModal;
window.openStatusModal     = openStatusModal;
window.closeStatusModal    = closeStatusModal;
window.deleteExam          = deleteExam;
window.loadExamsFromAPI    = loadExams;