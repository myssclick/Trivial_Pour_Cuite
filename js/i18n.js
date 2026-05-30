const TRANSLATIONS = {
  fr: {
    // Setup
    tagline:          "Le jeu de soirée sans filtre",
    playerCountLabel: "Nombre de joueurs",
    playerPlaceholder:"Joueur",
    startBtn:         "C'est parti ! 🎉",
    // Tour
    turnLabel:   "C'est le tour de",
    drawBtn:     "🎲 Tirer une carte",
    scoresBtn:   "📊 Tableau des scores",
    menuBtn:     "🏠 Retour au menu",
    // Difficulté
    chooseDiff:  "Choisissez la difficulté",
    inPlay:      "En jeu :",
    diffEasy:    "Facile",
    diffMedium:  "Moyen",
    diffHard:    "Difficile",
    diffLabel1:  "Facile • 1 gorgée",
    diffLabel2:  "Moyen • 2 gorgées",
    diffLabel3:  "Difficile • 3 gorgées",
    // Question
    revealBtn:   "👁 Révéler la réponse",
    correctBtn:  "✓ Bonne réponse",
    wrongBtn:    "✗ Mauvaise réponse",
    // Décision
    bravo:       "Bravo",
    whatToDo:    "Que veux-tu faire ?",
    bankBtn:     "💧 Distribuer et passer",
    toGive:      "à donner",
    continueBtn: "🎲 Tout miser pour plus !",
    risk:        "Risquer",
    // Boire
    missed:      "Raté !",
    mustDrink:   "doit boire",
    nextBtn:     "Au suivant →",
    // Bank
    distributed: "Distribué !",
    distributes: "distribue",
    toWhom:      "À qui tu veux !",
    // Scores
    scoresTitle:  "📊 Tableau des scores",
    scoresSince:  "Depuis le début de la partie",
    scoresPlayer: "Joueur",
    scoresGiven:  "Données 💧",
    scoresDrunk:  "Bues 🍺",
    backBtn:      "← Retour au jeu",
    // Modal
    modalTitle:  "Retour au menu",
    modalText:   "Les scores seront réinitialisés. Continuer ?",
    confirmBtn:  "Oui, quitter",
    cancelBtn:   "Annuler",
    // Unités
    sip1: "gorgée",
    sipN: "gorgées",
    // Streak banner (fragments)
    streakAccum1: "accumulée",
    streakAccumN: "accumulées",
    streakIfFail: "si tu rates, tu bois",
    streakPlus:   "+ la valeur de la question",
  },

  en: {
    tagline:          "The party game without a filter",
    playerCountLabel: "Number of players",
    playerPlaceholder:"Player",
    startBtn:         "Let's go! 🎉",
    turnLabel:   "It's the turn of",
    drawBtn:     "🎲 Draw a card",
    scoresBtn:   "📊 Scoreboard",
    menuBtn:     "🏠 Back to menu",
    chooseDiff:  "Choose the difficulty",
    inPlay:      "In play:",
    diffEasy:    "Easy",
    diffMedium:  "Medium",
    diffHard:    "Hard",
    diffLabel1:  "Easy • 1 sip",
    diffLabel2:  "Medium • 2 sips",
    diffLabel3:  "Hard • 3 sips",
    revealBtn:   "👁 Reveal the answer",
    correctBtn:  "✓ Correct",
    wrongBtn:    "✗ Wrong",
    bravo:       "Well done",
    whatToDo:    "What do you want to do?",
    bankBtn:     "💧 Cash out and pass",
    toGive:      "to give",
    continueBtn: "🎲 Risk it all for more!",
    risk:        "Risk",
    missed:      "Wrong!",
    mustDrink:   "must drink",
    nextBtn:     "Next →",
    distributed: "Cashed out!",
    distributes: "gives",
    toWhom:      "To whoever you want!",
    scoresTitle:  "📊 Scoreboard",
    scoresSince:  "Since the start of the game",
    scoresPlayer: "Player",
    scoresGiven:  "Given 💧",
    scoresDrunk:  "Drunk 🍺",
    backBtn:      "← Back to game",
    modalTitle:  "Back to menu",
    modalText:   "Scores will be reset. Continue?",
    confirmBtn:  "Yes, quit",
    cancelBtn:   "Cancel",
    sip1: "sip",
    sipN: "sips",
    streakAccum1: "accumulated",
    streakAccumN: "accumulated",
    streakIfFail: "if you fail, you drink",
    streakPlus:   "+ the question's value",
  },

  es: {
    tagline:          "El juego de fiesta sin filtro",
    playerCountLabel: "Número de jugadores",
    playerPlaceholder:"Jugador",
    startBtn:         "¡Vamos! 🎉",
    turnLabel:   "Es el turno de",
    drawBtn:     "🎲 Robar una carta",
    scoresBtn:   "📊 Marcador",
    menuBtn:     "🏠 Volver al menú",
    chooseDiff:  "Elige la dificultad",
    inPlay:      "En juego:",
    diffEasy:    "Fácil",
    diffMedium:  "Medio",
    diffHard:    "Difícil",
    diffLabel1:  "Fácil • 1 sorbo",
    diffLabel2:  "Medio • 2 sorbos",
    diffLabel3:  "Difícil • 3 sorbos",
    revealBtn:   "👁 Revelar la respuesta",
    correctBtn:  "✓ Correcto",
    wrongBtn:    "✗ Incorrecto",
    bravo:       "¡Bravo",
    whatToDo:    "¿Qué quieres hacer?",
    bankBtn:     "💧 Distribuir y pasar",
    toGive:      "a dar",
    continueBtn: "🎲 ¡Apostarlo todo para más!",
    risk:        "Arriesgar",
    missed:      "¡Fallado!",
    mustDrink:   "debe beber",
    nextBtn:     "Siguiente →",
    distributed: "¡Distribuido!",
    distributes: "distribuye",
    toWhom:      "¡A quien quieras!",
    scoresTitle:  "📊 Marcador",
    scoresSince:  "Desde el comienzo de la partida",
    scoresPlayer: "Jugador",
    scoresGiven:  "Dados 💧",
    scoresDrunk:  "Bebidos 🍺",
    backBtn:      "← Volver al juego",
    modalTitle:  "Volver al menú",
    modalText:   "Las puntuaciones se reiniciarán. ¿Continuar?",
    confirmBtn:  "Sí, salir",
    cancelBtn:   "Cancelar",
    sip1: "sorbo",
    sipN: "sorbos",
    streakAccum1: "acumulado",
    streakAccumN: "acumulados",
    streakIfFail: "si fallas, bebes",
    streakPlus:   "+ el valor de la pregunta",
  },
};

const FLAGS = { fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸' };

const I18n = {
  lang: localStorage.getItem('tpc_lang') || 'fr',

  set(lang) {
    this.lang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('tpc_lang', lang);
  },

  t(key) {
    return (TRANSLATIONS[this.lang] || TRANSLATIONS.fr)[key] || key;
  },

  // Renvoie "N gorgée(s)" dans la bonne langue
  sip(n) {
    return `${n} ${n > 1 ? this.t('sipN') : this.t('sip1')}`;
  },

  // Renvoie le flag emoji de la langue courante
  flag() {
    return FLAGS[this.lang] || FLAGS.fr;
  },
};
