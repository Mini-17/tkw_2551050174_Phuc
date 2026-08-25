import { loadData, luuVaoMay, restoresData } from "./store.js";

const state = {
  records: [],
  query: "",
  category: "all",
  status: "all",
  sort: "date-desc",
  loading: true,
  error: null,
};


const NHAN_TRANG_THAI = {
  "da-chot": "Đã chốt",
  "dang-xu-ly": "Đang xử lý",
  "huy": "Đã hủy",
};


const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
  "weight-desc": (a, b) => b.weight - a.weight,
};


const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const el = {};

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// dòng dữ liệu an toàn
function buildRow(record) {
  const row = el.template.content.firstElementChild.cloneNode(true);
  row.dataset.id = record.id;

  row.querySelector("[data-cell='id']").textContent = record.id;
  row.querySelector("[data-cell='trader']").textContent = record.trader;
  row.querySelector("[data-cell='category']").textContent = record.category;
  row.querySelector("[data-cell='weight']").textContent = `${record.weight.toLocaleString("vi-VN")} kg`;
  row.querySelector("[data-cell='amount']").textContent = vndFormatter.format(record.amount);
  row.querySelector("[data-cell='date']").textContent = record.date;

  const statusEl = row.querySelector("[data-cell='status']");
  statusEl.textContent = NHAN_TRANG_THAI[record.status] ?? record.status;
  statusEl.dataset.status = record.status;

  const btnDelete = row.querySelector("[data-action='delete']");
  if (btnDelete) {
    btnDelete.setAttribute("aria-label", `Xóa phiếu ${record.id} của ${record.trader}`);
    btnDelete.addEventListener("click", () => xoaPhieu(record.id));
  }

  return row;
}

function xoaPhieu(id) {
  if (confirm(`Bạn có chắc chắn muốn xóa phiếu ${id}?`)) {
    state.records = state.records.filter((r) => r.id !== id);
    luuVaoMay(state.records);
    render();
  }
}


function visibleRecords() {
  const q = state.query.trim().toLowerCase();
  return state.records
    .filter((r) => state.category === "all" || r.category === state.category)
    .filter((r) => state.status === "all" || r.status === state.status)
    .filter((r) => !q || r.trader.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
    .sort(sorters[state.sort] || sorters["date-desc"]);
}

// Hàm render
function render() {
  // 1. Trạng thái Loading
  if (state.loading) {
    if (el.loading) el.loading.hidden = false;
    if (el.table) el.table.hidden = true;
    if (el.empty) el.empty.hidden = true;
    if (el.error) el.error.hidden = true;
    return;
  }
  if (el.loading) el.loading.hidden = true;

  // 2. Trạng thái Lỗi
  if (state.error) {
    if (el.error) el.error.hidden = false;
    if (el.errorMessage) el.errorMessage.textContent = state.error;
    if (el.table) el.table.hidden = true;
    if (el.empty) el.empty.hidden = true;
    return;
  }
  if (el.error) el.error.hidden = true;

  // 3 & 4. Trạng thái Có dữ liệu hoặc Rỗng
  const list = visibleRecords();

  if (list.length === 0) {
    if (el.empty) el.empty.hidden = false;
    if (el.table) el.table.hidden = true;
  } else {
    if (el.empty) el.empty.hidden = true;
    if (el.table) el.table.hidden = false;
    el.tbody.replaceChildren(...list.map(buildRow));
  }

  // Cập nhật thống kê số lượng và tổng tiền doanh thu
  const totalAmount = list.reduce((sum, r) => sum + r.amount, 0);
  if (el.statCount) el.statCount.textContent = String(list.length);
  if (el.statAmount) el.statAmount.textContent = vndFormatter.format(totalAmount);
}

function ganSuKien() {
  el.searchInput?.addEventListener(
    "input",
    debounce((e) => {
      state.query = e.target.value;
      render();
    }, 300)
  );

  el.categorySelect?.addEventListener("change", (e) => {
    state.category = e.target.value;
    render();
  });

  el.statusSelect?.addEventListener("change", (e) => {
    state.status = e.target.value;
    render();
  });

  el.sortSelect?.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  el.btnReset?.addEventListener("click", async () => {
    if (confirm("Khôi phục toàn bộ danh sách về 30 bản ghi gốc?")) {
      state.records = await restoresData();
      render();
    }
  });
}

function traPhanTu() {
  el.root = document.getElementById("records-app");
  el.tbody = document.getElementById("record-body");
  el.table = document.getElementById("record-table");
  el.loading = document.getElementById("loading-state");
  el.empty = document.getElementById("empty-state");
  el.error = document.getElementById("error-state");
  el.errorMessage = document.getElementById("error-message");
  el.template = document.getElementById("row-template");
  el.statCount = document.getElementById("stat-count");
  el.statAmount = document.getElementById("stat-amount");
  el.searchInput = document.getElementById("filter-search");
  el.categorySelect = document.getElementById("filter-category");
  el.statusSelect = document.getElementById("filter-status");
  el.sortSelect = document.getElementById("filter-sort");
  el.btnReset = document.getElementById("btn-reset-data");
}

async function khoiDong() {
  traPhanTu();
  if (!el.root) return;

  ganSuKien();

  state.loading = true;
  state.error = null;
  render();

  try {
    state.records = await loadData();
  } catch (err) {
    state.error = `Không tải được dữ liệu: ${err.message}`;
  } finally {
    state.loading = false;
    render();
  }
}

export function initApp() {
  khoiDong();
}