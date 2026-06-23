/**
 * dev-unlock.js — LittleLume Dev Mode
 * =====================================
 * HANYA untuk testing UI/UX sebelum sistem pembayaran aktif.
 * CARA RESTORE: rename/hapus file ini dari repo → semua kunci kembali aktif.
 * =====================================
 */

(function() {
  // Path tiap chapter (Grade 1)
  const chapterPaths = {
    1: '/grade1/chapter1/listening.html',
    2: '/grade1/chapter2/listening.html',
    3: '/grade1/chapter3/listening.html',
    4: '/grade1/chapter4/listening.html',
    5: '/grade1/chapter5/listening.html',
    6: '/grade1/chapter6/listening.html',
    7: '/grade1/chapter7/listening.html',
    8: '/grade1/chapter8/listening.html',
  };

  function unlockSidebar() {
    // Unlock SEMUA ch-item (done, active, locked) — pastikan href benar
    document.querySelectorAll('.ch-item').forEach(item => {
      const badge = item.querySelector('.ch-num');
      if (!badge) return;

      const chNum = parseInt(badge.textContent.trim());
      if (!chNum || !chapterPaths[chNum]) return;

      // Hapus locked, set href benar, aktifkan pointer
      item.classList.remove('locked');
      item.style.opacity   = '1';
      item.style.pointerEvents = 'auto';

      // Hanya ganti href jika masih # atau kosong
      const currentHref = item.getAttribute('href');
      if (!currentHref || currentHref === '#') {
        item.setAttribute('href', chapterPaths[chNum]);
      }
    });

    // Unlock skill tabs jika ada yang terkunci
    document.querySelectorAll('.skill-tab').forEach(tab => {
      tab.classList.remove('locked');
      tab.style.pointerEvents = 'auto';
      tab.style.opacity = '1';
    });

    console.log('[LittleLume DEV MODE] Sidebar unlocked ✅');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unlockSidebar);
  } else {
    unlockSidebar();
  }
})();
