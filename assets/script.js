// ========================================
// Service Worker Registration
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered successfully');
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// ========================================
// PWA Install Prompt
// ========================================
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    installBtn.style.display = 'none';
});

// ========================================
// Navigation History Management
// ========================================
const navHistory = ['home'];
let currentPage = 'home';

// ========================================
// Hamburger Menu Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
}

hamburger.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// ========================================
// Menu Navigation
// ========================================
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        
        if (page !== currentPage) {
            navHistory.push(page);
            currentPage = page;
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update content
            updateContent(page);
            
            // Close sidebar
            toggleSidebar();
            
            // Push state to history
            history.pushState({ page: page }, '', `#${page}`);
        }
    });
});

// ========================================
// Content Update Function
// ========================================
function updateContent(page) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';
    
    const contentMap = {
        home: `
            <div class="content-card">
                <h1>স্বাগতম HSC English 2nd Paper Master অ্যাপে</h1>
                <p>এই অ্যাপটি আপনার HSC English 2nd Paper পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি নিতে সাহায্য করবে। নিচের টপিকগুলো থেকে যেকোনো একটি নির্বাচন করুন।</p>
            </div>
            <div class="topic-grid">
                <div class="topic-card">
                    <h3>Parts of Speech</h3>
                    <p>Noun, Pronoun, Verb, Adjective সহ সকল Parts শিখুন</p>
                </div>
                <div class="topic-card">
                    <h3>Tenses</h3>
                    <p>সকল ১২টি Tense উদাহরণসহ</p>
                </div>
                <div class="topic-card">
                    <h3>Sentence Structure</h3>
                    <p>Simple, Compound, Complex</p>
                </div>
                <div class="topic-card">
                    <h3>Articles</h3>
                    <p>A, An, The এর নিয়ম</p>
                </div>
                <div class="topic-card">
                    <h3>Prepositions</h3>
                    <p>সকল Preposition এর ব্যবহার</p>
                </div>
                <div class="topic-card">
                    <h3>Essay Writing</h3>
                    <p>বিভিন্ন ধরনের Essay</p>
                </div>
                <div class="topic-card">
                    <h3>Letter Writing</h3>
                    <p>Formal ও Informal Letter</p>
                </div>
                <div class="topic-card">
                    <h3>Application</h3>
                    <p>Job ও অন্যান্য Application</p>
                </div>
                <div class="topic-card">
                    <h3>Paragraph</h3>
                    <p>গুরুত্বপূর্ণ Paragraph সমূহ</p>
                </div>
            </div>
        `,
        grammar: `
            <div class="content-card">
                <h1>📚 Grammar Rules</h1>
                <p>HSC পরীক্ষার জন্য গুরুত্বপূর্ণ সকল Grammar নিয়ম এখানে পাবেন।</p>
            </div>
            <div class="content-card">
                <h2>Parts of Speech</h2>
                <p>Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, Interjection - এই ৮টি Parts of Speech সম্পর্কে বিস্তারিত জানুন।</p>
            </div>
            <div class="content-card">
                <h2>Tenses</h2>
                <p>Present, Past, Future - প্রতিটির Simple, Continuous, Perfect, Perfect Continuous form শিখুন।</p>
            </div>
            <div class="content-card">
                <h2>Voice Change</h2>
                <p>Active থেকে Passive এবং Passive থেকে Active voice এ রূপান্তর করার নিয়ম।</p>
            </div>
        `,
        writing: `
            <div class="content-card">
                <h1>✍️ Writing Skills</h1>
                <p>আপনার লেখার দক্ষতা বৃদ্ধি করুন এই সেকশনের মাধ্যমে।</p>
            </div>
            <div class="content-card">
                <h2>Formal Letter</h2>
                <p>চাকরির আবেদন, অভিযোগ পত্র, ব্যবসায়িক চিঠি ইত্যাদি।</p>
            </div>
            <div class="content-card">
                <h2>Informal Letter</h2>
                <p>বন্ধু, পরিবারের সদস্যদের কাছে চিঠি লেখার নিয়ম।</p>
            </div>
            <div class="content-card">
                <h2>Email Writing</h2>
                <p>আধুনিক যোগাযোগ মাধ্যম Email লেখার সঠিক পদ্ধতি।</p>
            </div>
        `,
        composition: `
            <div class="content-card">
                <h1>📝 Composition</h1>
                <p>Essay, Paragraph, Dialogue লেখার কৌশল শিখুন।</p>
            </div>
            <div class="content-card">
                <h2>Essay</h2>
                <p>বিভিন্ন বিষয়ে Essay লেখার গঠন ও নিয়মাবলী।</p>
            </div>
            <div class="content-card">
                <h2>Paragraph</h2>
                <p>গুরুত্বপূর্ণ টপিকের উপর Paragraph রচনা।</p>
            </div>
        `,
        practice: `
            <div class="content-card">
                <h1>🎯 Practice Tests</h1>
                <p>নিয়মিত অনুশীলনের মাধ্যমে আপনার দক্ষতা যাচাই করুন।</p>
            </div>
            <div class="content-card">
                <h2>Grammar Tests</h2>
                <p>বিভিন্ন Grammar বিষয়ের উপর MCQ ও লিখিত পরীক্ষা।</p>
            </div>
            <div class="content-card">
                <h2>Writing Tests</h2>
                <p>Letter, Essay, Paragraph লেখার অনুশীলন।</p>
            </div>
        `,
        vocabulary: `
            <div class="content-card">
                <h1>📖 Vocabulary Builder</h1>
                <p>প্রতিদিন নতুন শব্দ শিখুন এবং আপনার শব্দভাণ্ডার সমৃদ্ধ করুন।</p>
            </div>
            <div class="content-card">
                <h2>Common Words</h2>
                <p>HSC পরীক্ষায় প্রায়ই আসে এমন গুরুত্বপূর্ণ শব্দ।</p>
            </div>
            <div class="content-card">
                <h2>Synonyms & Antonyms</h2>
                <p>সমার্থক ও বিপরীতার্থক শব্দের তালিকা।</p>
            </div>
        `,
        about: `
            <div class="content-card">
                <h1>ℹ️ About This App</h1>
                <p>HSC English 2nd Paper Master একটি সম্পূর্ণ ফ্রি এবং Offline অ্যাপ যা HSC পরীক্ষার্থীদের জন্য বিশেষভাবে তৈরি।</p>
            </div>
            <div class="content-card">
                <h2>Features</h2>
                <p>✅ সম্পূর্ণ Offline সাপোর্ট<br>
                   ✅ Dark/Light মোড<br>
                   ✅ সহজ Navigation<br>
                   ✅ নিয়মিত আপডেট<br>
                   ✅ কোনো বিজ্ঞাপন নেই</p>
            </div>
            <div class="content-card">
                <h2>Version</h2>
                <p>Current Version: 1.0.0<br>
                   Last Updated: January 2026</p>
            </div>
        `
    };
    
    mainContent.innerHTML = contentMap[page] || contentMap.home;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Exit Modal Functions
// ========================================
const exitModal = document.getElementById('exitModal');
const modalOverlay = document.getElementById('modalOverlay');
const cancelExit = document.getElementById('cancelExit');
const confirmExit = document.getElementById('confirmExit');

function showExitModal() {
    exitModal.classList.add('active');
    modalOverlay.classList.add('active');
}

function hideExitModal() {
    exitModal.classList.remove('active');
    modalOverlay.classList.remove('active');
}

cancelExit.addEventListener('click', hideExitModal);
modalOverlay.addEventListener('click', hideExitModal);

confirmExit.addEventListener('click', () => {
    // Try to close the app
    if (navigator.app && navigator.app.exitApp) {
        navigator.app.exitApp();
    } else if (navigator.device && navigator.device.exitApp) {
        navigator.device.exitApp();
    } else {
        window.close();
    }
});

// ========================================
// Back Button Handling
// ========================================
function handleBackButton() {
    // Priority 1: Close sidebar if open
    if (sidebar.classList.contains('active')) {
        toggleSidebar();
        return;
    }
    
    // Priority 2: Close exit modal if open
    if (exitModal.classList.contains('active')) {
        hideExitModal();
        return;
    }
    
    // Priority 3: Navigate back in app history
    if (navHistory.length > 1) {
        navHistory.pop();
        const previousPage = navHistory[navHistory.length - 1];
        currentPage = previousPage;
        
        // Update active menu item
        menuItems.forEach(item => {
            if (item.getAttribute('data-page') === previousPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update content
        updateContent(previousPage);
    } else {
        // Priority 4: Show exit confirmation on home page
        showExitModal();
    }
}

// Handle browser/app back button
window.addEventListener('popstate', (e) => {
    e.preventDefault();
    handleBackButton();
});

// Initialize history
history.pushState({ page: 'home' }, '', '#home');

// ========================================
// Prevent Context Menu (Long Press)
// ========================================
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ========================================
// Disable Text Selection on Buttons
// ========================================
document.querySelectorAll('button, .topic-card, .menu-item').forEach(element => {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
});

// ========================================
// Prevent Double Tap Zoom
// ========================================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ========================================
// Check if running in standalone mode
// ========================================
function isStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || 
           (window.navigator.standalone) || 
           document.referrer.includes('android-app://');
}

if (isStandalone()) {
    console.log('✅ App is running in standalone mode');
}

// ========================================
// Smooth Scroll for Internal Links
// ========================================
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========================================
// Topic Card Click Handlers
// ========================================
document.addEventListener('click', (e) => {
    const topicCard = e.target.closest('.topic-card');
    if (topicCard) {
        const topic = topicCard.getAttribute('data-topic');
        if (topic) {
            console.log(`Topic clicked: ${topic}`);
            // You can add navigation to specific topic pages here
        }
    }
});

// ========================================
// Network Status Detection
// ========================================
window.addEventListener('online', () => {
    console.log('✅ Back online');
});

window.addEventListener('offline', () => {
    console.log('📡 No internet connection');
});

// ========================================
// App Visibility Change
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App moved to background');
    } else {
        console.log('App is active');
    }
});

// ========================================
// Initialize App
// ========================================
console.log('🚀 HSC English 2nd Paper Master App Initialized');
