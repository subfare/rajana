let current = 0;

const screens = {
  intro: document.getElementById("intro"),
  fail: document.getElementById("fail"),
  love: document.getElementById("love"),
  letters: document.getElementById("letters"),
  final: document.getElementById("final"),
};

function show(screen) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[screen].classList.add("active");
}

/* INTRO typing */
const introText = "Hei Rajana";
let i = 0;

function typeIntro() {
  const el = document.getElementById("typeText");
  if (i < introText.length) {
    el.innerHTML += introText[i];
    i++;
    setTimeout(typeIntro, 120);
  }
}

/* navigation */
function goFail() {
  show("fail");
}

function restart() {
  show("intro");
}

function goLove() {
  show("love");
}

function goLetters() {
  show("letters");
  loadLetter(0);
  spawnConfetti();
}

/* letters */
const letters = [
`Brev 1\n\nDette er starten på alt.`,

`Brev 2\n\nJeg vet ikke helt hvordan jeg skal si dette.`,

`Brev 3\n\nMen jeg liker deg mer enn jeg burde.`,
  
`Brev 4\n\nNoe med deg føles bare riktig.`,

`Brev 5\n\nJeg tenker på deg ofte.`,

`Brev 6\n\nLitt for ofte kanskje.`,

`Brev 7\n\nMen det er ikke noe jeg vil stoppe.`,

`Brev 8\n\nDu gjør alt litt bedre.`,

`Brev 9\n\nSelv vanlige dager.`,

`Brev 10\n\nJeg begynner å forstå hva dette er.`,

`Brev 11\n\nOg jeg vil ikke miste det.`
];

function loadLetter(index) {
  current = index;

  document.getElementById("letterTitle").innerText = `Brev ${index + 1}`;
  document.getElementById("letterText").innerText = letters[index];

  document.getElementById("nextBtn").innerText =
    index === letters.length - 1 ? "Så, hva prøver du å si?" : "Neste →";

  localStorage.setItem("letterIndex", index);
}

function nextLetter() {
  if (current < letters.length - 1) {
    loadLetter(current + 1);
  } else {
    show("final");
    typeFinal();
  }
}

function prevLetter() {
  if (current > 0) {
    loadLetter(current - 1);
  }
}

/* final */
function typeFinal() {
  const text = "Vel...";
  const el = document.getElementById("finalText");
  let i = 0;

  function type() {
    if (i < text.length) {
      el.innerHTML += text[i];
      i++;
      setTimeout(type, 150);
    }
  }

  type();
}

/* confetti (simple version) */
function spawnConfetti() {
  for (let i = 0; i < 40; i++) {
    const el = document.createElement("div");
    el.className = "float";
    el.innerHTML = "💖";
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 3 + Math.random() * 3 + "s";
    document.getElementById("bg-effects").appendChild(el);

    setTimeout(() => el.remove(), 6000);
  }
}

/* URL params */
const params = new URLSearchParams(window.location.search);

if (params.get("hearts")) spawnConfetti();
if (params.get("love")) document.body.style.filter = "hue-rotate(10deg)";

/* init */
window.onload = () => {
  typeIntro();

  const saved = localStorage.getItem("letterIndex");
  if (saved) current = parseInt(saved);
};
