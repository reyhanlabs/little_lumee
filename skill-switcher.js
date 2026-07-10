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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
