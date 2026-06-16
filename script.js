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
  `#3\n\nå være rundt deg føes ut som å være rundt noen som jeg merker at bryr seg om ting jeg har interesse, ting jeg gjør eller bare ting jeg sier, noen som prøver å være observant og noen som tar de tiltakene ingen andre har ville tatt for meg før deg

du er noen jeg har lyst å alltid kunne være rundt og med, og du er noen jeg har klart å gro meg nærmere med og noen jeg har lært meg å kunne like på absolutt alle ulike måter`,
  `#4\n\nfor meg så er du ikke bare en 'noen', men du er en veldig spesiel noen - du er den noen som jeg vil tilbringe hele dagen min med og den noen som jeg tørr å spise rundt uten å  måtte tenke to ganger - du er også den noen som viser meg at det ikke er farlig å være den personen jeg har lyst å være og den personen jeg har lyst å vokse til å bli, og ha noen rundt meg som ikke har ett problem med det er noen jeg trenger i livet mitt.`,
  `#5\n\nnår jeg tenger på framtide min så er du en av de første jeg ser for meg og jeg kommer aldri til å forvente at alt kommer til å være perfekt men heller fordi jeg vet at livet kommer til å bli mye lettere når jeg for dele det med deg`,
  `#6\n\nden personen jeg er nå og har lust å bli trenger en som deg i sitt liv rajana, noen som viser at de kan være sårbar men samtidig noen som viser at de er mentalt strekt og det er det jeg ser i deg`,
  `#7\n\ndu er noen som har vært igjennom mye og noen som bærer må masse man ikke skal bære på - selvom jeg ikke bærer på det samme så kan jeg føle deg, jeg kan forstå dine problemer og jeg kan være her for deg under de problemene `,
  `#8\n\nvi, som to, skal jobbe sammen igjennom de problemene og hindringene som har oppstått og de som kommer til å oppstå, og det kommer til å bli hindringer jeg vet både du og meg kan komme oss igjennom hvis vi begge vil det.`,
  `#9\n\nså takk for at du er den du er, det er nettop det som gjør deg til den rajana jeg har møtt og lært meg å elske. jeg elsker deg. ikke bare hvem du er men hvordan du puster på, hvordan du snakker og hvordan du ser på meg, hvordan øynene dine lyser opp når vi ser på hverandre og hvordan fregnene dine ser ut, de er perfekt plassert men du ser det ikke selv.`,
  `#10\n\ndu er perfekt, og det er akkurat derfor jeg føler meg tiltrukket til deg fordi hadde jeg kunne endret noe i livet så hadde ingenting vært om hvem du er eller hvordan du ser ut, men heller vår status

vi er ikke sammen, og det er noe jeg har vært redd for lenge - jeg kan ikke forklare hvorfor men jeg er bare redd. jeg er redd for alt og alle men du, du bare gir meg en trygghet`,
  `#11\n\ndu er noen jeg stoler på rajana og du er noen som har gått fra å ikke bli invitert på tiktok danse-vidoen på lea sin bursdag til en av de viktigste personene som noen gang har vært involvert i mitt liv og jeg kan ikke love deg at jeg alltid kommer til å si de riktige tingene eller gjøre alt riktig men jeg kan love deg at  jeg alltid kommer til å velge deg, lytte til deg, støtte deg og alltid kjempe for oss, det er det  kjærlighet betyr for meg`
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
  const text = "jeg elsker deg så mye, og vil at du skal være min";
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
