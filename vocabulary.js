// ======================================
// ТІЛАШАР — СӨЗДІК ҚОР
// ======================================

const vocabularyExercises = [
    {
        id: "voc_world",
        title: "1. Сөздер әлемі",
        goal: "Күнделікті қолданылатын сөздерді еске түсіру және белсенді сөздік қорды дамыту.",
        instruction: "Суретке қарап, заттың атауын таңдаңыз.",
        items: [
            { emoji: "🍎", word: "Алма", options: ["Алма", "Доп", "Үй"] },
            { emoji: "🏠", word: "Үй", options: ["Кітап", "Үй", "Гүл"] },
            { emoji: "🐈", word: "Мысық", options: ["Ит", "Құс", "Мысық"] },
            { emoji: "🚗", word: "Көлік", options: ["Көлік", "Үстел", "Күн"] }
        ]
    },
    {
        id: "voc_missing",
        title: "2. Жоғалған сөзді тап",
        goal: "Сөзді есте сақтау және сөйлем мағынасына сәйкес сөзді таңдау.",
        instruction: "Сөйлемді оқып, бос орынға сәйкес сөзді таңдаңыз.",
        items: [
            { question: "Мен таңертең ... ішемін.", answer: "Шай", options: ["Шай", "Доп", "Ағаш"] },
            { question: "Қыста ... жауады.", answer: "Қар", options: ["Жаңбыр", "Қар", "Гүл"] },
            { question: "Құстар ... ұшады.", answer: "Аспанда", options: ["Суда", "Үйде", "Аспанда"] },
            { question: "Кітапты ... оқимын.", answer: "Көзбен", options: ["Қолмен", "Көзбен", "Аяқпен"] }
        ]
    },
    {
        id: "voc_wake",
        title: "3. Сөзді оят!",
        goal: "Зат атауларын еске түсіру және сөзді суретпен байланыстыру.",
        instruction: "Берілген суретке сәйкес сөзді таңдаңыз.",
        items: [
            { emoji: "🌳", answer: "Ағаш", options: ["Ағаш", "Бұлт", "Гүл"] },
            { emoji: "☀️", answer: "Күн", options: ["Ай", "Күн", "Жұлдыз"] },
            { emoji: "📚", answer: "Кітап", options: ["Қалам", "Дәптер", "Кітап"] },
            { emoji: "🐟", answer: "Балық", options: ["Құс", "Балық", "Мысық"] }
        ]
    },
    {
        id: "voc_basket",
        title: "4. Сөздер себеті",
        goal: "Заттарды мағыналық топтарға жіктеу және сөздік қорды жүйелеу.",
        instruction: "Берілген сөздерді тиісті топқа орналастырыңыз.",
        items: [
            { word: "Алма", group: "Жемістер" },
            { word: "Алмұрт", group: "Жемістер" },
            { word: "Сәбіз", group: "Көкөністер" },
            { word: "Қияр", group: "Көкөністер" },
            { word: "Өрік", group: "Жемістер" },
            { word: "Қызанақ", group: "Көкөністер" }
        ]
    },
    {
        id: "voc_friends",
        title: "5. Сөздің досын тап",
        goal: "Мағыналық байланыстарды анықтау және сөздерді жұптастыру.",
        instruction: "Мағынасы жағынан бір-біріне сәйкес келетін сөздерді табыңыз.",
        items: [
            { word: "Күн", answer: "Жарық" },
            { word: "Қыс", answer: "Қар" },
            { word: "Қалам", answer: "Жазу" },
            { word: "Құс", answer: "Ұшу" }
        ]
    },
    {
        id: "voc_day",
        title: "6. Менің бір күнім",
        goal: "Күнделікті әрекеттерді атау және оқиғаларды ретімен орналастыру.",
        instruction: "Күнделікті әрекеттерді дұрыс ретпен орналастырыңыз.",
        items: [
            { word: "Ояну", order: 1 },
            { word: "Жуыну", order: 2 },
            { word: "Таңғы ас ішу", order: 3 },
            { word: "Серуендеу", order: 4 },
            { word: "Ұйықтау", order: 5 }
        ]
    }
];

// ======================================
// НЕГІЗГІ ЖҮЙЕГЕ ТІРКЕУ
// ======================================

(function registerVocabulary() {
    if (typeof sections === "undefined") return;

    const section =
        sections.vocabulary ||
        sections["сөздік қор"];

    if (!section) {
        console.warn("Сөздік қор бөлімі табылмады.");
        return;
    }

    section.tasks = vocabularyExercises.map(item => ({
        id: item.id,
        title: item.title,
        goal: item.goal,
        instruction: item.instruction,
        materials: "Интерактивті тапсырма",
        warning: "Тапсырманы асықпай орындаңыз. Қажет болса, көмек батырмасын пайдаланыңыз."
    }));
})();

// ======================================
// ТАПСЫРМАНЫ КӨРСЕТУ
// ======================================

let vocabularyCurrent = null;
let vocabularyScore = 0;
let vocabularyIndex = 0;

function renderVocabularyExercise(exercise) {
    vocabularyCurrent = exercise;
    vocabularyScore = 0;
    vocabularyIndex = 0;

    const content = document.getElementById("exerciseContent");
    if (!content) return;

    content.innerHTML = `
        <div class="vocabulary-game">
            <h2>${exercise.title}</h2>

            <div class="voc-description">
                <h3>🎯 Мақсаты</h3>
                <p>${exercise.goal}</p>
                <h3>📋 Тапсырма</h3>
                <p>${exercise.instruction}</p>
            </div>

            <div id="vocGameArea"></div>

            <div id="vocFeedback"></div>

            <div class="voc-score">
                Дұрыс жауап: <span id="vocScore">0</span>
            </div>

            <button onclick="showVocabularyHelp()">
                💡 Көмек
            </button>

            <button onclick="finishVocabularyExercise()">
                ✅ Орындадым
            </button>
        </div>
    `;

    addVocabularyStyles();
    renderVocabularyQuestion();
}

// ======================================
// СҰРАҚТАРДЫ ШЫҒАРУ
// ======================================

function renderVocabularyQuestion() {
    const area = document.getElementById("vocGameArea");
    if (!area || !vocabularyCurrent) return;

    const items = vocabularyCurrent.items;

    if (vocabularyIndex >= items.length) {
        area.innerHTML = `
            <h3>🎉 Тапсырма аяқталды!</h3>
            <p>Дұрыс жауап саны: ${vocabularyScore}</p>
        `;
        return;
    }

    const item = items[vocabularyIndex];

    if (vocabularyCurrent.id === "voc_world" ||
        vocabularyCurrent.id === "voc_wake") {
        renderPictureQuestion(area, item);
    }

    else if (vocabularyCurrent.id === "voc_missing") {
        renderMissingQuestion(area, item);
    }

    else if (vocabularyCurrent.id === "voc_basket") {
        renderBasketQuestion(area, item);
    }

    else if (vocabularyCurrent.id === "voc_friends") {
        renderFriendsQuestion(area, item);
    }

    else if (vocabularyCurrent.id === "voc_day") {
        renderDayQuestion(area, item);
    }
}

// ======================================
// СУРЕТТІ ТАП
// ======================================

function renderPictureQuestion(area, item) {
    area.innerHTML = `
        <div class="voc-question">
            <div class="voc-picture">${item.emoji}</div>
            <h3>Бұл не?</h3>

            <div class="voc-options">
                ${item.options.map(option => `
                    <button onclick="checkVocabularyAnswer('${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

// ======================================
// ЖОҒАЛҒАН СӨЗ
// ======================================

function renderMissingQuestion(area, item) {
    area.innerHTML = `
        <div class="voc-question">
            <h3>${item.question}</h3>

            <div class="voc-options">
                ${item.options.map(option => `
                    <button onclick="checkVocabularyAnswer('${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

// ======================================
// СӨЗДЕР СЕБЕТІ
// ======================================

function renderBasketQuestion(area, item) {
    area.innerHTML = `
        <div class="voc-question">
            <h3>«${item.word}» қай топқа жатады?</h3>

            <div class="voc-options">
                <button onclick="checkVocabularyAnswer('Жемістер')">
                    🍎 Жемістер
                </button>

                <button onclick="checkVocabularyAnswer('Көкөністер')">
                    🥕 Көкөністер
                </button>
            </div>
        </div>
    `;
}

// ======================================
// СӨЗДІҢ ДОСЫН ТАП
// ======================================

function renderFriendsQuestion(area, item) {
    const options = vocabularyCurrent.items.map(x => x.answer);

    area.innerHTML = `
        <div class="voc-question">
            <h3>«${item.word}» сөзіне сәйкес сөзді тап.</h3>

            <div class="voc-options">
                ${options.map(option => `
                    <button onclick="checkVocabularyAnswer('${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

// ======================================
// МЕНІҢ БІР КҮНІМ
// ======================================

function renderDayQuestion(area, item) {
    const options = vocabularyCurrent.items
        .map(x => x.word)
        .sort(() => Math.random() - 0.5);

    area.innerHTML = `
        <div class="voc-question">
            <h3>Әрекеттерді дұрыс ретпен таңдаңыз.</h3>

            <p>Кезектегі әрекет: ${vocabularyIndex + 1}</p>

            <div class="voc-options">
                ${options.map(option => `
                    <button onclick="checkVocabularyAnswer('${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

// ======================================
// ЖАУАПТЫ ТЕКСЕРУ
// ======================================

function checkVocabularyAnswer(answer) {
    if (!vocabularyCurrent) return;

    const item = vocabularyCurrent.items[vocabularyIndex];
    let correct = false;

    if (vocabularyCurrent.id === "voc_world" ||
        vocabularyCurrent.id === "voc_wake") {
        correct = answer === item.word;
    }

    else if (vocabularyCurrent.id === "voc_missing") {
        correct = answer === item.answer;
    }

    else if (vocabularyCurrent.id === "voc_basket") {
        correct = answer === item.group;
    }

    else if (vocabularyCurrent.id === "voc_friends") {
        correct = answer === item.answer;
    }

    else if (vocabularyCurrent.id === "voc_day") {
        correct = answer === item.word;
    }

    const feedback = document.getElementById("vocFeedback");

    if (correct) {
        vocabularyScore++;

        if (feedback) {
            feedback.innerHTML = "✅ Дұрыс жауап!";
        }
    } else {
        if (feedback) {
            feedback.innerHTML = "🔄 Қайта ойланып көріңіз.";
        }
    }

    const score = document.getElementById("vocScore");
    if (score) score.textContent = vocabularyScore;

    vocabularyIndex++;

    setTimeout(renderVocabularyQuestion, 700);
}

// ======================================
// КӨМЕК
// ======================================

function showVocabularyHelp() {
    if (!vocabularyCurrent) return;

    const item = vocabularyCurrent.items[vocabularyIndex];

    if (!item) {
        alert("Тапсырма аяқталды!");
        return;
    }

    let answer = item.word || item.answer || item.group;

    if (vocabularyCurrent.id === "voc_day") {
        answer = vocabularyCurrent.items
            .sort((a, b) => a.order - b.order)[vocabularyIndex].word;
    }

    alert("Көмек: дұрыс жауап — " + answer);
}

// ======================================
// АЯҚТАУ ЖӘНЕ БАҒАЛАУ
// ======================================

function finishVocabularyExercise() {
    if (!vocabularyCurrent) return;

    const total = vocabularyCurrent.items.length;

    const percentage = total
        ? vocabularyScore / total
        : 0;

    let score = 0;

    if (percentage >= 0.9) score = 3;
    else if (percentage >= 0.6) score = 2;
    else if (percentage > 0) score = 1;

    alert(
        "Тапсырма аяқталды!\n" +
        "Дұрыс жауап: " + vocabularyScore + "/" + total +
        "\nБаға: " + score + "/3"
    );

    stopArticulationCamera?.();

    if (typeof window.completeExercise === "function") {
        window.completeExercise(score);
    }
}

// ======================================
// СТИЛЬ
// ======================================

function addVocabularyStyles() {
    if (document.getElementById("vocabularyStyles")) return;

    const style = document.createElement("style");
    style.id = "vocabularyStyles";

    style.textContent = `
        .vocabulary-game {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .voc-description {
            background: #f0eaff;
            padding: 18px;
            border-radius: 15px;
        }

        .voc-question {
            background: #ffffff;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 3px 12px rgba(0,0,0,.07);
        }

        .voc-picture {
            font-size: 90px;
            margin: 15px;
        }

        .voc-options {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 20px;
        }

        .voc-options button,
        .vocabulary-game > button {
            padding: 14px;
            border: none;
            border-radius: 12px;
            background: #7957c8;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .voc-score {
            padding: 15px;
            background: #e4f8ed;
            border-radius: 12px;
            text-align: center;
            font-weight: bold;
        }

        #vocFeedback {
            text-align: center;
            font-weight: bold;
            min-height: 25px;
        }
    `;

    document.head.appendChild(style);
}

// ======================================
// ТАПСЫРМАНЫ АШУ
// ======================================

function findVocabularyExercise(title) {
    return vocabularyExercises.find(item =>
        title === item.title ||
        title.includes(item.title.replace(/^\d+\.\s*/, ""))
    );
}

function watchVocabularyExercise() {
    const titleElement = document.getElementById("exerciseTitle");

    if (!titleElement) return;

    let lastTitle = "";

    const observer = new MutationObserver(() => {
        const title = titleElement.textContent.trim();

        if (!title || title === lastTitle) return;

        const exercise = findVocabularyExercise(title);

        if (exercise) {
            lastTitle = title;
            renderVocabularyExercise(exercise);
        } else {
            lastTitle = "";
            vocabularyCurrent = null;
        }
    });

    observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    watchVocabularyExercise();
});
