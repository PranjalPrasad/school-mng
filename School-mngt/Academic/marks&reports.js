// Marks and Reports Management Module
document.addEventListener('DOMContentLoaded', function() {
    initializeMarksModule();
});

// Dummy Data
const dummyData = {
    academicYears: [
        { id: '2024-2025', name: '2024-2025' },
        { id: '2023-2024', name: '2023-2024' },
        { id: '2022-2023', name: '2022-2023' }
    ],
    
    classes: [
        { id: '9', name: 'Class 9', sections: ['A', 'B', 'C'] },
        { id: '10', name: 'Class 10', sections: ['A', 'B', 'C'] },
        { id: '11', name: 'Class 11', sections: ['A', 'B', 'C', 'D'] },
        { id: '12', name: 'Class 12', sections: ['A', 'B', 'C', 'D'] }
    ],
    
    subjects: {
        '9': [
            { id: 'math9', name: 'Mathematics', maxMarks: 100 },
            { id: 'science9', name: 'Science', maxMarks: 100 },
            { id: 'english9', name: 'English', maxMarks: 100 },
            { id: 'sst9', name: 'Social Studies', maxMarks: 100 },
            { id: 'hindi9', name: 'Hindi', maxMarks: 100 },
            { id: 'sanskrit9', name: 'Sanskrit', maxMarks: 100 }
        ],
        '10': [
            { id: 'math10', name: 'Mathematics', maxMarks: 100 },
            { id: 'science10', name: 'Science', maxMarks: 100 },
            { id: 'english10', name: 'English', maxMarks: 100 },
            { id: 'sst10', name: 'Social Studies', maxMarks: 100 },
            { id: 'hindi10', name: 'Hindi', maxMarks: 100 },
            { id: 'computer10', name: 'Computer Science', maxMarks: 100 }
        ],
        '11': {
            'Science': [
                { id: 'physics11', name: 'Physics', maxMarks: 100 },
                { id: 'chemistry11', name: 'Chemistry', maxMarks: 100 },
                { id: 'math11', name: 'Mathematics', maxMarks: 100 },
                { id: 'english11', name: 'English', maxMarks: 100 },
                { id: 'cs11', name: 'Computer Science', maxMarks: 100 }
            ],
            'Commerce': [
                { id: 'accounts11', name: 'Accountancy', maxMarks: 100 },
                { id: 'bst11', name: 'Business Studies', maxMarks: 100 },
                { id: 'economics11', name: 'Economics', maxMarks: 100 },
                { id: 'english11', name: 'English', maxMarks: 100 },
                { id: 'maths11', name: 'Mathematics', maxMarks: 100 }
            ],
            'Arts': [
                { id: 'history11', name: 'History', maxMarks: 100 },
                { id: 'political11', name: 'Political Science', maxMarks: 100 },
                { id: 'geography11', name: 'Geography', maxMarks: 100 },
                { id: 'english11', name: 'English', maxMarks: 100 },
                { id: 'psychology11', name: 'Psychology', maxMarks: 100 }
            ]
        },
        '12': {
            'Science': [
                { id: 'physics12', name: 'Physics', maxMarks: 100 },
                { id: 'chemistry12', name: 'Chemistry', maxMarks: 100 },
                { id: 'math12', name: 'Mathematics', maxMarks: 100 },
                { id: 'english12', name: 'English', maxMarks: 100 },
                { id: 'cs12', name: 'Computer Science', maxMarks: 100 }
            ],
            'Commerce': [
                { id: 'accounts12', name: 'Accountancy', maxMarks: 100 },
                { id: 'bst12', name: 'Business Studies', maxMarks: 100 },
                { id: 'economics12', name: 'Economics', maxMarks: 100 },
                { id: 'english12', name: 'English', maxMarks: 100 },
                { id: 'maths12', name: 'Mathematics', maxMarks: 100 }
            ],
            'Arts': [
                { id: 'history12', name: 'History', maxMarks: 100 },
                { id: 'political12', name: 'Political Science', maxMarks: 100 },
                { id: 'geography12', name: 'Geography', maxMarks: 100 },
                { id: 'english12', name: 'English', maxMarks: 100 },
                { id: 'sociology12', name: 'Sociology', maxMarks: 100 }
            ]
        }
    },
    
    students: {
        '9-A': [
            { id: 'S901', name: 'Aarav Sharma', rollNo: '901', class: '9', section: 'A' },
            { id: 'S902', name: 'Diya Patel', rollNo: '902', class: '9', section: 'A' },
            { id: 'S903', name: 'Vihaan Singh', rollNo: '903', class: '9', section: 'A' },
            { id: 'S904', name: 'Anaya Gupta', rollNo: '904', class: '9', section: 'A' }
        ],
        '9-B': [
            { id: 'S905', name: 'Kabir Verma', rollNo: '905', class: '9', section: 'B' },
            { id: 'S906', name: 'Ishita Reddy', rollNo: '906', class: '9', section: 'B' },
            { id: 'S907', name: 'Arjun Joshi', rollNo: '907', class: '9', section: 'B' },
            { id: 'S908', name: 'Sanya Kapoor', rollNo: '908', class: '9', section: 'B' }
        ],
        '9-C': [
            { id: 'S909', name: 'Reyansh Malhotra', rollNo: '909', class: '9', section: 'C' },
            { id: 'S910', name: 'Aadhya Nair', rollNo: '910', class: '9', section: 'C' }
        ],
        '10-A': [
            { id: 'S101', name: 'Rohan Sharma', rollNo: '101', class: '10', section: 'A' },
            { id: 'S102', name: 'Priya Patel', rollNo: '102', class: '10', section: 'A' },
            { id: 'S103', name: 'Aarav Singh', rollNo: '103', class: '10', section: 'A' },
            { id: 'S104', name: 'Neha Gupta', rollNo: '104', class: '10', section: 'A' }
        ],
        '10-B': [
            { id: 'S105', name: 'Karan Verma', rollNo: '105', class: '10', section: 'B' },
            { id: 'S106', name: 'Sneha Reddy', rollNo: '106', class: '10', section: 'B' }
        ],
        '10-C': [
            { id: 'S107', name: 'Vikram Joshi', rollNo: '107', class: '10', section: 'C' },
            { id: 'S108', name: 'Ananya Das', rollNo: '108', class: '10', section: 'C' }
        ],
        '11-A': [
            { id: 'S111', name: 'Raj Malhotra', rollNo: '111', class: '11', section: 'A', stream: 'Science' },
            { id: 'S112', name: 'Simran Kaur', rollNo: '112', class: '11', section: 'A', stream: 'Science' }
        ],
        '11-B': [
            { id: 'S113', name: 'Akash Gupta', rollNo: '113', class: '11', section: 'B', stream: 'Commerce' },
            { id: 'S114', name: 'Riya Mehta', rollNo: '114', class: '11', section: 'B', stream: 'Commerce' }
        ],
        '11-C': [
            { id: 'S115', name: 'Priyanka Singh', rollNo: '115', class: '11', section: 'C', stream: 'Arts' }
        ],
        '12-A': [
            { id: 'S121', name: 'Aditya Kumar', rollNo: '121', class: '12', section: 'A', stream: 'Science' },
            { id: 'S122', name: 'Shreya Sharma', rollNo: '122', class: '12', section: 'A', stream: 'Science' }
        ],
        '12-B': [
            { id: 'S123', name: 'Rahul Verma', rollNo: '123', class: '12', section: 'B', stream: 'Commerce' }
        ]
    },
    
    terms: [
        { id: 'term1', name: 'Term 1 (April - June)' },
        { id: 'term2', name: 'Term 2 (July - September)' },
        { id: 'term3', name: 'Term 3 (October - December)' },
        { id: 'term4', name: 'Term 4 (January - March)' },
        { id: 'midterm', name: 'Mid-Term Examination' },
        { id: 'final', name: 'Final Examination' }
    ]
};

// Initialize the marks module
function initializeMarksModule() {
    console.log('Initializing marks module...');
    
    setupTabNavigation();
    setupDropdowns();
    setupFormHandlers();
    setupMarksTable();
    setupReportHandlers();
    setupGradeBook();
    setupModals();
    setupOtherSubjectAdder();
    loadSampleData();
    
    // Set default date to today
    const today = new Date();
    const assessmentDate = document.getElementById('assessmentDate');
    if (assessmentDate) {
        assessmentDate.valueAsDate = today;
    }
}

// Setup all dropdowns
function setupDropdowns() {
    loadAcademicYears();
    loadClasses();
    loadTerms();
    setupCascadingDropdowns();
}

// Load academic years
function loadAcademicYears() {
    const yearSelect = document.getElementById('academicYearSelect');
    if (!yearSelect) return;
    
    dummyData.academicYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year.id;
        option.textContent = year.name;
        yearSelect.appendChild(option);
    });
}

// Load classes
function loadClasses() {
    const classSelect = document.getElementById('classSelect');
    if (!classSelect) return;
    
    dummyData.classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}

// Load terms
function loadTerms() {
    const termSelect = document.getElementById('termSelect');
    if (!termSelect) return;
    
    dummyData.terms.forEach(term => {
        const option = document.createElement('option');
        option.value = term.id;
        option.textContent = term.name;
        termSelect.appendChild(option);
    });
}

// Setup cascading dropdowns
function setupCascadingDropdowns() {
    const classSelect = document.getElementById('classSelect');
    const sectionSelect = document.getElementById('sectionSelect');
    const studentSelect = document.getElementById('studentSelect');
    const marksContainer = document.getElementById('subjectsMarksContainer');
    const classInfo = document.getElementById('selectedClassInfo');
    
    if (!classSelect || !sectionSelect || !studentSelect || !marksContainer) return;

    classSelect.addEventListener('change', function() {
        const selectedClass = this.value;
        const classData = dummyData.classes.find(c => c.id === selectedClass);
        
        if (selectedClass) {
            sectionSelect.disabled = false;
            sectionSelect.innerHTML = '<option value="">Select section...</option>';
            
            classData.sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section;
                option.textContent = `Section ${section}`;
                sectionSelect.appendChild(option);
            });
            
            studentSelect.disabled = true;
            studentSelect.innerHTML = '<option value="">Select section first</option>';
            marksContainer.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-book-open text-4xl mb-3"></i><p>Select section to load subjects and students</p></div>';
            if (classInfo) classInfo.textContent = '';
        } else {
            sectionSelect.disabled = true;
            sectionSelect.innerHTML = '<option value="">Select class first</option>';
            studentSelect.disabled = true;
            studentSelect.innerHTML = '<option value="">Select class & section first</option>';
            marksContainer.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-book-open text-4xl mb-3"></i><p>Select class to load subjects</p></div>';
            if (classInfo) classInfo.textContent = '';
        }
    });

    sectionSelect.addEventListener('change', function() {
        const selectedClass = classSelect.value;
        const selectedSection = this.value;
        
        if (selectedClass && selectedSection) {
            studentSelect.disabled = true;
            studentSelect.innerHTML = '<option value="">Loading students...</option>';
            marksContainer.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-spinner fa-spin text-4xl mb-3"></i><p>Loading subjects...</p></div>';
            
            setTimeout(() => {
                loadStudents(selectedClass, selectedSection);
                loadSubjects(selectedClass, selectedSection);
                
                const className = dummyData.classes.find(c => c.id === selectedClass).name;
                if (classInfo) classInfo.textContent = `${className} - Section ${selectedSection}`;
                
                showToast(`Students and subjects loaded for ${className} - Section ${selectedSection}`, 'success');
            }, 500);
        } else {
            studentSelect.disabled = true;
            studentSelect.innerHTML = '<option value="">Select section first</option>';
        }
    });

    const academicYearSelect = document.getElementById('academicYearSelect');
    if (academicYearSelect) {
        academicYearSelect.addEventListener('change', function() {
            const selectedYear = this.value;
            if (selectedYear) {
                console.log(`Academic year changed to: ${selectedYear}`);
            }
        });
    }
}

// Load students
function loadStudents(classId, section) {
    const studentSelect = document.getElementById('studentSelect');
    if (!studentSelect) return;
    
    const key = `${classId}-${section}`;
    const students = dummyData.students[key] || [];
    
    studentSelect.disabled = false;
    
    if (students.length === 0) {
        studentSelect.innerHTML = '<option value="">No students available</option>';
        showToast('No students found for this class and section', 'warning');
    } else {
        let options = '<option value="">Select student...</option>';
        
        students.forEach(student => {
            let studentText = `${student.name} (Roll No: ${student.rollNo})`;
            if (student.stream) {
                studentText += ` - ${student.stream}`;
            }
            options += `<option value="${student.id}">${studentText}</option>`;
        });
        
        studentSelect.innerHTML = options;
        showToast(`${students.length} students loaded successfully`, 'success');
    }
}

// Load subjects
function loadSubjects(classId, section) {
    const marksContainer = document.getElementById('subjectsMarksContainer');
    if (!marksContainer) return;
    
    let subjects = [];
    let stream = null;
    
    if (classId === '9' || classId === '10') {
        subjects = dummyData.subjects[classId];
    } else {
        if (section === 'A') stream = 'Science';
        else if (section === 'B') stream = 'Commerce';
        else if (section === 'C') stream = 'Arts';
        else if (section === 'D') stream = 'Science';
        
        subjects = dummyData.subjects[classId][stream];
    }
    
    if (subjects && subjects.length > 0) {
        marksContainer.innerHTML = generateSubjectsHTML(subjects, stream);
        attachSubjectEventListeners();
        
        const subjectCount = subjects.length;
        showToast(`${subjectCount} subjects loaded for ${stream ? stream + ' stream' : 'class'}`, 'success');
    } else {
        marksContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
                <p>No subjects found for this class${stream ? ' and stream' : ''}</p>
                <p class="text-sm mt-2">Please check your class and section selection</p>
            </div>
        `;
        showToast('No subjects available for this selection', 'warning');
    }
}

// Generate subjects HTML
function generateSubjectsHTML(subjects, stream = null) {
    let html = '';
    
    if (stream) {
        html += `
            <div class="mb-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm font-medium text-blue-800">
                    <i class="fas fa-graduation-cap mr-2"></i>
                    Stream: ${stream}
                </p>
            </div>
        `;
    }
    
    subjects.forEach(subject => {
        html += `
            <div class="subject-entry border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-sm transition-shadow" data-subject-id="${subject.id}">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">${subject.name}</label>
                    </div>
                    
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Entry Type</label>
                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 entry-type-select"
                                data-subject="${subject.name}" data-max="${subject.maxMarks}">
                            <option value="marks">Marks</option>
                            <option value="grade">Grade</option>
                        </select>
                    </div>
                    
                    <div class="lg:col-span-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Enter Value</label>
                        <div class="marks-input-container" data-subject="${subject.name}">
                            <div class="flex items-center marks-field active">
                                <input type="number" min="0" max="${subject.maxMarks}" step="0.01"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 marks-input"
                                    placeholder="Enter marks" 
                                    data-subject="${subject.name}" 
                                    data-max="${subject.maxMarks}"
                                    data-field-type="marks">
                                <span class="ml-2 text-sm text-gray-500">/${subject.maxMarks}</span>
                            </div>
                            <div class="grade-field hidden">
                                <input type="text" 
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 grade-input uppercase-input"
                                    placeholder="Enter grade" 
                                    data-subject="${subject.name}"
                                    data-field-type="grade"
                                    maxlength="2">
                                <span class="ml-2 text-sm text-gray-500">Letter</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Calculated Grade</label>
                        <div class="flex items-center">
                            <p class="text-sm font-medium grade-display px-4 py-2 bg-gray-50 rounded-lg w-full" 
                               data-grade-display="${subject.name}">
                                <span class="grade-value">-</span>
                                <span class="grade-percentage text-xs text-gray-500 ml-2"></span>
                            </p>
                        </div>
                    </div>
                    
                    <div class="lg:col-span-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Performance Level</label>
                        <div class="flex flex-wrap items-center gap-1">
                            <button type="button"
                                class="performance-btn px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 transition-all"
                                data-subject="${subject.name}" data-performance="excellent" title="Excellent">
                                <i class="fas fa-star text-green-500"></i>
                            </button>
                            <button type="button"
                                class="performance-btn px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all"
                                data-subject="${subject.name}" data-performance="good" title="Good">
                                <i class="fas fa-thumbs-up text-blue-500"></i>
                            </button>
                            <button type="button"
                                class="performance-btn px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 transition-all"
                                data-subject="${subject.name}" data-performance="average" title="Average">
                                <i class="fas fa-minus-circle text-yellow-500"></i>
                            </button>
                            <button type="button"
                                class="performance-btn px-2 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 transition-all"
                                data-subject="${subject.name}" data-performance="needs-improvement" title="Needs Improvement">
                                <i class="fas fa-exclamation-triangle text-red-500"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Attach subject event listeners
function attachSubjectEventListeners() {
    document.querySelectorAll('.entry-type-select').forEach(select => {
        select.addEventListener('change', function() {
            const subject = this.dataset.subject;
            const container = document.querySelector(`.marks-input-container[data-subject="${subject}"]`);
            if (!container) return;
            
            const marksField = container.querySelector('.marks-field');
            const gradeField = container.querySelector('.grade-field');
            const marksInput = container.querySelector('.marks-input');
            const gradeInput = container.querySelector('.grade-input');
            
            if (this.value === 'marks') {
                marksField.classList.add('active');
                marksField.classList.remove('hidden');
                gradeField.classList.add('hidden');
                gradeField.classList.remove('active');
                
                if (gradeInput) gradeInput.value = '';
                if (marksInput) {
                    marksInput.dispatchEvent(new Event('input'));
                }
            } else {
                gradeField.classList.add('active');
                gradeField.classList.remove('hidden');
                marksField.classList.add('hidden');
                marksField.classList.remove('active');
                
                if (marksInput) marksInput.value = '';
                if (gradeInput) {
                    updateGradeFromGradeInput(subject, gradeInput.value);
                }
            }
        });
    });

    document.querySelectorAll('.grade-input').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            const subject = this.dataset.subject;
            updateGradeFromGradeInput(subject, this.value);
        });

        input.addEventListener('blur', function() {
            this.value = this.value.toUpperCase();
        });
    });

    document.querySelectorAll('.marks-input').forEach(input => {
        input.addEventListener('input', function() {
            const subject = this.dataset.subject;
            const marks = parseFloat(this.value) || 0;
            const maxMarks = parseInt(this.dataset.max) || 100;
            
            if (marks > maxMarks) {
                this.value = maxMarks;
            }
            
            updateGradeFromMarks(subject, marks, maxMarks);
        });

        input.addEventListener('blur', function() {
            const maxMarks = parseInt(this.dataset.max) || 100;
            let marks = parseFloat(this.value) || 0;
            
            if (marks > maxMarks) {
                this.value = maxMarks;
                marks = maxMarks;
            } else if (marks < 0) {
                this.value = 0;
                marks = 0;
            }
            
            const subject = this.dataset.subject;
            updateGradeFromMarks(subject, marks, maxMarks);
        });
    });
    
    document.querySelectorAll('.performance-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const subject = this.dataset.subject;
            const performance = this.dataset.performance;
            
            document.querySelectorAll(`.performance-btn[data-subject="${subject}"]`).forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
                b.classList.add('border-gray-300', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-blue-600', 'text-white');
            this.classList.remove('border-gray-300', 'text-gray-700');
        });
    });
}

// Update grade from marks
function updateGradeFromMarks(subject, marks, maxMarks) {
    const gradeDisplay = document.querySelector(`[data-grade-display="${subject}"]`);
    if (!gradeDisplay) return;
    
    const percentage = (marks / maxMarks) * 100;
    const grade = calculateGrade(percentage);
    const gradeValue = gradeDisplay.querySelector('.grade-value');
    const gradePercentage = gradeDisplay.querySelector('.grade-percentage');
    
    gradeValue.textContent = grade;
    gradePercentage.textContent = `(${marks}/${maxMarks} - ${percentage.toFixed(1)}%)`;
    
    gradeDisplay.className = 'text-sm font-medium grade-display px-4 py-2 bg-gray-50 rounded-lg w-full';
    if (grade === 'A') gradeDisplay.classList.add('text-green-600');
    else if (grade === 'B') gradeDisplay.classList.add('text-blue-600');
    else if (grade === 'C') gradeDisplay.classList.add('text-yellow-600');
    else if (grade === 'D') gradeDisplay.classList.add('text-orange-600');
    else if (grade === 'F') gradeDisplay.classList.add('text-red-600');
}

// Update grade from grade input
function updateGradeFromGradeInput(subject, grade) {
    const gradeDisplay = document.querySelector(`[data-grade-display="${subject}"]`);
    if (!gradeDisplay) return;
    
    const gradeValue = gradeDisplay.querySelector('.grade-value');
    const gradePercentage = gradeDisplay.querySelector('.grade-percentage');
    
    gradeValue.textContent = grade || '-';
    gradePercentage.textContent = grade ? '(Manual Entry)' : '';
    
    gradeDisplay.className = 'text-sm font-medium grade-display px-4 py-2 bg-gray-50 rounded-lg w-full';
    if (grade.startsWith('A')) gradeDisplay.classList.add('text-green-600');
    else if (grade.startsWith('B')) gradeDisplay.classList.add('text-blue-600');
    else if (grade.startsWith('C')) gradeDisplay.classList.add('text-yellow-600');
    else if (grade.startsWith('D')) gradeDisplay.classList.add('text-orange-600');
    else if (grade.startsWith('F')) gradeDisplay.classList.add('text-red-600');
}

// Form Handlers
function setupFormHandlers() {
    const assignMarksForm = document.getElementById('assignMarksForm');
    
    if (assignMarksForm) {
        assignMarksForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveStudentMarks();
        });
    }
    
    const resetBtn = document.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetMarksForm();
        });
    }
}

// Setup Other Subject Adder
function setupOtherSubjectAdder() {
    const otherSubjectName = document.getElementById('otherSubjectName');
    const otherSubjectType = document.getElementById('otherSubjectType');
    const otherMarksInput = document.getElementById('otherMarksInput');
    const otherGradeInput = document.getElementById('otherGradeInput');
    const addButton = document.getElementById('addOtherSubjectBtn');
    
    if (!otherSubjectName || !otherSubjectType || !otherMarksInput || !otherGradeInput || !addButton) {
        console.error('Other subject elements not found');
        return;
    }
    
    otherSubjectType.addEventListener('change', function() {
        const marksField = document.querySelector('.other-marks-field');
        const gradeField = document.querySelector('.other-grade-field');
        
        if (this.value === 'marks') {
            marksField.classList.remove('hidden');
            gradeField.classList.add('hidden');
            otherGradeInput.value = '';
        } else {
            marksField.classList.add('hidden');
            gradeField.classList.remove('hidden');
            otherMarksInput.value = '';
        }
    });
    
    otherGradeInput.addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
    
    otherGradeInput.addEventListener('blur', function() {
        this.value = this.value.toUpperCase();
    });
    
    addButton.addEventListener('click', function(e) {
        e.preventDefault();
        addOtherSubject();
    });
    
    [otherSubjectName, otherMarksInput, otherGradeInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addOtherSubject();
            }
        });
    });
}

// Function to add other subject
function addOtherSubject() {
    const subjectName = document.getElementById('otherSubjectName').value.trim();
    const entryType = document.getElementById('otherSubjectType').value;
    const marksInput = document.getElementById('otherMarksInput');
    const gradeInput = document.getElementById('otherGradeInput');
    const otherSubjectsList = document.getElementById('otherSubjectsList');
    
    if (!subjectName) {
        showToast('Please enter a subject name', 'error');
        return;
    }
    
    let value = '';
    let displayValue = '';
    let grade = '';
    
    if (entryType === 'marks') {
        const marks = parseFloat(marksInput.value);
        if (isNaN(marks) || marks < 0 || marks > 100) {
            showToast('Please enter valid marks between 0 and 100', 'error');
            return;
        }
        value = marks.toString();
        displayValue = `${marks}/100`;
        grade = calculateGrade(marks);
    } else {
        const gradeVal = gradeInput.value.trim().toUpperCase();
        if (!gradeVal) {
            showToast('Please enter a grade', 'error');
            return;
        }
        value = gradeVal;
        displayValue = gradeVal;
        grade = gradeVal;
    }
    
    const existingSubjects = document.querySelectorAll('.other-subject-item .subject-name');
    for (let existing of existingSubjects) {
        if (existing.textContent.toLowerCase() === subjectName.toLowerCase()) {
            showToast('This subject has already been added', 'error');
            return;
        }
    }
    
    const emptyState = otherSubjectsList.querySelector('.other-subjects-empty');
    if (emptyState) {
        emptyState.remove();
    }
    
    const newSubjectDiv = document.createElement('div');
    newSubjectDiv.className = 'other-subject-item bg-gray-50 rounded-lg p-3 mb-2 flex items-center justify-between group border border-gray-200 hover:border-blue-300 transition-all';
    newSubjectDiv.dataset.subjectName = subjectName;
    newSubjectDiv.dataset.entryType = entryType;
    newSubjectDiv.dataset.value = value;
    newSubjectDiv.dataset.grade = grade;
    
    newSubjectDiv.innerHTML = `
        <div class="flex-1 grid grid-cols-12 gap-3 items-center">
            <div class="col-span-4">
                <span class="subject-name font-medium text-gray-800">${subjectName}</span>
            </div>
            <div class="col-span-3">
                <span class="entry-type-badge text-xs px-2 py-1 rounded-full ${entryType === 'marks' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                    ${entryType === 'marks' ? 'Marks' : 'Grade'}
                </span>
            </div>
            <div class="col-span-3">
                <span class="subject-value font-medium text-gray-900">${displayValue}</span>
                <span class="subject-grade text-xs ml-2 px-2 py-0.5 rounded-full ${getGradeColorClass(grade)}">
                    Grade: ${grade}
                </span>
            </div>
            <div class="col-span-2 flex justify-end space-x-2">
                <button class="edit-other-subject w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all" title="Edit">
                    <i class="fas fa-edit text-sm"></i>
                </button>
                <button class="remove-other-subject w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all" title="Remove">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
        </div>
    `;
    
    otherSubjectsList.appendChild(newSubjectDiv);
    attachOtherSubjectEventListeners(newSubjectDiv);
    
    document.getElementById('otherSubjectName').value = '';
    document.getElementById('otherMarksInput').value = '';
    document.getElementById('otherGradeInput').value = '';
    
    showToast(`${subjectName} added successfully`, 'success');
}

// Get grade color class
function getGradeColorClass(grade) {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    if (grade.startsWith('F')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
}

// Attach other subject event listeners
function attachOtherSubjectEventListeners(item) {
    const removeBtn = item.querySelector('.remove-other-subject');
    if (removeBtn) {
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const subjectName = item.querySelector('.subject-name').textContent;
            item.remove();
            
            if (document.querySelectorAll('.other-subject-item').length === 0) {
                const otherSubjectsList = document.getElementById('otherSubjectsList');
                otherSubjectsList.innerHTML = `
                    <div class="text-center py-6 text-gray-500 other-subjects-empty">
                        <i class="fas fa-plus-circle text-gray-300 text-3xl mb-2"></i>
                        <p class="text-sm">No additional subjects added yet</p>
                        <p class="text-xs text-gray-400 mt-1">Add subjects using the form above</p>
                    </div>
                `;
            }
            
            showToast(`${subjectName} removed`, 'info');
        });
    }
    
    const editBtn = item.querySelector('.edit-other-subject');
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const subjectName = item.querySelector('.subject-name').textContent;
            const entryType = item.dataset.entryType;
            const value = item.dataset.value;
            
            document.getElementById('otherSubjectName').value = subjectName;
            document.getElementById('otherSubjectType').value = entryType;
            
            const typeEvent = new Event('change');
            document.getElementById('otherSubjectType').dispatchEvent(typeEvent);
            
            if (entryType === 'marks') {
                document.getElementById('otherMarksInput').value = value;
            } else {
                document.getElementById('otherGradeInput').value = value;
            }
            
            item.remove();
            
            if (document.querySelectorAll('.other-subject-item').length === 0) {
                const otherSubjectsList = document.getElementById('otherSubjectsList');
                otherSubjectsList.innerHTML = `
                    <div class="text-center py-6 text-gray-500 other-subjects-empty">
                        <i class="fas fa-plus-circle text-gray-300 text-3xl mb-2"></i>
                        <p class="text-sm">No additional subjects added yet</p>
                        <p class="text-xs text-gray-400 mt-1">Add subjects using the form above</p>
                    </div>
                `;
            }
            
            showToast(`Editing ${subjectName}`, 'info');
        });
    }
}

// Get other subjects data
function getOtherSubjectsData() {
    const otherSubjects = [];
    const items = document.querySelectorAll('.other-subject-item');
    
    items.forEach(item => {
        otherSubjects.push({
            name: item.dataset.subjectName,
            entryType: item.dataset.entryType,
            value: item.dataset.value,
            grade: item.dataset.grade
        });
    });
    
    return otherSubjects;
}

// Save student marks
function saveStudentMarks() {
    const academicYear = document.getElementById('academicYearSelect').value;
    const classSelect = document.getElementById('classSelect');
    const sectionSelect = document.getElementById('sectionSelect');
    const studentSelect = document.getElementById('studentSelect');
    const termSelect = document.getElementById('termSelect');
    const assessmentDate = document.getElementById('assessmentDate');
    
    if (!academicYear || !classSelect.value || !sectionSelect.value || !studentSelect.value || !termSelect.value || !assessmentDate.value) {
        showToast('Please fill all required fields', 'error');
        return;
    }
    
    const selectedOption = studentSelect.options[studentSelect.selectedIndex];
    const studentName = selectedOption.text;
    
    // Create marks data object with proper structure
    const marksData = {
        id: Date.now(),
        academicYear: academicYear,
        class: classSelect.value,
        className: classSelect.options[classSelect.selectedIndex].text,
        section: sectionSelect.value,
        studentId: studentSelect.value,
        studentName: studentName,
        term: termSelect.value,
        termName: termSelect.options[termSelect.selectedIndex].text,
        assessmentDate: assessmentDate.value,
        subjects: {},
        otherSubjects: getOtherSubjectsData(),
        overall: {
            totalMarks: 0,
            maxTotal: 0,
            percentage: 0,
            grade: ''
        }
    };
    
    let totalMarks = 0;
    let maxTotal = 0;
    
    // Collect regular subject data
    document.querySelectorAll('.subject-entry').forEach(entry => {
        const subjectName = entry.querySelector('.marks-input')?.dataset.subject || 
                           entry.querySelector('.grade-input')?.dataset.subject;
        const entryTypeSelect = entry.querySelector('.entry-type-select');
        if (!entryTypeSelect || !subjectName) return;
        
        const entryType = entryTypeSelect.value;
        const performanceBtn = entry.querySelector('.performance-btn.active');
        const performance = performanceBtn ? performanceBtn.dataset.performance : '';
        
        let marks = 0;
        let maxMarks = 100;
        let grade = '';
        
        if (entryType === 'marks') {
            const marksInput = entry.querySelector('.marks-input');
            if (marksInput) {
                marks = parseFloat(marksInput.value) || 0;
                maxMarks = parseInt(marksInput.dataset.max) || 100;
                
                const percentage = (marks / maxMarks) * 100;
                grade = calculateGrade(percentage);
            }
        } else {
            const gradeInput = entry.querySelector('.grade-input');
            if (gradeInput) {
                grade = gradeInput.value.toUpperCase();
                marks = estimateMarksFromGrade(grade, maxMarks);
            }
        }
        
        marksData.subjects[subjectName] = {
            entryType: entryType,
            marks: marks,
            maxMarks: maxMarks,
            grade: grade,
            performance: performance
        };
        
        if (marks > 0) {
            totalMarks += marks;
            maxTotal += maxMarks;
        }
    });
    
    // Add other subjects to total calculation
    marksData.otherSubjects.forEach(otherSubject => {
        if (otherSubject.entryType === 'marks') {
            const marks = parseFloat(otherSubject.value);
            totalMarks += marks;
            maxTotal += 100;
        } else {
            const estimatedMarks = estimateMarksFromGrade(otherSubject.grade, 100);
            totalMarks += estimatedMarks;
            maxTotal += 100;
        }
    });
    
    if (maxTotal > 0) {
        const percentage = Math.round((totalMarks / maxTotal) * 100);
        marksData.overall.totalMarks = totalMarks;
        marksData.overall.maxTotal = maxTotal;
        marksData.overall.percentage = percentage;
        marksData.overall.grade = calculateGrade(percentage);
    }
    
    saveMarksToStorage(marksData);
    showToast(`Marks saved successfully for ${studentName}`, 'success');
    resetMarksForm();
    
    // Refresh marks table if on view tab
    if (document.getElementById('viewMarksTab')?.classList.contains('active')) {
        loadMarksTable();
    }
}

// Estimate marks from grade
function estimateMarksFromGrade(grade, maxMarks) {
    const gradeMarksMap = {
        'A+': 95, 'A': 90, 'A-': 87,
        'B+': 82, 'B': 78, 'B-': 75,
        'C+': 72, 'C': 68, 'C-': 65,
        'D+': 58, 'D': 52, 'D-': 45,
        'F': 30
    };
    
    const percentage = gradeMarksMap[grade] || 0;
    return Math.round((percentage / 100) * maxMarks);
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .marks-field, .grade-field {
        transition: all 0.3s ease;
    }
    .marks-field.active, .grade-field.active {
        display: flex !important;
    }
    .uppercase-input {
        text-transform: uppercase;
    }
    .uppercase-input::placeholder {
        text-transform: none;
    }
    .performance-btn.active {
        background-color: #3b82f6;
        color: white;
        border-color: #3b82f6;
    }
    .grade-display {
        transition: all 0.2s ease;
    }
    .other-subject-item {
        transition: all 0.2s ease;
        border: 1px solid #e5e7eb;
    }
    .other-subject-item:hover {
        border-color: #3b82f6;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .other-subject-item .edit-other-subject,
    .other-subject-item .remove-other-subject {
        opacity: 0.7;
        transition: all 0.2s ease;
    }
    .other-subject-item:hover .edit-other-subject,
    .other-subject-item:hover .remove-other-subject {
        opacity: 1;
        transform: scale(1.05);
    }
    .entry-type-badge {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 500;
    }
    .other-marks-field, .other-grade-field {
        transition: all 0.3s ease;
    }
    .other-subjects-empty {
        animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .table-row-hover:hover {
        background-color: #f9fafb;
    }
    .toast {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 50;
    }
    .tab-btn.active {
        border-bottom: 2px solid #3b82f6;
        color: #374151;
        font-weight: 600;
    }
    /* Table container for horizontal scroll */
    .overflow-x-auto {
        position: relative;
        scrollbar-width: thin;
        scrollbar-color: #cbd5e0 #f1f5f9;
    }
    
    .overflow-x-auto::-webkit-scrollbar {
        height: 8px;
    }
    
    .overflow-x-auto::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 4px;
    }
    
    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
    
    /* Sticky action column */
    .sticky.right-0 {
        position: sticky;
        right: 0;
        background-color: white;
        transition: box-shadow 0.2s ease;
        border-left: 1px solid #e5e7eb;
    }
    
    /* Shadow when scrolled */
    .sticky.right-0.shadow-2xl {
        box-shadow: -8px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    /* Hover effect for table rows */
    tr:hover .sticky.right-0 {
        background-color: #f9fafb;
    }
    
    /* Action buttons container */
    .sticky.right-0 > div {
        background: white;
        backdrop-filter: blur(8px);
        transition: all 0.2s ease;
    }
    
    /* Individual action buttons */
    .edit-marks-btn, .delete-marks-btn, .view-report-btn {
        position: relative;
        overflow: hidden;
    }
    
    .edit-marks-btn::after, .delete-marks-btn::after, .view-report-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }
    
    .edit-marks-btn:hover::after, .delete-marks-btn:hover::after, .view-report-btn:hover::after {
        width: 100px;
        height: 100px;
    }
    
    /* Tooltip styles */
    [title] {
        position: relative;
        cursor: pointer;
    }
    
    [title]:hover::before {
        content: attr(title);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 4px 8px;
        background: #1f2937;
        color: white;
        font-size: 12px;
        border-radius: 4px;
        white-space: nowrap;
        z-index: 60;
        margin-bottom: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    [title]:hover::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: #1f2937 transparent transparent transparent;
        margin-bottom: -2px;
    }
    
    /* Grade badge styles */
    .bg-green-100 { background-color: #dcfce7; }
    .bg-blue-100 { background-color: #dbeafe; }
    .bg-yellow-100 { background-color: #fef9c3; }
    .bg-orange-100 { background-color: #ffedd5; }
    .bg-red-100 { background-color: #fee2e2; }
    
    /* Progress bar animation */
    .h-1\\.5 {
        transition: width 0.3s ease;
    }
    
    /* Row hover effect */
    tr {
        transition: background-color 0.2s ease;
    }
    
    /* Table header sticky */
    thead th {
        position: sticky;
        top: 0;
        background: #f9fafb;
        z-index: 20;
    }
    
    thead th.sticky.right-0 {
        z-index: 30;
        background: #f9fafb;
    }
`;
document.head.appendChild(style);

// Get performance for a subject
function getPerformanceForSubject(subject) {
    const activeBtn = document.querySelector(`.performance-btn[data-subject="${subject}"].active`);
    return activeBtn ? activeBtn.dataset.performance : '';
}

// Reset marks form
function resetMarksForm() {
    const assignMarksForm = document.getElementById('assignMarksForm');
    if (assignMarksForm) assignMarksForm.reset();
    
    const academicYearSelect = document.getElementById('academicYearSelect');
    if (academicYearSelect) academicYearSelect.selectedIndex = 0;
    
    const classSelect = document.getElementById('classSelect');
    if (classSelect) classSelect.selectedIndex = 0;
    
    const sectionSelect = document.getElementById('sectionSelect');
    if (sectionSelect) {
        sectionSelect.innerHTML = '<option value="">Select class first</option>';
        sectionSelect.disabled = true;
    }
    
    const studentSelect = document.getElementById('studentSelect');
    if (studentSelect) {
        studentSelect.innerHTML = '<option value="">Select class & section first</option>';
        studentSelect.disabled = true;
    }
    
    const marksContainer = document.getElementById('subjectsMarksContainer');
    if (marksContainer) {
        marksContainer.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-book-open text-4xl mb-3"></i><p>Select class to load subjects</p></div>';
    }
    
    const classInfo = document.getElementById('selectedClassInfo');
    if (classInfo) classInfo.textContent = '';
    
    const otherSubjectsList = document.getElementById('otherSubjectsList');
    if (otherSubjectsList) {
        otherSubjectsList.innerHTML = `
            <div class="text-center py-6 text-gray-500 other-subjects-empty">
                <i class="fas fa-plus-circle text-gray-300 text-3xl mb-2"></i>
                <p class="text-sm">No additional subjects added yet</p>
                <p class="text-xs text-gray-400 mt-1">Add subjects using the form above</p>
            </div>
        `;
    }
    
    const otherSubjectName = document.getElementById('otherSubjectName');
    if (otherSubjectName) otherSubjectName.value = '';
    
    const otherMarksInput = document.getElementById('otherMarksInput');
    if (otherMarksInput) otherMarksInput.value = '';
    
    const otherGradeInput = document.getElementById('otherGradeInput');
    if (otherGradeInput) otherGradeInput.value = '';
    
    const otherSubjectType = document.getElementById('otherSubjectType');
    if (otherSubjectType) otherSubjectType.value = 'marks';
    
    const marksField = document.querySelector('.other-marks-field');
    const gradeField = document.querySelector('.other-grade-field');
    if (marksField) marksField.classList.remove('hidden');
    if (gradeField) gradeField.classList.add('hidden');
    
    const assessmentDate = document.getElementById('assessmentDate');
    if (assessmentDate) assessmentDate.valueAsDate = new Date();
}

// Calculate grade based on percentage
function calculateGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 75) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
}

// Save marks to localStorage
function saveMarksToStorage(marksData) {
    let allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    
    const existingIndex = allMarks.findIndex(m => 
        m.studentId === marksData.studentId && 
        m.term === marksData.term &&
        m.academicYear === marksData.academicYear
    );
    
    if (existingIndex !== -1) {
        allMarks[existingIndex] = marksData;
        showToast('Marks updated successfully', 'success');
    } else {
        allMarks.push(marksData);
    }
    
    localStorage.setItem('studentMarks', JSON.stringify(allMarks));
    console.log('Saved marks:', marksData);
}

// Load sample data
function loadSampleData() {
    if (localStorage.getItem('studentMarks')) {
        console.log('Sample data already exists');
        return;
    }
    
    const sampleMarks = [
        {
            id: 1,
            academicYear: '2024-2025',
            class: '10',
            className: 'Class 10',
            section: 'A',
            studentId: 'S101',
            studentName: 'Rohan Sharma (Roll No: 101)',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Mathematics': { marks: 95, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'Science': { marks: 92, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'English': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                'Social Studies': { marks: 91, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'Hindi': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' },
                'Computer Science': { marks: 96, maxMarks: 100, grade: 'A', performance: 'excellent' }
            },
            otherSubjects: [],
            overall: { totalMarks: 547, maxTotal: 600, percentage: 91, grade: 'A' }
        },
        {
            id: 2,
            academicYear: '2024-2025',
            class: '10',
            className: 'Class 10',
            section: 'A',
            studentId: 'S102',
            studentName: 'Priya Patel (Roll No: 102)',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Mathematics': { marks: 82, maxMarks: 100, grade: 'B', performance: 'good' },
                'Science': { marks: 90, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'English': { marks: 93, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'Social Studies': { marks: 80, maxMarks: 100, grade: 'B', performance: 'good' },
                'Hindi': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                'Computer Science': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' }
            },
            otherSubjects: [],
            overall: { totalMarks: 518, maxTotal: 600, percentage: 86, grade: 'B' }
        },
        {
            id: 3,
            academicYear: '2024-2025',
            class: '11',
            className: 'Class 11',
            section: 'B',
            studentId: 'S113',
            studentName: 'Akash Gupta (Roll No: 113)',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Accountancy': { marks: 78, maxMarks: 100, grade: 'C', performance: 'average' },
                'Business Studies': { marks: 82, maxMarks: 100, grade: 'B', performance: 'good' },
                'Economics': { marks: 75, maxMarks: 100, grade: 'C', performance: 'average' },
                'English': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                'Mathematics': { marks: 70, maxMarks: 100, grade: 'C', performance: 'average' }
            },
            otherSubjects: [],
            overall: { totalMarks: 390, maxTotal: 500, percentage: 78, grade: 'C' }
        },
        {
            id: 4,
            academicYear: '2024-2025',
            class: '12',
            className: 'Class 12',
            section: 'A',
            studentId: 'S121',
            studentName: 'Aditya Kumar (Roll No: 121)',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Physics': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' },
                'Chemistry': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                'Mathematics': { marks: 92, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'English': { marks: 80, maxMarks: 100, grade: 'B', performance: 'good' },
                'Computer Science': { marks: 90, maxMarks: 100, grade: 'A', performance: 'excellent' }
            },
            otherSubjects: [],
            overall: { totalMarks: 435, maxTotal: 500, percentage: 87, grade: 'B' }
        }
    ];
    
    localStorage.setItem('studentMarks', JSON.stringify(sampleMarks));
    console.log('Sample data loaded successfully:', sampleMarks);
}

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initially show the first tab (Assign Marks) and hide others
    tabContents.forEach((content, index) => {
        if (index === 0) {
            content.classList.remove('hidden');
            content.classList.add('active');
        } else {
            content.classList.add('hidden');
            content.classList.remove('active');
        }
    });
    
    // Set first tab button as active
    tabButtons.forEach((btn, index) => {
        if (index === 0) {
            btn.classList.add('active', 'text-gray-700', 'border-blue-500');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('active', 'text-gray-700', 'border-blue-500');
            btn.classList.add('text-gray-500');
        }
    });
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.id.replace('Tab', 'Content');
            
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'text-gray-700', 'border-blue-500');
                btn.classList.add('text-gray-500');
            });
            
            this.classList.add('active', 'text-gray-700', 'border-blue-500');
            this.classList.remove('text-gray-500');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.remove('hidden');
                activeContent.classList.add('active');
                
                if (tabId === 'viewMarksContent') {
                    console.log('View tab clicked, loading marks table...');
                    loadMarksTable();
                    showToast('Loading marks data...', 'info');
                }
                
                if (tabId === 'generateReportContent') {
                    showToast('Report generation ready', 'info');
                    // Initialize report filters when tab is opened
                    setTimeout(() => {
                        setupReportFilters();
                        updatePreviewInfo(
                            document.querySelector('input[name="reportScope"]:checked')?.value || 'full', 
                            'individual'
                        );
                    }, 100);
                }
                
                if (tabId === 'gradeBookContent') {
                    showToast('Grade book loaded', 'info');
                }
            }
        });
    });
}

// Setup marks table with filters
function setupMarksTable() {
    const searchStudent = document.getElementById('searchStudent');
    const classFilter = document.getElementById('classFilter');
    const sectionFilter = document.getElementById('sectionFilter');
    const termFilter = document.getElementById('termFilter');
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');
    
    const loadWithFilters = () => {
        if (document.getElementById('viewMarksContent')?.classList.contains('hidden') === false) {
            loadMarksTable();
        }
    };
    
    if (searchStudent) {
        searchStudent.addEventListener('input', loadWithFilters);
    }
    
    if (classFilter) {
        classFilter.addEventListener('change', loadWithFilters);
    }
    
    if (sectionFilter) {
        sectionFilter.addEventListener('change', loadWithFilters);
    }
    
    if (termFilter) {
        termFilter.addEventListener('change', loadWithFilters);
    }
    
    if (applyFilters) {
        applyFilters.addEventListener('click', function() {
            loadWithFilters();
            showToast('Filters applied', 'success');
        });
    }
    
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (searchStudent) searchStudent.value = '';
            if (classFilter) classFilter.value = '';
            if (sectionFilter) sectionFilter.value = '';
            if (termFilter) termFilter.value = '';
            
            loadWithFilters();
            showToast('Filters reset', 'info');
        });
    }
}

// Load marks table with proper data display
function loadMarksTable() {
    console.log('Loading marks table with filters...');
    
    const searchStudent = document.getElementById('searchStudent');
    const classFilter = document.getElementById('classFilter');
    const sectionFilter = document.getElementById('sectionFilter');
    const termFilter = document.getElementById('termFilter');
    const tableBody = document.getElementById('marksTableBody');
    const tableContainer = document.querySelector('.overflow-x-auto');
    const noMarksMessage = document.getElementById('noMarksMessage');
    
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }
    
    const searchTerm = searchStudent ? searchStudent.value.toLowerCase() : '';
    const classValue = classFilter ? classFilter.value : '';
    const sectionValue = sectionFilter ? sectionFilter.value : '';
    const termValue = termFilter ? termFilter.value : '';
    
    const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    console.log('Total marks records:', allMarks.length);
    
    tableBody.innerHTML = '';
    
    const filteredMarks = allMarks.filter(marks => {
        if (searchTerm) {
            const studentNameMatch = marks.studentName ? marks.studentName.toLowerCase().includes(searchTerm) : false;
            const studentIdMatch = marks.studentId ? marks.studentId.toLowerCase().includes(searchTerm) : false;
            if (!studentNameMatch && !studentIdMatch) {
                return false;
            }
        }
        
        if (classValue && marks.class !== classValue) {
            return false;
        }
        
        if (sectionValue && marks.section !== sectionValue) {
            return false;
        }
        
        if (termValue && marks.term !== termValue) {
            return false;
        }
        
        return true;
    });
    
    console.log('Filtered marks count:', filteredMarks.length);
    
    if (filteredMarks.length === 0) {
        if (noMarksMessage) {
            noMarksMessage.classList.remove('hidden');
        }
        
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-3 text-gray-300"></i>
                    <p class="text-lg">No marks records found</p>
                    <p class="text-sm mt-2">Try adjusting your filters or add marks in the "Assign Marks" tab</p>
                </td>
            </tr>
        `;
        return;
    }
    
    if (noMarksMessage) {
        noMarksMessage.classList.add('hidden');
    }
    
    filteredMarks.forEach(marks => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors group';
        
        const studentDisplayName = marks.studentName ? marks.studentName.split('(')[0].trim() : 'Unknown Student';
        const studentId = marks.studentId || 'N/A';
        const className = marks.className || 'N/A';
        const section = marks.section || '';
        const termName = marks.termName || marks.term || 'N/A';
        
        const subjectCount = marks.subjects ? Object.keys(marks.subjects).length : 0;
        
        const totalMarks = marks.overall && marks.overall.totalMarks !== undefined ? marks.overall.totalMarks : 0;
        const maxTotal = marks.overall && marks.overall.maxTotal !== undefined ? marks.overall.maxTotal : 0;
        const percentage = marks.overall && marks.overall.percentage !== undefined ? marks.overall.percentage : 0;
        const grade = marks.overall && marks.overall.grade ? marks.overall.grade : 'N/A';
        
        const gradeClass = grade === 'A' ? 'text-green-600 font-bold' :
                          grade === 'B' ? 'text-blue-600 font-bold' :
                          grade === 'C' ? 'text-yellow-600 font-bold' :
                          grade === 'D' ? 'text-orange-600 font-bold' : 
                          grade === 'F' ? 'text-red-600 font-bold' : 'text-gray-600';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <i class="fas fa-user-graduate text-white text-sm"></i>
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-900">${studentDisplayName}</div>
                        <div class="text-xs text-gray-500 flex items-center">
                            <i class="fas fa-id-card mr-1 text-xs"></i> ${studentId}
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${className}</div>
                <div class="text-xs text-gray-500">Section ${section || 'N/A'}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${termName}</div>
                <div class="text-xs text-gray-500">${marks.assessmentDate || ''}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900">${subjectCount}</span>
                    <span class="text-xs text-gray-500 ml-1">subjects</span>
                </div>
                <div class="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                    <div class="h-1.5 bg-blue-500 rounded-full" style="width: ${Math.min(100, (subjectCount/10)*100)}%"></div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">${totalMarks}</div>
                <div class="text-xs text-gray-500">out of ${maxTotal}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <span class="text-sm font-bold ${gradeClass}">${percentage}%</span>
                    <div class="ml-2 w-12 h-1.5 bg-gray-200 rounded-full">
                        <div class="h-1.5 rounded-full ${
                            percentage >= 90 ? 'bg-green-500' :
                            percentage >= 75 ? 'bg-blue-500' :
                            percentage >= 60 ? 'bg-yellow-500' :
                            percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-sm font-bold rounded-full ${gradeClass} ${
                    grade === 'A' ? 'bg-green-100' :
                    grade === 'B' ? 'bg-blue-100' :
                    grade === 'C' ? 'bg-yellow-100' :
                    grade === 'D' ? 'bg-orange-100' :
                    grade === 'F' ? 'bg-red-100' : 'bg-gray-100'
                }">
                    ${grade}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap sticky right-0 bg-white shadow-lg z-10 group-hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-2 bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-md border border-gray-100">
                    <button class="edit-marks-btn w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all transform hover:scale-110 flex items-center justify-center" data-id="${marks.id}" title="Edit Marks">
                        <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button class="delete-marks-btn w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all transform hover:scale-110 flex items-center justify-center" data-id="${marks.id}" title="Delete Marks">
                        <i class="fas fa-trash text-sm"></i>
                    </button>
                    <button class="view-report-btn w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-all transform hover:scale-110 flex items-center justify-center" data-id="${marks.id}" title="View Report">
                        <i class="fas fa-file-alt text-sm"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    attachTableActionListeners();
    
    if (tableContainer) {
        tableContainer.addEventListener('scroll', function() {
            const stickyCells = document.querySelectorAll('.sticky.right-0');
            if (this.scrollLeft + this.clientWidth < this.scrollWidth) {
                stickyCells.forEach(cell => {
                    cell.classList.add('shadow-2xl');
                });
            } else {
                stickyCells.forEach(cell => {
                    cell.classList.remove('shadow-2xl');
                });
            }
        });
    }
}

// Attach event listeners to table action buttons
function attachTableActionListeners() {
    document.querySelectorAll('.edit-marks-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const marksId = this.dataset.id;
            openEditMarksModal(marksId);
        });
    });
    
    document.querySelectorAll('.delete-marks-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const marksId = this.dataset.id;
            if (confirm('Are you sure you want to delete this marks record? This action cannot be undone.')) {
                deleteMarks(marksId);
            }
        });
    });
    
    document.querySelectorAll('.view-report-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const marksId = this.dataset.id;
            viewReport(marksId);
        });
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white flex items-center justify-between z-50 animate-slideIn ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icons[type]} mr-3"></i>
            <span>${message}</span>
        </div>
        <button class="ml-4 hover:opacity-75">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    toast.querySelector('button').addEventListener('click', function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    });
}

// Add animation styles
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .animate-slideIn {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(animationStyle);

// Action button functions
function openEditMarksModal(id) {
    const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    const marksData = allMarks.find(m => m.id == id);
    
    if (marksData) {
        // Switch to Assign Marks tab
        document.getElementById('assignMarksTab').click();
        
        // Populate the form with marks data
        setTimeout(() => {
            // Set academic year
            document.getElementById('academicYearSelect').value = marksData.academicYear || '';
            
            // Set class and trigger change
            document.getElementById('classSelect').value = marksData.class || '';
            const classEvent = new Event('change', { bubbles: true });
            document.getElementById('classSelect').dispatchEvent(classEvent);
            
            // Wait for sections to load then set section
            setTimeout(() => {
                const sectionSelect = document.getElementById('sectionSelect');
                sectionSelect.value = marksData.section || '';
                const sectionEvent = new Event('change', { bubbles: true });
                sectionSelect.dispatchEvent(sectionEvent);
                
                // Wait for students to load then set student
                setTimeout(() => {
                    const studentSelect = document.getElementById('studentSelect');
                    for (let i = 0; i < studentSelect.options.length; i++) {
                        if (studentSelect.options[i].value === marksData.studentId) {
                            studentSelect.selectedIndex = i;
                            break;
                        }
                    }
                    
                    // Set term and date
                    document.getElementById('termSelect').value = marksData.term || '';
                    document.getElementById('assessmentDate').value = marksData.assessmentDate || '';
                    
                    // Wait for subjects to load then fill marks
                    setTimeout(() => {
                        // Fill subject marks
                        if (marksData.subjects) {
                            Object.keys(marksData.subjects).forEach(subject => {
                                const subjectData = marksData.subjects[subject];
                                
                                // Find the subject entry
                                const subjectEntries = document.querySelectorAll('.subject-entry');
                                subjectEntries.forEach(entry => {
                                    const subjectName = entry.querySelector('.marks-input')?.dataset.subject || 
                                                       entry.querySelector('.grade-input')?.dataset.subject;
                                    
                                    if (subjectName === subject) {
                                        const entryTypeSelect = entry.querySelector('.entry-type-select');
                                        const marksInput = entry.querySelector('.marks-input');
                                        const gradeInput = entry.querySelector('.grade-input');
                                        
                                        if (entryTypeSelect) {
                                            // Set entry type
                                            entryTypeSelect.value = subjectData.entryType || 'marks';
                                            const typeEvent = new Event('change', { bubbles: true });
                                            entryTypeSelect.dispatchEvent(typeEvent);
                                            
                                            // Set value based on entry type
                                            if (subjectData.entryType === 'marks' && marksInput) {
                                                marksInput.value = subjectData.marks;
                                                marksInput.dispatchEvent(new Event('input', { bubbles: true }));
                                            } else if (gradeInput) {
                                                gradeInput.value = subjectData.grade;
                                                gradeInput.dispatchEvent(new Event('input', { bubbles: true }));
                                            }
                                        }
                                        
                                        // Set performance button
                                        if (subjectData.performance) {
                                            const performanceBtn = entry.querySelector(`.performance-btn[data-performance="${subjectData.performance}"]`);
                                            if (performanceBtn) {
                                                performanceBtn.click();
                                            }
                                        }
                                    }
                                });
                            });
                        }
                        
                        showToast('Marks loaded for editing', 'success');
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 500);
    } else {
        showToast('Marks record not found', 'error');
    }
}

function deleteMarks(id) {
    let allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    const marksToDelete = allMarks.find(m => m.id == id);
    
    if (marksToDelete) {
        allMarks = allMarks.filter(m => m.id != id);
        localStorage.setItem('studentMarks', JSON.stringify(allMarks));
        loadMarksTable();
        showToast(`Marks for ${marksToDelete.studentName} deleted successfully`, 'success');
    } else {
        showToast('Marks record not found', 'error');
    }
}

function viewReport(id) {
    const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    const marksData = allMarks.find(m => m.id == id);
    
    if (marksData) {
        // Create a formatted report
        const reportContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student Report - ${marksData.studentName}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    body { font-family: 'Inter', sans-serif; }
                    .report-card { max-width: 800px; margin: 0 auto; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body class="bg-gray-50 p-8">
                <div class="report-card bg-white rounded-xl shadow-lg p-8">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold text-gray-800">Student Performance Report</h1>
                        <p class="text-gray-600">Academic Year: ${marksData.academicYear}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                        <div>
                            <p class="text-sm text-gray-600">Student Name</p>
                            <p class="text-lg font-bold text-gray-900">${marksData.studentName.split('(')[0]}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Roll Number</p>
                            <p class="text-lg font-bold text-gray-900">${marksData.studentId}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Class & Section</p>
                            <p class="text-lg font-bold text-gray-900">${marksData.className} - Section ${marksData.section}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Term</p>
                            <p class="text-lg font-bold text-gray-900">${marksData.termName}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Assessment Date</p>
                            <p class="text-lg font-bold text-gray-900">${marksData.assessmentDate}</p>
                        </div>
                    </div>
                    
                    <h2 class="text-xl font-bold mb-4">Subject-wise Performance</h2>
                    <table class="w-full mb-8">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Marks</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.keys(marksData.subjects).map(subject => {
                                const subj = marksData.subjects[subject];
                                const gradeColor = subj.grade === 'A' ? 'text-green-600' :
                                                  subj.grade === 'B' ? 'text-blue-600' :
                                                  subj.grade === 'C' ? 'text-yellow-600' :
                                                  subj.grade === 'D' ? 'text-orange-600' : 'text-red-600';
                                return `
                                    <tr class="border-b">
                                        <td class="px-4 py-3 font-medium">${subject}</td>
                                        <td class="px-4 py-3">${subj.marks}/${subj.maxMarks}</td>
                                        <td class="px-4 py-3 font-bold ${gradeColor}">${subj.grade}</td>
                                        <td class="px-4 py-3 capitalize">${subj.performance || 'N/A'}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                    
                    ${marksData.otherSubjects && marksData.otherSubjects.length > 0 ? `
                        <h2 class="text-xl font-bold mb-4">Additional Subjects</h2>
                        <table class="w-full mb-8">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Value</th>
                                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${marksData.otherSubjects.map(subj => `
                                    <tr class="border-b">
                                        <td class="px-4 py-3 font-medium">${subj.name}</td>
                                        <td class="px-4 py-3 capitalize">${subj.entryType}</td>
                                        <td class="px-4 py-3">${subj.value}</td>
                                        <td class="px-4 py-3 font-bold">${subj.grade}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : ''}
                    
                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mt-6">
                        <h2 class="text-xl font-bold mb-4">Overall Summary</h2>
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p class="text-sm text-gray-600">Total Marks</p>
                                <p class="text-2xl font-bold text-gray-900">${marksData.overall.totalMarks}/${marksData.overall.maxTotal}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Percentage</p>
                                <p class="text-2xl font-bold ${
                                    marksData.overall.percentage >= 90 ? 'text-green-600' :
                                    marksData.overall.percentage >= 75 ? 'text-blue-600' :
                                    marksData.overall.percentage >= 60 ? 'text-yellow-600' :
                                    marksData.overall.percentage >= 40 ? 'text-orange-600' : 'text-red-600'
                                }">${marksData.overall.percentage}%</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Overall Grade</p>
                                <p class="text-2xl font-bold ${
                                    marksData.overall.grade === 'A' ? 'text-green-600' :
                                    marksData.overall.grade === 'B' ? 'text-blue-600' :
                                    marksData.overall.grade === 'C' ? 'text-yellow-600' :
                                    marksData.overall.grade === 'D' ? 'text-orange-600' : 'text-red-600'
                                }">${marksData.overall.grade}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8 text-center text-sm text-gray-500 no-print">
                        <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                        <button onclick="window.print()" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-print mr-2"></i>Print Report
                        </button>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        // Open in new window
        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(reportContent);
        reportWindow.document.close();
    } else {
        showToast('Marks record not found', 'error');
    }
}

// ============= REPORT GENERATION FUNCTIONS =============

// Setup Report Filters and Handlers
function setupReportHandlers() {
    console.log('Setting up report handlers...');
    
    // Report type selection
    const reportTypeCards = document.querySelectorAll('.report-type-card');
    const individualOptions = document.getElementById('individualReportOptions');
    const classOptions = document.getElementById('classReportOptions');
    
    if (reportTypeCards.length > 0) {
        reportTypeCards.forEach(card => {
            card.addEventListener('click', function() {
                reportTypeCards.forEach(c => {
                    c.classList.remove('active', 'border-blue-500', 'bg-blue-50');
                    c.classList.add('border-gray-200');
                });
                
                this.classList.add('active', 'border-blue-500', 'bg-blue-50');
                this.classList.remove('border-gray-200');
                
                const type = this.dataset.type;
                if (type === 'individual') {
                    individualOptions.classList.remove('hidden');
                    classOptions.classList.add('hidden');
                } else {
                    individualOptions.classList.add('hidden');
                    classOptions.classList.remove('hidden');
                }
            });
        });
    }
    
    // Report scope toggle (Individual)
    const fullYearRadio = document.getElementById('fullYear');
    const termWiseRadio = document.getElementById('termWise');
    const termSelectionContainer = document.getElementById('termSelectionContainer');
    
    if (fullYearRadio && termWiseRadio) {
        fullYearRadio.addEventListener('change', function() {
            if (this.checked) {
                termSelectionContainer.classList.add('hidden');
                updatePreviewInfo('full', 'individual');
                console.log('Full year selected');
            }
        });
        termWiseRadio.addEventListener('change', function() {
            if (this.checked) {
                termSelectionContainer.classList.remove('hidden');
                updatePreviewInfo('term', 'individual');
                console.log('Term wise selected');
            }
        });
    }
    
    // Term checkboxes (enable/disable unit tests)
    const termCheckboxes = document.querySelectorAll('.term-checkbox');
    termCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const term = this.value;
            const unitTests = document.querySelectorAll(`.unit-test-checkbox[data-term="${term}"]`);
            unitTests.forEach(ut => {
                ut.disabled = !this.checked;
                if (!this.checked) {
                    ut.checked = false;
                }
            });
            updatePreviewInfo(termWiseRadio?.checked ? 'term' : 'full', 'individual');
        });
    });
    
    // Class report scope toggle
    const classFullYear = document.getElementById('classFullYear');
    const classTermWise = document.getElementById('classTermWise');
    const classTermContainer = document.getElementById('classTermSelectionContainer');
    
    if (classFullYear && classTermWise) {
        classFullYear.addEventListener('change', function() {
            if (this.checked) {
                classTermContainer.classList.add('hidden');
                updatePreviewInfo('full', 'class');
            }
        });
        
        classTermWise.addEventListener('change', function() {
            if (this.checked) {
                classTermContainer.classList.remove('hidden');
                updatePreviewInfo('term', 'class');
            }
        });
    }
    
    // Class term checkboxes
    const classTermCheckboxes = document.querySelectorAll('.class-term-checkbox');
    classTermCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updatePreviewInfo(classTermWise?.checked ? 'term' : 'full', 'class');
        });
    });
    
    // Generate report button
    document.getElementById('generateReportBtn')?.addEventListener('click', generateReport);
    
    // Preview button - FIXED: Ensure this is properly attached
    const previewBtn = document.getElementById('previewReportBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Preview button clicked');
            previewReport();
        });
    }
    
    // Setup student filter for report
    setupReportFilters();
    
    // Setup class filter for report
    setupReportClassFilter();
}

// Setup student filter for report
function setupReportFilters() {
    const classSelect = document.getElementById('reportClassSelect');
    const sectionSelect = document.getElementById('reportSectionSelect');
    const studentSelect = document.getElementById('reportStudentSelect');
    
    if (!classSelect || !sectionSelect || !studentSelect) return;
    
    // Get students from dummyData
    function getStudentsFromDummyData() {
        const students = [];
        
        Object.keys(dummyData.students).forEach(key => {
            dummyData.students[key].forEach(student => {
                students.push({
                    id: student.id,
                    name: student.name,
                    className: `Class ${student.class}`,
                    class: student.class,
                    section: student.section,
                    rollNo: student.rollNo,
                    display: `${student.name} (Class ${student.class}${student.section}${student.stream ? ' - ' + student.stream : ''})`
                });
            });
        });
        
        return students;
    }
    
    const allStudents = getStudentsFromDummyData();
    
    function filterStudents() {
        const selectedClass = classSelect.value;
        const selectedSection = sectionSelect.value;
        
        studentSelect.innerHTML = '<option value="">Select a student...</option>';
        
        const filteredStudents = allStudents.filter(student => {
            if (selectedClass && student.class !== selectedClass) return false;
            if (selectedSection && student.section !== selectedSection) return false;
            return true;
        });
        
        filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
        
        if (filteredStudents.length > 0) {
            filteredStudents.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.display;
                option.dataset.class = student.class;
                option.dataset.section = student.section;
                studentSelect.appendChild(option);
            });
            studentSelect.disabled = false;
        } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No students available';
            option.disabled = true;
            studentSelect.appendChild(option);
            studentSelect.disabled = true;
        }
        
        updatePreviewInfo(
            document.querySelector('input[name="reportScope"]:checked')?.value || 'full', 
            'individual'
        );
    }
    
    classSelect.addEventListener('change', filterStudents);
    sectionSelect.addEventListener('change', filterStudents);
    studentSelect.addEventListener('change', function() {
        updatePreviewInfo(
            document.querySelector('input[name="reportScope"]:checked')?.value || 'full', 
            'individual'
        );
    });
    
    filterStudents();
}

// Setup class filter for report
function setupReportClassFilter() {
    const classSelect = document.getElementById('reportClassSelect2');
    const sectionSelect = document.getElementById('reportSectionSelect2');
    
    if (!classSelect || !sectionSelect) return;
    
    classSelect.addEventListener('change', function() {
        const selectedClass = this.value;
        
        if (!selectedClass) {
            sectionSelect.innerHTML = '<option value="">All Sections</option>';
            sectionSelect.disabled = true;
            return;
        }
        
        const classData = dummyData.classes.find(c => c.id === selectedClass);
        
        if (classData) {
            sectionSelect.disabled = false;
            sectionSelect.innerHTML = '<option value="">All Sections</option>';
            
            classData.sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section;
                option.textContent = `Section ${section}`;
                sectionSelect.appendChild(option);
            });
        }
        
        updatePreviewInfo(
            document.querySelector('input[name="classReportScope"]:checked')?.value || 'full', 
            'class'
        );
    });
    
    sectionSelect.addEventListener('change', function() {
        updatePreviewInfo(
            document.querySelector('input[name="classReportScope"]:checked')?.value || 'full', 
            'class'
        );
    });
}

// Update preview information based on selections
function updatePreviewInfo(scope, type) {
    console.log('Updating preview:', scope, type);
    
    const pagesSpan = document.getElementById('previewPages');
    const includesSpan = document.getElementById('previewIncludes');
    const timeSpan = document.getElementById('previewTime');
    const previewArea = document.getElementById('reportPreviewArea');
    
    if (!pagesSpan || !includesSpan || !timeSpan || !previewArea) {
        console.error('Preview elements not found');
        return;
    }
    
    if (type === 'individual') {
        const studentSelect = document.getElementById('reportStudentSelect');
        const studentId = studentSelect?.value;
        const selectedOption = studentSelect?.options[studentSelect.selectedIndex];
        
        if (!studentId || !selectedOption || selectedOption.disabled) {
            pagesSpan.textContent = '-';
            includesSpan.textContent = 'Select a student';
            timeSpan.textContent = '-';
            previewArea.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-user text-gray-300 text-4xl mb-4"></i>
                    <p class="text-gray-500 text-sm">Please select a student</p>
                    <p class="text-gray-400 text-xs mt-2">Choose a student to preview report</p>
                </div>
            `;
            return;
        }
        
        const studentClass = selectedOption.dataset.class || 'N/A';
        const studentSection = selectedOption.dataset.section || 'N/A';
        
        if (scope === 'full') {
            pagesSpan.textContent = '8-10 pages';
            includesSpan.textContent = 'Term 1 & 2, All Unit Tests, Grades, Charts';
            timeSpan.textContent = '~20 seconds';
            
            previewArea.innerHTML = `
                <div class="text-left w-full">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Full Year Report</span>
                        <span class="text-xs text-gray-500">Class ${studentClass} - Section ${studentSection}</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex items-center text-sm">
                            <i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                            <span>Term 1 (with UT1, UT2)</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                            <span>Term 2 (with UT3, UT4)</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-chart-line text-blue-500 mr-2 text-xs"></i>
                            <span>Progressive Analysis</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-star text-yellow-500 mr-2 text-xs"></i>
                            <span>Overall Grade & Percentage</span>
                        </div>
                        <div class="mt-3 pt-2 border-t border-gray-200">
                            <p class="text-xs text-gray-500">Both Term 1 and Term 2 will be included with all Unit Tests</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Check which terms are selected
            const term1Checked = document.getElementById('term1Check')?.checked;
            const term2Checked = document.getElementById('term2Check')?.checked;
            const ut1Checked = document.getElementById('ut1Check')?.checked;
            const ut2Checked = document.getElementById('ut2Check')?.checked;
            const ut3Checked = document.getElementById('ut3Check')?.checked;
            const ut4Checked = document.getElementById('ut4Check')?.checked;
            
            let selectedItems = [];
            let previewHTML = '<div class="text-left w-full">';
            previewHTML += `<div class="flex items-center justify-between mb-3">
                <span class="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">Term Wise Report</span>
                <span class="text-xs text-gray-500">Class ${studentClass} - Section ${studentSection}</span>
            </div>`;
            
            if (term1Checked) {
                selectedItems.push('Term 1');
                previewHTML += '<div class="mb-2"><span class="text-sm font-medium text-gray-700">Term 1:</span>';
                previewHTML += '<div class="ml-4 mt-1 space-y-1">';
                if (ut1Checked) {
                    selectedItems.push('UT1');
                    previewHTML += '<div class="flex items-center text-sm"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Unit Test 1</div>';
                }
                if (ut2Checked) {
                    selectedItems.push('UT2');
                    previewHTML += '<div class="flex items-center text-sm"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Unit Test 2</div>';
                }
                if (!ut1Checked && !ut2Checked) {
                    previewHTML += '<div class="flex items-center text-sm text-gray-500"><i class="fas fa-minus-circle mr-2 text-xs"></i>No unit tests selected</div>';
                }
                previewHTML += '</div></div>';
            }
            
            if (term2Checked) {
                selectedItems.push('Term 2');
                previewHTML += '<div class="mb-2"><span class="text-sm font-medium text-gray-700">Term 2:</span>';
                previewHTML += '<div class="ml-4 mt-1 space-y-1">';
                if (ut3Checked) {
                    selectedItems.push('UT3');
                    previewHTML += '<div class="flex items-center text-sm"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Unit Test 3</div>';
                }
                if (ut4Checked) {
                    selectedItems.push('UT4');
                    previewHTML += '<div class="flex items-center text-sm"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Unit Test 4</div>';
                }
                if (!ut3Checked && !ut4Checked) {
                    previewHTML += '<div class="flex items-center text-sm text-gray-500"><i class="fas fa-minus-circle mr-2 text-xs"></i>No unit tests selected</div>';
                }
                previewHTML += '</div></div>';
            }
            
            if (!term1Checked && !term2Checked) {
                previewHTML += '<div class="text-sm text-gray-500 italic">No terms selected. Please select at least one term.</div>';
            }
            
            previewHTML += '</div>';
            
            const pageCount = selectedItems.length * 2 + 2;
            pagesSpan.textContent = `${pageCount}-${pageCount + 2} pages`;
            includesSpan.textContent = selectedItems.join(', ') || 'No terms selected';
            timeSpan.textContent = '~10 seconds';
            
            previewArea.innerHTML = previewHTML;
        }
    } else {
        // Class report
        const classSelect = document.getElementById('reportClassSelect2');
        const className = classSelect?.value;
        const sectionName = document.getElementById('reportSectionSelect2')?.value;
        
        if (!className) {
            pagesSpan.textContent = '-';
            includesSpan.textContent = 'Select a class';
            timeSpan.textContent = '-';
            previewArea.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-users text-gray-300 text-4xl mb-4"></i>
                    <p class="text-gray-500 text-sm">Please select a class</p>
                    <p class="text-gray-400 text-xs mt-2">Choose class to preview report</p>
                </div>
            `;
            return;
        }
        
        // Get student count from localStorage or use default
        const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
        const studentsInClass = new Set();
        allMarks.forEach(m => {
            if (m.class === className && (!sectionName || m.section === sectionName)) {
                studentsInClass.add(m.studentId);
            }
        });
        
        // Also check dummyData for students
        let dummyCount = 0;
        Object.keys(dummyData.students).forEach(key => {
            if (key.startsWith(className) && (!sectionName || key.endsWith(sectionName))) {
                dummyCount += dummyData.students[key].length;
            }
        });
        
        const studentCount = studentsInClass.size || dummyCount || 25;
        
        if (scope === 'full') {
            pagesSpan.textContent = `${studentCount * 2 + 5}-${studentCount * 2 + 8} pages`;
            includesSpan.textContent = `${studentCount} Students, Term 1 & 2, Class Statistics, Performance Charts`;
            timeSpan.textContent = '~30 seconds';
            
            previewArea.innerHTML = `
                <div class="text-left w-full">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Full Year Class Report</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex items-center text-sm">
                            <i class="fas fa-users text-blue-500 mr-2 text-xs"></i>
                            <span>Class ${className}${sectionName ? ' - Section ' + sectionName : ''}</span>
                            <span class="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${studentCount} students</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                            <span>Term 1 Analysis (with UT1, UT2)</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>
                            <span>Term 2 Analysis (with UT3, UT4)</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-chart-bar text-green-500 mr-2 text-xs"></i>
                            <span>Class Average & Rankings</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-trophy text-yellow-500 mr-2 text-xs"></i>
                            <span>Subject-wise Toppers</span>
                        </div>
                        <div class="flex items-center text-sm">
                            <i class="fas fa-chart-pie text-purple-500 mr-2 text-xs"></i>
                            <span>Grade Distribution</span>
                        </div>
                        <div class="mt-3 pt-2 border-t border-gray-200">
                            <p class="text-xs text-gray-500">Complete class report with both terms and all students</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const term1Checked = document.getElementById('classTerm1Check')?.checked;
            const term2Checked = document.getElementById('classTerm2Check')?.checked;
            
            let selectedTerms = [];
            if (term1Checked) selectedTerms.push('Term 1');
            if (term2Checked) selectedTerms.push('Term 2');
            
            pagesSpan.textContent = selectedTerms.length * (studentCount + 2) + 5 + ' pages';
            includesSpan.textContent = selectedTerms.join(', ') || 'Select terms';
            timeSpan.textContent = '~15 seconds';
            
            let previewHTML = '<div class="text-left w-full">';
            previewHTML += '<div class="flex items-center justify-between mb-2"><span class="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">Term Wise Class Report</span></div>';
            previewHTML += `<div class="flex items-center text-sm mb-2">
                <i class="fas fa-users text-blue-500 mr-2 text-xs"></i>
                <span>Class ${className}${sectionName ? ' - Section ' + sectionName : ''}</span>
                <span class="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">${studentCount} students</span>
            </div>`;
            
            if (term1Checked) {
                previewHTML += '<div class="flex items-center text-sm ml-2"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Term 1 Analysis (with UT1, UT2)</div>';
            }
            if (term2Checked) {
                previewHTML += '<div class="flex items-center text-sm ml-2"><i class="fas fa-check-circle text-green-500 mr-2 text-xs"></i>Term 2 Analysis (with UT3, UT4)</div>';
            }
            if (!term1Checked && !term2Checked) {
                previewHTML += '<div class="flex items-center text-sm text-gray-500"><i class="fas fa-exclamation-circle mr-2 text-xs"></i>No terms selected. Please select at least one term.</div>';
            }
            
            previewHTML += '</div>';
            previewArea.innerHTML = previewHTML;
        }
    }
}

// Generate Report Function
function generateReport() {
    const reportType = document.querySelector('.report-type-card.active')?.dataset.type;
    const format = document.querySelector('input[name="reportFormat"]:checked')?.value || 'pdf';
    
    if (reportType === 'individual') {
        generateIndividualReport(format);
    } else {
        generateClassReport(format);
    }
}

// Generate Individual Report
function generateIndividualReport(format) {
    const studentSelect = document.getElementById('reportStudentSelect');
    const studentId = studentSelect.value;
    const selectedOption = studentSelect.options[studentSelect.selectedIndex];
    const studentName = selectedOption?.text || 'Student';
    const academicYear = document.getElementById('reportAcademicYear').value;
    const scope = document.querySelector('input[name="reportScope"]:checked')?.value;
    
    if (!studentId) {
        showToast('Please select a student', 'error');
        return;
    }
    
    const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    const studentMarks = allMarks.filter(m => m.studentId === studentId);
    
    if (studentMarks.length === 0) {
        showToast('No marks found for selected student', 'warning');
        return;
    }
    
    let selectedData = {
        student: studentMarks[0],
        allMarks: studentMarks,
        academicYear: academicYear,
        scope: scope
    };
    
    if (scope === 'term') {
        selectedData.terms = [];
        if (document.getElementById('term1Check')?.checked) {
            const unitTests = [];
            if (document.getElementById('ut1Check')?.checked) unitTests.push('UT1');
            if (document.getElementById('ut2Check')?.checked) unitTests.push('UT2');
            selectedData.terms.push({ term: 'term1', name: 'Term 1', unitTests });
        }
        if (document.getElementById('term2Check')?.checked) {
            const unitTests = [];
            if (document.getElementById('ut3Check')?.checked) unitTests.push('UT3');
            if (document.getElementById('ut4Check')?.checked) unitTests.push('UT4');
            selectedData.terms.push({ term: 'term2', name: 'Term 2', unitTests });
        }
    }
    
    if (format === 'html' || format === 'pdf') {
        previewIndividualReport(selectedData);
    } else if (format === 'excel') {
        showToast('Excel report generation - Coming soon', 'info');
    }
    
    showToast(`Report generated for ${studentName}`, 'success');
}

// Generate Class Report
function generateClassReport(format) {
    const classValue = document.getElementById('reportClassSelect2')?.value;
    const sectionValue = document.getElementById('reportSectionSelect2')?.value;
    const scope = document.querySelector('input[name="classReportScope"]:checked')?.value;
    
    if (!classValue) {
        showToast('Please select a class', 'error');
        return;
    }
    
    const className = `Class ${classValue}${sectionValue ? ' - Section ' + sectionValue : ''}`;
    
    const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
    const classMarks = allMarks.filter(m => {
        if (m.class !== classValue) return false;
        if (sectionValue && m.section !== sectionValue) return false;
        return true;
    });
    
    if (classMarks.length === 0) {
        showToast('No marks found for this class', 'warning');
        return;
    }
    
    let selectedTerms = [];
    if (scope === 'term') {
        if (document.getElementById('classTerm1Check')?.checked) selectedTerms.push('term1');
        if (document.getElementById('classTerm2Check')?.checked) selectedTerms.push('term2');
    }
    
    if (format === 'html' || format === 'pdf') {
        previewClassReport(classMarks, className, scope, selectedTerms);
    } else if (format === 'excel') {
        showToast('Excel class report - Coming soon', 'info');
    }
    
    showToast(`Class report generated for ${className}`, 'success');
}

// Preview Report Function - FIXED: Complete implementation
function previewReport() {
    console.log('Preview report function called');
    
    const reportType = document.querySelector('.report-type-card.active')?.dataset.type;
    console.log('Report type:', reportType);
    
    if (reportType === 'individual') {
        const studentSelect = document.getElementById('reportStudentSelect');
        const studentId = studentSelect?.value;
        
        if (!studentId) {
            showToast('Please select a student', 'error');
            return;
        }
        
        const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
        const studentMarks = allMarks.filter(m => m.studentId === studentId);
        
        if (studentMarks.length === 0) {
            // Create sample data for preview if no real data exists
            const selectedOption = studentSelect.options[studentSelect.selectedIndex];
            const sampleData = createSampleStudentData(selectedOption);
            previewIndividualReport(sampleData);
        } else {
            const data = {
                student: studentMarks[0],
                allMarks: studentMarks,
                academicYear: document.getElementById('reportAcademicYear').value || '2024-2025',
                scope: document.querySelector('input[name="reportScope"]:checked')?.value || 'full'
            };
            
            if (data.scope === 'term') {
                data.terms = [];
                if (document.getElementById('term1Check')?.checked) {
                    data.terms.push({ 
                        term: 'term1', 
                        name: 'Term 1', 
                        unitTests: [
                            ...(document.getElementById('ut1Check')?.checked ? ['UT1'] : []),
                            ...(document.getElementById('ut2Check')?.checked ? ['UT2'] : [])
                        ]
                    });
                }
                if (document.getElementById('term2Check')?.checked) {
                    data.terms.push({ 
                        term: 'term2', 
                        name: 'Term 2', 
                        unitTests: [
                            ...(document.getElementById('ut3Check')?.checked ? ['UT3'] : []),
                            ...(document.getElementById('ut4Check')?.checked ? ['UT4'] : [])
                        ]
                    });
                }
            }
            
            previewIndividualReport(data);
        }
    } else {
        const classSelect = document.getElementById('reportClassSelect2');
        const classValue = classSelect?.value;
        
        if (!classValue) {
            showToast('Please select a class', 'error');
            return;
        }
        
        const allMarks = JSON.parse(localStorage.getItem('studentMarks')) || [];
        const sectionValue = document.getElementById('reportSectionSelect2')?.value;
        const classMarks = allMarks.filter(m => {
            if (m.class !== classValue) return false;
            if (sectionValue && m.section !== sectionValue) return false;
            return true;
        });
        
        if (classMarks.length === 0) {
            // Create sample class data for preview
            const sampleClassData = createSampleClassData(classValue, sectionValue);
            const className = `Class ${classValue}${sectionValue ? ' - Section ' + sectionValue : ''}`;
            const scope = document.querySelector('input[name="classReportScope"]:checked')?.value;
            const selectedTerms = [];
            
            if (scope === 'term') {
                if (document.getElementById('classTerm1Check')?.checked) selectedTerms.push('term1');
                if (document.getElementById('classTerm2Check')?.checked) selectedTerms.push('term2');
            }
            
            previewClassReport(sampleClassData, className, scope, selectedTerms);
        } else {
            const className = `Class ${classValue}${sectionValue ? ' - Section ' + sectionValue : ''}`;
            const scope = document.querySelector('input[name="classReportScope"]:checked')?.value;
            const selectedTerms = [];
            
            if (scope === 'term') {
                if (document.getElementById('classTerm1Check')?.checked) selectedTerms.push('term1');
                if (document.getElementById('classTerm2Check')?.checked) selectedTerms.push('term2');
            }
            
            previewClassReport(classMarks, className, scope, selectedTerms);
        }
    }
}

// Preview Individual Report
function previewIndividualReport(data) {
    console.log('Previewing individual report:', data);
    
    const student = data.student;
    const studentName = student.studentName ? student.studentName.split('(')[0].trim() : 'Student';
    
    let reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Report - ${studentName}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Inter', sans-serif; background: #f3f4f6; }
                .report-card { max-width: 1000px; margin: 20px auto; }
                @media print {
                    body { background: white; }
                    .no-print { display: none; }
                }
                .grade-A { color: #059669; font-weight: bold; }
                .grade-B { color: #2563eb; font-weight: bold; }
                .grade-C { color: #d97706; font-weight: bold; }
                .grade-D { color: #ea580c; font-weight: bold; }
                .grade-F { color: #dc2626; font-weight: bold; }
            </style>
        </head>
        <body class="p-4">
            <div class="report-card">
                <div class="bg-white rounded-t-xl p-6 border-b-4 border-blue-500">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-800">Student Performance Report</h1>
                            <p class="text-gray-600">Academic Year: ${data.academicYear || '2024-2025'}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500">Report Generated</p>
                            <p class="font-medium">${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Student Name</p>
                        <p class="text-xl font-bold text-gray-900">${studentName}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Roll Number</p>
                        <p class="text-xl font-bold text-gray-900">${student.studentId || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Class & Section</p>
                        <p class="text-lg font-semibold text-gray-900">${student.className || 'N/A'} - Section ${student.section || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Report Type</p>
                        <p class="text-lg font-semibold text-gray-900">${data.scope === 'full' ? 'Full Year' : 'Selected Terms'}</p>
                    </div>
                </div>
    `;
    
    if (data.scope === 'full') {
        const term1Marks = data.allMarks.find(m => m.term === 'term1');
        const term2Marks = data.allMarks.find(m => m.term === 'term2');
        
        if (term1Marks) {
            reportHTML += generateTermSection(term1Marks, 'Term 1');
        } else {
            reportHTML += generateSampleTermSection('Term 1', student);
        }
        
        if (term2Marks) {
            reportHTML += generateTermSection(term2Marks, 'Term 2');
        } else {
            reportHTML += generateSampleTermSection('Term 2', student);
        }
        
        const term1Percent = term1Marks?.overall.percentage || 85;
        const term2Percent = term2Marks?.overall.percentage || 88;
        const overallPercentage = (term1Percent + term2Percent) / 2;
        const overallGrade = calculateGrade(overallPercentage);
        const gradeClass = `grade-${overallGrade}`;
        
        reportHTML += `
            <div class="bg-white p-6 mt-4 rounded-b-xl">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Annual Overall Summary</h3>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">Total Marks</p>
                        <p class="text-2xl font-bold text-gray-900">${(term1Marks?.overall.totalMarks || 425) + (term2Marks?.overall.totalMarks || 440)}/${(term1Marks?.overall.maxTotal || 500) + (term2Marks?.overall.maxTotal || 500)}</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">Average Percentage</p>
                        <p class="text-2xl font-bold ${gradeClass}">${overallPercentage.toFixed(1)}%</p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">Final Grade</p>
                        <p class="text-2xl font-bold ${gradeClass}">${overallGrade}</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        if (data.terms && data.terms.length > 0) {
            data.terms.forEach(termData => {
                const termMark = data.allMarks.find(m => m.term === termData.term);
                if (termMark) {
                    reportHTML += generateTermSection(termMark, termData.name);
                } else {
                    reportHTML += generateSampleTermSection(termData.name, student);
                }
            });
        } else {
            reportHTML += generateSampleTermSection('Term 1', student);
        }
    }
    
    reportHTML += `
                <div class="mt-4 text-center text-sm text-gray-500 no-print">
                    <button onclick="window.print()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2">
                        <i class="fas fa-print mr-2"></i>Print Report
                    </button>
                    <button onclick="window.close()" class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        <i class="fas fa-times mr-2"></i>Close
                    </button>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

// Generate sample term section for preview
function generateSampleTermSection(termName, student) {
    const subjects = [
        { name: 'Mathematics', marks: 92, grade: 'A', performance: 'excellent' },
        { name: 'Science', marks: 88, grade: 'B', performance: 'good' },
        { name: 'English', marks: 85, grade: 'B', performance: 'good' },
        { name: 'Social Studies', marks: 90, grade: 'A', performance: 'excellent' },
        { name: 'Computer Science', marks: 94, grade: 'A', performance: 'excellent' }
    ];
    
    const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
    const maxTotal = 500;
    const percentage = Math.round((totalMarks / maxTotal) * 100);
    const grade = calculateGrade(percentage);
    
    let html = `
        <div class="bg-white p-6 mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">${termName} Performance (Sample Data)</h3>
            <table class="w-full mb-4">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Marks</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Grade</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Performance</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    subjects.forEach(subj => {
        const gradeClass = `grade-${subj.grade}`;
        html += `
            <tr class="border-b">
                <td class="px-4 py-2 font-medium">${subj.name}</td>
                <td class="px-4 py-2">${subj.marks}/100</td>
                <td class="px-4 py-2 font-bold ${gradeClass}">${subj.grade}</td>
                <td class="px-4 py-2 capitalize">${subj.performance}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
            
            <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Total Marks</p>
                    <p class="text-lg font-bold text-gray-900">${totalMarks}/${maxTotal}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Percentage</p>
                    <p class="text-lg font-bold grade-${grade}">${percentage}%</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Grade</p>
                    <p class="text-lg font-bold grade-${grade}">${grade}</p>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

// Generate Term Section for Report
function generateTermSection(termData, termName) {
    let html = `
        <div class="bg-white p-6 mt-4">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">${termName} Performance</h3>
            <table class="w-full mb-4">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Marks</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Grade</th>
                        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Performance</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    if (termData.subjects) {
        Object.keys(termData.subjects).forEach(subject => {
            const subj = termData.subjects[subject];
            const gradeClass = `grade-${subj.grade}`;
            html += `
                <tr class="border-b">
                    <td class="px-4 py-2 font-medium">${subject}</td>
                    <td class="px-4 py-2">${subj.marks}/${subj.maxMarks}</td>
                    <td class="px-4 py-2 font-bold ${gradeClass}">${subj.grade}</td>
                    <td class="px-4 py-2 capitalize">${subj.performance || 'N/A'}</td>
                </tr>
            `;
        });
    } else {
        // Sample subjects if no data
        const subjects = [
            { name: 'Mathematics', marks: 90, maxMarks: 100, grade: 'A', performance: 'excellent' },
            { name: 'Science', marks: 85, maxMarks: 100, grade: 'B', performance: 'good' }
        ];
        subjects.forEach(subj => {
            html += `
                <tr class="border-b">
                    <td class="px-4 py-2 font-medium">${subj.name}</td>
                    <td class="px-4 py-2">${subj.marks}/${subj.maxMarks}</td>
                    <td class="px-4 py-2 font-bold grade-${subj.grade}">${subj.grade}</td>
                    <td class="px-4 py-2 capitalize">${subj.performance}</td>
                </tr>
            `;
        });
    }
    
    html += `
                </tbody>
            </table>
            
            <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Total Marks</p>
                    <p class="text-lg font-bold text-gray-900">${termData.overall?.totalMarks || 450}/${termData.overall?.maxTotal || 500}</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Percentage</p>
                    <p class="text-lg font-bold grade-${termData.overall?.grade || 'A'}">${termData.overall?.percentage || 90}%</p>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg text-center">
                    <p class="text-xs text-gray-600">Grade</p>
                    <p class="text-lg font-bold grade-${termData.overall?.grade || 'A'}">${termData.overall?.grade || 'A'}</p>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

// Create sample student data for preview
function createSampleStudentData(selectedOption) {
    const studentId = selectedOption.value;
    const studentText = selectedOption.text;
    const classMatch = studentText.match(/Class (\d+)/);
    const sectionMatch = studentText.match(/([A-Z])[^A-Z]*$/);
    const classVal = classMatch ? classMatch[1] : '10';
    const section = sectionMatch ? sectionMatch[1] : 'A';
    
    return {
        student: {
            id: 1,
            studentId: studentId,
            studentName: studentText,
            className: `Class ${classVal}`,
            class: classVal,
            section: section,
            academicYear: '2024-2025',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Mathematics': { marks: 95, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'Science': { marks: 92, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'English': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                'Social Studies': { marks: 91, maxMarks: 100, grade: 'A', performance: 'excellent' },
                'Hindi': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' }
            },
            overall: { totalMarks: 451, maxTotal: 500, percentage: 90.2, grade: 'A' }
        },
        allMarks: [
            {
                id: 1,
                studentId: studentId,
                studentName: studentText,
                className: `Class ${classVal}`,
                class: classVal,
                section: section,
                term: 'term1',
                termName: 'Term 1 (April - June)',
                assessmentDate: '2024-06-15',
                subjects: {
                    'Mathematics': { marks: 95, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'Science': { marks: 92, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'English': { marks: 85, maxMarks: 100, grade: 'B', performance: 'good' },
                    'Social Studies': { marks: 91, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'Hindi': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' }
                },
                overall: { totalMarks: 451, maxTotal: 500, percentage: 90.2, grade: 'A' }
            },
            {
                id: 2,
                studentId: studentId,
                studentName: studentText,
                className: `Class ${classVal}`,
                class: classVal,
                section: section,
                term: 'term2',
                termName: 'Term 2 (July - September)',
                assessmentDate: '2024-09-15',
                subjects: {
                    'Mathematics': { marks: 98, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'Science': { marks: 94, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'English': { marks: 88, maxMarks: 100, grade: 'B', performance: 'good' },
                    'Social Studies': { marks: 93, maxMarks: 100, grade: 'A', performance: 'excellent' },
                    'Hindi': { marks: 90, maxMarks: 100, grade: 'A', performance: 'excellent' }
                },
                overall: { totalMarks: 463, maxTotal: 500, percentage: 92.6, grade: 'A' }
            }
        ],
        academicYear: '2024-2025',
        scope: document.querySelector('input[name="reportScope"]:checked')?.value || 'full'
    };
}

// Create sample class data for preview
function createSampleClassData(classValue, sectionValue) {
    const students = [
        { id: 'S101', name: 'Rohan Sharma', rollNo: '101', term1: 91, term2: 89 },
        { id: 'S102', name: 'Priya Patel', rollNo: '102', term1: 86, term2: 88 },
        { id: 'S103', name: 'Aarav Singh', rollNo: '103', term1: 78, term2: 82 },
        { id: 'S104', name: 'Neha Gupta', rollNo: '104', term1: 92, term2: 94 },
        { id: 'S105', name: 'Karan Verma', rollNo: '105', term1: 75, term2: 79 }
    ];
    
    const classMarks = [];
    
    students.forEach(student => {
        // Term 1
        classMarks.push({
            id: parseInt(student.id.replace('S', '')),
            studentId: student.id,
            studentName: `${student.name} (Roll No: ${student.rollNo})`,
            className: `Class ${classValue}`,
            class: classValue,
            section: sectionValue || 'A',
            term: 'term1',
            termName: 'Term 1 (April - June)',
            assessmentDate: '2024-06-15',
            subjects: {
                'Mathematics': { marks: student.term1, maxMarks: 100, grade: calculateGrade(student.term1), performance: 'good' },
                'Science': { marks: student.term1 + 2, maxMarks: 100, grade: calculateGrade(student.term1 + 2), performance: 'good' },
                'English': { marks: student.term1 - 3, maxMarks: 100, grade: calculateGrade(student.term1 - 3), performance: 'average' }
            },
            overall: { 
                totalMarks: student.term1 * 3 - 1, 
                maxTotal: 300, 
                percentage: Math.round((student.term1 * 3 - 1) / 3), 
                grade: calculateGrade(Math.round((student.term1 * 3 - 1) / 3)) 
            }
        });
        
        // Term 2
        classMarks.push({
            id: parseInt(student.id.replace('S', '')) + 100,
            studentId: student.id,
            studentName: `${student.name} (Roll No: ${student.rollNo})`,
            className: `Class ${classValue}`,
            class: classValue,
            section: sectionValue || 'A',
            term: 'term2',
            termName: 'Term 2 (July - September)',
            assessmentDate: '2024-09-15',
            subjects: {
                'Mathematics': { marks: student.term2, maxMarks: 100, grade: calculateGrade(student.term2), performance: 'good' },
                'Science': { marks: student.term2 + 3, maxMarks: 100, grade: calculateGrade(student.term2 + 3), performance: 'excellent' },
                'English': { marks: student.term2 - 2, maxMarks: 100, grade: calculateGrade(student.term2 - 2), performance: 'good' }
            },
            overall: { 
                totalMarks: student.term2 * 3 + 1, 
                maxTotal: 300, 
                percentage: Math.round((student.term2 * 3 + 1) / 3), 
                grade: calculateGrade(Math.round((student.term2 * 3 + 1) / 3)) 
            }
        });
    });
    
    return classMarks;
}

// Preview Class Report
function previewClassReport(classMarks, className, scope, selectedTerms) {
    const studentsBySection = {};
    classMarks.forEach(mark => {
        const section = mark.section || 'N/A';
        if (!studentsBySection[section]) {
            studentsBySection[section] = [];
        }
        studentsBySection[section].push(mark);
    });
    
    let reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Class Report - ${className}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Inter', sans-serif; background: #f3f4f6; }
                .report-card { max-width: 1200px; margin: 20px auto; }
                @media print {
                    body { background: white; }
                    .no-print { display: none; }
                }
                .grade-A { color: #059669; font-weight: bold; }
                .grade-B { color: #2563eb; font-weight: bold; }
                .grade-C { color: #d97706; font-weight: bold; }
                .grade-D { color: #ea580c; font-weight: bold; }
                .grade-F { color: #dc2626; font-weight: bold; }
            </style>
        </head>
        <body class="p-4">
            <div class="report-card">
                <div class="bg-white rounded-t-xl p-6 border-b-4 border-green-500">
                    <h1 class="text-2xl font-bold text-gray-800">Class Performance Report</h1>
                    <p class="text-gray-600">${className}</p>
                    <p class="text-sm text-gray-500 mt-2">Generated on: ${new Date().toLocaleDateString()}</p>
                </div>
    `;
    
    Object.keys(studentsBySection).forEach(section => {
        const students = studentsBySection[section];
        
        reportHTML += `
            <div class="bg-white p-6 mt-4">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Section ${section} - ${students.length} Students</h3>
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Roll No</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Student Name</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Term 1 %</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Term 1 Grade</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Term 2 %</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Term 2 Grade</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-700">Average</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        const studentMap = {};
        students.forEach(student => {
            if (!studentMap[student.studentId]) {
                studentMap[student.studentId] = {};
            }
            studentMap[student.studentId][student.term] = student;
        });
        
        Object.keys(studentMap).forEach(studentId => {
            const studentData = studentMap[studentId];
            const term1Data = studentData['term1'];
            const term2Data = studentData['term2'];
            
            const term1Percent = term1Data?.overall.percentage || 0;
            const term1Grade = term1Data?.overall.grade || 'N/A';
            const term2Percent = term2Data?.overall.percentage || 0;
            const term2Grade = term2Data?.overall.grade || 'N/A';
            const avgPercent = (term1Percent + term2Percent) / 2;
            const avgGrade = calculateGrade(avgPercent);
            
            const studentName = term1Data?.studentName.split('(')[0] || term2Data?.studentName.split('(')[0] || 'Unknown';
            
            reportHTML += `
                <tr class="border-b">
                    <td class="px-4 py-2">${studentId}</td>
                    <td class="px-4 py-2 font-medium">${studentName}</td>
                    <td class="px-4 py-2">${term1Percent}%</td>
                    <td class="px-4 py-2 grade-${term1Grade}">${term1Grade}</td>
                    <td class="px-4 py-2">${term2Percent}%</td>
                    <td class="px-4 py-2 grade-${term2Grade}">${term2Grade}</td>
                    <td class="px-4 py-2 font-bold grade-${avgGrade}">${avgPercent.toFixed(1)}% (${avgGrade})</td>
                </tr>
            `;
        });
        
        const term1Students = students.filter(s => s.term === 'term1');
        const term2Students = students.filter(s => s.term === 'term2');
        
        const avgTerm1 = term1Students.length > 0 ? term1Students.reduce((sum, s) => sum + (s.overall.percentage || 0), 0) / term1Students.length : 0;
        const avgTerm2 = term2Students.length > 0 ? term2Students.reduce((sum, s) => sum + (s.overall.percentage || 0), 0) / term2Students.length : 0;
        const classAvg = (avgTerm1 + avgTerm2) / 2;
        
        reportHTML += `
                    </tbody>
                </table>
                
                <div class="mt-4 grid grid-cols-3 gap-4">
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Section Average (Term 1)</p>
                        <p class="text-xl font-bold text-blue-600">${avgTerm1.toFixed(1)}%</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Section Average (Term 2)</p>
                        <p class="text-xl font-bold text-green-600">${avgTerm2.toFixed(1)}%</p>
                    </div>
                    <div class="bg-purple-50 p-3 rounded-lg">
                        <p class="text-sm text-gray-600">Overall Section Average</p>
                        <p class="text-xl font-bold text-purple-600">${classAvg.toFixed(1)}%</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    reportHTML += `
                <div class="mt-4 text-center text-sm text-gray-500 no-print">
                    <button onclick="window.print()" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-2">
                        <i class="fas fa-print mr-2"></i>Print Report
                    </button>
                    <button onclick="window.close()" class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        <i class="fas fa-times mr-2"></i>Close
                    </button>
                </div>
            </div>
        </body>
        </html>
    `;
    
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

// Add CSS styles for report preview
const reportStyles = document.createElement('style');
reportStyles.textContent = `
    .grade-A, .text-green-600 { color: #059669; }
    .grade-B, .text-blue-600 { color: #2563eb; }
    .grade-C, .text-yellow-600 { color: #d97706; }
    .grade-D, .text-orange-600 { color: #ea580c; }
    .grade-F, .text-red-600 { color: #dc2626; }
    
    .bg-grade-A { background-color: #d1fae5; }
    .bg-grade-B { background-color: #dbeafe; }
    .bg-grade-C { background-color: #fef3c7; }
    .bg-grade-D { background-color: #ffedd5; }
    .bg-grade-F { background-color: #fee2e2; }
    
    .report-type-card {
        transition: all 0.2s ease;
        cursor: pointer;
    }
    
    .report-type-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .unit-test-checkbox:disabled + label {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    #reportPreviewArea {
        transition: all 0.3s ease;
        overflow-y: auto;
        max-height: 300px;
    }
    
    #reportPreviewArea::-webkit-scrollbar {
        width: 4px;
    }
    
    #reportPreviewArea::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    #reportPreviewArea::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 2px;
    }
`;
document.head.appendChild(reportStyles);

// Add this to your styles
const previewStyles = document.createElement('style');
previewStyles.textContent = `
    #reportPreviewArea {
        min-height: 200px;
        transition: all 0.3s ease;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
    }
    
    #reportPreviewArea > div {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .report-type-card.active {
        border-color: #3b82f6;
        background-color: #eff6ff;
    }
`;
document.head.appendChild(previewStyles);

// Placeholder functions
function setupGradeBook() {}
function setupModals() {}