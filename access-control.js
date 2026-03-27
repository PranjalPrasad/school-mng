// ================== access-control.js ==================

/**
 * BASIC ADMIN  → Only specific modules & sub-modules (listed below)
 * ADVANCED ADMIN → Full access to every module & sub-module
 *
 * Basic Admin Allowed Pages:
 *  1. Dashboard          → index.html
 *  2. Students           → student-management.html  |  add-student.html
 *  3. Teachers           → teachers-management.html |  add-teacher.html  | teacher-attendance.html
 *  4. Classes & Exams    → create-class.html        |  examschedule.html / examSchedule.html
 *  5. School Calendar    → calendar.html
 *  6. Notices            → notice.html
 */

const BASIC_ALLOWED_PAGES = [
    // ── Dashboard ──────────────────────────────────────────────────────────
    'index.html',

    // ── Students ───────────────────────────────────────────────────────────
    'student-management.html',
    'add-student.html',

    // ── Teachers ───────────────────────────────────────────────────────────
    'teachers-management.html',
    'add-teacher.html',
    'teacher-attendance.html',

    // ── Classes & Exam Management ──────────────────────────────────────────
    'create-class.html',
    'examschedule.html',       // covers both casings via toLowerCase()

    // ── School Calendar ────────────────────────────────────────────────────
    'calendar.html',

    // ── Notices ────────────────────────────────────────────────────────────
    'notice.html',
];

// ─────────────────────────────────────────────────────────────────────────────
// Session helpers
// ─────────────────────────────────────────────────────────────────────────────

function getCurrentRole() {
    const session = localStorage.getItem('school_portal_session');
    if (!session) return null;

    try {
        const data = JSON.parse(session);
        if (new Date(data.expires) < new Date()) {
            localStorage.removeItem('school_portal_session');
            return null;
        }
        return data.role; // expected: "basic" | "advanced"
    } catch {
        localStorage.removeItem('school_portal_session');
        return null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Core: sidebar restriction for Basic Admin
// ─────────────────────────────────────────────────────────────────────────────

function restrictSidebarForBasicAdmin() {
    const role = getCurrentRole();

    // Advanced admin → nothing to hide
    if (role !== 'basic') {
        console.log('✅ Advanced Admin Mode – Full Access');
        return;
    }

    console.log('🔒 Basic Admin Mode – Restricted Access');

    // ── 1. Hide disallowed nav-items ────────────────────────────────────────
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = (item.getAttribute('href') || '').toLowerCase().trim();

        // Extract just the filename from the href (handles paths like /pages/foo.html)
        const filename = href.split('/').pop().split('?')[0]; // e.g. "add-student.html"

        const allowed = BASIC_ALLOWED_PAGES.some(page => filename === page.toLowerCase());

        if (!allowed) {
            item.style.display = 'none';
        }
    });

    // ── 2. Hide section headers whose entire group is now hidden ───────────
    //    Works for both <p class="uppercase ..."> and <li class="menu-title"> patterns
    const headerSelectors = [
        'p.uppercase',
        'li.menu-title',
        '.sidebar-section-header',
        '.nav-category',
    ];

    headerSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(header => {
            const section = header.parentElement;
            if (!section) return;

            // Count nav-items that are still visible inside this section
            const visibleLinks = Array.from(
                section.querySelectorAll('.nav-item')
            ).filter(el => el.style.display !== 'none');

            if (visibleLinks.length === 0) {
                header.style.display = 'none';
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-level guard: redirect to login if no active session
// ─────────────────────────────────────────────────────────────────────────────

function guardCurrentPage() {
    const role = getCurrentRole();
    if (!role) return; // already redirecting via initAccessControl

    if (role !== 'basic') return; // advanced has full access

    // Check whether this page itself is allowed for basic admin
    const currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const pageAllowed = BASIC_ALLOWED_PAGES.some(page => currentFile === page.toLowerCase());

    if (!pageAllowed) {
        console.warn(`🚫 Basic Admin tried to access "${currentFile}" – redirecting to dashboard.`);
        window.location.href = 'index.html';
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Top-bar label
// ─────────────────────────────────────────────────────────────────────────────

function updateUserLabel(role) {
    const selectors = [
        '#userMenuBtn .font-semibold',
        '#userMenuBtn .user-name',
        '.top-bar-username',
    ];

    const label = role === 'basic' ? 'Basic Admin' : 'Advanced Admin';

    selectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.textContent = label;
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main init – call this on every protected page
// ─────────────────────────────────────────────────────────────────────────────

function initAccessControl() {
    const role = getCurrentRole();

    if (!role) {
        window.location.href = 'login.html';
        return;
    }

    updateUserLabel(role);
    guardCurrentPage();           // kick out basic admin from forbidden pages
    restrictSidebarForBasicAdmin(); // hide forbidden sidebar links
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

window.initAccessControl = initAccessControl;
window.getCurrentRole    = getCurrentRole;