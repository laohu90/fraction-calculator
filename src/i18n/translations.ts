/**
 * Multi-language localization dictionary: en (default), es, fr, pt, zh.
 */

export type SupportedLang = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface PresetItem {
  label: string;
  m: boolean;
  w1: string;
  n1: string;
  d1: string;
  op: '+' | '-' | '×' | '÷';
  w2: string;
  n2: string;
  d2: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TranslationDict {
  brandTitle: string;
  tagline: string;
  metaDesc: string;
  nav: {
    calculator: string;
    multiterm: string;
    simplify: string;
    compare: string;
    decimal: string;
    quiz: string;
    tutorial: string;
    seoHub: string;
    faq: string;
  };
  actions: {
    print: string;
    reset: string;
    copyResult: string;
    copied: string;
    copyLatex: string;
    star: string;
    foldSteps: string;
    expandSteps: string;
    loadExample: string;
    submitCheck: string;
    nextQuestion: string;
    viewSteps: string;
    clearKeypad: string;
    toggleKeypad: string;
    hideKeypad: string;
  };
  calc: {
    inputTitle: string;
    pureMode: string;
    mixedMode: string;
    whole: string;
    num: string;
    den: string;
    op: string;
    resultTitle: string;
    mixedResult: string;
    decimalForm: string;
    lcmLabel: string;
    gcdLabel: string;
    simplestStatus: string;
    reciprocalLabel: string;
    shortDivTitle: string;
    shortDivSubtitle: string;
    shortDivRounds: string;
    shortDivGcdNotes: string;
    shortDivLcmNotes: string;
    shortDivCoprime: string;
    stepsTitle: string;
    stepsCount: string;
    geometryTitle: string;
    tapeView: string;
    pieView: string;
    historyTitle: string;
    clearHistory: string;
    clickToLoad: string;
    presetsTitle: string;
    presets: PresetItem[];
    divideByZero: string;
    inputInvalid: string;
  };
  multiterm: {
    title: string;
    subtitle: string;
    placeholder: string;
    classicPresets: string;
    stepOrder: string;
  };
  simplify: {
    title: string;
    subtitle: string;
    factorsNum: string;
    factorsDen: string;
    commonFactors: string;
    greatestFactor: string;
    nature: string;
    properFrac: string;
    improperFrac: string;
    integerFrac: string;
  };
  compare: {
    title: string;
    subtitle: string;
    addFrac: string;
    commonDenomTitle: string;
    sortedTitle: string;
    numberLineTitle: string;
  };
  decimal: {
    title: string;
    subtitle: string;
    placeholder: string;
    typeTerminating: string;
    typePureRepeating: string;
    typeMixedRepeating: string;
    derivationTitle: string;
  };
  quiz: {
    selectDifficulty: string;
    easy: string;
    medium: string;
    hard: string;
    score: string;
    prompt: string;
    correctMsg: string;
    wrongMsg: string;
    correctAnswerIs: string;
  };
  tutorial: {
    tabConcepts: string;
    tabReduction: string;
    tabAddition: string;
    tabMultiplication: string;
    tabPitfalls: string;
    tryInCalc: string;
    loadThisExample: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  footer: string;
}

export const translations: Record<SupportedLang, TranslationDict> = {
  en: {
    brandTitle: 'Fraction Calculator',
    tagline: 'Online Fraction Arithmetic, Simplifying & Common Denominator with Steps',
    metaDesc: 'Free online fraction calculator with step-by-step arithmetic (+, -, ×, ÷), mixed fractions, simplifying with short division, and decimal conversion.',
    nav: {
      calculator: 'Fraction Arithmetic',
      multiterm: 'Mixed Expression',
      simplify: 'Simplifier',
      compare: 'Compare & LCM',
      decimal: 'Decimal to Fraction',
      quiz: 'Practice Quiz',
      tutorial: 'Tutorial Guide',
      seoHub: 'Search Topic Hub',
      faq: 'FAQ',
    },
    actions: {
      print: 'Print Worksheet',
      reset: 'Reset',
      copyResult: 'Copy Text',
      copied: 'Copied!',
      copyLatex: 'LaTeX',
      star: 'Save Exercise',
      foldSteps: 'Collapse Steps',
      expandSteps: 'Expand All Steps',
      loadExample: 'Load Example',
      submitCheck: 'Check Answer',
      nextQuestion: 'Next Problem',
      viewSteps: 'View Step-by-Step',
      clearKeypad: 'Clear',
      toggleKeypad: 'Show Keypad',
      hideKeypad: 'Hide Keypad',
    },
    calc: {
      inputTitle: 'Fraction Inputs',
      pureMode: 'Simple Fraction',
      mixedMode: 'Mixed Number (w n/d)',
      whole: 'Whole',
      num: 'Numerator',
      den: 'Denominator',
      op: 'Operator',
      resultTitle: 'Calculation Result (Simplest Form)',
      mixedResult: 'Mixed Form:',
      decimalForm: 'Decimal:',
      lcmLabel: 'Common Denominator (LCM)',
      gcdLabel: 'Greatest Common Divisor (GCD)',
      simplestStatus: 'Status',
      reciprocalLabel: 'Reciprocal',
      shortDivTitle: 'Short Division Ladder Method:',
      shortDivSubtitle: 'Used to find common denominator (LCM) or reduce fraction with GCD',
      shortDivRounds: 'rounds of division',
      shortDivGcdNotes: 'Greatest Common Divisor (GCD): Product of left divisors =',
      shortDivLcmNotes: 'Least Common Multiple (LCM): Divisors × bottom quotients =',
      shortDivCoprime: 'Numbers are coprime (GCD = 1), no further reduction needed.',
      stepsTitle: 'Detailed Step-by-Step Derivation',
      stepsCount: 'total steps',
      geometryTitle: 'Fraction Geometry Visual Model',
      tapeView: 'Tape Model',
      pieView: 'Pie Chart',
      historyTitle: 'Homework History Log',
      clearHistory: 'Clear History',
      clickToLoad: 'Click to load',
      presetsTitle: 'Quick Homework Presets:',
      presets: [
        { label: '1/2 + 1/3 (LCM Add)', m: false, w1: '0', n1: '1', d1: '2', op: '+', w2: '0', n2: '1', d2: '3' },
        { label: '3/4 - 2/5 (Unlike Den.)', m: false, w1: '0', n1: '3', d1: '4', op: '-', w2: '0', n2: '2', d2: '5' },
        { label: '4/9 × 3/8 (Cross Cancel)', m: false, w1: '0', n1: '4', d1: '9', op: '×', w2: '0', n2: '3', d2: '8' },
        { label: '5/6 ÷ 2/3 (Reciprocal)', m: false, w1: '0', n1: '5', d1: '6', op: '÷', w2: '0', n2: '2', d2: '3' },
        { label: '1 1/2 + 2 1/3 (Mixed Add)', m: true, w1: '1', n1: '1', d1: '2', op: '+', w2: '2', n2: '1', d2: '3' },
        { label: '2 1/2 × 1 3/5 (Mixed Mul)', m: true, w1: '2', n1: '1', d1: '2', op: '×', w2: '1', n2: '3', d2: '5' },
      ],
      divideByZero: 'Denominator cannot be zero',
      inputInvalid: 'Please enter valid integer numerators and denominators',
    },
    multiterm: {
      title: 'Continuous Mixed Operations Calculator',
      subtitle: 'Supports parentheses and strict order of operations (PEMDAS)',
      placeholder: 'e.g. 1/2 + 2/3 * 3/4 - 1/6 or (3/4 - 1/2) * 2/3',
      classicPresets: 'Classic Exam Problems:',
      stepOrder: 'Step-by-step arithmetic sequence:',
    },
    simplify: {
      title: 'Fraction Simplifier & Lowest Terms Tool',
      subtitle: 'Enter numerator and denominator to calculate GCD and view reduction steps.',
      factorsNum: 'Factors of Numerator',
      factorsDen: 'Factors of Denominator',
      commonFactors: 'Common Factors Set',
      greatestFactor: 'Greatest Common Divisor (GCD)',
      nature: 'Fraction Type',
      properFrac: 'Proper Fraction (< 1)',
      improperFrac: 'Improper Fraction (≥ 1)',
      integerFrac: 'Simplifies to Integer',
    },
    compare: {
      title: 'Common Denominator & Fraction Comparison',
      subtitle: 'Input 2 to 5 fractions to find the LCM, convert to common denominators, and sort.',
      addFrac: 'Add Fraction',
      commonDenomTitle: 'Equivalent Fractions with Common Denominator (LCM)',
      sortedTitle: 'Comparison Result (Ascending Order)',
      numberLineTitle: 'Number Line Distribution:',
    },
    decimal: {
      title: 'Decimal to Fraction Converter',
      subtitle: 'Converts terminating and repeating decimals (use brackets for repeating digits, e.g. 0.[3])',
      placeholder: 'Enter decimal, e.g. 0.875 or 0.[3]',
      typeTerminating: 'Terminating Decimal',
      typePureRepeating: 'Pure Repeating Decimal',
      typeMixedRepeating: 'Mixed Repeating Decimal',
      derivationTitle: 'Step-by-Step Algebraic Derivation',
    },
    quiz: {
      selectDifficulty: 'Select Difficulty:',
      easy: 'Basic (Like Denominators)',
      medium: 'Medium (Unlike Denominators)',
      hard: 'Challenge (Mixed Operations)',
      score: 'Score:',
      prompt: 'Solve and reduce to simplest form (must be irreducible fraction or integer):',
      correctMsg: 'Correct! Excellent work!',
      wrongMsg: 'Incorrect. Check your common denominator or reduction!',
      correctAnswerIs: 'The correct answer is:',
    },
    tutorial: {
      tabConcepts: '1. Basic Concepts & Types',
      tabReduction: '2. Simplifying & LCM',
      tabAddition: '3. Addition & Subtraction',
      tabMultiplication: '4. Multiplication & Division',
      tabPitfalls: '5. Top 8 Common Traps & Mistakes',
      tryInCalc: 'Try in Calculator',
      loadThisExample: 'Load this example',
    },
    faq: {
      title: 'Fraction Math FAQ & Key Exam Tips',
      subtitle: 'Frequently asked questions by students and parents during homework review.',
      items: [
        {
          q: 'When adding or subtracting fractions, can you add the denominators directly?',
          a: 'Never! Denominators represent the total number of equal parts that make up a whole. You can only combine numerators when denominators are identical. For unlike denominators, you must first find the Least Common Multiple (LCM) to create common denominators.',
        },
        {
          q: 'Why do you multiply by the reciprocal when dividing fractions?',
          a: 'Dividing by a fraction is equivalent to finding how many groups of that fraction fit into the dividend. By multiplying both numerator and denominator by the divisor\'s reciprocal, the denominator becomes 1, leaving the dividend multiplied by the reciprocal: (a/b) ÷ (c/d) = (a/b) × (d/c).',
        },
        {
          q: 'How do you know if a fraction is in its simplest form?',
          a: 'A fraction is in simplest form when the Greatest Common Divisor (GCD) of the numerator and denominator is 1 (they are coprime). If both numbers are even, divide by 2; if the sum of digits is divisible by 3, divide by 3; if the ending digit is 0 or 5, divide by 5.',
        },
        {
          q: 'What is the difference between improper fractions and mixed numbers?',
          a: 'An improper fraction has a numerator greater than or equal to its denominator. In mathematics calculations (especially multiplication and division), improper fractions prevent errors. Mixed numbers clearly show whole units plus remainder, making them ideal for everyday measurements and final answers.',
        },
      ],
    },
    footer: '© Fraction Calculator · Built for K-12 students, parents, and math homework verification.',
  },

  es: {
    brandTitle: 'Calculadora de Fracciones',
    tagline: 'Operaciones con fracciones, simplificación y común denominador paso a paso',
    metaDesc: 'Calculadora de fracciones online gratis con pasos: suma, resta, multiplicación, división, fracciones mixtas, simplificación y conversión a decimal.',
    nav: {
      calculator: 'Aritmética de Fracciones',
      multiterm: 'Expresión Mixta',
      simplify: 'Simplificar',
      compare: 'Comparar y MCM',
      decimal: 'Decimal a Fracción',
      quiz: 'Práctica y Test',
      tutorial: 'Tutorial y Reglas',
      seoHub: 'Temas Frecuentes',
      faq: 'Preguntas Frecuentes',
    },
    actions: {
      print: 'Imprimir Ejercicio',
      reset: 'Reiniciar',
      copyResult: 'Copiar Texto',
      copied: '¡Copiado!',
      copyLatex: 'LaTeX',
      star: 'Guardar Ejercicio',
      foldSteps: 'Ocultar Pasos',
      expandSteps: 'Ver Todos los Pasos',
      loadExample: 'Cargar en Calculadora',
      submitCheck: 'Comprobar',
      nextQuestion: 'Siguiente Problema',
      viewSteps: 'Ver Solución Paso a Paso',
      clearKeypad: 'Borrar Todo',
      toggleKeypad: 'Mostrar Teclado',
      hideKeypad: 'Ocultar Teclado',
    },
    calc: {
      inputTitle: 'Entrada de Fracciones',
      pureMode: 'Fracción Simple',
      mixedMode: 'Fracción Mixta (e n/d)',
      whole: 'Entero',
      num: 'Numerador',
      den: 'Denominador',
      op: 'Operación',
      resultTitle: 'Resultado de la Operación (Simplificado)',
      mixedResult: 'Número Mixto:',
      decimalForm: 'Decimal:',
      lcmLabel: 'Común Denominador (MCM)',
      gcdLabel: 'Máximo Común Divisor (MCD)',
      simplestStatus: 'Estado',
      reciprocalLabel: 'Recíproco (Inverso)',
      shortDivTitle: 'Diagrama de División Corta:',
      shortDivSubtitle: 'Usado para hallar el MCM de denominadores o simplificar con MCD',
      shortDivRounds: 'rondas de factores primos',
      shortDivGcdNotes: 'Máximo Común Divisor (MCD): Producto divisores izquierdos =',
      shortDivLcmNotes: 'Mínimo Común Múltiplo (MCM): Divisores × cocientes inferiores =',
      shortDivCoprime: 'Los números son primos entre sí (MCD = 1).',
      stepsTitle: 'Resolución Detallada Paso a Paso',
      stepsCount: 'pasos en total',
      geometryTitle: 'Modelo Geométrico Visual de Fracciones',
      tapeView: 'Modelo de Barra (Tape)',
      pieView: 'Gráfico Circular (Pie)',
      historyTitle: 'Historial de Ejercicios',
      clearHistory: 'Borrar Historial',
      clickToLoad: 'Clic para cargar',
      presetsTitle: 'Ejemplos Típicos de Tarea:',
      presets: [
        { label: '1/2 + 1/3 (Suma MCM)', m: false, w1: '0', n1: '1', d1: '2', op: '+', w2: '0', n2: '1', d2: '3' },
        { label: '3/4 - 2/5 (Resta Heterogénea)', m: false, w1: '0', n1: '3', d1: '4', op: '-', w2: '0', n2: '2', d2: '5' },
        { label: '4/9 × 3/8 (Simplificar Cruzado)', m: false, w1: '0', n1: '4', d1: '9', op: '×', w2: '0', n2: '3', d2: '8' },
        { label: '5/6 ÷ 2/3 (División Inversa)', m: false, w1: '0', n1: '5', d1: '6', op: '÷', w2: '0', n2: '2', d2: '3' },
        { label: '1 1/2 + 2 1/3 (Suma Mixta)', m: true, w1: '1', n1: '1', d1: '2', op: '+', w2: '2', n2: '1', d2: '3' },
        { label: '2 1/2 × 1 3/5 (Mult. Mixta)', m: true, w1: '2', n1: '1', d1: '2', op: '×', w2: '1', n2: '3', d2: '5' },
      ],
      divideByZero: 'El denominador no puede ser cero',
      inputInvalid: 'Por favor introduce números enteros válidos',
    },
    multiterm: {
      title: 'Calculadora de Operaciones Combinadas',
      subtitle: 'Respeta paréntesis y jerarquía de operaciones matemáticas',
      placeholder: 'Ej: 1/2 + 2/3 * 3/4 - 1/6 o (3/4 - 1/2) * 2/3',
      classicPresets: 'Ejercicios de Examen:',
      stepOrder: 'Secuencia de pasos detallada:',
    },
    simplify: {
      title: 'Simplificador de Fracciones a Fracción Irreducible',
      subtitle: 'Introduce numerador y denominador para calcular el MCD y ver los pasos de reducción.',
      factorsNum: 'Divisores del Numerador',
      factorsDen: 'Divisores del Denominador',
      commonFactors: 'Divisores Comunes',
      greatestFactor: 'Máximo Común Divisor (MCD)',
      nature: 'Tipo de Fracción',
      properFrac: 'Fracción Propia (< 1)',
      improperFrac: 'Fracción Impropia (≥ 1)',
      integerFrac: 'Equivalente a Entero',
    },
    compare: {
      title: 'Común Denominador y Comparación de Fracciones',
      subtitle: 'Compara de 2 a 5 fracciones calculando el MCM de los denominadores.',
      addFrac: 'Añadir Fracción',
      commonDenomTitle: 'Fracciones Equivalentes con Denominador Común (MCM)',
      sortedTitle: 'Resultado Ordenado (De Menor a Mayor)',
      numberLineTitle: 'Distribución en la Recta Numérica:',
    },
    decimal: {
      title: 'Conversor de Decimales a Fracciones',
      subtitle: 'Convierte decimales exactos y periódicos (usa corchetes para el periodo, ej. 0.[3])',
      placeholder: 'Introduce decimal, ej. 0.875 o 0.[3]',
      typeTerminating: 'Decimal Exacto',
      typePureRepeating: 'Periódico Puro',
      typeMixedRepeating: 'Periódico Mixto',
      derivationTitle: 'Demostración Algebraica Paso a Paso',
    },
    quiz: {
      selectDifficulty: 'Elige la Dificultad:',
      easy: 'Básica (Mismo Denominador)',
      medium: 'Media (Distinto Denominador)',
      hard: 'Desafío (Operaciones Combinadas)',
      score: 'Puntuación:',
      prompt: 'Calcula y simplifica al máximo (resultado irreducible o entero):',
      correctMsg: '¡Correcto! ¡Excelente trabajo!',
      wrongMsg: 'Incorrecto. Revisa el común denominador o la simplificación.',
      correctAnswerIs: 'La respuesta correcta es:',
    },
    tutorial: {
      tabConcepts: '1. Conceptos Básicos y Clasificación',
      tabReduction: '2. Simplificación y MCM',
      tabAddition: '3. Reglas de Suma y Resta',
      tabMultiplication: '4. Reglas de Multiplicación y División',
      tabPitfalls: '5. Los 8 Errores Más Frecuentes',
      tryInCalc: 'Probar en la Calculadora',
      loadThisExample: 'Cargar este ejemplo',
    },
    faq: {
      title: 'Preguntas Frecuentes sobre Fracciones',
      subtitle: 'Dudas comunes de estudiantes y padres al corregir ejercicios y tareas escolares.',
      items: [
        {
          q: '¿Al sumar o restar fracciones, se pueden sumar los denominadores directamente?',
          a: '¡Jamás! Los denominadores indican en cuántas partes iguales se ha dividido la unidad. Solo puedes sumar numeradores si los denominadores son idénticos. Si son diferentes, debes hallar el Mínimo Común Múltiplo (MCM) para amplificar a común denominador.',
        },
        {
          q: '¿Por qué en la división de fracciones se multiplica por el inverso?',
          a: 'Dividir entre una fracción equivale a calcular cuántas veces cabe esa fracción en la cantidad inicial. Al multiplicar numerador y denominador por el recíproco del divisor, el divisor se convierte en 1 y la operación resulta en multiplicar por el inverso: (a/b) ÷ (c/d) = (a/b) × (d/c).',
        },
        {
          q: '¿Cómo saber si una fracción ya es irreducible?',
          a: 'Una fracción es irreducible cuando el Máximo Común Divisor (MCD) del numerador y del denominador es 1. Si ambos son pares, se dividen entre 2; si la suma de sus cifras es múltiplo de 3, entre 3; si terminan en 0 o 5, entre 5.',
        },
        {
          q: '¿Qué diferencia hay entre fracción impropia y número mixto?',
          a: 'Una fracción impropia tiene el numerador mayor o igual que el denominador. Para realizar cálculos (sobre todo multiplicar y dividir), las fracciones impropias son más fiables. Los números mixtos facilitan la comprensión visual de cantidades enteras y sobrantes.',
        },
      ],
    },
    footer: '© Calculadora de Fracciones · Diseñada para estudiantes, padres y comprobación de tareas escolares.',
  },

  fr: {
    brandTitle: 'Calculatrice de Fractions',
    tagline: 'Calcul de fractions, simplification et dénominateur commun avec étapes',
    metaDesc: 'Calculatrice de fractions en ligne gratuite avec étapes : addition, soustraction, multiplication, division, nombres mixtes, simplification et conversion décimale.',
    nav: {
      calculator: 'Arithmétique des Fractions',
      multiterm: 'Expression Mixte',
      simplify: 'Simplifier',
      compare: 'Comparer & PPCM',
      decimal: 'Décimal en Fraction',
      quiz: 'Quiz d’Entraînement',
      tutorial: 'Tutoriel & Règles',
      seoHub: 'Sujets Fréquents',
      faq: 'FAQ',
    },
    actions: {
      print: 'Imprimer la Fiche',
      reset: 'Réinitialiser',
      copyResult: 'Copier le Texte',
      copied: 'Copié !',
      copyLatex: 'LaTeX',
      star: 'Sauvegarder',
      foldSteps: 'Masquer les Étapes',
      expandSteps: 'Voir Toutes les Étapes',
      loadExample: 'Charger l’Exemple',
      submitCheck: 'Valider',
      nextQuestion: 'Problème Suivant',
      viewSteps: 'Voir la Résolution',
      clearKeypad: 'Effacer',
      toggleKeypad: 'Afficher le Clavier',
      hideKeypad: 'Masquer le Clavier',
    },
    calc: {
      inputTitle: 'Saisie des Fractions',
      pureMode: 'Fraction Simple',
      mixedMode: 'Nombre Mixte (e n/d)',
      whole: 'Entier',
      num: 'Numérateur',
      den: 'Dénominateur',
      op: 'Opération',
      resultTitle: 'Résultat du Calcul (Forme Irréductible)',
      mixedResult: 'Forme Mixte :',
      decimalForm: 'Décimal :',
      lcmLabel: 'Dénominateur Commun (PPCM)',
      gcdLabel: 'Plus Grand Commun Diviseur (PGCD)',
      simplestStatus: 'État',
      reciprocalLabel: 'Inverse',
      shortDivTitle: 'Méthode de Division Courte (Échelle) :',
      shortDivSubtitle: 'Utilisée pour trouver le PPCM ou simplifier avec le PGCD',
      shortDivRounds: 'tours de décomposition',
      shortDivGcdNotes: 'Plus Grand Commun Diviseur (PGCD) : Produit des diviseurs de gauche =',
      shortDivLcmNotes: 'Plus Petit Commun Multiple (PPCM) : Diviseurs × quotients inférieurs =',
      shortDivCoprime: 'Les nombres sont premiers entre eux (PGCD = 1).',
      stepsTitle: 'Résolution Détaillée Étape par Étape',
      stepsCount: 'étapes au total',
      geometryTitle: 'Représentation Visuelle Géométrique',
      tapeView: 'Modèle de Barre (Tape)',
      pieView: 'Diagramme Circulaire (Pie)',
      historyTitle: 'Historique des Calculs',
      clearHistory: 'Effacer l’Historique',
      clickToLoad: 'Cliquer pour charger',
      presetsTitle: 'Exemples Types de Devoirs :',
      presets: [
        { label: '1/2 + 1/3 (Addition PPCM)', m: false, w1: '0', n1: '1', d1: '2', op: '+', w2: '0', n2: '1', d2: '3' },
        { label: '3/4 - 2/5 (Dénom. Différents)', m: false, w1: '0', n1: '3', d1: '4', op: '-', w2: '0', n2: '2', d2: '5' },
        { label: '4/9 × 3/8 (Simplif. en Croix)', m: false, w1: '0', n1: '4', d1: '9', op: '×', w2: '0', n2: '3', d2: '8' },
        { label: '5/6 ÷ 2/3 (Division Inverse)', m: false, w1: '0', n1: '5', d1: '6', op: '÷', w2: '0', n2: '2', d2: '3' },
        { label: '1 1/2 + 2 1/3 (Somme Mixte)', m: true, w1: '1', n1: '1', d1: '2', op: '+', w2: '2', n2: '1', d2: '3' },
        { label: '2 1/2 × 1 3/5 (Mult. Mixte)', m: true, w1: '2', n1: '1', d1: '2', op: '×', w2: '1', n2: '3', d2: '5' },
      ],
      divideByZero: 'Le dénominateur ne peut pas être zéro',
      inputInvalid: 'Veuillez saisir des nombres entiers valides',
    },
    multiterm: {
      title: 'Calculatrice d’Opérations Combinées',
      subtitle: 'Respecte les parenthèses et l’ordre des priorités opératoires',
      placeholder: 'Ex : 1/2 + 2/3 * 3/4 - 1/6 ou (3/4 - 1/2) * 2/3',
      classicPresets: 'Exercices Classiques :',
      stepOrder: 'Étapes détaillées du calcul :',
    },
    simplify: {
      title: 'Simplification de Fraction en Forme Irréductible',
      subtitle: 'Indiquez le numérateur et le dénominateur pour trouver le PGCD et les étapes de simplification.',
      factorsNum: 'Diviseurs du Numérateur',
      factorsDen: 'Diviseurs du Dénominateur',
      commonFactors: 'Diviseurs Communs',
      greatestFactor: 'Plus Grand Commun Diviseur (PGCD)',
      nature: 'Nature de la Fraction',
      properFrac: 'Fraction Propre (< 1)',
      improperFrac: 'Fraction Impropre (≥ 1)',
      integerFrac: 'Nombre Entier',
    },
    compare: {
      title: 'Même Dénominateur & Comparaison de Fractions',
      subtitle: 'Comparez de 2 à 5 fractions en calculant le PPCM des dénominateurs.',
      addFrac: 'Ajouter une Fraction',
      commonDenomTitle: 'Fractions Équivalentes au Même Dénominateur (PPCM)',
      sortedTitle: 'Classement (Ordre Croissant)',
      numberLineTitle: 'Position sur la Droite Graduée :',
    },
    decimal: {
      title: 'Convertisseur Décimal en Fraction',
      subtitle: 'Convertit les nombres décimaux finis et périodiques (crochets pour la période, ex. 0.[3])',
      placeholder: 'Entrez un nombre décimal, ex. 0.875 ou 0.[3]',
      typeTerminating: 'Décimal Fini',
      typePureRepeating: 'Périodique Pur',
      typeMixedRepeating: 'Périodique Mixte',
      derivationTitle: 'Démonstration Algébrique Étape par Étape',
    },
    quiz: {
      selectDifficulty: 'Sélectionnez le Niveau :',
      easy: 'Facile (Même Dénominateur)',
      medium: 'Moyen (Dénominateurs Différents)',
      hard: 'Défi (Opérations Combinées)',
      score: 'Score :',
      prompt: 'Calculez et simplifiez en fraction irréductible ou entier :',
      correctMsg: 'Bravo ! Excellente réponse !',
      wrongMsg: 'Erreur. Vérifiez le dénominateur commun ou la simplification.',
      correctAnswerIs: 'La réponse exacte est :',
    },
    tutorial: {
      tabConcepts: '1. Notions de Base & Classification',
      tabReduction: '2. Simplification & PPCM',
      tabAddition: '3. Règles d’Addition & Soustraction',
      tabMultiplication: '4. Règles de Multiplication & Division',
      tabPitfalls: '5. Les 8 Pièges et Erreurs Fréquents',
      tryInCalc: 'Tester dans la Calculatrice',
      loadThisExample: 'Charger cet exemple',
    },
    faq: {
      title: 'FAQ Mathématiques sur les Fractions',
      subtitle: 'Questions fréquentes des élèves et des parents pour la vérification des devoirs.',
      items: [
        {
          q: 'Peut-on additionner directement les dénominateurs lors d\'une addition de fractions ?',
          a: 'Absolument pas ! Le dénominateur indique en combien de parts égales l\'unité est divisée. On ne peut additionner les numérateurs que si les dénominateurs sont identiques. Sinon, il faut d\'abord chercher le Plus Petit Commun Multiple (PPCM).',
        },
        {
          q: 'Pourquoi inverse-t-on la deuxième fraction pour la division ?',
          a: 'Diviser par un nombre non nul revient à multiplier par son inverse. En multipliant le numérateur et le dénominateur de l\'expression globale par l\'inverse du diviseur, le diviseur devient égal à 1 : (a/b) ÷ (c/d) = (a/b) × (d/c).',
        },
        {
          q: 'Comment savoir si une fraction est sous forme irréductible ?',
          a: 'Une fraction est irréductible lorsque le Plus Grand Commun Diviseur (PGCD) du numérateur et du dénominateur est égal à 1 (ils sont premiers entre eux).',
        },
        {
          q: 'Quelle est la différence entre fraction impropre et nombre mixte ?',
          a: 'Une fraction impropre a un numérateur supérieur ou égal au dénominateur. Elle est essentielle pour effectuer des calculs de multiplication et de division sans erreur de retenue. Le nombre mixte exprime clairement les unités entières.',
        },
      ],
    },
    footer: '© Calculatrice de Fractions · Conçue pour les élèves, les parents et la vérification des devoirs.',
  },

  pt: {
    brandTitle: 'Calculadora de Frações',
    tagline: 'Cálculo de frações, simplificação e MMC passo a passo',
    metaDesc: 'Calculadora de frações online grátis com passo a passo: adição, subtração, multiplicação, divisão, frações mistas, simplificação e conversão para decimal.',
    nav: {
      calculator: 'Aritmética de Frações',
      multiterm: 'Expressão Mista',
      simplify: 'Simplificar',
      compare: 'Comparar e MMC',
      decimal: 'Decimal para Fração',
      quiz: 'Prática e Teste',
      tutorial: 'Tutorial e Regras',
      seoHub: 'Tópicos Frequentes',
      faq: 'Perguntas Frequentes',
    },
    actions: {
      print: 'Imprimir Folha',
      reset: 'Reiniciar',
      copyResult: 'Copiar Texto',
      copied: 'Copiado!',
      copyLatex: 'LaTeX',
      star: 'Salvar Exercício',
      foldSteps: 'Ocultar Passos',
      expandSteps: 'Ver Todos os Passos',
      loadExample: 'Carregar Exemplo',
      submitCheck: 'Conferir',
      nextQuestion: 'Próximo Problema',
      viewSteps: 'Ver Passo a Passo',
      clearKeypad: 'Limpar',
      toggleKeypad: 'Mostrar Teclado',
      hideKeypad: 'Ocultar Teclado',
    },
    calc: {
      inputTitle: 'Entrada de Frações',
      pureMode: 'Fração Simples',
      mixedMode: 'Fração Mista (i n/d)',
      whole: 'Inteiro',
      num: 'Numerador',
      den: 'Denominador',
      op: 'Operação',
      resultTitle: 'Resultado da Operação (Forma Irredutível)',
      mixedResult: 'Forma Mista:',
      decimalForm: 'Decimal:',
      lcmLabel: 'Denominador Comum (MMC)',
      gcdLabel: 'Maior Divisor Comum (MDC)',
      simplestStatus: 'Estado',
      reciprocalLabel: 'Inverso',
      shortDivTitle: 'Método da Divisão Curta (Fatoração):',
      shortDivSubtitle: 'Usado para achar o MMC dos denominadores ou simplificar com MDC',
      shortDivRounds: 'etapas de fatoração',
      shortDivGcdNotes: 'Maior Divisor Comum (MDC): Produto dos divisores da esquerda =',
      shortDivLcmNotes: 'Mínimo Múltiplo Comum (MMC): Divisores × quocientes inferiores =',
      shortDivCoprime: 'Os números são primos entre si (MDC = 1).',
      stepsTitle: 'Resolução Detalhada Passo a Passo',
      stepsCount: 'passos no total',
      geometryTitle: 'Modelo Geométrico Visual de Frações',
      tapeView: 'Modelo de Barra (Tape)',
      pieView: 'Gráfico de Pizza (Pie)',
      historyTitle: 'Histórico de Tarefas',
      clearHistory: 'Limpar Histórico',
      clickToLoad: 'Clique para carregar',
      presetsTitle: 'Exemplos Clássicos de Tarefas:',
      presets: [
        { label: '1/2 + 1/3 (Soma MMC)', m: false, w1: '0', n1: '1', d1: '2', op: '+', w2: '0', n2: '1', d2: '3' },
        { label: '3/4 - 2/5 (Denom. Diferentes)', m: false, w1: '0', n1: '3', d1: '4', op: '-', w2: '0', n2: '2', d2: '5' },
        { label: '4/9 × 3/8 (Simplif. Cruzada)', m: false, w1: '0', n1: '4', d1: '9', op: '×', w2: '0', n2: '3', d2: '8' },
        { label: '5/6 ÷ 2/3 (Divisão Inversa)', m: false, w1: '0', n1: '5', d1: '6', op: '÷', w2: '0', n2: '2', d2: '3' },
        { label: '1 1/2 + 2 1/3 (Soma Mista)', m: true, w1: '1', n1: '1', d1: '2', op: '+', w2: '2', n2: '1', d2: '3' },
        { label: '2 1/2 × 1 3/5 (Mult. Mista)', m: true, w1: '2', n1: '1', d1: '2', op: '×', w2: '1', n2: '3', d2: '5' },
      ],
      divideByZero: 'O denominador não pode ser zero',
      inputInvalid: 'Insira números inteiros válidos',
    },
    multiterm: {
      title: 'Calculadora de Expressões Fracionárias',
      subtitle: 'Com suporte a parênteses e ordem das operações matemáticas',
      placeholder: 'Ex: 1/2 + 2/3 * 3/4 - 1/6 ou (3/4 - 1/2) * 2/3',
      classicPresets: 'Questões Típicas de Prova:',
      stepOrder: 'Sequência de cálculo passo a passo:',
    },
    simplify: {
      title: 'Simplificador de Frações para Forma Irredutível',
      subtitle: 'Digite o numerador e o denominador para calcular o MDC e ver a simplificação.',
      factorsNum: 'Divisores do Numerador',
      factorsDen: 'Divisores do Denominador',
      commonFactors: 'Divisores Comuns',
      greatestFactor: 'Maior Divisor Comum (MDC)',
      nature: 'Tipo de Fração',
      properFrac: 'Fração Própria (< 1)',
      improperFrac: 'Fração Imprópria (≥ 1)',
      integerFrac: 'Equivalente a Inteiro',
    },
    compare: {
      title: 'Denominador Comum e Comparação de Frações',
      subtitle: 'Insira de 2 a 5 frações para calcular o MMC e ordenar da menor para a maior.',
      addFrac: 'Adicionar Fração',
      commonDenomTitle: 'Frações Equivalentes com Denominador Comum (MMC)',
      sortedTitle: 'Resultado Ordenado (Ordem Crescente)',
      numberLineTitle: 'Distribuição na Reta Numérica:',
    },
    decimal: {
      title: 'Conversor de Decimal para Fração',
      subtitle: 'Converte decimais exatos e dízimas periódicas (use colchetes para o período, ex: 0.[3])',
      placeholder: 'Digite o decimal, ex: 0.875 ou 0.[3]',
      typeTerminating: 'Decimal Exato',
      typePureRepeating: 'Dízima Periódica Simples',
      typeMixedRepeating: 'Dízima Periódica Composta',
      derivationTitle: 'Demonstração Algébrica Passo a Passo',
    },
    quiz: {
      selectDifficulty: 'Escolha a Dificuldade:',
      easy: 'Básica (Mesmo Denominador)',
      medium: 'Média (Denominadores Diferentes)',
      hard: 'Desafio (Expressões Mistas)',
      score: 'Pontuação:',
      prompt: 'Calcule e simplifique para a forma irredutível ou número inteiro:',
      correctMsg: 'Correto! Excelente raciocínio!',
      wrongMsg: 'Incorreto. Verifique o MMC ou a simplificação.',
      correctAnswerIs: 'A resposta correta é:',
    },
    tutorial: {
      tabConcepts: '1. Conceitos Básicos e Classificação',
      tabReduction: '2. Simplificação e MMC',
      tabAddition: '3. Regras de Adição e Subtração',
      tabMultiplication: '4. Regras de Multiplicação e Divisão',
      tabPitfalls: '5. Os 8 Principais Erros nas Tarefas',
      tryInCalc: 'Testar na Calculadora',
      loadThisExample: 'Carregar este exemplo',
    },
    faq: {
      title: 'Perguntas Frequentes sobre Frações',
      subtitle: 'Dúvidas comuns de alunos e pais durante a resolução de exercícios e dever de casa.',
      items: [
        {
          q: 'Na adição de frações, podemos somar os denominadores diretamente?',
          a: 'Jamais! Os denominadores indicam em quantas partes o todo foi dividido. Você só pode somar ou subtrair numeradores quando os denominadores forem iguais. Com denominadores diferentes, calcule o Mínimo Múltiplo Comum (MMC).',
        },
        {
          q: 'Por que na divisão de frações multiplicamos pelo inverso?',
          a: 'Dividir por uma fração equivale a ver quantas vezes essa fração cabe no dividendo. Multiplicar pelo inverso é a operação matemática equivalente: (a/b) ÷ (c/d) = (a/b) × (d/c).',
        },
        {
          q: 'Como saber se uma fração já está na forma irredutível?',
          a: 'Uma fração é irredutível quando o Maior Divisor Comum (MDC) entre numerador e denominador é 1 (são primos entre si).',
        },
        {
          q: 'Qual é a diferença entre fração imprópria e número misto?',
          a: 'A fração imprópria tem numerador maior ou igual ao denominador, sendo ideal para cálculos de multiplicação e divisão. O número misto evidencia as unidades inteiras completas.',
        },
      ],
    },
    footer: '© Calculadora de Frações · Criada para estudantes, pais e conferência de dever de casa.',
  },

  zh: {
    brandTitle: '分数计算器',
    tagline: '在线分数加减乘除、约分化简与异分母通分计算器',
    metaDesc: '免费在线分数计算器，支持分数与带分数的加减乘除四则运算、通分找最小公倍数、短除法约分化简与小数互化，提供详尽步骤解析与中小学数学作业核对。',
    nav: {
      calculator: '分数四则运算',
      multiterm: '混合连续算式',
      simplify: '约分化简',
      compare: '通分比大小',
      decimal: '小数转分数',
      quiz: '随堂自测打卡',
      tutorial: '知识点教程',
      seoHub: '高频题型库',
      faq: '做题答疑 FAQ',
    },
    actions: {
      print: '打印作业单',
      reset: '重置数据',
      copyResult: '复制结果',
      copied: '已复制！',
      copyLatex: 'LaTeX',
      star: '收藏错题',
      foldSteps: '收起分步',
      expandSteps: '展开全步骤',
      loadExample: '导入计算器',
      submitCheck: '提交判分',
      nextQuestion: '换下一题',
      viewSteps: '查看详解',
      clearKeypad: '清空输入',
      toggleKeypad: '展开数字键盘',
      hideKeypad: '收起键盘',
    },
    calc: {
      inputTitle: '分数参数输入',
      pureMode: '普通分数',
      mixedMode: '带分数 (整数+真分数)',
      whole: '整数部分',
      num: '分子',
      den: '分母',
      op: '运算符',
      resultTitle: '计算结果（最简形式）',
      mixedResult: '带分数形式：',
      decimalForm: '小数形式：',
      lcmLabel: '公分母最小公倍数 (LCM)',
      gcdLabel: '分子分母最大公因数 (GCD)',
      simplestStatus: '化简状态',
      reciprocalLabel: '结果的倒数',
      shortDivTitle: '经典短除法分解因数梯形图：',
      shortDivSubtitle: '用于通分求公分母 LCM 或约分求最大公因数 GCD',
      shortDivRounds: '轮因数分解',
      shortDivGcdNotes: '最大公因数 (GCD)：左侧所有除数连乘 =',
      shortDivLcmNotes: '最小公倍数 (LCM)：左侧除数 × 底部商连乘 =',
      shortDivCoprime: '两数互质（最大公因数为 1），无需短除法分解。',
      stepsTitle: '详细分步推导解析（中小学作业核对规范格式）',
      stepsCount: '共计步骤',
      geometryTitle: '分数几何可视化直观模型',
      tapeView: '长条模型 (Tape)',
      pieView: '圆盘饼图 (Pie)',
      historyTitle: '做作业核对历史',
      clearHistory: '清空记录',
      clickToLoad: '点击载入',
      presetsTitle: '高频作业题一键载入：',
      presets: [
        { label: '1/2 + 1/3 (通分加)', m: false, w1: '0', n1: '1', d1: '2', op: '+', w2: '0', n2: '1', d2: '3' },
        { label: '3/4 - 2/5 (异分母减)', m: false, w1: '0', n1: '3', d1: '4', op: '-', w2: '0', n2: '2', d2: '5' },
        { label: '4/9 × 3/8 (交叉约分)', m: false, w1: '0', n1: '4', d1: '9', op: '×', w2: '0', n2: '3', d2: '8' },
        { label: '5/6 ÷ 2/3 (乘倒数)', m: false, w1: '0', n1: '5', d1: '6', op: '÷', w2: '0', n2: '2', d2: '3' },
        { label: '1又1/2 + 2又1/3 (带分数加)', m: true, w1: '1', n1: '1', d1: '2', op: '+', w2: '2', n2: '1', d2: '3' },
        { label: '2又1/2 × 1又3/5 (带分数乘)', m: true, w1: '2', n1: '1', d1: '2', op: '×', w2: '1', n2: '3', d2: '5' },
      ],
      divideByZero: '除数不能为 0',
      inputInvalid: '请输入有效的整数分子与分母',
    },
    multiterm: {
      title: '连续多项式混合四则运算计算器',
      subtitle: '支持括号、严格遵循先乘除后加减运算法则',
      placeholder: '例如: 1/2 + 2/3 * 3/4 - 1/6 或 (3/4 - 1/2) * 2/3',
      classicPresets: '经典考题：',
      stepOrder: '四则混合分步计算过程：',
    },
    simplify: {
      title: '分数约分与最简分数化简器',
      subtitle: '输入任意分数的分子和分母，快速计算最大公因数 (GCD)，展示短除法分解因数与最简分数。',
      factorsNum: '分子的全部因数',
      factorsDen: '分母的全部因数',
      commonFactors: '公共因数集合',
      greatestFactor: '最大公因数 (GCD)',
      nature: '分数性质',
      properFrac: '真分数 (< 1)',
      improperFrac: '假分数 (≥ 1)',
      integerFrac: '可化为整数',
    },
    compare: {
      title: '分数通分与比大小工具',
      subtitle: '输入 2 至 5 个分数，自动求出分母最小公倍数 (LCM)，一键通分并按从小到大排序。',
      addFrac: '添加分数',
      commonDenomTitle: '通分演算步骤（公分母 LCM）',
      sortedTitle: '大小比较结果（从小到大排序）',
      numberLineTitle: '数轴直观分布图 (Number Line):',
    },
    decimal: {
      title: '小数与循环小数转分数计算器',
      subtitle: '支持有限小数（如 0.75）以及循环小数（中括号表示循环节，如 0.[3] 表示 0.333...）',
      placeholder: '输入小数，例如 0.875 或 0.[3]',
      typeTerminating: '有限小数',
      typePureRepeating: '纯循环小数',
      typeMixedRepeating: '混循环小数',
      derivationTitle: '分步推导与解方程全过程',
    },
    quiz: {
      selectDifficulty: '选择练习难度：',
      easy: '基础 (同分母)',
      medium: '进阶 (异分母四则)',
      hard: '挑战 (综合四则)',
      score: '做题得分：',
      prompt: '计算并化为最简分数（答案必须为最简分数或整数）',
      correctMsg: '回答正确！运算很扎实！',
      wrongMsg: '回答有误，请注意约分或通分！',
      correctAnswerIs: '正确答案是：',
    },
    tutorial: {
      tabConcepts: '1. 分数基本概念与分类',
      tabReduction: '2. 约分与通分秘诀',
      tabAddition: '3. 加减法运算法则',
      tabMultiplication: '4. 乘除法与倒数法则',
      tabPitfalls: '5. 中小学生 8 大避坑雷区',
      tryInCalc: '在计算器中试一试',
      loadThisExample: '载入此例题',
    },
    faq: {
      title: '分数运算常见问题与常考技巧 (FAQ)',
      subtitle: '中小学生做题高频疑问，考前复习必看要点。',
      items: [
        {
          q: '做分数加减法时，可以直接把分母加起来吗？',
          a: '绝对不行！分数的分母表示平均分的总份数，分子表示占有的份数。只有平均分的份数相同（同分母）时才能直接加减分子。异分母必须通过求最小公倍数通分后，再相加减。',
        },
        {
          q: '为什么分数除法要“颠倒相乘”？',
          a: '除以一个数等于乘上它的倒数。因为一个分数除以 a/b，相当于看它里面包含多少个 a/b，利用繁分数性质给分子分母同乘倒数 b/a 将分母化为 1，分子自然就变成了乘它的倒数 b/a。',
        },
        {
          q: '作业要求写“最简分数”，怎样判断是否已经化简彻底？',
          a: '只需检验分子和分母的最大公因数 (GCD) 是否为 1（即两者互质）。如果两者都是偶数，至少还能约去 2；如果各位数字之和都能被 3 整除，还能约去 3；末尾是 0 或 5 还能约去 5。',
        },
        {
          q: '带分数和假分数有什么区别？什么时候用带分数？',
          a: '假分数分子大于或等于分母，运算时（特别是乘除法）化为假分数不容易出错；带分数直观显示整数部分和剩余部分，在日常度量、应用题答题以及小学高年级最终结论书写时常用。',
        },
      ],
    },
    footer: '© 分数计算器 (Fraction Calculator) · 专为中小学生数学学习与作业核对打造',
  },
};

// Auto-detect language with default 'en'
export function detectUserLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'en';

  const saved = localStorage.getItem('fraction_calc_lang') as SupportedLang;
  if (saved && ['en', 'es', 'fr', 'pt', 'zh'].includes(saved)) {
    return saved;
  }

  const browserLang = (navigator.language || (navigator as any).userLanguage || 'en').toLowerCase();

  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('pt')) return 'pt';

  return 'en'; // default English
}
