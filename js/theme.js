export function initTheme() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return; // Thoát nếu trang không có nút toggle

    // 1. Kiểm tra cấu hình đã lưu hoặc hệ thống
    const savedTheme = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    // 2. Bắt sự kiện click
    toggleBtn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("color-theme", isDark ? "dark" : "light");
    });
}