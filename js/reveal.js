export function initReveal() {
    const revealElements = document.querySelectorAll(".glass-card, .role-card, .highlight-card, section");
    if (!revealElements.length) return; // Không có phần tử -> thoát êm

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0");
                entry.target.classList.remove("opacity-0", "translate-y-6");
                obs.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, observerOptions);

    revealElements.forEach((el) => {
        el.classList.add("transition-all", "duration-700", "ease-out", "opacity-0", "translate-y-6");
        observer.observe(el);
    });
}