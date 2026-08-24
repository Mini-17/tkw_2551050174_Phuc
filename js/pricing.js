// js/pricing.js
export function initPricing() {
    const root = document.getElementById("pricing");
    if (!root) return; // Trang không có bảng giá -> thoát êm

    const toggleBtn = root.querySelector('button[aria-label*="Chuyển đổi"], button[aria-label*="gói"]');
    if (!toggleBtn) return;

    let isYearly = false;
    const dot = toggleBtn.querySelector("span");
    
    // Tìm các khung giá
    const priceCards = root.querySelectorAll(".glass-card");
    const starterPrice = priceCards[0]?.querySelector(".font-display.text-4xl");
    const proPrice = priceCards[1]?.querySelector(".font-display.text-4xl");

    toggleBtn.addEventListener("click", () => {
        isYearly = !isYearly;
        
        // Di chuyển nút trượt toggle
        if (dot) {
            dot.classList.toggle("translate-x-7", isYearly);
            dot.classList.toggle("translate-x-0", !isYearly);
        }

        // Đổi trực tiếp đơn vị /tháng thành /năm và cập nhật số tiền
        if (starterPrice) {
            starterPrice.innerHTML = isYearly 
                ? '4.700.000 <span class="font-body text-xs text-muted dark:text-muted-invert font-normal">/năm</span>' 
                : '490.000 <span class="font-body text-xs text-muted dark:text-muted-invert font-normal">/tháng</span>';
        }

        if (proPrice) {
            proPrice.innerHTML = isYearly 
                ? '9.500.000 <span class="font-body text-xs text-muted dark:text-muted-invert font-normal">/năm</span>' 
                : '990.000 <span class="font-body text-xs text-muted dark:text-muted-invert font-normal">/tháng</span>';
        }
    });
}