// ── Initialisation ───────────────────────────────────────────────────────────
UI.init();
I18n.set(I18n.lang);
mountLangPicker();

let playerList = [];

UI.onSetupRender = updatePlayerListUI;
UI.showSetup();

// ── Délégation d'événements — clic ───────────────────────────────────────────
document.getElementById('app').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {
    case 'add-player':    handleAddPlayer();               break;
    case 'remove-player': handleRemovePlayer(parseInt(value)); break;
    case 'start':         handleStart();                   break;
    case 'draw':          handleDraw();                    break;
    case 'reveal':        handleReveal();                  break;
    case 'correct':       handleCorrect();                 break;
    case 'wrong':         handleWrong();                   break;
    case 'bank':          handleBank();                    break;
    case 'continue':      handleDraw();                    break;
    case 'next-player':   Game.nextPlayer(); UI.showPlayerTurn(); break;
    case 'show-scores':   UI.showScores();                 break;
    case 'back-to-turn':  UI.showPlayerTurn();             break;
    case 'back-to-menu':  UI.showBackModal();              break;
    case 'confirm-menu':  playerList = []; UI.hideModal(); UI.showSetup(); break;
    case 'close-modal':   UI.hideModal();                  break;
  }
});

// ── Délégation d'événements — touche Entrée sur le champ joueur ──────────────
document.getElementById('app').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'new-player-input') {
    e.preventDefault();
    handleAddPlayer();
  }
});

// ── Handlers setup ────────────────────────────────────────────────────────────
function handleAddPlayer() {
  const input = document.getElementById('new-player-input');
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    input.classList.add('input-error');
    shakeElement(input);
    return;
  }
  playerList.push(name);
  input.value = '';
  input.classList.remove('input-error');
  updatePlayerListUI();
  input.focus();
}

function handleRemovePlayer(index) {
  playerList.splice(index, 1);
  updatePlayerListUI();
}

function updatePlayerListUI() {
  const listEl   = document.getElementById('player-list');
  const startBtn = document.getElementById('start-btn');
  const hint     = document.getElementById('min-players-hint');
  if (!listEl) return;

  listEl.innerHTML = playerList.map((name, i) => `
    <div class="player-chip">
      <span class="player-chip-num">${i + 1}</span>
      <span class="player-chip-name">${UI._escape(name)}</span>
      <button class="player-chip-remove" data-action="remove-player" data-value="${i}" aria-label="Supprimer">✕</button>
    </div>
  `).join('');

  const canStart = playerList.length >= 2;
  if (startBtn) startBtn.hidden = !canStart;
  if (hint)     hint.hidden     = canStart;
}

function handleStart() {
  if (playerList.length < 2) return;
  Game.init([...playerList]);
  playerList = [];
  UI.showPlayerTurn();
}

// ── Handlers jeu ──────────────────────────────────────────────────────────────
function handleDraw() {
  const question = Game.getQuestion();
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

// ── Sélecteur de langue ───────────────────────────────────────────────────────
function mountLangPicker() {
  const picker = document.createElement('div');
  picker.id = 'lang-picker';
  picker.innerHTML = `
    <button id="lang-toggle" title="Change language" aria-label="Change language">
      ${I18n.flag()}
    </button>
    <div id="lang-dropdown" class="lang-dropdown" hidden>
      <button class="lang-option" data-lang="fr">🇫🇷 Français</button>
      <button class="lang-option" data-lang="en">🇬🇧 English</button>
      <button class="lang-option" data-lang="es">🇪🇸 Español</button>
    </div>
  `;
  document.body.appendChild(picker);

  const toggle   = document.getElementById('lang-toggle');
  const dropdown = document.getElementById('lang-dropdown');

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = !dropdown.hidden;
    dropdown.hidden = isOpen;
    toggle.classList.toggle('open', !isOpen);
  });

  document.addEventListener('click', () => {
    dropdown.hidden = true;
    toggle.classList.remove('open');
  });

  dropdown.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    e.stopPropagation();
    I18n.set(btn.dataset.lang);
    toggle.textContent = I18n.flag();
    dropdown.hidden = true;
    toggle.classList.remove('open');
    document.querySelectorAll('.lang-option').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === I18n.lang);
    });
    UI.rerender();
  });

  document.querySelectorAll('.lang-option').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === I18n.lang);
  });
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

document.getElementById('app').addEventListener('input', e => {
  if (e.target.id === 'new-player-input') {
    e.target.classList.remove('input-error');
  }
});
