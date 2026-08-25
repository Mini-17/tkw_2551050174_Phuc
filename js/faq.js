export function initFaq() {
    const root = document.getElementById("faq");
    if (!root) return; // Trang không có FAQ -> thoát êm

    const detailsList = root.querySelectorAll("details");
    detailsList.forEach((detail) => {
        detail.addEventListener("toggle", () => {
            if (detail.open) {
                detailsList.forEach((other) => {
                    if (other !== detail) other.removeAttribute("open");
                });
            }
        });
    });
}