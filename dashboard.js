// =====================================
// ТІЛАШАР — ЖЕКЕ КАБИНЕТ ДАШБОРДЫ
// =====================================

(function () {
    const style = document.createElement("style");

    style.textContent = `
        #tilasharDashboard {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
        }

        .dashboard-heading {
            color: #51429b;
            font-size: 23px;
            margin-bottom: 18px;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
        }

        .dashboard-item {
            background: white;
            padding: 22px;
            border-radius: 17px;
            box-shadow: 0 4px 15px #51429b12;
        }

        .dashboard-icon {
            font-size: 28px;
        }

        .dashboard-number {
            font-size: 27px;
            font-weight: 800;
            color: #51429b;
            margin: 10px 0 5px;
        }

        .dashboard-label {
            font-size: 13px;
            color: #777;
        }

        .dashboard-progress {
            height: 9px;
            background: #eeeaff;
            border-radius: 20px;
            overflow: hidden;
            margin-top: 15px;
        }

        .dashboard-progress-fill {
            height: 100%;
            width: 0;
            background: linear-gradient(90deg, #7564c8, #9c8de8);
            transition: width .4s;
        }

        @media(max-width:650px) {
            .dashboard-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media(max-width:400px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(style);

    function getDashboardData() {
        let data = {};

        try {
            data = JSON.parse(
                localStorage.getItem("platformData")
            ) || {};
        } catch (error) {
            data = {};
        }

        const completed = Array.isArray(data.completed)
            ? data.completed.length
            : 0;

        const bonus = Number(data.bonus) || 0;

        const scores = data.scores || {};

        const totalScore = Object.values(scores)
            .reduce((sum, value) => sum + (Number(value) || 0), 0);

        let totalTasks = 0;

        if (typeof sections !== "undefined") {
            Object.values(sections).forEach(section => {
                totalTasks += Array.isArray(section.tasks)
                    ? section.tasks.length
                    : 0;
            });
        }

        const remaining = Math.max(totalTasks - completed, 0);

        const progress = totalTasks
            ? Math.min(Math.round(completed / totalTasks * 100), 100)
            : 0;

        return {
            completed,
            remaining,
            bonus,
            totalScore,
            totalTasks,
            progress
        };
    }

    function renderDashboard() {
        if (document.getElementById("tilasharDashboard")) return;

        const data = getDashboardData();

        const dashboard = document.createElement("section");
        dashboard.id = "tilasharDashboard";

        dashboard.innerHTML = `
            <h2 class="dashboard-heading">
                📊 Жұмыс көрсеткіштері
            </h2>

            <div class="dashboard-grid">

                <div class="dashboard-item">
                    <div class="dashboard-icon">✅</div>
                    <div class="dashboard-number">
                        ${data.completed}
                    </div>
                    <div class="dashboard-label">
                        Орындалған тапсырма
                    </div>
                </div>

                <div class="dashboard-item">
                    <div class="dashboard-icon">📝</div>
                    <div class="dashboard-number">
                        ${data.remaining}
                    </div>
                    <div class="dashboard-label">
                        Қалған тапсырма
                    </div>
                </div>

                <div class="dashboard-item">
                    <div class="dashboard-icon">⭐</div>
                    <div class="dashboard-number">
                        ${data.totalScore}
                    </div>
                    <div class="dashboard-label">
                        Жиналған балл
                    </div>
                </div>

                <div class="dashboard-item">
                    <div class="dashboard-icon">🎁</div>
                    <div class="dashboard-number">
                        ${data.bonus}
                    </div>
                    <div class="dashboard-label">
                        Бонус саны
                    </div>
                </div>

                <div class="dashboard-item">
                    <div class="dashboard-icon">📚</div>
                    <div class="dashboard-number">
                        ${data.totalTasks}
                    </div>
                    <div class="dashboard-label">
                        Барлық тапсырма
                    </div>
                </div>

                <div class="dashboard-item">
                    <div class="dashboard-icon">📈</div>
                    <div class="dashboard-number">
                        ${data.progress}%
                    </div>
                    <div class="dashboard-label">
                        Жалпы орындалу көрсеткіші
                    </div>

                    <div class="dashboard-progress">
                        <div
                            class="dashboard-progress-fill"
                            style="width:${data.progress}%"
                        ></div>
                    </div>
                </div>

            </div>
        `;

        const accountPanel =
            document.getElementById("accountPanel");

        if (accountPanel) {
            accountPanel.after(dashboard);
        } else {
            document.body.prepend(dashboard);
        }
    }

    window.updateDashboard = function () {
        const oldDashboard =
            document.getElementById("tilasharDashboard");

        if (oldDashboard) oldDashboard.remove();

        renderDashboard();
    };

    document.addEventListener("DOMContentLoaded", () => {
        renderDashboard();
    });

})();
