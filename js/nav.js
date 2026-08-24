// js/nav.js
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