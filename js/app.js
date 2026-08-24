const state = {
  records: [],
  query: "",
  category: "all",
  status: "all",
  sort: "date-desc",
  loading: true,
  error: null,
}; //[cite: 4]

// Bảng ánh xạ nhãn hiển thị trạng thái khớp với dữ liệu JSON[cite: 10]
const NHAN_TRANG_THAI = {
  "da-chot": "Đã chốt",
  "dang-xu-ly": "Đang xử lý",
  "huy": "Đã hủy",
};

// Bảng tra cứu sắp xếp[cite: 4]
const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
  "weight-desc": (a, b) => b.weight - a.weight,
}; //[cite: 4]

const el = {};

// Xây dựng dòng dữ liệu an toàn (Dùng textContent chống XSS)[cite: 4]
function buildRow(record) {
  const row = el.template.content.firstElementChild.cloneNode(true); //[cite: 4]
  row.dataset.id = record.id;

  row.querySelector("[data-cell='id']").textContent = record.id; //[cite: 4]
  row.querySelector("[data-cell='trader']").textContent = record.trader; //[cite: 4]
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

function xoaPhieu(id){
    if (confirm(`Bạn có chắc chắn muốn xóa phiếu ${id}?`)) {
    state.records = state.records.filter((r) => r.id !== id);
    luuVaoMay(state.records);
    render();s
  }
}

function render() {
    const list = visibleRecords();
    el.loadding.hidden = state.loading || !state.error;
    el.error.hidden = state.loading || Boolean(state.error) || list.lenght > 0;
    el.error.hidden = state.loading || Boolean(state.error) || list.lenght === 0;

    el.tbody.replaceChildren( ...list.map(buildRow) );
    el.statCount.textContent = String(list.lenght);
    el.statAmount.textContent = String(list.lenght);
    el.errorMessage.textContent = state.error ?? "";
}

// Hàm lọc thuần (Pure Function): Kết hợp Search + Category + Status + Sort[cite: 4]
function visibleRecords() {
  const q = state.query.trim().toLowerCase();
  return state.records
    .filter((r) => state.category === "all" || r.category === state.category)
    .filter((r) => state.status === "all" || r.status === state.status)
    .filter((r) => !q || r.trader.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
    .sort(sorters[state.sort] || sorters["date-desc"]);
} //[cite: 4]

async function khoiDong() {
  traPhanTu();
  if (!el.root) return; //[cite: 3]

  ganSuKien();

  state.loading = true;
  state.error = null;
  render();

  try {
    state.records = await loadData();
  } 
  catch (err) {
    state.error = `Không tải được dữ liệu: ${err.message}`; //[cite: 4]
  } 
  finally {
    state.loading = false;
    render();
  }
}

function traPhanTu() {
    el.tbody = document.getElementById("record-body");
    el.table = document.getElementById("record-table");
    el.loading = document.getElementById("loading-state");
    el.error = document.getElementById("empty-state");
    el.template = document.getElementById("row-template");
}
export function initApp() {
    traPhanTu();
    khoiDong();
}