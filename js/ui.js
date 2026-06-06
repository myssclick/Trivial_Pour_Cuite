const UI = {
  app: null,
  _screen: null,
  _screenArg: null,

  init() {
    this.app = document.getElementById('app');
  },

  render(html) {
    this.app.innerHTML = `<div class="screen">${html}</div>`;
  },

  // Mémorise l'écran courant pour pouvoir le re-rendre après un changement de langue
  _track(name, arg) {
    this._screen = name;
    this._screenArg = arg ?? null;
  },

  rerender() {
    switch (this._screen) {
      case 'setup':    this.showSetup();                    break;
      case 'turn':     this.showPlayerTurn();               break;
      case 'question': this.showQuestion(this._screenArg); break;
      case 'decision': this.showDecision(this._screenArg); break;
      case 'drink':    this.showDrink(this._screenArg);    break;
      case 'bank':     this.showBank(this._screenArg);     break;
      case 'scores':   this.showScores();                  break;
    }
  },

  // ── Écran 1 : Configuration ──────────────────────────────────────────────
  showSetup() {
    this._track('setup');
    const t = k => I18n.t(k);
    this.render(`
      <div class="logo-area">
        <div class="logo">🍺</div>
        <h1>Trivial<br>pour Cuite</h1>
        <p class="tagline">${t('tagline')}</p>
      </div>

      <div class="form-section">
        <div class="form-label">${t('playerCountLabel')}</div>
        <div class="player-count-row">
          ${[2, 3, 4, 5, 6, 7, 8].map(n =>
            `<button class="count-btn ${n === 2 ? 'active' : ''}" data-action="set-count" data-value="${n}">${n}</button>`
          ).join('')}
        </div>

        <div id="player-inputs">
          ${[1, 2].map(i => `
            <input class="player-input" placeholder="${t('playerPlaceholder')} ${i}" data-player="${i}" maxlength="16" autocomplete="off" />
          `).join('')}
        </div>

        <button class="btn btn-primary" data-action="start">${t('startBtn')}</button>
      </div>
    `);
  },

  // ── Écran 2 : Tour du joueur ─────────────────────────────────────────────
  showPlayerTurn() {
    this._track('turn');
    const t = k => I18n.t(k);
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="turn-screen">
        <p class="turn-label">${t('turnLabel')}</p>
        <div class="turn-player-name">${this._escape(player.name)}</div>
        <button class="btn btn-primary btn-large" data-action="draw">
          ${t('drawBtn')}
        </button>
        <button class="btn btn-ghost" data-action="show-scores">
          ${t('scoresBtn')}
        </button>
        <button class="btn btn-ghost btn-menu" data-action="back-to-menu">
          ${t('menuBtn')}
        </button>
      </div>
    `);
  },

  // ── Écran 3 : Question ───────────────────────────────────────────────────
  showQuestion(question) {
    this._track('question', question);
    const t = k => I18n.t(k);
    const streak = Game.state.currentStreak;
    const diffLabel = ['', t('diffLabel1'), t('diffLabel2'), t('diffLabel3')][question.difficulty];
    const diffClass = ['', 'badge-easy', 'badge-medium', 'badge-hard'][question.difficulty];

    const streakBanner = streak > 0 ? `
      <div class="streak-banner">
        ⚡ <strong>${I18n.sip(streak)}</strong> ${streak > 1 ? t('streakAccumN') : t('streakAccum1')} —
        ${t('streakIfFail')} <strong>${streak} ${t('streakPlus')}</strong>
      </div>` : '';

    this.render(`
      ${streakBanner}
      <div class="question-meta">
        <span class="badge badge-category">${this._escape(I18n.category(question.category))}</span>
        <span class="badge ${diffClass}">${diffLabel}</span>
      </div>

      <div class="question-card">
        <div class="question-text">${this._escape(question.question)}</div>
      </div>

      <div id="answer-zone">
        <button class="btn btn-primary" data-action="reveal">
          ${t('revealBtn')}
        </button>
      </div>
    `);
  },

  revealAnswer(question) {
    const t = k => I18n.t(k);
    document.getElementById('answer-zone').innerHTML = `
      <div class="answer-reveal">
        ✅ ${this._escape(question.answer)}
      </div>
      <div class="verdict-buttons">
        <button class="btn btn-success" data-action="correct">${t('correctBtn')}</button>
        <button class="btn btn-danger"  data-action="wrong">${t('wrongBtn')}</button>
      </div>
    `;
  },

  // ── Écran 5a : Bonne réponse — décision ──────────────────────────────────
  showDecision(totalStreak) {
    this._track('decision', totalStreak);
    const t = k => I18n.t(k);
    const player = Game.getCurrentPlayer();

    this.render(`
      <div class="result-screen">
        <div class="result-icon">🎉</div>
        <h2>${t('bravo')} ${this._escape(player.name)} !</h2>

        <div class="streak-display">${totalStreak}</div>
        <div class="streak-label">${I18n.sip(totalStreak)} ${totalStreak > 1 ? t('streakAccumN') : t('streakAccum1')}</div>

        <div class="decision-section">
          <p class="decision-hint">${t('whatToDo')}</p>

          <button class="btn btn-gold" data-action="bank">
            ${t('bankBtn')}
            <small>${I18n.sip(totalStreak)} ${t('toGive')}</small>
          </button>

          <button class="btn btn-risk" data-action="continue">
            ${t('continueBtn')}
            <small>${t('risk')} ${I18n.sip(totalStreak)}</small>
          </button>
        </div>
      </div>
    `);
  },

  // ── Écran 5b : Mauvaise réponse — boire ──────────────────────────────────
  showDrink(amount) {
    this._track('drink', amount);
    const t = k => I18n.t(k);
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="result-screen drink-screen">
        <div class="result-icon">💀</div>
        <h2>${t('missed')}</h2>
        <p class="drink-subtitle">${this._escape(player.name)} ${t('mustDrink')}</p>
        <div class="drink-number">${amount}</div>
        <div class="drink-label">${amount > 1 ? t('sipN') : t('sip1')}</div>

        <button class="btn btn-primary" data-action="next-player">
          ${t('nextBtn')}
        </button>
      </div>
    `);
  },

  // ── Écran 5c : Distribution confirmée ────────────────────────────────────
  showBank(amount) {
    this._track('bank', amount);
    const t = k => I18n.t(k);
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="result-screen bank-screen">
        <div class="result-icon">🥂</div>
        <h2>${t('distributed')}</h2>
        <p>${this._escape(player.name)} ${t('distributes')}</p>
        <div class="drink-number gold">${amount}</div>
        <div class="drink-label">${amount > 1 ? t('sipN') : t('sip1')}</div>
        <p class="bank-hint">${t('toWhom')}</p>

        <button class="btn btn-primary" data-action="next-player">
          ${t('nextBtn')}
        </button>
      </div>
    `);
  },

  // ── Tableau des scores ────────────────────────────────────────────────────
  showScores() {
    this._track('scores');
    const t = k => I18n.t(k);
    const rows = Game.state.players.map(p => `
      <tr>
        <td class="score-name">${this._escape(p.name)}</td>
        <td class="score-given">${p.given} 💧</td>
        <td class="score-drunk">${p.drunk} 🍺</td>
      </tr>
    `).join('');

    this.render(`
      <h2>${t('scoresTitle')}</h2>
      <p class="tagline">${t('scoresSince')}</p>

      <table class="score-table">
        <thead>
          <tr>
            <th>${t('scoresPlayer')}</th>
            <th>${t('scoresGiven')}</th>
            <th>${t('scoresDrunk')}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <button class="btn btn-primary" data-action="back-to-turn">
        ${t('backBtn')}
      </button>
    `);
  },

  // ── Modal de confirmation retour au menu ─────────────────────────────────
  showBackModal() {
    if (document.getElementById('modal-overlay')) return;
    const t = k => I18n.t(k);
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-icon">⚠️</div>
        <p class="modal-title">${t('modalTitle')}</p>
        <p class="modal-text">${t('modalText')}</p>
        <button class="btn btn-danger" data-action="confirm-menu">${t('confirmBtn')}</button>
        <button class="btn btn-ghost" data-action="close-modal">${t('cancelBtn')}</button>
      </div>
    `;
    this.app.appendChild(overlay);
  },

  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.remove();
  },

  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },
};
