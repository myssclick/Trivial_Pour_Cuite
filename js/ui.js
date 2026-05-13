const UI = {
  app: null,

  init() {
    this.app = document.getElementById('app');
  },

  render(html) {
    this.app.innerHTML = `<div class="screen">${html}</div>`;
  },

  // ── Écran 1 : Configuration ──────────────────────────────────────────────
  showSetup() {
    this.render(`
      <div class="logo-area">
        <div class="logo">🍺</div>
        <h1>Trivial<br>pour Cuite</h1>
        <p class="tagline">Le jeu de soirée sans filtre</p>
      </div>

      <div class="form-section">
        <div class="form-label">Nombre de joueurs</div>
        <div class="player-count-row">
          ${[2, 3, 4, 5, 6, 7, 8].map(n =>
            `<button class="count-btn ${n === 2 ? 'active' : ''}" data-action="set-count" data-value="${n}">${n}</button>`
          ).join('')}
        </div>

        <div id="player-inputs">
          ${[1, 2].map(i => `
            <input class="player-input" placeholder="Joueur ${i}" data-player="${i}" maxlength="16" autocomplete="off" />
          `).join('')}
        </div>

        <button class="btn btn-primary" data-action="start">C'est parti ! 🎉</button>
      </div>
    `);
  },

  // ── Écran 2 : Tour du joueur ─────────────────────────────────────────────
  showPlayerTurn() {
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="turn-screen">
        <p class="turn-label">C'est le tour de</p>
        <div class="turn-player-name">${this._escape(player.name)}</div>
        <button class="btn btn-primary btn-large" data-action="draw">
          🎲 Tirer une carte
        </button>
        <button class="btn btn-ghost" data-action="show-scores">
          📊 Tableau des scores
        </button>
        <button class="btn btn-ghost btn-menu" data-action="back-to-menu">
          🏠 Retour au menu
        </button>
      </div>
    `);
  },

  // ── Écran 3 : Choix de la difficulté ────────────────────────────────────
  showDifficulty() {
    const streak = Game.state.currentStreak;
    const streakBanner = streak > 0 ? `
      <div class="streak-banner">
        ⚡ <strong>${streak} gorgée${streak > 1 ? 's' : ''}</strong> accumulée${streak > 1 ? 's' : ''} —
        si tu rates, tu bois <strong>${streak} + la valeur de la question</strong>
      </div>` : '';

    this.render(`
      ${streakBanner}
      <p class="difficulty-intro">Choisissez la difficulté</p>

      <div class="difficulty-grid">
        <button class="diff-card easy" data-action="select-difficulty" data-value="1">
          <span class="diff-icon">🟡</span>
          <span class="diff-name">Facile</span>
          <span class="diff-points">${streak > 0 ? `En jeu : ${streak + 1} gorgée${streak + 1 > 1 ? 's' : ''}` : '1 gorgée'}</span>
        </button>
        <button class="diff-card medium" data-action="select-difficulty" data-value="2">
          <span class="diff-icon">🟠</span>
          <span class="diff-name">Moyen</span>
          <span class="diff-points">${streak > 0 ? `En jeu : ${streak + 2} gorgées` : '2 gorgées'}</span>
        </button>
        <button class="diff-card hard" data-action="select-difficulty" data-value="3">
          <span class="diff-icon">🔴</span>
          <span class="diff-name">Difficile</span>
          <span class="diff-points">${streak > 0 ? `En jeu : ${streak + 3} gorgées` : '3 gorgées'}</span>
        </button>
      </div>
    `);
  },

  // ── Écran 4 : Question ───────────────────────────────────────────────────
  showQuestion(question) {
    const diffLabel = ['', 'Facile • 1 gorgée', 'Moyen • 2 gorgées', 'Difficile • 3 gorgées'][question.difficulty];
    const diffClass = ['', 'badge-easy', 'badge-medium', 'badge-hard'][question.difficulty];

    this.render(`
      <div class="question-meta">
        <span class="badge badge-category">${this._escape(question.category)}</span>
        <span class="badge ${diffClass}">${diffLabel}</span>
      </div>

      <div class="question-card">
        <div class="question-text">${this._escape(question.question)}</div>
      </div>

      <div id="answer-zone">
        <button class="btn btn-primary" data-action="reveal">
          👁 Révéler la réponse
        </button>
      </div>
    `);
  },

  revealAnswer(question) {
    document.getElementById('answer-zone').innerHTML = `
      <div class="answer-reveal">
        ✅ ${this._escape(question.answer)}
      </div>
      <div class="verdict-buttons">
        <button class="btn btn-success" data-action="correct">✓ Bonne réponse</button>
        <button class="btn btn-danger"  data-action="wrong">✗ Mauvaise réponse</button>
      </div>
    `;
  },

  // ── Écran 5a : Bonne réponse — décision ──────────────────────────────────
  showDecision(totalStreak) {
    const player = Game.getCurrentPlayer();
    const g = n => `${n} gorgée${n > 1 ? 's' : ''}`;

    this.render(`
      <div class="result-screen">
        <div class="result-icon">🎉</div>
        <h2>Bravo ${this._escape(player.name)} !</h2>

        <div class="streak-display">${totalStreak}</div>
        <div class="streak-label">gorgée${totalStreak > 1 ? 's' : ''} accumulée${totalStreak > 1 ? 's' : ''}</div>

        <div class="decision-section">
          <p class="decision-hint">Que veux-tu faire ?</p>

          <button class="btn btn-gold" data-action="bank">
            💧 Distribuer et passer
            <small>${g(totalStreak)} à donner</small>
          </button>

          <button class="btn btn-risk" data-action="continue">
            🎲 Tout miser pour plus !
            <small>Risquer ${g(totalStreak)}</small>
          </button>
        </div>
      </div>
    `);
  },

  // ── Écran 5b : Mauvaise réponse — boire ──────────────────────────────────
  showDrink(amount) {
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="result-screen drink-screen">
        <div class="result-icon">💀</div>
        <h2>Raté !</h2>
        <p class="drink-subtitle">${this._escape(player.name)} doit boire</p>
        <div class="drink-number">${amount}</div>
        <div class="drink-label">gorgée${amount > 1 ? 's' : ''}</div>

        <button class="btn btn-primary" data-action="next-player">
          Au suivant →
        </button>
      </div>
    `);
  },

  // ── Écran 5c : Distribution confirmée ────────────────────────────────────
  showBank(amount) {
    const player = Game.getCurrentPlayer();
    this.render(`
      <div class="result-screen bank-screen">
        <div class="result-icon">🥂</div>
        <h2>Distribué !</h2>
        <p>${this._escape(player.name)} distribue</p>
        <div class="drink-number gold">${amount}</div>
        <div class="drink-label">gorgée${amount > 1 ? 's' : ''}</div>
        <p class="bank-hint">À qui tu veux !</p>

        <button class="btn btn-primary" data-action="next-player">
          Au suivant →
        </button>
      </div>
    `);
  },

  // ── Tableau des scores ────────────────────────────────────────────────────
  showScores() {
    const rows = Game.state.players.map(p => `
      <tr>
        <td class="score-name">${this._escape(p.name)}</td>
        <td class="score-given">${p.given} 💧</td>
        <td class="score-drunk">${p.drunk} 🍺</td>
      </tr>
    `).join('');

    this.render(`
      <h2>📊 Tableau des scores</h2>
      <p class="tagline">Depuis le début de la partie</p>

      <table class="score-table">
        <thead>
          <tr>
            <th>Joueur</th>
            <th>Données 💧</th>
            <th>Bues 🍺</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <button class="btn btn-primary" data-action="back-to-turn">
        ← Retour au jeu
      </button>
    `);
  },

  // ── Modal de confirmation retour au menu ─────────────────────────────────
  showBackModal() {
    if (document.getElementById('modal-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-icon">⚠️</div>
        <p class="modal-title">Retour au menu</p>
        <p class="modal-text">Les scores seront réinitialisés. Continuer ?</p>
        <button class="btn btn-danger" data-action="confirm-menu">Oui, quitter</button>
        <button class="btn btn-ghost" data-action="close-modal">Annuler</button>
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
