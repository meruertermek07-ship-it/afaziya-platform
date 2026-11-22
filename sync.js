// =====================================
// ТІЛАШАР — ЖҮЙЕНІ СИНХРОНДАУ
// =====================================

(function () {

    // Статистиканы жаңарту
    window.refreshTilasharData = function () {

        if (typeof window.updateDashboard === "function") {
            window.updateDashboard();
        }

        if (typeof window.renderResults === "function") {
            window.renderResults();
        }
    };

    // Тапсырма орындалғаннан кейін жаңарту
    if (typeof window.completeExercise === "function") {

        const originalCompleteExercise = window.completeExercise;

        window.completeExercise = function (...args) {

            const result = originalCompleteExercise.apply(this, args);

            setTimeout(() => {
                window.refreshTilasharData();
            }, 300);

            return result;
        };
    }

    // Жүйеге кіргеннен кейін статистиканы жаңарту
    if (typeof window.enterDemoCabinet === "function") {

        const originalEnter = window.enterDemoCabinet;

        window.enterDemoCabinet = function (...args) {

            const result = originalEnter.apply(this, args);

            setTimeout(() => {
                window.refreshTilasharData();
            }, 300);

            return result;
        };
    }

    // Деректер өзгергенде жаңарту
    window.addEventListener("storage", function (event) {

        if (event.key === "platformData") {
            window.refreshTilasharData();
        }

    });

})();
