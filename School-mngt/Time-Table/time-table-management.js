
        // ============================================================================
        // TIMETABLE MANAGEMENT SYSTEM
        // ============================================================================

        // Initialize application
        document.addEventListener('DOMContentLoaded', function () {
            checkSession();
            setupEventListeners();
            setupResponsiveSidebar();
            initializeTimetable();
            initAccessControl();
        });

        // Global variables
        let sidebarCollapsed = false;
        let isMobile = window.innerWidth < 1024;
        let currentView = 'class';
        let sortableInstance = null;

        // Session Management
        const USER_SESSION_KEY = 'school_portal_session';

        function checkSession() {
            const session = localStorage.getItem(USER_SESSION_KEY);
            if (!session) {
                window.location.href = 'login.html';
                return;
            }

            const { username, expires } = JSON.parse(session);
            if (new Date(expires) < new Date()) {
                localStorage.removeItem(USER_SESSION_KEY);
                window.location.href = 'login.html';
            }
        }

        function handleLogout() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem(USER_SESSION_KEY);
                window.location.href = 'login.html';
            }
        }

        // Initialize Timetable
        function initializeTimetable() {
            setupDragDrop();
            loadTimetableData();
        }

        function setupDragDrop() {
            const draggableItems = document.querySelectorAll('.subject-badge');
            const dropZones = document.querySelectorAll('.timetable-cell:not(.break-slot)');
            
            draggableItems.forEach(item => {
                item.setAttribute('draggable', 'true');
                item.addEventListener('dragstart', handleDragStart);
                item.addEventListener('dragend', handleDragEnd);
            });

            dropZones.forEach(zone => {
                zone.addEventListener('dragover', handleDragOver);
                zone.addEventListener('dragleave', handleDragLeave);
                zone.addEventListener('drop', handleDrop);
            });
        }

        function handleDragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.outerHTML);
            e.target.classList.add('opacity-50');
        }

        function handleDragEnd(e) {
            e.target.classList.remove('opacity-50');
        }

        function handleDragOver(e) {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        }

        function handleDragLeave(e) {
            e.currentTarget.classList.remove('drag-over');
        }

        function handleDrop(e) {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');
            
            const data = e.dataTransfer.getData('text/plain');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const draggedContent = tempDiv.firstChild;
            
            e.currentTarget.innerHTML = draggedContent.outerHTML;
            showToast('Slot updated successfully!', 'success');
        }

        // Load Timetable Data
        function loadTimetableData() {
            // This would fetch from backend API
            console.log('Loading timetable data...');
        }

        // Modal Functions
        function openSlotModal(day, period) {
            document.getElementById('modalTitle').textContent = 'Edit Time Slot';
            document.getElementById('selectedDay').value = day;
            document.getElementById('selectedPeriod').value = period;
            document.getElementById('timeSlotModal').classList.add('active');
        }

        function openBreakModal(day, breakType) {
            document.getElementById('modalTitle').textContent = 'Edit Break';
            document.getElementById('selectedDay').value = day;
            document.getElementById('isBreak').checked = true;
            document.getElementById('breakTypeSection').classList.remove('hidden');
            document.getElementById('breakType').value = breakType.toUpperCase();
            document.getElementById('timeSlotModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('timeSlotModal').classList.remove('active');
            document.getElementById('timeSlotForm').reset();
            document.getElementById('breakTypeSection').classList.add('hidden');
        }

        // Tab Switching
        function switchView(view) {
            currentView = view;
            
            // Update tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Show/hide views
            document.querySelectorAll('.view-section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(view + 'View').classList.remove('hidden');
        }

        // Toast Notification
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Setup Event Listeners
        function setupEventListeners() {
            // Logout
            document.getElementById('logoutBtn').addEventListener('click', handleLogout);

            // Sidebar Toggle
            document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

            // Notifications Dropdown
            document.getElementById('notificationsBtn').addEventListener('click', toggleNotifications);

            // User Menu Dropdown
            document.getElementById('userMenuBtn').addEventListener('click', toggleUserMenu);

            // Close dropdowns when clicking outside
            document.addEventListener('click', function (event) {
                if (!event.target.closest('#notificationsBtn')) {
                    document.getElementById('notificationsDropdown').classList.add('hidden');
                }
                if (!event.target.closest('#userMenuBtn')) {
                    document.getElementById('userMenuDropdown').classList.add('hidden');
                }
            });

            // Close sidebar when clicking on overlay
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            if (sidebarOverlay) {
                sidebarOverlay.addEventListener('click', closeMobileSidebar);
            }

            // Tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    switchView(this.dataset.view);
                });
            });

            // Modal controls
            document.getElementById('closeModal').addEventListener('click', closeModal);
            document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
            
            // Add Slot button
            document.getElementById('addSlotBtn').addEventListener('click', function() {
                document.getElementById('modalTitle').textContent = 'Add New Slot';
                document.getElementById('timeSlotModal').classList.add('active');
            });

            // Teacher Availability button
            document.getElementById('teacherAvailabilityBtn').addEventListener('click', function() {
                document.getElementById('teacherAvailabilityModal').classList.add('active');
                loadTeacherAvailability();
            });

            document.getElementById('closeTeacherModal').addEventListener('click', function() {
                document.getElementById('teacherAvailabilityModal').classList.remove('active');
            });

            // Break checkbox toggle
            document.getElementById('isBreak').addEventListener('change', function(e) {
                const breakSection = document.getElementById('breakTypeSection');
                if (e.target.checked) {
                    breakSection.classList.remove('hidden');
                } else {
                    breakSection.classList.add('hidden');
                }
            });

            // Form submission
            document.getElementById('timeSlotForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Time slot saved successfully!', 'success');
                closeModal();
            });

            // Generate Timetable button
            document.getElementById('generateTimetableBtn').addEventListener('click', function() {
                showConfirmDialog(
                    'Generate Timetable',
                    'This will automatically generate a new timetable. Continue?',
                    function() {
                        showToast('Timetable generated successfully!', 'success');
                    }
                );
            });

            // Export buttons
            document.getElementById('exportPdfBtn').addEventListener('click', function() {
                showToast('Exporting to PDF...', 'info');
                setTimeout(() => showToast('PDF exported successfully!', 'success'), 1500);
            });

            document.getElementById('exportExcelBtn').addEventListener('click', function() {
                showToast('Exporting to Excel...', 'info');
                setTimeout(() => showToast('Excel exported successfully!', 'success'), 1500);
            });

            // Edit Timetable button
            document.getElementById('editTimetableBtn').addEventListener('click', function() {
                showToast('Edit mode enabled. Drag and drop subjects to rearrange.', 'info');
            });

            // Teacher availability select
            document.getElementById('teacherAvailabilitySelect').addEventListener('change', function(e) {
                loadTeacherAvailability(e.target.value);
            });

            // Filters
            document.getElementById('classFilter').addEventListener('change', filterTimetable);
            document.getElementById('sectionFilter').addEventListener('change', filterTimetable);
            document.getElementById('teacherFilter').addEventListener('change', filterTimetable);
        }

        // Filter Timetable
        function filterTimetable() {
            const classFilter = document.getElementById('classFilter').value;
            const sectionFilter = document.getElementById('sectionFilter').value;
            const teacherFilter = document.getElementById('teacherFilter').value;
            
            showToast('Filtering timetable...', 'info');
        }

        // Load Teacher Availability
        function loadTeacherAvailability(teacherName = '') {
            const grid = document.getElementById('teacherAvailabilityGrid');
            if (!grid) return;

            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            let html = '';

            days.forEach(day => {
                html += `<div class="timetable-time-cell">${day}</div>`;
                for (let i = 1; i <= 5; i++) {
                    const isAvailable = Math.random() > 0.3;
                    html += `
                        <div class="timetable-cell">
                            <span class="${isAvailable ? 'teacher-available' : 'teacher-busy'}">
                                ${isAvailable ? '✓ Available' : '✗ Busy'}
                            </span>
                        </div>
                    `;
                }
            });

            grid.innerHTML = html;
        }

        // Confirmation Dialog
        function showConfirmDialog(title, message, onConfirm) {
            document.getElementById('confirmTitle').textContent = title;
            document.getElementById('confirmMessage').textContent = message;
            document.getElementById('confirmModal').classList.add('active');
            
            const handleConfirm = () => {
                document.getElementById('confirmModal').classList.remove('active');
                onConfirm();
                cleanup();
            };
            
            const handleCancel = () => {
                document.getElementById('confirmModal').classList.remove('active');
                cleanup();
            };
            
            const cleanup = () => {
                document.getElementById('confirmOk').removeEventListener('click', handleConfirm);
                document.getElementById('confirmCancel').removeEventListener('click', handleCancel);
            };
            
            document.getElementById('confirmOk').addEventListener('click', handleConfirm);
            document.getElementById('confirmCancel').addEventListener('click', handleCancel);
        }

        // Responsive Sidebar Setup (same as template)
        function setupResponsiveSidebar() {
            isMobile = window.innerWidth < 1024;

            if (isMobile) {
                closeMobileSidebar();
            } else {
                const sidebar = document.getElementById('sidebar');
                const mainContent = document.getElementById('mainContent');

                if (sidebarCollapsed) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('sidebar-collapsed');
                } else {
                    sidebar.classList.remove('collapsed');
                    mainContent.classList.remove('sidebar-collapsed');
                }
            }

            window.addEventListener('resize', handleResize);
        }

        function handleResize() {
            const wasMobile = isMobile;
            isMobile = window.innerWidth < 1024;

            if (wasMobile !== isMobile) {
                if (isMobile) {
                    closeMobileSidebar();
                } else {
                    const sidebar = document.getElementById('sidebar');
                    const mainContent = document.getElementById('mainContent');
                    const overlay = document.getElementById('sidebarOverlay');

                    sidebar.classList.remove('mobile-open');
                    overlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');

                    if (sidebarCollapsed) {
                        sidebar.classList.add('collapsed');
                        mainContent.classList.add('sidebar-collapsed');
                    } else {
                        sidebar.classList.remove('collapsed');
                        mainContent.classList.remove('sidebar-collapsed');
                    }
                }
            }
        }

        function toggleSidebar() {
            if (isMobile) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');

                if (sidebar.classList.contains('mobile-open')) {
                    closeMobileSidebar();
                } else {
                    openMobileSidebar();
                }
            } else {
                const sidebar = document.getElementById('sidebar');
                const mainContent = document.getElementById('mainContent');

                sidebarCollapsed = !sidebarCollapsed;

                if (sidebarCollapsed) {
                    sidebar.classList.add('collapsed');
                    mainContent.classList.add('sidebar-collapsed');
                    document.getElementById('sidebarToggleIcon').className = 'fas fa-bars text-xl';
                } else {
                    sidebar.classList.remove('collapsed');
                    mainContent.classList.remove('sidebar-collapsed');
                    document.getElementById('sidebarToggleIcon').className = 'fas fa-times text-xl';
                }
            }
        }

        function openMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');

            sidebar.classList.add('mobile-open');
            overlay.classList.add('active');
            document.body.classList.add('sidebar-open');
        }

        function closeMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');

            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }

        // Dropdown Toggles
        function toggleNotifications() {
            const dropdown = document.getElementById('notificationsDropdown');
            dropdown.classList.toggle('hidden');
        }

        function toggleUserMenu() {
            const dropdown = document.getElementById('userMenuDropdown');
            dropdown.classList.toggle('hidden');
        }

        // Make functions globally available
        window.openSlotModal = openSlotModal;
        window.openBreakModal = openBreakModal;

        
    