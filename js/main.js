// js/main.js – điểm khởi động duy nhất cho cả 4 trang
import { initNav, initHeaderOnScroll, initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";
import { initPricing } from "./pricing.js";
import { initSlider } from "./slider.js";
import { initReveal } from "./reveal.js";

import { initApp } from "./app.js";

// Khởi chạy tất cả module
initTheme();
initNav();
initHeaderOnScroll();
initToTop();
initFaq();
initPricing();
initSlider();
initReveal();

initApp();