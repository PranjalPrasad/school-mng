 
        // ============================================================================
        // DUMMY DATA - Assignments with all required fields
        // ============================================================================
        const dummyAssignments = [
            {
                id: 1,
                title: 'Mathematics - Algebra Final Exam',
                subject: 'Mathematics',
                className: 'Class 10',
                section: 'A',
                description: 'Complete all problems from Chapter 1-5. Show all working steps.',
                gradingType: 'marks',
                totalMarks: 100,
                startDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                allowLateSubmission: true,
                allowResubmission: false,
                priority: 'high',
                assignTo: 'specific_class',
                assignedClasses: ['Class 10'],
                assignedStudents: [],
                attachments: ['algebra_notes.pdf'],
                externalLink: '',
                notifyStudents: true,
                notifyParents: true,
                sendReminders: true,
                sendLateWarnings: false,
                status: 'active',
                publishStatus: 'PUBLISHED',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'admin',
                academicYear: '2024-2025',
                term: 'First Term',
                totalStudents: 40,
                submittedCount: 15,
                pendingCount: 25,
                lateCount: 2,
                gradedCount: 8,
                needsGrading: 7,
                submissionRate: 37.5,
                averageScore: 72
            },
            {
                id: 2,
                title: 'Science Project - Renewable Energy',
                subject: 'Science',
                className: 'Class 9',
                section: 'B',
                description: 'Create a working model or presentation about renewable energy sources.',
                gradingType: 'rubric',
                totalMarks: 50,
                startDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                allowLateSubmission: false,
                allowResubmission: true,
                priority: 'medium',
                assignTo: 'specific_class',
                assignedClasses: ['Class 9'],
                assignedStudents: [],
                attachments: ['project_guidelines.pdf'],
                externalLink: '',
                notifyStudents: true,
                notifyParents: true,
                sendReminders: true,
                sendLateWarnings: false,
                status: 'active',
                publishStatus: 'PUBLISHED',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'teacher1',
                academicYear: '2024-2025',
                term: 'First Term',
                totalStudents: 35,
                submittedCount: 8,
                pendingCount: 27,
                lateCount: 0,
                gradedCount: 0,
                needsGrading: 8,
                submissionRate: 22.8,
                averageScore: 0
            },
            {
                id: 3,
                title: 'English Essay - Climate Change',
                subject: 'English',
                className: 'Class 8',
                section: 'A',
                description: 'Write a 500-word essay on climate change effects.',
                gradingType: 'grade',
                totalMarks: 25,
                startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                allowLateSubmission: true,
                allowResubmission: false,
                priority: 'low',
                assignTo: 'specific_class',
                assignedClasses: ['Class 8'],
                assignedStudents: [],
                attachments: [],
                externalLink: '',
                notifyStudents: true,
                notifyParents: false,
                sendReminders: false,
                sendLateWarnings: true,
                status: 'completed',
                publishStatus: 'PUBLISHED',
                createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin',
                academicYear: '2024-2025',
                term: 'First Term',
                totalStudents: 30,
                submittedCount: 30,
                pendingCount: 0,
                lateCount: 5,
                gradedCount: 30,
                needsGrading: 0,
                submissionRate: 100,
                averageScore: 85
            }
        ];

        // Sample drafts
        const dummyDrafts = [
            {
                id: 101,
                title: 'History Project - Ancient Civilizations',
                subject: 'Social Studies',
                className: 'Class 7',
                section: 'A',
                description: 'Research and present on any ancient civilization.',
                gradingType: 'rubric',
                totalMarks: 40,
                startDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
                allowLateSubmission: true,
                allowResubmission: true,
                priority: 'medium',
                assignTo: 'specific_class',
                assignedClasses: ['Class 7'],
                assignedStudents: [],
                attachments: [],
                externalLink: '',
                notifyStudents: true,
                notifyParents: true,
                sendReminders: true,
                sendLateWarnings: false,
                status: 'draft',
                publishStatus: 'DRAFT',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'admin',
                academicYear: '2024-2025',
                term: 'First Term',
                totalStudents: 0,
                submittedCount: 0,
                pendingCount: 0,
                lateCount: 0,
                gradedCount: 0,
                needsGrading: 0,
                submissionRate: 0,
                averageScore: 0
            }
        ];

        // Global variables
        let sidebarCollapsed = false;
        let isMobile = window.innerWidth < 1024;
        let assignments = [...dummyAssignments];
        let drafts = [...dummyDrafts];
        let scheduled = [];
        let submissions = [];
        let students = [];
        let notifications = [];
        let currentPage = 1;
        const itemsPerPage = 10;
        let filteredAssignments = [...assignments];
        let currentTab = 'active';
        let selectedStudents = [];
        let selectedAssignments = new Set();
        let autosaveTimeout;
        let formValidators = {};
        let submissionsModalCurrentAssignment = null;

        // Session Management
        const USER_SESSION_KEY = 'school_portal_session';
        const FORM_DRAFT_KEY = 'assignment_form_draft';

        // Sample students for checkbox
        const sampleStudents = [
            { id: 101, name: 'Rohan Sharma', rollNo: '101', class: 'Class 10', section: 'A' },
            { id: 102, name: 'Priya Singh', rollNo: '102', class: 'Class 10', section: 'A' },
            { id: 103, name: 'Amit Kumar', rollNo: '103', class: 'Class 10', section: 'B' },
            { id: 104, name: 'Neha Gupta', rollNo: '104', class: 'Class 9', section: 'A' },
            { id: 105, name: 'Vikram Patel', rollNo: '105', class: 'Class 9', section: 'B' },
            { id: 106, name: 'Sanya Verma', rollNo: '106', class: 'Class 8', section: 'A' }
        ];

        // Sample submissions
        const sampleSubmissions = [
            { id: 1, assignmentId: 1, studentId: 101, studentName: 'Rohan Sharma', rollNumber: '101', section: 'A', status: 'submitted', submittedDate: new Date().toISOString(), obtainedMarks: 85, grade: 'A', teacherFeedback: 'Good work!', isLate: false },
            { id: 2, assignmentId: 1, studentId: 102, studentName: 'Priya Singh', rollNumber: '102', section: 'A', status: 'pending', submittedDate: null, obtainedMarks: null, grade: null, teacherFeedback: '', isLate: false },
            { id: 3, assignmentId: 1, studentId: 103, studentName: 'Amit Kumar', rollNumber: '103', section: 'B', status: 'late', submittedDate: new Date(Date.now() - 2*24*60*60*1000).toISOString(), obtainedMarks: null, grade: null, teacherFeedback: '', isLate: true }
        ];

        // ============================================================================
        // UTILITY FUNCTIONS
        // ============================================================================

        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            let icon = 'fa-check-circle';
            if (type === 'error') icon = 'fa-exclamation-circle';
            else if (type === 'warning') icon = 'fa-exclamation-triangle';
            else if (type === 'info') icon = 'fa-info-circle';
            
            toast.innerHTML = `<i class="fas ${icon} mr-2"></i>${message}`;
            toastContainer.appendChild(toast);
            
            setTimeout(() => toast.remove(), 3000);
        }

        function showConfirmDialog(title, message, onConfirm) {
            const modal = document.getElementById('confirmModal');
            document.getElementById('confirmTitle').textContent = title;
            document.getElementById('confirmMessage').textContent = message;
            modal.classList.add('active');
            
            const handleConfirm = () => {
                modal.classList.remove('active');
                onConfirm();
                cleanup();
            };
            
            const handleCancel = () => {
                modal.classList.remove('active');
                cleanup();
            };
            
            const cleanup = () => {
                document.getElementById('confirmOk').removeEventListener('click', handleConfirm);
                document.getElementById('confirmCancel').removeEventListener('click', handleCancel);
            };
            
            document.getElementById('confirmOk').addEventListener('click', handleConfirm);
            document.getElementById('confirmCancel').addEventListener('click', handleCancel);
        }

        function showKeyboardShortcuts() {
            document.getElementById('shortcutsModal').classList.add('active');
        }

        function closeShortcutsModal() {
            document.getElementById('shortcutsModal').classList.remove('active');
        }

        window.toggleGradingMethod = function() {
            const method = document.querySelector('input[name="gradingMethod"]:checked').value;
            const marksSection = document.getElementById('marksSection');
            const gradeSection = document.getElementById('gradeSection');
            const marksRequired = document.getElementById('marksRequired');
            const gradeRequired = document.getElementById('gradeRequired');
            
            if (method === 'marks') {
                marksSection.style.display = 'block';
                gradeSection.style.display = 'none';
                marksRequired.classList.remove('hidden');
                gradeRequired.classList.add('hidden');
            } else if (method === 'grade') {
                marksSection.style.display = 'none';
                gradeSection.style.display = 'block';
                marksRequired.classList.add('hidden');
                gradeRequired.classList.remove('hidden');
            } else {
                marksSection.style.display = 'block';
                gradeSection.style.display = 'block';
                marksRequired.classList.remove('hidden');
                gradeRequired.classList.remove('hidden');
            }
        };

        function setupPublishOptions() {
            const radios = document.querySelectorAll('input[name="publishOption"]');
            const schedulePicker = document.getElementById('schedulePicker');
            const draftInfo = document.getElementById('draftInfo');
            const saveText = document.getElementById('saveButtonText');
            
            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'schedule_publish') {
                        schedulePicker.classList.remove('hidden');
                        draftInfo.classList.add('hidden');
                        saveText.textContent = 'Schedule Publish';
                    } else if (this.value === 'save_draft') {
                        schedulePicker.classList.add('hidden');
                        draftInfo.classList.remove('hidden');
                        saveText.textContent = 'Save Draft';
                    } else {
                        schedulePicker.classList.add('hidden');
                        draftInfo.classList.add('hidden');
                        saveText.textContent = 'Publish Now';
                    }
                });
            });
        }

        // ============================================================================
        // RENDER FUNCTIONS
        // ============================================================================

        function renderAssignments() {
    const list = document.getElementById('assignmentsList');
    const pagination = document.getElementById('pagination');
    const emptyState = document.getElementById('emptyStateContainer');
    
    // Filter data based on current tab
    const tabFilters = {
        'active': a => a.status === 'active',
        'pending': a => a.status === 'active' && a.pendingCount > 0,
        'grading': a => a.needsGrading > 0,
        'completed': a => a.status === 'completed',
        'scheduled': a => a.publishStatus === 'SCHEDULED'
    };
    
    filteredAssignments = currentTab === 'drafts' ? drafts : 
                         assignments.filter(tabFilters[currentTab] || (() => true));
    
    // Handle empty state
    if (!filteredAssignments.length) {
        list.innerHTML = '';
        emptyState.classList.remove('hidden');
        pagination.classList.add('hidden');
        
        const hasFilters = ['searchAssignments', 'filterSubject', 'filterClass', 'filterStatus']
            .some(id => document.getElementById(id)?.value && 
                 document.getElementById(id).value !== 'all');
        
        document.querySelectorAll('[data-state]').forEach(el => el.classList.add('hidden'));
        document.querySelector(`[data-state="${hasFilters ? 'no-results' : 'no-assignments'}"]`)
            ?.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Pagination
    const totalItems = filteredAssignments.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentData = filteredAssignments.slice(start, start + itemsPerPage);
    
    // Generate HTML
    list.innerHTML = currentData.map(a => {
        const dueDate = new Date(a.dueDate);
        const daysLeft = Math.ceil((dueDate - new Date()) / (1000 * 3600 * 24));
        const dueStatus = daysLeft < 0 ? 'overdue' : daysLeft <= 2 ? 'soon' : 'normal';
        const dueText = daysLeft < 0 ? `Overdue ${Math.abs(daysLeft)}d` : 
                       `Due in ${daysLeft}d`;
        const subRate = a.totalStudents ? Math.round((a.submittedCount / a.totalStudents) * 100) : 0;
        const isSelected = selectedAssignments.has(a.id);
        
        return `
            <div class="assignment-card bg-white border border-gray-200 rounded-lg p-5 mb-4 due-${dueStatus} ${isSelected ? 'selected-row' : ''}">
                <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div class="flex items-start gap-3 flex-1">
                        <input type="checkbox" class="assignment-checkbox mt-1" value="${a.id}" 
                            ${isSelected ? 'checked' : ''} onchange="toggleAssignmentSelection(${a.id}, this.checked)">
                        <div class="h-10 w-10 rounded-full flex items-center justify-center ${getPriorityColorClass(a.priority, true)}">
                            <i class="fas ${getSubjectIcon(a.subject)} ${getPriorityColorClass(a.priority)}"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800 mb-2">${a.title}</h4>
                            <div class="flex items-center gap-4 text-sm text-gray-600">
                                <span><i class="fas fa-book mr-1"></i>${a.subject}</span>
                                <span><i class="fas fa-users mr-1"></i>${a.className}</span>
                                <span class="section-badge">${a.section === 'All Sections' ? 'All Sections' : a.section}</span>
                                <span><i class="fas fa-calendar-alt mr-1"></i>${dueDate.toLocaleDateString('en-IN')}</span>
                            </div>
                            <div class="mt-3 flex items-center gap-4 text-sm">
                                <span>Submissions: <span class="${subRate === 100 ? 'text-green-600' : subRate >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                                    ${a.submittedCount}/${a.totalStudents}</span></span>
                                ${a.needsGrading > 0 ? `<span>Needs Grading: <span class="text-red-600">${a.needsGrading}</span></span>` : ''}
                                ${a.totalMarks ? `<span>Marks: ${a.totalMarks}</span>` : ''}
                            </div>
                            ${a.description ? `<p class="mt-3 text-gray-600 text-sm">${a.description.substring(0, 100)}${a.description.length > 100 ? '...' : ''}</p>` : ''}
                        </div>
                    </div>
                    <div class="flex gap-2 ml-12 lg:ml-0">
                        <button onclick="openSubmissionsModal(${a.id})" class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><i class="fas fa-list-check mr-2"></i>Submissions</button>
                        ${a.status === 'active' ? `
                            <button onclick="openEditModal(${a.id})" class="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"><i class="fas fa-edit mr-2"></i>Edit</button>
                            <button onclick="updateAssignmentStatus(${a.id}, 'completed')" class="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><i class="fas fa-check mr-2"></i>Complete</button>
                        ` : a.status === 'completed' ? `
                            <button onclick="updateAssignmentStatus(${a.id}, 'active')" class="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><i class="fas fa-redo mr-2"></i>Reopen</button>
                        ` : ''}
                        ${a.publishStatus === 'DRAFT' ? `
                            <button onclick="publishDraft(${a.id})" class="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><i class="fas fa-globe mr-2"></i>Publish</button>
                        ` : ''}
                        <button onclick="deleteAssignment(${a.id})" class="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><i class="fas fa-trash mr-2"></i>Delete</button>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                    <span class="${daysLeft < 0 ? 'text-red-600' : daysLeft <= 2 ? 'text-yellow-600' : 'text-green-600'}">
                        <i class="fas fa-clock mr-1"></i>${dueText}
                    </span>
                    <span class="text-gray-500">Created: ${new Date(a.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
            </div>
        `;
    }).join('');
    
    updatePagination(totalItems, totalPages, start, start + currentData.length);
    pagination.classList.remove('hidden');
    updateStatistics();
}

        function renderDrafts() {
            const draftsList = document.getElementById('draftsList');
            if (!draftsList) return;
            
            if (drafts.length === 0) {
                draftsList.innerHTML = `
                    <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <i class="fas fa-pen text-4xl text-gray-300 mb-3"></i>
                        <p class="text-gray-500">No draft assignments found</p>
                    </div>
                `;
                return;
            }
            
            let html = '';
            drafts.forEach(draft => {
                html += `
                    <div class="bg-white border border-gray-200 rounded-lg p-5 mb-4 border-l-4 border-yellow-400">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-semibold text-gray-800">${draft.title}</h4>
                                <p class="text-sm text-gray-600 mt-1">${draft.subject} | ${draft.className} - ${draft.section}</p>
                                <p class="text-xs text-gray-500 mt-2">Last saved: ${new Date(draft.updatedAt || draft.createdAt).toLocaleString()}</p>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="openEditModal(${draft.id})" class="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                                    <i class="fas fa-edit mr-1"></i> Edit
                                </button>
                                <button onclick="publishDraft(${draft.id})" class="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100">
                                    <i class="fas fa-globe mr-1"></i> Publish
                                </button>
                            </div>
                        </div>
                        ${draft.scheduledPublishDate ? `
                            <div class="mt-3 text-xs text-purple-600">
                                <i class="far fa-clock mr-1"></i> Scheduled: ${new Date(draft.scheduledPublishDate).toLocaleString()}
                            </div>
                        ` : ''}
                    </div>
                `;
            });
            draftsList.innerHTML = html;
        }

        function renderScheduled() {
            const scheduledList = document.getElementById('scheduledList');
            if (!scheduledList) return;
            
            const scheduledItems = assignments.filter(a => a.publishStatus === 'SCHEDULED');
            
            if (scheduledItems.length === 0) {
                scheduledList.innerHTML = `
                    <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <i class="fas fa-clock text-4xl text-gray-300 mb-3"></i>
                        <p class="text-gray-500">No scheduled assignments</p>
                    </div>
                `;
                return;
            }
            
            let html = '';
            scheduledItems.forEach(item => {
                html += `
                    <div class="bg-white border border-gray-200 rounded-lg p-5 mb-4 border-l-4 border-purple-500">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-semibold text-gray-800">${item.title}</h4>
                                <p class="text-sm text-gray-600 mt-1">${item.subject} | ${item.className} - ${item.section}</p>
                                <div class="mt-2">
                                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                        <i class="far fa-clock mr-1"></i> 
                                        Publishes: ${new Date(item.scheduledPublishDate).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <button onclick="openEditModal(${item.id})" class="text-blue-600 hover:text-blue-800">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            scheduledList.innerHTML = html;
        }

        function renderSubmissionsTable(assignmentId) {
            const assignment = assignments.find(a => a.id === assignmentId);
            if (!assignment) return;
            
            const submissionsList = sampleSubmissions.filter(s => s.assignmentId === assignmentId);
            const tableBody = document.getElementById('submissionsTableBody');
            
            document.getElementById('totalStudents').textContent = submissionsList.length;
            document.getElementById('submittedCount').textContent = submissionsList.filter(s => s.status === 'submitted' || s.status === 'graded').length;
            document.getElementById('pendingCount').textContent = submissionsList.filter(s => s.status === 'pending').length;
            document.getElementById('lateCount').textContent = submissionsList.filter(s => s.isLate).length;
            
            let html = '';
            submissionsList.forEach(s => {
                let statusBadge = '';
                let marks = '-';
                
                if (s.status === 'submitted') {
                    statusBadge = '<span class="badge badge-success">Submitted</span>';
                    marks = s.obtainedMarks ? `${s.obtainedMarks}/${assignment.totalMarks}` : 'Not graded';
                } else if (s.status === 'graded') {
                    statusBadge = '<span class="badge badge-info">Graded</span>';
                    marks = s.obtainedMarks ? `${s.obtainedMarks}/${assignment.totalMarks}` : '-';
                    if (s.grade) marks += ` (${s.grade})`;
                } else if (s.isLate) {
                    statusBadge = '<span class="badge badge-danger">Late</span>';
                } else {
                    statusBadge = '<span class="badge badge-warning">Pending</span>';
                }
                
                html += `
                    <tr>
                        <td>${s.studentName}</td>
                        <td>${s.rollNumber}</td>
                        <td>${s.section}</td>
                        <td>${statusBadge}</td>
                        <td>${s.submittedDate ? new Date(s.submittedDate).toLocaleString() : 'Not submitted'}</td>
                        <td>${marks}</td>
                        <td>${s.teacherFeedback || '-'}</td>
                        <td>
                            <button onclick="openGradeModal(${assignmentId}, ${s.studentId})" class="text-green-600 hover:text-green-800 mr-2">
                                <i class="fas fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            tableBody.innerHTML = html;
        }

        function loadReportsData() {
            // Calculate stats from dummy data
            const totalSubmissions = sampleSubmissions.length;
            const totalStudents = 40; // Dummy
            const submissionRate = Math.round((totalSubmissions / totalStudents) * 100);
            const avgScore = 72;
            const lateCount = sampleSubmissions.filter(s => s.isLate).length;
            const gradedCount = sampleSubmissions.filter(s => s.obtainedMarks !== null).length;
            const gradingProgress = Math.round((gradedCount / totalSubmissions) * 100);
            
            document.getElementById('submissionRate').textContent = submissionRate + '%';
            document.getElementById('averageScore').textContent = avgScore;
            document.getElementById('lateSubmissions').textContent = lateCount;
            document.getElementById('gradingProgress').textContent = gradingProgress + '%';
            
            // Grade distribution
            document.getElementById('gradeAPlus').textContent = '2 students';
            document.getElementById('gradeAPlusBar').style.width = '15%';
            document.getElementById('gradeA').textContent = '5 students';
            document.getElementById('gradeABar').style.width = '25%';
            document.getElementById('gradeB').textContent = '4 students';
            document.getElementById('gradeBBar').style.width = '20%';
            document.getElementById('gradeC').textContent = '3 students';
            document.getElementById('gradeCBar').style.width = '15%';
            document.getElementById('gradeD').textContent = '2 students';
            document.getElementById('gradeDBar').style.width = '10%';
            document.getElementById('gradeF').textContent = '1 student';
            document.getElementById('gradeFBar').style.width = '5%';
        }

        // ============================================================================
        // MODAL FUNCTIONS
        // ============================================================================

        window.openAddModal = function() {
            document.getElementById('modalTitle').textContent = 'Add New Assignment';
            document.getElementById('assignmentForm').reset();
            document.getElementById('assignmentId').value = '';
            
            document.getElementById('multipleClassesSection').classList.add('hidden');
            document.getElementById('individualStudentsSection').classList.add('hidden');
            
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };
            
            document.getElementById('startDate').value = formatDate(now);
            document.getElementById('dueDate').value = formatDate(tomorrow);
            
            document.querySelector('input[name="priority"][value="medium"]').checked = true;
            document.querySelector('input[name="assignTo"][value="specific_class"]').checked = true;
            document.querySelector('input[name="publishOption"][value="publish_now"]').checked = true;
            
            document.getElementById('notifyStudents').checked = true;
            document.getElementById('notifyParents').checked = true;
            document.getElementById('sendReminders').checked = true;
            
            document.getElementById('uploadedFiles').classList.add('hidden');
            document.getElementById('fileList').innerHTML = '';
            
            document.getElementById('assignmentModal').classList.add('active');
            document.getElementById('assignmentTitle').focus();
        };

        window.openEditModal = function(assignmentId) {
            const allAssignments = [...assignments, ...drafts];
            const assignment = allAssignments.find(a => a.id === assignmentId);
            if (!assignment) return;
            
            document.getElementById('modalTitle').textContent = 'Edit Assignment';
            document.getElementById('assignmentId').value = assignment.id;
            
            document.getElementById('assignmentTitle').value = assignment.title;
            document.getElementById('subject').value = assignment.subject;
            document.getElementById('class').value = assignment.className;
            document.getElementById('section').value = assignment.section;
            document.getElementById('description').value = assignment.description;
            document.getElementById('gradingType').value = assignment.gradingType;
            document.getElementById('totalMarks').value = assignment.totalMarks;
            
            const formatDateForInput = (dateStr) => {
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };
            
            document.getElementById('startDate').value = formatDateForInput(assignment.startDate);
            document.getElementById('dueDate').value = formatDateForInput(assignment.dueDate);
            
            document.getElementById('allowLateSubmission').checked = assignment.allowLateSubmission || false;
            document.getElementById('allowResubmission').checked = assignment.allowResubmission || false;
            
            document.querySelector(`input[name="priority"][value="${assignment.priority}"]`).checked = true;
            document.querySelector(`input[name="assignTo"][value="${assignment.assignTo}"]`).checked = true;
            
            if (assignment.assignTo === 'multiple_classes') {
                document.getElementById('multipleClassesSection').classList.remove('hidden');
            }
            
            document.getElementById('notifyStudents').checked = assignment.notifyStudents !== false;
            document.getElementById('notifyParents').checked = assignment.notifyParents !== false;
            document.getElementById('sendReminders').checked = assignment.sendReminders !== false;
            document.getElementById('sendLateWarnings').checked = assignment.sendLateWarnings || false;
            
            document.getElementById('externalLink').value = assignment.externalLink || '';
            
            if (assignment.attachments && assignment.attachments.length > 0) {
                document.getElementById('uploadedFiles').classList.remove('hidden');
                const fileList = document.getElementById('fileList');
                fileList.innerHTML = '';
                assignment.attachments.forEach(file => {
                    fileList.innerHTML += `<div class="file-attachment"><i class="fas fa-paperclip mr-1"></i>${file}</div>`;
                });
            }
            
            if (assignment.publishStatus === 'DRAFT') {
                document.querySelector('input[name="publishOption"][value="save_draft"]').checked = true;
                document.getElementById('saveButtonText').textContent = 'Save Draft';
                document.getElementById('draftInfo').classList.remove('hidden');
            } else if (assignment.publishStatus === 'SCHEDULED' && assignment.scheduledPublishDate) {
                document.querySelector('input[name="publishOption"][value="schedule_publish"]').checked = true;
                document.getElementById('scheduledPublishDate').value = assignment.scheduledPublishDate.slice(0, 16);
                document.getElementById('schedulePicker').classList.remove('hidden');
                document.getElementById('saveButtonText').textContent = 'Schedule Publish';
            }
            
            document.getElementById('assignmentModal').classList.add('active');
        };

        window.closeModal = function() {
            document.getElementById('assignmentModal').classList.remove('active');
        };

        window.openSubmissionsModal = function(assignmentId) {
            submissionsModalCurrentAssignment = assignmentId;
            const assignment = assignments.find(a => a.id === assignmentId);
            if (!assignment) return;
            
            document.getElementById('submissionModalTitle').textContent = `Submissions: ${assignment.title}`;
            document.getElementById('submissionAssignmentInfo').textContent = `${assignment.subject} | ${assignment.className} | Due: ${new Date(assignment.dueDate).toLocaleDateString()}`;
            
            renderSubmissionsTable(assignmentId);
            
            document.getElementById('submissionsModal').classList.add('active');
        };

        window.closeSubmissionsModal = function() {
            document.getElementById('submissionsModal').classList.remove('active');
            submissionsModalCurrentAssignment = null;
        };

        window.openGradeModal = function(assignmentId, studentId) {
            const assignment = assignments.find(a => a.id === assignmentId);
            const student = sampleStudents.find(s => s.id === studentId);
            if (!assignment || !student) return;
            
            document.getElementById('gradeModalTitle').textContent = `Grade: ${assignment.title}`;
            document.getElementById('gradeStudentInfo').textContent = `Student: ${student.name} (${student.rollNo}) | ${assignment.subject}`;
            document.getElementById('gradeAssignmentId').value = assignmentId;
            document.getElementById('gradeStudentId').value = studentId;
            document.getElementById('maxMarks').textContent = assignment.totalMarks;
            
            const submission = sampleSubmissions.find(s => s.assignmentId === assignmentId && s.studentId === studentId);
            
            if (submission) {
                document.getElementById('obtainedMarks').value = submission.obtainedMarks || '';
                document.getElementById('gradeLetter').value = submission.grade || '';
                document.getElementById('teacherFeedback').value = submission.teacherFeedback || '';
            }
            
            if (assignment.gradingType === 'grade') {
                document.querySelector('input[name="gradingMethod"][value="grade"]').checked = true;
            } else {
                document.querySelector('input[name="gradingMethod"][value="marks"]').checked = true;
            }
            window.toggleGradingMethod();
            
            document.getElementById('gradeModal').classList.add('active');
        };

        window.closeGradeModal = function() {
            document.getElementById('gradeModal').classList.remove('active');
        };

        window.openReportsModal = function() {
            document.getElementById('reportsModal').classList.add('active');
            loadReportsData();
        };

        window.closeReportsModal = function() {
            document.getElementById('reportsModal').classList.remove('active');
        };

        window.openBulkActionsModal = function() {
            if (selectedAssignments.size === 0) {
                showToast('Please select at least one assignment', 'warning');
                return;
            }
            document.getElementById('selectedCount').textContent = selectedAssignments.size;
            document.getElementById('bulkActionsModal').classList.add('active');
        };

        window.closeBulkActionsModal = function() {
            document.getElementById('bulkActionsModal').classList.remove('active');
        };

        // ============================================================================
        // SELECTION FUNCTIONS
        // ============================================================================

        window.toggleAssignmentSelection = function(id, checked) {
            if (checked) {
                selectedAssignments.add(id);
            } else {
                selectedAssignments.delete(id);
            }
            
            document.querySelectorAll('.assignment-card').forEach(card => {
                const checkbox = card.querySelector('.assignment-checkbox');
                if (checkbox && checkbox.value == id) {
                    if (checked) {
                        card.classList.add('selected-row');
                    } else {
                        card.classList.remove('selected-row');
                    }
                }
            });
            
            const bulkBtn = document.getElementById('bulkActionsBtn');
            if (bulkBtn) {
                bulkBtn.innerHTML = selectedAssignments.size > 0 
                    ? `<i class="fas fa-cogs"></i> Bulk Actions (${selectedAssignments.size})`
                    : `<i class="fas fa-cogs"></i> Bulk Actions`;
            }
        };

        window.clearSelectedAssignments = function() {
            selectedAssignments.clear();
            document.getElementById('selectedCount').textContent = '0';
            renderAssignments();
            showToast('Selection cleared', 'info');
        };

        // ============================================================================
        // CRUD FUNCTIONS
        // ============================================================================

        function handleAssignmentSubmit(e) {
            e.preventDefault();
            
            const assignmentId = document.getElementById('assignmentId').value;
            const title = document.getElementById('assignmentTitle').value.trim();
            const subject = document.getElementById('subject').value;
            const classValue = document.getElementById('class').value;
            const section = document.getElementById('section').value;
            const description = document.getElementById('description').value.trim();
            const gradingType = document.getElementById('gradingType').value;
            const totalMarks = parseInt(document.getElementById('totalMarks').value);
            const startDate = document.getElementById('startDate').value;
            const dueDate = document.getElementById('dueDate').value;
            const allowLateSubmission = document.getElementById('allowLateSubmission').checked;
            const allowResubmission = document.getElementById('allowResubmission').checked;
            const priority = document.querySelector('input[name="priority"]:checked')?.value || 'medium';
            const assignTo = document.querySelector('input[name="assignTo"]:checked')?.value || 'specific_class';
            const externalLink = document.getElementById('externalLink').value.trim();
            const notifyStudents = document.getElementById('notifyStudents').checked;
            const notifyParents = document.getElementById('notifyParents').checked;
            const sendReminders = document.getElementById('sendReminders').checked;
            const sendLateWarnings = document.getElementById('sendLateWarnings').checked;
            const publishOption = document.querySelector('input[name="publishOption"]:checked')?.value || 'publish_now';
            
            let assignedClasses = [];
            if (assignTo === 'specific_class') {
                assignedClasses = [classValue];
            } else if (assignTo === 'multiple_classes') {
                document.querySelectorAll('#multipleClassesSection input[type="checkbox"]:checked').forEach(cb => {
                    assignedClasses.push(cb.value);
                });
            }
            
            const newAssignment = {
                id: assignmentId ? parseInt(assignmentId) : Date.now(),
                title, subject, className: classValue, section, description, gradingType, totalMarks,
                startDate: new Date(startDate).toISOString(),
                dueDate: new Date(dueDate).toISOString(),
                allowLateSubmission, allowResubmission, priority, assignTo, assignedClasses,
                assignedStudents: [], attachments: [], externalLink, notifyStudents, notifyParents,
                sendReminders, sendLateWarnings, createdBy: 'admin',
                createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
                academicYear: '2024-2025', term: 'First Term',
                totalStudents: 40, submittedCount: 0, pendingCount: 40, lateCount: 0,
                gradedCount: 0, needsGrading: 0, submissionRate: 0, averageScore: 0
            };
            
            if (publishOption === 'save_draft') {
                newAssignment.status = 'draft';
                newAssignment.publishStatus = 'DRAFT';
                drafts.push(newAssignment);
                showToast('Draft saved successfully!', 'success');
            } else {
                newAssignment.status = 'active';
                newAssignment.publishStatus = 'PUBLISHED';
                if (assignmentId) {
                    const index = assignments.findIndex(a => a.id === parseInt(assignmentId));
                    if (index !== -1) assignments[index] = newAssignment;
                } else {
                    assignments.push(newAssignment);
                }
                showToast('Assignment published successfully!', 'success');
            }
            
            closeModal();
            renderAssignments();
            renderDrafts();
            updateStatistics();
        }

        function handleGradeSubmit(e) {
            e.preventDefault();
            showToast('Grade saved successfully!', 'success');
            closeGradeModal();
        }

        window.deleteAssignment = function(id) {
            const assignment = [...assignments, ...drafts].find(a => a.id === id);
            if (!assignment) return;
            
            showConfirmDialog(
                'Delete Assignment',
                `Are you sure you want to permanently delete "${assignment.title}"?`,
                () => {
                    assignments = assignments.filter(a => a.id !== id);
                    drafts = drafts.filter(d => d.id !== id);
                    renderAssignments();
                    renderDrafts();
                    showToast('Assignment deleted successfully!', 'success');
                }
            );
        };

        window.updateAssignmentStatus = function(id, newStatus) {
            const assignment = assignments.find(a => a.id === id);
            if (assignment) {
                assignment.status = newStatus;
                renderAssignments();
                showToast(`Assignment marked as ${newStatus}!`, 'success');
            }
        };

        window.publishDraft = function(id) {
            const draftIndex = drafts.findIndex(d => d.id === id);
            if (draftIndex === -1) return;
            
            const draft = drafts[draftIndex];
            draft.status = 'active';
            draft.publishStatus = 'PUBLISHED';
            assignments.push(draft);
            drafts.splice(draftIndex, 1);
            renderAssignments();
            renderDrafts();
            showToast('Draft published successfully!', 'success');
        };

        // ============================================================================
        // FILTER FUNCTIONS
        // ============================================================================

        function applyFilters() {
            const searchTerm = document.getElementById('searchAssignments').value.toLowerCase();
            const subjectFilter = document.getElementById('filterSubject').value;
            const classFilter = document.getElementById('filterClass').value;
            const statusFilter = document.getElementById('filterStatus').value;
            
            let filtered = [...assignments];
            
            if (currentTab === 'active') {
                filtered = filtered.filter(a => a.status === 'active');
            } else if (currentTab === 'pending') {
                filtered = filtered.filter(a => a.status === 'active' && a.pendingCount > 0);
            } else if (currentTab === 'grading') {
                filtered = filtered.filter(a => a.needsGrading > 0);
            } else if (currentTab === 'completed') {
                filtered = filtered.filter(a => a.status === 'completed');
            }
            
            if (searchTerm) {
                filtered = filtered.filter(a => 
                    a.title.toLowerCase().includes(searchTerm) ||
                    a.subject.toLowerCase().includes(searchTerm) ||
                    a.className.toLowerCase().includes(searchTerm)
                );
            }
            
            if (subjectFilter !== 'all') {
                filtered = filtered.filter(a => a.subject === subjectFilter);
            }
            
            if (classFilter !== 'all') {
                filtered = filtered.filter(a => a.className === classFilter);
            }
            
            if (statusFilter !== 'all') {
                filtered = filtered.filter(a => a.status === statusFilter);
            }
            
            filteredAssignments = filtered;
            currentPage = 1;
            renderAssignments();
        }

        function clearFilters() {
            document.getElementById('searchAssignments').value = '';
            document.getElementById('filterSubject').value = 'all';
            document.getElementById('filterClass').value = 'all';
            document.getElementById('filterStatus').value = 'all';
            applyFilters();
            showToast('Filters cleared', 'info');
        }

        function refreshAssignments() {
            renderAssignments();
            renderDrafts();
            showToast('Assignments refreshed!', 'success');
        }

        // ============================================================================
        // TAB FUNCTIONS
        // ============================================================================

        function handleTabChange(e) {
            const tab = e.target.dataset.tab;
            
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            currentTab = tab;
            
            document.querySelectorAll('.view-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            if (tab === 'drafts') {
                document.getElementById('draftsView').classList.remove('hidden');
                renderDrafts();
            } else if (tab === 'scheduled') {
                document.getElementById('scheduledView').classList.remove('hidden');
                renderScheduled();
            } else {
                document.getElementById('assignmentsView').classList.remove('hidden');
                applyFilters();
            }
            
            const titles = {
                'active': 'Active Assignments',
                'pending': 'Pending Submissions',
                'grading': 'Needs Grading',
                'completed': 'Completed Assignments'
            };
            if (titles[tab]) {
                document.getElementById('assignmentsListTitle').textContent = titles[tab];
            }
        }

        // ============================================================================
        // STATISTICS FUNCTIONS
        // ============================================================================

        function updateStatistics() {
            document.getElementById('totalAssignments').textContent = assignments.length;
            document.getElementById('activeAssignments').textContent = assignments.filter(a => a.status === 'active').length;
            document.getElementById('assignmentCount').textContent = assignments.filter(a => a.status === 'active').length;
            
            const pendingSubmissions = assignments.reduce((sum, a) => sum + (a.pendingCount || 0), 0);
            const lateSubmissions = assignments.reduce((sum, a) => sum + (a.lateCount || 0), 0);
            const needsGrading = assignments.reduce((sum, a) => sum + (a.needsGrading || 0), 0);
            const gradedCount = assignments.reduce((sum, a) => sum + (a.gradedCount || 0), 0);
            
            document.getElementById('pendingSubmissions').textContent = pendingSubmissions;
            document.getElementById('lateSubmissionsStat').textContent = lateSubmissions;
            document.getElementById('needsGrading').textContent = needsGrading;
            document.getElementById('gradedAssignments').textContent = gradedCount;
            
            const submissionRates = assignments.filter(a => a.submissionRate).map(a => a.submissionRate);
            const avgRate = submissionRates.length ? Math.round(submissionRates.reduce((a, b) => a + b, 0) / submissionRates.length) : 0;
            document.getElementById('overallSubmissionRate').textContent = avgRate + '%';
            
            const avgScores = assignments.filter(a => a.averageScore).map(a => a.averageScore);
            const avgScore = avgScores.length ? Math.round(avgScores.reduce((a, b) => a + b, 0) / avgScores.length) : 0;
            document.getElementById('averageScoreStat').textContent = avgScore;
            
            document.getElementById('draftCount').textContent = drafts.length;
            document.getElementById('draftCount').classList.toggle('hidden', drafts.length === 0);
        }

        // ============================================================================
        // PAGINATION FUNCTIONS
        // ============================================================================

        function updatePagination(totalItems, totalPages, startIndex, endIndex) {
            document.getElementById('startIndex').textContent = startIndex + 1;
            document.getElementById('endIndex').textContent = endIndex;
            document.getElementById('totalItems').textContent = totalItems;
            
            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
            
            const pageNumbers = document.getElementById('pageNumbers');
            pageNumbers.innerHTML = '';
            
            if (totalPages <= 1) return;
            
            const maxVisible = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            let endPage = Math.min(totalPages, startPage + maxVisible - 1);
            
            for (let i = startPage; i <= endPage; i++) {
                const btn = document.createElement('button');
                btn.className = `px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`;
                btn.textContent = i;
                btn.addEventListener('click', () => {
                    currentPage = i;
                    renderAssignments();
                });
                pageNumbers.appendChild(btn);
            }
        }

        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderAssignments();
            }
        }

        function goToNextPage() {
            const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderAssignments();
            }
        }

        // ============================================================================
        // HELPER FUNCTIONS
        // ============================================================================

        function getPriorityClass(priority) {
            switch (priority) {
                case 'high': return 'priority-high';
                case 'medium': return 'priority-medium';
                case 'low': return 'priority-low';
                default: return 'priority-medium';
            }
        }

        function getPriorityColorClass(priority, isBg = false) {
            switch (priority) {
                case 'high': return isBg ? 'bg-red-50' : 'text-red-500';
                case 'medium': return isBg ? 'bg-yellow-50' : 'text-yellow-500';
                case 'low': return isBg ? 'bg-green-50' : 'text-green-500';
                default: return isBg ? 'bg-gray-50' : 'text-gray-500';
            }
        }

        function getStatusClass(status) {
            switch (status) {
                case 'active': return 'status-in-progress';
                case 'pending': return 'status-pending';
                case 'completed': return 'status-completed';
                case 'graded': return 'status-graded';
                default: return 'status-pending';
            }
        }

        function getSubjectIcon(subject) {
            switch (subject?.toLowerCase()) {
                case 'mathematics': return 'fa-calculator';
                case 'science': return 'fa-flask';
                case 'english': return 'fa-book-open';
                case 'hindi': return 'fa-language';
                case 'social studies': return 'fa-globe-asia';
                case 'computer science': return 'fa-laptop-code';
                default: return 'fa-book';
            }
        }

        function handleAssignToChange(e) {
            const val = e.target.value;
            document.getElementById('multipleClassesSection').classList.toggle('hidden', val !== 'multiple_classes');
            document.getElementById('individualStudentsSection').classList.toggle('hidden', val !== 'individual_students');
        }

        // ============================================================================
        // EXPORT FUNCTIONS (Dummy implementations)
        // ============================================================================

        function exportToExcel() {
            showToast('Exporting to Excel...', 'info');
            setTimeout(() => showToast('Excel export completed!', 'success'), 1500);
        }

        function exportBulkToExcel() {
            showToast('Bulk export to Excel...', 'info');
            setTimeout(() => showToast('Bulk export completed!', 'success'), 1500);
        }

        function exportToPDF() {
            showToast('Exporting to PDF...', 'info');
            setTimeout(() => showToast('PDF export completed!', 'success'), 1500);
        }

        function exportBulkToPDF() {
            showToast('Bulk export to PDF...', 'info');
            setTimeout(() => showToast('Bulk PDF export completed!', 'success'), 1500);
        }

        function exportSubmissions() {
            showToast('Exporting submissions...', 'info');
            setTimeout(() => showToast('Submissions exported!', 'success'), 1500);
        }

        function sendReminders() {
            showToast('Sending reminders...', 'info');
            setTimeout(() => showToast('Reminders sent!', 'success'), 1500);
        }

        function downloadAllSubmissions() {
            showToast('Downloading submissions...', 'info');
            setTimeout(() => showToast('Download completed!', 'success'), 1500);
        }

        function openBulkGradeModal() {
            showToast('Bulk grading feature coming soon', 'info');
        }

        function executeBulkAction() {
            const action = document.querySelector('input[name="bulkAction"]:checked')?.value;
            if (!action) {
                showToast('Please select an action', 'warning');
                return;
            }
            showToast(`Executing bulk action: ${action}`, 'info');
            setTimeout(() => {
                closeBulkActionsModal();
                clearSelectedAssignments();
                showToast('Bulk action completed!', 'success');
            }, 1500);
        }

        function handleBulkActionChange(e) {
            const action = e.target.value;
            document.getElementById('statusChangeSettings').classList.add('hidden');
            document.getElementById('reminderSettings').classList.add('hidden');
            document.getElementById('exportSettings').classList.add('hidden');
            document.getElementById('deleteSettings').classList.add('hidden');
            document.getElementById('bulkActionSettings').classList.remove('hidden');
            
            if (action === 'change_status') {
                document.getElementById('statusChangeSettings').classList.remove('hidden');
            } else if (action === 'send_reminders') {
                document.getElementById('reminderSettings').classList.remove('hidden');
            } else if (action === 'export_data') {
                document.getElementById('exportSettings').classList.remove('hidden');
            } else if (action === 'delete_assignments') {
                document.getElementById('deleteSettings').classList.remove('hidden');
            }
            updateActionSummary();
        }

        function updateActionSummary() {
            const action = document.querySelector('input[name="bulkAction"]:checked')?.value;
            if (!action) return;
            
            const count = selectedAssignments.size;
            let summary = '';
            
            if (action === 'change_status') {
                const status = document.querySelector('input[name="newStatus"]:checked')?.value;
                if (status) summary = `Change status of ${count} assignment${count > 1 ? 's' : ''} to ${status}`;
            } else if (action === 'send_reminders') {
                summary = `Send reminders for ${count} assignment${count > 1 ? 's' : ''}`;
            } else if (action === 'export_data') {
                const format = document.querySelector('input[name="exportFormat"]:checked')?.value;
                if (format) summary = `Export ${count} assignment${count > 1 ? 's' : ''} as ${format.toUpperCase()}`;
            } else if (action === 'delete_assignments') {
                summary = `Permanently delete ${count} assignment${count > 1 ? 's' : ''}`;
            }
            
            if (summary) {
                document.getElementById('summaryText').textContent = summary;
                document.getElementById('actionSummary').classList.remove('hidden');
            }
        }

        // ============================================================================
        // SIDEBAR FUNCTIONS
        // ============================================================================

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const main = document.getElementById('mainContent');
            sidebarCollapsed = !sidebarCollapsed;
            
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                main.classList.add('sidebar-collapsed');
                document.getElementById('sidebarToggleIcon').className = 'fas fa-bars text-xl';
            } else {
                sidebar.classList.remove('collapsed');
                main.classList.remove('sidebar-collapsed');
                document.getElementById('sidebarToggleIcon').className = 'fas fa-times text-xl';
            }
        }

        function openMobileSidebar() {
            document.getElementById('sidebar').classList.add('mobile-open');
            document.getElementById('sidebarOverlay').classList.add('active');
        }

        function closeMobileSidebar() {
            document.getElementById('sidebar').classList.remove('mobile-open');
            document.getElementById('sidebarOverlay').classList.remove('active');
        }

        function toggleNotifications() {
            document.getElementById('notificationsDropdown').classList.toggle('hidden');
        }

        function toggleUserMenu() {
            document.getElementById('userMenuDropdown').classList.toggle('hidden');
        }

        function viewAllNotifications() {
            showToast('Opening all notifications...', 'info');
            closeNotificationsDropdown();
        }

        function closeNotificationsDropdown() {
            document.getElementById('notificationsDropdown').classList.add('hidden');
        }

        function handleLogout() {
            showConfirmDialog('Logout', 'Are you sure you want to logout?', () => {
                window.location.href = 'login.html';
            });
        }

        function checkSession() {
            const session = localStorage.getItem(USER_SESSION_KEY);
            if (!session) {
                const defaultSession = {
                    username: 'admin',
                    role: 'admin',
                    teacherId: 1,
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                };
                localStorage.setItem(USER_SESSION_KEY, JSON.stringify(defaultSession));
            }
        }

        // ============================================================================
        // INITIALIZATION
        // ============================================================================

        document.addEventListener('DOMContentLoaded', function() {
            checkSession();
            
            // Set up event listeners
            document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
            document.getElementById('notificationsBtn').addEventListener('click', toggleNotifications);
            document.getElementById('viewAllNotifications').addEventListener('click', viewAllNotifications);
            document.getElementById('userMenuBtn').addEventListener('click', toggleUserMenu);
            document.getElementById('logoutBtn').addEventListener('click', handleLogout);
            
            document.getElementById('addAssignmentBtn').addEventListener('click', openAddModal);
            document.getElementById('viewReportsBtn').addEventListener('click', openReportsModal);
            document.getElementById('bulkActionsBtn').addEventListener('click', openBulkActionsModal);
            document.getElementById('refreshAssignments').addEventListener('click', refreshAssignments);
            
            document.getElementById('closeModal').addEventListener('click', closeModal);
            document.getElementById('cancelModal').addEventListener('click', closeModal);
            document.getElementById('closeSubmissionsModal').addEventListener('click', closeSubmissionsModal);
            document.getElementById('closeGradeModal').addEventListener('click', closeGradeModal);
            document.getElementById('closeReportsModal').addEventListener('click', closeReportsModal);
            document.getElementById('closeBulkModal').addEventListener('click', closeBulkActionsModal);
            document.getElementById('cancelBulkModal').addEventListener('click', closeBulkActionsModal);
            document.getElementById('cancelGradeModal').addEventListener('click', closeGradeModal);
            
            document.getElementById('assignmentForm').addEventListener('submit', handleAssignmentSubmit);
            document.getElementById('gradeForm').addEventListener('submit', handleGradeSubmit);
            
            document.querySelectorAll('input[name="assignTo"]').forEach(radio => {
                radio.addEventListener('change', handleAssignToChange);
            });
            
            document.getElementById('searchAssignments').addEventListener('input', applyFilters);
            document.getElementById('filterSubject').addEventListener('change', applyFilters);
            document.getElementById('filterClass').addEventListener('change', applyFilters);
            document.getElementById('filterStatus').addEventListener('change', applyFilters);
            document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);
            
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', handleTabChange);
            });
            
            document.getElementById('prevPage').addEventListener('click', goToPrevPage);
            document.getElementById('nextPage').addEventListener('click', goToNextPage);
            
            document.getElementById('exportExcel').addEventListener('click', exportToExcel);
            document.getElementById('exportPDF').addEventListener('click', exportToPDF);
            document.getElementById('exportSubmissions').addEventListener('click', exportSubmissions);
            
            document.getElementById('sendReminderBtn').addEventListener('click', sendReminders);
            document.getElementById('downloadAllBtn').addEventListener('click', downloadAllSubmissions);
            document.getElementById('bulkGradeBtn').addEventListener('click', openBulkGradeModal);
            
            document.getElementById('clearSelection').addEventListener('click', clearSelectedAssignments);
            document.querySelectorAll('input[name="bulkAction"]').forEach(radio => {
                radio.addEventListener('change', handleBulkActionChange);
            });
            document.getElementById('executeBulkAction').addEventListener('click', executeBulkAction);
            
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        if (modal.id === 'assignmentModal') closeModal();
                        if (modal.id === 'submissionsModal') closeSubmissionsModal();
                        if (modal.id === 'gradeModal') closeGradeModal();
                        if (modal.id === 'reportsModal') closeReportsModal();
                        if (modal.id === 'bulkActionsModal') closeBulkActionsModal();
                        if (modal.id === 'confirmModal') document.getElementById('confirmCancel').click();
                    }
                });
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
                }
            });
            
            // Initialize student list
            const studentGrid = document.getElementById('studentsCheckboxGrid');
            if (studentGrid) {
                studentGrid.innerHTML = '';
                sampleStudents.forEach(s => {
                    studentGrid.innerHTML += `
                        <label class="flex items-center">
                            <input type="checkbox" value="${s.id}" class="mr-2 student-checkbox">
                            <span class="text-sm">${s.name} (${s.rollNo})</span>
                        </label>
                    `;
                });
            }
            
            setupPublishOptions();
            renderAssignments();
            renderDrafts();
            renderScheduled();
            updateStatistics();
        });
    