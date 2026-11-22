// =====================================
// ТІЛАШАР — ДАУЫСТАП ОҚУ ЖҮЙЕСІ
// =====================================

(function () {

    const style = document.createElement("style");

    style.textContent = `
        .audio-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
        }

        .audio-controls button {
            padding: 12px 17px;
            border: none;
            border-radius: 12px;
            background: #eeeaff;
            color: #51429b;
            font-size: 14px;
            cursor: pointer;
        }

        .audio-controls button:hover {
            background: #ddd5ff;
        }

        .audio-controls button:disabled {
            opacity: .5;
            cursor: not-allowed;
        }

        #audioStatus {
            font-size: 13px;
            color: #6252b5;
            margin-top: 8px;
        }
    `;

    document.head.appendChild(style);

    let currentUtterance = null;

    // Мәтінді дауыстап оқу
    window.speakTilasharText = function (text) {

        if (!("speechSynthesis" in window)) {
            alert("Бұл браузерде дауыстап оқу мүмкіндігі жоқ.");
            return;
        }

        if (!text || !text.trim()) {
            alert("Оқылатын мәтін табылмады.");
            return;
        }

        window.speechSynthesis.cancel();

        currentUtterance =
            new SpeechSynthesisUtterance(text);

        currentUtterance.lang = "kk-KZ";
        currentUtterance.rate = 0.85;
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;

        currentUtterance.onstart = function () {
            updateAudioStatus("🔊 Мәтін оқылып жатыр...");
        };

        currentUtterance.onend = function () {
            updateAudioStatus("✅ Оқу аяқталды.");
        };

        currentUtterance.onerror = function () {
            updateAudioStatus(
                "Оқу мүмкін болмады. Браузерді тексеріңіз."
            );
        };

        window.speechSynthesis.speak(currentUtterance);
    };

    // Оқуды тоқтату
    window.stopTilasharAudio = function () {

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        updateAudioStatus("⏹ Оқу тоқтатылды.");
    };

    // Мәтінді қайта оқу
    window.repeatTilasharAudio = function () {

        const instruction =
            document.getElementById("exerciseInstruction");

        if (instruction) {
            speakTilasharText(instruction.innerText);
        }
    };

    function updateAudioStatus(message) {

        const status =
            document.getElementById("audioStatus");

        if (status) {
            status.textContent = message;
        }
    }

    // Басқару батырмаларын қосу
    function addAudioControls() {

        if (document.getElementById("tilasharAudioControls")) {
            return;
        }

        const instruction =
            document.getElementById("exerciseInstruction");

        if (!instruction) return;

        const controls = document.createElement("div");

        controls.id = "tilasharAudioControls";
        controls.className = "audio-controls";

        controls.innerHTML = `
            <button onclick="repeatTilasharAudio()">
                🔊 Тыңдау
            </button>

            <button onclick="stopTilasharAudio()">
                ⏹ Тоқтату
            </button>

            <button onclick="speakTilasharText(
                document.getElementById('exerciseTitle')?.innerText || ''
            )">
                🔁 Тақырыпты оқу
            </button>

            <div id="audioStatus" aria-live="polite"></div>
        `;

        instruction.after(controls);
    }

    document.addEventListener("DOMContentLoaded", function () {

        addAudioControls();

        const observer = new MutationObserver(function () {
            addAudioControls();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    });

})();
