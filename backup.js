// =====================================
// ТІЛАШАР — ДЕРЕКТЕРДІ САҚТАУ ЖӘНЕ ҚАЛПЫНА КЕЛТІРУ
// =====================================

(function () {

    const style = document.createElement("style");

    style.textContent = `
        #backupSection {
            max-width: 1200px;
            margin: 25px auto;
            padding: 22px;
            background: white;
            border-radius: 18px;
            box-shadow: 0 4px 15px #51429b12;
        }

        #backupSection h2 {
            color: #51429b;
            margin-bottom: 10px;
        }

        .backup-description {
            color: #777;
            font-size: 14px;
            margin-bottom: 18px;
        }

        .backup-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .backup-buttons button {
            padding: 13px 18px;
            border: none;
            border-radius: 11px;
            cursor: pointer;
            font-weight: 600;
            background: #eeeaff;
            color: #51429b;
        }

        .backup-buttons button:hover {
            opacity: .85;
        }

        .backup-status {
            margin-top: 15px;
            font-size: 13px;
            color: #51429b;
        }

        #backupFileInput {
            display: none;
        }
    `;

    document.head.appendChild(style);

    function createBackupSection() {

        if (document.getElementById("backupSection")) return;

        const section = document.createElement("section");

        section.id = "backupSection";

        section.innerHTML = `
            <h2>💾 Деректерді сақтау</h2>

            <p class="backup-description">
                Платформадағы демо деректерді файлға сақтауға
                немесе бұрын сақталған файлдан қалпына келтіруге болады.
            </p>

            <div class="backup-buttons">

                <button onclick="exportTilasharData()">
                    📥 Деректерді жүктеу
                </button>

                <button onclick="document.getElementById('backupFileInput').click()">
                    📤 Файлдан қалпына келтіру
                </button>

            </div>

            <input
                type="file"
                id="backupFileInput"
                accept=".json,application/json"
                onchange="importTilasharData(event)"
            >

            <div
                id="backupStatus"
                class="backup-status"
                aria-live="polite"
            ></div>
        `;

        const dashboard =
            document.getElementById("tilasharDashboard");

        if (dashboard) {
            dashboard.after(section);
        } else {
            document.body.appendChild(section);
        }
    }

    // Деректерді JSON файлға сақтау
    window.exportTilasharData = function () {

        const keys = [
            "platformData",
            "patientsDatabase",
            "activePatientId",
            "tilasharSettings"
        ];

        const backup = {
            application: "Tilashar",
            version: 1,
            createdAt: new Date().toISOString(),
            data: {}
        };

        keys.forEach(key => {
            const value = localStorage.getItem(key);

            if (value !== null) {
                backup.data[key] = value;
            }
        });

        const blob = new Blob(
            [JSON.stringify(backup, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download =
            "tilashar-backup-" +
            new Date().toISOString().slice(0, 10) +
            ".json";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        setStatus("✅ Деректер файлға сақталды!");
    };

    // JSON файлын тексеру
    window.importTilasharData = async function (event) {

        const file = event.target.files[0];

        if (!file) return;

        try {

            if (file.size > 2 * 1024 * 1024) {
                throw new Error("Файл көлемі 2 МБ-тан аспауы керек.");
            }

            const text = await file.text();
            const backup = JSON.parse(text);

            if (
                backup.application !== "Tilashar" ||
                backup.version !== 1 ||
                !backup.data ||
                typeof backup.data !== "object"
            ) {
                throw new Error("Файл форматы дұрыс емес.");
            }

            const allowedKeys = [
                "platformData",
                "patientsDatabase",
                "activePatientId",
                "tilasharSettings"
            ];

            for (const key of allowedKeys) {

                if (
                    Object.prototype.hasOwnProperty.call(
                        backup.data,
                        key
                    ) &&
                    typeof backup.data[key] !== "string"
                ) {
                    throw new Error("Файлдағы деректер форматы қате.");
                }
            }

            if (
                !window.confirm(
                    "Қазіргі деректердің орнына файлдағы деректер енгізіледі. Жалғастырасыз ба?"
                )
            ) {
                event.target.value = "";
                return;
            }

            // Ескі деректерді уақытша сақтап қою
            const previousData = {};

            allowedKeys.forEach(key => {
                previousData[key] = localStorage.getItem(key);
            });

            try {

                allowedKeys.forEach(key => {

                    if (
                        Object.prototype.hasOwnProperty.call(
                            backup.data,
                            key
                        )
                    ) {
                        localStorage.setItem(
                            key,
                            backup.data[key]
                        );
                    }

                });

            } catch (error) {

                // Қате болса, бұрынғы деректерді қалпына келтіру
                allowedKeys.forEach(key => {

                    if (previousData[key] === null) {
                        localStorage.removeItem(key);
                    } else {
                        localStorage.setItem(
                            key,
                            previousData[key]
                        );
                    }

                });

                throw error;
            }

            setStatus("✅ Деректер қалпына келтірілді!");

            setTimeout(() => location.reload(), 1000);

        } catch (error) {

            setStatus("❌ Қате: " + error.message);

        } finally {

            event.target.value = "";

        }
    };

    function setStatus(message) {

        const element =
            document.getElementById("backupStatus");

        if (element) {
            element.textContent = message;
        }
    }

    document.addEventListener(
        "DOMContentLoaded",
        createBackupSection
    );

})();
