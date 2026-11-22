// ==========================================
// ТІЛАШАР — СӨЙЛЕУДІ ҚАЛЫПТАСТЫРУ
// ==========================================

const speechExercises = [
    {
        id: "speech_sound",
        title: "1. Дыбысты оят!",
        goal: "Дыбыстарды есту, тану және қайталау дағдысын дамыту.",
        instruction: "Берілген дыбысты тыңдап, қайталап айтыңыз.",
        questions: [
            { text: "А", options: ["А", "О", "Ұ"], answer: "А" },
            { text: "М", options: ["М", "С", "Т"], answer: "М" },
            { text: "С", options: ["Р", "С", "Л"], answer: "С" },
            { text: "О", options: ["Ө", "А", "О"], answer: "О" }
        ]
    },
    {
        id: "speech_syllable",
        title: "2. Буын пойызы",
        goal: "Буындарды біріктіріп, сөз құрастыру.",
        instruction: "Екі буынды біріктіріп, дұрыс сөзді таңдаңыз.",
        questions: [
            { text: "АҚ + ҚУ", answer: "АҚҚУ", options: ["АҚҚУ", "АҚАЛ", "ҚУАҚ"] },
            { text: "БА + ЛА", answer: "БАЛА", options: ["БАЛА", "ЛАБА", "БАБА"] },
            { text: "ҚА + ЛАМ", answer: "ҚАЛАМ", options: ["ҚАЛАМ", "ЛАҚАМ", "ҚАМАЛ"] },
            { text: "А + НА", answer: "АНА", options: ["АНА", "НАА", "ААН"] }
        ]
    },
    {
        id: "speech_picture",
        title: "3. Суретті сөйлет!",
        goal: "Сурет бойынша сөз және сөйлем құрастыру.",
        instruction: "Суретке қарап, затты атаңыз және қысқа сөйлем құрастырыңыз.",
        questions: [
            { emoji: "🐱", answer: "Мысық", options: ["Мысық", "Ит", "Құс"] },
            { emoji: "🌳", answer: "Ағаш", options: ["Гүл", "Ағаш", "Үй"] },
            { emoji: "🚗", answer: "Көлік", options: ["Көлік", "Доп", "Кітап"] },
            { emoji: "🍎", answer: "Алма", options: ["Алмұрт", "Алма", "Өрік"] }
        ]
    },
    {
        id: "speech_complete",
        title: "4. Сөзді толықтыр!",
        goal: "Сөздің жетіспейтін бөлігін анықтау.",
        instruction: "Сөздегі түсіп қалған буынды тауып, толық сөзді таңдаңыз.",
        questions: [
            { text: "БА...А", answer: "БАЛА", options: ["БАЛА", "БОЛА", "БАЛЫ"] },
            { text: "ҚА...М", answer: "ҚАЛАМ", options: ["ҚАЛАМ", "ҚАРАМ", "ҚАМАЛ"] },
            { text: "КІ...П", answer: "КІТАП", options: ["КІТАП", "КІЛІП", "КІРІП"] },
            { text: "А...А", answer: "АНА", options: ["АНА", "АТА", "АСА"] }
        ]
    },
    {
        id: "speech_build",
        title: "5. Сөз құрастыру шеберханасы",
        goal: "Әріптерден мағыналы сөз құрастыру.",
        instruction: "Берілген әріптерді дұрыс ретке келтіріңіз.",
        questions: [
            { text: "А – Н – А", answer: "АНА", options: ["АНА", "НАА", "ААН"] },
            { text: "Ү – Й", answer: "ҮЙ", options: ["ЙҮ", "ҮЙ", "ҮҮ"] },
            { text: "А – Т – А", answer: "АТА", options: ["АТА", "ТАА", "ААТ"] },
            { text: "О – Р – М – А – Н", answer: "ОРМАН", options: ["ОРМАН", "МОРАН", "АНМОР"] }
        ]
    },
    {
        id: "speech_story",
        title: "6. Әңгіме құрастыр!",
        goal: "Бірізді ой айту және байланыстырып сөйлеу дағдысын дамыту.",
        instruction: "Суреттерді ретімен қарап, оқиға туралы әңгіме құрастырыңыз.",
        questions: [
            { emoji: "🌱", text: "Тұқым отырғызу" },
            { emoji: "💧", text: "Су құю" },
            { emoji: "🌿", text: "Өсімдіктің өсуі" },
            { emoji: "🌻", text: "Гүлдің ашылуы" }
        ]
    },
    {
        id: "speech_dialog",
        title: "7. Диалог алаңы",
        goal: "Күнделікті қарым-қатынасқа қажетті диалог құру.",
        instruction: "Сұраққа сәйкес жауапты таңдаңыз.",
        questions: [
            { text: "Сәлеметсіз бе?", answer: "Сәлеметсіз бе!", options: ["Сәлеметсіз бе!", "Сау болыңыз!", "Рақмет!"] },
            { text: "Атыңыз кім?", answer: "Менің атым Айжан.", options: ["Менің атым Айжан.", "Жақсы.", "Сау болыңыз."] },
            { text: "Қалыңыз қалай?", answer: "Жақсы, рақмет.", options: ["Жақсы, рақмет.", "Менің үйім.", "Кітап оқимын."] },
            { text: "Сізге не қажет?", answer: "Маған су қажет.", options: ["Маған су қажет.", "Мен келдім.", "Күн жылы."] }
        ]
    },
    {
        id: "speech_microphone",
        title: "8. Микрофон менің қолымда!",
        goal: "Өз ойын ауызша жеткізу және сөйлеу белсенділігін арттыру.",
        instruction: "Микрофонды қосып, берілген тақырып бойынша сөйлеңіз.",
        questions: [
            { text: "Өзіңіз туралы айтып беріңіз." },
            { text: "Отбасыңыз туралы әңгімелеңіз." },
            { text: "Бүгінгі күніңізді сипаттаңыз." },
            { text: "Сүйікті ісіңіз туралы айтыңыз." }
        ]
    }
];

// ==========================================
// НЕГІЗГІ ЖҮЙЕГЕ ТІРКЕУ
// ==========================================

(function registerSpeechExercises() {
    if (typeof sections === "undefined") return;

    const section =
        sections.speech ||
        sections["сөйлеуді қалыптастыру"];

    if (!section) {
        console.warn("Сөйлеуді қалыптастыру бөлімі табылмады.");
        return;
    }

    section.tasks = speechExercises.map(item => ({
        id: item.id,
        title: item.title,
        goal: item.goal,
        instruction: item.instruction,
        materials: "Интерактивті тапсырма",
        warning: "Жауапты асықпай, өз қарқыныңызбен орындаңыз."
    }));
})();

// ==========================================
// АҒЫМДАҒЫ ТАПСЫРМА
// ==========================================

let speechCurrent = null;
let speechIndex = 0;
let speechScore = 0;
let speechStream = null;
let speechRecognition = null;

// ==========================================
// ТАПСЫРМАНЫ КӨРСЕТУ
// ==========================================

function renderSpeechExercise(exercise) {
    stopSpeechMicrophone();

    speechCurrent = exercise;
    speechIndex = 0;
    speechScore = 0;

    const content = document.getElementById("exerciseContent");
    if (!content) return;

    content.innerHTML = `
        <div class="speech-game">
            <h2>${exercise.title}</h2>

            <div class="speech-info">
                <h3>🎯 Мақсаты</h3>
                <p>${exercise.goal}</p>
                <h3>📋 Орындалу тәртібі</h3>
                <p>${exercise.instruction}</p>
            </div>

            <div id="speechQuestion"></div>
            <div id="speechFeedback"></div>

            <div class="speech-score">
                Дұрыс жауап: <span id="speechScore">0</span>
            </div>

            <button onclick="showSpeechHelp()">💡 Көмек</button>
            <button onclick="finishSpeechExercise()">✅ Орындадым</button>
        </div>
    `;

    addSpeechStyles();
    renderSpeechQuestion();
}

// ==========================================
// СҰРАҚТАР
// ==========================================

function renderSpeechQuestion() {
    const area = document.getElementById("speechQuestion");
    if (!area || !speechCurrent) return;

    const questions = speechCurrent.questions;

    if (speechIndex >= questions.length) {
        area.innerHTML = "<h3>🎉 Тапсырма аяқталды!</h3>";
        return;
    }

    const item = questions[speechIndex];

    if (speechCurrent.id === "speech_story") {
        area.innerHTML = `
            <div class="speech-question-card">
                <h3>${item.emoji}</h3>
                <p>${item.text}</p>
                <p>Осы сурет бойынша өз ойыңызды айтып көріңіз.</p>
                <button onclick="speechIndex++; renderSpeechQuestion()">
                    Келесі сурет
                </button>
            </div>
        `;
        return;
    }

    if (speechCurrent.id === "speech_microphone") {
        area.innerHTML = `
            <div class="speech-question-card">
                <h3>${item.text}</h3>
                <button onclick="startSpeechMicrophone()">🎙 Микрофонды қосу</button>
                <button onclick="stopSpeechMicrophone()">⏹ Тоқтату</button>
                <p id="speechMicStatus">Микрофон қосылмаған.</p>
                <p id="speechRecognized"></p>
                <button onclick="speechIndex++; renderSpeechQuestion()">
                    Келесі тақырып
                </button>
            </div>
        `;
        return;
    }

    let prompt = item.text || item.emoji || "";

    if (speechCurrent.id === "speech_picture") {
        prompt = `${item.emoji}<br>Бұл не?`;
    }

    area.innerHTML = `
        <div class="speech-question-card">
            <div>${speechIndex + 1} / ${questions.length}</div>
            <h3>${prompt}</h3>

            <div class="speech-options">
                ${item.options.map(option => `
                    <button onclick="checkSpeechAnswer('${option}')">
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

function checkSpeechAnswer(answer) {
    const item = speechCurrent.questions[speechIndex];
    const feedback = document.getElementById("speechFeedback");

    if (answer === item.answer) {
        speechScore++;
        feedback.textContent = "✅ Дұрыс жауап!";
    } else {
        feedback.textContent = "🔄 Қайта ойланып көріңіз.";
    }

    document.getElementById("speechScore").textContent = speechScore;

    document.querySelectorAll(".speech-options button").forEach(button => {
        button.disabled = true;
    });

    setTimeout(() => {
        speechIndex++;
        feedback.textContent = "";
        renderSpeechQuestion();
    }, 800);
}

// ==========================================
// МИКРОФОН
// ==========================================

async function startSpeechMicrophone() {
    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("Микрофон қолжетімді емес.");
        }

        speechStream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        const status = document.getElementById("speechMicStatus");
        if (status) status.textContent = "🎙 Микрофон қосылды. Сөйлеуге болады.";

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            speechRecognition = new SpeechRecognition();
            speechRecognition.lang = "kk-KZ";
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;

            speechRecognition.onresult = event => {
                let transcript = "";

                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript + " ";
                }

                const output = document.getElementById("speechRecognized");
                if (output) output.textContent = "Танылған мәтін: " + transcript;
            };

            speechRecognition.start();
        }

    } catch (error) {
        alert("Микрофонды қосу мүмкін болмады. Браузерден рұқсат беріңіз.");
        console.error(error);
    }
}

function stopSpeechMicrophone() {
    if (speechRecognition) {
        try {
            speechRecognition.stop();
        } catch (error) {}
        speechRecognition = null;
    }

    if (speechStream) {
        speechStream.getTracks().forEach(track => track.stop());
        speechStream = null;
    }

    const status = document.getElementById("speechMicStatus");
    if (status) status.textContent = "Микрофон тоқтатылды.";
}

// ==========================================
// КӨМЕК
// ==========================================

function showSpeechHelp() {
    if (!speechCurrent) return;

    const item = speechCurrent.questions[speechIndex];

    if (!item) {
        alert("Тапсырма аяқталды!");
        return;
    }

    alert(
        "Көмек: " +
        (item.answer || item.text || "Суретке мұқият қараңыз.")
    );
}

// ==========================================
// АЯҚТАУ
// ==========================================

function finishSpeechExercise() {
    if (!speechCurrent) return;

    stopSpeechMicrophone();

    const total = speechCurrent.questions.length;
    const percentage = total ? speechScore / total : 0;

    let score = 0;

    if (percentage >= 0.9) score = 3;
    else if (percentage >= 0.6) score = 2;
    else if (percentage > 0) score = 1;

    alert(
        "Тапсырма аяқталды!\n" +
        "Дұрыс жауап: " + speechScore + "/" + total +
        "\nБаға: " + score + "/3"
    );

    if (typeof window.completeExercise === "function") {
        window.completeExercise(score);
    }
}

// ==========================================
// СТИЛЬДЕР
// ==========================================

function addSpeechStyles() {
    if (document.getElementById("speechStyles")) return;

    const style = document.createElement("style");
    style.id = "speechStyles";

    style.textContent = `
        .speech-game {
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding: 20px;
        }

        .speech-info {
            padding: 18px;
            border-radius: 15px;
            background: #e9e4ff;
        }

        .speech-question-card {
            padding: 22px;
            border-radius: 16px;
            background: white;
            text-align: center;
            box-shadow: 0 3px 12px rgba(0,0,0,.07);
        }

        .speech-options {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 20px;
        }

        .speech-options button,
        .speech-question-card button,
        .speech-game > button {
            padding: 14px;
            border: none;
            border-radius: 12px;
            background: #7655c9;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .speech-score {
            padding: 15px;
            border-radius: 12px;
            background: #e4f8ed;
            text-align: center;
            font-weight: bold;
        }

        #speechFeedback {
            text-align: center;
            min-height: 25px;
            font-weight: bold;
        }
    `;

    document.head.appendChild(style);
}

// ==========================================
// ТАПСЫРМАНЫ АШУ
// ==========================================

function findSpeechExercise(title) {
    return speechExercises.find(item =>
        title === item.title ||
        title.includes(item.title.replace(/^\d+\.\s*/, ""))
    );
}

function watchSpeechExercise() {
    const titleElement = document.getElementById("exerciseTitle");

    if (!titleElement) return;

    let lastTitle = "";

    const observer = new MutationObserver(() => {
        const title = titleElement.textContent.trim();

        if (!title || title === lastTitle) return;

        const exercise = findSpeechExercise(title);

        if (exercise) {
            lastTitle = title;
            renderSpeechExercise(exercise);
        } else {
            lastTitle = "";
            speechCurrent = null;
            stopSpeechMicrophone();
        }
    });

    observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    watchSpeechExercise();
});
