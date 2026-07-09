/**
 * auth-guard.js — LittleLume Content Protection
 * ================================================================
 * Include on every protected content page as:
 *   <style>body{visibility:hidden}</style>   (put this in <head>, near the top)
 *   <script type="module" src="/auth-guard.js"></script>
 *
 * Requires `type="module"` because this file uses ES module imports.
 *
 * What it does:
 *   1. Keeps the page hidden until access is verified.
 *   2. Not logged in           -> redirect to the pricing section.
 *   3. Logged in, not subscribed (or subscription expired)
 *                               -> redirect to the dashboard (shows paywall).
 *   4. Logged in + subscribed  -> reveal the page.
 *
 * DEV MODE (for internal content QA only)
 * ----------------------------------------------------------------
 * To review chapters yourself without needing an active paid
 * subscription, open the browser console on this site and run:
 *
 *     localStorage.setItem('ll_dev_key', 'lumee-dev-d78ef738806f82763bb0da5c')
 *
 * To turn it back off:
 *
 *     localStorage.removeItem('ll_dev_key')
 *
 * IMPORTANT: this secret lives in a public JS file, so it is NOT truly
 * secure — anyone who reads this file's source could find it. It's a
 * convenience gate for your own QA while content is still being built,
 * not real protection. Before you go live with paying customers, either
 * rotate this to a fresh value only you know, or remove dev mode
 * entirely and rely on the real subscription check below.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore, doc, getDoc }
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

// ---- Dev mode bypass (see comment block above) ----------------------
const DEV_KEY_STORAGE = 'll_dev_key';
const DEV_SECRET = 'lumee-dev-d78ef738806f82763bb0da5c';
function isDevMode() {
  return localStorage.getItem(DEV_KEY_STORAGE) === DEV_SECRET;
}

function reveal() {
  document.body.style.visibility = 'visible';
}

function redirectToPricing() {
  window.location.href = '/index.html#pricing';
}

function redirectToDashboard() {
  window.location.href = '/dashboard.html';
}

// Same subscription schema as dashboard.html's checkSubscription().
async function checkSubscription(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) return null;
    const sub = snap.data()?.subscription;
    if (!sub) return null;
    const exp = sub.expiredAt?.toDate?.() || new Date(sub.expiredAt);
    return { active: sub.status === 'active' && exp > new Date() };
  } catch {
    return null;
  }
}

(function guard() {
  if (isDevMode()) {
    console.log('%c[LittleLume] Dev mode active — auth guard bypassed for content QA.', 'color:#6C63FF;font-weight:bold;');
    reveal();
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      redirectToPricing();
      return;
    }
    const sub = await checkSubscription(user.uid);
    if (sub && sub.active) {
      reveal();
    } else {
      redirectToDashboard();
    }
  });
})();
