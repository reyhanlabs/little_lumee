/**
 * progress-tracker.js — LittleLume real progress tracking
 * ================================================================
 * Include on every chapter skill page (listening/reading/speaking/writing),
 * AFTER auth-guard.js:
 *   <script type="module" src="/progress-tracker.js"></script>
 *
 * What it does:
 *   1. Wraps the page's existing checkAllAnswers() function (present on
 *      every chapter skill page) without needing to touch its internals.
 *   2. When the learner checks their answers, records that this specific
 *      grade/chapter/skill was completed (with score) under
 *      progress/{uid} in Firestore.
 *   3. Updates a simple daily streak counter (consecutive days active).
 *
 * Data shape written to progress/{uid}:
 *   {
 *     chapters: {
 *       "grade1_chapter1_listening": { done: true, score: 6, total: 8, lastAttempt: <timestamp> },
 *       ...
 *     },
 *     streak: { current: 3, longest: 5, lastActiveDate: "2026-07-10" }
 *   }
 *
 * Requires the matching Firestore rule (already added):
 *   match /progress/{userId} {
 *     allow read, write: if request.auth != null && request.auth.uid == userId;
 *   }
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCQiI8HJt1IHcJu7ZzDtcTWj6_aXIeLnAw",
  authDomain: "little-lume.firebaseapp.com",
  projectId: "little-lume",
  storageBucket: "little-lume.firebasestorage.app",
  messagingSenderId: "931608441059",
  appId: "1:931608441059:web:cf40488df42c8d5fbe15d6"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

function todayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-07-10"
}

function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / 86400000);
}

function parseChapterInfo() {
  const m = window.location.pathname.match(/grade(\d+)\/chapter(\d+)\/(listening|reading|speaking|writing)\.html/);
  if (!m) return null;
  return { grade: m[1], chapter: m[2], skill: m[3] };
}

// Reads current score/total from the score card the page already rendered
// (checkAllAnswers() fills #scoreDesc with text like "Kamu mendapat 6 dari 8 jawaban benar!").
function readScoreFromDOM() {
  const desc = document.getElementById('scoreDesc');
  if (!desc) return null;
  const match = desc.textContent.match(/(\d+)\s*dari\s*(\d+)/);
  if (!match) return null;
  return { score: parseInt(match[1], 10), total: parseInt(match[2], 10) };
}

async function recordCompletion(uid) {
  const info = parseChapterInfo();
  if (!info) return;
  const scoreInfo = readScoreFromDOM();

  const ref = doc(db, 'progress', uid);
  const key = `grade${info.grade}_chapter${info.chapter}_${info.skill}`;

  let existing = {};
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) existing = snap.data();
  } catch {
    // read may fail if the doc doesn't exist yet or is offline; proceed with defaults.
  }

  // --- streak calculation ---
  const today = todayStr();
  let streak = existing.streak || { current: 0, longest: 0, lastActiveDate: null };
  if (streak.lastActiveDate !== today) {
    const gap = streak.lastActiveDate ? daysBetween(streak.lastActiveDate, today) : null;
    if (gap === 1) {
      streak = { current: streak.current + 1, longest: Math.max(streak.longest, streak.current + 1), lastActiveDate: today };
    } else {
      streak = { current: 1, longest: Math.max(streak.longest, 1), lastActiveDate: today };
    }
  }

  const chapters = existing.chapters || {};
  chapters[key] = {
    done: true,
    score: scoreInfo ? scoreInfo.score : null,
    total: scoreInfo ? scoreInfo.total : null,
    lastAttempt: serverTimestamp()
  };

  try {
    await setDoc(ref, { chapters, streak }, { merge: true });
  } catch (err) {
    console.warn('[LittleLume] Could not save progress:', err);
  }
}

(function hookIntoCheckAnswers() {
  function wrap() {
    const original = window.checkAllAnswers;
    if (typeof original !== 'function' || original.__llWrapped) return;
    window.checkAllAnswers = function () {
      const result = original.apply(this, arguments);
      onAuthStateChanged(auth, (user) => {
        if (user) recordCompletion(user.uid);
      });
      return result;
    };
    window.checkAllAnswers.__llWrapped = true;
  }
  // The page's own inline <script> defines checkAllAnswers when it parses,
  // which happens before this module script runs (modules always execute
  // after the document is parsed), so it should already exist — but wrap
  // defensively in case of ordering differences.
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    wrap();
  } else {
    document.addEventListener('DOMContentLoaded', wrap);
  }
})();
