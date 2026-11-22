// ==========================================
// ТІЛАШАР — СӨЙЛЕУДІ ТҮСІНУ
// ==========================================

const comprehensionExercises = [
    {
        id: "comp_listen",
        title: "1. Тыңда да, тап!",
        goal: "Есту арқылы қабылдау және сөз мағынасын түсіну.",
        instruction: "Сөзді тыңдап, сәйкес суретті таңдаңыз.",
        questions: [
            { word: "Алма", emoji: "🍎", options: ["🍎", "🚗", "🏠"] },
            { word: "Мысық", emoji: "🐱", options: ["🐶", "🐱", "🐟"] },
            { word: "Кітап", emoji: "📚", options: ["⚽", "📚", "🌳"] },
            { word: "Көлік", emoji: "🚗", options: ["🚗", "🍐", "☀️"] }
        ]
    },
    {
        id: "comp_hidden",
        title: "2. Жасырын зат",
        goal: "Заттарды сипаттамасы арқылы тану.",
        instruction: "Сипаттаманы оқып, жасырылған затты табыңыз.",
        questions: [
            { question: "Онымен уақытты білеміз.", answer: "Сағат", options: ["Сағат", "Қасық", "Доп"] },
            { question: "Онымен жазамыз.", answer: "Қалам", options: ["Кесе", "Қалам", "Есік"] },
            { question: "Ол аспанда жарқырайды.", answer: "Күн", options: ["Үстел", "Кітап", "Күн"] },
            { question: "Ол жаңбырдан қорғайды.", answer: "Қолшатыр", options: ["Қолшатыр", "Қалам", "Алма"] }
        ]
    },
    {
        id: "comp_sound",
        title: "3. Дыбыстың иесін тап",
        goal: "Дыбыс пен оның көзі арасындағы байланысты анықтау.",
        instruction: "Дыбысты тыңдап немесе атауын оқып, дұрыс жауапты таңдаңыз.",
        questions: [
            { sound: "Мяу-мяу", answer: "Мысық", options: ["Мысық", "Ит", "Құс"] },
            { sound: "Аф-аф", answer: "Ит", options: ["Сиыр", "Ит", "Мысық"] },
            { sound: "Мө-ө", answer: "Сиыр", options: ["Қой", "Жылқы", "Сиыр"] },
            { sound: "Шиқ-шиқ", answer: "Құс", options: ["Құс", "Мысық", "Ит"] }
        ]
    },
    {
        id: "comp_category",
        title: "4. Қайсысы қайда жатады?",
        goal: "Заттарды мағыналық топтарға жіктеу.",
        instruction: "Заттың қай топқа жататынын анықтаңыз.",
        questions: [
            { word: "Алма", answer: "Жемістер", options: ["Жемістер", "Киімдер", "Ыдыстар"] },
            { word: "Көйлек", answer: "Киімдер", options: ["Жиһаз", "Киімдер", "Жемістер"] },
            { word: "Кесе", answer: "Ыдыстар", options: ["Ыдыстар", "Көліктер", "Жануарлар"] },
            { word: "Үстел", answer: "Жиһаз", options: ["Жемістер", "Жиһаз", "Киімдер"] }
        ]
    },
    {
        id: "comp_action",
        title: "5. Әрекетті таны!",
        goal: "Әрекет сөздерін түсіну және ажырату.",
        instruction: "Берілген әрекетке сәйкес суретті таңдаңыз.",
        questions: [
            { word: "Адам оқып отыр", answer: "📖", options: ["📖", "🏃", "🍽️"] },
            { word: "Адам жүгіріп жүр", answer: "🏃", options: ["🛌", "🏃", "🚿"] },
            { word: "Адам тамақ ішіп отыр", answer: "🍽️", options: ["🍽️", "📚", "🚗"] },
            { word: "Адам ұйықтап жатыр", answer: "🛌", options: ["⚽", "🛌", "📞"] }
        ]
    },
    {
        id: "comp_position",
        title: "6. Қай жерде орналасқан?",
        goal: "Кеңістіктік ұғымдарды түсіну.",
        instruction: "Заттың орналасқан жерін анықтаңыз.",
        questions: [
            { question: "Доп үстелдің үстінде тұр.", answer: "Үстінде", options: ["Үстінде", "Астында", "Ішінде"] },
            { question: "Мысық орындықтың астында.", answer: "Астында", options: ["Ішінде", "Астында", "Үстінде"] },
            { question: "Кітап сөмкенің ішінде.", answer: "Ішінде", options: ["Үстінде", "Артында", "Ішінде"] },
            { question: "Ағаш үйдің алдында тұр.", answer: "Алдында", options: ["Артында", "Алдында", "Ішінде"] }
        ]
    },
    {
        id: "comp_sentence",
        title: "7. Сөйлемнің суретін тап!",
        goal: "Сөйлем мазмұнын түсіну және оны бейнемен байланыстыру.",
        instruction: "Сөйлемді оқып, оған сәйкес суретті таңдаңыз.",
        questions: [
            { question: "Бала доп ойнап жүр.", answer: "⚽", options: ["⚽", "📚", "🍎"] },
            { question: "Қыз гүл суарып жүр.", answer: "🌷", options: ["🚗", "🌷", "🐱"] },
            { question: "Әже шай ішіп отыр.", answer: "☕", options: ["⚽", "☕", "🌳"] },
            { question: "Құс ағашта отыр.", answer: "🐦", options: ["🐟", "🐦", "🚲"] }
        ]
    },
    {
        id: "comp_instruction",
        title: "8. Дұрыс орында!",
        goal: "Қарапайым нұсқауларды түсіну және ретімен орындау.",
        instruction: "Берілген тапсырмаға сәйкес дұрыс әрекетті таңдаңыз.",
        questions: [
            { question: "Алдымен қолды жуу керек. Қайсысы дұрыс?", answer: "🧼", options: ["🧼", "🛌", "⚽"] },
            { question: "Кітапты ашыңыз. Қайсысын таңдайсыз?", answer: "📖", options: ["🚗", "📖", "🍎"] },
            { question: "Шайды кесеге құйыңыз. Қайсысы сәйкес?", answer: "☕", options: ["🌳", "🐱", "☕"] },
            { question: "Есікті жабыңыз. Қайсысы сәйкес?", answer: "🚪", options: ["🚪", "📚", "🍐"] }
        ]
    }
];

// ==========================================
// НЕГІЗГІ ЖҮЙЕГЕ ҚОСУ
// ==========================================

(function registerComprehension() {
    if (typeof sections === "undefined") return;

    const section =
        sections.comprehension ||
        sections["сөйлеуді түсіну"];

    if (!section) {
        console.warn("Сөйлеуді түсіну бөлімі табылмады.");
        return;
    }

    section.tasks = comprehensionExercises.map(item => ({
        id: item.id,
        title: item.title,
        goal: item.goal,
        instruction: item.instruction,
        materials: "Интерактивті тапсырма",
        warning: "Қажет болған жағдайда тапсырманы қайталап тыңдаңыз."
    }));
})();

// ==========================================
// АҒЫМДАҒЫ ТАПСЫРМА
// ==========================================

let comprehensionCurrent = null;
let comprehensionIndex = 0;
let comprehensionScore = 0;
let comprehensionAnswered = false;

function renderComprehensionExercise(exercise) {
    comprehensionCurrent = exercise;
    comprehensionIndex = 0;
    comprehensionScore = 0;

    const content = document.getElementById("exerciseContent");
    if (!content) return;

    content.innerHTML = `
        <div class="comprehension-game">
            <h2>${exercise.title}</h2>

            <div class="comp-info">
                <h3>🎯 Мақсаты</h3>
                <p>${exercise.goal}</p>
                <h3>📋 Орындалу тәртібі</h3>
                <p>${exercise.instruction}</p>
            </div>

            <div id="compQuestion"></div>
            <div id="compFeedback"></div>

            <div class="comp-progress">
                Дұрыс жауап: <span id="compScore">0</span>
            </div>

            <button onclick="showComprehensionHelp()">
                💡 Көмек
            </button>

            <button onclick="finishComprehensionExercise()">
                ✅ Орындадым
            </button>
        </div>
    `;

    addComprehensionStyles();
    renderComprehensionQuestion();
}

// ==========================================
// СҰРАҚТЫ ШЫҒАРУ
// ==========================================

function renderComprehensionQuestion() {
    const area = document.getElementById("compQuestion");
    if (!area || !comprehensionCurrent) return;

    const questions = comprehensionCurrent.questions;

    if (comprehensionIndex >= questions.length) {
        area.innerHTML = `
            <h3>🎉 Барлық сұрақ аяқталды!</h3>
        `;
        return;
    }

    comprehensionAnswered = false;

    const item = questions[comprehensionIndex];

    let prompt =
        item.question ||
        item.word ||
        item.sound ||
        "Дұрыс жауапты таңдаңыз.";

    let options = item.options;

    if (comprehensionCurrent.id === "comp_listen") {
        prompt = `🔊 Тыңдаңыз: ${item.word}`;
    }

    if (comprehensionCurrent.id === "comp_sound") {
        prompt = `🔊 Дыбыс: ${item.sound}`;
    }

    area.innerHTML = `
        <div class="comp-question-card">
            <div class="comp-number">
                ${comprehensionIndex + 1} / ${questions.length}
            </div>

            <h3>${prompt}</h3>

            ${comprehensionCurrent.id === "comp_listen"
                ? `<button onclick="speakComprehension('${item.word}')">🔊 Қайта тыңдау</button>`
                : ""
            }

            <div class="comp-options">
                ${options.map(option => `
                    <button onclick="checkComprehensionAnswer(this, '${option}')">
                        ${option}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

// ==========================================
// ЖАУАПТЫ ТЕКСЕРУ
// ==========================================

function checkComprehensionAnswer(button, answer) {
    if (comprehensionAnswered) return;

    const item = comprehensionCurrent.questions[comprehensionIndex];

    if (answer === item.answer || answer === item.emoji) {
        comprehensionScore++;

        document.getElementById("compFeedback").innerHTML =
            "✅ Дұрыс жауап!";

    } else {
        document.getElementById("compFeedback").innerHTML =
            "🔄 Қайта ойланып көріңіз.";
    }

    document.getElementById("compScore").textContent =
        comprehensionScore;

    comprehensionAnswered = true;

    document.querySelectorAll(".comp-options button").forEach(btn => {
        btn.disabled = true;
    });

    setTimeout(() => {
        comprehensionIndex++;
        document.getElementById("compFeedback").innerHTML = "";
        renderComprehensionQuestion();
    }, 900);
}

// ==========================================
// ДАУЫСТАП ОҚУ
// ==========================================

function speakComprehension(text) {
    if (!("speechSynthesis" in window)) {
        alert("Бұл браузерде дыбыстау қолжетімді емес.");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kk-KZ";
    utterance.rate = 0.85;

    speechSynthesis.speak(utterance);
}

// ==========================================
// КӨМЕК
// ==========================================

function showComprehensionHelp() {
    if (!comprehensionCurrent) return;

    const item = comprehensionCurrent.questions[comprehensionIndex];

    if (!item) {
        alert("Тапсырма аяқталды!");
        return;
    }

    const answer = item.answer || item.emoji;

    alert("Көмек: дұрыс жауап — " + answer);
}

// ==========================================
// НӘТИЖЕ ЖӘНЕ АЯҚТАУ
// ==========================================

function finishComprehensionExercise() {
    if (!comprehensionCurrent) return;

    const total = comprehensionCurrent.questions.length;
    const percentage = comprehensionScore / total;

    let score = 0;

    if (percentage >= 0.9) score = 3;
    else if (percentage >= 0.6) score = 2;
    else if (percentage > 0) score = 1;

    alert(
        "Тапсырма аяқталды!\n" +
        "Дұрыс жауап: " + comprehensionScore + "/" + total +
        "\nБаға: " + score + "/3"
    );

    if (typeof window.completeExercise === "function") {
        window.completeExercise(score);
    }
}

// ==========================================
// СТИЛЬДЕР
// ==========================================

function addComprehensionStyles() {
    if (document.getElementById("comprehensionStyles")) return;

    const style = document.createElement("style");
    style.id = "comprehensionStyles";

    style.textContent = `
        .comprehension-game {
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding: 20px;
        }

        .comp-info {
            background: #eee8ff;
            padding: 18px;
            border-radius: 15px;
        }

        .comp-question-card {
            background: white;
            padding: 22px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 3px 12px rgba(0,0,0,.07);
        }

        .comp-number {
            color: #7655c9;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .comp-options {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 20px;
        }

        .comp-options button,
        .comprehension-game > button,
        .comp-question-card > button {
            padding: 14px;
            border: none;
            border-radius: 12px;
            background: #7655c9;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .comp-options button:disabled {
            opacity: .6;
        }

        .comp-progress {
            padding: 15px;
            border-radius: 12px;
            background: #e4f8ed;
            text-align: center;
            font-weight: bold;
        }

        #compFeedback {
            min-height: 25px;
            text-align: center;
            font-weight: bold;
        }
    `;

    document.head.appendChild(style);
}

// ==========================================
// ТАПСЫРМАНЫ АШУ
// ==========================================

function findComprehensionExercise(title) {
    return comprehensionExercises.find(item =>
        title === item.title ||
        title.includes(item.title.replace(/^\d+\.\s*/, ""))
    );
}

function watchComprehensionExercise() {
    const titleElement = document.getElementById("exerciseTitle");

    if (!titleElement) return;

    let lastTitle = "";

    const observer = new MutationObserver(() => {
        const title = titleElement.textContent.trim();

        if (!title || title === lastTitle) return;

        const exercise = findComprehensionExercise(title);

        if (exercise) {
            lastTitle = title;
            renderComprehensionExercise(exercise);
        } else {
            lastTitle = "";
            comprehensionCurrent = null;
        }
    });

    observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    watchComprehensionExercise();
});
