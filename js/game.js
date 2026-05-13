const Game = {
  state: {
    players: [],              // [{ name, given, drunk }]
    currentPlayerIndex: 0,
    currentStreak: 0,         // gorgées accumulées ce tour
    currentQuestion: null,
    usedQuestionIds: new Set(),
  },

  init(playerNames) {
    this.state.players = playerNames.map(name => ({ name, given: 0, drunk: 0 }));
    this.state.currentPlayerIndex = 0;
    this.state.currentStreak = 0;
    this.state.currentQuestion = null;
    this.state.usedQuestionIds = new Set();
  },

  getCurrentPlayer() {
    return this.state.players[this.state.currentPlayerIndex];
  },

  getQuestion(difficulty) {
    const pool = QUESTIONS.filter(
      q => q.difficulty === difficulty && !this.state.usedQuestionIds.has(q.id)
    );
    // Si toutes les questions de cette difficulté ont déjà été posées, on réinitialise
    if (pool.length === 0) {
      QUESTIONS
        .filter(q => q.difficulty === difficulty)
        .forEach(q => this.state.usedQuestionIds.delete(q.id));
      return this.getQuestion(difficulty);
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    this.state.usedQuestionIds.add(q.id);
    this.state.currentQuestion = q;
    return q;
  },

  // Appelé quand la réponse est bonne — renvoie le nouveau total accumulé
  answerCorrect() {
    this.state.currentStreak += this.state.currentQuestion.difficulty;
    return this.state.currentStreak;
  },

  // Le joueur décide de distribuer ses points — renvoie le total distribué
  bank() {
    const amount = this.state.currentStreak;
    this.getCurrentPlayer().given += amount;
    this.state.currentStreak = 0;
    this.state.currentQuestion = null;
    return amount;
  },

  // Appelé quand la réponse est mauvaise — renvoie le nombre de gorgées à boire
  answerWrong() {
    // Toujours : streak accumulé + valeur de la question ratée
    const drinkAmount = this.state.currentStreak + this.state.currentQuestion.difficulty;
    this.getCurrentPlayer().drunk += drinkAmount;
    this.state.currentStreak = 0;
    this.state.currentQuestion = null;
    return drinkAmount;
  },

  // Appelé quand le joueur clique "Au suivant" après le résultat
  nextPlayer() {
    this.state.currentPlayerIndex =
      (this.state.currentPlayerIndex + 1) % this.state.players.length;
  },
};
