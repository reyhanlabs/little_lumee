/**
 * dev-unlock.js — LittleLume Dev Mode
 * =====================================
 * File ini HANYA untuk testing UI/UX sebelum sistem pembayaran aktif.
 * Fungsi: membuka semua chapter di sidebar tanpa perlu subscription.
 *
 * CARA PAKAI:
 * Tambahkan tag berikut sebelum </body> di setiap file chapter:
 *   <script src="/dev-unlock.js"></script>
 *
 * CARA RESTORE (saat MVP siap):
 * Hapus tag <script src="/dev-unlock.js"></script> dari semua file,
 * atau rename file ini menjadi dev-unlock.js.bak
 * =====================================
 */

(function() {
  // Map chapter number ke path listening.html-nya
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
    // Ambil semua chapter item yang locked
    const lockedItems = document.querySelectorAll('.ch-item.locked');

    lockedItems.forEach(item => {
      // Hapus class locked
      item.classList.remove('locked');

      // Ambil nomor chapter dari teks badge
      const badge = item.querySelector('.ch-num');
      if (!badge) return;
      const chNum = parseInt(badge.textContent.trim());
      if (!chNum || !chapterPaths[chNum]) return;

      // Set href ke path yang benar
      item.setAttribute('href', chapterPaths[chNum]);
      item.style.pointerEvents = 'auto';
      item.style.opacity = '1';

      // Ganti icon angka menjadi tampilan done
      // (opsional — biarkan angka agar user tahu posisinya)
    });

    // Unlock juga skill tabs jika ada yang locked
    document.querySelectorAll('.skill-tab.locked').forEach(tab => {
      tab.classList.remove('locked');
      tab.style.pointerEvents = 'auto';
      tab.style.opacity = '1';
    });

    console.log('[DEV MODE] Sidebar unlocked — semua chapter dapat diakses.');
  }

  // Jalankan setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unlockSidebar);
  } else {
    unlockSidebar();
  }
})();
