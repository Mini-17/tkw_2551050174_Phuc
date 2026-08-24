// js/main.js – điểm khởi động duy nhất cho cả 4 trang
// js/main.js
import { initToTop } from "./nav.js";
import { initTheme } from "./theme.js";
import { initFaq } from "./faq.js";

// Khởi chạy tất cả module
initTheme();
initToTop();
initFaq();