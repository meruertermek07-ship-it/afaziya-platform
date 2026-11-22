// =====================================
// ТІЛАШАР — ПЛАТФОРМА БАПТАУЛАРЫ
// =====================================

(function () {

    const style = document.createElement("style");

    style.textContent = `
        #settingsButton {
            position: fixed;
            right: 18px;
            bottom: 18px;
            z-index: 9000;
            border: none;
            border-radius: 50px;
            padding: 14px 20px;
            background: #6252b5;
            color: white;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 4px 15px #0002;
        }

        #settingsModal {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 10000;
            background: #17132b88;
            align-items: center;
            justify-content: center;
            padding: 15px;
        }

        .settings-box {
            background: white;
            width: 100%;
            max-width: 430px;
            padding: 25px;
            border-radius: 20px;
        }

        .settings-box h2 {
            color: #51429b;
            margin-bottom: 20px;
        }

        .setting-row {
            padding: 14px 0;
            border-bottom: 1px solid #eee;
        }

        .setting-row label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .setting-row button {
            padding: 9px 14px;
            border: none;
            border-radius: 9px;
            background: #eeeaff;
            color: #51429b;
            margin: 4px;
            cursor: pointer;
        }

        .settings-close {
            width: 100%;
            margin-top: 20px;
            padding: 13px;
            background: #6252b5 !important;
            color: white !important;
            border-radius: 10px;
        }

        body.high-contrast {
            filter: contrast(1.25);
        }
    `;

    document.head.appendChild(style);

    function createSettings() {

        if (document.getElementById("settingsModal")) return;

        const button = document.createElement("button");
        button.id = "settingsButton";
        button.textContent = "⚙️ Баптаулар";
        button.onclick = openSettings;

        document.body.appendChild(button);

        const modal = document.createElement("div");
        modal.id = "settingsModal";

        modal.innerHTML = `
            <div class="settings-box">

                <h2>⚙️ Платформа баптаулары</h2>

                <div class="setting-row">
                    <label>Мәтін өлшемі</label>

                    <button onclick="changeTextSize('small')">
                        Кіші
                    </button>

                    <button onclick="changeTextSize('normal')">
                        Орташа
                    </button>

                    <button onclick="changeTextSize('large')">
                        Үлкен
                    </button>
                </div>

                <div class="setting-row">
                    <label>Контраст режимі</label>

                    <button onclick="toggleContrast(true)">
                        Қосу
                    </button>

                    <button onclick="toggleContrast(false)">
                        Өшіру
                    </button>
                </div>

                <div class="setting-row">
                    <label>Анимация</label>

                    <button onclick="toggleAnimation(false)">
                        Өшіру
                    </button>

                    <button onclick="toggleAnimation(true)">
                        Қосу
                    </button>
                </div>

                <button
                    class="settings-close"
                    onclick="closeSettings()"
                >
                    Сақтау және жабу
                </button>

            </div>
        `;

        modal.onclick = function (event) {
            if (event.target === modal) {
                closeSettings();
            }
        };

        document.body.appendChild(modal);

        loadSettings();
    }

    window.openSettings = function () {
        document.getElementById("settingsModal").style.display = "flex";
    };

    window.closeSettings = function () {
        document.getElementById("settingsModal").style.display = "none";
    };

    window.changeTextSize = function (size) {

        const sizes = {
            small: "14px",
            normal: "16px",
            large: "20px"
        };

        document.documentElement.style.fontSize =
            sizes[size] || "16px";

        saveSetting("textSize", size);
    };

    window.toggleContrast = function (enabled) {

        document.body.classList.toggle(
            "high-contrast",
            enabled
        );

        saveSetting("contrast", enabled);
    };

    window.toggleAnimation = function (enabled) {

        document.body.classList.toggle(
            "no-animation",
            !enabled
        );

        saveSetting("animation", enabled);
    };

    function saveSetting(key, value) {

        let settings = {};

        try {
            settings = JSON.parse(
                localStorage.getItem("tilasharSettings")
            ) || {};
        } catch (error) {}

        settings[key] = value;

        localStorage.setItem(
            "tilasharSettings",
            JSON.stringify(settings)
        );
    }

    function loadSettings() {

        let settings = {};

        try {
            settings = JSON.parse(
                localStorage.getItem("tilasharSettings")
            ) || {};
        } catch (error) {}

        changeTextSize(settings.textSize || "normal");

        toggleContrast(settings.contrast === true);

        toggleAnimation(settings.animation !== false);
    }

    document.addEventListener("DOMContentLoaded", createSettings);

})();
