let notices = [
    { id:'1', title:'School Holiday – Holi', description:'School will remain closed on 25th March 2026 on account of the festival of Holi. All students, teachers, and staff are informed accordingly. Classes will resume on 26th March 2026.', category:'holiday', priority:'high', status:'active', publishDate:'2026-03-20T09:00', expiryDate:'2026-03-26T18:00', audience:'all-users', targetClass:'', targetSections:[], attachments:[], createdAt:'2026-03-20' },
    { id:'2', title:'Parent-Teacher Meeting – Classes 9–12', description:'A PTM has been scheduled for Classes 9 to 12 on 5th April 2026 from 10:00 AM to 1:00 PM. Parents are requested to carry the student report card. For further queries, contact the school office.', category:'academic', priority:'high', status:'active', publishDate:'2026-03-18T10:30', expiryDate:'2026-04-06T23:59', audience:'parents', targetClass:'', targetSections:[], attachments:[{name:'PTM_Schedule.pdf',size:'1.2 MB'}], createdAt:'2026-03-18' },
    { id:'3', title:'Sports Day Registration Open', description:'Annual Sports Day registrations are now open. Students interested in participating must register by 30th March 2026 through their respective class teachers. Events include athletics, team sports, and cultural activities.', category:'event', priority:'medium', status:'active', publishDate:'2026-03-15T08:00', expiryDate:'2026-03-31T17:00', audience:'class', targetClass:'9', targetSections:['A','B'], attachments:[], createdAt:'2026-03-15' },
    { id:'4', title:'Mid-Term Exam Timetable', description:'The timetable for mid-term examinations has been published. Students are advised to download and follow the schedule carefully. Extra preparation classes will be held in the evening.', category:'exam', priority:'high', status:'expired', publishDate:'2026-02-01T12:00', expiryDate:'2026-02-28T20:00', audience:'students', targetClass:'', targetSections:[], attachments:[{name:'Exam_Schedule.pdf',size:'2.1 MB'}], createdAt:'2026-02-01' },
    { id:'5', title:'Staff Meeting – Friday 3 PM', description:'A mandatory staff meeting has been scheduled for Friday, 28th March 2026 at 3:00 PM in the conference hall. All teaching and non-teaching staff are required to attend.', category:'general', priority:'medium', status:'draft', publishDate:'2026-03-25T14:00', expiryDate:'2026-03-26T16:00', audience:'teachers', targetClass:'', targetSections:[], attachments:[], createdAt:'2026-03-14' },
];

let currentDeleteId = null;
let currentViewId   = null;
let currentPage     = 1;
let currentTab      = 'all';
const PER_PAGE      = 8;
let fileAttachments = [];
let selectedSections = [];

// CLASS → SECTIONS MAP
const classSectionsMap = {
    '1':  ['A','B'],
    '2':  ['A','B'],
    '3':  ['A','B','C'],
    '4':  ['A','B','C'],
    '5':  ['A','B','C'],
    '6':  ['A','B','C','D'],
    '7':  ['A','B','C','D'],
    '8':  ['A','B','C','D'],
    '9':  ['A','B','C','D'],
    '10': ['A','B','C','D'],
    '11': ['Science A','Science B','Commerce A','Arts A'],
    '12': ['Science A','Science B','Commerce A','Arts A'],
};

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    updateStats();
    setDefaultDates();

    document.getElementById('title').addEventListener('input', function() {
        document.getElementById('titleCount').textContent = this.value.length;
    });
});

// ══════════════════════════════════════════
//  STATS
// ══════════════════════════════════════════
function updateStats() {
    document.getElementById('statTotal').textContent   = notices.length;
    document.getElementById('statActive').textContent  = notices.filter(n=>n.status==='active').length;
    document.getElementById('statDraft').textContent   = notices.filter(n=>n.status==='draft').length;
    document.getElementById('statExpired').textContent = notices.filter(n=>n.status==='expired').length;
}

// ══════════════════════════════════════════
//  RENDER TABLE
// ══════════════════════════════════════════
function getFilteredNotices() {
    const q   = document.getElementById('searchInput').value.toLowerCase();
    const pri = document.getElementById('priorityFilter').value;
    const cat = document.getElementById('categoryFilter').value;
    const aud = document.getElementById('audienceFilter').value;

    return notices.filter(n => {
        if (currentTab === 'active'  && n.status !== 'active')  return false;
        if (currentTab === 'draft'   && n.status !== 'draft')   return false;
        if (currentTab === 'expired' && n.status !== 'expired') return false;
        if (q   && !n.title.toLowerCase().includes(q) && !n.description.toLowerCase().includes(q)) return false;
        if (pri !== 'all' && n.priority !== pri) return false;
        if (cat !== 'all' && n.category !== cat) return false;
        if (aud !== 'all' && n.audience !== aud) return false;
        return true;
    });
}

function renderNotices() {
    const filtered = getFilteredNotices();
    const total    = filtered.length;
    const start    = (currentPage - 1) * PER_PAGE;
    const end      = Math.min(start + PER_PAGE, total);
    const page     = filtered.slice(start, end);

    document.getElementById('startCount').textContent = total ? start + 1 : 0;
    document.getElementById('endCount').textContent   = end;
    document.getElementById('totalCount').textContent = total;
    renderPagination(total);

    const tbody = document.getElementById('noticeTableBody');
    if (!page.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#94a3b8;">
            <i class="fas fa-inbox" style="font-size:2rem;display:block;margin-bottom:8px;"></i>
            No notices found
        </td></tr>`;
        return;
    }

    tbody.innerHTML = page.map(n => {
        const sc = n.status === 'active' ? 'badge-active' : n.status === 'expired' ? 'badge-expired' : 'badge-draft';
        const pc = 'badge-' + n.priority;
        const audLabel = buildAudienceLabel(n);
        return `<tr>
            <td>
                <div style="font-weight:600;color:#1e293b;max-width:200px;">${n.title}</div>
                <div style="font-size:.75rem;color:#94a3b8;margin-top:2px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${n.description.substring(0,60)}…</div>
            </td>
            <td><span class="badge badge-category">${n.category}</span></td>
            <td>
                <span class="priority-dot dot-${n.priority}"></span>
                <span class="badge ${pc}">${n.priority}</span>
            </td>
            <td><span class="badge ${sc}">${n.status}</span></td>
            <td>
                <span class="badge badge-audience">${audLabel}</span>
            </td>
            <td style="font-size:.78rem;color:#64748b;">
                <div>${fmtDate(n.publishDate)}</div>
                <div style="color:#94a3b8;">to ${fmtDate(n.expiryDate)}</div>
            </td>
            <td>
                <button class="action-btn view" onclick="openViewModal('${n.id}')" title="View"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit" onclick="openEditModal('${n.id}')" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn dl"   onclick="downloadNotice('${n.id}')" title="Download"><i class="fas fa-download"></i></button>
                <button class="action-btn pub"  onclick="openPublishModal('${n.id}')" title="${n.status === 'active' ? 'Already Published' : 'Publish Notice'}"
                    style="${n.status === 'active' ? 'color:#94a3b8;cursor:not-allowed;' : 'color:#059669;'}">
                    <i class="fas fa-paper-plane"></i>
                </button>
                <button class="action-btn del"  onclick="openDeleteModal('${n.id}')" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    }).join('');
}

function buildAudienceLabel(n) {
    const labelMap = {
        'all-users':  '🌐 Everyone',
        'teachers':   '👩‍🏫 Teachers',
        'students':   '🎓 Students',
        'parents':    '👪 Parents',
        'staff':      '👔 Staff',
        'management': '💼 Management',
    };
    if (!n.audience) return '—';
    const vals = n.audience.split(',').map(v=>v.trim()).filter(Boolean);
    const labels = vals.map(val => {
        if (val === 'class') {
            const cls = n.targetClass ? `Class ${n.targetClass}` : 'Class';
            const sec = n.targetSections && n.targetSections.length
                ? (n.targetSections.includes('ALL') ? '(All §)' : `§${n.targetSections.join(',')}`)
                : '';
            return `🏫 ${cls}${sec}`;
        }
        return labelMap[val] || val;
    });
    return labels.join(' + ');
}

function renderPagination(total) {
    const pages = Math.ceil(total / PER_PAGE);
    let html = `<button onclick="gotoPage(${currentPage-1})" ${currentPage===1?'disabled':''} style="width:30px;height:30px;border-radius:6px;border:1px solid #e2e8f0;background:#fff;cursor:pointer;font-size:.75rem;${currentPage===1?'opacity:.4;':''}">&lsaquo;</button>`;
    for (let i=1;i<=pages;i++) {
        html += `<button onclick="gotoPage(${i})" style="width:30px;height:30px;border-radius:6px;border:1px solid ${i===currentPage?'#2563eb':'#e2e8f0'};background:${i===currentPage?'#2563eb':'#fff'};color:${i===currentPage?'#fff':'#475569'};cursor:pointer;font-size:.75rem;">${i}</button>`;
    }
    html += `<button onclick="gotoPage(${currentPage+1})" ${currentPage===pages?'disabled':''} style="width:30px;height:30px;border-radius:6px;border:1px solid #e2e8f0;background:#fff;cursor:pointer;font-size:.75rem;${currentPage===pages?'opacity:.4;':''}">&rsaquo;</button>`;
    document.getElementById('paginationControls').innerHTML = html;
}

function gotoPage(p) {
    const total = getFilteredNotices().length;
    const maxP  = Math.ceil(total / PER_PAGE);
    if (p<1 || p>maxP) return;
    currentPage = p;
    renderNotices();
}

function switchTab(tab) {
    currentTab = tab; currentPage = 1;
    ['all','active','draft','expired'].forEach(t => {
        const el = document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1));
        el.classList.toggle('active', t === tab);
    });
    renderNotices();
}

function filterNotices() { currentPage=1; renderNotices(); }
function clearFilters() {
    ['searchInput','priorityFilter','categoryFilter','audienceFilter'].forEach(id => {
        const el = document.getElementById(id);
        el.value = el.tagName === 'INPUT' ? '' : 'all';
    });
    filterNotices();
}

function fmtDate(dt) {
    if (!dt) return 'N/A';
    return new Date(dt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'});
}
function fmtDateFull(dt) {
    if (!dt) return 'N/A';
    return new Date(dt).toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'});
}

// ══════════════════════════════════════════
//  AUDIENCE LOGIC — MULTI-SELECT
// ══════════════════════════════════════════
let selectedAudiences = []; // array of selected vals

function toggleAudience(chip) {
    const val = chip.dataset.val;

    // If "Everyone" is clicked
    if (val === 'all-users') {
        const isSelected = chip.classList.contains('selected');
        // Deselect everything first
        document.querySelectorAll('.audience-chip').forEach(c => c.classList.remove('selected','selected-class'));
        selectedAudiences = [];
        document.getElementById('classSectionPanel').classList.remove('visible');
        resetClassSection();

        if (!isSelected) {
            // Select only "Everyone" — disables need for others
            chip.classList.add('selected');
            selectedAudiences = ['all-users'];
        }
        syncAudienceHidden();
        updateAudienceSummary();
        return;
    }

    // If anything else is clicked while "Everyone" is selected — deselect Everyone first
    const everyoneChip = document.querySelector('.chip-all');
    if (everyoneChip.classList.contains('selected')) {
        everyoneChip.classList.remove('selected');
        selectedAudiences = selectedAudiences.filter(v => v !== 'all-users');
    }

    // Toggle this chip
    if (val === 'class') {
        const isSelected = chip.classList.contains('selected-class');
        if (isSelected) {
            chip.classList.remove('selected-class');
            selectedAudiences = selectedAudiences.filter(v => v !== 'class');
            document.getElementById('classSectionPanel').classList.remove('visible');
            resetClassSection();
        } else {
            chip.classList.add('selected-class');
            selectedAudiences.push('class');
            document.getElementById('classSectionPanel').classList.add('visible');
        }
    } else {
        if (chip.classList.contains('selected')) {
            chip.classList.remove('selected');
            selectedAudiences = selectedAudiences.filter(v => v !== val);
        } else {
            chip.classList.add('selected');
            selectedAudiences.push(val);
        }
    }

    syncAudienceHidden();
    updateAudienceSummary();
}

function syncAudienceHidden() {
    document.getElementById('selectedAudience').value = selectedAudiences.join(',');
}

function updateAudienceSummary() {
    const bar  = document.getElementById('audienceSelectedBar');
    const txt  = document.getElementById('audienceSelectedText');
    const labelMap = {
        'all-users':  '🌐 Everyone',
        'teachers':   '👩‍🏫 Teachers',
        'students':   '🎓 Students',
        'parents':    '👪 Parents',
        'staff':      '👔 Staff',
        'management': '💼 Management',
        'class':      '🏫 Class/Section',
    };
    if (!selectedAudiences.length) {
        bar.classList.remove('visible');
        return;
    }
    bar.classList.add('visible');
    txt.textContent = selectedAudiences.map(v => labelMap[v] || v).join('  •  ');
}

function populateSections() {
    const cls = document.getElementById('classSelect').value;
    const chipsDiv = document.getElementById('sectionChips');
    selectedSections = [];
    document.getElementById('classSummary').style.display = 'none';
    document.getElementById('wholeClassCheck').checked = false;

    if (!cls) {
        chipsDiv.innerHTML = '<span style="font-size:.8rem;color:#94a3b8;">← Select a class first</span>';
        return;
    }

    const sections = classSectionsMap[cls] || ['A','B'];
    chipsDiv.innerHTML = sections.map(s =>
        `<span class="section-chip" data-sec="${s}" onclick="toggleSection(this)">${s}</span>`
    ).join('');
    updateClassSummary();
}

function toggleSection(chip) {
    const sec = chip.dataset.sec;
    if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        selectedSections = selectedSections.filter(s => s !== sec);
    } else {
        chip.classList.add('active');
        selectedSections.push(sec);
    }
    updateClassSummary();
}

function toggleWholeClass() {
    const checked = document.getElementById('wholeClassCheck').checked;
    const chipsDiv = document.getElementById('sectionChips');
    const cls = document.getElementById('classSelect').value;
    if (!cls) { document.getElementById('wholeClassCheck').checked = false; return; }

    if (checked) {
        selectedSections = ['ALL'];
        chipsDiv.querySelectorAll('.section-chip').forEach(c => c.classList.add('active'));
    } else {
        selectedSections = [];
        chipsDiv.querySelectorAll('.section-chip').forEach(c => c.classList.remove('active'));
    }
    updateClassSummary();
}

function updateClassSummary() {
    const cls = document.getElementById('classSelect').value;
    const summary = document.getElementById('classSummary');
    const txt = document.getElementById('classSummaryText');
    if (!cls || !selectedSections.length) { summary.style.display='none'; return; }

    const secLabel = selectedSections.includes('ALL') ? 'All Sections' : `Section ${selectedSections.join(', ')}`;
    txt.textContent = `Notice will be sent to Class ${cls} — ${secLabel}`;
    summary.style.display = 'block';
}

function resetClassSection() {
    document.getElementById('classSelect').value = '';
    document.getElementById('sectionChips').innerHTML = '<span style="font-size:.8rem;color:#94a3b8;">← Select a class first</span>';
    document.getElementById('wholeClassCheck').checked = false;
    document.getElementById('classSummary').style.display = 'none';
    selectedSections = [];
}

// ══════════════════════════════════════════
//  MODAL — CREATE / EDIT
// ══════════════════════════════════════════
function setDefaultDates() {
    const now = new Date();
    const pad = v => String(v).padStart(2,'0');
    const fmt = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    document.getElementById('publishDate').value = fmt(now);
    const exp = new Date(now.getTime() + 7*24*60*60*1000);
    document.getElementById('expiryDate').value = fmt(exp);
}

function openCreateModal() {
    document.getElementById('modalTitle').textContent = 'Create New Notice';
    document.getElementById('noticeForm').reset();
    document.getElementById('noticeId').value = '';
    document.getElementById('titleCount').textContent = '0';
    document.getElementById('fileList').innerHTML = '';
    fileAttachments = [];
    setDefaultDates();

    // Reset audience chips
    document.querySelectorAll('.audience-chip').forEach(c=>c.classList.remove('selected','selected-class'));
    // Pre-select "Specific Class/Section" chip visually (it's styled selected-class by default in HTML, clear it)
    selectedAudiences = [];
    document.getElementById('selectedAudience').value = '';
    document.getElementById('audienceSelectedBar').classList.remove('visible');
    document.getElementById('classSectionPanel').classList.remove('visible');
    resetClassSection();

    document.getElementById('noticeModal').classList.remove('hidden');
}

function openEditModal(id) {
    const n = notices.find(x => x.id === id);
    if (!n) return;

    document.getElementById('modalTitle').textContent = 'Edit Notice';
    document.getElementById('noticeId').value = n.id;
    document.getElementById('title').value = n.title;
    document.getElementById('titleCount').textContent = n.title.length;
    document.getElementById('category').value = n.category;
    document.getElementById('priority').value = n.priority;
    document.getElementById('description').value = n.description;
    document.getElementById('status').value = n.status;
    document.getElementById('publishDate').value = n.publishDate;
    document.getElementById('expiryDate').value = n.expiryDate;

    // Audience — multi-select restore
    document.querySelectorAll('.audience-chip').forEach(c => c.classList.remove('selected','selected-class'));
    selectedAudiences = [];
    // n.audience can be comma-separated e.g. "teachers,parents" or single "students"
    const audVals = (n.audience || '').split(',').map(v=>v.trim()).filter(Boolean);
    selectedAudiences = audVals;
    audVals.forEach(val => {
        const chip = document.querySelector(`.audience-chip[data-val="${val}"]`);
        if (chip) chip.classList.add(val === 'class' ? 'selected-class' : 'selected');
    });
    document.getElementById('selectedAudience').value = n.audience;
    updateAudienceSummary();

    if (audVals.includes('class')) {
        document.getElementById('classSectionPanel').classList.add('visible');
        document.getElementById('classSelect').value = n.targetClass || '';
        populateSections();
        selectedSections = n.targetSections || [];
        if (selectedSections.includes('ALL')) {
            document.getElementById('wholeClassCheck').checked = true;
            document.querySelectorAll('.section-chip').forEach(c=>c.classList.add('active'));
        } else {
            document.querySelectorAll('.section-chip').forEach(c => {
                if (selectedSections.includes(c.dataset.sec)) c.classList.add('active');
            });
        }
        updateClassSummary();
    } else {
        document.getElementById('classSectionPanel').classList.remove('visible');
        resetClassSection();
    }

    fileAttachments = n.attachments ? [...n.attachments] : [];
    renderFileList();
    document.getElementById('noticeModal').classList.remove('hidden');
}

function closeModal() { document.getElementById('noticeModal').classList.add('hidden'); }

function saveNotice(e) {
    e.preventDefault();
    const id       = document.getElementById('noticeId').value;
    const audience = document.getElementById('selectedAudience').value; // comma-separated

    if (!audience) { showToast('Please select at least one audience.', true); return; }
    if (selectedAudiences.includes('class')) {
        if (!document.getElementById('classSelect').value) { showToast('Please select a class.', true); return; }
        if (!selectedSections.length) { showToast('Please select at least one section or check "whole class".', true); return; }
    }

    const data = {
        id: id || Date.now().toString(),
        title:       document.getElementById('title').value,
        category:    document.getElementById('category').value,
        priority:    document.getElementById('priority').value,
        description: document.getElementById('description').value,
        status:      document.getElementById('status').value,
        publishDate: document.getElementById('publishDate').value,
        expiryDate:  document.getElementById('expiryDate').value,
        audience,
        targetClass:    audience === 'class' ? document.getElementById('classSelect').value : '',
        targetSections: audience === 'class' ? [...selectedSections] : [],
        attachments: fileAttachments,
        createdAt:   new Date().toISOString().split('T')[0],
    };

    if (id) {
        const i = notices.findIndex(n => n.id === id);
        if (i !== -1) notices[i] = data;
        showToast('Notice updated successfully!');
    } else {
        notices.unshift(data);
        showToast('Notice created & sent!');
    }

    closeModal();
    renderNotices();
    updateStats();
}

// ══════════════════════════════════════════
//  VIEW MODAL
// ══════════════════════════════════════════
function openViewModal(id) {
    const n = notices.find(x => x.id === id);
    if (!n) return;
    currentViewId = id;
    document.getElementById('viewTitle').textContent = n.title;

    const audLabel = buildAudienceLabel(n);
    const sc = n.status==='active'?'badge-active':n.status==='expired'?'badge-expired':'badge-draft';
    const pc = 'badge-'+n.priority;

    let attHtml = '';
    if (n.attachments && n.attachments.length) {
        attHtml = `<div style="margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9;">
            <p style="font-size:.75rem;font-weight:700;color:#64748b;margin-bottom:6px;">ATTACHMENTS</p>
            ${n.attachments.map(a => `<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#f8fafc;border-radius:8px;margin-bottom:4px;font-size:.8rem;">
                <i class="fas fa-paperclip" style="color:#7c3aed;"></i> ${a.name} <span style="color:#94a3b8;">(${a.size})</span>
            </div>`).join('')}
        </div>`;
    }

    document.getElementById('viewContent').innerHTML = `
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
            <span class="badge badge-category">${n.category}</span>
            <span class="badge ${pc}">${n.priority} priority</span>
            <span class="badge ${sc}">${n.status}</span>
            <span class="badge badge-audience">${audLabel}</span>
        </div>
        <div style="font-size:.8rem;color:#64748b;display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;">
            <span><i class="far fa-calendar" style="margin-right:4px;"></i> Published: ${fmtDateFull(n.publishDate)}</span>
            <span><i class="fas fa-clock" style="margin-right:4px;"></i> Expires: ${fmtDateFull(n.expiryDate)}</span>
        </div>
        <div style="padding:14px;background:#f8fafc;border-radius:10px;font-size:.9rem;line-height:1.7;color:#334155;white-space:pre-wrap;">${n.description}</div>
        ${attHtml}
    `;

    document.getElementById('viewDownloadBtn').onclick = () => downloadNotice(id);
    document.getElementById('viewModal').classList.remove('hidden');
}
function closeViewModal() { document.getElementById('viewModal').classList.add('hidden'); }

// ══════════════════════════════════════════
//  DELETE
// ══════════════════════════════════════════
function openDeleteModal(id) {
    currentDeleteId = id;
    document.getElementById('deleteModal').classList.remove('hidden');
}
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden');
    currentDeleteId = null;
}
function confirmDelete() {
    notices = notices.filter(n => n.id !== currentDeleteId);
    renderNotices(); updateStats();
    showToast('Notice deleted.');
    closeDeleteModal();
}

// ══════════════════════════════════════════
//  DOWNLOAD (Print-to-PDF via window.print)
// ══════════════════════════════════════════
function downloadNotice(id) {
    const n = notices.find(x => x.id === id);
    if (!n) return;

    const audLabel = buildAudienceLabel(n);
    const today = new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'});

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Notice – ${n.title}</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;600;700&display=swap');
            * { margin:0; padding:0; box-sizing:border-box; }
            body { font-family: 'DM Sans', sans-serif; background:#fff; color:#1e293b; font-size:13px; }
            .page { max-width:720px; margin:0 auto; padding:40px 48px; min-height:100vh; }

            /* HEADER */
            .letterhead { border-bottom:3px double #1e3a8a; padding-bottom:18px; margin-bottom:18px; display:flex; align-items:center; gap:18px; }
            .logo-box { width:60px; height:60px; background:linear-gradient(135deg,#1d4ed8,#7c3aed); border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
            .logo-box svg { width:30px; height:30px; fill:#fff; }
            .school-name { font-family:'EB Garamond',serif; font-size:22px; font-weight:700; color:#1e3a8a; line-height:1.1; }
            .school-sub  { font-size:11px; color:#64748b; margin-top:2px; }
            .school-contact { margin-left:auto; font-size:10px; color:#64748b; text-align:right; line-height:1.6; }

            /* NOTICE HEADING */
            .notice-header { text-align:center; margin:20px 0; }
            .notice-stamp  { display:inline-block; background:#1e3a8a; color:#fff; font-size:13px; font-weight:700; letter-spacing:.15em; padding:6px 24px; border-radius:4px; margin-bottom:12px; }
            .notice-title  { font-family:'EB Garamond',serif; font-size:22px; font-weight:700; color:#1e293b; line-height:1.3; }

            /* META ROW */
            .meta-row { display:flex; justify-content:space-between; align-items:flex-start; margin:18px 0; padding:12px 16px; background:#f1f5f9; border-radius:8px; flex-wrap:wrap; gap:8px; }
            .meta-item { font-size:11px; }
            .meta-label { color:#64748b; text-transform:uppercase; letter-spacing:.05em; display:block; margin-bottom:2px; font-size:10px; }
            .meta-val   { font-weight:700; color:#1e293b; }

            /* BADGE */
            .badge { display:inline-block; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:700; }
            .badge-high     { background:#fee2e2; color:#991b1b; }
            .badge-medium   { background:#dbeafe; color:#1e40af; }
            .badge-low      { background:#f1f5f9; color:#475569; }
            .badge-category { background:#ede9fe; color:#5b21b6; }
            .badge-audience { background:#e0f2fe; color:#0369a1; }

            /* BODY */
            .divider { border:none; border-top:1px solid #e2e8f0; margin:16px 0; }
            .body-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#64748b; margin-bottom:8px; }
            .body-text  { font-size:13.5px; line-height:1.85; color:#1e293b; white-space:pre-wrap; text-align:justify; }

            /* FOOTER */
            .footer-sig { margin-top:40px; display:flex; justify-content:space-between; align-items:flex-end; }
            .sig-line   { width:160px; border-top:2px solid #1e293b; padding-top:6px; text-align:center; font-size:11px; color:#475569; }
            .watermark  { text-align:center; margin-top:30px; padding-top:16px; border-top:1px solid #e2e8f0; font-size:10px; color:#94a3b8; }

            @media print {
                body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
                .page { padding:20px 30px; }
            }
        </style>
        </head>
        <body>
        <div class="page">

            <!-- LETTERHEAD -->
            <div class="letterhead">
                <div class="logo-box">
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L4 12v4h2v16h4V18h20v14h4V16h2v-4L20 4zm0 3.5l12 6.5v.5H8v-.5l12-6.5z"/>
                    </svg>
                </div>
                <div>
                    <div class="school-name">EduPortal School</div>
                    <div class="school-sub">Affiliated to State Board of Education · Est. 2005</div>
                </div>
                <div class="school-contact">
                    123, Education Lane, City – 411001<br>
                    📞 +91 98765 43210 &nbsp;|&nbsp; ✉ info@eduportal.edu<br>
                    🌐 www.eduportal.edu
                </div>
            </div>

            <!-- NOTICE STAMP + TITLE -->
            <div class="notice-header">
                <div class="notice-stamp">OFFICIAL NOTICE</div>
                <div class="notice-title">${n.title}</div>
            </div>

            <!-- META -->
            <div class="meta-row">
                <div class="meta-item">
                    <span class="meta-label">Notice No.</span>
                    <span class="meta-val">NOT/${n.id}/${new Date().getFullYear()}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Date Issued</span>
                    <span class="meta-val">${fmtDateFull(n.publishDate)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Valid Until</span>
                    <span class="meta-val">${fmtDateFull(n.expiryDate)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Category</span>
                    <span class="badge badge-category">${n.category}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Priority</span>
                    <span class="badge badge-${n.priority}">${n.priority.toUpperCase()}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Addressed To</span>
                    <span class="badge badge-audience">${audLabel}</span>
                </div>
            </div>

            <hr class="divider">

            <!-- BODY -->
            <div class="body-label">Notice Content</div>
            <div class="body-text">${n.description}</div>

            ${n.attachments && n.attachments.length ? `
            <hr class="divider">
            <div class="body-label">Attachments</div>
            <ul style="padding-left:18px;font-size:12px;line-height:2;">
                ${n.attachments.map(a=>`<li>${a.name} (${a.size})</li>`).join('')}
            </ul>` : ''}

            <!-- SIGNATURE -->
            <div class="footer-sig">
                <div>
                    <p style="font-size:11px;color:#64748b;">Issued on: <b>${today}</b></p>
                    <p style="font-size:10px;color:#94a3b8;margin-top:3px;">Notice generated via EduPortal Notice Management System</p>
                </div>
                <div class="sig-line">Principal / Authorised Signatory</div>
            </div>

            <div class="watermark">
                This is an official notice issued by EduPortal School. For queries, contact the school office.<br>
                © ${new Date().getFullYear()} EduPortal School. All rights reserved.
            </div>
        </div>
        </body>
        </html>
    `;

    const win = window.open('', '_blank', 'width=800,height=900');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
    showToast('Notice opened for download / print!');
}

// ══════════════════════════════════════════
//  FILE HANDLING
// ══════════════════════════════════════════
function handleFiles() {
    const input = document.getElementById('fileInput');
    const newFiles = Array.from(input.files).map(f => ({
        name: f.name,
        size: f.size > 1024*1024 ? (f.size/1024/1024).toFixed(1)+' MB' : (f.size/1024).toFixed(0)+' KB'
    }));
    fileAttachments = [...fileAttachments, ...newFiles];
    renderFileList();
}
function renderFileList() {
    const div = document.getElementById('fileList');
    if (!fileAttachments.length) { div.innerHTML=''; return; }
    div.innerHTML = fileAttachments.map((f,i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:#f8fafc;border-radius:7px;margin-top:4px;font-size:.8rem;">
            <span><i class="fas fa-file" style="color:#7c3aed;margin-right:6px;"></i>${f.name} <span style="color:#94a3b8;">(${f.size})</span></span>
            <button type="button" onclick="removeFile(${i})" style="border:none;background:transparent;cursor:pointer;color:#ef4444;"><i class="fas fa-times"></i></button>
        </div>
    `).join('');
}
function removeFile(i) { fileAttachments.splice(i,1); renderFileList(); }

// ══════════════════════════════════════════
//  EDITOR
// ══════════════════════════════════════════
function fmt(type) {
    const ta = document.getElementById('description');
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = ta.value.substring(s,e);
    const map = { bold:`**${sel}**`, italic:`_${sel}_`, underline:`<u>${sel}</u>`, bullet:`\n• ${sel}` };
    if (!map[type]) return;
    ta.value = ta.value.substring(0,s) + map[type] + ta.value.substring(e);
    ta.focus();
}

// ══════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════
function showToast(msg, err=false) {
    const t = document.createElement('div');
    t.className = 'toast' + (err?' error':'');
    t.innerHTML = `<i class="fas fa-${err?'exclamation-circle':'check-circle'}" style="color:${err?'#ef4444':'#10b981'};"></i> ${msg}`;
    document.getElementById('toastContainer').appendChild(t);
    setTimeout(()=>t.remove(), 3000);
}
function outsideClick(e, id) {
    if (e.target.id === id) document.getElementById(id).classList.add('hidden');
}

// Close publish modal on outside click
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('publishModal').addEventListener('click', function(e) {
        if (e.target === this) closePublishModal();
    });
});

// ══════════════════════════════════════════
//  PUBLISH MODAL
// ══════════════════════════════════════════
let currentPublishId = null;

function openPublishModal(id) {
    const n = notices.find(x => x.id === id);
    if (!n) return;
    if (n.status === 'active') {
        showToast('This notice is already published and active!', true);
        return;
    }
    currentPublishId = id;
    document.getElementById('publishNoticeTitle').textContent = '"' + n.title + '"';
    document.getElementById('publishAudienceLabel').textContent = buildAudienceLabel(n);
    document.getElementById('publishModal').classList.remove('hidden');
}

function closePublishModal() {
    document.getElementById('publishModal').classList.add('hidden');
    currentPublishId = null;
}

function confirmPublish() {
    if (!currentPublishId) return;
    const idx = notices.findIndex(n => n.id === currentPublishId);
    if (idx !== -1) {
        notices[idx].status = 'active';
        notices[idx].publishDate = new Date().toISOString().slice(0,16);
    }
    closePublishModal();
    renderNotices();
    updateStats();
    showToast('✅ Notice published successfully! Audience notified.');
}

// ══════════════════════════════════════════
//  SIDEBAR — original style toggle
// ══════════════════════════════════════════
let sidebarCollapsed = false;

function toggleSidebar() {
    const sidebar     = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const icon        = document.getElementById('sidebarToggleIcon');

    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('mobile-open');
        document.getElementById('sidebarOverlay').classList.toggle('active');
        return;
    }

    sidebarCollapsed = !sidebarCollapsed;
    if (sidebarCollapsed) {
        sidebar.style.width = '72px';
        mainContent.style.marginLeft = '72px';
        // hide all text spans and section headers
        sidebar.querySelectorAll('.nav-text-orig, .pt-4').forEach(el => el.style.opacity = '0');
        icon.className = 'fas fa-bars text-xl';
    } else {
        sidebar.style.width = '260px';
        mainContent.style.marginLeft = '260px';
        sidebar.querySelectorAll('.nav-text-orig, .pt-4').forEach(el => el.style.opacity = '1');
        icon.className = 'fas fa-bars text-xl';
    }
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

function toggleNotifications() {
    document.getElementById('notificationsDropdown').classList.toggle('hidden');
    document.getElementById('userMenuDropdown').classList.add('hidden');
}

function toggleUserMenu() {
    document.getElementById('userMenuDropdown').classList.toggle('hidden');
    document.getElementById('notificationsDropdown').classList.add('hidden');
}

// Close dropdowns on outside click
document.addEventListener('click', function(e) {
    if (!e.target.closest('#notificationsBtn'))
        document.getElementById('notificationsDropdown').classList.add('hidden');
    if (!e.target.closest('#userMenuBtn'))
        document.getElementById('userMenuDropdown').classList.add('hidden');
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        document.getElementById('sidebarOverlay').classList.remove('active');
        document.getElementById('sidebar').classList.remove('mobile-open');
    }
});

