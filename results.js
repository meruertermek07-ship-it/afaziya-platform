// ======================================
// ТІЛАШАР — НӘТИЖЕЛЕР ЖӘНЕ ДИНАМИКА
// ======================================
function getResultsData() {
  try {
    return JSON.parse(localStorage.getItem("platformData")) || {
      bonus: 0,
      completed: [],
      attempts: {},
      scores: {},
      initialResults: null
    };
  } catch {
    return {
      bonus: 0,
      completed: [],
      attempts: {},
      scores: {},
      initialResults: null
    };
  }
}
// Барлық тапсырмаларды жинау
function getAllTasks() {
  const result = [];
  if (typeof sections === "undefined") return result;
  Object.entries(sections).forEach(([sectionId, section]) => {
    const tasks = section.tasks || [];
    tasks.forEach((task, index) => {
      result.push({
        sectionId,
        sectionTitle: section.title || sectionId,
        id: task.id || `${sectionId}_${index}`,
        title: task.title || task.name || `Тапсырма ${index + 1}`
      });
    });
  });
  return result;
}
// Нәтижені есептеу
function calculateResults() {
  const data = getResultsData();
  const tasks = getAllTasks();
  const completed = data.completed || [];
  const scores = data.scores || {};
  const completedCount = tasks.filter(task =>
    completed.includes(task.id)
  ).length;
  const notCompleted = Math.max(0, tasks.length - completedCount);
  const scoreValues = Object.values(scores)
    .map(Number)
    .filter(score => !isNaN(score));
  const totalScore = scoreValues.reduce((sum, score) => sum + score, 0);
  const maxScore = completedCount * 3;
  const percentage = maxScore
    ? Math.round((totalScore / maxScore) * 100)
    : 0;
  return {
    totalTasks: tasks.length,
    completedCount,
    notCompleted,
    bonus: data.bonus || 0,
    totalScore,
    maxScore,
    percentage,
    tasks,
    scores
  };
}
// Нәтижелерді экранға шығару
function renderDetailedResults() {
  const page = document.getElementById("resultsPage");
  if (!page) return;
  let container = document.getElementById("detailedResults");
  if (!container) {
    container = document.createElement("div");
    container.id = "detailedResults";
    page.appendChild(container);
  }
  const result = calculateResults();
  const data = getResultsData();
  container.innerHTML = `
    <div class="result-header">
      <h2>📊 Жеке нәтижелер</h2>
      <p>Түзету-дамыту бағдарламасының орындалу көрсеткіштері</p>
    </div>
    <div class="result-stat-grid">
      <div class="result-stat">
        <span>📚</span>
        <h3>${result.totalTasks}</h3>
        <p>Барлық тапсырма</p>
      </div>
      <div class="result-stat">
        <span>✅</span>
        <h3>${result.completedCount}</h3>
        <p>Орындалған</p>
      </div>
      <div class="result-stat">
        <span>⏳</span>
        <h3>${result.notCompleted}</h3>
        <p>Орындалмаған</p>
      </div>
      <div class="result-stat">
        <span>🎁</span>
        <h3>${result.bonus}</h3>
        <p>Жиналған бонус</p>
      </div>
    </div>
    <div class="result-panel">
      <h3>📈 Жалпы орындалу көрсеткіші</h3>
      <div class="result-progress">
        <div style="width:${
          result.totalTasks
            ? result.completedCount / result.totalTasks * 100
            : 0
        }%"></div>
      </div>
      <h2>
        ${
          result.totalTasks
            ? Math.round(result.completedCount / result.totalTasks * 100)
            : 0
        }%
      </h2>
      <p>
        ${result.completedCount} / ${result.totalTasks} тапсырма орындалды
      </p>
    </div>
    <div class="result-panel">
      <h3>⭐ Балл көрсеткіші</h3>
      <h2>${result.totalScore} / ${result.maxScore}</h2>
      <div class="result-progress">
        <div style="width:${result.percentage}%"></div>
      </div>
      <p>Жиналған балл: ${result.totalScore}</p>
      <p>Мүмкін болған балл: ${result.maxScore}</p>
      <small>
        Әр тапсырма 0–3 балл аралығында бағаланады.
      </small>
    </div>
    <div class="result-panel">
      <h3>📝 Тапсырмалар бойынша нәтиже</h3>
      <div class="result-table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              <th>Тапсырма</th>
              <th>Мәртебесі</th>
              <th>Балл</th>
            </tr>
          </thead>
          <tbody>
            ${result.tasks.map(task => {
              const done = (data.completed || []).includes(task.id);
              const score = result.scores[task.id];
              return `
                <tr>
                  <td>
                    <strong>${task.title}</strong>
                    <small>${task.sectionTitle}</small>
                  </td>
                  <td>
                    ${done
                      ? '<span class="result-done">Орындалды</span>'
                      : '<span class="result-pending">Орындалмады</span>'
                    }
                  </td>
                  <td>${done && score !== undefined ? score + " / 3" : "—"}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
    <div class="result-panel">
      <h3>📊 Бастапқы және қорытынды нәтиже</h3>
      <p>
        Бастапқы нәтиже:
        <strong>
          ${data.initialResults
            ? data.initialResults.percentage + "%"
            : "Әзірге сақталмаған"}
        </strong>
      </p>
      <p>
        Қазіргі нәтиже:
        <strong>${result.percentage}%</strong>
      </p>
      <button class="result-action" onclick="saveInitialResults()">
        Бастапқы нәтижені сақтау
      </button>
      <button class="result-action" onclick="saveFinalResults()">
        Қорытынды нәтижені сақтау
      </button>
      <div id="dynamicResultMessage"></div>
    </div>
    <div class="result-panel">
      <h3>🎁 Бонус арқылы ашылатын ойындар</h3>
      <p>Қазіргі бонус: ${result.bonus}</p>
      <div id="resultRewardList"></div>
    </div>
  `;
  renderResultRewards();
}
// Бастапқы нәтижені сақтау
function saveInitialResults() {
  const data = getResultsData();
  if (data.initialResults) {
    if (!confirm("Бастапқы нәтиже бұрын сақталған. Жаңартқыңыз келе ме?")) {
      return;
    }
  }
  const result = calculateResults();
  data.initialResults = {
    percentage: result.percentage,
    completedCount: result.completedCount,
    totalScore: result.totalScore,
    date: new Date().toLocaleDateString("kk-KZ")
  };
  localStorage.setItem("platformData", JSON.stringify(data));
  renderDetailedResults();
  alert("Бастапқы нәтиже сақталды!");
}
// Қорытынды нәтижені сақтау
function saveFinalResults() {
  const data = getResultsData();
  const result = calculateResults();
  data.finalResults = {
    percentage: result.percentage,
    completedCount: result.completedCount,
    totalScore: result.totalScore,
    bonus: result.bonus,
    date: new Date().toLocaleDateString("kk-KZ")
  };
  localStorage.setItem("platformData", JSON.stringify(data));
  renderDetailedResults();
  alert("Қорытынды нәтиже сақталды!");
}
// Бонус ойындарының мәртебесі
function renderResultRewards() {
  const box = document.getElementById("resultRewardList");
  if (!box) return;
  const bonus = getResultsData().bonus || 0;
  const games = [
    ["🧩", "Пазл", 100],
    ["🎨", "Суретті боя", 150],
    ["🔍", "Айырмашылықты тап", 200],
    ["🧠", "Есте сақта", 250],
    ["🖼️", "Жасырын суретті аш", 300],
    ["🎈", "Шарларды жина", 350]
  ];
  box.innerHTML = games.map(game => `
    <div class="result-reward-item">
      <span>${game[0]} ${game[1]}</span>
      <strong>
        ${bonus >= game[2] ? "🔓 Ашық" : "🔒 " + game[2] + " бонус"}
      </strong>
      ${
        bonus >= game[2]
          ? `<button onclick="openReward('${game[1]}')">Ойнау</button>`
          : ""
      }
    </div>
  `).join("");
}
// Бұрынғы нәтижелер функциясын сақтау
const previousOpenResults = window.openResults;
window.openResults = function() {
  if (typeof previousOpenResults === "function") {
    previousOpenResults();
  }
  renderDetailedResults();
};
// Бонус өзгерген кезде нәтижені жаңарту
window.addEventListener("storage", function() {
  renderDetailedResults();
});
// Бастапқы стильдер
const resultsStyle = document.createElement("style");
resultsStyle.textContent = `
#detailedResults {
  padding: 20px 0;
  color: #302b45;
}
.result-header {
  text-align: center;
  margin: 20px 0;
}
.result-header h2 {
  color: #6651c8;
}
.result-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 20px 0;
}
.result-stat {
  background: white;
  padding: 20px 10px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(70,50,130,.08);
}
.result-stat span {
  font-size: 28px;
}
.result-stat h3 {
  font-size: 25px;
  color: #6954c9;
  margin: 8px 0;
}
.result-stat p {
  font-size: 13px;
}
.result-panel {
  background: white;
  padding: 22px;
  border-radius: 20px;
  margin: 18px 0;
  box-shadow: 0 5px 20px rgba(70,50,130,.07);
}
.result-progress {
  width: 100%;
  height: 13px;
  background: #eeeafb;
  border-radius: 20px;
  overflow: hidden;
  margin: 15px 0;
}
.result-progress div {
  height: 100%;
  background: linear-gradient(90deg,#8a6de9,#55c9d5);
  border-radius: 20px;
}
.result-table-wrap {
  overflow-x: auto;
}
.result-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 420px;
}
.result-table th,
.result-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.result-table td small {
  display: block;
  color: #888;
  margin-top: 5px;
}
.result-done {
  color: #159b70;
  font-weight: bold;
}
.result-pending {
  color: #d28b32;
  font-weight: bold;
}
.result-action,
.result-reward-item button {
  border: none;
  border-radius: 10px;
  padding: 11px 15px;
  margin: 6px;
  background: #7058d5;
  color: white;
  cursor: pointer;
}
.result-reward-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 13px 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}
.result-reward-item strong {
  color: #7058d5;
}
@media(max-width:600px) {
  .result-stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .result-panel {
    padding: 15px;
  }
  .result-reward-item {
    align-items: flex-start;
  }
}
`;
document.head.appendChild(resultsStyle);
