/* =========================================
   ТІЛАШАР — ЛОГОЫРҒАҚ
   4 интерактивті тапсырма
========================================= */

(function () {
  "use strict";

  const logorhythmicsTasks = [
    {
      title: "Ырғақты қайтала",
      goal: "Ырғақты есту, есте сақтау және қайталау қабілетін дамыту.",
      instruction: "Берілген ырғақты тыңдап, дәл сол ретпен қайталаңыз.",
      materials: "Дыбыстық сигналдар.",
      warning: "Асықпай орындаңыз. Әр дыбыстың ретін сақтаңыз.",
      type: "rhythm"
    },
    {
      title: "Қимыл мен сөз",
      goal: "Сөйлеуді қимылмен үйлестіру дағдысын дамыту.",
      instruction: "Сөздерді оқып, көрсетілген қимылдарды орындаңыз.",
      materials: "Сөздер мен қимыл нұсқаулары.",
      warning: "Қимылдарды өз мүмкіндігіңізге қарай орындаңыз.",
      type: "movement"
    },
    {
      title: "Санап, қимылда",
      goal: "Санау, ырғақ және қозғалыс үйлесімділігін дамыту.",
      instruction: "Сандарды ретімен айтып, сәйкес қимылды таңдаңыз.",
      materials: "Сандар мен қимылдар.",
      warning: "Қимыл кезінде тепе-теңдікті сақтаңыз.",
      type: "count"
    },
    {
      title: "Сөйлемді ырғақпен айт",
      goal: "Сөйлеу қарқыны мен тыныс үйлесімділігін дамыту.",
      instruction: "Сөйлемді бірқалыпты ырғақпен оқыңыз.",
      materials: "Қысқа сөйлемдер.",
      warning: "Сөйлемді тым жылдам айтпаңыз. Табиғи қарқынды сақтаңыз.",
      type: "speech"
    }
  ];

  let currentTask = null;
  let currentScore = 0;
  let finished = false;
  let rhythmSequence = [];
  let userSequence = [];

  function getTaskIndex(title) {
    return logorhythmicsTasks.findIndex(task => task.title === title);
  }

  function renderTask(title) {
    const index = getTaskIndex(title);
    if (index === -1) return;

    currentTask = logorhythmicsTasks[index];
    currentScore = 0;
    finished = false;
    userSequence = [];

    setText("exerciseGoal", currentTask.goal);
    setText("exerciseInstruction", currentTask.instruction);
    setText("exerciseMaterials", currentTask.materials);
    setText("exerciseWarning", currentTask.warning);

    const content = document.getElementById("exerciseContent");
    const result = document.getElementById("exerciseResult");

    if (result) result.textContent = "";
    if (!content) return;

    content.innerHTML = `
      <div class="logo-box">
        <div class="logo-progress">Логоырғақ тапсырмасы ${index + 1} / 4</div>
        <div id="logoGame"></div>
        <div id="logoFeedback" aria-live="polite"></div>
        <button type="button" class="logo-btn" id="logoCheck">
          Жауапты тексеру
        </button>
        <button type="button" class="logo-btn" id="logoFinish">
          Орындадым
        </button>
      </div>
    `;

    renderGame(currentTask.type);

    document.getElementById("logoCheck")
      .addEventListener("click", checkAnswer);

    document.getElementById("logoFinish")
      .addEventListener("click", finishTask);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function renderGame(type) {
    const game = document.getElementById("logoGame");
    if (!game) return;

    if (type === "rhythm") {
      rhythmSequence = ["👏", "👏", "✋", "👏"];

      game.innerHTML = `
        <h3>Ырғақты тыңдаңыз</h3>
        <p>Дыбыстарды тыңдап, ретімен қайталаңыз.</p>
        <button type="button" class="logo-btn" id="playRhythm">
          🔊 Ырғақты тыңдау
        </button>
        <div class="logo-options">
          ${["👏", "✋"].map((symbol, index) => `
            <button type="button" class="logo-symbol"
              data-symbol="${symbol}">
              ${symbol}
            </button>
          `).join("")}
        </div>
        <p id="rhythmAnswer">Сіздің жауабыңыз: —</p>
        <button type="button" class="logo-btn" id="clearRhythm">
          Қайта бастау
        </button>
      `;

      document.getElementById("playRhythm")
        .addEventListener("click", playRhythm);

      document.querySelectorAll(".logo-symbol").forEach(button => {
        button.addEventListener("click", () => {
          if (userSequence.length >= rhythmSequence.length) return;
          userSequence.push(button.dataset.symbol);
          updateRhythmAnswer();
        });
      });

      document.getElementById("clearRhythm")
        .addEventListener("click", () => {
          userSequence = [];
          updateRhythmAnswer();
        });
    }

    if (type === "movement") {
      const movements = [
        { word: "Қолды көтер", emoji: "🙌" },
        { word: "Алақан соқ", emoji: "👏" },
        { word: "Басты бұр", emoji: "↔️" },
        { word: "Қолды түсір", emoji: "👇" }
      ];

      game.innerHTML = `
        <h3>Қимылды таңдаңыз</h3>
        <p>Нұсқауды оқып, сәйкес қимылды белгілеңіз.</p>
        <div class="logo-options">
          ${movements.map((item, index) => `
            <button type="button" class="logo-movement"
              data-index="${index}">
              <span>${item.emoji}</span>
              <br>${item.word}
            </button>
          `).join("")}
        </div>
        <p id="movementSelected">Таңдалды: 0 / 4</p>
      `;

      let selected = new Set();

      document.querySelectorAll(".logo-movement").forEach(button => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.index);

          if (selected.has(index)) {
            selected.delete(index);
            button.classList.remove("selected");
          } else {
            selected.add(index);
            button.classList.add("selected");
          }

          document.getElementById("movementSelected").textContent =
            `Таңдалды: ${selected.size} / 4`;

          userSequence = [...selected];
        });
      });
    }

    if (type === "count") {
      const actions = [
        { number: "1", action: "👏 Бір рет алақан соғу" },
        { number: "2", action: "🙌 Екі қолды көтеру" },
        { number: "3", action: "👇 Үш рет саусақпен санау" }
      ];

      game.innerHTML = `
        <h3>Сан мен қимылды сәйкестендіріңіз</h3>
        ${actions.map((item, index) => `
          <div class="logo-question">
            <strong>${item.number}</strong>
            <span>${item.action}</span>
            <input type="checkbox" data-index="${index}">
          </div>
        `).join("")}
        <p>Барлық үш қимылды ретімен орындаңыз.</p>
      `;

      document.querySelectorAll("#logoGame input").forEach(input => {
        input.addEventListener("change", () => {
          userSequence = [...document.querySelectorAll(
            "#logoGame input:checked"
          )].map(item => Number(item.dataset.index));
        });
      });
    }

    if (type === "speech") {
      const sentences = [
        "Мен бүгін жақсы көңіл күйдемін.",
        "Мен кітап оқығанды ұнатамын.",
        "Бүгін ауа райы өте жақсы."
      ];

      game.innerHTML = `
        <h3>Сөйлемді таңдаңыз</h3>
        <p>Сөйлемді бірқалыпты ырғақпен оқыңыз.</p>
        ${sentences.map((sentence, index) => `
          <label class="logo-sentence">
            <input type="radio" name="logoSentence" value="${index}">
            ${sentence}
          </label>
        `).join("")}
        <button type="button" class="logo-btn" id="speakSentence">
          🔊 Сөйлемді тыңдау
        </button>
        <p id="speechStatus">Оқығаннан кейін «Жауапты тексеру» батырмасын басыңыз.</p>
      `;

      document.getElementById("speakSentence")
        .addEventListener("click", () => {
          const selected = document.querySelector(
            'input[name="logoSentence"]:checked'
          );

          if (!selected) {
            document.getElementById("speechStatus").textContent =
              "Алдымен сөйлемді таңдаңыз.";
            return;
          }

          speakSentence(sentences[Number(selected.value)]);
        });
    }
  }

  function playRhythm() {
    const sequence = rhythmSequence;
    let index = 0;

    function next() {
      if (index >= sequence.length) return;

      const symbol = sequence[index];
      speakSymbol(symbol);

      const answer = document.getElementById("rhythmAnswer");
      if (answer) {
        answer.textContent = `Тыңдалып жатыр: ${index + 1} / ${sequence.length}`;
      }

      index++;
      setTimeout(next, 750);
    }

    index = 0;
    next();
  }

  function speakSymbol(symbol) {
    if (!("speechSynthesis" in window)) return;

    const text = symbol === "👏" ? "Алақан соғу" : "Қолды көтеру";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kk-KZ";
    window.speechSynthesis.speak(utterance);
  }

  function speakSentence(sentence) {
    if (!("speechSynthesis" in window)) {
      alert("Бұл браузерде дауыстап оқу функциясы қолжетімді емес.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "kk-KZ";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  function updateRhythmAnswer() {
    const answer = document.getElementById("rhythmAnswer");
    if (answer) {
      answer.textContent = "Сіздің жауабыңыз: " +
        (userSequence.length ? userSequence.join(" ") : "—");
    }
  }

  function checkAnswer() {
    if (finished || !currentTask) return;

    const feedback = document.getElementById("logoFeedback");
    let success = false;

    if (currentTask.type === "rhythm") {
      success = userSequence.length === rhythmSequence.length &&
        userSequence.every((item, index) => item === rhythmSequence[index]);
    }

    if (currentTask.type === "movement") {
      success = userSequence.length === 4;
    }

    if (currentTask.type === "count") {
      success = userSequence.length === 3;
    }

    if (currentTask.type === "speech") {
      const selected = document.querySelector(
        'input[name="logoSentence"]:checked'
      );
      success = Boolean(selected);
    }

    if (!success) {
      currentScore = 1;
      feedback.textContent =
        "Тапсырма орындалуда. Тағы бір рет қайталап көріңіз.";
      return;
    }

    currentScore = 3;
    feedback.textContent =
      "Жарайсыз! Тапсырманы орындадыңыз. Нәтиже: 3 / 3 балл.";
  }

  function finishTask() {
    if (finished) return;

    if (currentScore === 0) {
      alert("Алдымен тапсырманы орындап, «Жауапты тексеру» батырмасын басыңыз.");
      return;
    }

    finished = true;

    const result = document.getElementById("exerciseResult");
    if (result) {
      result.textContent =
        `Тапсырма аяқталды! Нәтиже: ${currentScore} / 3 балл.`;
    }

    if (typeof window.completeExercise === "function") {
      window.completeExercise(currentScore);
    }
  }

  function addStyles() {
    if (document.getElementById("logoStyles")) return;

    const style = document.createElement("style");
    style.id = "logoStyles";

    style.textContent = `
      .logo-box {
        background: #f5f1ff;
        padding: 20px;
        border-radius: 18px;
        margin-top: 15px;
      }

      .logo-progress {
        color: #7045b5;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .logo-options {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 18px 0;
      }

      .logo-btn,
      .logo-symbol,
      .logo-movement {
        border: none;
        background: #7650bd;
        color: white;
        border-radius: 12px;
        padding: 12px 17px;
        cursor: pointer;
        margin: 5px;
      }

      .logo-symbol {
        font-size: 25px;
        min-width: 65px;
      }

      .logo-movement {
        min-width: 125px;
      }

      .logo-movement span {
        font-size: 28px;
      }

      .logo-movement.selected {
        background: #269b82;
        outline: 3px solid #b9eadb;
      }

      .logo-question {
        display: flex;
        gap: 12px;
        align-items: center;
        background: white;
        padding: 13px;
        border-radius: 10px;
        margin: 10px 0;
      }

      .logo-sentence {
        display: block;
        padding: 12px;
        background: white;
        border-radius: 10px;
        margin: 9px 0;
      }

      #logoFeedback {
        font-weight: bold;
        margin: 15px 0;
      }
    `;

    document.head.appendChild(style);
  }

  function registerTasks() {
    if (!window.sections) return;

    window.sections.logorhythmics = logorhythmicsTasks;
    window.sections["логоырғақ"] = logorhythmicsTasks;
  }

  function watchPage() {
    const title = document.getElementById("exerciseTitle");
    if (!title) return;

    let previous = "";

    const observer = new MutationObserver(() => {
      const current = title.textContent.trim();

      if (current && current !== previous) {
        previous = current;
        renderTask(current);
      }
    });

    observer.observe(title, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function init() {
    registerTasks();
    addStyles();
    watchPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
