// ==========================================
// ТІЛАШАР — АРТИКУЛЯЦИЯЛЫҚ ЖАТТЫҒУЛАР
// ==========================================

const articulationExercises = [
    {
        id: "art_tube",
        title: "1. Түтікше",
        goal: "Ерін бұлшықеттерінің қозғалысын дамыту және ерінді алға қарай созуға үйрету.",
        instruction: "Ерінді алға қарай созып, түтікше пішінін жасаңыз. 3–5 секунд ұстап, бастапқы қалыпқа оралыңыз. Жаттығуды бірнеше рет қайталаңыз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Тістерді қатты қыспаңыз. Ерінді шамадан тыс күшпен созбаңыз.",
        videoUrl: "https://drive.google.com/file/d/1WICEx_JFQEboHCsPHloPgdWQL4IxZhUH/view?usp=drivesdk"
    },
    {
        id: "art_teeth",
        title: "2. Тіс тазалау",
        goal: "Тіл ұшының қозғалысын дамыту және тіл бұлшықеттерінің икемділігін арттыру.",
        instruction: "Ауызды сәл ашыңыз. Тіл ұшымен жоғарғы тістердің ішкі жағын оңнан солға қарай жүргізіңіз. Содан кейін төменгі тістердің ішкі жағын қайталаңыз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Жақты қатты қозғалтпаңыз. Тілді тістерге қатты баспаңыз.",
        videoUrl: "https://drive.google.com/file/d/1ujsmGx2GWZOyXC7wnfuLZkEEFJNiS8rE/view?usp=drivesdk"
    },
    {
        id: "art_clock",
        title: "3. Сағат",
        goal: "Тіл ұшының оңға және солға бағытталған қозғалысын жетілдіру.",
        instruction: "Ауызды ашып, тілді оң жақ ауыз бұрышына, кейін сол жақ ауыз бұрышына қарай қозғалтыңыз. Қозғалысты сағат тілі сияқты бірқалыпты орындаңыз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Басты бұрмаңыз. Жақты қозғалтпай, жаттығуды тіл арқылы орындауға тырысыңыз.",
        videoUrl: "https://drive.google.com/file/d/16res7Ehccs8hGgJN5FjZ3SYGM0t64SNQ/view?usp=drivesdk"
    },
    {
        id: "art_jam",
        title: "4. Тәтті тосап",
        goal: "Тілдің жоғары қарай қозғалуын және тіл ұшының икемділігін дамыту.",
        instruction: "Ауызды ашыңыз. Тілдің жалпақ ұшымен жоғарғы ерінді төменнен жоғары қарай сипаңыз. Қозғалысты асықпай қайталаңыз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Тілді тістемеңіз және ерінді қатты қыспаңыз.",
        videoUrl: "https://drive.google.com/file/d/1aN3nwZtHPqAKX4uh6fTNxlz7e670nfis/view?usp=drivesdk"
    },
    {
        id: "art_swing",
        title: "5. Әткеншек",
        goal: "Тілдің жоғары және төмен бағыттағы қозғалысын дамыту.",
        instruction: "Ауызды ашыңыз. Тіл ұшын алдымен жоғарғы ерінге, содан кейін төменгі ерінге қарай қозғалтыңыз. Қозғалысты кезектестіріңіз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Жақты бір қалыпта ұстаңыз. Қозғалысты асықпай орындаңыз.",
        videoUrl: "https://drive.google.com/file/d/1U91KbU6ZpLIcBmXn_asQ4PFJpEyG222b/view?usp=drivesdk"
    },
    {
        id: "art_football",
        title: "6. Футбол",
        goal: "Тіл ұшының бағытталған қозғалысын және тіл бұлшықеттерінің белсенділігін дамыту.",
        instruction: "Тілді ауыздың ішіне шығарып, оң және сол жақ ұртқа кезекпен тигізіңіз. Допты бір қақпадан екінші қақпаға бағыттағандай орындаңыз.",
        materials: "Айна, бейненұсқаулық.",
        warning: "Басты қозғалтпаңыз. Қозғалысты ауырсынусыз, өзіңізге ыңғайлы деңгейде орындаңыз.",
        videoUrl: "https://drive.google.com/file/d/1H5Puv99CUlYb-5e8NSjoS38KVYJocV2N/view?usp=drivesdk"
    }
];

// ==========================================
// ТАПСЫРМАЛАРДЫ НЕГІЗГІ ЖҮЙЕГЕ ҚОСУ
// ==========================================

(function registerArticulationTasks() {
    if (typeof sections === "undefined") return;

    const section =
        sections.articulation ||
        sections["артикуляция"];

    if (!section) {
        console.warn("Артикуляция бөлімі sections ішінде табылмады.");
        return;
    }

    section.tasks = articulationExercises.map(item => ({
        id: item.id,
        title: item.title,
        goal: item.goal,
        instruction: item.instruction,
        materials: item.materials,
        warning: item.warning
    }));
})();

// ==========================================
// КАМЕРАНЫ БАСҚАРУ
// ==========================================

let articulationCameraStream = null;

async function startArticulationCamera() {
    const video = document.getElementById("articulationCamera");

    if (!video) return;

    try {
        articulationCameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

        video.srcObject = articulationCameraStream;
        video.style.display = "block";

        const startButton =
            document.getElementById("startArticulationCamera");

        const stopButton =
            document.getElementById("stopArticulationCamera");

        if (startButton) startButton.style.display = "none";
        if (stopButton) stopButton.style.display = "inline-block";

    } catch (error) {
        alert("Камераны қосу мүмкін болмады. Браузерден камераға рұқсат беріңіз.");
        console.error(error);
    }
}

function stopArticulationCamera() {
    if (articulationCameraStream) {
        articulationCameraStream.getTracks().forEach(track => track.stop());
        articulationCameraStream = null;
    }

    const video = document.getElementById("articulationCamera");

    if (video) {
        video.srcObject = null;
        video.style.display = "none";
    }

    const startButton =
        document.getElementById("startArticulationCamera");

    const stopButton =
        document.getElementById("stopArticulationCamera");

    if (startButton) startButton.style.display = "inline-block";
    if (stopButton) stopButton.style.display = "none";
}

// ==========================================
// ВИДЕОНҰСҚАУЛЫҚТЫ КӨРСЕТУ
// ==========================================

function getArticulationVideo(url) {
    if (!url) {
        return `
            <div class="art-video-placeholder">
                <div style="font-size:40px;">🎬</div>
                <h3>Жаттығу бейненұсқаулығы</h3>
                <p>Бұл жерге кейін өз видеоңызды қосасыз.</p>
                <small>Видео сілтемесін articulation.js файлындағы videoUrl орнына енгізіңіз.</small>
            </div>
        `;
    }

    if (url.includes("youtube.com/embed/") ||
        url.includes("youtube-nocookie.com/embed/")) {
        return `
            <iframe
                src="${url}"
                title="Артикуляциялық жаттығу"
                allowfullscreen
                loading="lazy">
            </iframe>
        `;
    }

    return `
        <video controls playsinline>
            <source src="${url}" type="video/mp4">
            Браузер видео форматын қолдамайды.
        </video>
    `;
}

// ==========================================
// ЖАТТЫҒУДЫ ЭКРАНҒА ШЫҒАРУ
// ==========================================

function renderArticulationExercise(exercise) {
    const content = document.getElementById("exerciseContent");

    if (!content) return;

    stopArticulationCamera();

    content.innerHTML = `
        <div class="articulation-exercise">

            <div class="art-section-heading">
                <h2>👄 ${exercise.title}</h2>
                <p>Артикуляциялық жаттығу</p>
            </div>

            <div class="art-info-card">
                <h3>🎯 Мақсаты</h3>
                <p>${exercise.goal}</p>
            </div>

            <div class="art-info-card">
                <h3>📋 Орындалу тәртібі</h3>
                <p>${exercise.instruction}</p>
            </div>

            <div class="art-info-card">
                <h3>🧰 Қажетті материалдар</h3>
                <p>${exercise.materials}</p>
            </div>

            <div class="art-warning-card">
                <h3>⚠️ Ескерту</h3>
                <p>${exercise.warning}</p>
            </div>

            <div class="art-video-card">
                <h3>🎬 Бейненұсқаулық</h3>
                ${getArticulationVideo(exercise.videoUrl)}
            </div>

            <div class="art-camera-card">
                <h3>📷 Айна режимі — камера</h3>
                <p>Камера арқылы жаттығуды орындау кезіндегі өз қозғалысыңызды бақылаңыз.</p>

                <video
                    id="articulationCamera"
                    autoplay
                    muted
                    playsinline
                    style="display:none; width:100%; max-width:450px; border-radius:15px; transform:scaleX(-1);">
                </video>

                <div class="art-camera-buttons">
                    <button
                        id="startArticulationCamera"
                        onclick="startArticulationCamera()">
                        📷 Камераны қосу
                    </button>

                    <button
                        id="stopArticulationCamera"
                        onclick="stopArticulationCamera()"
                        style="display:none;">
                        ⏹ Камераны тоқтату
                    </button>
                </div>

                <small>Камера автоматты түрде сөйлеу немесе артикуляция сапасын бағаламайды.</small>
            </div>

            <div class="art-complete-card">
                <h3>✅ Жаттығуды аяқтау</h3>
                <p>Жаттығуды орындағаннан кейін төмендегі батырманы басыңыз.</p>

                <button
                    class="art-complete-button"
                    onclick="completeArticulationExercise('${exercise.id}')">
                    Орындадым
                </button>
            </div>

        </div>
    `;

    addArticulationStyles();
}

// ==========================================
// ЖАТТЫҒУДЫ АЯҚТАУ
// ==========================================

function completeArticulationExercise(id) {
    stopArticulationCamera();

    if (typeof window.completeExercise === "function") {
        window.completeExercise();
    } else {
        alert("Жаттығу аяқталды!");
    }
}

// ==========================================
// ҚАЖЕТТІ СТИЛЬДЕР
// ==========================================

function addArticulationStyles() {
    if (document.getElementById("articulationStyles")) return;

    const style = document.createElement("style");
    style.id = "articulationStyles";

    style.textContent = `
        .articulation-exercise {
            display: flex;
            flex-direction: column;
            gap: 18px;
            padding: 15px;
        }

        .art-section-heading {
            text-align: center;
            padding: 20px;
            border-radius: 18px;
            background: linear-gradient(135deg, #e9ddff, #dff6ff);
        }

        .art-section-heading h2 {
            margin: 0 0 8px;
            font-size: 25px;
        }

        .art-section-heading p {
            margin: 0;
        }

        .art-info-card,
        .art-warning-card,
        .art-video-card,
        .art-camera-card,
        .art-complete-card {
            padding: 20px;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 3px 14px rgba(0,0,0,0.07);
        }

        .art-info-card h3,
        .art-warning-card h3,
        .art-video-card h3,
        .art-camera-card h3,
        .art-complete-card h3 {
            margin-top: 0;
        }

        .art-warning-card {
            background: #fff8e8;
            border-left: 5px solid #f2bd48;
        }

        .art-video-placeholder {
            padding: 30px 15px;
            text-align: center;
            border: 2px dashed #b9a8df;
            border-radius: 14px;
            background: #f8f5ff;
        }

        .art-video-card iframe,
        .art-video-card video {
            width: 100%;
            min-height: 230px;
            border: 0;
            border-radius: 12px;
        }

        .art-camera-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 15px 0;
        }

        .art-camera-buttons button,
        .art-complete-button {
            border: none;
            border-radius: 12px;
            padding: 13px 20px;
            font-size: 16px;
            cursor: pointer;
            background: #7655c9;
            color: white;
        }

        .art-complete-button {
            width: 100%;
            background: #239b72;
            font-weight: bold;
        }

        .art-camera-card small {
            display: block;
            color: #666;
            line-height: 1.5;
        }
    `;

    document.head.appendChild(style);
}

// ==========================================
// ТАПСЫРМА ТАҢДАЛҒАНДА АШУ
// ==========================================

function findArticulationExercise(title) {
    return articulationExercises.find(item =>
        item.title === title ||
        title.includes(item.title.replace(/^\d+\.\s*/, ""))
    );
}

function watchArticulationExercise() {
    const titleElement = document.getElementById("exerciseTitle");
    const content = document.getElementById("exerciseContent");

    if (!titleElement || !content) return;

    let lastTitle = "";

    const observer = new MutationObserver(() => {
        const currentTitle = titleElement.textContent.trim();

        if (!currentTitle || currentTitle === lastTitle) return;

        const exercise = findArticulationExercise(currentTitle);

        if (exercise) {
            lastTitle = currentTitle;
            renderArticulationExercise(exercise);
        } else {
            lastTitle = "";
            stopArticulationCamera();
        }
    });

    observer.observe(titleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    watchArticulationExercise();
});
