export function initSlider() {
    const root = document.getElementById("testimonials");
    if (!root) return; // Trang không có Testimonials -> thoát êm

    const cards = root.querySelectorAll(".glass-card");
    if (cards.length <= 1) return;

    let currentIndex = 0;

    // Tự động làm nổi bật card tiếp theo mỗi 4 giây (chỉ hiệu lực trên Mobile/Tablet)
    if (window.innerWidth < 1024) {
        setInterval(() => {
            cards.forEach((card, idx) => {
                if (idx === currentIndex) {
                    card.classList.add("border-accent-500", "scale-[1.02]");
                } else {
                    card.classList.remove("border-accent-500", "scale-[1.02]");
                }
            });
            currentIndex = (currentIndex + 1) % cards.length;
        }, 4000);
    }
}