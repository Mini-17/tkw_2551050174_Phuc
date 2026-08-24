const DATA_FILE = "./data/records.json";
const KEY = "autocare_records_data";

export function docTuMay() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function luuVaoMay(records) {
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
  } catch (err) {
    console.error("Lỗi khi lưu LocalStorage:", err);
  }
}

async function downloadData() {
  const res = await fetch(DATA_FILE);
  if (!res.ok) throw new Error(`Máy chủ trả về ${res.status}`); //[cite: 4]
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Dữ liệu không phải là một mảng");
  return data;
}

export async function loadData() {
  const existed = docTuMay();
  if (existed !== null) return existed;

  const sampleData = await downloadData();
  luuVaoMay(sampleData);
  return sampleData;
}

export async function restoresData() {
  localStorage.removeItem(KEY);
  const sampleData = await downloadData();
  luuVaoMay(sampleData);
  return sampleData;
}