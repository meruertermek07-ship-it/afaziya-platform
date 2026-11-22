// =====================================
// ТІЛАШАР — КІРУ БӨЛІМІ
// Демонстрациялық нұсқа
// =====================================

(function () {
    const loginStyle = document.createElement("style");

    loginStyle.textContent = `
        #loginPage {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: linear-gradient(135deg, #5746a8, #8798e8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .login-box {
            background: white;
            width: 100%;
            max-width: 420px;
            padding: 35px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 15px 45px #25205a55;
        }

        .login-logo {
            font-size: 55px;
            margin-bottom: 10px;
        }

        .login-box h2 {
            color: #51429b;
            margin-bottom: 8px;
        }

        .login-box p {
            color: #777;
            font-size: 14px;
            margin-bottom: 25px;
        }

        .login-box input {
            width: 100%;
            padding: 14px;
            border: 1px solid #ddd;
            border-radius: 12px;
            margin-bottom: 15px;
            font-size: 15px;
            box-sizing: border-box;
        }

        .login-button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 12px;
            background: #6252b5;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .login-button:hover {
            background: #493b96;
        }

        .login-note {
            margin-top: 18px;
            font-size: 11px;
            color: #999;
        }

        #loginError {
            color: #e05252;
            font-size: 13px;
            margin-bottom: 12px;
        }
    `;

    document.head.appendChild(loginStyle);

    function createLoginPage() {
        if (sessionStorage.getItem("tilasharDemoAccess") === "true") {
            return;
        }

        const page = document.createElement("div");
        page.id = "loginPage";

        page.innerHTML = `
            <div class="login-box">

                <div class="login-logo">🌿</div>

                <h2>ТІЛАШАР</h2>

                <p>
                    Логопедиялық түзету-дамыту платформасы
                </p>

                <input
                    type="text"
                    id="loginName"
                    placeholder="Логопедтің аты-жөні"
                >

                <div id="loginError"></div>

                <button
                    class="login-button"
                    onclick="enterDemoCabinet()"
                >
                    Кабинетке кіру →
                </button>

                <div class="login-note">
                    Демонстрациялық нұсқа
                </div>

            </div>
        `;

        document.body.appendChild(page);
    }

    window.enterDemoCabinet = function () {
        const name = document.getElementById("loginName").value.trim();
        const error = document.getElementById("loginError");

        if (!name) {
            error.textContent = "Аты-жөніңізді енгізіңіз!";
            return;
        }

        sessionStorage.setItem("tilasharDemoAccess", "true");
        sessionStorage.setItem("tilasharUserName", name);

        document.getElementById("loginPage").remove();

        showWelcomeMessage(name);
    };

    function showWelcomeMessage(name) {
        const message = document.createElement("div");

        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99998;
            background: #6252b5;
            color: white;
            padding: 15px 22px;
            border-radius: 12px;
            box-shadow: 0 5px 20px #0002;
        `;

        message.textContent = "Қош келдіңіз, " + name + "!";

        document.body.appendChild(message);

        setTimeout(() => message.remove(), 3500);
    }

    window.logoutDemo = function () {
        sessionStorage.removeItem("tilasharDemoAccess");
        sessionStorage.removeItem("tilasharUserName");
        location.reload();
    };

    document.addEventListener("DOMContentLoaded", createLoginPage);

})();
