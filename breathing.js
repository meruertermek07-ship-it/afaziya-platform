// ==========================================
// ТІЛАШАР — МИКРОФОНМЕН ТЫНЫС АЛУ ОЙЫНЫ
// ==========================================

(function () {

    const breathingTasks = [
        {
            id: "breathing_1",
            title: "🪶 Қауырсынды ұшыру",
            goal: "Бірқалыпты дем шығаруды дамыту.",
            instruction: "Микрофонға жай үрлеп, қауырсынды жылжытыңыз.",
            materials: "Қауырсын бейнесі және микрофон.",
            warning: "Қатты күш салмай, табиғи тыныс алыңыз.",
            type: "feather"
        },
        {
            id: "breathing_2",
            title: "☁️ Мақтаны үрлеу",
            goal: "Бағытталған дем шығаруды дамыту.",
            instruction: "Микрофонға үрлеген кезде мақта қозғалады.",
            materials: "Мақта бейнесі және микрофон.",
            warning: "Бас айналса, жаттығуды тоқтатыңыз.",
            type: "cotton"
        },
        {
            id: "breathing_3",
            title: "⛵ Желкенді қайық",
            goal: "Дем шығарудың бірқалыптылығын дамыту.",
            instruction: "Микрофонға үрлеп, қайықты алға жылжытыңыз.",
            materials: "Қайық бейнесі және микрофон.",
            warning: "Демді күшпен шығармаңыз.",
            type: "boat"
        },
        {
            id: "breathing_4",
            title: "🫧 Сабын көпіршіктері",
            goal: "Дем шығаруды реттеуге жаттықтыру.",
            instruction: "Микрофонға үрлегенде көпіршіктер жоғары көтеріледі.",
            materials: "Көпіршіктер және микрофон.",
            warning: "Жаттығуды асықпай орындаңыз.",
            type: "bubbles"
        },
        {
            id: "breathing_5",
            title: "🌳 Желді басқар",
            goal: "Дем шығаруды саналы түрде басқаруды дамыту.",
            instruction: "Микрофонға үрлеп, ағаштың қозғалысын бақылаңыз.",
            materials: "Ағаш бейнесі және микрофон.",
            warning: "Өзіңізге ыңғайлы қарқында орындаңыз.",
            type: "wind"
        }
    ];

    // Тапсырмаларды тіркеу
    function registerTasks() {
        if (typeof sections === "undefined") return;

        const section =
            sections.breathing ||
            sections["тыныс алу"];

        if (section) {
            section.tasks = breathingTasks;
        }
    }

    const style = document.createElement("style");

    style.textContent = `
        .breath-game {
            background: linear-gradient(135deg,#f0edff,#e5f8ff);
            padding: 25px;
            border-radius: 22px;
            margin-top: 20px;
            text-align: center;
        }

        .breath-stage {
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
            margin: 20px 0;
            border-radius: 15px;
            background: #ffffffaa;
        }

        .breath-object {
            font-size: 65px;
            position: absolute;
            left: 10%;
            transition: transform .12s linear;
        }

        .breath-mic {
            font-size: 35px;
            margin: 10px;
        }

        .breath-button {
            background: #6252b5;
            color: white;
            padding: 13px 22px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            margin: 7px;
        }

        .breath-level {
            height: 13px;
            background: #ddd;
            border-radius: 20px;
            overflow: hidden;
            margin: 15px 0;
        }

        .breath-level-fill {
            height: 100%;
            width: 0%;
            background: #36b889;
            transition: width .1s;
        }

        .breath-feedback {
            color: #51429b;
            font-weight: bold;
            min-height: 25px;
            margin: 12px;
        }
    `;

    document.head.appendChild(style);

    let audioContext = null;
    let analyser = null;
    let microphone = null;
    let animationFrame = null;
    let activeType = null;
    let blowCount = 0;
    let isBlowing = false;
    let lastBlowTime = 0;
    let currentPosition = 0;

    const objects = {
        feather: "🪶",
        cotton: "☁️",
        boat: "⛵",
        bubbles: "🫧",
        wind: "🌳"
    };

    function renderGame(task) {

        const content =
            document.getElementById("exerciseContent");

        if (!content) return;

        content.innerHTML += `
            <div class="breath-game">

                <h3>🌬️ Микрофонмен орындаңыз</h3>

                <p>
                    Микрофонға үрлеген кезде
                    экрандағы нысан қозғалады.
                </p>

                <div class="breath-stage">

                    <span
                        class="breath-object"
                        id="breathObject"
                    >
                        ${objects[task.type]}
                    </span>

                </div>

                <div class="breath-mic">🎙️</div>

                <div>
                    Микрофон сезімталдығы
                </div>

                <div class="breath-level">
                    <div
                        class="breath-level-fill"
                        id="breathLevel"
                    ></div>
                </div>

                <p>
                    Үрлеу саны:
                    <strong id="blowCount">0</strong>/5
                </p>

                <button
                    class="breath-button"
                    id="startBreathing"
                >
                    🎙️ Микрофонды қосу
                </button>

                <button
                    class="breath-button"
                    id="stopBreathing"
                >
                    ⏹ Тоқтату
                </button>

                <div
                    class="breath-feedback"
                    id="breathFeedback"
                >
                    Микрофонды қосып, жай үрлеңіз.
                </div>

            </div>
        `;

        document.getElementById("startBreathing")
            .onclick = startMicrophone;

        document.getElementById("stopBreathing")
            .onclick = stopMicrophone;
    }

    async function startMicrophone() {

        try {

            stopMicrophone();

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

            microphone = stream;

            audioContext =
                new (window.AudioContext ||
                window.webkitAudioContext)();

            analyser = audioContext.createAnalyser();

            analyser.fftSize = 1024;

            const source =
                audioContext.createMediaStreamSource(stream);

            source.connect(analyser);

            blowCount = 0;
            currentPosition = 0;
            isBlowing = false;

            document.getElementById("blowCount").textContent = 0;

            document.getElementById("breathFeedback").textContent =
                "Микрофон қосылды. Енді үрлеп көріңіз!";

            detectBlowing();

        } catch (error) {

            document.getElementById("breathFeedback").textContent =
                "Микрофонға рұқсат беріңіз немесе браузер баптауларын тексеріңіз.";

        }
    }

    function detectBlowing() {

        const data = new Uint8Array(analyser.fftSize);

        function analyze() {

            if (!analyser) return;

            analyser.getByteTimeDomainData(data);

            let sum = 0;

            for (let i = 0; i < data.length; i++) {

                const value = (data[i] - 128) / 128;

                sum += value * value;

            }

            const rms = Math.sqrt(sum / data.length);

            const level = Math.min(rms * 500, 100);

            document.getElementById("breathLevel").style.width =
                level + "%";

            // Дыбыс деңгейі жоғарылағанда нысанды жылжыту
            if (rms > 0.045) {

                moveObject(level);

                if (!isBlowing) {

                    const now = Date.now();

                    if (now - lastBlowTime > 700) {

                        blowCount++;

                        lastBlowTime = now;

                        document.getElementById("blowCount")
                            .textContent = blowCount;

                        isBlowing = true;

                    }

                }

            } else {

                isBlowing = false;

            }

            animationFrame =
                requestAnimationFrame(analyze);

        }

        analyze();
    }

    function moveObject(level) {

        const object =
            document.getElementById("breathObject");

        if (!object) return;

        const movement = Math.max(2, level * 0.35);

        currentPosition = Math.min(
            currentPosition + movement,
            300
        );

        if (activeType === "bubbles") {

            object.style.transform =
                `translateY(-${currentPosition}px)`;

        } else if (activeType === "wind") {

            object.style.transform =
                `rotate(${Math.min(level, 35)}deg)`;

        } else {

            object.style.transform =
                `translateX(${currentPosition}px)`;

        }

        if (currentPosition >= 250) {

            document.getElementById("breathFeedback")
                .textContent =
                "🎉 Тамаша! Нысан мәреге жетті!";

        } else {

            document.getElementById("breathFeedback")
                .textContent =
                "🌬️ Жақсы! Үрлеуді жалғастырыңыз.";

        }

    }

    function stopMicrophone() {

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        if (microphone) {

            microphone.getTracks().forEach(track => track.stop());

            microphone = null;

        }

        if (audioContext) {

            audioContext.close();

            audioContext = null;

        }

        analyser = null;

        const feedback =
            document.getElementById("breathFeedback");

        if (feedback) {
            feedback.textContent = "Микрофон тоқтатылды.";
        }

    }

    // Тапсырма ашылғанда ойынды көрсету
    function observeTasks() {

        const observer = new MutationObserver(() => {

            const title =
                document.getElementById("exerciseTitle");

            const content =
                document.getElementById("exerciseContent");

            if (!title || !content) return;

            const task = breathingTasks.find(item =>
                title.textContent.includes(item.title)
            );

            if (!task) return;

            if (content.querySelector(".breath-game")) return;

            activeType = task.type;

            renderGame(task);

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    }

    registerTasks();

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            observeTasks
        );

    } else {

        observeTasks();

    }

    window.addEventListener("beforeunload", stopMicrophone);

})();
