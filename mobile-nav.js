/**
 * mobile-nav.js — LittleLume homepage mobile menu
 * ================================================================
 * The homepage's .nav-links (Fitur/Grade/Harga/FAQ) are simply
 * display:none on mobile with no way to access them. This adds a
 * hamburger button + slide-down panel with the same links, built via
 * JS DOM insertion (not editing existing nav markup) to avoid touching
 * the nav's existing flex layout.
 */
(function () {
  function init() {
    var nav = document.querySelector('nav');
    var navLinksList = document.querySelector('.nav-links');
    if (!nav || !navLinksList) return;

    // --- Hamburger button ---
    var toggle = document.createElement('button');
    toggle.id = 'llHomeMenuToggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.innerHTML = '☰';
    toggle.style.cssText =
      'display:none;align-items:center;justify-content:center;' +
      'width:38px;height:38px;border-radius:9px;border:none;' +
      'background:rgba(255,255,255,0.12);color:#fff;cursor:pointer;' +
      'font-size:1.2rem;flex-shrink:0;margin-right:10px;';

    // Insert as the FIRST child inside the auth area itself (not as a
    // separate sibling in the outer nav flex row) so it sits immediately
    // to the left of "Get Started" instead of being spaced out on its
    // own by nav's justify-content:space-between.
    var authArea = document.getElementById('navAuth');
    if (authArea) {
      authArea.insertBefore(toggle, authArea.firstChild);
      authArea.style.display = 'flex';
      authArea.style.alignItems = 'center';
      authArea.style.gap = '10px';
    } else {
      nav.appendChild(toggle);
    }

    // Show the hamburger only under the same breakpoint the nav-links
    // already disappear at.
    var mq = window.matchMedia('(max-width: 768px)');
    function applyVisibility(matches) {
      toggle.style.display = matches ? 'flex' : 'none';
    }
    applyVisibility(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', function (e) { applyVisibility(e.matches); })
                         : mq.addListener(function (e) { applyVisibility(e.matches); });

    // --- Slide-down panel (clones the existing links, so any future
    // edits to .nav-links content stay in sync automatically) ---
    var panel = document.createElement('div');
    panel.id = 'llHomeMobilePanel';
    panel.style.cssText =
      'display:none;position:fixed;left:0;right:0;top:0;z-index:99;' +
      'background:rgba(26,23,64,0.98);backdrop-filter:blur(16px);' +
      'padding:84px 24px 24px;box-shadow:0 12px 24px rgba(0,0,0,0.25);';

    var linksClone = navLinksList.cloneNode(true);
    linksClone.style.cssText =
      'list-style:none;display:flex;flex-direction:column;gap:4px;margin:0;padding:0;';
    linksClone.querySelectorAll('a').forEach(function (a) {
      a.style.cssText =
        'display:block;padding:14px 12px;color:rgba(255,255,255,0.85);' +
        'text-decoration:none;font-weight:600;font-size:1rem;' +
        'border-bottom:1px solid rgba(255,255,255,0.08);';
      a.addEventListener('click', closePanel);
    });
    panel.appendChild(linksClone);
    document.body.appendChild(panel);

    var overlay = document.createElement('div');
    overlay.style.cssText =
      'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:98;';
    document.body.appendChild(overlay);

    function openPanel() {
      panel.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    function closePanel() {
      panel.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', openPanel);
    overlay.addEventListener('click', closePanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
