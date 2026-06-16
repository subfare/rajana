let current = 0;
let ambientStarted = false;

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

/* typing intro */
const introText = "hei rajana";
let introIndex = 0;

function typeIntro() {
  const el = document.getElementById("typeText");

  if (introIndex < introText.length) {
    el.innerHTML += introText[introIndex];
    introIndex++;
    setTimeout(typeIntro, 120);
  }
}

/* navigation */
function goFail() {
  show("fail");
}

function restart() {
  introIndex = 0;
  document.getElementById("typeText").innerHTML = "";
  show("intro");
  typeIntro();
}

function goLove() {
  show("love");
}

function goLetters() {
  show("letters");
  loadLetter(0);
  spawnAmbient();
}

/* letters */
const letters = [
  `#1\n\nfør jeg møtte deg trodde jeg egentlig at jeg hadde null interesse i å slippe nye folk inn i mitt liv på den måten, jeg var ikke helt klar over hva jeg ville og jeg stolte ikke på nye folk som kunne påvirket meg på noe som helst måte`,
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
  `Brev 12\n\nfiller 1.`
  `Brev 13\n\nfiller 2.`
];

function loadLetter(index) {
  current = index;

  document.getElementById("letterTitle").innerText = `brev ${index + 1}`;
  document.getElementById("letterText").innerText = letters[index];

  document.getElementById("nextBtn").innerText =
    index === letters.length - 1 ? "Så, hva prøver du å si?" : "Neste →";
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

  el.innerHTML = "";

  let finalIndex = 0;

  function type() {
    if (finalIndex < text.length) {
      el.innerHTML += text[finalIndex];
      finalIndex++;
      setTimeout(type, 150);
    }
  }

  type();
}

/* ambient forever system */
function spawnAmbient() {
  if (ambientStarted) return;
  ambientStarted = true;

  const emojis = ["💖", "🌸", "💗", "✨"];

  setInterval(() => {
    const el = document.createElement("div");
    el.className = "float";

    el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = (18 + Math.random() * 30) + "px";
    el.style.opacity = 0.6 + Math.random() * 0.4;
    el.style.animationDuration = (10 + Math.random() * 15) + "s";
    el.style.fontFamily = '"Kalam", cursive';

    document.getElementById("bg-effects").appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 40000);
  }, 350);
}

/* init */
window.onload = () => {
  document.body.style.fontFamily = '"Kalam", cursive';
  typeIntro();
};
