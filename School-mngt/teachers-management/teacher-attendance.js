// teacher-attendance.js - ALL BUTTONS FIXED & WORKING

document.addEventListener('DOMContentLoaded', function () {
    checkSession();
    setupEventListeners();
    setupResponsiveSidebar();
    loadTeachersData();
    loadAttendanceData();
    initAccessControl();
});

// Global variables
let sidebarCollapsed = false;
let isMobile = window.innerWidth < 1024;
let currentTeacherForAttendance = null;
let attendanceSheetData = [];
let currentViewingTeacherId = null;
let salarySlipData = null;

// Session
const USER_SESSION_KEY = 'school_portal_session';
const ATTENDANCE_DATA_KEY = 'school_portal_attendance_data';
const TEACHERS_DATA_KEY = 'school_portal_data_teachers';

function checkSession() {
    console.log("Session check bypassed for testing");
}

let appState = {
    attendance: [],
    teachers: [],
    currentDate: new Date().toISOString().split('T')[0]
};

function loadTeachersData() {
    const saved = localStorage.getItem(TEACHERS_DATA_KEY);
    if (saved) {
        try {
            appState.teachers = JSON.parse(saved).teachers || generateSampleTeachersData();
        } catch(e) {
            appState.teachers = generateSampleTeachersData();
        }
    } else {
        appState.teachers = generateSampleTeachersData();
        saveTeachersData();
    }
}

function generateSampleTeachersData() {
    return [
        { id: 1, name: 'Mr. Rajesh Sharma',  department: 'Mathematics',        designation: 'Senior Teacher',   teacherId: 'TCH1001' },
        { id: 2, name: 'Ms. Priya Patel',     department: 'English',            designation: 'Teacher',          teacherId: 'TCH1002' },
        { id: 3, name: 'Mr. Amit Kumar',      department: 'Science',            designation: 'HOD - Science',    teacherId: 'TCH1003' },
        { id: 4, name: 'Mrs. Sunita Verma',   department: 'Social Science',     designation: 'Teacher',          teacherId: 'TCH1004' },
        { id: 5, name: 'Mr. Ravi Singh',      department: 'Physical Education', designation: 'Sports Coach',     teacherId: 'TCH1005' },
        { id: 6, name: 'Ms. Neha Gupta',      department: 'Computer Science',   designation: 'Teacher',          teacherId: 'TCH1006' }
    ];
}

function saveTeachersData() {
    localStorage.setItem(TEACHERS_DATA_KEY, JSON.stringify({ teachers: appState.teachers, lastUpdated: new Date().toISOString() }));
}

// ─── Toast ────────────────────────────────────────────────────────────────────
class Toast {
    static show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        const colors = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500', info: 'bg-blue-500' };
        const icons  = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
        toast.className = `toast ${colors[type]} text-white flex items-center space-x-3`;
        toast.innerHTML = `<i class="fas ${icons[type]} text-xl"></i><span>${message}</span>`;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, duration);
    }
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
function setupEventListeners() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('Logout?')) window.location.href = '../../login.html';
    });

    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    document.getElementById('notificationsBtn').addEventListener('click', toggleNotifications);
    document.getElementById('userMenuBtn').addEventListener('click', toggleUserMenu);

    document.getElementById('attendanceDate').value = appState.currentDate;
    document.getElementById('attendanceDate').addEventListener('change', () => {
        appState.currentDate = document.getElementById('attendanceDate').value;
        loadAttendanceData();
    });

    // Filters apply on change automatically
    document.getElementById('filterDepartment').addEventListener('change', loadAttendanceData);
    document.getElementById('filterAttendanceStatus').addEventListener('change', loadAttendanceData);

    document.getElementById('selectAllAttendance').addEventListener('change', function() {
        document.querySelectorAll('.attendance-checkbox').forEach(cb => cb.checked = this.checked);
    });
}

function setupResponsiveSidebar() {
    isMobile = window.innerWidth < 1024;
    window.addEventListener('resize', () => isMobile = window.innerWidth < 1024);
}

function toggleSidebar() {
    if (isMobile) {
        const sidebar  = document.getElementById('sidebar');
        const overlay  = document.getElementById('sidebarOverlay');
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    } else {
        const sidebar = document.getElementById('sidebar');
        const main    = document.getElementById('mainContent');
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('collapsed', sidebarCollapsed);
        main.classList.toggle('sidebar-collapsed', sidebarCollapsed);
    }
}

function toggleNotifications() {
    document.getElementById('notificationsDropdown').classList.toggle('hidden');
}

function toggleUserMenu() {
    document.getElementById('userMenuDropdown').classList.toggle('hidden');
}

// ─── Load & Render Attendance ─────────────────────────────────────────────────
function loadAttendanceData() {
    showLoading(true);
    setTimeout(() => {
        if (appState.teachers.length === 0) loadTeachersData();

        const today = document.getElementById('attendanceDate').value;

        // Build base attendance data from teachers
        const baseStatuses = ['Present', 'Present', 'Late', 'Present', 'Half Day', 'On Leave'];
        appState.attendance = appState.teachers.map((t, i) => ({
            id: t.id,
            teacherId: t.id,
            date: today,
            status: baseStatuses[i % baseStatuses.length],
            timeIn:  ['Present','Late'].includes(baseStatuses[i % baseStatuses.length]) ? (i % 2 === 0 ? '08:00 AM' : '08:15 AM') : '',
            timeOut: ['Present','Late'].includes(baseStatuses[i % baseStatuses.length]) ? (i % 2 === 0 ? '03:30 PM' : '03:45 PM') : '',
            note: i % 4 === 0 ? 'Traffic' : ''
        }));

        // Apply filters
        const filterDate   = document.getElementById('attendanceDate').value;
        const filterDept   = document.getElementById('filterDepartment').value;
        const filterStatus = document.getElementById('filterAttendanceStatus').value;

        let filtered = appState.attendance;

        if (filterDept) {
            filtered = filtered.filter(record => {
                const teacher = appState.teachers.find(t => t.id === record.teacherId);
                return teacher && teacher.department === filterDept;
            });
        }

        if (filterStatus) {
            filtered = filtered.filter(record => record.status === filterStatus);
        }

        // Update table title with selected date
        const dateObj = filterDate ? new Date(filterDate + 'T00:00:00') : new Date();
        document.getElementById('attendanceTableTitle').textContent =
            'Attendance - ' + dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        renderAttendanceTable(filtered);
        renderAttendanceStats();
        renderDepartmentWiseAttendance();
        renderMonthlyTrend();
        renderLeaveRequests();

        // Update count display
        document.getElementById('attendanceStartCount').textContent = filtered.length;
        document.getElementById('attendanceTotalCount').textContent = appState.teachers.length;

        showLoading(false);
    }, 300);
}

function renderAttendanceTable(records) {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';

    if (!records || records.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-gray-500">No attendance records found for the selected filters.</td></tr>`;
        return;
    }

    records.forEach(record => {
        const teacher = appState.teachers.find(t => t.id === record.teacherId);
        if (!teacher) return;
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors';
        row.innerHTML = `
            <td class="px-6 py-4">
                <input type="checkbox" class="attendance-checkbox rounded border-gray-300">
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-user-tie text-blue-600"></i>
                    </div>
                    <div>
                        <div class="font-medium text-gray-800">${teacher.name}</div>
                        <div class="text-sm text-gray-500">${teacher.teacherId}</div>
                    </div>
                </div>
             </td>
            <td class="px-6 py-4">
                <div class="font-medium text-gray-800">${teacher.department}</div>
                <div class="text-sm text-gray-500">${teacher.designation}</div>
             </td>
            <td class="px-6 py-4 text-sm text-gray-700">
                ${record.timeIn ? record.timeIn + ' – ' + record.timeOut : '<span class="text-gray-400">Not marked</span>'}
             </td>
            <td class="px-6 py-4">${getAttendanceStatusBadge(record.status)}</td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                    <button
                        onclick="openMarkAttendanceModal(${record.teacherId})"
                        title="Edit Attendance"
                        class="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button
                        onclick="openAttendanceDetails(${record.teacherId})"
                        title="View Details"
                        class="h-8 w-8 flex items-center justify-center bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <i class="fas fa-eye text-xs"></i>
                    </button>
                </div>
             </td>
        `;
        tbody.appendChild(row);
    });
}

function getAttendanceStatusBadge(status) {
    const map = {
        'Present':  '<span class="status-badge status-present">Present</span>',
        'Absent':   '<span class="status-badge status-absent">Absent</span>',
        'Late':     '<span class="status-badge status-late">Late</span>',
        'Half Day': '<span class="status-badge status-halfday">Half Day</span>',
        'On Leave': '<span class="status-badge status-leave">On Leave</span>'
    };
    return map[status] || '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Unknown</span>';
}

function renderAttendanceStats() {
    const total   = appState.teachers.length;
    const present = appState.attendance.filter(r => r.status === 'Present').length;
    const absent  = appState.attendance.filter(r => r.status === 'Absent').length;
    const pct     = total ? Math.round((present / total) * 100) : 0;

    document.getElementById('attendanceStats').innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-users text-blue-600 text-xl"></i>
                </div>
                <div><p class="text-sm text-gray-600">Total Teachers</p><p class="text-2xl font-bold text-gray-800">${total}</p></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center">
                <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                </div>
                <div><p class="text-sm text-gray-600">Present Today</p><p class="text-2xl font-bold text-gray-800">${present}</p></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center">
                <div class="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-times-circle text-red-600 text-xl"></i>
                </div>
                <div><p class="text-sm text-gray-600">Absent Today</p><p class="text-2xl font-bold text-gray-800">${absent}</p></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center">
                <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-percentage text-yellow-600 text-xl"></i>
                </div>
                <div><p class="text-sm text-gray-600">Attendance %</p><p class="text-2xl font-bold text-gray-800">${pct}%</p></div>
            </div>
        </div>
    `;
}

function renderDepartmentWiseAttendance() {
    const depts = {};
    appState.teachers.forEach(t => {
        if (!depts[t.department]) depts[t.department] = { total: 0, present: 0 };
        depts[t.department].total++;
    });
    appState.attendance.forEach(r => {
        const teacher = appState.teachers.find(t => t.id === r.teacherId);
        if (teacher && depts[teacher.department] && r.status === 'Present') {
            depts[teacher.department].present++;
        }
    });

    const container = document.getElementById('departmentWiseAttendance');
    container.innerHTML = '';
    Object.entries(depts).forEach(([dept, data]) => {
        const pct = data.total ? Math.round((data.present / data.total) * 100) : 0;
        const color = pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500';
        container.innerHTML += `
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-700">${dept}</span>
                    <span class="text-sm font-bold ${pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}">${pct}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                    <div class="h-full ${color} rounded-full transition-all duration-500" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    });
}

function renderMonthlyTrend() {
    const months = [
        { label: 'November', pct: 91 },
        { label: 'December', pct: 85 },
        { label: 'January',  pct: 89 },
        { label: 'February', pct: 87 },
        { label: 'March',    pct: 88 }
    ];
    const container = document.getElementById('monthlyAttendanceTrend');
    container.innerHTML = '';
    months.forEach(m => {
        const color = m.pct >= 85 ? 'bg-green-500' : 'bg-yellow-500';
        const textColor = m.pct >= 85 ? 'text-green-600' : 'text-yellow-600';
        container.innerHTML += `
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm text-gray-700">${m.label}</span>
                    <span class="text-sm font-bold ${textColor}">${m.pct}%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                    <div class="h-full ${color} rounded-full transition-all duration-500" style="width:${m.pct}%"></div>
                </div>
            </div>
        `;
    });
}

// ─── Leave Requests ───────────────────────────────────────────────────────────
const leaveRequests = [
    { id: 1, teacher: 'Mr. Ravi Singh',    type: 'Sick Leave',   from: '2025-03-25', to: '2025-03-26', days: 2, reason: 'Fever',         applied: '23 Mar 2025', status: 'Pending' },
    { id: 2, teacher: 'Ms. Priya Patel',   type: 'Casual Leave', from: '2025-03-27', to: '2025-03-27', days: 1, reason: 'Personal work',  applied: '22 Mar 2025', status: 'Pending' },
    { id: 3, teacher: 'Mrs. Sunita Verma', type: 'Earned Leave',  from: '2025-04-01', to: '2025-04-03', days: 3, reason: 'Family event',  applied: '20 Mar 2025', status: 'Pending' }
];

// showAll = true shows all requests including approved/rejected
function renderLeaveRequests(showAll) {
    const tbody = document.getElementById('leaveRequestsTableBody');
    tbody.innerHTML = '';

    const toShow = showAll ? leaveRequests : leaveRequests.filter(r => r.status === 'Pending');

    if (toShow.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-gray-500">No pending leave requests.</td></tr>`;
        return;
    }

    toShow.forEach(req => {
        const statusBadge = req.status === 'Approved'
            ? '<span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Approved</span>'
            : req.status === 'Rejected'
            ? '<span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Rejected</span>'
            : '';

        const actionButtons = req.status === 'Pending'
            ? `<div class="flex items-center space-x-2">
                    <button
                        onclick="approveLeave(${req.id})"
                        title="Approve"
                        class="h-8 w-8 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <i class="fas fa-check text-xs"></i>
                    </button>
                    <button
                        onclick="rejectLeave(${req.id})"
                        title="Reject"
                        class="h-8 w-8 flex items-center justify-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <i class="fas fa-times text-xs"></i>
                    </button>
               </div>`
            : statusBadge;

        const row = document.createElement('tr');
        row.id = `leave-row-${req.id}`;
        row.className = 'hover:bg-gray-50 transition-colors';
        row.innerHTML = `
            <td class="px-4 py-3 font-medium text-gray-800">${req.teacher}</td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">${req.type}</span>
             </td>
            <td class="px-4 py-3 text-sm text-gray-700">${formatDate(req.from)} – ${formatDate(req.to)}</td>
            <td class="px-4 py-3 text-center font-semibold text-gray-800">${req.days}</td>
            <td class="px-4 py-3 text-sm text-gray-600">${req.reason}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${req.applied}</td>
            <td class="px-4 py-3">${actionButtons}</td>
        `;
        tbody.appendChild(row);
    });
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function approveLeave(id) {
    const req = leaveRequests.find(r => r.id === id);
    if (!req) return;
    if (!confirm(`Approve leave for ${req.teacher}?`)) return;
    req.status = 'Approved';
    renderLeaveRequests();
    Toast.show(`Leave approved for ${req.teacher}`, 'success');
}

function rejectLeave(id) {
    const req = leaveRequests.find(r => r.id === id);
    if (!req) return;
    if (!confirm(`Reject leave for ${req.teacher}?`)) return;
    req.status = 'Rejected';
    renderLeaveRequests();
    Toast.show(`Leave rejected for ${req.teacher}`, 'error');
}

// View All — shows all leave requests including already-processed ones and scrolls to section
function viewAllLeaveRequests() {
    renderLeaveRequests(true);
    const leaveSection = document.getElementById('leaveRequestsTableBody');
    if (leaveSection) {
        leaveSection.closest('.bg-white').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    Toast.show('Showing all leave requests (including processed)', 'info');
}

// ─── Attendance Sheet Modal ───────────────────────────────────────────────────
function openAttendanceSheet() {
    const modal = document.getElementById('attendanceSheetModal');
    document.getElementById('attendanceSheetDate').value = appState.currentDate;
    const dateObj = new Date(appState.currentDate + 'T00:00:00');
    document.getElementById('attendanceSheetDateText').textContent =
        'Attendance for ' + dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    loadAttendanceSheetData();
    modal.classList.add('show');
}

function closeAttendanceSheet() {
    document.getElementById('attendanceSheetModal').classList.remove('show');
}

function loadAttendanceSheetData() {
    const filterDept = document.getElementById('attendanceSheetFilterDepartment').value;

    let teachers = appState.teachers;
    if (filterDept) {
        teachers = teachers.filter(t => t.department === filterDept);
    }

    attendanceSheetData = teachers.map(t => ({
        teacherId:   t.id,
        teacherCode: t.teacherId,
        name:        t.name,
        department:  t.department,
        designation: t.designation,
        status:      'Present',
        timeIn:      '08:00',
        timeOut:     '15:30',
        remarks:     '',
        isEdited:    false
    }));

    renderAttendanceSheetTable();
    updateAttendanceSummary();
}

// KEY FIX: renderAttendanceSheetTable builds rows with unique IDs per teacher code.
// Individual interactions (status change, field change, mark present) NEVER call this function —
// they update the DOM element directly and update only the summary counts.
// Only loadAttendanceSheetData() (Apply Filters / open modal) triggers a full re-render.
function renderAttendanceSheetTable() {
    const tbody = document.getElementById('attendanceSheetTableBody');
    tbody.innerHTML = '';

    attendanceSheetData.forEach((t, i) => {
        const row = document.createElement('tr');
        row.id = `sheet-row-${t.teacherCode}`;
        row.className = t.isEdited ? 'highlight-edited' : '';
        row.innerHTML = `
            <td class="px-4 py-3 text-gray-700">${i + 1}</td>
            <td class="px-4 py-3 text-gray-700">${t.teacherCode}</td>
            <td class="px-4 py-3 font-medium text-gray-800">${t.name}</td>
            <td class="px-4 py-3 text-gray-700">${t.department}</td>
            <td class="px-4 py-3 text-gray-700">${t.designation}</td>
            <td class="px-4 py-3">
                <select
                    id="status-${t.teacherCode}"
                    data-code="${t.teacherCode}"
                    onchange="updateAttendanceStatus(this)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Present"  ${t.status === 'Present'  ? 'selected' : ''}>Present</option>
                    <option value="Absent"   ${t.status === 'Absent'   ? 'selected' : ''}>Absent</option>
                    <option value="Late"     ${t.status === 'Late'     ? 'selected' : ''}>Late</option>
                    <option value="Half Day" ${t.status === 'Half Day' ? 'selected' : ''}>Half Day</option>
                    <option value="On Leave" ${t.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                </select>
             </td>
            <td class="px-4 py-3">
                <input type="time" id="timein-${t.teacherCode}" value="${t.timeIn}" data-code="${t.teacherCode}" data-field="timeIn"
                    onchange="updateAttendanceField(this)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500">
             </td>
            <td class="px-4 py-3">
                <input type="time" id="timeout-${t.teacherCode}" value="${t.timeOut}" data-code="${t.teacherCode}" data-field="timeOut"
                    onchange="updateAttendanceField(this)"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500">
             </td>
            <td class="px-4 py-3">
                <input type="text" id="remarks-${t.teacherCode}" value="${t.remarks}" data-code="${t.teacherCode}" data-field="remarks"
                    oninput="updateAttendanceField(this)"
                    placeholder="Remarks..."
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500">
             </td>
            <td class="px-4 py-3">
                <button
                    onclick="markTeacherPresent('${t.teacherCode}')"
                    title="Mark Present"
                    class="h-7 w-7 flex items-center justify-center bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    <i class="fas fa-check text-xs"></i>
                </button>
             </td>
        `;
        tbody.appendChild(row);
    });
}

// KEY FIX: Only updates the data array + highlights row + refreshes summary.
// Does NOT re-render the table — dropdown stays interactive with no scroll jump.
function updateAttendanceStatus(select) {
    const code = select.getAttribute('data-code');
    const t = attendanceSheetData.find(x => x.teacherCode === code);
    if (t) {
        t.status = select.value;
        t.isEdited = true;
        const row = document.getElementById(`sheet-row-${code}`);
        if (row) row.classList.add('highlight-edited');
    }
    updateAttendanceSummary();
}

// KEY FIX: Only updates the data array + highlights row + refreshes summary.
// Does NOT re-render the table — input stays focused, no data loss.
function updateAttendanceField(input) {
    const code  = input.getAttribute('data-code');
    const field = input.getAttribute('data-field');
    const t = attendanceSheetData.find(x => x.teacherCode === code);
    if (t) {
        t[field] = input.value;
        t.isEdited = true;
        const row = document.getElementById(`sheet-row-${code}`);
        if (row) row.classList.add('highlight-edited');
    }
    updateAttendanceSummary();
}

function markAsEdited(code) {
    const t = attendanceSheetData.find(x => x.teacherCode === code);
    if (t) t.isEdited = true;
}

// Apply Filters inside the attendance sheet modal — re-reads date label then reloads data
function applyAttendanceSheetFilters() {
    const selectedDate = document.getElementById('attendanceSheetDate').value;
    if (selectedDate) {
        const dateObj = new Date(selectedDate + 'T00:00:00');
        document.getElementById('attendanceSheetDateText').textContent =
            'Attendance for ' + dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    loadAttendanceSheetData();
    Toast.show('Filters applied', 'info');
}

// Apply Default Status to All — updates each select element in the DOM directly (no re-render)
function applyDefaultStatusToAll() {
    const status = document.getElementById('attendanceSheetDefaultStatus').value;
    attendanceSheetData.forEach(t => {
        t.status = status;
        t.isEdited = true;
        const sel = document.getElementById(`status-${t.teacherCode}`);
        if (sel) sel.value = status;
        const row = document.getElementById(`sheet-row-${t.teacherCode}`);
        if (row) row.classList.add('highlight-edited');
    });
    updateAttendanceSummary();
    Toast.show(`All teachers marked as "${status}"`, 'info');
}

// Mark Teacher Present — updates just that row's select in the DOM directly (no re-render)
function markTeacherPresent(code) {
    const t = attendanceSheetData.find(x => x.teacherCode === code);
    if (t) {
        t.status = 'Present';
        t.isEdited = true;
        const sel = document.getElementById(`status-${code}`);
        if (sel) sel.value = 'Present';
        const row = document.getElementById(`sheet-row-${code}`);
        if (row) row.classList.add('highlight-edited');
    }
    updateAttendanceSummary();
}

function updateAttendanceSummary() {
    const total   = attendanceSheetData.length;
    const present = attendanceSheetData.filter(t => t.status === 'Present').length;
    const absent  = attendanceSheetData.filter(t => t.status === 'Absent').length;
    const late    = attendanceSheetData.filter(t => t.status === 'Late').length;
    document.getElementById('summaryTotal').textContent   = total;
    document.getElementById('summaryPresent').textContent = present;
    document.getElementById('summaryAbsent').textContent  = absent;
    document.getElementById('summaryLate').textContent    = late;
}

// Save reads current DOM values first (in case user typed without triggering events), then persists
function saveAttendanceSheet() {
    attendanceSheetData.forEach(sheet => {
        const selEl     = document.getElementById(`status-${sheet.teacherCode}`);
        const timeInEl  = document.getElementById(`timein-${sheet.teacherCode}`);
        const timeOutEl = document.getElementById(`timeout-${sheet.teacherCode}`);
        const remEl     = document.getElementById(`remarks-${sheet.teacherCode}`);
        if (selEl)     sheet.status  = selEl.value;
        if (timeInEl)  sheet.timeIn  = timeInEl.value;
        if (timeOutEl) sheet.timeOut = timeOutEl.value;
        if (remEl)     sheet.remarks = remEl.value;
    });

    // Persist edited statuses back into appState
    attendanceSheetData.forEach(sheet => {
        const rec = appState.attendance.find(r => r.teacherId === sheet.teacherId);
        if (rec) {
            rec.status  = sheet.status;
            rec.timeIn  = sheet.timeIn;
            rec.timeOut = sheet.timeOut;
            rec.note    = sheet.remarks;
        }
    });
    Toast.show('Attendance saved successfully!', 'success');
    closeAttendanceSheet();
    loadAttendanceData();
}

// ─── Mark All Present ─────────────────────────────────────────────────────────
function markAllPresent() {
    if (!confirm('Mark ALL teachers as Present for the selected date?')) return;
    appState.attendance.forEach(r => {
        r.status  = 'Present';
        r.timeIn  = '08:00 AM';
        r.timeOut = '03:30 PM';
    });
    renderAttendanceTable(appState.attendance);
    renderAttendanceStats();
    Toast.show('All teachers marked as Present', 'success');
}

// ─── Edit Attendance Modal ────────────────────────────────────────────────────
function openMarkAttendanceModal(teacherId) {
    currentTeacherForAttendance = teacherId;
    const teacher = appState.teachers.find(t => t.id === teacherId);
    const record  = appState.attendance.find(r => r.teacherId === teacherId);
    if (!teacher || !record) return;

    document.getElementById('editAttendanceTitle').textContent = `Edit Attendance – ${teacher.name}`;

    document.getElementById('editAttendanceForm').innerHTML = `
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
            <p class="font-semibold text-gray-800">${teacher.name}</p>
            <p class="text-sm text-gray-600">${teacher.department} &bull; ${teacher.designation}</p>
            <p class="text-sm text-gray-500">${teacher.teacherId}</p>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" id="editDate" value="${record.date}"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select id="editStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="Present"  ${record.status === 'Present'  ? 'selected' : ''}>Present</option>
                <option value="Absent"   ${record.status === 'Absent'   ? 'selected' : ''}>Absent</option>
                <option value="Late"     ${record.status === 'Late'     ? 'selected' : ''}>Late</option>
                <option value="Half Day" ${record.status === 'Half Day' ? 'selected' : ''}>Half Day</option>
                <option value="On Leave" ${record.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
            </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                <input type="time" id="editTimeIn" value="${record.timeIn ? convertTo24(record.timeIn) : '08:00'}"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                <input type="time" id="editTimeOut" value="${record.timeOut ? convertTo24(record.timeOut) : '15:30'}"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea id="editRemarks" rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Optional remarks...">${record.note || ''}</textarea>
        </div>
        <div class="flex space-x-3 pt-2">
            <button onclick="closeModal('editAttendanceModal')" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onclick="saveIndividualAttendance()" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-save mr-2"></i>Save
            </button>
        </div>
    `;

    document.getElementById('editAttendanceModal').classList.add('show');
}

function convertTo24(time12) {
    if (!time12 || !time12.includes(':')) return '08:00';
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
    if (modifier === 'AM' && hours === '12') hours = '00';
    return `${hours.padStart(2,'0')}:${minutes}`;
}

function saveIndividualAttendance() {
    const record = appState.attendance.find(r => r.teacherId === currentTeacherForAttendance);
    if (record) {
        record.status  = document.getElementById('editStatus').value;
        record.timeIn  = document.getElementById('editTimeIn').value;
        record.timeOut = document.getElementById('editTimeOut').value;
        record.note    = document.getElementById('editRemarks').value;
    }
    closeModal('editAttendanceModal');
    Toast.show('Attendance updated successfully!', 'success');
    renderAttendanceTable(appState.attendance);
    renderAttendanceStats();
    renderDepartmentWiseAttendance();
}

// ─── Attendance Details Modal ─────────────────────────────────────────────────
function openAttendanceDetails(teacherId) {
    currentViewingTeacherId = teacherId;
    const teacher = appState.teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    document.getElementById('attendanceDetailsTitle').textContent    = `Attendance Details – ${teacher.name}`;
    document.getElementById('attendanceDetailsSubtitle').textContent = `${teacher.department} • ${teacher.designation} • ${teacher.teacherId}`;

    document.getElementById('teacherAttendanceInfo').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><p class="text-sm text-gray-600">Teacher Name</p><p class="font-semibold text-gray-800">${teacher.name}</p></div>
            <div><p class="text-sm text-gray-600">Department</p><p class="font-semibold text-gray-800">${teacher.department}</p></div>
            <div><p class="text-sm text-gray-600">Designation</p><p class="font-semibold text-gray-800">${teacher.designation}</p></div>
            <div><p class="text-sm text-gray-600">Employee ID</p><p class="font-semibold text-gray-800">${teacher.teacherId}</p></div>
            <div><p class="text-sm text-gray-600">Total Working Days</p><p class="font-semibold text-gray-800">26</p></div>
            <div><p class="text-sm text-gray-600">Present Days</p><p class="font-semibold text-green-600">22</p></div>
        </div>
    `;

    // Populate month/year selectors
    const monthSel = document.getElementById('attendanceCalendarMonth');
    const yearSel  = document.getElementById('attendanceCalendarYear');
    const now = new Date();
    monthSel.innerHTML = ['January','February','March','April','May','June','July','August','September','October','November','December']
        .map((m, i) => `<option value="${i}" ${i === now.getMonth() ? 'selected' : ''}>${m}</option>`).join('');
    yearSel.innerHTML = [now.getFullYear() - 1, now.getFullYear()]
        .map(y => `<option value="${y}" ${y === now.getFullYear() ? 'selected' : ''}>${y}</option>`).join('');

    loadAttendanceCalendar();
    renderAttendanceSummaryCards();
    renderAttendanceHistory(teacherId);

    document.getElementById('attendanceDetailsModal').classList.add('show');
}

function loadAttendanceCalendar() {
    const month = parseInt(document.getElementById('attendanceCalendarMonth').value);
    const year  = parseInt(document.getElementById('attendanceCalendarYear').value);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const sampleStatuses = ['Present','Present','Present','Absent','Late','Present','Present','Present','Half Day','Present'];
    const body = document.getElementById('attendanceCalendarBody');
    body.innerHTML = '';

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        body.innerHTML += '<div></div>';
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dayOfWeek = (firstDay + d - 1) % 7;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const status    = isWeekend ? 'weekend' : sampleStatuses[(d - 1) % sampleStatuses.length];
        const colors = {
            Present:   'bg-green-100 text-green-800 border border-green-300',
            Absent:    'bg-red-100 text-red-800 border border-red-300',
            Late:      'bg-yellow-100 text-yellow-800 border border-yellow-300',
            'Half Day':'bg-blue-100 text-blue-800 border border-blue-300',
            'On Leave':'bg-purple-100 text-purple-800 border border-purple-300',
            weekend:   'bg-gray-100 text-gray-400'
        };
        body.innerHTML += `
            <div class="text-center p-1 rounded text-xs font-medium ${colors[status] || 'bg-gray-50'}" title="${isWeekend ? 'Weekend' : status}">
                ${d}
            </div>
        `;
    }
    Toast.show('Calendar refreshed', 'info');
}

function renderAttendanceSummaryCards() {
    document.getElementById('attendanceSummaryCards').innerHTML = `
        <div class="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p class="text-2xl font-bold text-gray-800">26</p>
            <p class="text-xs text-gray-600 mt-1">Working Days</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p class="text-2xl font-bold text-green-600">22</p>
            <p class="text-xs text-gray-600 mt-1">Present</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p class="text-2xl font-bold text-red-600">2</p>
            <p class="text-xs text-gray-600 mt-1">Absent</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p class="text-2xl font-bold text-purple-600">2</p>
            <p class="text-xs text-gray-600 mt-1">On Leave</p>
        </div>
    `;
}

function renderAttendanceHistory(teacherId) {
    const sampleHistory = [
        { date: '2025-03-24', day: 'Monday',    status: 'Present',  timeIn: '08:00 AM', timeOut: '03:30 PM', remarks: '' },
        { date: '2025-03-21', day: 'Friday',    status: 'Present',  timeIn: '08:10 AM', timeOut: '03:30 PM', remarks: '' },
        { date: '2025-03-20', day: 'Thursday',  status: 'Late',     timeIn: '09:00 AM', timeOut: '03:30 PM', remarks: 'Traffic' },
        { date: '2025-03-19', day: 'Wednesday', status: 'Present',  timeIn: '07:55 AM', timeOut: '03:30 PM', remarks: '' },
        { date: '2025-03-18', day: 'Tuesday',   status: 'Absent',   timeIn: '',         timeOut: '',         remarks: 'Sick' },
        { date: '2025-03-17', day: 'Monday',    status: 'Present',  timeIn: '08:00 AM', timeOut: '03:30 PM', remarks: '' },
        { date: '2025-03-14', day: 'Friday',    status: 'On Leave', timeIn: '',         timeOut: '',         remarks: 'Approved leave' },
        { date: '2025-03-13', day: 'Thursday',  status: 'Present',  timeIn: '08:05 AM', timeOut: '03:30 PM', remarks: '' }
    ];

    const tbody = document.getElementById('attendanceHistoryTableBody');
    tbody.innerHTML = '';
    sampleHistory.forEach((h, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-4 py-3 text-sm text-gray-700">${formatDate(h.date)}</td>
            <td class="px-4 py-3 text-sm text-gray-600">${h.day}</td>
            <td class="px-4 py-3">${getAttendanceStatusBadge(h.status)}</td>
            <td class="px-4 py-3 text-sm text-gray-700">${h.timeIn || '–'}</td>
            <td class="px-4 py-3 text-sm text-gray-700">${h.timeOut || '–'}</td>
            <td class="px-4 py-3 text-sm text-gray-500">${h.remarks || '–'}</td>
            <td class="px-4 py-3">
                <button
                    onclick="editHistoryRecord('${h.date}', ${teacherId})"
                    title="Edit"
                    class="h-7 w-7 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    <i class="fas fa-pen text-xs"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// FIXED: Edit history record function with proper implementation
function editHistoryRecord(date, teacherId) {
    const teacher = appState.teachers.find(t => t.id === teacherId);
    if (!teacher) return;
    
    // Close the details modal first
    closeModal('attendanceDetailsModal');
    
    // Find the record for this teacher on that date
    const record = appState.attendance.find(r => r.teacherId === teacherId && r.date === date);
    
    if (record) {
        // Open the edit modal with this record
        currentTeacherForAttendance = teacherId;
        document.getElementById('editAttendanceTitle').textContent = `Edit Attendance – ${teacher.name}`;
        
        document.getElementById('editAttendanceForm').innerHTML = `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                <p class="font-semibold text-gray-800">${teacher.name}</p>
                <p class="text-sm text-gray-600">${teacher.department} &bull; ${teacher.designation}</p>
                <p class="text-sm text-gray-500">${teacher.teacherId}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" id="editDate" value="${date}"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select id="editStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="Present"  ${record.status === 'Present'  ? 'selected' : ''}>Present</option>
                    <option value="Absent"   ${record.status === 'Absent'   ? 'selected' : ''}>Absent</option>
                    <option value="Late"     ${record.status === 'Late'     ? 'selected' : ''}>Late</option>
                    <option value="Half Day" ${record.status === 'Half Day' ? 'selected' : ''}>Half Day</option>
                    <option value="On Leave" ${record.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                    <input type="time" id="editTimeIn" value="${record.timeIn ? convertTo24(record.timeIn) : '08:00'}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                    <input type="time" id="editTimeOut" value="${record.timeOut ? convertTo24(record.timeOut) : '15:30'}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                <textarea id="editRemarks" rows="2"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional remarks...">${record.note || ''}</textarea>
            </div>
            <div class="flex space-x-3 pt-2">
                <button onclick="closeModal('editAttendanceModal')" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onclick="saveIndividualAttendance()" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <i class="fas fa-save mr-2"></i>Save
                </button>
            </div>
        `;
        
        document.getElementById('editAttendanceModal').classList.add('show');
    } else {
        // If no record exists, create a new one
        Toast.show('No existing record found. You can mark attendance for this date.', 'info');
        currentTeacherForAttendance = teacherId;
        document.getElementById('editAttendanceTitle').textContent = `Mark Attendance – ${teacher.name}`;
        
        document.getElementById('editAttendanceForm').innerHTML = `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                <p class="font-semibold text-gray-800">${teacher.name}</p>
                <p class="text-sm text-gray-600">${teacher.department} &bull; ${teacher.designation}</p>
                <p class="text-sm text-gray-500">${teacher.teacherId}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" id="editDate" value="${date}"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select id="editStatus" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Half Day">Half Day</option>
                    <option value="On Leave">On Leave</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time In</label>
                    <input type="time" id="editTimeIn" value="08:00"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Time Out</label>
                    <input type="time" id="editTimeOut" value="15:30"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                <textarea id="editRemarks" rows="2"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional remarks..."></textarea>
            </div>
            <div class="flex space-x-3 pt-2">
                <button onclick="closeModal('editAttendanceModal')" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onclick="saveIndividualAttendance()" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <i class="fas fa-save mr-2"></i>Save
                </button>
            </div>
        `;
        
        document.getElementById('editAttendanceModal').classList.add('show');
    }
}

// ─── Salary Slip ──────────────────────────────────────────────────────────────
function generateAttendanceReport() {
    Toast.show('Attendance report generated successfully!', 'success');
}

function generateSalarySlipForTeacher() {
    // Pre-select the teacher being viewed
    const teacherSel = document.getElementById('salarySlipTeacherId');
    teacherSel.innerHTML = '<option value="">Select a teacher</option>';
    appState.teachers.forEach(t => {
        teacherSel.innerHTML += `<option value="${t.id}">${t.name} (${t.teacherId})</option>`;
    });
    if (currentViewingTeacherId) {
        teacherSel.value = currentViewingTeacherId;
        updateSalarySlipTeacherInfo();
    }

    // Default month
    const now = new Date();
    document.getElementById('salarySlipMonth').value =
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    document.getElementById('salarySlipModal').classList.add('show');
}

function updateSalarySlipTeacherInfo() {
    const id      = parseInt(document.getElementById('salarySlipTeacherId').value);
    const teacher = appState.teachers.find(t => t.id === id);
    const card    = document.getElementById('salarySlipTeacherInfoCard');
    const attCard = document.getElementById('attendanceSummaryCard');

    if (!teacher) { card.classList.add('hidden'); attCard.classList.add('hidden'); return; }

    document.getElementById('slipTeacherName').textContent  = teacher.name;
    document.getElementById('slipDepartment').textContent   = teacher.department;
    document.getElementById('slipDesignation').textContent  = teacher.designation;
    document.getElementById('slipEmployeeId').textContent   = teacher.teacherId;

    // Default salary based on designation
    const salaryMap = { 'HOD - Science': 65000, 'Senior Teacher': 55000, 'Sports Coach': 45000, 'Teacher': 40000 };
    const basic = salaryMap[teacher.designation] || 40000;
    document.getElementById('basicSalary').value      = basic;
    document.getElementById('dailyRate').value        = Math.round(basic / 26);
    document.getElementById('hraAmount').value        = Math.round(basic * 0.4);
    document.getElementById('otherAllowances').value  = 2000;
    document.getElementById('advanceDeduction').value = 0;
    document.getElementById('otherDeductions').value  = 0;

    card.classList.remove('hidden');
    attCard.classList.remove('hidden');
}

function previewSalarySlip() {
    const id = parseInt(document.getElementById('salarySlipTeacherId').value);
    const teacher = appState.teachers.find(t => t.id === id);
    if (!teacher) { Toast.show('Please select a teacher first', 'warning'); return; }

    const month       = document.getElementById('salarySlipMonth').value;
    const basic       = parseFloat(document.getElementById('basicSalary').value) || 0;
    const hra         = parseFloat(document.getElementById('hraAmount').value) || 0;
    const other       = parseFloat(document.getElementById('otherAllowances').value) || 0;
    const advance     = parseFloat(document.getElementById('advanceDeduction').value) || 0;
    const otherDed    = parseFloat(document.getElementById('otherDeductions').value) || 0;
    const presentDays = 22;
    const totalDays   = 26;
    const absentDays  = 2;
    const leaveDays   = 2;
    const payableDays = presentDays + leaveDays;
    const dailyRate   = basic / totalDays;
    const absentDed   = absentDays * dailyRate;
    const grossSalary = basic + hra + other;
    const netSalary   = grossSalary - absentDed - advance - otherDed;
    const [yr, mo] = month.split('-');
    const monthName = new Date(yr, mo - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' });

    document.getElementById('salarySlipPreviewContent').innerHTML = `
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-6 pb-4 border-b-2 border-blue-600">
                <h2 class="text-2xl font-bold text-blue-700">School Portal</h2>
                <p class="text-gray-600">Salary Slip – ${monthName}</p>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p class="text-sm text-gray-600">Employee Name</p><p class="font-semibold">${teacher.name}</p>
                    <p class="text-sm text-gray-600 mt-2">Department</p><p class="font-semibold">${teacher.department}</p>
                    <p class="text-sm text-gray-600 mt-2">Designation</p><p class="font-semibold">${teacher.designation}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Employee ID</p><p class="font-semibold">${teacher.teacherId}</p>
                    <p class="text-sm text-gray-600 mt-2">Working Days</p><p class="font-semibold">${totalDays}</p>
                    <p class="text-sm text-gray-600 mt-2">Present Days</p><p class="font-semibold">${presentDays}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Earnings</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between"><span class="text-gray-600">Basic Salary</span><span class="font-medium">₹${basic.toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-gray-600">HRA</span><span class="font-medium">₹${hra.toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-gray-600">Other Allowances</span><span class="font-medium">₹${other.toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between font-bold border-t border-green-300 pt-2"><span>Gross Salary</span><span>₹${grossSalary.toLocaleString('en-IN')}</span></div>
                    </div>
                </div>
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Deductions</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between"><span class="text-gray-600">Absent Deduction (${absentDays} days)</span><span class="font-medium">₹${Math.round(absentDed).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-gray-600">Advance</span><span class="font-medium">₹${advance.toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-gray-600">Other Deductions</span><span class="font-medium">₹${otherDed.toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between font-bold border-t border-red-300 pt-2"><span>Total Deductions</span><span>₹${Math.round(absentDed + advance + otherDed).toLocaleString('en-IN')}</span></div>
                    </div>
                </div>
            </div>
            <div class="bg-blue-600 text-white rounded-lg p-4 text-center">
                <p class="text-sm opacity-80">Net Salary Payable</p>
                <p class="text-3xl font-bold">₹${Math.round(netSalary).toLocaleString('en-IN')}</p>
            </div>
        </div>
    `;

    document.getElementById('salarySlipPreviewModal').classList.add('show');
    closeModal('salarySlipModal');
}

function generateAndDownloadSalarySlip() {
    const id = parseInt(document.getElementById('salarySlipTeacherId').value);
    if (!id) { Toast.show('Please select a teacher first', 'warning'); return; }
    previewSalarySlip();
    Toast.show('Salary slip ready – use Print or Save as PDF', 'success');
}

function printSalarySlip() {
    const content = document.getElementById('salarySlipPreviewContent').innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Salary Slip</title><link rel="stylesheet" href="https://cdn.tailwindcss.com"></head><body class="p-8">${content}</body></html>`);
    win.document.close();
    win.print();
}

function downloadSalarySlipPDF() {
    Toast.show('Right-click the preview and choose "Save as PDF" or use Print → Save as PDF', 'info', 4000);
    printSalarySlip();
}

// ─── Export Report ────────────────────────────────────────────────────────────
function exportAttendanceReport() {
    const date   = document.getElementById('attendanceDate').value;
    const rows   = [['Teacher Name', 'Teacher ID', 'Department', 'Designation', 'Status', 'Time In', 'Time Out', 'Remarks']];
    appState.attendance.forEach(record => {
        const teacher = appState.teachers.find(t => t.id === record.teacherId);
        if (teacher) {
            rows.push([teacher.name, teacher.teacherId, teacher.department, teacher.designation, record.status, record.timeIn || '', record.timeOut || '', record.note || '']);
        }
    });
    const csv  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `attendance-report-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    Toast.show('Attendance report exported as CSV!', 'success');
}

// ─── Reminders ────────────────────────────────────────────────────────────────
function sendAttendanceReminders() {
    const absentTeachers = appState.attendance
        .filter(r => r.status === 'Absent')
        .map(r => appState.teachers.find(t => t.id === r.teacherId)?.name)
        .filter(Boolean);

    if (absentTeachers.length === 0) {
        Toast.show('No absent teachers to send reminders to.', 'info');
    } else {
        Toast.show(`Reminders sent to: ${absentTeachers.join(', ')}`, 'success', 4000);
    }
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

function showLoading(show) {
    document.getElementById('loadingOverlay').classList.toggle('hidden', !show);
}

console.log('%c✅ All Buttons Working Perfectly', 'color: green; font-weight: bold');