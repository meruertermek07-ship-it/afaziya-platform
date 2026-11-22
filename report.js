// ==========================================
// ТІЛАШАР — PDF ЕСЕП ЖҮЙЕСІ
// ==========================================

function getReportPatient() {
  const patients = JSON.parse(
    localStorage.getItem("patientsDatabase") || "[]"
  );

  const activeId = localStorage.getItem("activePatientId");

  return patients.find(p => p.id === activeId) || null;
}

function getReportCard() {
  const patient = getReportPatient();

  if (patient && patient.speechCard) {
    return patient.speechCard;
  }

  const data = JSON.parse(
    localStorage.getItem("platformData") || "{}"
  );

  return data.speechCard || {};
}

function getReportValue(value) {
  return value === undefined || value === null || value === ""
    ? "Толтырылмаған"
    : String(value);
}

// ==========================================
// PDF ЕСЕПТІ ҚАЛЫПТАСТЫРУ
// ==========================================

function generatePatientReport() {
  const patient = getReportPatient();
  const card = getReportCard();

  if (!patient && !card.fullName) {
    alert("Алдымен пациентті таңдап, сөйлеу картасын толтырыңыз!");
    return;
  }

  const ratings = [
    ["Сөйлеуді түсіну", card.understanding],
    ["Сөздік қоры және заттарды атау", card.vocabulary],
    ["Ауызша сөйлеу", card.speech],
    ["Қайталау", card.repetition],
    ["Оқу", card.reading],
    ["Жазу", card.writing]
  ];

  const validScores = ratings
    .filter(item => item[1] !== undefined && item[1] !== "")
    .map(item => Number(item[1]));

  const total = validScores.reduce((sum, score) => sum + score, 0);
  const max = validScores.length * 3;

  const scoreRows = ratings.map(item => `
    <tr>
      <td>${item[0]}</td>
      <td>${item[1] === undefined || item[1] === ""
        ? "Бағаланбаған"
        : item[1] + " / 3"}
      </td>
    </tr>
  `).join("");

  const communication = [
    ["oral", "Ауызша сөйлеу"],
    ["gesture", "Ым-ишара"],
    ["writingMethod", "Жазу арқылы"],
    ["pictures", "Суреттер арқылы"],
    ["board", "Коммуникативтік тақта"]
  ]
    .filter(item => card[item[0]])
    .map(item => item[1])
    .join(", ") || "Көрсетілмеген";

  const reportWindow = window.open("", "_blank");

  if (!reportWindow) {
    alert("Есеп терезесі ашылмады. Браузердің қалқымалы терезелерге рұқсатын тексеріңіз.");
    return;
  }

  reportWindow.document.write(`
    <!DOCTYPE html>
    <html lang="kk">
    <head>
      <meta charset="UTF-8">
      <title>Тілашар — сөйлеу картасы</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          color: #222;
          padding: 30px;
          line-height: 1.5;
        }

        h1, h2 {
          text-align: center;
        }

        h1 {
          color: #5945a8;
          font-size: 25px;
        }

        h2 {
          font-size: 18px;
          margin-top: 28px;
          border-bottom: 1px solid #aaa;
          padding-bottom: 7px;
        }

        .subtitle {
          text-align: center;
          color: #666;
        }

        .info {
          margin-top: 25px;
          padding: 15px;
          border: 1px solid #ddd;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }

        th, td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }

        th {
          background: #eeeafb;
        }

        .note {
          min-height: 35px;
          border-bottom: 1px dotted #aaa;
          padding: 8px 0;
          white-space: pre-wrap;
        }

        .signature {
          margin-top: 45px;
          display: flex;
          justify-content: space-between;
        }

        .score {
          background: #f1efff;
          padding: 15px;
          margin-top: 15px;
        }

        @media print {
          body {
            padding: 10px;
          }

          .no-print {
            display: none;
          }
        }
      </style>
    </head>

    <body>

      <h1>«ТІЛАШАР» ЛОГОПЕДИЯЛЫҚ КАБИНЕТІ</h1>

      <p class="subtitle">
        Афазиясы бар ересектерге арналған электронды сөйлеу картасы
      </p>

      <div class="info">
        <p><b>Аты-жөні:</b> ${escapeCard(getReportValue(card.fullName))}</p>
        <p><b>Жасы:</b> ${escapeCard(getReportValue(card.age))}</p>
        <p><b>Тексеру күні:</b> ${escapeCard(getReportValue(card.date))}</p>
        <p><b>Логопед:</b> ${escapeCard(getReportValue(card.logoped))}</p>
        <p><b>Бұзылыстың басталған уақыты:</b>
          ${escapeCard(getReportValue(card.onset))}
        </p>
      </div>

      <h2>1. Жалпы бақылау</h2>

      <p><b>Қарым-қатынас:</b>
        ${escapeCard(getReportValue(card.communication))}
      </p>

      <p><b>Нұсқауды қабылдауы:</b>
        ${escapeCard(getReportValue(card.instruction))}
      </p>

      <p><b>Тапсырмаға қатысуы:</b>
        ${escapeCard(getReportValue(card.participation))}
      </p>

      <p><b>Шаршағыштығы:</b>
        ${escapeCard(getReportValue(card.fatigue))}
      </p>

      <p><b>Ескертпе:</b>
        ${escapeCard(getReportValue(card.generalNote))}
      </p>

      <h2>2. Сөйлеу дағдыларын бағалау</h2>

      <table>
        <thead>
          <tr>
            <th>Бағалау бағыты</th>
            <th>Нәтиже</th>
          </tr>
        </thead>
        <tbody>
          ${scoreRows}
        </tbody>
      </table>

      <div class="score">
        <b>Жалпы жиналған балл:</b>
        ${total} / ${max || 0}
        <br>
        <small>
          Бұл балл тек толтырылған көрсеткіштер бойынша есептеледі.
          Ол афазияның медициналық ауырлық дәрежесін анықтамайды.
        </small>
      </div>

      <h2>3. Қарым-қатынас тәсілдері</h2>
      <p>${escapeCard(communication)}</p>

      <h2>4. Қосымша бақылау</h2>

      <p><b>Дыбыс айту:</b>
        ${escapeCard(getReportValue(card.pronunciation))}
      </p>

      <p><b>Сөйлеу қарқыны:</b>
        ${escapeCard(getReportValue(card.tempo))}
      </p>

      <p><b>Дауыс:</b>
        ${escapeCard(getReportValue(card.voice))}
      </p>

      <p><b>Қимыл-қозғалыс:</b>
        ${escapeCard(getReportValue(card.movement))}
      </p>

      <p><b>Тыныс алу мен сөйлеуді үйлестіру:</b>
        ${escapeCard(getReportValue(card.breathing))}
      </p>

      <h2>5. Логопедиялық қорытынды</h2>

      <p><b>Сақталған дағдылар:</b></p>
      <div class="note">${escapeCard(getReportValue(card.preserved))}</div>

      <p><b>Қиындықтар:</b></p>
      <div class="note">${escapeCard(getReportValue(card.difficulties))}</div>

      <p><b>Түзету бағыттары:</b></p>
      <div class="note">${escapeCard(getReportValue(card.directions))}</div>

      <p><b>Ұсыныстар:</b></p>
      <div class="note">${escapeCard(getReportValue(card.recommendations))}</div>

      <p><b>Қорытынды:</b></p>
      <div class="note">${escapeCard(getReportValue(card.conclusion))}</div>

      <h2>6. Даму динамикасы</h2>

      <p><b>Бастапқы тексеру:</b>
        ${escapeCard(getReportValue(card.initialDate))}
      </p>
      <p>${escapeCard(getReportValue(card.initialNote))}</p>

      <p><b>Аралық тексеру:</b>
        ${escapeCard(getReportValue(card.middleDate))}
      </p>
      <p>${escapeCard(getReportValue(card.middleNote))}</p>

      <p><b>Қорытынды тексеру:</b>
        ${escapeCard(getReportValue(card.finalDate))}
      </p>
      <p>${escapeCard(getReportValue(card.finalNote))}</p>

      <div class="signature">
        <span>Логопед: __________________</span>
        <span>Күні: ______________</span>
      </div>

      <br>

      <button class="no-print" onclick="window.print()">
        PDF сақтау / Басып шығару
      </button>

    </body>
    </html>
  `);

  reportWindow.document.close();
}

// ==========================================
// КАБИНЕТКЕ PDF БАТЫРМАСЫН ҚОСУ
// ==========================================

function addReportButton() {
  const container = document.getElementById("speechCardContainer");

  if (!container || document.getElementById("reportButton")) return;

  const button = document.createElement("button");

  button.id = "reportButton";
  button.textContent = "📄 PDF есеп қалыптастыру";
  button.className = "sc-report-button";
  button.onclick = generatePatientReport;

  container.appendChild(button);
}

const reportStyle = document.createElement("style");

reportStyle.textContent = `
.sc-report-button {
  display: block;
  width: 100%;
  padding: 16px;
  margin: 20px 0;
  border: none;
  border-radius: 13px;
  background: #6954c9;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.sc-report-button:hover {
  background: #5140a5;
}
`;

document.head.appendChild(reportStyle);

const previousReportCabinet = window.openCabinet;

window.openCabinet = function() {
  if (typeof previousReportCabinet === "function") {
    previousReportCabinet();
  }

  setTimeout(addReportButton, 100);
};
