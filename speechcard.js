// ==========================================
// «ТІЛАШАР» ЭЛЕКТРОНДЫ СӨЙЛЕУ КАРТАСЫ
// Афазиясы бар ересектерге арналған
// ==========================================
function getSpeechCardData() {
  const data = JSON.parse(localStorage.getItem("platformData") || "{}");
  return data.speechCard || {};
}
function saveSpeechCardData(card) {
  const data = JSON.parse(localStorage.getItem("platformData") || "{}");
  data.speechCard = card;
  localStorage.setItem("platformData", JSON.stringify(data));
}
function renderSpeechCard() {
  const container = document.getElementById("speechCardContainer");
  if (!container) {
    alert("speechCardContainer элементі табылмады!");
    return;
  }
  const card = getSpeechCardData();
  container.innerHTML = `
    <div class="sc-header">
      <span class="sc-label">ТІЛАШАР | ЛОГОПЕДИЯЛЫҚ КАБИНЕТ</span>
      <h2>Электронды сөйлеу картасы</h2>
      <p>Афазиясы бар ересектердің сөйлеу дағдыларын бақылау парағы</p>
    </div>
    <form id="speechCardForm">
      <!-- 1. ЖЕКЕ МӘЛІМЕТТЕР -->
      <section class="sc-section">
        <h3>1. Жеке мәліметтер</h3>
        <div class="sc-grid">
          <label>Аты-жөні
            <input name="fullName" value="${escapeCard(card.fullName)}" placeholder="Аты-жөнін енгізіңіз">
          </label>
          <label>Жасы
            <input name="age" type="number" min="18" value="${escapeCard(card.age)}">
          </label>
          <label>Тексеру күні
            <input name="date" type="date" value="${escapeCard(card.date)}">
          </label>
          <label>Логопедтің аты-жөні
            <input name="logoped" value="${escapeCard(card.logoped)}">
          </label>
          <label>Бұзылыстың басталған уақыты
            <input name="onset" value="${escapeCard(card.onset)}" placeholder="Мысалы: 2025 жыл">
          </label>
          <label>Бұрын жүргізілген түзету жұмысы
            <input name="previousWork" value="${escapeCard(card.previousWork)}">
          </label>
        </div>
      </section>
      <!-- 2. ЖАЛПЫ БАҚЫЛАУ -->
      <section class="sc-section">
        <h3>2. Жалпы бақылау</h3>
        ${makeSelect("communication", "Қарым-қатынасқа түсуі", [
          "Белсенді",
          "Қосымша ынталандыру қажет",
          "Шектеулі"
        ], card.communication)}
        ${makeSelect("instruction", "Нұсқауды қабылдауы", [
          "Өздігінен орындайды",
          "Қайталаудан кейін орындайды",
          "Көмекпен орындайды",
          "Қиындық байқалады"
        ], card.instruction)}
        ${makeSelect("participation", "Тапсырмаға қатысуы", [
          "Белсенді",
          "Орташа",
          "Тұрақсыз"
        ], card.participation)}
        ${makeSelect("fatigue", "Шаршағыштығы", [
          "Байқалмайды",
          "Аздап байқалады",
          "Айқын байқалады"
        ], card.fatigue)}
        <label>Қосымша ескертпе
          <textarea name="generalNote">${escapeCard(card.generalNote)}</textarea>
        </label>
      </section>
      <!-- 3. СӨЙЛЕУ ДАҒДЫЛАРЫ -->
      <section class="sc-section">
        <h3>3. Сөйлеу дағдыларын бағалау</h3>
        <p class="sc-hint">
          Әр көрсеткішті 0–3 балл аралығында бағалаңыз.
        </p>
        ${makeRating("understanding", "Сөйлеуді түсіну", card)}
        ${makeRating("vocabulary", "Сөздік қоры және заттарды атау", card)}
        ${makeRating("speech", "Ауызша сөйлеу", card)}
        ${makeRating("repetition", "Сөздер мен сөйлемдерді қайталау", card)}
        ${makeRating("reading", "Оқу дағдысы", card)}
        ${makeRating("writing", "Жазу дағдысы", card)}
      </section>
      <!-- 4. ҚАРЫМ-ҚАТЫНАС ТӘСІЛДЕРІ -->
      <section class="sc-section">
        <h3>4. Қарым-қатынас тәсілдері</h3>
        ${makeCheckbox("oral", "Ауызша сөйлеу", card)}
        ${makeCheckbox("gesture", "Ым-ишара", card)}
        ${makeCheckbox("writingMethod", "Жазу арқылы", card)}
        ${makeCheckbox("pictures", "Суреттер арқылы", card)}
        ${makeCheckbox("board", "Коммуникативтік тақта", card)}
      </section>
      <!-- 5. ҚОСЫМША БАҚЫЛАУ -->
      <section class="sc-section">
        <h3>5. Қосымша бақылау</h3>
        ${makeSelect("pronunciation", "Дыбыс айту ерекшелігі", [
          "Ерекшелік байқалмайды",
          "Қиындық байқалады",
          "Қосымша тексеру қажет"
        ], card.pronunciation)}
        ${makeSelect("tempo", "Сөйлеу қарқыны", [
          "Қалыпты",
          "Баяу",
          "Жылдам",
          "Тұрақсыз"
        ], card.tempo)}
        ${makeSelect("voice", "Дауыс ерекшелігі", [
          "Қалыпты",
          "Әлсіз",
          "Қарлығыңқы",
          "Тұрақсыз"
        ], card.voice)}
        ${makeSelect("movement", "Қимыл-қозғалыс ерекшелігі", [
          "Ерекшелік байқалмайды",
          "Қозғалыс үйлесімінде қиындық бар",
          "Қосымша бақылау қажет"
        ], card.movement)}
        ${makeSelect("breathing", "Тыныс алу мен сөйлеуді үйлестіру", [
          "Үйлесімді",
          "Ішінара үйлеседі",
          "Қиындық байқалады"
        ], card.breathing)}
      </section>
      <!-- 6. ҚОРЫТЫНДЫ -->
      <section class="sc-section">
        <h3>6. Логопедиялық қорытынды</h3>
        <label>Сақталған дағдылар
          <textarea name="preserved">${escapeCard(card.preserved)}</textarea>
        </label>
        <label>Қиындықтар
          <textarea name="difficulties">${escapeCard(card.difficulties)}</textarea>
        </label>
        <label>Түзету жұмысының негізгі бағыттары
          <textarea name="directions">${escapeCard(card.directions)}</textarea>
        </label>
        <label>Ұсыныстар
          <textarea name="recommendations">${escapeCard(card.recommendations)}</textarea>
        </label>
        <label>Қорытынды
          <textarea name="conclusion">${escapeCard(card.conclusion)}</textarea>
        </label>
      </section>
      <!-- 7. ДАМУ ДИНАМИКАСЫ -->
      <section class="sc-section">
        <h3>7. Даму динамикасы</h3>
        <div class="sc-grid">
          <label>Бастапқы тексеру күні
            <input type="date" name="initialDate" value="${escapeCard(card.initialDate)}">
          </label>
          <label>Аралық тексеру күні
            <input type="date" name="middleDate" value="${escapeCard(card.middleDate)}">
          </label>
          <label>Қорытынды тексеру күні
            <input type="date" name="finalDate" value="${escapeCard(card.finalDate)}">
          </label>
        </div>
        <label>Бастапқы бақылау нәтижесі
          <textarea name="initialNote">${escapeCard(card.initialNote)}</textarea>
        </label>
        <label>Аралық бақылау нәтижесі
          <textarea name="middleNote">${escapeCard(card.middleNote)}</textarea>
        </label>
        <label>Қорытынды бақылау нәтижесі
          <textarea name="finalNote">${escapeCard(card.finalNote)}</textarea>
        </label>
      </section>
      <!-- БАСҚАРУ БАТЫРМАЛАРЫ -->
      <div class="sc-actions">
        <button type="button" onclick="saveSpeechCardForm()">
          💾 Сақтау
        </button>
        <button type="button" onclick="printSpeechCard()">
          🖨️ Басып шығару
        </button>
        <button type="button" onclick="resetSpeechCardForm()">
          Жаңа карта
        </button>
      </div>
      <p id="speechCardMessage"></p>
    </form>
  `;
  document.getElementById("speechCardForm").addEventListener("change", () => {
    document.getElementById("speechCardMessage").textContent =
      "Өзгерістер енгізілді. Сақтау батырмасын басыңыз.";
  });
}
// HTML-ге қауіпсіз мәтін енгізу
function escapeCard(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
// Таңдау өрісі
function makeSelect(name, title, options, selected) {
  return `
    <label>${title}
      <select name="${name}">
        <option value="">Таңдаңыз</option>
        ${options.map(option => `
          <option value="${escapeCard(option)}"
            ${selected === option ? "selected" : ""}>
            ${option}
          </option>
        `).join("")}
      </select>
    </label>
  `;
}
// 0–3 баллдық бағалау
function makeRating(name, title, card) {
  const value = card[name] || "";
  const note = card[name + "Note"] || "";
  return `
    <div class="sc-rating">
      <label>${title}</label>
      <select name="${name}">
        <option value="">Бағалау</option>
        <option value="3" ${value == 3 ? "selected" : ""}>3 — Өздігінен орындайды</option>
        <option value="2" ${value == 2 ? "selected" : ""}>2 — Қайталаудан кейін орындайды</option>
        <option value="1" ${value == 1 ? "selected" : ""}>1 — Көмекпен орындайды</option>
        <option value="0" ${value == 0 && value !== "" ? "selected" : ""}>0 — Орындай алмады</option>
      </select>
      <textarea name="${name}Note"
        placeholder="Бақылау нәтижесі...">${escapeCard(note)}</textarea>
    </div>
  `;
}
// Қарым-қатынас тәсілін таңдау
function makeCheckbox(name, title, card) {
  return `
    <label class="sc-checkbox">
      <input type="checkbox" name="${name}"
        ${card[name] ? "checked" : ""}>
      ${title}
    </label>
  `;
}
// Картаны сақтау
function saveSpeechCardForm() {
  const form = document.getElementById("speechCardForm");
  if (!form) return;
  const card = {};
  new FormData(form).forEach((value, key) => {
    card[key] = value;
  });
  form.querySelectorAll('input[type="checkbox"]').forEach(input => {
    card[input.name] = input.checked;
  });
  saveSpeechCardData(card);
  document.getElementById("speechCardMessage").textContent =
    "✅ Сөйлеу картасы сәтті сақталды!";
  alert("Сөйлеу картасы сақталды!");
}
// Басып шығару
function printSpeechCard() {
  saveSpeechCardForm();
  window.print();
}
// Жаңа карта бастау
function resetSpeechCardForm() {
  if (!confirm("Қазіргі картадағы мәліметтерді тазалап, жаңа карта ашасыз ба?")) {
    return;
  }
  saveSpeechCardData({});
  renderSpeechCard();
}
// Кабинетке кіргенде картаны көрсету
const oldOpenCabinet = window.openCabinet;
window.openCabinet = function() {
  if (typeof oldOpenCabinet === "function") {
    oldOpenCabinet();
  }
  renderSpeechCard();
};
// Дизайн
const speechCardStyle = document.createElement("style");
speechCardStyle.textContent = `
#speechCardContainer {
  padding: 15px 0;
}
.sc-header {
  text-align: center;
  padding: 25px 15px;
  background: linear-gradient(135deg,#6954c9,#9b85ed);
  color: white;
  border-radius: 22px;
  margin-bottom: 20px;
}
.sc-label {
  font-size: 11px;
  letter-spacing: 2px;
}
.sc-header h2 {
  font-size: 25px;
  margin: 12px 0;
}
.sc-section {
  background: white;
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 18px;
  box-shadow: 0 5px 20px rgba(50,40,100,.07);
}
.sc-section h3 {
  color: #6954c9;
  margin-bottom: 18px;
}
.sc-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 15px;
}
.sc-section label {
  display: block;
  margin-bottom: 15px;
  font-weight: 600;
}
.sc-section input:not([type="checkbox"]),
.sc-section select,
.sc-section textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  margin-top: 7px;
  border: 1px solid #e1dcf1;
  border-radius: 10px;
  background: #fcfbff;
  font: inherit;
}
.sc-section textarea {
  min-height: 75px;
  resize: vertical;
}
.sc-hint {
  background: #f1efff;
  padding: 12px;
  border-radius: 10px;
}
.sc-rating {
  background: #faf9ff;
  border: 1px solid #eeeafb;
  padding: 14px;
  border-radius: 13px;
  margin: 12px 0;
}
.sc-checkbox {
  display: flex !important;
  align-items: center;
  gap: 10px;
}
.sc-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
}
.sc-actions button {
  padding: 13px 18px;
  border: none;
  border-radius: 12px;
  background: #7058d5;
  color: white;
  cursor: pointer;
  font-weight: 600;
}
#speechCardMessage {
  color: #159b70;
  font-weight: bold;
}
@media(max-width:600px) {
  .sc-grid {
    grid-template-columns: 1fr;
  }
  .sc-section {
    padding: 15px;
  }
  .sc-header h2 {
    font-size: 21px;
  }
}
@media print {
  body * {
    visibility: hidden;
  }
  #speechCardContainer,
  #speechCardContainer * {
    visibility: visible;
  }
  #speechCardContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .sc-actions {
    display: none;
  }
}
`;
document.head.appendChild(speechCardStyle);// ==========================================
// «ТІЛАШАР» ЭЛЕКТРОНДЫ СӨЙЛЕУ КАРТАСЫ
// Афазиясы бар ересектерге арналған
// ==========================================
function getSpeechCardData() {
  const data = JSON.parse(localStorage.getItem("platformData") || "{}");
  return data.speechCard || {};
}
function saveSpeechCardData(card) {
  const data = JSON.parse(localStorage.getItem("platformData") || "{}");
  data.speechCard = card;
  localStorage.setItem("platformData", JSON.stringify(data));
}
function renderSpeechCard() {
  const container = document.getElementById("speechCardContainer");
  if (!container) {
    alert("speechCardContainer элементі табылмады!");
    return;
  }
  const card = getSpeechCardData();
  container.innerHTML = `
    <div class="sc-header">
      <span class="sc-label">ТІЛАШАР | ЛОГОПЕДИЯЛЫҚ КАБИНЕТ</span>
      <h2>Электронды сөйлеу картасы</h2>
      <p>Афазиясы бар ересектердің сөйлеу дағдыларын бақылау парағы</p>
    </div>
    <form id="speechCardForm">
      <!-- 1. ЖЕКЕ МӘЛІМЕТТЕР -->
      <section class="sc-section">
        <h3>1. Жеке мәліметтер</h3>
        <div class="sc-grid">
          <label>Аты-жөні
            <input name="fullName" value="${escapeCard(card.fullName)}" placeholder="Аты-жөнін енгізіңіз">
          </label>
          <label>Жасы
            <input name="age" type="number" min="18" value="${escapeCard(card.age)}">
          </label>
          <label>Тексеру күні
            <input name="date" type="date" value="${escapeCard(card.date)}">
          </label>
          <label>Логопедтің аты-жөні
            <input name="logoped" value="${escapeCard(card.logoped)}">
          </label>
          <label>Бұзылыстың басталған уақыты
            <input name="onset" value="${escapeCard(card.onset)}" placeholder="Мысалы: 2025 жыл">
          </label>
          <label>Бұрын жүргізілген түзету жұмысы
            <input name="previousWork" value="${escapeCard(card.previousWork)}">
          </label>
        </div>
      </section>
      <!-- 2. ЖАЛПЫ БАҚЫЛАУ -->
      <section class="sc-section">
        <h3>2. Жалпы бақылау</h3>
        ${makeSelect("communication", "Қарым-қатынасқа түсуі", [
          "Белсенді",
          "Қосымша ынталандыру қажет",
          "Шектеулі"
        ], card.communication)}
        ${makeSelect("instruction", "Нұсқауды қабылдауы", [
          "Өздігінен орындайды",
          "Қайталаудан кейін орындайды",
          "Көмекпен орындайды",
          "Қиындық байқалады"
        ], card.instruction)}
        ${makeSelect("participation", "Тапсырмаға қатысуы", [
          "Белсенді",
          "Орташа",
          "Тұрақсыз"
        ], card.participation)}
        ${makeSelect("fatigue", "Шаршағыштығы", [
          "Байқалмайды",
          "Аздап байқалады",
          "Айқын байқалады"
        ], card.fatigue)}
        <label>Қосымша ескертпе
          <textarea name="generalNote">${escapeCard(card.generalNote)}</textarea>
        </label>
      </section>
      <!-- 3. СӨЙЛЕУ ДАҒДЫЛАРЫ -->
      <section class="sc-section">
        <h3>3. Сөйлеу дағдыларын бағалау</h3>
        <p class="sc-hint">
          Әр көрсеткішті 0–3 балл аралығында бағалаңыз.
        </p>
        ${makeRating("understanding", "Сөйлеуді түсіну", card)}
        ${makeRating("vocabulary", "Сөздік қоры және заттарды атау", card)}
        ${makeRating("speech", "Ауызша сөйлеу", card)}
        ${makeRating("repetition", "Сөздер мен сөйлемдерді қайталау", card)}
        ${makeRating("reading", "Оқу дағдысы", card)}
        ${makeRating("writing", "Жазу дағдысы", card)}
      </section>
      <!-- 4. ҚАРЫМ-ҚАТЫНАС ТӘСІЛДЕРІ -->
      <section class="sc-section">
        <h3>4. Қарым-қатынас тәсілдері</h3>
        ${makeCheckbox("oral", "Ауызша сөйлеу", card)}
        ${makeCheckbox("gesture", "Ым-ишара", card)}
        ${makeCheckbox("writingMethod", "Жазу арқылы", card)}
        ${makeCheckbox("pictures", "Суреттер арқылы", card)}
        ${makeCheckbox("board", "Коммуникативтік тақта", card)}
      </section>
      <!-- 5. ҚОСЫМША БАҚЫЛАУ -->
      <section class="sc-section">
        <h3>5. Қосымша бақылау</h3>
        ${makeSelect("pronunciation", "Дыбыс айту ерекшелігі", [
          "Ерекшелік байқалмайды",
          "Қиындық байқалады",
          "Қосымша тексеру қажет"
        ], card.pronunciation)}
        ${makeSelect("tempo", "Сөйлеу қарқыны", [
          "Қалыпты",
          "Баяу",
          "Жылдам",
          "Тұрақсыз"
        ], card.tempo)}
        ${makeSelect("voice", "Дауыс ерекшелігі", [
          "Қалыпты",
          "Әлсіз",
          "Қарлығыңқы",
          "Тұрақсыз"
        ], card.voice)}
        ${makeSelect("movement", "Қимыл-қозғалыс ерекшелігі", [
          "Ерекшелік байқалмайды",
          "Қозғалыс үйлесімінде қиындық бар",
          "Қосымша бақылау қажет"
        ], card.movement)}
        ${makeSelect("breathing", "Тыныс алу мен сөйлеуді үйлестіру", [
          "Үйлесімді",
          "Ішінара үйлеседі",
          "Қиындық байқалады"
        ], card.breathing)}
      </section>
      <!-- 6. ҚОРЫТЫНДЫ -->
      <section class="sc-section">
        <h3>6. Логопедиялық қорытынды</h3>
        <label>Сақталған дағдылар
          <textarea name="preserved">${escapeCard(card.preserved)}</textarea>
        </label>
        <label>Қиындықтар
          <textarea name="difficulties">${escapeCard(card.difficulties)}</textarea>
        </label>
        <label>Түзету жұмысының негізгі бағыттары
          <textarea name="directions">${escapeCard(card.directions)}</textarea>
        </label>
        <label>Ұсыныстар
          <textarea name="recommendations">${escapeCard(card.recommendations)}</textarea>
        </label>
        <label>Қорытынды
          <textarea name="conclusion">${escapeCard(card.conclusion)}</textarea>
        </label>
      </section>
      <!-- 7. ДАМУ ДИНАМИКАСЫ -->
      <section class="sc-section">
        <h3>7. Даму динамикасы</h3>
        <div class="sc-grid">
          <label>Бастапқы тексеру күні
            <input type="date" name="initialDate" value="${escapeCard(card.initialDate)}">
          </label>
          <label>Аралық тексеру күні
            <input type="date" name="middleDate" value="${escapeCard(card.middleDate)}">
          </label>
          <label>Қорытынды тексеру күні
            <input type="date" name="finalDate" value="${escapeCard(card.finalDate)}">
          </label>
        </div>
        <label>Бастапқы бақылау нәтижесі
          <textarea name="initialNote">${escapeCard(card.initialNote)}</textarea>
        </label>
        <label>Аралық бақылау нәтижесі
          <textarea name="middleNote">${escapeCard(card.middleNote)}</textarea>
        </label>
        <label>Қорытынды бақылау нәтижесі
          <textarea name="finalNote">${escapeCard(card.finalNote)}</textarea>
        </label>
      </section>
      <!-- БАСҚАРУ БАТЫРМАЛАРЫ -->
      <div class="sc-actions">
        <button type="button" onclick="saveSpeechCardForm()">
          💾 Сақтау
        </button>
        <button type="button" onclick="printSpeechCard()">
          🖨️ Басып шығару
        </button>
        <button type="button" onclick="resetSpeechCardForm()">
          Жаңа карта
        </button>
      </div>
      <p id="speechCardMessage"></p>
    </form>
  `;
  document.getElementById("speechCardForm").addEventListener("change", () => {
    document.getElementById("speechCardMessage").textContent =
      "Өзгерістер енгізілді. Сақтау батырмасын басыңыз.";
  });
}
// HTML-ге қауіпсіз мәтін енгізу
function escapeCard(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
// Таңдау өрісі
function makeSelect(name, title, options, selected) {
  return `
    <label>${title}
      <select name="${name}">
        <option value="">Таңдаңыз</option>
        ${options.map(option => `
          <option value="${escapeCard(option)}"
            ${selected === option ? "selected" : ""}>
            ${option}
          </option>
        `).join("")}
      </select>
    </label>
  `;
}
// 0–3 баллдық бағалау
function makeRating(name, title, card) {
  const value = card[name] || "";
  const note = card[name + "Note"] || "";
  return `
    <div class="sc-rating">
      <label>${title}</label>
      <select name="${name}">
        <option value="">Бағалау</option>
        <option value="3" ${value == 3 ? "selected" : ""}>3 — Өздігінен орындайды</option>
        <option value="2" ${value == 2 ? "selected" : ""}>2 — Қайталаудан кейін орындайды</option>
        <option value="1" ${value == 1 ? "selected" : ""}>1 — Көмекпен орындайды</option>
        <option value="0" ${value == 0 && value !== "" ? "selected" : ""}>0 — Орындай алмады</option>
      </select>
      <textarea name="${name}Note"
        placeholder="Бақылау нәтижесі...">${escapeCard(note)}</textarea>
    </div>
  `;
}
// Қарым-қатынас тәсілін таңдау
function makeCheckbox(name, title, card) {
  return `
    <label class="sc-checkbox">
      <input type="checkbox" name="${name}"
        ${card[name] ? "checked" : ""}>
      ${title}
    </label>
  `;
}
// Картаны сақтау
function saveSpeechCardForm() {
  const form = document.getElementById("speechCardForm");
  if (!form) return;
  const card = {};
  new FormData(form).forEach((value, key) => {
    card[key] = value;
  });
  form.querySelectorAll('input[type="checkbox"]').forEach(input => {
    card[input.name] = input.checked;
  });
  saveSpeechCardData(card);
  document.getElementById("speechCardMessage").textContent =
    "✅ Сөйлеу картасы сәтті сақталды!";
  alert("Сөйлеу картасы сақталды!");
}
// Басып шығару
function printSpeechCard() {
  saveSpeechCardForm();
  window.print();
}
// Жаңа карта бастау
function resetSpeechCardForm() {
  if (!confirm("Қазіргі картадағы мәліметтерді тазалап, жаңа карта ашасыз ба?")) {
    return;
  }
  saveSpeechCardData({});
  renderSpeechCard();
}
// Кабинетке кіргенде картаны көрсету
const oldOpenCabinet = window.openCabinet;
window.openCabinet = function() {
  if (typeof oldOpenCabinet === "function") {
    oldOpenCabinet();
  }
  renderSpeechCard();
};
// Дизайн
const speechCardStyle = document.createElement("style");
speechCardStyle.textContent = `
#speechCardContainer {
  padding: 15px 0;
}
.sc-header {
  text-align: center;
  padding: 25px 15px;
  background: linear-gradient(135deg,#6954c9,#9b85ed);
  color: white;
  border-radius: 22px;
  margin-bottom: 20px;
}
.sc-label {
  font-size: 11px;
  letter-spacing: 2px;
}
.sc-header h2 {
  font-size: 25px;
  margin: 12px 0;
}
.sc-section {
  background: white;
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 18px;
  box-shadow: 0 5px 20px rgba(50,40,100,.07);
}
.sc-section h3 {
  color: #6954c9;
  margin-bottom: 18px;
}
.sc-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 15px;
}
.sc-section label {
  display: block;
  margin-bottom: 15px;
  font-weight: 600;
}
.sc-section input:not([type="checkbox"]),
.sc-section select,
.sc-section textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  margin-top: 7px;
  border: 1px solid #e1dcf1;
  border-radius: 10px;
  background: #fcfbff;
  font: inherit;
}
.sc-section textarea {
  min-height: 75px;
  resize: vertical;
}
.sc-hint {
  background: #f1efff;
  padding: 12px;
  border-radius: 10px;
}
.sc-rating {
  background: #faf9ff;
  border: 1px solid #eeeafb;
  padding: 14px;
  border-radius: 13px;
  margin: 12px 0;
}
.sc-checkbox {
  display: flex !important;
  align-items: center;
  gap: 10px;
}
.sc-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 20px 0;
}
.sc-actions button {
  padding: 13px 18px;
  border: none;
  border-radius: 12px;
  background: #7058d5;
  color: white;
  cursor: pointer;
  font-weight: 600;
}
#speechCardMessage {
  color: #159b70;
  font-weight: bold;
}
@media(max-width:600px) {
  .sc-grid {
    grid-template-columns: 1fr;
  }
  .sc-section {
    padding: 15px;
  }
  .sc-header h2 {
    font-size: 21px;
  }
}
@media print {
  body * {
    visibility: hidden;
  }
  #speechCardContainer,
  #speechCardContainer * {
    visibility: visible;
  }
  #speechCardContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .sc-actions {
    display: none;
  }
}
`;
document.head.appendChild(speechCardStyle);
