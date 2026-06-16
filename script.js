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
  `#2\n\ndu har vist meg at dette var feil måte å tenke på, du  har fått meg til å glede meg til de små tingene igjen som for eksempel bare kan være å sitte ved sidenav deg eller sitte å høre på deg snakke - du er den som har gjort hverdagen min lettere uten at du engang trenger å prøve alltid. du har klart å vise meg noe ingen andre har klart på en helt unik måte og det er trygghet`,
  `Brev 3\n\nå være rundt deg føes ut som å være rundt noen som jeg merker at bryr seg om ting jeg har interesse, ting jeg gjør eller bare ting jeg sier, noen som prøver å være observant og noen som tar de tiltakene ingen andre har ville tatt for meg før deg

du er noen jeg har lyst å alltid kunne være rundt og med, og du er noen jeg har klart å gro meg nærmere med og noen jeg har lært meg å kunne like på absolutt alle ulike måter`,
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

  document.getElementById("letterTitle").innerText = `brev ${index + 1}`;
  document.getElementById("letterText").innerText = letters[index];

  document.getElementById("nextBtn").innerText =
    index === letters.length - 1 ? "sååååå, hva prøver du å si?" : "neste →";
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
