// =====================================
// ТІЛАШАР — ЖЕКЕ КАБИНЕТ ПАНЕЛІ
// =====================================

(function () {
    const style = document.createElement("style");

    style.textContent = `
        #accountPanel {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            flex-wrap: wrap;
            padding: 15px 20px;
            margin: 15px auto;
            max-width: 1200px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 15px #51429b15;
        }

        .account-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .account-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: #eeeaff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 23px;
        }

        .account-name {
            font-weight: 700;
            color: #51429b;
        }

        .account-role {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
        }

        .account-logout {
            border: none;
            background: #fff0f0;
            color: #d34c4c;
            padding: 11px 16px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
        }

        .account-logout:hover {
            background: #ffe0e0;
        }
    `;

    document.head.appendChild(style);

    function createAccountPanel() {
        if (document.getElementById("accountPanel")) return;

        if (sessionStorage.getItem("tilasharDemoAccess") !== "true") {
            return;
        }

        const name =
            sessionStorage.getItem("tilasharUserName") || "Логопед";

        const panel = document.createElement("div");

        panel.id = "accountPanel";

        panel.innerHTML = `
            <div class="account-info">
                <div class="account-avatar">👩🏻‍⚕️</div>

                <div>
                    <div class="account-name">
                        ${escapeText(name)}
                    </div>

                    <div class="account-role">
                        Логопедтің жеке кабинеті
                    </div>
                </div>
            </div>

            <button
                class="account-logout"
                onclick="logoutDemo()"
            >
                Шығу ↗
            </button>
        `;

        document.body.prepend(panel);
    }

    function escapeText(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }

    document.addEventListener("DOMContentLoaded", () => {
        createAccountPanel();

        const observer = new MutationObserver(() => {
            createAccountPanel();
        });

        observer.observe(document.body, {
            childList: true
        });
    });

})();
