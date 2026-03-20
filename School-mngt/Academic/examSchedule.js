// ============================================
// EXAM MANAGEMENT MODULE - COMPLETE (API INTEGRATED)
// Features: Full CRUD via REST API, Filters, Status Update, Timetable Modal
// Backend Base URL: configure API_BASE_URL below
// ============================================

// ============= CONFIGURATION =============
const API_BASE_URL = 'http://localhost:8084/api/exams'; // ← Change this to your backend URL

// ============= GLOBAL VARIABLES =============
let currentExams = [];           // Store all exams from API
let filteredExams = [];          // Store filtered exams
let currentSubjects = [];        // Store subjects for current class
let currentPage = 'create';      // Track current page
let currentPageNumber = 1;       // For pagination
const itemsPerPage = 10;         // Items per page
let editingExamId = null;        // Track which exam is being edited (null = create mode)

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Exam Management Module Initializing...');

    initializeExamModule();
    setupSidebar();
    setupDropdowns();
    loadExamsFromAPI();          // ← Replaces loadSampleData()
    createTimetableModal();
    createStatusModal();         // ← New: status change modal
    createEditModal();           // ← New: dedicated edit modal
});

/**
 * Main initialization function
 */
function initializeExamModule() {
    console.log('📋 Setting up exam module...');

    setupTabNavigation();
    setupFormHandlers();
    setupSubjectCheckboxes();
    setupFilterHandlers();

    console.log('✅ Exam module initialized successfully');
}


// ============= API SERVICE LAYER =============
// All backend calls are here — never call fetch() directly elsewhere

const ExamAPI = {

    /**
     * GET /api/exams/get-all-exams
     */
    async getAllExams() {
        const res = await fetch(`${API_BASE_URL}/get-all-exams`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'   // sends JWT cookie if applicable
        });
        if (!res.ok) throw new Error(`Failed to fetch exams: ${res.status}`);
        return await res.json();
    },

    /**
     * GET /api/exams/get-exam-by-id/:id
     */
    async getExamById(examId) {
        const res = await fetch(`${API_BASE_URL}/get-exam-by-id/${examId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Exam not found: ${res.status}`);
        return await res.json();
    },

    /**
     * GET /api/exams/get-exams-by-class/:classId
     */
    async getExamsByClass(classId) {
        const res = await fetch(`${API_BASE_URL}/get-exams-by-class/${classId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Failed to fetch exams by class: ${res.status}`);
        return await res.json();
    },

    /**
     * GET /api/exams/get-exams-by-status/:status
     */
    async getExamsByStatus(status) {
        const res = await fetch(`${API_BASE_URL}/get-exams-by-status/${status}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Failed to fetch exams by status: ${res.status}`);
        return await res.json();
    },

    /**
     * GET /api/exams/get-upcoming-exams
     */
    async getUpcomingExams() {
        const res = await fetch(`${API_BASE_URL}/get-upcoming-exams`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`Failed to fetch upcoming exams: ${res.status}`);
        return await res.json();
    },

    /**
     * GET /api/exams/check-exam-code/:examCode
     */
    async checkExamCode(examCode) {
        const res = await fetch(`${API_BASE_URL}/check-exam-code/${examCode}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) return false;
        return await res.json(); // returns true/false
    },

    /**
     * POST /api/exams/create-exam
     * @param {Object} examData - matches ExamCreateRequest DTO
     */
    async createExam(examData) {
        const res = await fetch(`${API_BASE_URL}/create-exam`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(examData)
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Failed to create exam');
        return body;
    },

    /**
     * PUT /api/exams/update-exam/:examId
     * @param {number} examId
     * @param {Object} examData - matches ExamCreateRequest DTO
     */
    async updateExam(examId, examData) {
        const res = await fetch(`${API_BASE_URL}/update-exam/${examId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(examData)
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Failed to update exam');
        return body;
    },

    /**
     * PATCH /api/exams/update-exam-status/:examId?status=STATUS
     * @param {number} examId
     * @param {string} status - SCHEDULED | ONGOING | COMPLETED
     */
    async updateExamStatus(examId, status) {
        const res = await fetch(`${API_BASE_URL}/update-exam-status/${examId}?status=${status}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Failed to update status');
        return body;
    },

    /**
     * DELETE /api/exams/delete-exam/:examId
     */
    async deleteExam(examId) {
        const res = await fetch(`${API_BASE_URL}/delete-exam/${examId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body.error || 'Failed to delete exam');
        }
        return true;
    }
};


// ============= DATA MAPPING HELPERS =============
// Backend returns ExamResponse, frontend used flat fields — these mappers bridge them

/**
 * Map backend ExamResponse → frontend exam object
 */
function mapResponseToFrontend(exam) {
    return {
        id: exam.examId,
        name: exam.examName,
        examCode: exam.examCode,
        type: exam.examType,
        academicYear: exam.academicYear,
        classId: exam.classId ? String(exam.classId) : '',
        className: exam.className || `Class ${exam.classId}`,
        classCode: exam.classCode || '',
        section: exam.section,
        startDate: exam.startDate,     // already "YYYY-MM-DD" string
        endDate: exam.endDate,
        description: exam.description || '',
        status: exam.status || 'SCHEDULED',
        subjects: (exam.subjects || []).map(s => ({
            name: s.subjectName,
            subjectName: s.subjectName,
            maxMarks: s.maxMarks,
            passingMarks: s.passingMarks,
            examDate: s.examDate,
            startTime: s.startTime,
            endTime: s.endTime,
            roomNumber: s.roomNumber,
            invigilator: s.invigilator
        })),
        createdAt: exam.createdAt,
        updatedAt: exam.updatedAt
    };
}

/**
 * Map frontend form data → backend ExamCreateRequest DTO
 */
function mapFormToRequest(formData) {
    return {
        examName: formData.name,
        examCode: formData.examCode || null,
        examType: formData.type,
        academicYear: formData.academicYear,
        classId: parseInt(formData.classId),
        section: formData.section,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description || '',
        subjects: (formData.subjects || []).map(s => ({
            subjectName: s.name,
            maxMarks: s.maxMarks,
            passingMarks: s.passingMarks || Math.floor(s.maxMarks * 0.33),
            examDate: s.examDate || null,
            startTime: s.startTime || null,
            endTime: s.endTime || null,
            roomNumber: s.roomNumber || null,
            invigilator: s.invigilator || null
        }))
    };
}


// ============= LOAD EXAMS FROM API =============

async function loadExamsFromAPI() {
    console.log('📡 Fetching exams from API...');
    showLoading();
    try {
        const response = await ExamAPI.getAllExams();
        currentExams = response.map(mapResponseToFrontend);
        filteredExams = [...currentExams];

        updateExamStats(currentExams);
        renderExamsTable();
        updateFilterStats();
        populateTimetableDropdown();

        console.log(`✅ Loaded ${currentExams.length} exams from API`);
    } catch (err) {
        console.error('❌ Failed to load exams:', err);
        showToast('Failed to load exams from server. Check your connection.', 'error');
        currentExams = [];
        filteredExams = [];
        renderExamsTable();
    } finally {
        hideLoading();
    }
}


// ============= TAB NAVIGATION =============

function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = {
        createExamTab: 'createExamContent',
        scheduleTab: 'scheduleContent',
        timeTableTab: 'timeTableContent',
        subjectsTab: 'subjectsContent'
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.id;
            const contentId = tabContents[tabId];

            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-blue-500', 'text-gray-700');
                btn.classList.add('text-gray-500');
            });

            this.classList.add('active', 'border-blue-500', 'text-gray-700');
            this.classList.remove('text-gray-500');

            Object.values(tabContents).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.classList.add('hidden');
                    element.classList.remove('active');
                }
            });

            const activeContent = document.getElementById(contentId);
            if (activeContent) {
                activeContent.classList.remove('hidden');
                activeContent.classList.add('active');
            }

            currentPage = tabId.replace('Tab', '').toLowerCase();

            if (currentPage === 'schedule') {
                renderExamsTable();
            }
        });
    });
}


// ============= FILTER HANDLERS =============

function setupFilterHandlers() {
    const searchInput = document.getElementById('searchExam');
    const classFilter = document.getElementById('scheduleClass');
    const typeFilter = document.getElementById('scheduleExamType');
    const statusFilter = document.getElementById('scheduleStatus');
    const dateFilter = document.getElementById('scheduleDate');

    if (searchInput) searchInput.addEventListener('input', filterExams);
    if (classFilter) classFilter.addEventListener('change', filterExams);
    if (typeFilter) typeFilter.addEventListener('change', filterExams);
    if (statusFilter) statusFilter.addEventListener('change', filterExams);
    if (dateFilter) dateFilter.addEventListener('change', filterExams);

    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (prevBtn) prevBtn.addEventListener('click', previousPage);
    if (nextBtn) nextBtn.addEventListener('click', nextPage);
}

function filterExams() {
    const searchTerm = document.getElementById('searchExam')?.value.toLowerCase() || '';
    const classFilter = document.getElementById('scheduleClass')?.value || '';
    const typeFilter = document.getElementById('scheduleExamType')?.value || '';
    const statusFilter = document.getElementById('scheduleStatus')?.value || '';
    const dateFilter = document.getElementById('scheduleDate')?.value || '';

    filteredExams = currentExams.filter(exam => {
        if (searchTerm) {
            const searchableText = `${exam.name} ${exam.className || ''} ${exam.section || ''} ${exam.examCode || ''}`.toLowerCase();
            if (!searchableText.includes(searchTerm)) return false;
        }
        if (classFilter && exam.classId !== classFilter) return false;
        if (typeFilter && exam.type !== typeFilter) return false;
        // Backend statuses: SCHEDULED, ONGOING, COMPLETED
        if (statusFilter) {
            const normalised = statusFilter === 'UPCOMING' ? 'SCHEDULED' : statusFilter;
            if (exam.status !== normalised) return false;
        }
        if (dateFilter) {
            if (exam.startDate !== dateFilter) return false;
        }
        return true;
    });

    currentPageNumber = 1;
    renderExamsTable();
    updateFilterStats();
}

function resetAllFilters() {
    ['searchExam', 'scheduleClass', 'scheduleExamType', 'scheduleStatus', 'scheduleDate'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    filteredExams = [...currentExams];
    currentPageNumber = 1;
    renderExamsTable();
    updateFilterStats();
    showToast('Filters reset successfully', 'success');
}

function updateFilterStats() {
    const statsElement = document.getElementById('filterStats');
    if (statsElement) {
        statsElement.innerHTML = `
            Showing <span class="font-bold">${filteredExams.length}</span> of 
            <span class="font-bold">${currentExams.length}</span> exams
        `;
    }
}


// ============= PAGINATION =============

function previousPage() {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        renderExamsTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
    if (currentPageNumber < totalPages) {
        currentPageNumber++;
        renderExamsTable();
    }
}


// ============= EXAM TABLE RENDERING =============

function renderExamsTable() {
    const tableBody = document.getElementById('examsTableBody');
    const tableInfo = document.getElementById('tableInfo');
    const noDataMessage = document.getElementById('noExamsMessage');

    if (!tableBody) return;

    const startIndex = (currentPageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredExams.length);
    const pageData = filteredExams.slice(startIndex, endIndex);

    tableBody.innerHTML = '';

    if (pageData.length === 0) {
        if (noDataMessage) noDataMessage.classList.remove('hidden');
        if (tableInfo) tableInfo.innerHTML = 'Showing 0 exams';
        updatePaginationControls(0);
        return;
    }

    if (noDataMessage) noDataMessage.classList.add('hidden');

    pageData.forEach((exam, index) => {
        const row = createExamRow(exam, startIndex + index + 1);
        tableBody.appendChild(row);
    });

    if (tableInfo) {
        tableInfo.innerHTML = `Showing ${startIndex + 1}-${endIndex} of ${filteredExams.length} exams`;
    }

    updatePaginationControls(filteredExams.length);
}

function createExamRow(exam, serialNo) {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 transition-colors';

    const statusClass = getStatusClass(exam.status);
    const statusText = getStatusText(exam.status);

    const startDate = exam.startDate ? formatDate(exam.startDate) : 'TBA';
    const endDate = exam.endDate ? formatDate(exam.endDate) : 'TBA';
    const totalMarks = exam.subjects?.reduce((total, sub) => total + (sub.maxMarks || 0), 0) || 0;

    // Status dropdown options (excluding current status)
    const statusOptions = ['SCHEDULED', 'ONGOING', 'COMPLETED']
        .filter(s => s !== exam.status)
        .map(s => `<option value="${s}">${s}</option>`)
        .join('');

    row.innerHTML = `
        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">${serialNo}</td>
        <td class="px-4 py-4 whitespace-nowrap">
            <div class="font-medium text-gray-900">${exam.name}</div>
            <div class="text-xs text-gray-500">${formatExamType(exam.type)} ${exam.examCode ? '• ' + exam.examCode : ''}</div>
        </td>
        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
            ${exam.className || 'Class ' + exam.classId} - ${exam.section || 'A'}
        </td>
        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
            ${startDate} - ${endDate}
        </td>
        <td class="px-4 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">
                ${statusText}
            </span>
        </td>
        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
            ${exam.subjects?.length || 0} subjects
        </td>
        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
            ${totalMarks}
        </td>
        <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
            <button onclick="showExamTimetable(${exam.id})" class="text-blue-600 hover:text-blue-900 mr-2" title="View Timetable">
                <i class="fas fa-calendar-alt"></i>
            </button>
            <button onclick="openEditModal(${exam.id})" class="text-green-600 hover:text-green-900 mr-2" title="Edit Exam">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="openStatusModal(${exam.id}, '${exam.status}')" class="text-yellow-600 hover:text-yellow-900 mr-2" title="Update Status">
                <i class="fas fa-toggle-on"></i>
            </button>
            <button onclick="deleteExam(${exam.id})" class="text-red-600 hover:text-red-900" title="Delete Exam">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    return row;
}

function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    if (prevBtn) {
        prevBtn.disabled = currentPageNumber === 1;
        prevBtn.classList.toggle('opacity-50', currentPageNumber === 1);
        prevBtn.classList.toggle('cursor-not-allowed', currentPageNumber === 1);
    }
    if (nextBtn) {
        nextBtn.disabled = currentPageNumber === totalPages || totalPages === 0;
        nextBtn.classList.toggle('opacity-50', currentPageNumber === totalPages || totalPages === 0);
        nextBtn.classList.toggle('cursor-not-allowed', currentPageNumber === totalPages || totalPages === 0);
    }
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPageNumber} of ${totalPages || 1}`;
    }
}


// ============= EXAM STATISTICS =============

function updateExamStats(exams) {
    const totalExams = exams.length;
    const upcoming = exams.filter(e => e.status === 'SCHEDULED').length;
    const ongoing = exams.filter(e => e.status === 'ONGOING').length;
    const completed = exams.filter(e => e.status === 'COMPLETED').length;

    // Target the stat card number elements by their parent card index
    const statCards = document.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 .bg-white');
    if (statCards.length >= 4) {
        const totalEl = statCards[0]?.querySelector('.text-2xl');
        if (totalEl) totalEl.textContent = totalExams;

        const upcomingEl = statCards[1]?.querySelector('.text-2xl');
        if (upcomingEl) upcomingEl.textContent = upcoming;

        const completedEl = statCards[2]?.querySelector('.text-2xl');
        if (completedEl) completedEl.textContent = completed;

        const ongoingEl = statCards[3]?.querySelector('.text-2xl');
        if (ongoingEl) ongoingEl.textContent = ongoing;
    }
}


// ============= CREATE / UPDATE EXAM =============

function setupFormHandlers() {
    const createExamForm = document.getElementById('createExamForm');
    if (createExamForm) {
        createExamForm.addEventListener('submit', function (e) {
            e.preventDefault();
            createNewExam();
        });
    }

    const examClassSelect = document.getElementById('examClass');
    if (examClassSelect) {
        examClassSelect.addEventListener('change', function () {
            updateSubjectsForClass(this.value);
        });
    }

    const loadTimetableBtn = document.getElementById('loadTimetableBtn');
    if (loadTimetableBtn) {
        loadTimetableBtn.addEventListener('click', loadTimetable);
    }

    // Add Subject form (Subjects tab)
    const addSubjectForm = document.getElementById('addSubjectForm');
    if (addSubjectForm) {
        addSubjectForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Subject management works via class configuration — subjects are part of each exam.', 'info');
        });
    }

    const addSubjectBtn = document.getElementById('addSubjectBtn');
    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', function () {
            showToast('Select subjects within the Create Exam form for each exam.', 'info');
        });
    }

    const resetBtn = document.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetExamForm);
    }
}

async function createNewExam() {
    console.log('📝 Creating new exam via API...');

    const formData = collectFormData();

    // Validate on frontend first
    const validationError = validateExamData(formData);
    if (validationError) {
        showToast(validationError, 'error');
        return;
    }

    // Check exam code uniqueness if user provided one
    if (formData.examCode) {
        try {
            const exists = await ExamAPI.checkExamCode(formData.examCode);
            if (exists) {
                showToast(`Exam code "${formData.examCode}" already exists. Please use a different code.`, 'error');
                return;
            }
        } catch (e) {
            // Non-critical — backend will also validate
        }
    }

    const requestBody = mapFormToRequest(formData);

    showLoading();
    try {
        const createdExam = await ExamAPI.createExam(requestBody);
        const mapped = mapResponseToFrontend(createdExam);

        // Add to local lists
        currentExams.unshift(mapped);
        filteredExams = [...currentExams];

        updateExamStats(currentExams);
        populateTimetableDropdown();
        resetExamForm();

        showToast(`✅ Exam "${mapped.name}" created successfully!`, 'success');

        // Switch to schedule tab to show new exam
        document.getElementById('scheduleTab')?.click();
        renderExamsTable();

    } catch (err) {
        console.error('❌ Create exam error:', err);
        showToast(err.message || 'Failed to create exam. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

function collectFormData() {
    const subjects = [];
    document.querySelectorAll('.subject-checkbox:checked').forEach(checkbox => {
        const subjectItem = checkbox.closest('.subject-item');
        const subjectName = subjectItem.querySelector('label')?.textContent.trim();
        const maxMarksVal = subjectItem.querySelector('.subject-marks')?.value;
        const maxMarks = maxMarksVal ? parseInt(maxMarksVal) : 100;

        subjects.push({
            name: subjectName,
            maxMarks: maxMarks,
            passingMarks: Math.floor(maxMarks * 0.33)
        });
    });

    return {
        name: document.getElementById('examName')?.value.trim() || '',
        examCode: document.getElementById('examCode')?.value.trim() || '',
        type: document.getElementById('examType')?.value || '',
        academicYear: document.getElementById('academicYear')?.value || '',
        classId: document.getElementById('examClass')?.value || '',
        section: document.getElementById('examSection')?.value || '',
        startDate: document.getElementById('startDate')?.value || '',
        endDate: document.getElementById('endDate')?.value || '',
        description: document.getElementById('examDescription')?.value.trim() || '',
        subjects
    };
}

function validateExamData(examData) {
    if (!examData.name) return 'Exam name is required';
    if (!examData.type) return 'Exam type is required';
    // Only TERM1-TERM3, UNIT_TEST, MID_TERM, FINAL are supported by backend
    const validTypes = ['TERM1', 'TERM2', 'TERM3', 'UNIT_TEST', 'MID_TERM', 'FINAL'];
    if (!validTypes.includes(examData.type)) return `Invalid exam type: ${examData.type}. Supported: ${validTypes.join(', ')}`;
    if (!examData.academicYear) return 'Academic year is required';
    if (!examData.classId) return 'Class is required';
    if (!examData.section) return 'Section is required';
    if (!examData.startDate) return 'Start date is required';
    if (!examData.endDate) return 'End date is required';
    if (new Date(examData.startDate) > new Date(examData.endDate)) return 'End date must be after start date';
    if (examData.subjects.length === 0) return 'Please select at least one subject';
    return null;
}

function resetExamForm() {
    const form = document.getElementById('createExamForm');
    if (form) form.reset();

    document.querySelectorAll('.subject-checkbox').forEach(cb => {
        cb.checked = false;
        const marksInput = cb.closest('.subject-item')?.querySelector('.subject-marks');
        if (marksInput) {
            marksInput.disabled = true;
            marksInput.value = '';
        }
    });

    // Reset submit button label in case we were editing
    const submitBtn = document.querySelector('#createExamForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Create Exam';
    }

    editingExamId = null;
}


// ============= EDIT EXAM (Dedicated Modal) =============

function createEditModal() {
    if (document.getElementById('editExamModal')) return;

    const modal = document.createElement('div');
    modal.id = 'editExamModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <h3 class="text-xl font-bold text-gray-800">Edit Exam</h3>
                <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Exam Name *</label>
                        <input type="text" id="editExamName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Exam Name">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Exam Type *</label>
                        <select id="editExamType" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="TERM1">Term 1 Examination</option>
                            <option value="TERM2">Term 2 Examination</option>
                            <option value="TERM3">Term 3 Examination</option>
                            <option value="UNIT_TEST">Unit Test</option>
                            <option value="MID_TERM">Mid Term Examination</option>
                            <option value="FINAL">Final Examination</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                        <select id="editAcademicYear" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="2024-2025">2024-2025</option>
                            <option value="2025-2026">2025-2026</option>
                            <option value="2026-2027">2026-2027</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                        <select id="editSection" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="A">Section A</option>
                            <option value="B">Section B</option>
                            <option value="C">Section C</option>
                            <option value="D">Section D</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                        <input type="date" id="editStartDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                        <input type="date" id="editEndDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="editDescription" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Exam description..."></textarea>
                    </div>
                </div>

                <!-- Subjects in edit modal -->
                <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-700 mb-3">Subjects</h4>
                    <div id="editSubjectsList" class="space-y-2">
                        <!-- Dynamically populated -->
                    </div>
                    <button type="button" onclick="addEditSubjectRow()" class="mt-3 text-sm text-blue-600 hover:text-blue-800">
                        <i class="fas fa-plus mr-1"></i> Add Subject
                    </button>
                </div>

                <div class="flex justify-end space-x-3 pt-2">
                    <button onclick="closeEditModal()" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onclick="submitEditExam()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <i class="fas fa-save mr-2"></i>Save Changes
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openEditModal(examId) {
    const exam = currentExams.find(e => e.id === examId);
    if (!exam) {
        showToast('Exam not found', 'error');
        return;
    }

    editingExamId = examId;

    // Populate fields
    document.getElementById('editExamName').value = exam.name || '';
    document.getElementById('editExamType').value = exam.type || '';
    document.getElementById('editAcademicYear').value = exam.academicYear || '';
    document.getElementById('editSection').value = exam.section || '';
    document.getElementById('editStartDate').value = exam.startDate || '';
    document.getElementById('editEndDate').value = exam.endDate || '';
    document.getElementById('editDescription').value = exam.description || '';

    // Populate subjects
    const subjectsList = document.getElementById('editSubjectsList');
    subjectsList.innerHTML = '';
    (exam.subjects || []).forEach(s => {
        subjectsList.appendChild(createEditSubjectRow(s.name || s.subjectName, s.maxMarks, s.passingMarks));
    });

    document.getElementById('editExamModal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeEditModal() {
    document.getElementById('editExamModal')?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    editingExamId = null;
}

function createEditSubjectRow(name = '', maxMarks = 100, passingMarks = 33) {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 edit-subject-row';
    div.innerHTML = `
        <input type="text" placeholder="Subject Name" value="${name}" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm edit-subject-name" />
        <input type="number" placeholder="Max" value="${maxMarks}" class="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm edit-subject-max" />
        <input type="number" placeholder="Pass" value="${passingMarks}" class="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm edit-subject-pass" />
        <button type="button" onclick="this.closest('.edit-subject-row').remove()" class="text-red-500 hover:text-red-700 px-2">
            <i class="fas fa-times"></i>
        </button>
    `;
    return div;
}

function addEditSubjectRow() {
    const subjectsList = document.getElementById('editSubjectsList');
    if (subjectsList) {
        subjectsList.appendChild(createEditSubjectRow());
    }
}

async function submitEditExam() {
    if (!editingExamId) return;

    const subjects = [];
    document.querySelectorAll('.edit-subject-row').forEach(row => {
        const name = row.querySelector('.edit-subject-name')?.value.trim();
        const maxMarks = parseInt(row.querySelector('.edit-subject-max')?.value) || 100;
        const passingMarks = parseInt(row.querySelector('.edit-subject-pass')?.value) || 33;
        if (name) subjects.push({ name, maxMarks, passingMarks });
    });

    const formData = {
        name: document.getElementById('editExamName')?.value.trim(),
        type: document.getElementById('editExamType')?.value,
        academicYear: document.getElementById('editAcademicYear')?.value,
        classId: currentExams.find(e => e.id === editingExamId)?.classId || '',
        section: document.getElementById('editSection')?.value,
        startDate: document.getElementById('editStartDate')?.value,
        endDate: document.getElementById('editEndDate')?.value,
        description: document.getElementById('editDescription')?.value.trim(),
        subjects
    };

    const validationError = validateExamData(formData);
    if (validationError) {
        showToast(validationError, 'error');
        return;
    }

    const requestBody = mapFormToRequest(formData);

    showLoading();
    try {
        const updatedExam = await ExamAPI.updateExam(editingExamId, requestBody);
        const mapped = mapResponseToFrontend(updatedExam);

        // Update local lists
        const idx = currentExams.findIndex(e => e.id === editingExamId);
        if (idx !== -1) currentExams[idx] = mapped;
        filteredExams = [...currentExams];

        closeEditModal();
        updateExamStats(currentExams);
        renderExamsTable();
        updateFilterStats();

        showToast(`✅ Exam "${mapped.name}" updated successfully!`, 'success');
    } catch (err) {
        console.error('❌ Update exam error:', err);
        showToast(err.message || 'Failed to update exam. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}


// ============= UPDATE EXAM STATUS =============

function createStatusModal() {
    if (document.getElementById('statusModal')) return;

    const modal = document.createElement('div');
    modal.id = 'statusModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Update Exam Status</h3>
            <p class="text-sm text-gray-600 mb-4">Current Status: <span id="currentStatusDisplay" class="font-semibold"></span></p>
            <div class="space-y-2 mb-6">
                <label class="block text-sm font-medium text-gray-700">Select New Status</label>
                <select id="newStatusSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="SCHEDULED">SCHEDULED (Upcoming)</option>
                    <option value="ONGOING">ONGOING (In Progress)</option>
                    <option value="COMPLETED">COMPLETED (Finished)</option>
                </select>
            </div>
            <div class="flex justify-end space-x-3">
                <button onclick="closeStatusModal()" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cancel
                </button>
                <button onclick="submitStatusUpdate()" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    <i class="fas fa-check mr-2"></i>Update Status
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

let statusUpdateExamId = null;

function openStatusModal(examId, currentStatus) {
    statusUpdateExamId = examId;
    document.getElementById('currentStatusDisplay').textContent = currentStatus;
    document.getElementById('newStatusSelect').value = currentStatus;
    document.getElementById('statusModal').classList.remove('hidden');
}

function closeStatusModal() {
    document.getElementById('statusModal')?.classList.add('hidden');
    statusUpdateExamId = null;
}

async function submitStatusUpdate() {
    if (!statusUpdateExamId) return;

    const newStatus = document.getElementById('newStatusSelect')?.value;
    if (!newStatus) return;

    showLoading();
    try {
        const updatedExam = await ExamAPI.updateExamStatus(statusUpdateExamId, newStatus);
        const mapped = mapResponseToFrontend(updatedExam);

        const idx = currentExams.findIndex(e => e.id === statusUpdateExamId);
        if (idx !== -1) currentExams[idx] = mapped;
        filteredExams = [...currentExams];

        closeStatusModal();
        updateExamStats(currentExams);
        renderExamsTable();
        updateFilterStats();

        showToast(`✅ Exam status updated to "${newStatus}"`, 'success');
    } catch (err) {
        console.error('❌ Status update error:', err);
        showToast(err.message || 'Failed to update status', 'error');
    } finally {
        hideLoading();
    }
}


// ============= DELETE EXAM =============

async function deleteExam(examId) {
    const exam = currentExams.find(e => e.id === examId);
    if (!exam) return;

    if (!confirm(`Are you sure you want to delete "${exam.name}"? This action cannot be undone.`)) return;

    showLoading();
    try {
        await ExamAPI.deleteExam(examId);

        currentExams = currentExams.filter(e => e.id !== examId);
        filteredExams = filteredExams.filter(e => e.id !== examId);

        updateExamStats(currentExams);
        renderExamsTable();
        updateFilterStats();
        populateTimetableDropdown();

        showToast('Exam deleted successfully', 'success');
    } catch (err) {
        console.error('❌ Delete exam error:', err);
        showToast(err.message || 'Failed to delete exam', 'error');
    } finally {
        hideLoading();
    }
}


// ============= SUBJECT CHECKBOXES =============

function setupSubjectCheckboxes() {
    document.querySelectorAll('.subject-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const marksInput = this.closest('.subject-item')?.querySelector('.subject-marks');
            if (marksInput) {
                marksInput.disabled = !this.checked;
                if (!this.checked) marksInput.value = '';
            }
        });
    });
}

/**
 * Called when user selects a class in the Create Exam form.
 * Fetches the class from backend and extracts its subjects from
 * otherTeacherSubject[].subjects[] — exactly as stored during class creation.
 */
async function updateSubjectsForClass(classId) {
    const subjectsList = document.getElementById('subjectsList');
    if (!subjectsList) return;

    if (!classId) {
        subjectsList.innerHTML = `
            <div class="col-span-3 text-center py-6 text-gray-400">
                <i class="fas fa-hand-point-up text-2xl mb-2 block"></i>
                Select a class to load its subjects
            </div>`;
        return;
    }

    // Show loading state inside the subjects box
    subjectsList.innerHTML = `
        <div class="col-span-3 text-center py-6 text-gray-400">
            <i class="fas fa-spinner fa-spin text-2xl mb-2 block"></i>
            Loading subjects...
        </div>`;

    try {
        const res = await fetch(`${API_BASE_URL.replace('/api/exams', '/api/classes')}/get-class-by-id/${classId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) throw new Error(`Class not found (ID: ${classId})`);

        const classData = await res.json();

        // Extract all subjects from every teacher assignment
        // Structure: otherTeacherSubject[].subjects[].{ subjectName, totalMarks, subId }
        const subjectMap = new Map(); // use Map to deduplicate by subjectName

        (classData.otherTeacherSubject || []).forEach(teacherAssignment => {
            (teacherAssignment.subjects || []).forEach(sub => {
                if (sub.subjectName && !subjectMap.has(sub.subjectName)) {
                    subjectMap.set(sub.subjectName, {
                        name: sub.subjectName,
                        maxMarks: sub.totalMarks || 100,
                        passingMarks: Math.floor((sub.totalMarks || 100) * 0.33)
                    });
                }
            });
        });

        const subjects = Array.from(subjectMap.values());

        if (subjects.length === 0) {
            subjectsList.innerHTML = `
                <div class="col-span-3 text-center py-6 text-amber-500">
                    <i class="fas fa-exclamation-triangle text-2xl mb-2 block"></i>
                    No subjects found for this class.<br>
                    <span class="text-sm text-gray-500">Please add subjects when creating/editing the class.</span>
                </div>`;
            return;
        }

        // Render subjects as checkboxes with pre-filled max marks from class data
        updateSubjectsUI(subjects);
        showToast(`${subjects.length} subject(s) loaded for ${classData.className}`, 'success');

    } catch (err) {
        console.error('❌ Failed to load subjects:', err);
        subjectsList.innerHTML = `
            <div class="col-span-3 text-center py-6 text-red-400">
                <i class="fas fa-times-circle text-2xl mb-2 block"></i>
                Failed to load subjects: ${err.message}
            </div>`;
        showToast('Failed to load subjects for this class', 'error');
    }
}

/**
 * Renders subject checkboxes.
 * Accepts array of { name, maxMarks, passingMarks } objects (from API)
 * or plain strings (fallback).
 */
function updateSubjectsUI(subjects) {
    const subjectsList = document.getElementById('subjectsList');
    if (!subjectsList) return;

    subjectsList.innerHTML = '';

    subjects.forEach((subject, index) => {
        // Support both object { name, maxMarks, passingMarks } and plain string
        const subjectName = typeof subject === 'string' ? subject : subject.name;
        const maxMarks    = typeof subject === 'string' ? 100   : (subject.maxMarks || 100);

        const subjectId = `subject_${index}_${Date.now()}`;
        const subjectItem = document.createElement('div');
        subjectItem.className = 'flex items-center p-3 border border-gray-200 rounded-lg subject-item';

        subjectItem.innerHTML = `
            <input type="checkbox" id="${subjectId}"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded subject-checkbox">
            <label for="${subjectId}" class="ml-3 text-sm text-gray-700 flex-1">${subjectName}</label>
            <span class="text-xs text-gray-400 mr-2">Max:</span>
            <input type="number" value="${maxMarks}" placeholder="Max Marks"
                class="w-20 px-2 py-1 border border-gray-300 rounded text-sm subject-marks"
                disabled>
        `;

        subjectsList.appendChild(subjectItem);
    });

    setupSubjectCheckboxes();
}


// ============= TIMETABLE MODAL =============

function populateTimetableDropdown() {
    const timetableExamSelect = document.getElementById('timetableExam');
    if (!timetableExamSelect) return;

    timetableExamSelect.innerHTML = '<option value="">Choose Exam</option>';
    currentExams.forEach(exam => {
        const opt = document.createElement('option');
        opt.value = exam.id;
        opt.textContent = `${exam.name} (${exam.academicYear})`;
        timetableExamSelect.appendChild(opt);
    });
}

function createTimetableModal() {
    if (document.getElementById('timetableModal')) return;

    const modal = document.createElement('div');
    modal.id = 'timetableModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <div>
                    <h3 class="text-xl font-bold text-gray-800" id="modalExamName">Exam Timetable</h3>
                    <p class="text-sm text-gray-600" id="modalExamDetails">Class details</p>
                </div>
                <button onclick="closeTimetableModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <p class="text-sm text-blue-600 mb-1">Exam Type</p>
                        <p class="text-lg font-semibold text-gray-800" id="modalExamType">-</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <p class="text-sm text-green-600 mb-1">Duration</p>
                        <p class="text-lg font-semibold text-gray-800" id="modalDuration">-</p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-4">
                        <p class="text-sm text-purple-600 mb-1">Total Subjects</p>
                        <p class="text-lg font-semibold text-gray-800" id="modalTotalSubjects">-</p>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                        <p class="text-sm text-yellow-600 mb-1">Total Marks</p>
                        <p class="text-lg font-semibold text-gray-800" id="modalTotalMarks">-</p>
                    </div>
                </div>

                <div class="overflow-x-auto rounded-lg border border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Marks</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passing Marks</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                            </tr>
                        </thead>
                        <tbody id="timetableModalBody" class="bg-white divide-y divide-gray-200"></tbody>
                    </table>
                </div>

                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-700 mb-2">📝 Description</h4>
                    <p class="text-gray-600" id="modalDescription">-</p>
                </div>

                <div class="mt-6 flex justify-end">
                    <button onclick="downloadTimetable()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-download mr-2"></i>Download Timetable
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showExamTimetable(examId) {
    const exam = currentExams.find(e => e.id === examId);
    if (!exam) {
        showToast('Exam not found', 'error');
        return;
    }

    let modal = document.getElementById('timetableModal');
    if (!modal) {
        createTimetableModal();
        modal = document.getElementById('timetableModal');
    }

    populateTimetableModal(exam);
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function populateTimetableModal(exam) {
    document.getElementById('modalExamName').textContent = exam.name;
    document.getElementById('modalExamDetails').textContent =
        `${exam.className || 'Class ' + exam.classId} - Section ${exam.section} | ${exam.academicYear}`;
    document.getElementById('modalExamType').textContent = formatExamType(exam.type);
    document.getElementById('modalTotalSubjects').textContent = exam.subjects?.length || 0;
    document.getElementById('modalDescription').textContent = exam.description || 'No description provided.';

    const totalMarks = exam.subjects?.reduce((t, s) => t + (s.maxMarks || 0), 0) || 0;
    document.getElementById('modalTotalMarks').textContent = totalMarks;

    // Duration
    if (exam.startDate && exam.endDate) {
        const start = new Date(exam.startDate);
        const end = new Date(exam.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('modalDuration').textContent = `${days} days`;
    } else {
        document.getElementById('modalDuration').textContent = 'TBA';
    }

    // Build timetable rows
    const timetableBody = document.getElementById('timetableModalBody');
    timetableBody.innerHTML = '';

    if (!exam.subjects || exam.subjects.length === 0) {
        timetableBody.innerHTML = `
            <tr><td colspan="8" class="px-6 py-8 text-center text-gray-500">No subjects found for this exam</td></tr>
        `;
        return;
    }

    const timings = [
        { time: '10:00 AM - 1:00 PM', duration: '3 hours' },
        { time: '2:00 PM - 5:00 PM', duration: '3 hours' },
        { time: '9:00 AM - 12:00 PM', duration: '3 hours' }
    ];
    const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 201', 'Room 202'];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const startDate = exam.startDate ? new Date(exam.startDate) : new Date();

    exam.subjects.forEach((subject, index) => {
        const examDate = new Date(startDate);
        examDate.setDate(startDate.getDate() + index);
        const dateStr = examDate.toISOString().split('T')[0];
        const dayOfWeek = daysOfWeek[examDate.getDay() === 0 ? 6 : examDate.getDay() - 1];

        // Use actual subject data if available from backend (SubjectDetail has startTime, endTime, roomNumber)
        const timing = subject.startTime && subject.endTime
            ? { time: `${subject.startTime} - ${subject.endTime}`, duration: '3 hours' }
            : timings[index % timings.length];
        const room = subject.roomNumber || rooms[index % rooms.length];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-700">${formatDate(dateStr)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${dayOfWeek}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${subject.name || subject.subjectName}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${timing.time}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${timing.duration}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${subject.maxMarks || 100}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${subject.passingMarks || Math.floor((subject.maxMarks || 100) * 0.33)}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${room}</td>
        `;
        timetableBody.appendChild(row);
    });
}

function closeTimetableModal() {
    document.getElementById('timetableModal')?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function downloadTimetable() {
    showToast('Timetable download started', 'success');
    // TODO: Implement actual PDF generation using jsPDF or similar
}


// ============= TIMETABLE TAB =============

function loadTimetable() {
    const examId = document.getElementById('timetableExam')?.value;
    const className = document.getElementById('timetableClass')?.value;

    if (!examId || !className) {
        showToast('Please select both exam and class', 'error');
        return;
    }

    showLoading();

    setTimeout(() => {
        const exam = currentExams.find(e => String(e.id) === String(examId));
        if (exam) {
            generateTimetableInTab(exam);
            showToast(`Timetable loaded for ${exam.name}`, 'success');
        } else {
            showToast('Exam not found', 'error');
        }
        hideLoading();
    }, 400);
}

function generateTimetableInTab(exam) {
    const timetableBody = document.getElementById('timetableBody');
    if (!timetableBody) return;

    timetableBody.innerHTML = '';

    if (!exam.subjects || exam.subjects.length === 0) {
        timetableBody.innerHTML = `
            <tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No subjects found for this exam</td></tr>
        `;
        return;
    }

    const startDate = exam.startDate ? new Date(exam.startDate) : new Date();
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    exam.subjects.forEach((subject, index) => {
        const examDate = new Date(startDate);
        examDate.setDate(startDate.getDate() + index);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-700">${examDate.toISOString().split('T')[0]}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${daysOfWeek[index % daysOfWeek.length]}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${subject.name || subject.subjectName}</td>
            <td class="px-6 py-4 text-sm text-gray-700">${subject.startTime && subject.endTime ? subject.startTime + ' - ' + subject.endTime : '10:00 AM - 1:00 PM'}</td>
            <td class="px-6 py-4 text-sm text-gray-700">3 hours</td>
            <td class="px-6 py-4 text-sm text-gray-700">${subject.maxMarks || 100}</td>
            <td class="px-6 py-4 text-sm">
                <button onclick="showExamTimetable(${exam.id})" class="text-blue-600 hover:text-blue-800 mr-2" title="View Full Timetable">
                    <i class="fas fa-expand"></i>
                </button>
            </td>
        `;
        timetableBody.appendChild(row);
    });
}


// ============= UTILITY FUNCTIONS =============

function getStatusClass(status) {
    switch (status?.toUpperCase()) {
        case 'SCHEDULED': return 'bg-green-100 text-green-700';
        case 'ONGOING': return 'bg-yellow-100 text-yellow-700';
        case 'COMPLETED': return 'bg-gray-100 text-gray-700';
        default: return 'bg-blue-100 text-blue-700';
    }
}

function getStatusText(status) {
    switch (status?.toUpperCase()) {
        case 'SCHEDULED': return 'UPCOMING';
        case 'ONGOING': return 'ONGOING';
        case 'COMPLETED': return 'COMPLETED';
        default: return 'SCHEDULED';
    }
}

function formatDate(dateString) {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatExamType(type) {
    const types = {
        'TERM1': 'Term 1 Examination',
        'TERM2': 'Term 2 Examination',
        'TERM3': 'Term 3 Examination',
        'UNIT_TEST': 'Unit Test',
        'MID_TERM': 'Mid Term Examination',
        'FINAL': 'Final Examination'
    };
    return types[type] || type || 'Exam';
}

function getClassName(classId) {
    return `Class ${classId}`;
}


// ============= SIDEBAR =============

function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mainContent = document.getElementById('mainContent');
    const toggleIcon = document.getElementById('sidebarToggleIcon');

    if (!sidebar || !sidebarToggle) return;

    let isMobile = window.innerWidth < 1024;
    let sidebarCollapsed = false;

    function handleResize() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 1024;

        if (wasMobile !== isMobile) {
            if (isMobile) {
                closeMobileSidebar();
            } else {
                sidebar.classList.remove('mobile-open');
                if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                document.body.classList.remove('overflow-hidden');

                if (sidebarCollapsed) {
                    sidebar.classList.add('collapsed');
                    mainContent?.classList.add('sidebar-collapsed');
                    if (toggleIcon) toggleIcon.className = 'fas fa-bars text-xl';
                } else {
                    sidebar.classList.remove('collapsed');
                    mainContent?.classList.remove('sidebar-collapsed');
                    if (toggleIcon) toggleIcon.className = 'fas fa-times text-xl';
                }
            }
        }
    }

    function toggleSidebar() {
        if (isMobile) {
            sidebar.classList.contains('mobile-open') ? closeMobileSidebar() : openMobileSidebar();
        } else {
            sidebarCollapsed = !sidebarCollapsed;
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent?.classList.add('sidebar-collapsed');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars text-xl';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent?.classList.remove('sidebar-collapsed');
                if (toggleIcon) toggleIcon.className = 'fas fa-times text-xl';
            }
        }
    }

    function openMobileSidebar() {
        sidebar.classList.add('mobile-open');
        sidebarOverlay?.classList.add('active');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileSidebar() {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay?.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    }

    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', closeMobileSidebar);
    window.addEventListener('resize', handleResize);

    document.getElementById('logoutBtn')?.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/login.html';
        }
    });
}

function setupDropdowns() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsDropdown = document.getElementById('notificationsDropdown');

    notificationsBtn?.addEventListener('click', function (e) {
        e.stopPropagation();
        notificationsDropdown?.classList.toggle('hidden');
    });

    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenuDropdown = document.getElementById('userMenuDropdown');

    userMenuBtn?.addEventListener('click', function (e) {
        e.stopPropagation();
        userMenuDropdown?.classList.toggle('hidden');
    });

    document.addEventListener('click', function () {
        notificationsDropdown?.classList.add('hidden');
        userMenuDropdown?.classList.add('hidden');
    });
}


// ============= TOAST NOTIFICATIONS =============

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getToastIcon(type)} mr-3"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close ml-4">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 5000);

    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function showLoading() {
    document.getElementById('loadingOverlay')?.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay')?.classList.add('hidden');
}


// ============= EXPORT TO GLOBAL SCOPE =============

window.showExamTimetable = showExamTimetable;
window.closeTimetableModal = closeTimetableModal;
window.downloadTimetable = downloadTimetable;
window.editExam = openEditModal;           // kept for any inline onclick="editExam(id)"
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal;
window.submitEditExam = submitEditExam;
window.addEditSubjectRow = addEditSubjectRow;
window.deleteExam = deleteExam;
window.openStatusModal = openStatusModal;
window.closeStatusModal = closeStatusModal;
window.submitStatusUpdate = submitStatusUpdate;