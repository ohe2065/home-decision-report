const ids = ["name", "contact", "workplace", "currentArea", "stage", "budgetMin", "budgetMax", "transit", "area", "family", "candidates", "question"];
const labels = {
  name: "이름/닉네임",
  contact: "이메일/연락처",
  workplace: "직장 위치",
  currentArea: "현재 거주 지역",
  stage: "현재 고민 단계",
  budgetMin: "희망 매수가격 최소",
  budgetMax: "희망 매수가격 최대",
  transit: "대중교통 최대 허용",
  area: "희망 전용면적",
  family: "가족/거주 계획",
  candidates: "관심 지역/단지/링크",
  question: "이번 분석에서 가장 궁금한 점",
};

const selectedPriorities = [];
const summary = document.getElementById("summary");
const copyBtn = document.getElementById("copyBtn");
const copyState = document.getElementById("copyState");

const valueOf = (id) => {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
};

const render = () => {
  if (!summary) return;
  const rows = ids
    .map((id) => [labels[id], valueOf(id)])
    .filter(([, value]) => value);
  if (selectedPriorities.length) rows.splice(9, 0, ["우선순위", selectedPriorities.join(", ")]);
  summary.textContent = rows.length
    ? rows.map(([key, value]) => `[${key}]\n${value}`).join("\n\n")
    : "작성한 내용이 여기에 정리됩니다.";
};

ids.forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", render);
});

document.querySelectorAll(".pill").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();
    const index = selectedPriorities.indexOf(value);
    if (index >= 0) {
      selectedPriorities.splice(index, 1);
      button.classList.remove("active");
    } else if (selectedPriorities.length < 3) {
      selectedPriorities.push(value);
      button.classList.add("active");
    }
    render();
  });
});

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(summary.textContent);
    copyState.hidden = false;
  });
}

render();
