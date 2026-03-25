// ================== access-control.js (Exact Basic Access) ==================

function getCurrentRole() {
    const session = localStorage.getItem('school_portal_session');
    if (!session) return null;
    
    const data = JSON.parse(session);
    if (new Date(data.expires) < new Date()) {
        localStorage.removeItem('school_portal_session');
        return null;
    }
    return data.role;
}

function restrictSidebarForBasicAdmin() {
    const role = getCurrentRole();
    if (role !== "basic") return;   // Advanced ko full access

    console.log("🔒 Basic Admin Mode - Only 6 Specific Pages Allowed");

    document.querySelectorAll('.nav-item').forEach(item => {
        const href = (item.getAttribute('href') || '').toLowerCase();
        let allowed = false;

        // Sirf ye 6 files/pages allowed for Basic Admin
        if (
            href.includes('create-class.html') ||
            href.includes('examschedule.html') ||
            href.includes('examSchedule.html') ||     // dono spelling ke liye
            href.includes('student-management.html') ||
            href.includes('teachers-management.html') ||
            href.includes('teacher-attendance.html') || // agar attendance bhi chahiye
            href.includes('notice.html') ||
            href.includes('calendar.html') ||
            href.includes('index.html')                // Dashboard allowed
        ) {
            allowed = true;
        }

        if (!allowed) {
            item.style.display = 'none';
        }
    });

    // Hide empty category headers (Financial, Time Table, System etc.)
    document.querySelectorAll('p.uppercase').forEach(header => {
        const section = header.parentElement;
        if (!section) return;

        const visibleLinks = section.querySelectorAll('.nav-item:not([style*="display: none"])');

        if (visibleLinks.length === 0) {
            header.style.display = 'none';
        }
    });
}

function initAccessControl() {
    const role = getCurrentRole();
    if (!role) {
        window.location.href = 'login.html';
        return;
    }

    // Top bar user name
    const userNameEl = document.querySelector('#userMenuBtn .font-semibold');
    if (userNameEl) {
        userNameEl.textContent = role === 'basic' ? 'Basic Admin' : 'Advanced Admin';
    }

    restrictSidebarForBasicAdmin();
}

window.initAccessControl = initAccessControl;