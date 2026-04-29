// Single source of truth for filters & state
const state = {
  filters: { grain: false, grid: false, blur: 0, tint: false },
};

// Elements
const userImage = document.getElementById("user-image");
const grainEl = document.getElementById("filter-grain");
const gridEl = document.getElementById("filter-grid");
const tintEl = document.getElementById("filter-tint");
const badgeText = document.getElementById("badge-text");

// Controls
const btnGrain = document.getElementById("btn-grain");
const btnGrid = document.getElementById("btn-grid");
const btnBlur = document.getElementById("btn-blur");
const btnTint = document.getElementById("btn-tint");
const blurRange = document.getElementById("blur-range");
const blurValue = document.getElementById("blur-value");

// Wire up toggles
btnGrain.addEventListener("click", () => toggleFilter("grain"));
btnGrid.addEventListener("click", () => toggleFilter("grid"));
btnBlur.addEventListener("click", () => toggleFilter("blur"));
btnTint.addEventListener("click", () => toggleFilter("tint"));

// Toggle function
function toggleFilter(name) {
  if (name === "blur") {
    // toggling blur to/from 0
    state.filters.blur = state.filters.blur > 0 ? 0 : 3; // reasonable default on toggle
    blurRange.value = state.filters.blur;
    blurValue.textContent = state.filters.blur;
    updateMotionBlur(state.filters.blur);
  } else {
    state.filters[name] = !state.filters[name];
  }
  applyFilters();
  updateButtonVisuals();
}

// Blur slider
blurRange.addEventListener("input", (e) => {
  const v = parseInt(e.target.value, 10) || 0;
  state.filters.blur = v;
  blurValue.textContent = v;
  updateMotionBlur(v);
  applyFilters();
  updateButtonVisuals();
});

function updateMotionBlur(v) {
  const fe = document.querySelector("#motion-blur feGaussianBlur");
  if (fe) fe.setAttribute("stdDeviation", `${v * 2} 0`);
}

function applyFilters() {
  // base aggressive color grading is applied via CSS on .base-image; add motion-blur filter if blur>0 using url(#motion-blur)
  let filter = "brightness(.7) contrast(1.6) saturate(2.2)";
  if (state.filters.blur > 0) filter += " url(#motion-blur)";
  userImage.style.filter = filter;

  // overlays
  grainEl.classList.toggle("hidden", !state.filters.grain);
  gridEl.classList.toggle("hidden", !state.filters.grid);
  tintEl.classList.toggle("hidden", !state.filters.tint);
}

function updateButtonVisuals() {
  btnGrain.classList.toggle("active", state.filters.grain);
  btnGrid.classList.toggle("active", state.filters.grid);
  btnTint.classList.toggle("active", state.filters.tint);
  btnBlur.classList.toggle("active", state.filters.blur > 0);
}

// Update card text & badge
function updateCard() {
  document.getElementById("display-name").textContent = (
    document.getElementById("name-input").value || ""
  ).toUpperCase();
  document.getElementById("display-event").textContent = (
    document.getElementById("event-input").value || ""
  ).toUpperCase();
  const date = (
    document.getElementById("event-date-input").value || ""
  ).toUpperCase();
  const city = (
    document.getElementById("event-city-input").value || ""
  ).toUpperCase();
  document.getElementById("display-event-details").textContent = [date, city]
    .filter(Boolean)
    .join(" • ");
  document.getElementById("display-score").textContent =
    document.getElementById("score-input").value || "";
  document.getElementById("display-result").textContent =
    document.getElementById("result-input").value || "WINNER!";
  const won =
    parseInt(document.getElementById("matches-won-input").value, 10) || 0;
  const tot = Math.max(
    1,
    parseInt(document.getElementById("matches-total-input").value, 10) ||
      1,
  );
  badgeText.textContent = `${won}/${tot}`;
}

// File upload
document.getElementById("upload").addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = (ev) => {
    userImage.src = ev.target.result;
  };
  r.readAsDataURL(f);
});

// Inputs change listeners
[
  "name-input",
  "event-input",
  "event-date-input",
  "event-city-input",
  "score-input",
  "result-input",
  "matches-won-input",
  "matches-total-input",
].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", updateCard);
  el.addEventListener("change", updateCard);
});

// Init defaults
updateMotionBlur(0);
applyFilters();
updateButtonVisuals();
updateCard();
