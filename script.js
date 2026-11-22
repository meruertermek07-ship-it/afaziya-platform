// ==================================================
// АФАЗИЯ – ЦИФРЛЫҚ ТҮЗЕТУ-ДАМЫТУ ПЛАТФОРМАСЫ
// ==================================================

const STORAGE_KEY = "afaziyaPlatformData";

let currentSection = "";
let currentTask = null;
let microphoneStream = null;
let cameraStream = null;
let recognition = null;

let platformData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    bonus: 0,
    completed: [],
    attempts: {},
    scores: {},
    unlockedRewards: [],
    history: [],
    initialResults: null,
    speechCard: {}
};

// ==================================================
// БӨЛІМДЕР МЕН ТАПСЫРМАЛАР
// ==================================================

const sections = {
    breathing: {
        title: "Тыныс алу жаттығулары",
        icon: "🌬️",
        tasks: [
            {
                id: "b1",
                title: "Қауырсынды ұшыру",
                goal: "Ұзақ әрі бірқалыпты дем шығаруды жаттықтыру.",
                instruction: "Мұрынмен тыныс алып, ауызбен баяу үрлеңіз. Экрандағы қауырсынды мәреге жеткізіңіз.",
                materials: "Қауырсын суреті, микрофон.",
                warning: "Басты айналдыратындай қатты немесе ұзақ үрлемеңіз.",
                bonus: 10,
                type: "breath"
            },
            {
                id: "b2",
                title: "Мақтаны үрлеу",
                goal: "Дем шығаруды бірқалыпты басқару.",
                instruction: "Мақтаны бастапқы нүктеден мәреге дейін баяу үрлеңіз.",
                materials: "Мақта бейнесі, бастапқы нүкте және мәреге арналған сызық.",
                warning: "Өзіңізге ыңғайлы тыныс ырғағын сақтаңыз.",
                bonus: 10,
                type: "breath"
            },
            {
                id: "b3",
                title: "Желкенді қайық",
                goal: "Тыныс пен дем шығаруды үйлестіру.",
                instruction: "Микрофонға үрлеп, экрандағы қайықты қозғалысқа келтіріңіз.",
                materials: "Қайық анимациясы, микрофон.",
                warning: "Қатты күш салудың қажеті жоқ.",
                bonus: 10,
                type: "breath"
            },
            {
                id: "b4",
                title: "Сабын көпіршіктері",
                goal: "Бірқалыпты дем шығаруды жаттықтыру.",
                instruction: "Баяу үрлеп, экранда көпіршіктердің пайда болуын бақылаңыз.",
                materials: "Көпіршік суреттері, микрофон.",
                warning: "Тыныс алуды табиғи қалыпта орындаңыз.",
                bonus: 10,
                type: "breath"
            },
            {
                id: "b5",
                title: "Шамды сөндір",
                goal: "Дем шығарудың ұзақтығы мен бағытын бақылау.",
                instruction: "Экрандағы жанбайтын шам макетіне қарай баяу үрлеңіз.",
                materials: "Қағаз шам макеті, микрофон.",
                warning: "Нақты от қолданылмайды.",
                bonus: 10,
                type: "breath"
            }
        ]
    },

    articulation: {
        title: "Артикуляциялық жаттығулар",
        icon: "👄",
        tasks: [
            {
                id: "a1",
                title: "Түтікше",
                goal: "Ерін бұлшықеттерінің қимылын жаттықтыру.",
                instruction: "Ерінді алға қарай созып, түтікше пішініне келтіріңіз.",
                materials: "Айна, камера.",
                warning: "Қимылды ауырсынусыз орындаңыз.",
                bonus: 10,
                type: "camera"
            },
            {
                id: "a2",
                title: "Тіс тазалау",
                goal: "Тілдің қимылын дамыту.",
                instruction: "Тіл ұшымен жоғарғы және төменгі тістердің ішкі жағын кезекпен айналдыра жүргізіңіз.",
                materials: "Айна, камера.",
                warning: "Тілді қатты баспаңыз.",
                bonus: 10,
                type: "camera"
            },
            {
                id: "a3",
                title: "Сағат",
                goal: "Тіл ұшының оңға және солға қозғалуын дамыту.",
                instruction: "Ауызды ашып, тіл ұшын оң және сол жаққа кезекпен қозғалтыңыз.",
                materials: "Айна, камера.",
                warning: "Жаттығуды асықпай орындаңыз.",
                bonus: 10,
                type: "camera"
            },
            {
                id: "a4",
                title: "Тәтті тосап",
                goal: "Тілдің жоғары бағыттағы қимылын жаттықтыру.",
                instruction: "Тілдің жалпақ ұшымен жоғарғы ерінді жоғарыдан төмен қарай жалағандай қимыл жасаңыз.",
                materials: "Айна, камера.",
                warning: "Басты шалқайтпаңыз.",
                bonus: 10,
                type: "camera"
            },
            {
                id: "a5",
                title: "Әткеншек",
                goal: "Тілдің жоғары және төмен қозғалысын дамыту.",
                instruction: "Тіл ұшын кезекпен жоғарғы және төменгі ерінге бағыттаңыз.",
                materials: "Айна, камера.",
                warning: "Қимылды баяу орындаңыз.",
                bonus: 10,
                type: "camera"
            },
            {
                id: "a6",
                title: "Футбол",
                goal: "Тілдің оң және сол жаққа бағытталған қозғалысын дамыту.",
                instruction: "Тілді оң және сол жақ ұртқа кезекпен тіреңіз.",
                materials: "Айна, камера.",
                warning: "Қимыл кезінде жақты қатты қыспаңыз.",
                bonus: 10,
                type: "camera"
            }
        ]
    },

    vocabulary: {
        title: "Сөздік қорды дамыту",
        icon: "📚",
        tasks: [
            {
                id: "v1",
                title: "Сөздер әлемі",
                goal: "Зат атауларын түсіну және сөзді суретпен сәйкестендіру.",
                instruction: "Берілген сөзге сәйкес суретті таңдаңыз.",
                materials: "Заттар суреттері, сөз карточкалары.",
                warning: "Қате жауап берілсе, тапсырманы қайта орындауға болады.",
                bonus: 15,
                type: "matching"
            },
            {
                id: "v2",
                title: "Жоғалған сөзді тап",
                goal: "Сөйлем мағынасына сәйкес сөзді таңдау.",
                instruction: "Сөйлемдегі бос орынды мағынасына сай сөзбен толықтырыңыз.",
                materials: "Сөйлем карточкалары, сөздер.",
                warning: "Сөйлемді толық тыңдап немесе оқып шығыңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "v3",
                title: "Сөзді оят!",
                goal: "Зат атауларын өздігінен еске түсіру.",
                instruction: "Суреттегі заттың атауын микрофонға айтыңыз немесе мәтін өрісіне жазыңыз.",
                materials: "Заттар суреттері, микрофон.",
                warning: "Сөйлеуді тану нәтижесін логопед тексеруі қажет.",
                bonus: 15,
                type: "speech"
            },
            {
                id: "v4",
                title: "Сөздер себеті",
                goal: "Сөздерді мағыналық топтарға бөлу.",
                instruction: "Суреттерді тиісті топқа орналастырыңыз.",
                materials: "Жемістер, киімдер, жануарлар, ыдыстар суреттері.",
                warning: "Әр суреттің мағынасын мұқият қараңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "v5",
                title: "Сөздің досын тап",
                goal: "Заттар арасындағы мағыналық байланысты анықтау.",
                instruction: "Мағынасы бір-бірімен байланысты суреттерді жұптастырыңыз.",
                materials: "Заттар мен олардың жұптарының суреттері.",
                warning: "Заттардың қолданылу мақсатын ескеріңіз.",
                bonus: 15,
                type: "matching"
            },
            {
                id: "v6",
                title: "Менің бір күнім",
                goal: "Күнделікті әрекеттердің ретін түсіну және атау.",
                instruction: "Суреттерді дұрыс ретпен орналастырып, әрекеттерді атаңыз.",
                materials: "Күнделікті әрекеттер бейнеленген суреттер.",
                warning: "Оқиғалардың табиғи ретін сақтаңыз.",
                bonus: 15,
                type: "ordering"
            }
        ]
    },

    understanding: {
        title: "Сөйлеуді түсіну",
        icon: "👂",
        tasks: [
            {
                id: "u1",
                title: "Тыңда да, тап!",
                goal: "Ауызша айтылған сөзді түсіну.",
                instruction: "Аудионы тыңдап, сәйкес суретті таңдаңыз.",
                materials: "Аудиожазбалар, заттар суреттері.",
                warning: "Қажет болса, аудионы қайта тыңдаңыз.",
                bonus: 15,
                type: "listening"
            },
            {
                id: "u2",
                title: "Жасырын зат",
                goal: "Заттың қызметі мен сипаттамасын түсіну.",
                instruction: "Сипаттаманы тыңдап, қандай зат туралы айтылғанын анықтаңыз.",
                materials: "Заттар суреттері, сипаттамалар.",
                warning: "Заттың қызметіне назар аударыңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "u3",
                title: "Дыбыстың иесін тап",
                goal: "Қоршаған орта дыбыстарын ажырату.",
                instruction: "Дыбысты тыңдап, оған сәйкес суретті таңдаңыз.",
                materials: "Жануарлар, көлік, қоңырау және табиғат дыбыстары.",
                warning: "Бұл жаттығу сөзді түсіну тапсырмасын алмастырмайды.",
                bonus: 15,
                type: "listening"
            },
            {
                id: "u4",
                title: "Қайсысы қайда жатады?",
                goal: "Заттарды мағыналық топтарға біріктіру.",
                instruction: "Аудиода айтылған топқа жататын суреттерді таңдаңыз.",
                materials: "Жемістер, киімдер, ыдыстар, жануарлар суреттері.",
                warning: "Бірнеше дұрыс жауап болуы мүмкін.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "u5",
                title: "Әрекетті таны!",
                goal: "Етістіктердің мағынасын түсіну.",
                instruction: "Әрекетті тыңдап, сәйкес суретті таңдаңыз.",
                materials: "Қимыл-әрекет суреттері.",
                warning: "Ұқсас әрекеттерді мұқият ажыратыңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "u6",
                title: "Қай жерде орналасқан?",
                goal: "Кеңістіктік ұғымдарды түсіну.",
                instruction: "Затты нұсқауға сәйкес орналастырыңыз.",
                materials: "Бөлме суреті, заттар бейнелері.",
                warning: "Үстінде, астында, ішінде, жанында сөздеріне назар аударыңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "u7",
                title: "Сөйлемнің суретін тап!",
                goal: "Сөйлемнің жалпы мағынасын түсіну.",
                instruction: "Сөйлемді тыңдап, оған сәйкес суретті таңдаңыз.",
                materials: "Сюжеттік суреттер, аудиожазбалар.",
                warning: "Кім? Не істеді? Кімге? сұрақтарын ескеріңіз.",
                bonus: 15,
                type: "listening"
            },
            {
                id: "u8",
                title: "Дұрыс орында!",
                goal: "Бірізді және көпсатылы нұсқауларды түсіну.",
                instruction: "Аудиода берілген әрекеттерді ретімен орындаңыз.",
                materials: "Заттар суреттері, аудионұсқаулар.",
                warning: "Қажет болған жағдайда нұсқауды бөліктерге бөліп тыңдаңыз.",
                bonus: 15,
                type: "choice"
            }
        ]
    },

    speech: {
        title: "Сөйлеуді қалыптастыру",
        icon: "🗣️",
        tasks: [
            {
                id: "s1",
                title: "Дыбысты оят!",
                goal: "Дауысты дыбыстарды айту және қайталау.",
                instruction: "А, О, Ұ, І дыбыстарын тыңдап, қайталаңыз.",
                materials: "Аудиожазба, микрофон.",
                warning: "Дыбыстың дұрыстығын логопед бағалайды.",
                bonus: 15,
                type: "speech"
            },
            {
                id: "s2",
                title: "Буын пойызы",
                goal: "Буындарды біріктіріп, сөз құрастыру.",
                instruction: "Буындарды ретімен орналастырып, сөзді құрастырыңыз.",
                materials: "Буын карточкалары.",
                warning: "Алдымен жеңіл буындардан бастаңыз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "s3",
                title: "Суретті сөйлет!",
                goal: "Сурет бойынша заттарды өздігінен атау.",
                instruction: "Суретке қарап, заттың атауын айтыңыз немесе жазыңыз.",
                materials: "Заттар суреттері, микрофон.",
                warning: "Қажет болса, алғашқы дыбыс арқылы көмек алыңыз.",
                bonus: 15,
                type: "speech"
            },
            {
                id: "s4",
                title: "Сөзді толықтыр!",
                goal: "Сөздің жетіспейтін бөлігін анықтау.",
                instruction: "Берілген сөздегі бос орынды тиісті әріптермен толықтырыңыз.",
                materials: "Сөз карточкалары, әріптер.",
                warning: "Сөздің мағынасын да ескеріңіз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "s5",
                title: "Сөз құрастыру шеберханасы",
                goal: "Сөз тіркесі мен қарапайым сөйлем құрастыру.",
                instruction: "Берілген сөздерден мағыналы сөйлем құраңыз.",
                materials: "Сөз карточкалары, суреттер.",
                warning: "Сөздердің орын тәртібіне назар аударыңыз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "s6",
                title: "Әңгіме құрастыр!",
                goal: "Байланыстырып сөйлеуді дамыту.",
                instruction: "Суреттерді ретімен орналастырып, оқиғаны баяндаңыз.",
                materials: "Сюжеттік суреттер.",
                warning: "Оқиғаның басы, ортасы және соңын сақтаңыз.",
                bonus: 15,
                type: "speech"
            },
            {
                id: "s7",
                title: "Диалог алаңы",
                goal: "Күнделікті қарым-қатынас дағдыларын дамыту.",
                instruction: "Берілген жағдаят бойынша сұрақтарға жауап беріңіз.",
                materials: "Диалог карточкалары, виртуалды кейіпкер.",
                warning: "Қажет болса, дайын жауап үлгілерін пайдаланыңыз.",
                bonus: 15,
                type: "speech"
            },
            {
                id: "s8",
                title: "Микрофон менің қолымда!",
                goal: "Өз ойын сөз және сөйлем арқылы жеткізу.",
                instruction: "Берілген тақырып бойынша сөйлеңіз немесе жауабыңызды жазыңыз.",
                materials: "Микрофон, тақырыптық суреттер.",
                warning: "Сөйлеуді автоматты тану нәтижесі қате болуы мүмкін.",
                bonus: 15,
                type: "speech"
            }
        ]
    },

    reading: {
        title: "Оқу және жазу",
        icon: "✍️",
        tasks: [
            {
                id: "r1",
                title: "Әріпті таны және таңда",
                goal: "Әріптерді тану және ажырату.",
                instruction: "Берілген үлгіге сәйкес әріпті таңдаңыз.",
                materials: "Әріп карточкалары.",
                warning: "Ұқсас әріптерді ажыратуға көңіл бөліңіз.",
                bonus: 15,
                type: "choice"
            },
            {
                id: "r2",
                title: "Буындарды оқы",
                goal: "Буындарды оқу және біріктіру.",
                instruction: "Берілген буындарды оқып, сөз құрастырыңыз.",
                materials: "Буын карточкалары.",
                warning: "Өзіңізге ыңғайлы қарқынмен орындаңыз.",
                bonus: 15,
                type: "reading"
            },
            {
                id: "r3",
                title: "Сөзді оқып, суретін тап",
                goal: "Оқылған сөзді түсіну.",
                instruction: "Сөзді оқып, оған сәйкес суретті таңдаңыз.",
                materials: "Сөздер мен суреттер.",
                warning: "Сөздің мағынасын түсінуге назар аударыңыз.",
                bonus: 15,
                type: "matching"
            },
            {
                id: "r4",
                title: "Сөйлемді оқып, түсін",
                goal: "Сөйлем мазмұнын түсіну.",
                instruction: "Сөйлемді оқып, оған сәйкес суретті таңдаңыз.",
                materials: "Сөйлемдер, сюжеттік суреттер.",
                warning: "Сөйлемдегі негізгі ақпаратты анықтаңыз.",
                bonus: 15,
                type: "reading"
            },
            {
                id: "r5",
                title: "Мәтінді оқып, ақпаратты тап",
                goal: "Қысқа мәтіннің мазмұнын түсіну.",
                instruction: "Мәтінді оқып, сұрақтарға жауап беріңіз.",
                materials: "Қысқа мәтіндер, сұрақ карточкалары.",
                warning: "Мәтінді қажет болған жағдайда қайта оқыңыз.",
                bonus: 15,
                type: "reading"
            },
            {
                id: "r6",
                title: "Әріпті толықтыр",
                goal: "Сөздегі жетіспейтін әріпті анықтау.",
                instruction: "Сөздегі бос орынды тиісті әріппен толықтырыңыз.",
                materials: "Сөз карточкалары.",
                warning: "Сөзді толық оқып тексеріңіз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r7",
                title: "Сөзді құрастыр және жаз",
                goal: "Әріптерден сөз құрастыру.",
                instruction: "Аралас берілген әріптерді ретімен орналастырыңыз.",
                materials: "Әріп карточкалары, пернетақта.",
                warning: "Әріптердің ретін тексеріңіз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r8",
                title: "Есті де, жаз",
                goal: "Есту арқылы қабылданған сөзді жазу.",
                instruction: "Аудионы тыңдап, естіген сөзіңізді жазыңыз.",
                materials: "Аудиожазбалар, мәтін өрісі.",
                warning: "Аудионы қайталап тыңдауға болады.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r9",
                title: "Сурет бойынша сөз жаз",
                goal: "Суреттегі заттар мен әрекеттердің атауын жазу.",
                instruction: "Суретке қарап, оның атауын жазыңыз.",
                materials: "Заттар мен әрекеттер суреттері.",
                warning: "Жазған сөзіңізді қайта оқыңыз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r10",
                title: "Сөйлемді толықтыр және жаз",
                goal: "Мағыналы сөйлем құрастыру.",
                instruction: "Сөйлемдегі бос орынды толтырып, толық сөйлем жазыңыз.",
                materials: "Сөйлем карточкалары.",
                warning: "Сөйлемнің мағыналық байланысын сақтаңыз.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r11",
                title: "Күнделікті өмірде жазу",
                goal: "Тұрмыстық жазу дағдыларын дамыту.",
                instruction: "Қысқа хабарлама немесе сатып алу тізімін жазыңыз.",
                materials: "Жазу үлгілері, мәтін өрісі.",
                warning: "Жазу мазмұны адамның күнделікті қажеттілігіне сай болуы керек.",
                bonus: 15,
                type: "writing"
            },
            {
                id: "r12",
                title: "Мәтін құрастыр және жаз",
                goal: "Бірнеше сөйлемнен тұратын мәтін құрастыру.",
                instruction: "Суреттер мен тірек сөздерді пайдаланып, шағын мәтін жазыңыз.",
                materials: "Сюжеттік суреттер, тірек сөздер.",
                warning: "Ойдың жүйелілігіне назар аударыңыз.",
                bonus: 15,
                type: "writing"
            }
        ]
    },

    logorhythmics: {
        title: "Логоритмика",
        icon: "🎵",
        tasks: [
            {
                id: "l1",
                title: "Нүктелерді қосу",
                goal: "Көру-қимыл үйлесімділігін дамыту.",
                instruction: "Нүктелерді берілген ретпен қосыңыз.",
                materials: "Нүктелер картасы, қарындаш.",
                warning: "Қимылды асықпай орындаңыз.",
                bonus: 10,
                type: "drawing"
            },
            {
                id: "l2",
                title: "Екі қолмен жаттығу",
                goal: "Қимылдарды үйлестіру.",
                instruction: "Карточкадағы екі қол жаттығуын кезекпен орындаңыз.",
                materials: "Қимыл карточкалары.",
                warning: "Қимылды өз мүмкіндігіңізге қарай орындаңыз.",
                bonus: 10,
                type: "movement"
            },
            {
                id: "l3",
                title: "Лабиринт",
                goal: "Көру арқылы бағдарлау және зейінді дамыту.",
                instruction: "Бастапқы нүктеден мәреге дейін жол табыңыз.",
                materials: "Лабиринт суреті.",
                warning: "Жолды мұқият бақылаңыз.",
                bonus: 10,
                type: "drawing"
            },
            {
                id: "l4",
                title: "Түстер әлемі",
                goal: "Түстерді ажырату және нұсқауды орындау.",
                instruction: "Айтылған түске сәйкес карточканы таңдаңыз.",
                materials: "Түрлі түсті карточкалар.",
                warning: "Түстерді атаумен қатар, көрсетуді де қолдануға болады.",
                bonus: 10,
                type: "choice"
            }
        ]
    }
};


// ==================================================
// ДЕРЕКТЕРДІ САҚТАУ
// ==================================================

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(platformData));
}

function getAllTasks() {
    return Object.values(sections).flatMap(section => section.tasks);
}

function getTaskById(id) {
    return getAllTasks().find(task => task.id === id);
}

function getCompletedCount() {
    return platformData.completed.length;
}

function getTotalCount() {
    return getAllTasks().length;
}


// ==================================================
// БЕТТЕР АРАСЫНДА АУЫСУ
// ==================================================

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.style.display = "block";
        page.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function enterPlatform() {
    showPage("mainPage");
    updateBonusDisplay();
}

function backToMain() {
    showPage("mainPage");
}

function backToTasks() {
    showPage("tasksPage");
}

function openCabinet() {
    showPage("cabinetPage");
    renderSpeechCard();
}


// ==================================================
// БӨЛІМДІ АШУ
// ==================================================

function openSection(sectionId) {
    const section = sections[sectionId];

    if (!section) return;

    currentSection = sectionId;

    const title = document.getElementById("sectionTitle");

    if (title) {
        title.textContent = section.title;
    }

    const container = document.getElementById("tasksContainer");

    if (!container) return;

    container.innerHTML = "";

    section.tasks.forEach((task, index) => {
        const completed = platformData.completed.includes(task.id);

        const card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
            <div style="font-size:30px;margin-bottom:12px">
                ${section.icon}
            </div>

            <h3>${index + 1}. ${task.title}</h3>

            <p>${task.goal}</p>

            <p>
                ${completed ? "✅ Орындалды" : "🔒 Әлі орындалмаған"}
            </p>

            <button class="primary-btn" onclick="openExercise('${task.id}')">
                ${completed ? "Қайталау" : "Бастау"}
            </button>
        `;

        container.appendChild(card);
    });

    showPage("tasksPage");
}


// ==================================================
// ТАПСЫРМАНЫ АШУ
// ==================================================

function openExercise(taskId) {
    const task = getTaskById(taskId);

    if (!task) return;

    currentTask = task;

    document.getElementById("exerciseTitle").textContent = task.title;
    document.getElementById("exerciseGoal").textContent = task.goal;
    document.getElementById("exerciseInstruction").textContent = task.instruction;
    document.getElementById("exerciseMaterials").textContent = task.materials;
    document.getElementById("exerciseWarning").textContent = task.warning;

    const content = document.getElementById("exerciseContent");

    content.innerHTML = createExerciseContent(task);

    document.getElementById("exerciseResult").innerHTML = "";

    showPage("exercisePage");
}


// ==================================================
// ТАПСЫРМАҒА АРНАЛҒАН ИНТЕРАКТИВТІ АЙМАҚ
// ==================================================

function createExerciseContent(task) {

    if (task.type === "breath") {
        return `
            <h2>🌬️ Тыныс алу жаттығуы</h2>

            <div id="breathObject"
                style="font-size:75px;margin:25px">
                ${task.id === "b1" ? "🪶" :
                  task.id === "b2" ? "☁️" :
                  task.id === "b3" ? "⛵" :
                  task.id === "b4" ? "🫧" : "🕯️"}
            </div>

            <p id="breathStatus">Микрофонды қосып, баяу үрлеңіз.</p>

            <button class="primary-btn" onclick="activateMicrophone()">
                🎤 Микрофонды қосу
            </button>

            <button class="secondary-btn" onclick="moveBreathObject()">
                Үрлеу әрекетін белгілеу
            </button>
        `;
    }

    if (task.type === "camera") {
        return `
            <h2>👄 Артикуляциялық жаттығу</h2>

            <div class="media-box">
                <video id="cameraVideo" autoplay playsinline></video>
            </div>

            <p>
                Камера арқылы жаттығуды өзіңіз бақылай аласыз.
                Бұл автоматты медициналық бағалау емес.
            </p>

            <button class="primary-btn" onclick="activateCamera()">
                📷 Камераны қосу
            </button>
        `;
    }

    if (task.type === "speech") {
        return `
            <h2>🎤 Сөйлеу тапсырмасы</h2>

            <p>Жауабыңызды микрофонға айтыңыз немесе төменге жазыңыз.</p>

            <button class="primary-btn" onclick="activateMicrophone()">
                🎤 Сөйлеуді бастау
            </button>

            <textarea id="speechAnswer"
                placeholder="Жауабыңызды осында жазыңыз..."
                rows="4"></textarea>

            <p id="speechRecognitionResult"></p>
        `;
    }

    if (task.type === "writing") {
        return `
            <h2>✍️ Жазу тапсырмасы</h2>

            <textarea id="writingAnswer"
                rows="5"
                placeholder="Жауабыңызды жазыңыз..."></textarea>

            <button class="secondary-btn" onclick="showWritingHelp()">
                Көмек алу
            </button>
        `;
    }

    if (task.type === "reading") {
        return `
            <h2>📖 Оқу тапсырмасы</h2>

            <div class="info-box">
                <h3>Оқу материалы</h3>
                <p id="readingText">
                    АЛМА – ҚАЛАМ – КІТАП – БАЛА.
                </p>
            </div>

            <textarea id="readingAnswer"
                rows="3"
                placeholder="Оқығаныңыз туралы жауап жазыңыз..."></textarea>
        `;
    }

    if (task.type === "matching") {
        return `
            <h2>🧩 Сәйкестендіру тапсырмасы</h2>

            <div class="exercise-options">
                <button class="secondary-btn"
                    onclick="selectAnswer(this, true)">🍎 Алма</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">⚽ Доп</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">📚 Кітап</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">🥄 Қасық</button>
            </div>

            <p id="answerFeedback"></p>
        `;
    }

    if (task.type === "listening") {
        return `
            <h2>👂 Тыңдау тапсырмасы</h2>

            <button class="primary-btn" onclick="speakInstruction()">
                🔊 Аудионы тыңдау
            </button>

            <div class="exercise-options">
                <button class="secondary-btn"
                    onclick="selectAnswer(this, true)">🍎 Алма</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">⚽ Доп</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">📚 Кітап</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">🥄 Қасық</button>
            </div>

            <p id="answerFeedback"></p>
        `;
    }

    if (task.type === "choice") {
        return `
            <h2>🎯 Таңдау тапсырмасы</h2>

            <p>Берілген нұсқалардың ішінен дұрыс жауапты таңдаңыз.</p>

            <div class="exercise-options">
                <button class="secondary-btn"
                    onclick="selectAnswer(this, true)">Бірінші жауап</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">Екінші жауап</button>

                <button class="secondary-btn"
                    onclick="selectAnswer(this, false)">Үшінші жауап</button>
            </div>

            <p id="answerFeedback"></p>
        `;
    }

    if (task.type === "ordering") {
        return `
            <h2>🔢 Ретін анықтаңыз</h2>

            <p>Әрекеттердің дұрыс ретін жазыңыз.</p>

            <textarea id="orderAnswer"
                rows="3"
                placeholder="1. ... 2. ... 3. ..."></textarea>
        `;
    }

    if (task.type === "drawing") {
        return `
            <h2>✏️ Көру-қимыл тапсырмасы</h2>

            <div class="info-box">
                <p>Тапсырманы берілген сурет немесе карточка бойынша орындаңыз.</p>
            </div>

            <label>
                <input type="checkbox" id="drawingDone">
                Тапсырманы орындадым
            </label>
        `;
    }

    if (task.type === "movement") {
        return `
            <h2>🤲 Қимыл тапсырмасы</h2>

            <p>Карточкадағы қимылдарды кезекпен орындаңыз.</p>

            <div style="font-size:65px;margin:25px">🤲 👏 ✋</div>

            <button class="secondary-btn"
                onclick="this.textContent='Қимыл орындалды ✓'">
                Қимылды орындадым
            </button>
        `;
    }

    return `<p>Тапсырманы орындаңыз.</p>`;
}


// ==================================================
// ЖАУАПТЫ ТАҢДАУ
// ==================================================

function selectAnswer(button, isCorrect) {
    const feedback = document.getElementById("answerFeedback");

    if (!feedback) return;

    const buttons = button.parentElement.querySelectorAll("button");

    buttons.forEach(item => {
        item.disabled = true;
    });

    if (isCorrect) {
        feedback.innerHTML = "✅ Жауап таңдалды. Логопед нәтижені растай алады.";
        feedback.style.color = "#21845e";
    } else {
        feedback.innerHTML = "🔄 Бұл жауапты қайта қарастырыңыз.";
        feedback.style.color = "#d18a20";

        buttons.forEach(item => {
            item.disabled = false;
        });
    }

    platformData.attempts[currentTask.id] =
        (platformData.attempts[currentTask.id] || 0) + 1;

    saveData();
}


// ==================================================
// ТЫНЫС АЛУ АНИМАЦИЯСЫ
// ==================================================

function moveBreathObject() {
    const object = document.getElementById("breathObject");
    const status = document.getElementById("breathStatus");

    if (!object) return;

    object.style.transform = "translateX(100px) scale(1.2)";
    object.style.transition = "1s ease";

    if (status) {
        status.textContent = "Жақсы! Қозғалыс орындалды.";
    }
}


// ==================================================
// МИКРОФОН
// ==================================================

function activateMicrophone() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Бұл браузерде сөйлеуді тану қолжетімсіз. Chrome браузерін қолданып көріңіз.");
        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "kk-KZ";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = function(event) {
        let result = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            result += event.results[i][0].transcript;
        }

        const output = document.getElementById("speechRecognitionResult");

        if (output) {
            output.textContent = "Танылған жауап: " + result;
        }

        const answer = document.getElementById("speechAnswer");

        if (answer) {
            answer.value = result;
        }
    };

    recognition.onerror = function() {
        alert("Сөйлеуді тану кезінде қате пайда болды. Қайталап көріңіз.");
    };

    recognition.start();
}


// ==================================================
// КАМЕРА
// ==================================================

async function activateCamera() {
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        const video = document.getElementById("cameraVideo");

        if (video) {
            video.srcObject = cameraStream;
        }

    } catch (error) {
        alert("Камераға рұқсат берілмеді немесе камера қолжетімсіз.");
    }
}


// ==================================================
// КӨМЕК ЖҮЙЕСІ
// ==================================================

function showExerciseHelp() {
    if (!currentTask) return;

    alert(
        "💡 КӨМЕК\n\n" +
        currentTask.instruction +
        "\n\nЛогопед тапсырманы қосымша түсіндіре алады."
    );
}

function showWritingHelp() {
    alert(
        "💡 Кеңес:\n" +
        "Сөзді немесе сөйлемді асықпай ойланып жазыңыз. " +
        "Қажет болса, логопедтің көмегін пайдаланыңыз."
    );
}


// ==================================================
// АУДИО
// ==================================================

function speakInstruction() {
    if (!currentTask) return;

    if (!("speechSynthesis" in window)) {
        alert("Аудио оқу функциясы бұл браузерде қолжетімсіз.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(
        currentTask.instruction
    );

    speech.lang = "kk-KZ";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);
}


// ==================================================
// ТАПСЫРМАНЫ АЯҚТАУ
// ==================================================

function completeExercise() {
    if (!currentTask) return;

    const scoreInput = prompt(
        "Тапсырманың орындалуын бағалаңыз:\n\n" +
        "3 – өздігінен дұрыс орындады\n" +
        "2 – қайталап ұсынғаннан кейін орындады\n" +
        "1 – логопед көмегімен орындады\n" +
        "0 – орындай алмады\n\n" +
        "0–3 аралығындағы балды енгізіңіз:"
    );

    if (scoreInput === null) return;

    const score = Number(scoreInput);

    if (!Number.isInteger(score) || score < 0 || score > 3) {
        alert("0, 1, 2 немесе 3 балын енгізіңіз.");
        return;
    }

    const oldScore = platformData.scores[currentTask.id];

    platformData.scores[currentTask.id] = score;

    const alreadyCompleted =
        platformData.completed.includes(currentTask.id);

    if (!alreadyCompleted) {
        platformData.completed.push(currentTask.id);
        platformData.bonus += currentTask.bonus;
    }

    platformData.history.push({
        taskId: currentTask.id,
        title: currentTask.title,
        score: score,
        date: new Date().toLocaleString("kk-KZ"),
        previousScore: oldScore ?? null
    });

    saveData();

    const result = document.getElementById("exerciseResult");

    if (result) {
        result.innerHTML = `
            <h3>🌟 Тапсырма аяқталды!</h3>
            <p>Сіздің нәтижеңіз: ${score}/3 балл</p>
            <p>Бонус: ${alreadyCompleted ? "Қайта орындағаныңыз үшін қосылмайды" : "+" + currentTask.bonus}</p>
            <p>Жалпы бонус: ${platformData.bonus}</p>
            <p>Нәтиже логопедтің бақылауына арналған.</p>
        `;
    }

    updateBonusDisplay();
    updateResults();
}


// ==================================================
// БОНУС КӨРСЕТКІШІ
// ==================================================

function updateBonusDisplay() {
    const counter = document.querySelector(".bonus-counter");

    if (counter) {
        counter.textContent = "⭐ " + platformData.bonus + " бонус";
    }
}


// ==================================================
// НӘТИЖЕЛЕР
// ==================================================

function openResults() {
    updateResults();
    showPage("resultsPage");
}

function updateResults() {
    const statistics = document.getElementById("statistics");

    if (!statistics) return;

    const total = getTotalCount();
    const completed = getCompletedCount();
    const notCompleted = total - completed;
    const percent = total ? Math.round(completed / total * 100) : 0;

    const scoreValues = Object.values(platformData.scores);

    const totalScore = scoreValues.reduce((sum, score) => sum + score, 0);

    const maxScore = scoreValues.length * 3;

    const average = scoreValues.length
        ? (totalScore / scoreValues.length).toFixed(2)
        : "0";

    statistics.innerHTML = `
        <div class="statistics-grid">

            <div class="stat-card">
                <h3>Орындалған тапсырма</h3>
                <strong>${completed}</strong>
            </div>

            <div class="stat-card">
                <h3>Орындалмаған тапсырма</h3>
                <strong>${notCompleted}</strong>
            </div>

            <div class="stat-card">
                <h3>Жалпы орындалу</h3>
                <strong>${percent}%</strong>
            </div>

            <div class="stat-card">
                <h3>Жиналған бонус</h3>
                <strong>${platformData.bonus}</strong>
            </div>

        </div>

        <div class="stat-card">
            <h3>Жалпы прогресс</h3>
            <div class="progress-container">
                <div class="progress-bar" style="width:${percent}%"></div>
            </div>
            <strong>${percent}%</strong>
        </div>

        <div class="stat-card" style="margin-top:20px">
            <h3>Бағалау нәтижесі</h3>
            <p>Жиналған балл: ${totalScore}</p>
            <p>Ең жоғары мүмкін балл: ${maxScore}</p>
            <p>Орташа балл: ${average}</p>
        </div>
    `;

    renderBonusScale();
    renderRewards();
    renderTaskScores();
}


// ==================================================
// БОНУС ШКАЛАСЫ
// ==================================================

function renderBonusScale() {
    const container = document.getElementById("bonusScale");

    if (!container) return;

    const levels = [
        { name: "Пазл", bonus: 100, icon: "🧩" },
        { name: "Суретті боя", bonus: 150, icon: "🎨" },
        { name: "Айырмашылықты тап", bonus: 200, icon: "🔎" },
        { name: "Есте сақта", bonus: 250, icon: "🧠" },
        { name: "Жасырын суретті аш", bonus: 300, icon: "🎁" },
        { name: "Шарларды жина", bonus: 350, icon: "🎈" }
    ];

    container.innerHTML = levels.map(item => {
        const unlocked = platformData.bonus >= item.bonus;

        return `
            <div class="bonus-card">
                <div style="font-size:30px">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.bonus} бонус қажет</p>
                <p>${unlocked ? "✅ Ашылды" : "🔒 Жабық"}</p>
            </div>
        `;
    }).join("");
}


// ==================================================
// СЫЙЛЫҚ ОЙЫНДАРЫ
// ==================================================

const rewards = [
    { id: "puzzle", name: "Пазл", icon: "🧩", bonus: 100 },
    { id: "color", name: "Суретті боя", icon: "🎨", bonus: 150 },
    { id: "difference", name: "Айырмашылықты тап", icon: "🔎", bonus: 200 },
    { id: "memory", name: "Есте сақта", icon: "🧠", bonus: 250 },
    { id: "hidden", name: "Жасырын суретті аш", icon: "🎁", bonus: 300 },
    { id: "balloons", name: "Шарларды жина", icon: "🎈", bonus: 350 }
];

function renderRewards() {
    const container = document.getElementById("rewardsContainer");

    if (!container) return;

    container.innerHTML = rewards.map(reward => {
        const unlocked = platformData.bonus >= reward.bonus;

        if (
            unlocked &&
            !platformData.unlockedRewards.includes(reward.id)
        ) {
            platformData.unlockedRewards.push(reward.id);
        }

        return `
            <div class="reward-card ${unlocked ? "unlocked" : "locked"}">

                <div class="reward-icon">${reward.icon}</div>

                <h3>${reward.name}</h3>

                <p>${reward.bonus} бонус қажет</p>

                ${
                    unlocked
                    ? `<button class="success-btn"
                        onclick="openReward('${reward.id}')">
                        Ойынды ашу
                       </button>`
                    : `<button disabled class="secondary-btn">
                        🔒 Құлыптаулы
                       </button>`
                }

            </div>
        `;
    }).join("");

    saveData();
}

function openReward(id) {
    const reward = rewards.find(item => item.id === id);

    if (!reward) return;

    if (platformData.bonus < reward.bonus) {
        alert("Бұл ойын әлі ашылған жоқ.");
        return;
    }

    const games = {
        puzzle: "🧩 Пазл ойыны\n\nСуретті бөліктерден құрастыру.",
        color: "🎨 Суретті боя\n\nӨзіңізге ұнайтын түстерді таңдаңыз.",
        difference: "🔎 Айырмашылықты тап\n\nЕкі суретті салыстырыңыз.",
        memory: "🧠 Есте сақта\n\nСуреттерді есте сақтап, қайта таңдаңыз.",
        hidden: "🎁 Жасырын суретті аш\n\nЖасырын бөліктерді ашыңыз.",
        balloons: "🎈 Шарларды жина\n\nШарларды басып, жинаңыз."
    };

    alert(games[id] || "Ойын ашылды!");
}


// ==================================================
// ӘР ТАПСЫРМАНЫҢ БАЛЛЫ
// ==================================================

function renderTaskScores() {
    const statistics = document.getElementById("statistics");

    if (!statistics) return;

    let html = `
        <div class="stat-card" style="margin-top:20px">
            <h2>Әр тапсырманың нәтижесі</h2>

            <table>
                <thead>
                    <tr>
                        <th>Тапсырма</th>
                        <th>Балл</th>
                        <th>Нәтиже</th>
                    </tr>
                </thead>
                <tbody>
    `;

    getAllTasks().forEach(task => {
        const score = platformData.scores[task.id];

        html += `
            <tr>
                <td>${task.title}</td>
                <td>${score === undefined ? "–" : score + "/3"}</td>
                <td>
                    ${score === undefined
                        ? "Бағаланбаған"
                        : score === 3
                            ? "Өздігінен орындады"
                            : score === 2
                                ? "Қайталаудан кейін"
                                : score === 1
                                    ? "Көмекпен орындады"
                                    : "Орындай алмады"
                    }
                </td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    statistics.insertAdjacentHTML("beforeend", html);
}


// ==================================================
// БАСТАПҚЫ НӘТИЖЕНІ САҚТАУ
// ==================================================

function saveInitialResults() {
    const results = {};

    Object.keys(sections).forEach(sectionId => {
        results[sectionId] = {
            completed: platformData.completed.filter(id =>
                sections[sectionId].tasks.some(task => task.id === id)
            ).length,
            scores: {}
        };

        sections[sectionId].tasks.forEach(task => {
            results[sectionId].scores[task.id] =
                platformData.scores[task.id] ?? null;
        });
    });

    platformData.initialResults = {
        date: new Date().toLocaleString("kk-KZ"),
        results: results
    };

    saveData();

    alert("Бастапқы нәтиже сақталды!");
}


// ==================================================
// ЭЛЕКТРОНДЫ СӨЙЛЕУ КАРТАСЫ
// ==================================================

const speechCardSections = [
    {
        title: "1. Жеке мәліметтер",
        fields: [
            ["Аты-жөні", "text"],
            ["Жасы", "number"],
            ["Тексеру күні", "date"],
            ["Логопедтің аты-жөні", "text"],
            ["Сөйлеу бұзылысының басталған уақыты", "text"],
            ["Бұрынғы түзету жұмыстары", "textarea"]
        ]
    },
    {
        title: "2. Жалпы бақылау",
        fields: [
            ["Қарым-қатынасқа түсуі", "text"],
            ["Нұсқауды қабылдауы", "text"],
            ["Тапсырмаға қатысуы", "text"],
            ["Шаршағыштығы", "text"],
            ["Қосымша ескертпе", "textarea"]
        ]
    }
];

const speechSkills = {
    "3.1 Сөйлеуді түсіну": [
        "Жеке сөзді түсіну",
        "Сөзді суретпен сәйкестендіру",
        "Қарапайым нұсқауды түсіну",
        "Күрделі нұсқауды түсіну",
        "Сөйлем мағынасын түсіну",
        "Қысқа мәтінді тыңдап түсіну"
    ],

    "3.2 Сөздік қор және атау": [
        "Заттарды атау",
        "Әрекеттерді атау",
        "Суреттен сөз табу",
        "Мағыналық топтау",
        "Сөзді өздігінен еске түсіру"
    ],

    "3.3 Ауызша сөйлеу": [
        "Дыбыс және буын айту",
        "Сөзді қайталау",
        "Сөз тіркесін қайталау",
        "Қарапайым сөйлем құрау",
        "Сурет бойынша сөйлем құрау",
        "Қысқа әңгіме құрау",
        "Диалогке қатысу"
    ],

    "3.4 Қайталап айту": [
        "Дыбысты қайталау",
        "Буындарды қайталау",
        "Сөздерді қайталау",
        "Сөз тіркесін қайталау",
        "Сөйлемді қайталау"
    ],

    "3.5 Оқу": [
        "Әріптерді оқу",
        "Буындарды оқу",
        "Сөздерді оқу",
        "Сөзді суретпен сәйкестендіру",
        "Сөйлем оқу",
        "Мәтінді оқу және түсіну"
    ],

    "3.6 Жазу": [
        "Әріп жазу",
        "Буын жазу",
        "Сөзді көшіру",
        "Диктант жазу",
        "Сурет бойынша сөз жазу",
        "Сөйлем жазу",
        "Қысқа хабарлама жазу"
    ]
};

function renderSpeechCard() {
    const container = document.getElementById("speechCardContainer");

    if (!container) return;

    let html = `
        <h1>«Тілашар» логопедиялық кабинетіне арналған сөйлеу картасы</h1>

        <p>
            Афазиясы бар ересектердің сөйлеу дағдыларын
            бақылау және түзету динамикасын тіркеу.
        </p>

        <div class="warning-box">
            Бағалау шкаласы:
            <br>3 – өздігінен дұрыс орындады
            <br>2 – қайталап ұсынғаннан кейін орындады
            <br>1 – логопед көмегімен орындады
            <br>0 – орындай алмады
            <br><br>
            Бұл шкала афазияның ауырлығын анықтамайды.
        </div>
    `;

    speechCardSections.forEach((section, sectionIndex) => {
        html += `
            <div class="card-section">
                <h2>${section.title}</h2>
        `;

        section.fields.forEach((field, fieldIndex) => {
            const key = `personal_${sectionIndex}_${fieldIndex}`;

            html += `
                <label>${field[0]}</label>
                ${
                    field[1] === "textarea"
                    ? `<textarea id="${key}" rows="3"></textarea>`
                    : `<input id="${key}" type="${field[1]}">`
                }
            `;
        });

        html += `</div>`;
    });

    Object.entries(speechSkills).forEach(([title, skills], index) => {
        html += `
            <div class="card-section">
                <h2>${title}</h2>
        `;

        skills.forEach((skill, skillIndex) => {
            const key = `skill_${index}_${skillIndex}`;

            html += `
                <div class="rating-row">

                    <span>${skill}</span>

                    <select id="${key}">
                        <option value="">Балл</option>
                        <option value="3">3 балл</option>
                        <option value="2">2 балл</option>
                        <option value="1">1 балл</option>
                        <option value="0">0 балл</option>
                    </select>

                </div>

                <textarea
                    id="${key}_note"
                    rows="2"
                    placeholder="Логопедтің ескертпесі..."
                ></textarea>
            `;
        });

        html += `</div>`;
    });

    html += `
        <div class="card-section">
            <h2>4. Қарым-қатынас дағдылары</h2>

            <p>Қарым-қатынас тәсілдерін белгілеңіз:</p>

            <label><input type="checkbox" id="comm_speech"> Ауызша сөйлеу</label>
            <label><input type="checkbox" id="comm_gesture"> Ым-ишара</label>
            <label><input type="checkbox" id="comm_writing"> Жазу</label>
            <label><input type="checkbox" id="comm_picture"> Суреттер мен карточкалар</label>
            <label><input type="checkbox" id="comm_board"> Коммуникативтік тақта</label>

            <textarea id="communicationNote"
                rows="3"
                placeholder="Қосымша ескертпе..."></textarea>
        </div>

        <div class="card-section">
            <h2>5. Қосымша бақылау</h2>

            <label>Дыбыс айтуда қиындық</label>
            <select id="extra_sound">
                <option value="">Таңдаңыз</option>
                <option>Иә</option>
                <option>Жоқ</option>
            </select>

            <label>Сөйлеу қарқынында ерекшелік</label>
            <select id="extra_rate">
                <option value="">Таңдаңыз</option>
                <option>Иә</option>
                <option>Жоқ</option>
            </select>

            <label>Дауыс ерекшеліктері</label>
            <textarea id="extra_voice" rows="2"></textarea>

            <label>Қимылдық қиындықтар</label>
            <textarea id="extra_movement" rows="2"></textarea>

            <label>Тыныс пен сөйлеуді үйлестіру</label>
            <textarea id="extra_breath" rows="2"></textarea>
        </div>

        <div class="card-section">
            <h2>6. Логопед қорытындысы</h2>

            <label>Сақталған дағдылар</label>
            <textarea id="conclusion_saved" rows="3"></textarea>

            <label>Қиындықтар</label>
            <textarea id="conclusion_difficulties" rows="3"></textarea>

            <label>Түзету жұмысының бағыттары</label>
            <textarea id="conclusion_directions" rows="3"></textarea>

            <label>Ұсыныстар</label>
            <textarea id="conclusion_recommendations" rows="3"></textarea>

            <label>Логопедтің аты-жөні</label>
            <input id="conclusion_logoped">

            <label>Күні</label>
            <input id="conclusion_date" type="date">
        </div>

        <div class="card-section">
            <h2>7. Даму динамикасы</h2>

            <p>
                Бастапқы, аралық және қорытынды бақылау нәтижелерін
                салыстыруға арналған бөлім.
            </p>

            <div id="dynamicsResults"></div>

            <label>Динамика туралы қорытынды</label>
            <textarea id="dynamicsConclusion" rows="4"></textarea>

            <label>Келесі сабақтың мақсаты</label>
            <textarea id="nextLessonGoal" rows="3"></textarea>
        </div>

        <button class="primary-btn" onclick="saveSpeechCard()">
            💾 Сөйлеу картасын сақтау
        </button>

        <button class="secondary-btn" onclick="printSpeechCard()">
            🖨️ Басып шығару
        </button>
    `;

    container.innerHTML = html;

    loadSpeechCard();
    renderDynamics();
}


// ==================================================
// СӨЙЛЕУ КАРТАСЫН САҚТАУ
// ==================================================

function saveSpeechCard() {
    const container = document.getElementById("speechCardContainer");

    if (!container) return;

    const fields = container.querySelectorAll("input, textarea, select");

    const card = {};

    fields.forEach(field => {
        if (field.type === "checkbox") {
            card[field.id] = field.checked;
        } else {
            card[field.id] = field.value;
        }
    });

    platformData.speechCard = card;

    saveData();

    alert("Сөйлеу картасы сәтті сақталды!");
}

function loadSpeechCard() {
    const card = platformData.speechCard || {};

    Object.entries(card).forEach(([id, value]) => {
        const field = document.getElementById(id);

        if (!field) return;

        if (field.type === "checkbox") {
            field.checked = value;
        } else {
            field.value = value;
        }
    });
}


// ==================================================
// ДАМУ ДИНАМИКАСЫ
// ==================================================

function renderDynamics() {
    const container = document.getElementById("dynamicsResults");

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Дағды</th>
                    <th>Бастапқы</th>
                    <th>Қазіргі</th>
                </tr>
            </thead>
            <tbody>
    `;

    Object.keys(speechSkills).forEach((title, index) => {
        html += `
            <tr>
                <td>${title}</td>
                <td>
                    <input type="number"
                        min="0" max="3"
                        id="dynamic_initial_${index}">
                </td>
                <td>
                    <input type="number"
                        min="0" max="3"
                        id="dynamic_current_${index}">
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}


// ==================================================
// БАСЫП ШЫҒАРУ
// ==================================================

function printSpeechCard() {
    window.print();
}


// ==================================================
// ПЛАТФОРМАНЫ БАСТАПҚЫ КҮЙГЕ КЕЛТІРУ
// ==================================================

document.addEventListener("DOMContentLoaded", function() {
    updateBonusDisplay();

    const initialPage = document.getElementById("homePage");

    if (initialPage) {
        showPage("homePage");
    }

    if (platformData.bonus >= 100) {
        renderRewards();
    }
});
