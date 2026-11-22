// ======================================
// ТІЛАШАР — БОНУС ОЙЫНДАРЫ
// ======================================
const rewardGames = [
  { id: "puzzle", title: "Пазл", bonus: 100, icon: "🧩" },
  { id: "color", title: "Суретті боя", bonus: 150, icon: "🎨" },
  { id: "difference", title: "Айырмашылықты тап", bonus: 200, icon: "🔍" },
  { id: "memory", title: "Есте сақта", bonus: 250, icon: "🧠" },
  { id: "hidden", title: "Жасырын суретті аш", bonus: 300, icon: "🖼️" },
  { id: "balloons", title: "Шарларды жина", bonus: 350, icon: "🎈" }
];
function getGameBonus() {
  try {
    const data = JSON.parse(localStorage.getItem("platformData")) || {};
    return Number(data.bonus || 0);
  } catch {
    return 0;
  }
}
function getGameId(id) {
  const value = String(id).toLowerCase();
  if (value.includes("puzzle") || value.includes("пазл")) return "puzzle";
  if (value.includes("color") || value.includes("боя")) return "color";
  if (value.includes("difference") || value.includes("айырмаш")) return "difference";
  if (value.includes("memory") || value.includes("есте")) return "memory";
  if (value.includes("hidden") || value.includes("жасырын")) return "hidden";
  if (value.includes("balloon") || value.includes("шар")) return "balloons";
  return value;
}
// Ойын терезесін жасау
function createGameWindow(title) {
  let modal = document.getElementById("rewardGameModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rewardGameModal";
    modal.innerHTML = `
      <div class="game-window">
        <button class="game-close" onclick="closeRewardGame()">✕</button>
        <h2 id="gameWindowTitle"></h2>
        <div id="gameWindowContent"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  document.getElementById("gameWindowTitle").textContent = title;
  document.getElementById("gameWindowContent").innerHTML = "";
  modal.style.display = "flex";
}
function closeRewardGame() {
  const modal = document.getElementById("rewardGameModal");
  if (modal) modal.style.display = "none";
}
// Ойынды ашу
function openReward(id) {
  const gameId = getGameId(id);
  const game = rewardGames.find(item => item.id === gameId);
  if (!game) {
    alert("Ойын табылмады!");
    return;
  }
  if (getGameBonus() < game.bonus) {
    alert(
      `Бұл ойынды ашу үшін ${game.bonus} бонус қажет.\nҚазіргі бонусыңыз: ${getGameBonus()}`
    );
    return;
  }
  createGameWindow(game.title);
  if (gameId === "puzzle") startPuzzle();
  if (gameId === "color") startColor();
  if (gameId === "difference") startDifference();
  if (gameId === "memory") startMemory();
  if (gameId === "hidden") startHidden();
  if (gameId === "balloons") startBalloons();
}
// ======================================
// 1. ПАЗЛ
// ======================================
function startPuzzle() {
  const box = document.getElementById("gameWindowContent");
  let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  // Араластыру
  for (let i = 0; i < 100; i++) {
    const empty = tiles.indexOf(0);
    const possible = [
      empty - 3,
      empty + 3,
      empty - 1,
      empty + 1
    ].filter(n => {
      if (n < 0 || n > 8) return false;
      if (Math.floor(n / 3) !== Math.floor(empty / 3) &&
          Math.abs(n - empty) === 1) return false;
      return true;
    });
    const next = possible[Math.floor(Math.random() * possible.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
  }
  box.innerHTML = `
    <p>Сандарды ретімен орналастыр!</p>
    <div id="puzzleBoard" class="puzzle-board"></div>
    <p id="puzzleMessage">Бос ұяшыққа көршілес санды жылжыт.</p>
    <button onclick="startPuzzle()">Қайта бастау</button>
  `;
  function render() {
    const board = document.getElementById("puzzleBoard");
    board.innerHTML = "";
    tiles.forEach((number, index) => {
      const button = document.createElement("button");
      button.className = "puzzle-tile";
      button.textContent = number === 0 ? "" : number;
      button.onclick = () => {
        const empty = tiles.indexOf(0);
        const adjacent =
          Math.abs(index - empty) === 3 ||
          (Math.abs(index - empty) === 1 &&
           Math.floor(index / 3) === Math.floor(empty / 3));
        if (adjacent) {
          [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
          render();
        }
      };
      board.appendChild(button);
    });
    if (tiles.join(",") === "1,2,3,4,5,6,7,8,0") {
      document.getElementById("puzzleMessage").textContent =
        "🎉 Жарайсыз! Пазл құрастырылды!";
    }
  }
  render();
}
// ======================================
// 2. СУРЕТТІ БОЯ
// ======================================
function startColor() {
  const box = document.getElementById("gameWindowContent");
  const colors = ["#ff6b6b", "#ffd166", "#06d6a0", "#4dabf7", "#b197fc"];
  box.innerHTML = `
    <p>Суретті қалаған түспен бояңыз.</p>
    <div class="color-picture">
      <button class="color-part" onclick="paintPart(this)">🌸</button>
      <button class="color-part" onclick="paintPart(this)">🌼</button>
      <button class="color-part" onclick="paintPart(this)">🦋</button>
      <button class="color-part" onclick="paintPart(this)">🌈</button>
      <button class="color-part" onclick="paintPart(this)">☀️</button>
    </div>
    <p>Түс таңдаңыз:</p>
    <div class="color-options">
      ${colors.map(color =>
        `<button style="background:${color}" onclick="selectPaintColor('${color}')"></button>`
      ).join("")}
    </div>
    <p id="colorMessage">Алдымен түс таңдаңыз.</p>
  `;
  window.selectedPaintColor = colors[0];
}
function selectPaintColor(color) {
  window.selectedPaintColor = color;
  document.getElementById("colorMessage").textContent =
    "Түс таңдалды. Енді суретті бояңыз!";
}
function paintPart(element) {
  element.style.background = window.selectedPaintColor;
  element.style.borderRadius = "18px";
  element.style.padding = "12px";
}
// ======================================
// 3. АЙЫРМАШЫЛЫҚТЫ ТАП
// ======================================
function startDifference() {
  const box = document.getElementById("gameWindowContent");
  const questions = [
    { items: ["🍎", "🍐", "🍎", "🍎"], answer: 1 },
    { items: ["🐶", "🐶", "🐱", "🐶"], answer: 2 },
    { items: ["🌸", "🌸", "🌻", "🌸"], answer: 2 },
    { items: ["🚗", "🚗", "🚙", "🚗"], answer: 2 }
  ];
  let index = 0;
  let score = 0;
  function showQuestion() {
    const question = questions[index];
    box.innerHTML = `
      <p>${index + 1}-тапсырма. Өзгеше суретті тап!</p>
      <div class="difference-board">
        ${question.items.map((item, i) =>
          `<button onclick="checkDifference(${i})">${item}</button>`
        ).join("")}
      </div>
      <p id="differenceMessage"></p>
      <p>Ұпай: ${score}</p>
    `;
  }
  window.checkDifference = function (answer) {
    const message = document.getElementById("differenceMessage");
    if (answer === questions[index].answer) {
      score++;
      message.textContent = "Дұрыс жауап! 🌟";
    } else {
      message.textContent = "Қайта ойланып көріңіз.";
      return;
    }
    index++;
    if (index < questions.length) {
      setTimeout(showQuestion, 900);
    } else {
      setTimeout(() => {
        box.innerHTML = `
          <h3>🎉 Ойын аяқталды!</h3>
          <p>Нәтиже: ${score} / ${questions.length}</p>
          <button onclick="startDifference()">Қайта ойнау</button>
        `;
      }, 900);
    }
  };
  showQuestion();
}
// ======================================
// 4. ЕСТЕ САҚТА
// ======================================
function startMemory() {
  const box = document.getElementById("gameWindowContent");
  const symbols = ["🍎", "🐶", "🌸", "🚗", "⭐", "🍎", "🐶", "🌸", "🚗", "⭐"];
  let cards = symbols
    .map((value, index) => ({ value, index }))
    .sort(() => Math.random() - 0.5);
  let opened = [];
  let matched = [];
  box.innerHTML = `
    <p>Бірдей суреттерді жұптастыр!</p>
    <div class="memory-board" id="memoryBoard"></div>
    <p id="memoryMessage">Карточкаларды ашып көріңіз.</p>
  `;
  const board = document.getElementById("memoryBoard");
  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.textContent = "❔";
    button.className = "memory-card";
    button.onclick = () => {
      if (opened.length === 2 ||
          opened.includes(index) ||
          matched.includes(index)) return;
      button.textContent = card.value;
      opened.push(index);
      if (opened.length === 2) {
        const [first, second] = opened;
        if (cards[first].value === cards[second].value) {
          matched.push(first, second);
          opened = [];
          if (matched.length === cards.length) {
            document.getElementById("memoryMessage").textContent =
              "🎉 Барлық жұпты таптыңыз!";
          }
        } else {
          setTimeout(() => {
            board.children[first].textContent = "❔";
            board.children[second].textContent = "❔";
            opened = [];
          }, 800);
        }
      }
    };
    board.appendChild(button);
  });
}
// ======================================
// 5. ЖАСЫРЫН СУРЕТТІ АШ
// ======================================
function startHidden() {
  const box = document.getElementById("gameWindowContent");
  const picture = "🦋";
  let opened = 0;
  box.innerHTML = `
    <p>Барлық ұяшықты ашып, жасырын суретті тап!</p>
    <div class="hidden-board" id="hiddenBoard"></div>
    <p id="hiddenMessage">Ұяшықтарды басыңыз.</p>
  `;
  const board = document.getElementById("hiddenBoard");
  for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    button.textContent = "❔";
    button.onclick = () => {
      if (button.disabled) return;
      button.textContent = picture;
      button.disabled = true;
      opened++;
      if (opened === 9) {
        document.getElementById("hiddenMessage").textContent =
          "🎉 Жасырын сурет ашылды!";
      }
    };
    board.appendChild(button);
  }
}
// ======================================
// 6. ШАРЛАРДЫ ЖИНА
// ======================================
function startBalloons() {
  const box = document.getElementById("gameWindowContent");
  let score = 0;
  let time = 20;
  let timer;
  box.innerHTML = `
    <p>20 секунд ішінде шарларды жина!</p>
    <h3>Уақыт: <span id="balloonTime">20</span></h3>
    <h3>Жиналған шар: <span id="balloonScore">0</span></h3>
    <div id="balloonArea" class="balloon-area"></div>
    <p id="balloonMessage"></p>
  `;
  const area = document.getElementById("balloonArea");
  for (let i = 0; i < 12; i++) {
    const balloon = document.createElement("button");
    balloon.textContent = "🎈";
    balloon.className = "balloon";
    balloon.onclick = () => {
      if (balloon.disabled) return;
      balloon.disabled = true;
      balloon.textContent = "✨";
      score++;
      document.getElementById("balloonScore").textContent = score;
    };
    area.appendChild(balloon);
  }
  timer = setInterval(() => {
    time--;
    document.getElementById("balloonTime").textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("balloonMessage").textContent =
        `Ойын аяқталды! Сіз ${score} шар жинадыңыз. 🎉`;
    }
  }, 1000);
}
// ======================================
// ОЙЫН ТЕРЕЗЕСІНІҢ ДИЗАЙНЫ
// ======================================
const gameStyle = document.createElement("style");
gameStyle.textContent = `
#rewardGameModal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(20, 20, 50, 0.75);
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.game-window {
  position: relative;
  background: white;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 25px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 15px 50px rgba(0,0,0,.2);
}
.game-window h2 {
  color: #6954c9;
  margin-bottom: 20px;
}
.game-close {
  position: absolute;
  right: 15px;
  top: 12px;
  border: none;
  background: #f1edff;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.game-window button {
  cursor: pointer;
}
.puzzle-board,
.memory-board,
.hidden-board {
  display: grid;
  grid-template-columns: repeat(3, 75px);
  gap: 8px;
  justify-content: center;
  margin: 20px auto;
}
.puzzle-tile {
  height: 75px;
  border: none;
  border-radius: 14px;
  background: #e7e0ff;
  color: #5944a9;
  font-size: 25px;
  font-weight: bold;
}
.memory-board {
  grid-template-columns: repeat(5, 55px);
}
.memory-card {
  height: 55px;
  border: none;
  border-radius: 12px;
  background: #e9e4ff;
  font-size: 24px;
}
.difference-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 25px;
}
.difference-board button {
  font-size: 45px;
  border: 2px solid #e4dcff;
  border-radius: 15px;
  background: #faf8ff;
  padding: 12px;
}
.color-picture {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px;
}
.color-part {
  font-size: 45px;
  border: 2px solid #eee;
  background: white;
  cursor: pointer;
}
.color-options {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.color-options button {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
}
.hidden-board {
  grid-template-columns: repeat(3, 65px);
}
.hidden-board button {
  height: 65px;
  border: none;
  border-radius: 12px;
  background: #dcd5ff;
  font-size: 28px;
}
.balloon-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px;
}
.balloon {
  border: none;
  background: #f4efff;
  border-radius: 15px;
  font-size: 35px;
  padding: 12px 4px;
}
.game-window > button:not(.game-close) {
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  margin: 8px;
  background: #7058d5;
  color: white;
}
@media(max-width: 400px) {
  .puzzle-board {
    grid-template-columns: repeat(3, 65px);
  }
  .puzzle-tile {
    height: 65px;
  }
  .memory-board {
    grid-template-columns: repeat(5, 48px);
  }
  .memory-card {
    height: 48px;
  }
}
`;
document.head.appendChild(gameStyle);// ======================================
// ТІЛАШАР — БОНУС ОЙЫНДАРЫ
// ======================================
const rewardGames = [
  { id: "puzzle", title: "Пазл", bonus: 100, icon: "🧩" },
  { id: "color", title: "Суретті боя", bonus: 150, icon: "🎨" },
  { id: "difference", title: "Айырмашылықты тап", bonus: 200, icon: "🔍" },
  { id: "memory", title: "Есте сақта", bonus: 250, icon: "🧠" },
  { id: "hidden", title: "Жасырын суретті аш", bonus: 300, icon: "🖼️" },
  { id: "balloons", title: "Шарларды жина", bonus: 350, icon: "🎈" }
];
function getGameBonus() {
  try {
    const data = JSON.parse(localStorage.getItem("platformData")) || {};
    return Number(data.bonus || 0);
  } catch {
    return 0;
  }
}
function getGameId(id) {
  const value = String(id).toLowerCase();
  if (value.includes("puzzle") || value.includes("пазл")) return "puzzle";
  if (value.includes("color") || value.includes("боя")) return "color";
  if (value.includes("difference") || value.includes("айырмаш")) return "difference";
  if (value.includes("memory") || value.includes("есте")) return "memory";
  if (value.includes("hidden") || value.includes("жасырын")) return "hidden";
  if (value.includes("balloon") || value.includes("шар")) return "balloons";
  return value;
}
// Ойын терезесін жасау
function createGameWindow(title) {
  let modal = document.getElementById("rewardGameModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rewardGameModal";
    modal.innerHTML = `
      <div class="game-window">
        <button class="game-close" onclick="closeRewardGame()">✕</button>
        <h2 id="gameWindowTitle"></h2>
        <div id="gameWindowContent"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  document.getElementById("gameWindowTitle").textContent = title;
  document.getElementById("gameWindowContent").innerHTML = "";
  modal.style.display = "flex";
}
function closeRewardGame() {
  const modal = document.getElementById("rewardGameModal");
  if (modal) modal.style.display = "none";
}
// Ойынды ашу
function openReward(id) {
  const gameId = getGameId(id);
  const game = rewardGames.find(item => item.id === gameId);
  if (!game) {
    alert("Ойын табылмады!");
    return;
  }
  if (getGameBonus() < game.bonus) {
    alert(
      `Бұл ойынды ашу үшін ${game.bonus} бонус қажет.\nҚазіргі бонусыңыз: ${getGameBonus()}`
    );
    return;
  }
  createGameWindow(game.title);
  if (gameId === "puzzle") startPuzzle();
  if (gameId === "color") startColor();
  if (gameId === "difference") startDifference();
  if (gameId === "memory") startMemory();
  if (gameId === "hidden") startHidden();
  if (gameId === "balloons") startBalloons();
}
// ======================================
// 1. ПАЗЛ
// ======================================
function startPuzzle() {
  const box = document.getElementById("gameWindowContent");
  let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  // Араластыру
  for (let i = 0; i < 100; i++) {
    const empty = tiles.indexOf(0);
    const possible = [
      empty - 3,
      empty + 3,
      empty - 1,
      empty + 1
    ].filter(n => {
      if (n < 0 || n > 8) return false;
      if (Math.floor(n / 3) !== Math.floor(empty / 3) &&
          Math.abs(n - empty) === 1) return false;
      return true;
    });
    const next = possible[Math.floor(Math.random() * possible.length)];
    [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
  }
  box.innerHTML = `
    <p>Сандарды ретімен орналастыр!</p>
    <div id="puzzleBoard" class="puzzle-board"></div>
    <p id="puzzleMessage">Бос ұяшыққа көршілес санды жылжыт.</p>
    <button onclick="startPuzzle()">Қайта бастау</button>
  `;
  function render() {
    const board = document.getElementById("puzzleBoard");
    board.innerHTML = "";
    tiles.forEach((number, index) => {
      const button = document.createElement("button");
      button.className = "puzzle-tile";
      button.textContent = number === 0 ? "" : number;
      button.onclick = () => {
        const empty = tiles.indexOf(0);
        const adjacent =
          Math.abs(index - empty) === 3 ||
          (Math.abs(index - empty) === 1 &&
           Math.floor(index / 3) === Math.floor(empty / 3));
        if (adjacent) {
          [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
          render();
        }
      };
      board.appendChild(button);
    });
    if (tiles.join(",") === "1,2,3,4,5,6,7,8,0") {
      document.getElementById("puzzleMessage").textContent =
        "🎉 Жарайсыз! Пазл құрастырылды!";
    }
  }
  render();
}
// ======================================
// 2. СУРЕТТІ БОЯ
// ======================================
function startColor() {
  const box = document.getElementById("gameWindowContent");
  const colors = ["#ff6b6b", "#ffd166", "#06d6a0", "#4dabf7", "#b197fc"];
  box.innerHTML = `
    <p>Суретті қалаған түспен бояңыз.</p>
    <div class="color-picture">
      <button class="color-part" onclick="paintPart(this)">🌸</button>
      <button class="color-part" onclick="paintPart(this)">🌼</button>
      <button class="color-part" onclick="paintPart(this)">🦋</button>
      <button class="color-part" onclick="paintPart(this)">🌈</button>
      <button class="color-part" onclick="paintPart(this)">☀️</button>
    </div>
    <p>Түс таңдаңыз:</p>
    <div class="color-options">
      ${colors.map(color =>
        `<button style="background:${color}" onclick="selectPaintColor('${color}')"></button>`
      ).join("")}
    </div>
    <p id="colorMessage">Алдымен түс таңдаңыз.</p>
  `;
  window.selectedPaintColor = colors[0];
}
function selectPaintColor(color) {
  window.selectedPaintColor = color;
  document.getElementById("colorMessage").textContent =
    "Түс таңдалды. Енді суретті бояңыз!";
}
function paintPart(element) {
  element.style.background = window.selectedPaintColor;
  element.style.borderRadius = "18px";
  element.style.padding = "12px";
}
// ======================================
// 3. АЙЫРМАШЫЛЫҚТЫ ТАП
// ======================================
function startDifference() {
  const box = document.getElementById("gameWindowContent");
  const questions = [
    { items: ["🍎", "🍐", "🍎", "🍎"], answer: 1 },
    { items: ["🐶", "🐶", "🐱", "🐶"], answer: 2 },
    { items: ["🌸", "🌸", "🌻", "🌸"], answer: 2 },
    { items: ["🚗", "🚗", "🚙", "🚗"], answer: 2 }
  ];
  let index = 0;
  let score = 0;
  function showQuestion() {
    const question = questions[index];
    box.innerHTML = `
      <p>${index + 1}-тапсырма. Өзгеше суретті тап!</p>
      <div class="difference-board">
        ${question.items.map((item, i) =>
          `<button onclick="checkDifference(${i})">${item}</button>`
        ).join("")}
      </div>
      <p id="differenceMessage"></p>
      <p>Ұпай: ${score}</p>
    `;
  }
  window.checkDifference = function (answer) {
    const message = document.getElementById("differenceMessage");
    if (answer === questions[index].answer) {
      score++;
      message.textContent = "Дұрыс жауап! 🌟";
    } else {
      message.textContent = "Қайта ойланып көріңіз.";
      return;
    }
    index++;
    if (index < questions.length) {
      setTimeout(showQuestion, 900);
    } else {
      setTimeout(() => {
        box.innerHTML = `
          <h3>🎉 Ойын аяқталды!</h3>
          <p>Нәтиже: ${score} / ${questions.length}</p>
          <button onclick="startDifference()">Қайта ойнау</button>
        `;
      }, 900);
    }
  };
  showQuestion();
}
// ======================================
// 4. ЕСТЕ САҚТА
// ======================================
function startMemory() {
  const box = document.getElementById("gameWindowContent");
  const symbols = ["🍎", "🐶", "🌸", "🚗", "⭐", "🍎", "🐶", "🌸", "🚗", "⭐"];
  let cards = symbols
    .map((value, index) => ({ value, index }))
    .sort(() => Math.random() - 0.5);
  let opened = [];
  let matched = [];
  box.innerHTML = `
    <p>Бірдей суреттерді жұптастыр!</p>
    <div class="memory-board" id="memoryBoard"></div>
    <p id="memoryMessage">Карточкаларды ашып көріңіз.</p>
  `;
  const board = document.getElementById("memoryBoard");
  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.textContent = "❔";
    button.className = "memory-card";
    button.onclick = () => {
      if (opened.length === 2 ||
          opened.includes(index) ||
          matched.includes(index)) return;
      button.textContent = card.value;
      opened.push(index);
      if (opened.length === 2) {
        const [first, second] = opened;
        if (cards[first].value === cards[second].value) {
          matched.push(first, second);
          opened = [];
          if (matched.length === cards.length) {
            document.getElementById("memoryMessage").textContent =
              "🎉 Барлық жұпты таптыңыз!";
          }
        } else {
          setTimeout(() => {
            board.children[first].textContent = "❔";
            board.children[second].textContent = "❔";
            opened = [];
          }, 800);
        }
      }
    };
    board.appendChild(button);
  });
}
// ======================================
// 5. ЖАСЫРЫН СУРЕТТІ АШ
// ======================================
function startHidden() {
  const box = document.getElementById("gameWindowContent");
  const picture = "🦋";
  let opened = 0;
  box.innerHTML = `
    <p>Барлық ұяшықты ашып, жасырын суретті тап!</p>
    <div class="hidden-board" id="hiddenBoard"></div>
    <p id="hiddenMessage">Ұяшықтарды басыңыз.</p>
  `;
  const board = document.getElementById("hiddenBoard");
  for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    button.textContent = "❔";
    button.onclick = () => {
      if (button.disabled) return;
      button.textContent = picture;
      button.disabled = true;
      opened++;
      if (opened === 9) {
        document.getElementById("hiddenMessage").textContent =
          "🎉 Жасырын сурет ашылды!";
      }
    };
    board.appendChild(button);
  }
}
// ======================================
// 6. ШАРЛАРДЫ ЖИНА
// ======================================
function startBalloons() {
  const box = document.getElementById("gameWindowContent");
  let score = 0;
  let time = 20;
  let timer;
  box.innerHTML = `
    <p>20 секунд ішінде шарларды жина!</p>
    <h3>Уақыт: <span id="balloonTime">20</span></h3>
    <h3>Жиналған шар: <span id="balloonScore">0</span></h3>
    <div id="balloonArea" class="balloon-area"></div>
    <p id="balloonMessage"></p>
  `;
  const area = document.getElementById("balloonArea");
  for (let i = 0; i < 12; i++) {
    const balloon = document.createElement("button");
    balloon.textContent = "🎈";
    balloon.className = "balloon";
    balloon.onclick = () => {
      if (balloon.disabled) return;
      balloon.disabled = true;
      balloon.textContent = "✨";
      score++;
      document.getElementById("balloonScore").textContent = score;
    };
    area.appendChild(balloon);
  }
  timer = setInterval(() => {
    time--;
    document.getElementById("balloonTime").textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("balloonMessage").textContent =
        `Ойын аяқталды! Сіз ${score} шар жинадыңыз. 🎉`;
    }
  }, 1000);
}
// ======================================
// ОЙЫН ТЕРЕЗЕСІНІҢ ДИЗАЙНЫ
// ======================================
const gameStyle = document.createElement("style");
gameStyle.textContent = `
#rewardGameModal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(20, 20, 50, 0.75);
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.game-window {
  position: relative;
  background: white;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 25px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 15px 50px rgba(0,0,0,.2);
}
.game-window h2 {
  color: #6954c9;
  margin-bottom: 20px;
}
.game-close {
  position: absolute;
  right: 15px;
  top: 12px;
  border: none;
  background: #f1edff;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.game-window button {
  cursor: pointer;
}
.puzzle-board,
.memory-board,
.hidden-board {
  display: grid;
  grid-template-columns: repeat(3, 75px);
  gap: 8px;
  justify-content: center;
  margin: 20px auto;
}
.puzzle-tile {
  height: 75px;
  border: none;
  border-radius: 14px;
  background: #e7e0ff;
  color: #5944a9;
  font-size: 25px;
  font-weight: bold;
}
.memory-board {
  grid-template-columns: repeat(5, 55px);
}
.memory-card {
  height: 55px;
  border: none;
  border-radius: 12px;
  background: #e9e4ff;
  font-size: 24px;
}
.difference-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 25px;
}
.difference-board button {
  font-size: 45px;
  border: 2px solid #e4dcff;
  border-radius: 15px;
  background: #faf8ff;
  padding: 12px;
}
.color-picture {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px;
}
.color-part {
  font-size: 45px;
  border: 2px solid #eee;
  background: white;
  cursor: pointer;
}
.color-options {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.color-options button {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
}
.hidden-board {
  grid-template-columns: repeat(3, 65px);
}
.hidden-board button {
  height: 65px;
  border: none;
  border-radius: 12px;
  background: #dcd5ff;
  font-size: 28px;
}
.balloon-area {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px;
}
.balloon {
  border: none;
  background: #f4efff;
  border-radius: 15px;
  font-size: 35px;
  padding: 12px 4px;
}
.game-window > button:not(.game-close) {
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  margin: 8px;
  background: #7058d5;
  color: white;
}
@media(max-width: 400px) {
  .puzzle-board {
    grid-template-columns: repeat(3, 65px);
  }
  .puzzle-tile {
    height: 65px;
  }
  .memory-board {
    grid-template-columns: repeat(5, 48px);
  }
  .memory-card {
    height: 48px;
  }
}
`;
document.head.appendChild(gameStyle);
