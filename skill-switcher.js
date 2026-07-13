/**
 * skill-switcher.js — LittleLume big, consistent skill navigation
 * ================================================================
 * Adds a row of properly-sized (44px+ touch target), clickable
 * Listening / Reading / Speaking / Writing buttons right below the
 * topbar on every chapter skill page.
 *
 * Built via JS DOM insertion (not HTML/CSS find-replace) on purpose —
 * the existing markup for the decorative skill-progress bar varies
 * quite a bit page to page (different class names, different
 * structure), so this anchors only to the one thing confirmed
 * consistent across every chapter page: the .topbar element.
 *
 * This does NOT remove or modify the existing decorative progress bar
 * further down the page — it adds a new, reliable navigation control
 * alongside it.
 */
(function () {
  // Safety net: several chapter pages have a decorative "skill progress"
  // label elsewhere on the page that's absolutely positioned and can
  // extend past the viewport edge on narrow screens (pre-existing issue,
  // present in most files, with wildly inconsistent markup/class names
  // that makes a targeted per-file fix impractical). Clipping horizontal
  // overflow at the body level fixes the visible symptom (page scrolling
  // sideways) without needing to hunt down every differently-named
  // offending element individually. This does not affect this script's
  // own switcher, since its internal overflow-x:auto scrolling still
  // works independently of an ancestor's overflow-x:hidden.
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';

  function init() {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;

    var m = window.location.pathname.match(/\/(listening|reading|speaking|writing)\.html$/);
    var current = m ? m[1] : '';

    var skills = [
      { key: 'listening', icon: '🎧', label: 'Listening' },
      { key: 'reading',   icon: '📖', label: 'Reading' },
      { key: 'speaking',  icon: '🗣️', label: 'Speaking' },
      { key: 'writing',   icon: '✍️', label: 'Writing' }
    ];

    var switcher = document.createElement('div');
    switcher.className = 'll-skill-switcher';
    switcher.style.cssText =
      'display:flex;gap:8px;padding:12px 16px;background:#fff;' +
      'border-bottom:1px solid rgba(0,0,0,0.06);overflow-x:auto;' +
      'min-width:0;box-sizing:border-box;' +
      '-webkit-overflow-scrolling:touch;';

    function syncWidth() {
      // Match the topbar's own rendered width — it already correctly
      // accounts for the fixed sidebar's offset, unlike window.innerWidth.
      var w = topbar.getBoundingClientRect().width;
      if (w > 0) {
        switcher.style.width = w + 'px';
        switcher.style.maxWidth = w + 'px';
      }
    }
    syncWidth();
    window.addEventListener('resize', syncWidth);

    skills.forEach(function (s) {
      var a = document.createElement('a');
      a.href = s.key + '.html';
      var isActive = s.key === current;
      a.style.cssText =
        'display:flex;align-items:center;gap:7px;padding:11px 18px;' +
        'border-radius:12px;text-decoration:none;font-weight:700;' +
        'font-size:0.9rem;white-space:nowrap;flex-shrink:0;' +
        'min-height:44px;box-sizing:border-box;transition:background 0.15s,color 0.15s;' +
        (isActive
          ? 'background:#6C63FF;color:#fff;'
          : 'background:#F8FAFC;color:#64748B;');
      a.onmouseenter = function () {
        if (!isActive) a.style.background = '#EEF2FF';
      };
      a.onmouseleave = function () {
        if (!isActive) a.style.background = '#F8FAFC';
      };
      a.innerHTML =
        '<span style="font-size:1.05rem;line-height:1;">' + s.icon + '</span>' +
        '<span>' + s.label + '</span>';
      switcher.appendChild(a);
    });

    topbar.insertAdjacentElement('afterend', switcher);

    // Hide the old decorative "skill progress" bar (thin bar + tiny
    // floating label) now that the switcher above replaces its purpose
    // with something clickable and properly sized. Try several selector
    // variants since the markup for this differs across pages
    // (.skill-progress container, or bare .sp-item/.skill-prog-item rows
    // with no shared container at all).
    // Hide the old decorative "skill progress" bar(s). Some pages have
    // ONE shared container wrapping all 4 items; others (discovered
    // later) have FOUR separate .skill-progress elements, one per skill,
    // each paired with a sibling .progress-label text element outside
    // of it — so this hides every matching container, every bare
    // .sp-item/.skill-prog-item item, AND any .progress-label siblings,
    // rather than assuming a single shared container.
    document.querySelectorAll('.skill-progress').forEach(function (bar) {
      bar.style.display = 'none';
    });
    document.querySelectorAll('.sp-item, .skill-prog-item').forEach(function (item) {
      var wrapper = item.parentElement;
      if (wrapper && wrapper.children.length <= 4 && wrapper.className !== 'skill-progress') {
        wrapper.style.display = 'none';
      } else {
        item.style.display = 'none';
      }
    });
    document.querySelectorAll('.progress-label').forEach(function (label) {
      // Only hide it if it's sitting alongside a skill-progress/sp-item
      // sibling (i.e. it's this decorative component, not some unrelated
      // "progress label" used elsewhere on the page).
      var container = label.parentElement;
      if (container && container.querySelector('.skill-progress, .sp-item')) {
        label.style.display = 'none';
      }
    });

    // Disable sidebar links to chapters that don't actually exist yet.
    // (Grade 2's sidebar template currently lists all 8 chapter slots
    // even though only the first 4 are built — clicking 5-8 there is
    // a dead link right now.) Convert those specific items into a
    // clearly-labelled "coming soon" state instead of a broken link.
    var gradeMatch = window.location.pathname.match(/\/grade(\d+)\//);
    if (gradeMatch) {
      var gradeNum = parseInt(gradeMatch[1], 10);
      var builtCount = BUILT_CHAPTERS[gradeNum];
      if (builtCount) {
        document.querySelectorAll('.chapter-item, .ch-item').forEach(function (link) {
          var m2 = (link.getAttribute('href') || '').match(/\/chapter(\d+)\//);
          if (!m2) return;
          var chNum = parseInt(m2[1], 10);
          if (chNum > builtCount) {
            link.removeAttribute('href');
            link.style.opacity = '0.4';
            link.style.cursor = 'default';
            link.style.pointerEvents = 'none';
            if (!link.querySelector('.ll-soon-badge')) {
              var badge = document.createElement('span');
              badge.className = 'll-soon-badge';
              badge.textContent = ' (segera)';
              badge.style.cssText = 'font-size:0.7em;opacity:0.8;';
              link.appendChild(badge);
            }
          }
        });
      }
    }

    // Add a "next chapter" CTA at the end of the writing page (the last
    // skill in each chapter) — computed from the URL so it's always a
    // real link, regardless of what each file's own hardcoded markup does.
    if (current === 'writing') {
      addNextChapterCTA();
    }
  }

  // How many chapters actually EXIST (built + published) per grade right
  // now — update this as more chapters go live. Deliberately reflects
  // reality, not a future target, so this never links to a chapter page
  // that doesn't exist yet.
  var BUILT_CHAPTERS = { 1: 8, 2: 4 };

  function addNextChapterCTA() {
    var m = window.location.pathname.match(/\/grade(\d+)\/chapter(\d+)\/writing\.html$/);
    if (!m) return;
    var grade = parseInt(m[1], 10);
    var chapter = parseInt(m[2], 10);
    var totalBuilt = BUILT_CHAPTERS[grade] || chapter;

    var correctHref = (chapter < totalBuilt)
      ? '/grade' + grade + '/chapter' + (chapter + 1) + '/listening.html'
      : '/dashboard.html';

    // If this page already has its own hand-built "chapter complete" card,
    // don't duplicate it — just make sure ITS link actually points
    // somewhere real. Several existing cards were found linking to "#",
    // to the wrong destination (dashboard before the grade was actually
    // finished), or to a next chapter that doesn't exist yet.
    var existingCard = document.querySelector('.complete-card');
    if (existingCard) {
      var existingLink = existingCard.querySelector('a');
      if (existingLink) existingLink.setAttribute('href', correctHref);
      return;
    }

    var content = document.querySelector('.content');
    if (!content) return;

    var box = document.createElement('div');
    box.style.cssText =
      'background:linear-gradient(135deg,rgba(0,201,167,0.1),rgba(108,99,255,0.06));' +
      'border:1px solid rgba(0,201,167,0.2);border-radius:20px;padding:24px 28px;' +
      'display:flex;align-items:center;justify-content:space-between;gap:16px;' +
      'flex-wrap:wrap;margin:0 0 32px;';

    if (chapter < totalBuilt) {
      box.innerHTML =
        '<div>' +
          '<div style="font-size:0.72rem;font-weight:700;color:#00C9A7;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;">Chapter Berikutnya</div>' +
          '<div style="font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:800;font-size:1rem;color:#1A1740;">🚀 Lanjut ke Chapter ' + (chapter + 1) + '</div>' +
        '</div>' +
        '<a href="' + correctHref + '" ' +
        'style="background:linear-gradient(135deg,#6C63FF,#00C9A7);color:#fff;padding:13px 28px;' +
        'border-radius:50px;font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:800;' +
        'font-size:0.92rem;text-decoration:none;display:inline-flex;align-items:center;gap:8px;' +
        'box-shadow:0 4px 16px rgba(0,0,0,0.15);">Chapter ' + (chapter + 1) + ' →</a>';
    } else {
      box.innerHTML =
        '<div>' +
          '<div style="font-size:0.72rem;font-weight:700;color:#00C9A7;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;">Selamat!</div>' +
          '<div style="font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:800;font-size:1rem;color:#1A1740;">🎉 Kamu sudah sampai chapter terbaru di Grade ' + grade + '!</div>' +
        '</div>' +
        '<a href="' + correctHref + '" ' +
        'style="background:linear-gradient(135deg,#6C63FF,#00C9A7);color:#fff;padding:13px 28px;' +
        'border-radius:50px;font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:800;' +
        'font-size:0.92rem;text-decoration:none;display:inline-flex;align-items:center;gap:8px;' +
        'box-shadow:0 4px 16px rgba(0,0,0,0.15);">Kembali ke Dasbor →</a>';
    }

    content.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
