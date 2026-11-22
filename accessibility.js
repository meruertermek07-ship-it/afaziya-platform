// =====================================
// ТІЛАШАР — ҚОЛЖЕТІМДІЛІК ЖҮЙЕСІ
// =====================================

(function () {

    const style = document.createElement("style");

    style.textContent = `
        /* Пернетақта фокусы */
        button:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        a:focus-visible {
            outline: 3px solid #f2a93b !important;
            outline-offset: 4px;
        }

        /* Оқуға ыңғайлы мәтін */
        body.easy-reading {
            line-height: 1.8 !important;
            letter-spacing: 0.3px;
        }

        body.easy-reading p,
        body.easy-reading label,
        body.easy-reading button {
            line-height: 1.8;
        }

        /* Анимацияны азайту */
        body.no-animation *,
        body.no-animation *::before,
        body.no-animation *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
        }

        /* Қолжетімділік батырмасы */
        #accessibilityButton {
            position: fixed;
            left: 18px;
            bottom: 18px;
            z-index: 9000;
            border: none;
            border-radius: 50px;
            padding: 13px 17px;
            background: #51429b;
            color: white;
            cursor: pointer;
            font-size: 14px;
        }

        #accessibilityPanel {
            display: none;
            position: fixed;
            left: 15px;
            bottom: 75px;
            z-index: 10000;
            width: min(300px, calc(100% - 30px));
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 5px 25px #0003;
        }

        #accessibilityPanel h3 {
            color: #51429b;
            margin-bottom: 15px;
        }

        #accessibilityPanel button {
            width: 100%;
            padding: 11px;
            margin: 5px 0;
            border: none;
            border-radius: 9px;
            background: #eeeaff;
            color: #51429b;
            cursor: pointer;
        }
    `;

    document.head.appendChild(style);

    function createAccessibilityPanel() {

        if (document.getElementById("accessibilityButton")) {
            return;
        }

        const button = document.createElement("button");

        button.id = "accessibilityButton";
        button.textContent = "♿ Қолжетімділік";

        button.onclick = function () {
            const panel =
                document.getElementById("accessibilityPanel");

            panel.style.display =
                panel.style.display === "block"
                    ? "none"
                    : "block";
        };

        document.body.appendChild(button);

        const panel = document.createElement("div");

        panel.id = "accessibilityPanel";

        panel.innerHTML = `
            <h3>Қолжетімділік баптаулары</h3>

            <button onclick="toggleEasyReading(true)">
                📖 Оқуға ыңғайлы режим
            </button>

            <button onclick="toggleEasyReading(false)">
                Қалыпты режим
            </button>

            <button onclick="toggleReducedMotion(true)">
                Анимацияны азайту
            </button>

            <button onclick="toggleReducedMotion(false)">
                Анимацияны қосу
            </button>

            <button onclick="resetAccessibility()">
                Баптауларды қалпына келтіру
            </button>
        `;

        document.body.appendChild(panel);

        loadAccessibilitySettings();
    }

    window.toggleEasyReading = function (enabled) {

        document.body.classList.toggle(
            "easy-reading",
            enabled
        );

        saveAccessibility("easyReading", enabled);
    };

    window.toggleReducedMotion = function (enabled) {

        document.body.classList.toggle(
            "no-animation",
            enabled
        );

        saveAccessibility("reducedMotion", enabled);
    };

    window.resetAccessibility = function () {

        toggleEasyReading(false);
        toggleReducedMotion(false);

    };

    function saveAccessibility(key, value) {

        let settings = {};

        try {
            settings = JSON.parse(
                localStorage.getItem("tilasharAccessibility")
            ) || {};
        } catch (error) {}

        settings[key] = value;

        localStorage.setItem(
            "tilasharAccessibility",
            JSON.stringify(settings)
        );
    }

    function loadAccessibilitySettings() {

        let settings = {};

        try {
            settings = JSON.parse(
                localStorage.getItem("tilasharAccessibility")
            ) || {};
        } catch (error) {}

        toggleEasyReading(settings.easyReading === true);

        toggleReducedMotion(
            settings.reducedMotion === true
        );
    }

    document.addEventListener(
        "DOMContentLoaded",
        createAccessibilityPanel
    );

})();
