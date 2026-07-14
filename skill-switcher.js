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
      updateGradeCompleteStats();
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
    var correctText = (chapter < totalBuilt)
      ? 'Chapter ' + (chapter + 1) + ' →'
      : 'Kembali ke Dasbor →';

    // Fix the topbar's own next-button too, if this writing page has one
    // — or CREATE one if it's missing entirely (Chapters 1-4 had no
    // topbar next-button at all, while 5-8 did, which felt inconsistent
    // even after the existing ones were corrected).
    //
    // Styling is applied INLINE rather than via the .btn-next CSS class,
    // because that class turned out to not even be defined in some
    // files' stylesheets (rendering as an unstyled blue underlined link).
    // The button is also wrapped in its own small flex container rather
    // than inserted as a bare sibling, because some topbars lay out
    // their two children with justify-content:space-between — adding a
    // third bare sibling there gets pushed apart oddly instead of sitting
    // next to the existing prev button.
    var NEXT_BTN_STYLE =
      'background:linear-gradient(135deg,#6C63FF,#FF6B9D);color:#fff;' +
      'padding:9px 20px;border-radius:50px;font-family:\'Plus Jakarta Sans\',sans-serif;' +
      'font-weight:700;font-size:0.82rem;text-decoration:none;display:inline-flex;' +
      'align-items:center;gap:6px;box-shadow:0 4px 14px rgba(108,99,255,0.3);white-space:nowrap;';

    var topbarNext = document.querySelector('.topbar .btn-next');
    if (topbarNext) {
      topbarNext.setAttribute('href', correctHref);
      topbarNext.textContent = correctText;
      topbarNext.style.cssText = NEXT_BTN_STYLE;
    } else {
      var prevBtn = document.querySelector('.topbar .btn-prev');
      if (prevBtn && prevBtn.parentElement) {
        var newNext = document.createElement('a');
        newNext.className = 'btn-next';
        newNext.setAttribute('href', correctHref);
        newNext.textContent = correctText;
        newNext.style.cssText = NEXT_BTN_STYLE;

        if (prevBtn.parentElement === document.querySelector('.topbar')) {
          // .btn-prev sits directly inside .topbar (which likely uses
          // justify-content:space-between) — wrap both buttons together
          // so they stay grouped on the right instead of getting spaced
          // apart as if they were independent top-level items.
          var group = document.createElement('div');
          group.style.cssText = 'display:flex;align-items:center;gap:8px;flex-shrink:0;';
          prevBtn.insertAdjacentElement('beforebegin', group);
          group.appendChild(prevBtn);
          group.appendChild(newNext);
        } else {
          prevBtn.insertAdjacentElement('afterend', newNext);
        }
      }
    }

    // Several different hand-built "next chapter" elements were found
    // across different files, using inconsistent class names —
    // .complete-card, .chapter-complete, .chapter-cta, and even a bare
    // .btn-next sitting in a "footer navigation" block outside the
    // topbar entirely. Rather than keep chasing each newly-discovered
    // class name individually, this looks for ANY link inside .content
    // whose href already looks like it's trying to point to a next
    // chapter or back to the dashboard (regardless of what it's
    // currently set to — "#", "/", the wrong chapter, etc.) and just
    // corrects all of them. Only if NONE exist at all does it fall back
    // to injecting a brand new box.
    var content = document.querySelector('.content');

    // If the page already has ANY kind of hand-built "you finished this"
    // celebration element — regardless of its exact class name — never
    // inject a new box on top of it. This page can have MULTIPLE such
    // elements already (a chapter-complete card, a grade-complete
    // section inside it, a "thank you" block, etc.) and adding yet
    // another one on top just piles up more redundant "go to
    // dashboard/next chapter" boxes rather than fixing anything.
    var hasExistingCelebration = !!(
      document.querySelector('.chapter-complete') ||
      document.querySelector('.complete-card') ||
      document.querySelector('.grade-complete')
    );

    var candidateLinks = [];
    if (content) {
      var allLinks = Array.from(content.querySelectorAll('a[href]'));

      // Learned the hard way, twice: this page can contain several
      // DIFFERENT, individually legitimate buttons — "next chapter",
      // "back to dashboard now" (skip ahead), and even "start next
      // grade" (cross-grade link). Trying to guess which ones are
      // "actually meant to be next-chapter" by their label text kept
      // finding new edge cases to break. So this is now deliberately
      // conservative: ONLY treat a link as broken (and safe to rewrite)
      // if its href is unambiguously non-functional — literally "#" or
      // a bare "/" — since neither of those could ever be a legitimate,
      // intentional destination. Anything else (a real dashboard link,
      // a link to a different grade, a correct chapter link) is left
      // completely untouched, even if it looks unusual.
      allLinks.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (href === '/' || href === '#') {
          candidateLinks.push(a);
        }
      });
    }

    if (candidateLinks.length > 0 || hasExistingCelebration) {
      candidateLinks.forEach(function (a) {
        a.setAttribute('href', correctHref);
        // Only overwrite the label if it's short (a button-like link) —
        // avoids accidentally rewriting a longer descriptive sentence
        // that happens to also be a link.
        if (a.textContent.trim().length < 40) {
          a.textContent = correctText;
        }
      });
      return;
    }

    if (!content) return;

    // Don't add a whole new box if the page ALREADY has working
    // navigation forward — either to the correct next chapter, to the
    // dashboard (when this really is the last built chapter), or to the
    // next grade (the "Mulai Grade X" cross-grade button on a grade's
    // final chapter). Some pages have two or three separate hand-built
    // "you're done" panels already; piling a fourth one on top just
    // because none of them happened to be individually broken made the
    // page feel repetitive rather than actually helping navigation.
    var alreadyHasValidNav = Array.from(content.querySelectorAll('a[href]')).some(function (a) {
      var href = a.getAttribute('href') || '';
      if (href === correctHref) return true;
      if (chapter >= totalBuilt && /^\/grade\d+\/chapter1\/listening\.html$/.test(href)) return true;
      return false;
    });
    if (alreadyHasValidNav) return;

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

  // The "Grade Complete" celebration card (only present on the last
  // built chapter's writing page) previously showed permanently hardcoded
  // numbers ("8/8 Chapters", "32/32 Skills", "256 Soal") regardless of
  // whether the learner had actually done anything yet. This replaces
  // those with real counts read from the same progress/{uid} Firestore
  // document that progress-tracker.js writes to, and adjusts the heading
  // honestly if the grade isn't actually fully finished yet.
  function updateGradeCompleteStats() {
    var card = document.querySelector('.chapter-complete');
    if (!card) return;

    var m = window.location.pathname.match(/\/grade(\d+)\/chapter(\d+)\/writing\.html$/);
    if (!m) return;
    var grade = parseInt(m[1], 10);
    var totalBuilt = BUILT_CHAPTERS[grade] || parseInt(m[2], 10);
    var SKILLS = ['listening', 'reading', 'speaking', 'writing'];

    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js').then(function (appMod) {
      return Promise.all([
        appMod,
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js')
      ]);
    }).then(function (mods) {
      var initializeApp = mods[0].initializeApp;
      var getAuth = mods[1].getAuth, onAuthStateChanged = mods[1].onAuthStateChanged;
      var getFirestore = mods[2].getFirestore, doc = mods[2].doc, getDoc = mods[2].getDoc;

      var app = initializeApp({
        apiKey: "AIzaSyCQiI8HJt1IHcJu7ZzDtcTWj6_aXIeLnAw",
        authDomain: "little-lume.firebaseapp.com",
        projectId: "little-lume",
        storageBucket: "little-lume.firebasestorage.app",
        messagingSenderId: "931608441059",
        appId: "1:931608441059:web:cf40488df42c8d5fbe15d6"
      }, 'gradeCompleteStats');
      var auth = getAuth(app);
      var db = getFirestore(app);

      onAuthStateChanged(auth, function (user) {
        if (!user) return;
        getDoc(doc(db, 'progress', user.uid)).then(function (snap) {
          var data = snap.exists() ? snap.data() : {};
          var chapters = data.chapters || {};

          var chaptersDone = 0, skillsDone = 0, totalSoal = 0;
          for (var c = 1; c <= totalBuilt; c++) {
            var allSkillsDoneThisChapter = true;
            SKILLS.forEach(function (skill) {
              var entry = chapters['grade' + grade + '_chapter' + c + '_' + skill];
              if (entry && entry.done) {
                skillsDone++;
                if (typeof entry.total === 'number') totalSoal += entry.total;
              } else {
                allSkillsDoneThisChapter = false;
              }
            });
            if (allSkillsDoneThisChapter) chaptersDone++;
          }

          var totalSkillsPossible = totalBuilt * 4;
          var nums = card.querySelectorAll('.stat-num');
          if (nums[0]) nums[0].textContent = chaptersDone + '/' + totalBuilt;
          if (nums[1]) nums[1].textContent = skillsDone + '/' + totalSkillsPossible;
          if (nums[2]) nums[2].textContent = totalSoal;

          var heading = card.querySelector('h2');
          var subtext = card.querySelector('p');
          var fullyDone = chaptersDone >= totalBuilt;
          if (heading) {
            heading.textContent = fullyDone
              ? '🎉 Grade ' + grade + ' Selesai!'
              : '📊 Progres Grade ' + grade + ' Kamu';
          }
          if (subtext) {
            subtext.textContent = fullyDone
              ? 'Kamu telah menyelesaikan semua ' + totalBuilt + ' chapter di Grade ' + grade + '. Sangat luar biasa!'
              : 'Kamu baru menyelesaikan ' + chaptersDone + ' dari ' + totalBuilt + ' chapter. Terus semangat belajarnya!';
          }
        }).catch(function (err) {
          console.warn('[LittleLume] Tidak bisa memuat statistik progres:', err);
        });
      });
    }).catch(function (err) {
      console.warn('[LittleLume] Gagal memuat modul Firebase untuk statistik:', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
