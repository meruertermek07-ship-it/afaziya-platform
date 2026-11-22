/* =========================================
   ТІЛАШАР — ОҚУ ЖӘНЕ ЖАЗУ
   12 интерактивті тапсырма
========================================= */

(function () {
  "use strict";

  const literacyTasks = [
    {
      title: "Әріпті таны",
      goal: "Әріптерді тану және ажырату қабілетін дамыту.",
      instruction: "Көрсетілген әріпті тауып, дұрыс жауапты таңдаңыз.",
      materials: "Әріптер мен жауап нұсқалары.",
      warning: "Әріптерді асықпай, мұқият салыстырыңыз.",
      type: "letter"
    },
    {
      title: "Буындарды оқы",
      goal: "Буындарды оқып, сөз құрау дағдысын дамыту.",
      instruction: "Берілген буынды оқып, сәйкес сөзді таңдаңыз.",
      materials: "Буындар мен сөздер.",
      warning: "Буындарды түсіріп қалдырмаңыз.",
      type: "syllable"
    },
    {
      title: "Сөз-сурет",
      goal: "Оқылған сөзді сәйкес суретпен байланыстыру.",
      instruction: "Сөзді оқып, оған сәйкес суретті таңдаңыз.",
      materials: "Сөздер мен суреттер.",
      warning: "Суретті сөздің мағынасына қарай таңдаңыз.",
      type: "picture"
    },
    {
      title: "Сөйлемді оқып түсін",
      goal: "Қарапайым сөйлемдерді түсіну дағдысын қалыптастыру.",
      instruction: "Сөйлемді оқып, сұраққа жауап беріңіз.",
      materials: "Сөйлемдер мен сұрақтар.",
      warning: "Жауап бермес бұрын сөйлемді толық оқыңыз.",
      type: "sentence"
    },
    {
      title: "Мәтінді оқып, ақпарат тап",
      goal: "Қысқа мәтіннен негізгі ақпаратты табу.",
      instruction: "Мәтінді оқып, сұрақтарға жауап беріңіз.",
      materials: "Қысқа мәтін және сұрақтар.",
      warning: "Мәтіндегі маңызды ақпаратқа назар аударыңыз.",
      type: "text"
    },
    {
      title: "Әріпті толықтыр",
      goal: "Сөздегі түсіп қалған әріпті анықтау.",
      instruction: "Сөздегі бос орынға қажетті әріпті қойыңыз.",
      materials: "Толықтырылмаған сөздер.",
      warning: "Сөзді дауыстап оқып көруге болады.",
      type: "missing"
    },
    {
      title: "Сөз құрастыр және жаз",
      goal: "Әріптерден сөз құрастыру және жазу дағдысын дамыту.",
      instruction: "Берілген әріптерден дұрыс сөз құрастырыңыз.",
      materials: "Әріптер жинағы.",
      warning: "Әріптердің ретін сақтаңыз.",
      type: "build"
    },
    {
      title: "Есті де жаз",
      goal: "Есту арқылы сөзді қабылдау және жазу дағдысын дамыту.",
      instruction: "Сөзді тыңдап, оны төмендегі өріске жазыңыз.",
      materials: "Дыбыстық оқу және мәтін енгізу өрісі.",
      warning: "Сөзді бірнеше рет тыңдауға болады.",
      type: "listen"
    },
    {
      title: "Сурет бойынша сөз",
      goal: "Суретке қарап, қажетті сөзді жазу.",
      instruction: "Суретке қарап, оның атауын жазыңыз.",
      materials: "Заттар мен жануарлардың суреттері.",
      warning: "Сөзді дұрыс жазуға тырысыңыз.",
      type: "image"
    },
    {
      title: "Сөйлемді толықтыр",
      goal: "Сөйлемнің мағынасына сәйкес сөзді таңдау.",
      instruction: "Сөйлемдегі бос орынды қажетті сөзбен толықтырыңыз.",
      materials: "Аяқталмаған сөйлемдер.",
      warning: "Сөйлемнің мағынасын ескеріңіз.",
      type: "complete"
    },
    {
      title: "Күнделікті өмірде жазу",
      goal: "Күнделікті қарым-қатынаста жазу дағдысын дамыту.",
      instruction: "Берілген жағдайға сәйкес қысқа хабарлама жазыңыз.",
      materials: "Өмірлік жағдаяттар.",
      warning: "Ойыңызды түсінікті және қысқа жеткізіңіз.",
      type: "daily"
    },
    {
      title: "Мәтін құрастыру",
      goal: "Бірнеше сөйлемнен тұратын байланысты мәтін құрастыру.",
      instruction: "Берілген тақырып бойынша шағын мәтін жазыңыз.",
      materials: "Тақырып және тірек сөздер.",
      warning: "Сөйлемдердің мағыналық байланысын сақтаңыз.",
      type: "compose"
    }
  ];

  const literacyData = {
    letter: [
      { q: "А әрпін табыңыз", options: ["Ә", "А", "О"], a: "А" },
      { q: "М әрпін табыңыз", options: ["Н", "М", "П"], a: "М" },
      { q: "С әрпін табыңыз", options: ["С", "Ш", "З"], a: "С" }
    ],
    syllable: [
      { q: "«АЛ» буынына сәйкес сөзді таңдаңыз", options: ["Алма", "Кітап", "Доп"], a: "Алма" },
      { q: "«КІ» буынына сәйкес сөзді таңдаңыз", options: ["Үй", "Кітап", "Гүл"], a: "Кітап" },
      { q: "«БА» буынына сәйкес сөзді таңдаңыз", options: ["Бала", "Су", "Ата"], a: "Бала" }
    ],
    picture: [
      { q: "🍎", options: ["Алма", "Доп", "Үй"], a: "Алма" },
      { q: "🏠", options: ["Кітап", "Үй", "Гүл"], a: "Үй" },
      { q: "🐱", options: ["Ит", "Құс", "Мысық"], a: "Мысық" }
    ],
    sentence: [
      { q: "«Асан алма жеді». Асан не жеді?", options: ["Алма", "Нан", "Су"], a: "Алма" },
      { q: "«Әлия кітап оқыды». Әлия не істеді?", options: ["Жүгірді", "Кітап оқыды", "Ұйықтады"], a: "Кітап оқыды" },
      { q: "«Бала доппен ойнады». Бала немен ойнады?", options: ["Қуыршақпен", "Доппен", "Кітаппен"], a: "Доппен" }
    ],
    text: [
      {
        text: "Айгүл таңертең ерте тұрды. Ол таңғы ас ішіп, серуенге шықты.",
        q: "Айгүл қайда шықты?",
        options: ["Дүкенге", "Серуенге", "Мектепке"],
        a: "Серуенге"
      },
      {
        text: "Ержан кітапханаға барды. Ол қызықты кітап алды.",
        q: "Ержан қайда барды?",
        options: ["Кітапханаға", "Дүкенге", "Үйге"],
        a: "Кітапханаға"
      },
      {
        text: "Меруерт гүлдерді суарды. Гүлдер әдемі болып өсті.",
        q: "Меруерт нені суарды?",
        options: ["Ағаштарды", "Гүлдерді", "Көкөністерді"],
        a: "Гүлдерді"
      }
    ],
    missing: [
      { q: "А_ма", options: ["л", "р", "с"], a: "л" },
      { q: "Кі_ап", options: ["т", "м", "н"], a: "т" },
      { q: "Ме_теп", options: ["к", "п", "с"], a: "к" }
    ],
    build: [
      { q: "А - Л - М - А", a: "АЛМА" },
      { q: "К - І - Т - А - П", a: "КІТАП" },
      { q: "Б - А - Л - А", a: "БАЛА" }
    ],
    listen: [
      { q: "АЛМА", a: "АЛМА" },
      { q: "КІТАП", a: "КІТАП" },
      { q: "МЕКТЕП", a: "МЕКТЕП" }
    ],
    image: [
      { q: "🍌", a: "БАНАН" },
      { q: "🌷", a: "ГҮЛ" },
      { q: "🐕", a: "ИТ" }
    ],
    complete: [
      { q: "Құс ...", options: ["ұшады", "жүзеді", "оқиды"], a: "ұшады" },
      { q: "Балық ...", options: ["сөйлейді", "жүзеді", "жүгіреді"], a: "жүзеді" },
      { q: "Күн ...", options: ["шығады", "ұйықтайды", "жүгіреді"], a: "шығады" }
    ]
  };

  let literacyScore = 0;
  let literacyFinished = false;
  let literacyCurrentTask = null;
  let literacyCurrentIndex = 0;

  function getLiteracyTask(title) {
    return literacyTasks.findIndex(task => task.title === title);
  }

  function renderLiteracyTask(title) {
    const index = getLiteracyTask(title);
    if (index === -1) return;

    literacyCurrentIndex = index;
    literacyCurrentTask = literacyTasks[index];
    literacyScore = 0;
    literacyFinished = false;

    const goal = document.getElementById("exerciseGoal");
    const instruction = document.getElementById("exerciseInstruction");
    const materials = document.getElementById("exerciseMaterials");
    const warning = document.getElementById("exerciseWarning");
    const content = document.getElementById("exerciseContent");
    const result = document.getElementById("exerciseResult");

    if (goal) goal.textContent = literacyCurrentTask.goal;
    if (instruction) instruction.textContent = literacyCurrentTask.instruction;
    if (materials) materials.textContent = literacyCurrentTask.materials;
    if (warning) warning.textContent = literacyCurrentTask.warning;
    if (result) result.innerHTML = "";

    if (!content) return;

    content.innerHTML = `
      <div class="literacy-box">
        <div class="literacy-progress">
          Тапсырма ${index + 1} / 12
        </div>
        <div id="literacyGame"></div>
        <div id="literacyFeedback" aria-live="polite"></div>
        <button type="button" id="literacyCheck" class="literacy-btn">
          Жауапты тексеру
        </button>
        <button type="button" id="literacyComplete" class="literacy-btn">
          Орындадым
        </button>
      </div>
    `;

    renderLiteracyGame(literacyCurrentTask.type);

    document.getElementById("literacyCheck")
      .addEventListener("click", checkLiteracyAnswer);

    document.getElementById("literacyComplete")
      .addEventListener("click", finishLiteracyTask);
  }

  function renderLiteracyGame(type) {
    const game = document.getElementById("literacyGame");
    if (!game) return;

    const data = literacyData[type];

    if (type === "letter" || type === "syllable" ||
        type === "picture" || type === "complete") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          <h3>${item.q}</h3>
          <div class="literacy-options">
            ${item.options.map(option => `
              <label>
                <input type="radio" name="literacy-${index}"
                  value="${option}">
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("");
    }

    if (type === "sentence" || type === "text") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          ${item.text ? `<p class="literacy-reading">${item.text}</p>` : ""}
          <h3>${item.q}</h3>
          <div class="literacy-options">
            ${item.options.map(option => `
              <label>
                <input type="radio" name="literacy-${index}"
                  value="${option}">
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("");
    }

    if (type === "missing") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          <h3>${item.q}</h3>
          <div class="literacy-options">
            ${item.options.map(option => `
              <label>
                <input type="radio" name="literacy-${index}"
                  value="${option}">
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `).join("");
    }

    if (type === "build") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          <h3>${item.q}</h3>
          <input class="literacy-input"
            type="text"
            data-answer="${item.a}"
            placeholder="Сөзді жазыңыз">
        </div>
      `).join("");
    }

    if (type === "listen") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          <h3>Сөз ${index + 1}</h3>
          <button type="button" class="literacy-btn"
            onclick="literacySpeak('${item.q}')">
            🔊 Сөзді тыңдау
          </button>
          <input class="literacy-input"
            type="text"
            data-answer="${item.a}"
            placeholder="Естіген сөзіңізді жазыңыз">
        </div>
      `).join("");
    }

    if (type === "image") {
      game.innerHTML = data.map((item, index) => `
        <div class="literacy-question">
          <div class="literacy-image">${item.q}</div>
          <input class="literacy-input"
            type="text"
            data-answer="${item.a}"
            placeholder="Суреттің атауын жазыңыз">
        </div>
      `).join("");
    }

    if (type === "daily") {
      game.innerHTML = `
        <div class="literacy-question">
          <h3>Жағдаят: Досыңызға бүгін келе алмайтыныңызды хабарлаңыз.</h3>
          <textarea id="literacyOpenAnswer"
            class="literacy-textarea"
            placeholder="Хабарламаңызды жазыңыз..."></textarea>
        </div>
      `;
    }

    if (type === "compose") {
      game.innerHTML = `
        <div class="literacy-question">
          <h3>Тақырып: «Менің күнім»</h3>
          <p>Тірек сөздер: таңертең, таңғы ас, серуен, кеш.</p>
          <textarea id="literacyOpenAnswer"
            class="literacy-textarea"
            placeholder="Өз мәтініңізді жазыңыз..."></textarea>
        </div>
      `;
    }
  }

  window.literacySpeak = function (word) {
    if (!("speechSynthesis" in window)) {
      alert("Бұл браузерде дауыстап оқу функциясы қолжетімді емес.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "kk-KZ";
    utterance.rate = 0.8;

    window.speechSynthesis.speak(utterance);
  };

  function checkLiteracyAnswer() {
    if (literacyFinished) return;

    const type = literacyCurrentTask.type;
    const data = literacyData[type];
    const feedback = document.getElementById("literacyFeedback");

    if (["daily", "compose"].includes(type)) {
      const answer = document.getElementById("literacyOpenAnswer");
      if (!answer || !answer.value.trim()) {
        feedback.textContent = "Алдымен жауабыңызды жазыңыз.";
        return;
      }

      feedback.textContent =
        "Жауабыңыз сақталды. Өзіңізді 0–3 балл аралығында бағалаңыз.";
      showLiteracySelfScore();
      return;
    }

    let correct = 0;
    let answered = 0;

    if (["build", "listen", "image"].includes(type)) {
      const inputs = document.querySelectorAll(".literacy-input");

      inputs.forEach(input => {
        if (!input.value.trim()) return;
        answered++;

        if (input.value.trim().toLocaleUpperCase("kk-KZ") ===
            input.dataset.answer.toLocaleUpperCase("kk-KZ")) {
          correct++;
        }
      });
    } else {
      data.forEach((item, index) => {
        const selected = document.querySelector(
          `input[name="literacy-${index}"]:checked`
        );

        if (!selected) return;
        answered++;

        if (selected.value === item.a) correct++;
      });
    }

    if (answered === 0) {
      feedback.textContent = "Алдымен жауаптарды таңдаңыз немесе жазыңыз.";
      return;
    }

    literacyScore = Math.round((correct / data.length) * 3);

    feedback.textContent =
      `Дұрыс жауап: ${correct} / ${data.length}. ` +
      `Алдын ала нәтиже: ${literacyScore} / 3 балл.`;
  }

  function showLiteracySelfScore() {
    const feedback = document.getElementById("literacyFeedback");

    feedback.innerHTML = `
      <p>Өз жұмысыңызды бағалаңыз:</p>
      <div class="literacy-options">
        <button type="button" class="literacy-btn" data-score="1">1 балл</button>
        <button type="button" class="literacy-btn" data-score="2">2 балл</button>
        <button type="button" class="literacy-btn" data-score="3">3 балл</button>
      </div>
    `;

    feedback.querySelectorAll("[data-score]").forEach(button => {
      button.addEventListener("click", () => {
        literacyScore = Number(button.dataset.score);
        feedback.textContent = `Таңдалған баға: ${literacyScore} балл.`;
      });
    });
  }

  function finishLiteracyTask() {
    if (literacyFinished) return;

    const type = literacyCurrentTask.type;

    if (["daily", "compose"].includes(type)) {
      const answer = document.getElementById("literacyOpenAnswer");

      if (!answer || !answer.value.trim()) {
        alert("Алдымен тапсырманы орындаңыз.");
        return;
      }

      if (literacyScore === 0) {
        alert("Өзіңізді 1–3 балл аралығында бағалаңыз.");
        showLiteracySelfScore();
        return;
      }
    } else {
      const feedback = document.getElementById("literacyFeedback");

      if (!feedback || !feedback.textContent.includes("Дұрыс жауап:")) {
        alert("Алдымен «Жауапты тексеру» батырмасын басыңыз.");
        return;
      }
    }

    literacyFinished = true;

    const result = document.getElementById("exerciseResult");
    if (result) {
      result.textContent = `Тапсырма аяқталды! Нәтиже: ${literacyScore} / 3 балл.`;
    }

    if (typeof window.completeExercise === "function") {
      window.completeExercise(literacyScore);
    }
  }

  function addLiteracyStyles() {
    if (document.getElementById("literacyStyles")) return;

    const style = document.createElement("style");
    style.id = "literacyStyles";

    style.textContent = `
      .literacy-box {
        padding: 20px;
        border-radius: 18px;
        background: #f7f5ff;
        margin-top: 15px;
      }

      .literacy-progress {
        font-weight: bold;
        color: #7045b5;
        margin-bottom: 18px;
      }

      .literacy-question {
        background: white;
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 15px;
        border: 1px solid #e7ddff;
      }

      .literacy-question h3 {
        font-size: 17px;
        margin-bottom: 14px;
      }

      .literacy-options {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .literacy-options label {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 10px 14px;
        border: 1px solid #ddd2f5;
        border-radius: 10px;
        cursor: pointer;
      }

      .literacy-btn {
        padding: 11px 17px;
        border: none;
        border-radius: 10px;
        background: #7650bd;
        color: white;
        margin: 7px 5px 7px 0;
        cursor: pointer;
      }

      .literacy-input,
      .literacy-textarea {
        width: 100%;
        padding: 13px;
        border: 1px solid #cfc2ed;
        border-radius: 10px;
        font-size: 16px;
        margin-top: 10px;
        box-sizing: border-box;
      }

      .literacy-textarea {
        min-height: 120px;
        resize: vertical;
      }

      .literacy-image {
        font-size: 55px;
        text-align: center;
        padding: 10px;
      }

      .literacy-reading {
        background: #f1edff;
        padding: 14px;
        border-radius: 10px;
        line-height: 1.7;
      }

      #literacyFeedback {
        margin: 15px 0;
        font-weight: 600;
      }
    `;

    document.head.appendChild(style);
  }

  function registerLiteracyTasks() {
    if (!window.sections) return;

    window.sections.literacy = literacyTasks;

    if (!window.sections["оқу және жазу"]) {
      window.sections["оқу және жазу"] = literacyTasks;
    }
  }

  function watchLiteracyPage() {
    const titleElement = document.getElementById("exerciseTitle");
    if (!titleElement) return;

    let previousTitle = "";

    const observer = new MutationObserver(() => {
      const title = titleElement.textContent.trim();

      if (title && title !== previousTitle) {
        previousTitle = title;
        renderLiteracyTask(title);
      }
    });

    observer.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function initializeLiteracy() {
    registerLiteracyTasks();
    addLiteracyStyles();
    watchLiteracyPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLiteracy);
  } else {
    initializeLiteracy();
  }

})();
