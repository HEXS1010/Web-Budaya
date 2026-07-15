const PRICE_PER_ITEM = 150000;
let qty = 1;
let currentStep = 1;
let payMethod = null;

function fmtIDR(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById("qtyVal").innerText = qty;
  updateSummary();
}

function updateSummary() {
  const name = document.getElementById("buyerName").value;
  const size = document.getElementById("itemSize").value;
  const color = document.getElementById("itemColor").value;
  const addr = document.getElementById("buyerAddress").value;

  document.getElementById("sumQty").innerText = "x" + qty;
  document.getElementById("sumProductDetail").innerText =
    size || color
      ? `Ukuran ${size || "-"}, Warna ${color || "-"}`
      : "Ukuran & warna belum diisi";
  document.getElementById("sumAddress").innerText =
    addr || "Alamat belum diisi";
  document.getElementById("sumTotal").innerText = fmtIDR(PRICE_PER_ITEM * qty);
}

["buyerName", "itemSize", "itemColor", "buyerAddress"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateSummary);
  document.getElementById(id).addEventListener("change", updateSummary);
});

function selectPay(method) {
  payMethod = method;
  document
    .getElementById("detailTransfer")
    .classList.toggle("show", method === "transfer");
  document
    .getElementById("detailCash")
    .classList.toggle("show", method === "cash");
  document.getElementById("toReviewBtn").disabled =
    method === "cash" ? false : !document.getElementById("bankSelect").value;
  document.getElementById("sumPay").innerText =
    method === "transfer"
      ? "Transfer Bank" +
        (document.getElementById("bankSelect").value
          ? " — " +
            document.getElementById("bankSelect").selectedOptions[0].text
          : "")
      : "Cash / Tunai";
}

function updateBankInfo() {
  const sel = document.getElementById("bankSelect");
  const opt = sel.selectedOptions[0];
  const info = document.getElementById("bankInfo");
  if (sel.value) {
    info.innerHTML = `Transfer ke <b>${opt.text} ${opt.dataset.num} a.n. ${opt.dataset.name}</b><br>Setelah transfer, konfirmasi ke admin via WhatsApp.`;
    document.getElementById("toReviewBtn").disabled = false;
    document.getElementById("sumPay").innerText = "Transfer Bank — " + opt.text;
  } else {
    info.innerText = "Setelah transfer, konfirmasi ke admin via WhatsApp.";
    document.getElementById("toReviewBtn").disabled = true;
  }
}

function goTo(step) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page" + step).classList.add("active");
  currentStep = step;

  document.querySelectorAll(".step").forEach((s) => {
    const n = parseInt(s.dataset.step);
    s.classList.remove("active", "done");
    s.removeAttribute("aria-current");
    if (n < step) s.classList.add("done");
    if (n === step && step <= 3) {
      s.classList.add("active");
      s.setAttribute("aria-current", "step");
    }
  });

  document.getElementById("stitchLine").style.borderTopColor =
    step > 1 ? "var(--gold)" : "var(--line)";

  if (step === 3) {
    document.getElementById("rvName").innerText =
      document.getElementById("buyerName").value || "-";
    document.getElementById("rvPhone").innerText =
      document.getElementById("buyerPhone").value || "-";
    document.getElementById("rvProduct").innerText =
      `Baju ${document.getElementById("itemSize").value || "-"} / ${document.getElementById("itemColor").value || "-"} x${qty}`;
    document.getElementById("rvAddress").innerText =
      document.getElementById("buyerAddress").value || "-";
    const bankSel = document.getElementById("bankSelect");
    const bankLabel =
      bankSel && bankSel.value ? " — " + bankSel.selectedOptions[0].text : "";
    document.getElementById("rvPay").innerText =
      payMethod === "transfer"
        ? "Transfer Bank" + bankLabel
        : payMethod === "cash"
          ? "Cash / Tunai"
          : "-";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitOrder(e) {
  if (e) e.preventDefault();
  document.querySelectorAll(".step").forEach((s) => s.classList.add("done"));
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page4").classList.add("active");
}

updateSummary();
