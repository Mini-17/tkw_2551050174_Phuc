export function initNav() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add("hidden");
        }
    });
}

export function initHeaderOnScroll() {
    const header = document.querySelector(".nav-header, nav");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("shadow-lg", "backdrop-blur-lg");
        } else {
            header.classList.remove("shadow-lg", "backdrop-blur-lg");
        }
    });
}

export function initToTop() {
    const toTopBtn = document.getElementById("back-to-top");
    if (!toTopBtn) return; // Thoát nếu trang không có nút này

    // 1. Lắng nghe sự kiện cuộn chuột để ẩn/hiện nút (> 400px)
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            toTopBtn.classList.remove("opacity-0", "pointer-events-none");
            toTopBtn.classList.add("opacity-100", "pointer-events-auto");
        } else {
            toTopBtn.classList.remove("opacity-100", "pointer-events-auto");
            toTopBtn.classList.add("opacity-0", "pointer-events-none");
        }
    });

    // 2. Bắt sự kiện click để cuộn mượt mà lên vị trí 0
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}