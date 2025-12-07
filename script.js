// Yangiliklar ma'lumotlari
let posts = [
    {
        id: 1,
        title: "Cyber Security yangiliklari 2024",
        content: "Yangi cyber threatlar va himoya usullari...",
        category: "Cyber Security",
        date: "2024-03-15",
        author: "Asilbek Alishev"
    },
    {
        id: 2,
        title: "HAAD da o'qish tajribam",
        content: "HAAD Training Center da Cyber Security kursi...",
        category: "Ta'lim",
        date: "2024-03-10",
        author: "Asilbek Alishev"
    },
    {
        id: 3,
        title: "Pentesting asoslari",
        content: "Ethical Hacking va Penetration Testing...",
        category: "Pentesting",
        date: "2024-03-05",
        author: "Asilbek Alishev"
    }
];

// Yangiliklarni ko'rsatish
function displayPosts() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    newsGrid.innerHTML = posts.map(post => `
        <div class="news-card">
            <div class="news-img">
                <i class="fas fa-shield-alt"></i>
            </div>
            <div class="news-content">
                <span class="category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="news-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Admin login tekshirish
function checkAdminAuth() {
    const isAdminPage = window.location.pathname.includes('admin.html');
    const isDashboardPage = window.location.pathname.includes('dashboard.html');
    
    if (isAdminPage) {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                if (username === 'admin' && password === 'HaadCyber2024!') {
                    localStorage.setItem('isAdminLoggedIn', 'true');
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Login yoki parol noto‘g‘ri!');
                }
            });
        }
    }
    
    if (isDashboardPage) {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn || isLoggedIn !== 'true') {
            window.location.href = 'admin.html';
        }
    }
}

// Dashboard funksiyalari
function setupDashboard() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'admin.html';
        });
    }
    
    // Yangi post qo'shish
    const addPostForm = document.getElementById('addPostForm');
    if (addPostForm) {
        addPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            const category = document.getElementById('postCategory').value;
            
            const newPost = {
                id: posts.length + 1,
                title: title,
                content: content,
                category: category,
                date: new Date().toISOString().split('T')[0],
                author: "Asilbek Alishev"
            };
            
            posts.unshift(newPost);
            alert('Post muvaffaqiyatli qo‘shildi!');
            addPostForm.reset();
        });
    }
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    displayPosts();
    checkAdminAuth();
    setupDashboard();
});