// ── Initialisation ───────────────────────────────────────────────────────────
UI.init();
UI.showSetup();

let selectedCount = 2;

// ── Délégation d'événements ───────────────────────────────────────────────────
document.getElementById('app').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {
    case 'set-count':      handleSetCount(parseInt(value)); break;
    case 'start':          handleStart();                   break;
    case 'draw':           UI.showDifficulty();             break;
    case 'select-difficulty': handleSelectDifficulty(parseInt(value)); break;
    case 'reveal':         handleReveal();                  break;
    case 'correct':        handleCorrect();                 break;
    case 'wrong':          handleWrong();                   break;
    case 'bank':           handleBank();                    break;
    case 'continue':       UI.showDifficulty();             break;
    case 'next-player':    Game.nextPlayer(); UI.showPlayerTurn(); break;
    case 'show-scores':    UI.showScores();                 break;
    case 'back-to-turn':   UI.showPlayerTurn();             break;
    case 'back-to-menu':   UI.showBackModal();              break;
    case 'confirm-menu':   UI.hideModal(); UI.showSetup();  break;
    case 'close-modal':    UI.hideModal();                  break;
  }
});

// ── Handlers ──────────────────────────────────────────────────────────────────
function handleSetCount(count) {
  selectedCount = count;

  // Met à jour le bouton actif
  document.querySelectorAll('.count-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.value) === count);
  });

  // Recrée les champs de noms
  const container = document.getElementById('player-inputs');
  container.innerHTML = Array.from({ length: count }, (_, i) => `
    <input class="player-input" placeholder="Joueur ${i + 1}" data-player="${i + 1}" maxlength="16" autocomplete="off" />
  `).join('');
}

function handleStart() {
  const inputs = document.querySelectorAll('.player-input');
  const names = [];

  for (const input of inputs) {
    const name = input.value.trim();
    if (!name) {
      input.classList.add('input-error');
      input.focus();
      shakeElement(input);
      return;
    }
    names.push(name);
  }

  Game.init(names);
  UI.showPlayerTurn();
}

function handleSelectDifficulty(difficulty) {
  const question = Game.getQuestion(difficulty);
  UI.showQuestion(question);
}

function handleReveal() {
  UI.revealAnswer(Game.state.currentQuestion);
}

function handleCorrect() {
  const total = Game.answerCorrect();
  UI.showDecision(total);
}

function handleWrong() {
  const amount = Game.answerWrong();
  UI.showDrink(amount);
}

function handleBank() {
  const amount = Game.bank();
  UI.showBank(amount);
}

// ── Utilitaires ───────────────────────────────────────────────────────────────
function shakeElement(el) {
  el.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(0)' },
    ],
    { duration: 350, easing: 'ease-in-out' }
  );
}

// Retire la classe d'erreur dès que l'utilisateur tape dans un champ
document.getElementById('app').addEventListener('input', e => {
  if (e.target.classList.contains('player-input')) {
    e.target.classList.remove('input-error');
  }
});
