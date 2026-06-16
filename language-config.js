/* ── LITTLELUME BILINGUAL SYSTEM ── */
const translations = {
  en: {
    // Navigation (Homepage & Dashboard)
    'nav.dashboard': 'Dashboard',
    'nav.lessons': 'Lessons',
    'nav.progress': 'Progress',
    'nav.games': 'Games & Quiz',
    'nav.support': 'Help',
    'nav.settings': 'Settings',
    'nav.signout': 'Sign Out',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.getStarted': 'Get Started',

    // Topbar
    'topbar.profile': 'Profile',
    'topbar.upgrade': 'Upgrade Now',
    'topbar.subscription': 'Subscription',

    // Greeting
    'greeting.good_morning': 'Good morning ☀️',
    'greeting.good_afternoon': 'Good afternoon 🌤️',
    'greeting.good_evening': 'Good evening 🌙',
    'greeting.welcome': 'Welcome back',
    'greeting.unlocked': 'You have full access to all grades. Keep up the great work!',
    'greeting.subscribe': 'Subscribe to unlock all grades, chapters, and learning tools.',

    // Stats
    'stats.xp_earned': 'XP Earned',
    'stats.lessons_completed': 'Lessons Completed',
    'stats.streak': 'Learning Streak',
    'stats.next_milestone': 'Next Milestone',
    'stats.today': 'Today',
    'stats.days': 'Days',

    // Last Accessed
    'lastAccessed.continue': 'Continue Learning',
    'lastAccessed.startNew': 'Start New Lesson',

    // Grades
    'grade.1.title': 'Alphabet Explorer',
    'grade.1.desc': 'Learn sounds, phonics & build your first words',
    'grade.2.title': 'Word Wizard',
    'grade.2.desc': 'Expand vocabulary & master basic sentence structure',
    'grade.3.title': 'Story Reader',
    'grade.3.desc': 'Reading comprehension, grammar basics & speaking practice',
    'grade.4.title': 'Language Crafter',
    'grade.4.desc': 'Intermediate grammar, writing skills & storytelling',
    'grade.5.title': 'Advanced Communicator',
    'grade.5.desc': 'Complex reading, essay writing & confident speaking',
    'grade.6.title': 'English Master',
    'grade.6.desc': 'Academic writing, critical reading & exam preparation',

    // Quick Actions
    'quick.grammar': 'Grammar',
    'quick.worksheets': 'Worksheets',
    'quick.games': 'Games & Quiz',
    'quick.home': 'Homepage',
    'quick.topics': 'topics',
    'quick.grades': 'All grades',
    'quick.types': 'game types',
    'quick.back': 'Back to main',

    // Paywall
    'paywall.upgrade': 'Upgrade to Premium',
    'paywall.message': 'Unlock all grades and exclusive content',
    'paywall.button': 'Subscribe Now',

    // Status
    'status.active': 'Active',
    'status.inactive': 'No active subscription',
    'status.expires': 'expires',

    // Messages
    'msg.coming_soon': 'Coming soon!',
    'msg.sign_in_required': 'Sign in to access this feature',

    // Homepage - Hero
    'hero.eyebrow': 'PREMIUM ENGLISH LEARNING',
    'hero.title1': 'Make English Learning',
    'hero.title2': 'Fun & Engaging',
    'hero.title3': 'for Kids',
    'hero.subtitle': 'Discover interactive lessons, games, and activities designed for children (Grades 1-6). Build confidence, improve speaking skills, and master grammar through play.',
    'hero.cta1': 'Start Free Trial',
    'hero.cta2': 'View Pricing',
    'hero.note1': '7-day free trial.',
    'hero.note2': 'No credit card required.',
    'hero.rating': 'Trusted by 10k+ families',
    'hero.award': 'Award-winning platform',

    // Proof Bar
    'proof.lessons': 'Interactive Lessons',
    'proof.grades': 'Comprehensive Curriculum',
    'proof.learners': 'Active Learners',

    // Features
    'features.title1': 'Why Parents Love',
    'features.title2': 'LittleLume',
    'features.gamified': 'Gamified Learning',
    'features.gamified_desc': 'Kids earn XP, unlock achievements, and compete in friendly challenges—making learning feel like playtime.',
    'features.personalized': 'Personalized Paths',
    'features.personalized_desc': 'AI-powered recommendations adapt to each child\'s pace, learning style, and progress—no two students learn the same way.',
    'features.expert': 'Expert Curriculum',
    'features.expert_desc': 'Designed by experienced ESL teachers following international standards—building skills for real-world confidence.',
    'features.progress': 'Real-time Progress',
    'features.progress_desc': 'Parents see detailed analytics on speaking, vocabulary, grammar, and confidence—no surprises at school.',
    'features.native': 'Native Speakers',
    'features.native_desc': 'Learn from authentic pronunciation and natural patterns—powered by native English voice actors and AI.',
    'features.offline': 'Learn Anywhere',
    'features.offline_desc': 'Offline mode, mobile app, and browser access—learn at home, on the go, or during commutes.',

    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.free': 'FREE',
    'pricing.free_name': 'Starter',
    'pricing.free_desc': 'Perfect for trying out LittleLume',
    'pricing.free_price': '$0',
    'pricing.feature1': '3 grades (Grade 1-3)',
    'pricing.feature2': '5 chapters per grade',
    'pricing.feature3': 'Basic progress tracking',
    'pricing.cta_free': 'Start Free',
    'pricing.popular': 'POPULAR',
    'pricing.premium_name': 'Premium',
    'pricing.premium_desc': 'Full access & personalized learning',
    'pricing.per_month': '/mo',
    'pricing.premium_f1': 'All 6 grades unlocked',
    'pricing.premium_f2': '100+ hours of content',
    'pricing.premium_f3': 'AI-personalized paths',
    'pricing.premium_f4': 'Progress analytics',
    'pricing.premium_f5': 'Ad-free experience',
    'pricing.cta_premium': 'Start Trial',
    'pricing.annual': 'ANNUAL',
    'pricing.annual_name': 'Annual Plan',
    'pricing.annual_desc': 'Save 30% with yearly billing',
    'pricing.annual_f1': 'Same as Premium',
    'pricing.annual_f2': 'Billed annually',
    'pricing.annual_f3': '30% savings',
    'pricing.cta_annual': 'Start Trial',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What age group is LittleLume for?',
    'faq.a1': 'LittleLume is designed for children in Grades 1-6 (ages 6-12). Each grade has age-appropriate content and difficulty levels.',
    'faq.q2': 'How much content is included?',
    'faq.a2': 'Premium members get 100+ hours of interactive lessons, games, worksheets, and activities—updated monthly with new content.',
    'faq.q3': 'Can I track my child\'s progress?',
    'faq.a3': 'Yes! Parents get detailed analytics showing comprehension, vocabulary, speaking practice, and overall progress—accessible anytime.',
    'faq.q4': 'Is there a refund policy?',
    'faq.a4': 'Yes. If you\'re not satisfied within 14 days, we offer a full refund—no questions asked.',

    // Footer
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.refund': 'Refund Policy',
    'footer.copyright': '© 2026 LittleLume. All rights reserved. Premium English Learning for Kids.',

    // Modal
    'modal.title': 'Welcome to LittleLume',
    'modal.subtitle': 'Sign in with your Google account to access all lessons, games, and worksheets for Grade 1–6.',
    'modal.google_btn': 'Continue with Google',
    'modal.terms': 'By signing in, you agree to our Terms & Conditions and Privacy Policy.',
  },

  id: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.lessons': 'Pelajaran',
    'nav.progress': 'Kemajuan',
    'nav.games': 'Games & Kuis',
    'nav.support': 'Bantuan',
    'nav.settings': 'Pengaturan',
    'nav.signout': 'Keluar',

    // Topbar
    'topbar.profile': 'Profil',
    'topbar.upgrade': 'Upgrade Sekarang',
    'topbar.subscription': 'Langganan',

    // Greeting
    'greeting.good_morning': 'Selamat pagi ☀️',
    'greeting.good_afternoon': 'Selamat siang 🌤️',
    'greeting.good_evening': 'Selamat malam 🌙',
    'greeting.welcome': 'Selamat datang kembali',
    'greeting.unlocked': 'Kamu memiliki akses penuh ke semua kelas. Lanjutkan usaha bagus mu!',
    'greeting.subscribe': 'Langgani untuk membuka semua kelas, bab, dan alat pembelajaran.',

    // Stats
    'stats.xp_earned': 'XP Diperoleh',
    'stats.lessons_completed': 'Pelajaran Selesai',
    'stats.streak': 'Streak Belajar',
    'stats.next_milestone': 'Milestone Berikutnya',
    'stats.today': 'Hari ini',
    'stats.days': 'Hari',

    // Last Accessed
    'lastAccessed.continue': 'Lanjutkan Belajar',
    'lastAccessed.startNew': 'Mulai Pelajaran Baru',

    // Grades
    'grade.1.title': 'Penelusur Abjad',
    'grade.1.desc': 'Pelajari suara, fonik & bangun kata-kata pertama mu',
    'grade.2.title': 'Penyihir Kata',
    'grade.2.desc': 'Perluas kosakata & kuasai struktur kalimat dasar',
    'grade.3.title': 'Pembaca Cerita',
    'grade.3.desc': 'Pemahaman bacaan, tata bahasa dasar & latihan berbicara',
    'grade.4.title': 'Pengrajin Bahasa',
    'grade.4.desc': 'Tata bahasa menengah, keterampilan menulis & bercerita',
    'grade.5.title': 'Komunikator Lanjutan',
    'grade.5.desc': 'Membaca kompleks, menulis esai & berbicara percaya diri',
    'grade.6.title': 'Maestro Bahasa Inggris',
    'grade.6.desc': 'Menulis akademik, membaca kritis & persiapan ujian',

    // Quick Actions
    'quick.grammar': 'Tata Bahasa',
    'quick.worksheets': 'Lembar Kerja',
    'quick.games': 'Games & Kuis',
    'quick.home': 'Beranda',
    'quick.topics': 'topik',
    'quick.grades': 'Semua kelas',
    'quick.types': 'tipe game',
    'quick.back': 'Kembali ke beranda',

    // Paywall
    'paywall.upgrade': 'Upgrade ke Premium',
    'paywall.message': 'Buka semua kelas dan konten eksklusif',
    'paywall.button': 'Langgani Sekarang',

    // Status
    'status.active': 'Aktif',
    'status.inactive': 'Tidak ada langganan aktif',
    'status.expires': 'kadaluarsa',

    // Messages
    'msg.coming_soon': 'Segera hadir!',
    'msg.sign_in_required': 'Masuk untuk mengakses fitur ini',

    // Homepage - Hero
    'hero.eyebrow': 'PEMBELAJARAN BAHASA INGGRIS PREMIUM',
    'hero.title1': 'Jadikan Pembelajaran Bahasa Inggris',
    'hero.title2': 'Menyenangkan & Menarik',
    'hero.title3': 'untuk Anak-Anak',
    'hero.subtitle': 'Temukan pelajaran interaktif, games, dan aktivitas dirancang untuk anak (Kelas 1-6). Bangun kepercayaan diri, tingkatkan kemampuan berbicara, dan kuasai grammar melalui bermain.',
    'hero.cta1': 'Mulai Uji Coba Gratis',
    'hero.cta2': 'Lihat Harga',
    'hero.note1': 'Uji coba gratis selama 7 hari.',
    'hero.note2': 'Tidak perlu kartu kredit.',
    'hero.rating': 'Dipercaya oleh 10k+ keluarga',
    'hero.award': 'Platform pemenang penghargaan',

    // Proof Bar
    'proof.lessons': 'Pelajaran Interaktif',
    'proof.grades': 'Kurikulum Komprehensif',
    'proof.learners': 'Pelajar Aktif',

    // Features
    'features.title1': 'Mengapa Orangtua Menyukai',
    'features.title2': 'LittleLume',
    'features.gamified': 'Pembelajaran Gamifikasi',
    'features.gamified_desc': 'Anak-anak mengumpulkan XP, membuka pencapaian, dan berkompetisi dalam tantangan ramah—membuat belajar terasa seperti bermain.',
    'features.personalized': 'Jalur Dipersonalisasi',
    'features.personalized_desc': 'Rekomendasi bertenaga AI menyesuaikan dengan kecepatan, gaya belajar, dan kemajuan setiap anak—tidak ada dua siswa yang belajar sama.',
    'features.expert': 'Kurikulum Ahli',
    'features.expert_desc': 'Dirancang oleh guru ESL berpengalaman mengikuti standar internasional—membangun keterampilan untuk kepercayaan diri nyata.',
    'features.progress': 'Kemajuan Waktu Nyata',
    'features.progress_desc': 'Orangtua melihat analitik terperinci tentang berbicara, kosakata, grammar, dan kepercayaan diri—tanpa kejutan di sekolah.',
    'features.native': 'Penutur Asli',
    'features.native_desc': 'Belajar dari pengucapan autentik dan pola alami—didukung oleh aktor suara penutur asli dan AI.',
    'features.offline': 'Belajar Di Mana Saja',
    'features.offline_desc': 'Mode offline, aplikasi mobile, dan akses browser—belajar di rumah, dalam perjalanan, atau saat commute.',

    // Pricing
    'pricing.title': 'Harga Sederhana & Transparan',
    'pricing.free': 'GRATIS',
    'pricing.free_name': 'Pemula',
    'pricing.free_desc': 'Sempurna untuk mencoba LittleLume',
    'pricing.free_price': '$0',
    'pricing.feature1': '3 kelas (Kelas 1-3)',
    'pricing.feature2': '5 bab per kelas',
    'pricing.feature3': 'Pelacakan kemajuan dasar',
    'pricing.cta_free': 'Mulai Gratis',
    'pricing.popular': 'POPULER',
    'pricing.premium_name': 'Premium',
    'pricing.premium_desc': 'Akses penuh & pembelajaran dipersonalisasi',
    'pricing.per_month': '/bulan',
    'pricing.premium_f1': 'Semua 6 kelas terbuka',
    'pricing.premium_f2': '100+ jam konten',
    'pricing.premium_f3': 'Jalur dipersonalisasi AI',
    'pricing.premium_f4': 'Analitik kemajuan',
    'pricing.premium_f5': 'Pengalaman tanpa iklan',
    'pricing.cta_premium': 'Mulai Uji Coba',
    'pricing.annual': 'TAHUNAN',
    'pricing.annual_name': 'Paket Tahunan',
    'pricing.annual_desc': 'Hemat 30% dengan penagihan tahunan',
    'pricing.annual_f1': 'Sama seperti Premium',
    'pricing.annual_f2': 'Ditagih setiap tahun',
    'pricing.annual_f3': 'Penghematan 30%',
    'pricing.cta_annual': 'Mulai Uji Coba',

    // FAQ
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.q1': 'Untuk kelompok usia berapa LittleLume?',
    'faq.a1': 'LittleLume dirancang untuk anak-anak di Kelas 1-6 (usia 6-12). Setiap kelas memiliki konten dan tingkat kesulitan yang sesuai usia.',
    'faq.q2': 'Berapa banyak konten yang disertakan?',
    'faq.a2': 'Anggota Premium mendapat 100+ jam pelajaran interaktif, games, lembar kerja, dan aktivitas—diperbarui bulanan dengan konten baru.',
    'faq.q3': 'Bisakah saya melacak kemajuan anak saya?',
    'faq.a3': 'Ya! Orangtua mendapat analitik terperinci yang menunjukkan pemahaman, kosakata, praktik berbicara, dan kemajuan keseluruhan—dapat diakses kapan saja.',
    'faq.q4': 'Apakah ada kebijakan pengembalian dana?',
    'faq.a4': 'Ya. Jika Anda tidak puas dalam 14 hari, kami menawarkan pengembalian dana penuh—tanpa pertanyaan.',

    // Footer
    'footer.about': 'Tentang',
    'footer.contact': 'Hubungi Kami',
    'footer.terms': 'Syarat & Ketentuan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.refund': 'Kebijakan Pengembalian Dana',
    'footer.copyright': '© 2026 LittleLume. Semua hak dilindungi. Pembelajaran Bahasa Inggris Premium untuk Anak-Anak.',

    // Modal
    'modal.title': 'Selamat Datang di LittleLume',
    'modal.subtitle': 'Masuk dengan akun Google Anda untuk mengakses semua pelajaran, games, dan lembar kerja untuk Kelas 1-6.',
    'modal.google_btn': 'Lanjutkan dengan Google',
    'modal.terms': 'Dengan masuk, Anda setuju dengan Syarat & Ketentuan dan Kebijakan Privasi kami.',
  },
};

// ── Language Manager ──
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('littlelume_lang') || 'en';
  }

  setLanguage(lang) {
    if (lang === 'en' || lang === 'id') {
      this.currentLang = lang;
      localStorage.setItem('littlelume_lang', lang);
      this.updatePageText();
      // Dispatch event untuk update other listeners
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  t(key, defaultText = key) {
    const keys = key.split('.');
    let value = translations[this.currentLang];
    
    for (let k of keys) {
      value = value?.[k];
    }
    
    return value || defaultText;
  }

  updatePageText() {
    // Update all elements dengan data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update semua elements dengan data-i18n-html attribute
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = this.t(key);
    });
  }

  // Convenience methods untuk common updates
  t_nav(name) { return this.t(`nav.${name}`); }
  t_stat(name) { return this.t(`stats.${name}`); }
  t_grade(grade, type) { return this.t(`grade.${grade}.${type}`); }
}

// Global instance
window.langMgr = new LanguageManager();

// Auto-update saat DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.langMgr.updatePageText();
});
