// ==========================================
// ТІЛАШАР — ПАЦИЕНТТЕР БАЗАСЫ
// ==========================================

function getPatients() {
  return JSON.parse(localStorage.getItem("patientsDatabase") || "[]");
}

function savePatients(patients) {
  localStorage.setItem("patientsDatabase", JSON.stringify(patients));
}

function getActivePatientId() {
  return localStorage.getItem("activePatientId");
}

function setActivePatientId(id) {
  localStorage.setItem("activePatientId", id);
}

// Пациенттер бөлімін құру
function renderPatients() {
  const container = document.getElementById("speechCardContainer");
  if (!container) return;

  const patients = getPatients();
  const activeId = getActivePatientId();

  container.innerHTML = `
    <div class="patients-header">
      <h2>👥 Пациенттер базасы</h2>
      <p>Пациенттердің жеке мәліметтері мен сөйлеу карталарын басқару</p>
    </div>

    <div class="patients-actions">
      <button onclick="createNewPatient()">
        ＋ Жаңа пациент қосу
      </button>
    </div>

    <div class="patients-search">
      <input
        type="search"
        id="patientSearch"
        placeholder="Пациенттің аты-жөнін іздеу..."
        oninput="filterPatients()"
      >
    </div>

    <div id="patientsList">
      ${patients.length ? patients.map(patient => `
        <div class="patient-card">
          <div>
            <h3>${escapeCard(patient.fullName || "Аты-жөні көрсетілмеген")}</h3>
            <p>Жасы: ${escapeCard(patient.age || "Көрсетілмеген")}</p>
            <small>Тіркелген күні: ${escapeCard(patient.createdAt || "—")}</small>
          </div>

          <div class="patient-buttons">
            <button onclick="openPatient('${patient.id}')">
              Картаны ашу
            </button>

            <button class="patient-delete"
              onclick="deletePatient('${patient.id}')">
              🗑
            </button>
          </div>
        </div>
      `).join("") : `
        <div class="patients-empty">
          <span>📂</span>
          <h3>Пациенттер әзірге жоқ</h3>
          <p>Жаңа пациент қосу батырмасын басыңыз.</p>
        </div>
      `}
    </div>

    <div id="patientFormArea"></div>
    <div id="patientSpeechCard"></div>
  `;
}

// Жаңа пациент қосу
function createNewPatient() {
  const area = document.getElementById("patientFormArea");

  area.innerHTML = `
    <div class="patient-form">
      <h3>Жаңа пациент тіркеу</h3>

      <label>Аты-жөні
        <input id="newPatientName" placeholder="Аты-жөнін енгізіңіз">
      </label>

      <label>Жасы
        <input id="newPatientAge" type="number" min="18" placeholder="Жасы">
      </label>

      <label>Тіркелген күні
        <input id="newPatientDate" type="date">
      </label>

      <div class="patient-buttons">
        <button onclick="saveNewPatient()">Сақтау</button>
        <button class="patient-cancel"
          onclick="document.getElementById('patientFormArea').innerHTML=''">
          Болдырмау
        </button>
      </div>
    </div>
  `;

  document.getElementById("newPatientDate").value =
    new Date().toISOString().slice(0, 10);
}

// Пациентті сақтау
function saveNewPatient() {
  const name = document.getElementById("newPatientName").value.trim();
  const age = document.getElementById("newPatientAge").value;
  const date = document.getElementById("newPatientDate").value;

  if (!name) {
    alert("Пациенттің аты-жөнін енгізіңіз!");
    return;
  }

  const patients = getPatients();

  const patient = {
    id: "patient_" + Date.now(),
    fullName: name,
    age: age,
    createdAt: date || new Date().toLocaleDateString("kk-KZ"),
    speechCard: {
      fullName: name,
      age: age,
      date: date
    }
  };

  patients.push(patient);
  savePatients(patients);

  setActivePatientId(patient.id);

  loadPatientCard(patient);

  alert("Пациент сәтті тіркелді!");
}

// Пациент картасын ашу
function openPatient(id) {
  const patient = getPatients().find(p => p.id === id);

  if (!patient) {
    alert("Пациент табылмады!");
    return;
  }

  setActivePatientId(id);
  loadPatientCard(patient);
}

// Пациенттің картасын жүктеу
function loadPatientCard(patient) {
  const data = JSON.parse(localStorage.getItem("platformData") || "{}");

  data.speechCard = patient.speechCard || {
    fullName: patient.fullName,
    age: patient.age
  };

  localStorage.setItem("platformData", JSON.stringify(data));

  renderPatients();

  const area = document.getElementById("patientSpeechCard");

  area.innerHTML = `
    <div class="active-patient">
      <h3>👤 ${escapeCard(patient.fullName)}</h3>
      <p>Жасы: ${escapeCard(patient.age || "Көрсетілмеген")}</p>
      <p>Қазіргі уақытта осы пациенттің картасы ашық.</p>
    </div>
    <div id="activeSpeechCard"></div>
  `;

  // Сөйлеу картасын көрсету
  const oldContainer = document.getElementById("speechCardContainer");

  // Карта формасын уақытша жеке контейнерге көрсету
  const originalContainer = document.getElementById("speechCardContainer");
  const temporaryContainer = document.createElement("div");
  temporaryContainer.id = "speechCardContainer";

  area.appendChild(temporaryContainer);

  renderSpeechCard();

  const renderedContent = temporaryContainer.innerHTML;

  temporaryContainer.remove();

  document.getElementById("activeSpeechCard").innerHTML = renderedContent;
}

// Іздеу
function filterPatients() {
  const query = document.getElementById("patientSearch")
    .value.toLowerCase();

  document.querySelectorAll(".patient-card").forEach(card => {
    card.style.display =
      card.textContent.toLowerCase().includes(query) ? "" : "none";
  });
}

// Пациентті жою
function deletePatient(id) {
  if (!confirm("Осы пациенттің картасын жоясыз ба?")) return;

  const patients = getPatients().filter(p => p.id !== id);

  savePatients(patients);

  if (getActivePatientId() === id) {
    localStorage.removeItem("activePatientId");
  }

  renderPatients();
}

// Сөйлеу картасын пациент профиліне сақтау
const originalSaveSpeechCardForm = window.saveSpeechCardForm;

window.saveSpeechCardForm = function() {
  if (typeof originalSaveSpeechCardForm === "function") {
    originalSaveSpeechCardForm();
  }

  const activeId = getActivePatientId();
  if (!activeId) return;

  const patients = getPatients();
  const patient = patients.find(p => p.id === activeId);

  if (!patient) return;

  const data = JSON.parse(localStorage.getItem("platformData") || "{}");

  patient.speechCard = data.speechCard || {};
  patient.fullName = patient.speechCard.fullName || patient.fullName;
  patient.age = patient.speechCard.age || patient.age;

  savePatients(patients);
};

// Кабинетті ашу
const previousPatientsOpenCabinet = window.openCabinet;

window.openCabinet = function() {
  if (typeof previousPatientsOpenCabinet === "function") {
    previousPatientsOpenCabinet();
  }

  renderPatients();
};

// ==========================================
// ДИЗАЙН
// ==========================================

const patientsStyle = document.createElement("style");

patientsStyle.textContent = `
.patients-header {
  text-align: center;
  padding: 25px;
  background: linear-gradient(135deg,#6954c9,#9d87ed);
  color: white;
  border-radius: 20px;
  margin-bottom: 20px;
}

.patients-actions button,
.patient-buttons button {
  border: none;
  padding: 12px 18px;
  background: #7058d5;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

.patients-search input,
.patient-form input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border: 1px solid #ddd5f5;
  border-radius: 12px;
  margin: 12px 0;
}

.patient-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: white;
  border-radius: 16px;
  margin: 12px 0;
  box-shadow: 0 5px 18px rgba(60,40,120,.08);
}

.patient-card h3 {
  color: #6954c9;
}

.patient-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.patient-delete {
  background: #e85d75 !important;
}

.patient-cancel {
  background: #999 !important;
}

.patient-form,
.active-patient {
  background: #f7f5ff;
  border-radius: 18px;
  padding: 20px;
  margin: 20px 0;
}

.patient-form label {
  display: block;
  margin: 12px 0;
}

.patients-empty {
  text-align: center;
  padding: 35px;
  background: white;
  border-radius: 18px;
}

.patients-empty span {
  font-size: 45px;
}

@media(max-width:600px) {
  .patient-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .patient-buttons {
    width: 100%;
  }
}
`;

document.head.appendChild(patientsStyle);
