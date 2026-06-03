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
  spawnAmbient();
  spawnConfettiOnce();
}

/* letters */
const letters = [
`Brev 1\n\nDette er starten på alt.`,

`Brev 2\n\nJeg vet ikke helt hvordan jeg skal si dette.`,

`Brev 3\n\nMen jeg liker deg mer enn jeg burde.`,

`Brev 4\n\nNoe med deg føles riktig.`,

`Brev 5\n\nJeg tenker på deg ofte.`,

`Brev 6\n\nLitt for ofte.`,

`Brev 7\n\nMen jeg vil ikke stoppe.`,

`Brev 8\n\nDu gjør alt bedre.`,

`Brev 9\n\nSelv vanlige dager.`,

`Brev 10\n\nJeg forstår mer nå.`,

`Brev 11\n\nOg jeg vil ikke miste dette.`
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

/* FINAL */
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

/* ambient floating hearts/flowers */
function spawnAmbient() {
  const emojis = ["💖", "🌸", "✨"];

  for (let i = 0; i < 45; i++) {
    const el = document.createElement("div");
    el.className = "float";

    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = (18 + Math.random() * 24) + "px";
    el.style.animationDuration = (8 + Math.random() * 10) + "s";

    document.getElementById("bg-effects").appendChild(el);

    setTimeout(() => el.remove(), 30000);
  }
}

/* confetti ONCE */
let confettiDone = false;

function spawnConfettiOnce() {
  if (confettiDone) return;
  confettiDone = true;

  for (let i = 0; i < 40; i++) {
    const el = document.createElement("div");
    el.className = "float";
    el.innerHTML = "💖";

    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = (18 + Math.random() * 20) + "px";

    document.getElementById("bg-effects").appendChild(el);

    setTimeout(() => el.remove(), 15000);
  }
}

/* typing intro */
window.onload = () => {
  typeIntro();

  const saved = localStorage.getItem("letterIndex");
  if (saved) current = parseInt(saved);
};
