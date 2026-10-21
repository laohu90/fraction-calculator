/**
 * Comprehensive multi-language tutorial content for elementary to middle school fraction math:
 * en, es, fr, pt, zh.
 */

import { SupportedLang } from './translations';

export interface TutorialCategory {
  id: 'concepts' | 'reduction' | 'addition' | 'multiplication' | 'pitfalls';
  label: string;
}

export interface TutorialContent {
  title: string;
  categories: TutorialCategory[];
  concepts: {
    title: string;
    whatIsFraction: string;
    pizzaExample: string;
    properTitle: string;
    properDesc: string;
    improperTitle: string;
    improperDesc: string;
    mixedTitle: string;
    mixedDesc: string;
    conversionTitle: string;
    conversionDesc: string;
  };
  reduction: {
    title: string;
    desc: string;
    exampleTitle: string;
    exampleSteps: string[];
    lcmTitle: string;
    lcmDesc: string;
    lcmExampleTitle: string;
    lcmExampleSteps: string;
  };
  addition: {
    title: string;
    rule1Title: string;
    rule1Chant: string;
    rule1Desc: string;
    rule2Title: string;
    rule2Chant: string;
    rule2Desc: string;
    mixedTipsTitle: string;
    mixedTipsDesc: string;
  };
  multiplication: {
    title: string;
    mulTitle: string;
    mulChant: string;
    mulExample: string;
    divTitle: string;
    divChant: string;
    divExample: string;
    mixedWarningTitle: string;
    mixedWarningDesc: string;
  };
  pitfalls: {
    title: string;
    items: {
      title: string;
      wrong: string;
      correct: string;
    }[];
  };
}

export const tutorialData: Record<SupportedLang, TutorialContent> = {
  en: {
    title: 'Fraction Mathematics Tutorial & Study Guide',
    categories: [
      { id: 'concepts', label: '1. Basic Concepts & Classification' },
      { id: 'reduction', label: '2. Simplifying & Common Denominators' },
      { id: 'addition', label: '3. Addition & Subtraction Rules' },
      { id: 'multiplication', label: '4. Multiplication & Division Rules' },
      { id: 'pitfalls', label: '5. Top 8 Common Homework Mistakes' },
    ],
    concepts: {
      title: 'What is a Fraction?',
      whatIsFraction: 'A fraction represents a part of a whole or any number of equal parts. It consists of a numerator (top, representing parts taken) and a denominator (bottom, representing total equal parts).',
      pizzaExample: 'For example: If you cut a pizza into 4 equal slices and eat 3 slices, you have eaten 3/4 of the pizza.',
      properTitle: 'Proper Fraction',
      properDesc: 'The numerator is strictly less than the denominator. The value is strictly less than 1.',
      improperTitle: 'Improper Fraction',
      improperDesc: 'The numerator is greater than or equal to the denominator. The value is 1 or greater.',
      mixedTitle: 'Mixed Number',
      mixedDesc: 'Combines an integer whole number part with a proper fraction (e.g., 2 1/3).',
      conversionTitle: 'Converting Between Improper Fractions and Mixed Numbers',
      conversionDesc: 'To convert an improper fraction to a mixed number: divide numerator by denominator. Quotient = whole part, remainder = new numerator. Example: 7 ÷ 3 = 2 with remainder 1, so 7/3 = 2 1/3.',
    },
    reduction: {
      title: 'Simplifying Fractions (Reduction & GCD)',
      desc: 'Simplifying (reducing) a fraction means dividing both the numerator and denominator by their greatest common factor (GCD). A fraction is in simplest form when numerator and denominator are coprime (GCD = 1).',
      exampleTitle: 'Example: Reduce 24/36 to simplest form',
      exampleSteps: [
        'Step 1: Find GCD of 24 and 36: 24 = 2×2×2×3, 36 = 2×2×3×3, GCD(24, 36) = 12.',
        'Step 2: Divide top and bottom by 12: (24 ÷ 12) / (36 ÷ 12) = 2/3.',
        'Result: The simplest form is 2/3.',
      ],
      lcmTitle: 'Finding Common Denominators (LCM)',
      lcmDesc: 'To add, subtract, or compare fractions with different denominators, convert them into equivalent fractions with a shared denominator. The optimal denominator is the Least Common Multiple (LCM) of the denominators.',
      lcmExampleTitle: 'Example: Common denominator for 1/4 and 5/6',
      lcmExampleSteps: 'The LCM of 4 and 6 is 12. Multiply 1/4 by 3/3 = 3/12. Multiply 5/6 by 2/2 = 10/12. Now both have denominator 12 and can be easily added, subtracted, or compared.',
    },
    addition: {
      title: 'Addition & Subtraction Rules for Fractions',
      rule1Title: 'Rule 1: Like Denominators',
      rule1Chant: 'Keep the denominator unchanged, add or subtract numerators directly!',
      rule1Desc: 'Example: 2/7 + 3/7 = (2 + 3)/7 = 5/7.',
      rule2Title: 'Rule 2: Unlike Denominators',
      rule2Chant: 'First find the LCM to make denominators equal, then add or subtract numerators, and finally simplify!',
      rule2Desc: 'Example: 1/2 − 1/3 = 3/6 − 2/6 = 1/6.',
      mixedTipsTitle: 'Tips for Mixed Number Addition & Subtraction:',
      mixedTipsDesc: 'Method A (Recommended): Convert mixed numbers into improper fractions first, compute using LCM, then simplify. This prevents borrowing errors in subtraction!',
    },
    multiplication: {
      title: 'Multiplication, Division, and Reciprocals',
      mulTitle: 'Fraction Multiplication Rule',
      mulChant: 'Multiply numerators together, multiply denominators together. Cross-simplify before multiplying!',
      mulExample: '(2/3) × (9/10) = (2×9)/(3×10) = 18/30 = 3/5. By cross-canceling 2 with 10 (1 and 5) and 3 with 9 (1 and 3), you directly get (1×3)/(1×5) = 3/5!',
      divTitle: 'Fraction Division Rule',
      divChant: 'Dividing by a fraction is the same as multiplying by its reciprocal (invert the second fraction)!',
      divExample: '(3/4) ÷ (5/8) = (3/4) × (8/5) = 24/20 = 6/5 = 1 1/5.',
      mixedWarningTitle: 'Golden Rule for Mixed Numbers in Multiplication/Division:',
      mixedWarningDesc: 'You MUST convert mixed numbers to improper fractions before multiplying or dividing! Never multiply whole numbers separately and fractions separately (e.g. 1 1/2 × 2 1/3 is NOT 2 1/6; it is 3/2 × 7/3 = 7/2 = 3 1/2).',
    },
    pitfalls: {
      title: 'Top 8 Common Traps & Mistakes in Fraction Homework',
      items: [
        {
          title: 'Trap 1: Adding denominators directly in addition',
          wrong: '❌ 1/2 + 1/3 = 2/5 (Never add denominators!)',
          correct: '✅ Find common denominator first: 3/6 + 2/6 = 5/6',
        },
        {
          title: 'Trap 2: Finding common denominators for multiplication',
          wrong: '❌ 1/2 × 1/3 converted to 3/6 × 2/6 (Unnecessary and slows you down)',
          correct: '✅ Multiply straight across: (1×1)/(2×3) = 1/6',
        },
        {
          title: 'Trap 3: Inverting the first fraction in division',
          wrong: '❌ (1/2) ÷ (3/4) = (2/1) × (3/4) (Flipped the wrong fraction!)',
          correct: '✅ Keep the first fraction, flip only the second: (1/2) × (4/3) = 2/3',
        },
        {
          title: 'Trap 4: Forgetting to simplify the final answer',
          wrong: '❌ Leaving 16/24 as final answer (Teachers will deduct points)',
          correct: '✅ Divide numerator & denominator by GCD 8: 2/3',
        },
        {
          title: 'Trap 5: Multiplying mixed numbers without converting',
          wrong: '❌ 2 1/2 × 3 1/3 = 6 1/6 (Completely wrong formula)',
          correct: '✅ Convert to improper fractions: 5/2 × 10/3 = 25/3 = 8 1/3',
        },
        {
          title: 'Trap 6: Misplacing negative signs',
          wrong: '❌ Leaving negative signs in the denominator: 3/(-4)',
          correct: '✅ Standard format places negative in front: -(3/4) or on numerator: -3/4',
        },
        {
          title: 'Trap 7: Forgetting to borrow in mixed subtraction',
          wrong: '❌ 3 1/4 − 1 3/4 = (3−1) and (1−3)/4 = 2 − 2/4 (Confusing steps)',
          correct: '✅ Convert to improper: 13/4 − 7/4 = 6/4 = 3/2 = 1 1/2',
        },
        {
          title: 'Trap 8: Division by zero',
          wrong: '❌ 3/0 or dividing by a fraction with numerator 0',
          correct: '✅ Division by zero is mathematically undefined. Check denominators!',
        },
      ],
    },
  },

  es: {
    title: 'Tutorial y Guía Completa de Matemáticas con Fracciones',
    categories: [
      { id: 'concepts', label: '1. Conceptos Básicos y Clasificación' },
      { id: 'reduction', label: '2. Simplificación y Común Denominador' },
      { id: 'addition', label: '3. Reglas de Suma y Resta' },
      { id: 'multiplication', label: '4. Reglas de Multiplicación y División' },
      { id: 'pitfalls', label: '5. Los 8 Errores Más Frecuentes en Tareas' },
    ],
    concepts: {
      title: '¿Qué es una Fracción?',
      whatIsFraction: 'Una fracción expresa una cantidad dividida entre otra cantidad; representa las partes que se toman de una unidad dividida en partes iguales. Consta de un numerador (partes tomadas) y un denominador (partes totales).',
      pizzaExample: 'Por ejemplo: si divides una pizza en 4 partes iguales y te comes 3, has comido 3/4 de la pizza.',
      properTitle: 'Fracción Propia',
      properDesc: 'El numerador es menor que el denominador. Su valor es estrictamente menor que 1.',
      improperTitle: 'Fracción Impropia',
      improperDesc: 'El numerador es mayor o igual que el denominador. Su valor es 1 o mayor.',
      mixedTitle: 'Número Mixto',
      mixedDesc: 'Combina un número entero y una fracción propia (ejemplo: 2 1/3).',
      conversionTitle: 'Conversión entre Fracción Impropia y Número Mixto',
      conversionDesc: 'Divide el numerador entre el denominador. El cociente es la parte entera y el residuo es el nuevo numerador. Ejemplo: 7 ÷ 3 = 2 (residuo 1), por tanto 7/3 = 2 1/3.',
    },
    reduction: {
      title: 'Simplificación de Fracciones (MCD)',
      desc: 'Simplificar una fracción significa dividir el numerador y el denominador entre su Máximo Común Divisor (MCD). La fracción es irreducible cuando el numerador y denominador son primos entre sí (MCD = 1).',
      exampleTitle: 'Ejemplo: Simplificar 24/36 a su forma irreducible',
      exampleSteps: [
        'Paso 1: Hallar el MCD de 24 y 36: 24 = 2³×3, 36 = 2²×3², MCD = 12.',
        'Paso 2: Dividir numerador y denominador entre 12: (24 ÷ 12) / (36 ÷ 12) = 2/3.',
        'Resultado: La fracción irreducible es 2/3.',
      ],
      lcmTitle: 'Común Denominador (Mínimo Común Múltiplo)',
      lcmDesc: 'Para sumar o restar fracciones con distinto denominador, se reducen a común denominador calculando el MCM de los denominadores.',
      lcmExampleTitle: 'Ejemplo: Común denominador para 1/4 y 5/6',
      lcmExampleSteps: 'El MCM de 4 y 6 es 12. Multiplicamos 1/4 por 3/3 = 3/12. Multiplicamos 5/6 por 2/2 = 10/12. ¡Ahora tienen el mismo denominador!',
    },
    addition: {
      title: 'Reglas para Sumar y Restar Fracciones',
      rule1Title: 'Regla 1: Mismo Denominador (Fracciones Homogéneas)',
      rule1Chant: '¡Se mantiene el denominador y se suman o restan los numeradores directamente!',
      rule1Desc: 'Ejemplo: 2/7 + 3/7 = (2 + 3)/7 = 5/7.',
      rule2Title: 'Regla 2: Distinto Denominador (Fracciones Heterogéneas)',
      rule2Chant: '¡Primero halla el MCM para igualar denominadores, luego opera los numeradores y simplifica!',
      rule2Desc: 'Ejemplo: 1/2 − 1/3 = 3/6 − 2/6 = 1/6.',
      mixedTipsTitle: 'Consejo para Operar Números Mixtos:',
      mixedTipsDesc: 'Método recomendado: Convierte siempre los números mixtos en fracciones impropias antes de calcular. ¡Evitará confusiones al pedir prestado en restas!',
    },
    multiplication: {
      title: 'Multiplicación, División y Fracción Inversa',
      mulTitle: 'Regla de la Multiplicación de Fracciones',
      mulChant: '¡Numerador por numerador y denominador por denominador. Simplifica en cruz antes de multiplicar!',
      mulExample: '(2/3) × (9/10) = (2×9)/(3×10) = 18/30 = 3/5. Si simplificas en cruz 2 con 10 y 3 con 9, obtienes 3/5 inmediatamente.',
      divTitle: 'Regla de la División de Fracciones',
      divChant: '¡Dividir entre una fracción es multiplicar por su inversa (dar la vuelta a la segunda fracción)!',
      divExample: '(3/4) ÷ (5/8) = (3/4) × (8/5) = 24/20 = 6/5 = 1 1/5.',
      mixedWarningTitle: 'Regla de Oro en Mixtos para Multiplicar y Dividir:',
      mixedWarningDesc: '¡Es OBLIGATORIO pasar los números mixtos a fracciones impropias primero! Jamás multipliques enteros con enteros y fracciones con fracciones.',
    },
    pitfalls: {
      title: 'Los 8 Errores Más Frecuentes en Tareas de Fracciones',
      items: [
        {
          title: 'Error 1: Sumar los denominadores directamente',
          wrong: '❌ 1/2 + 1/3 = 2/5 (¡Nunca sumes denominadores!)',
          correct: '✅ Hallar común denominador: 3/6 + 2/6 = 5/6',
        },
        {
          title: 'Error 2: Buscar común denominador en la multiplicación',
          wrong: '❌ 1/2 × 1/3 = 3/6 × 2/6 (Innecesario y causa errores)',
          correct: '✅ Multiplicar en línea recta: 1/6',
        },
        {
          title: 'Error 3: Invertir la primera fracción en la división',
          wrong: '❌ (1/2) ÷ (3/4) = (2/1) × (3/4) (Invertiste la fracción equivocada)',
          correct: '✅ Mantén la primera, invierte solo la segunda: (1/2) × (4/3) = 2/3',
        },
        {
          title: 'Error 4: Olvidar simplificar el resultado al final',
          wrong: '❌ Dejar 16/24 en el examen (Te quitarán puntos)',
          correct: '✅ Dividir entre el MCD 8 para obtener 2/3',
        },
        {
          title: 'Error 5: Multiplicar números mixtos sin convertirlos',
          wrong: '❌ 2 1/2 × 3 1/3 = 6 1/6 (Totalmente incorrecto)',
          correct: '✅ Fracciones impropias: 5/2 × 10/3 = 25/3 = 8 1/3',
        },
        {
          title: 'Error 6: Signos negativos en el denominador',
          wrong: '❌ Escribir 3/(-4)',
          correct: '✅ Formato correcto: -(3/4) o -3/4',
        },
        {
          title: 'Error 7: Resta de mixtos sin reagrupar',
          wrong: '❌ 3 1/4 − 1 3/4 intentando restar 1−3 en los numeradores',
          correct: '✅ A impropias: 13/4 − 7/4 = 6/4 = 3/2 = 1 1/2',
        },
        {
          title: 'Error 8: División por cero',
          wrong: '❌ Dividir por una fracción igual a 0',
          correct: '✅ La división por cero está matemáticamente indefinida.',
        },
      ],
    },
  },

  fr: {
    title: 'Guide et Tutoriel Complet sur les Fractions',
    categories: [
      { id: 'concepts', label: '1. Notions de Base & Classification' },
      { id: 'reduction', label: '2. Simplification & Même Dénominateur' },
      { id: 'addition', label: '3. Règles d’Addition & Soustraction' },
      { id: 'multiplication', label: '4. Règles de Multiplication & Division' },
      { id: 'pitfalls', label: '5. Les 8 Pièges et Erreurs Fréquents' },
    ],
    concepts: {
      title: 'Qu’est-ce qu’une Fraction ?',
      whatIsFraction: 'Une fraction représente une partie d’un tout divisé en parts égales. Elle est composée d’un numérateur (en haut, le nombre de parts prises) et d’un dénominateur (en bas, le nombre total de parts égales).',
      pizzaExample: 'Par exemple : si vous coupez une pizza en 4 parts égales et en mangez 3, vous avez mangé 3/4 de la pizza.',
      properTitle: 'Fraction Propre',
      properDesc: 'Le numérateur est inférieur au dénominateur. La valeur est strictement inférieure à 1.',
      improperTitle: 'Fraction Impropre',
      improperDesc: 'Le numérateur est supérieur ou égal au dénominateur. La valeur est supérieure ou égale à 1.',
      mixedTitle: 'Nombre Mixte',
      mixedDesc: 'Associe un nombre entier et une fraction propre (ex : 2 1/3).',
      conversionTitle: 'Conversion Fraction Impropre / Nombre Mixte',
      conversionDesc: 'Divisez le numérateur par le dénominateur : le quotient donne la partie entière et le reste devient le nouveau numérateur. Ex : 7 ÷ 3 = 2 reste 1, donc 7/3 = 2 1/3.',
    },
    reduction: {
      title: 'Simplification de Fractions (PGCD)',
      desc: 'Simplifier (ou réduire) une fraction consiste à diviser le numérateur et le dénominateur par leur Plus Grand Commun Diviseur (PGCD). Une fraction est irréductible lorsque le numérateur et le dénominateur sont premiers entre eux.',
      exampleTitle: 'Exemple : Simplifier 24/36 en fraction irréductible',
      exampleSteps: [
        'Étape 1 : Calculer le PGCD de 24 et 36 : PGCD(24, 36) = 12.',
        'Étape 2 : Diviser numérateur et dénominateur par 12 : (24 ÷ 12) / (36 ÷ 12) = 2/3.',
        'Résultat : La fraction irréductible est 2/3.',
      ],
      lcmTitle: 'Mettre au Même Dénominateur (PPCM)',
      lcmDesc: 'Pour additionner ou soustraire des fractions ayant des dénominateurs différents, on cherche le Plus Petit Commun Multiple (PPCM) des dénominateurs.',
      lcmExampleTitle: 'Exemple : Dénominateur commun pour 1/4 et 5/6',
      lcmExampleSteps: 'Le PPCM de 4 et 6 est 12. On multiplie 1/4 par 3/3 = 3/12 et 5/6 par 2/2 = 10/12. Les fractions peuvent maintenant être additionnées ou comparées facilement !',
    },
    addition: {
      title: 'Règles d’Addition et de Soustraction',
      rule1Title: 'Règle 1 : Dénominateurs Identiques',
      rule1Chant: 'On conserve le dénominateur et on additionne ou soustrait directement les numérateurs !',
      rule1Desc: 'Exemple : 2/7 + 3/7 = (2 + 3)/7 = 5/7.',
      rule2Title: 'Règle 2 : Dénominateurs Différents',
      rule2Chant: 'On réduit au même dénominateur (PPCM), on calcule les numérateurs, puis on simplifie !',
      rule2Desc: 'Exemple : 1/2 − 1/3 = 3/6 − 2/6 = 1/6.',
      mixedTipsTitle: 'Astuce pour les Nombres Mixtes :',
      mixedTipsDesc: 'Conseil : Transformez toujours les nombres mixtes en fractions impropres avant le calcul pour éviter toute erreur de retenue.',
    },
    multiplication: {
      title: 'Multiplication, Division et Inverse',
      mulTitle: 'Règle de Multiplication',
      mulChant: 'On multiplie les numérateurs entre eux et les dénominateurs entre eux. Simplifiez en croix avant de multiplier !',
      mulExample: '(2/3) × (9/10) = (2×9)/(3×10) = 18/30 = 3/5. En simplifiant 2 avec 10 et 3 avec 9, on trouve 3/5 directement.',
      divTitle: 'Règle de Division',
      divChant: 'Diviser par une fraction revient à multiplier par son inverse (inverser la deuxième fraction) !',
      divExample: '(3/4) ÷ (5/8) = (3/4) × (8/5) = 24/20 = 6/5 = 1 1/5.',
      mixedWarningTitle: 'Règle Absolue pour les Nombres Mixtes :',
      mixedWarningDesc: 'Convertissez TOUJOURS les nombres mixtes en fractions impropres ! Ne multipliez jamais séparément les entiers et les fractions.',
    },
    pitfalls: {
      title: 'Les 8 Pièges Classiques dans les Devoirs de Fractions',
      items: [
        {
          title: 'Piège 1 : Additionner les dénominateurs entre eux',
          wrong: '❌ 1/2 + 1/3 = 2/5 (Erreur critique !)',
          correct: '✅ Mettre au même dénominateur : 3/6 + 2/6 = 5/6',
        },
        {
          title: 'Piège 2 : Chercher un dénominateur commun pour multiplier',
          wrong: '❌ 1/2 × 1/3 transformé en 3/6 × 2/6 (Inutile et source d’erreurs)',
          correct: '✅ Multiplier en ligne : (1×1)/(2×3) = 1/6',
        },
        {
          title: 'Piège 3 : Inverser la première fraction lors d’une division',
          wrong: '❌ (1/2) ÷ (3/4) = (2/1) × (3/4) (Mauvaise fraction inversée)',
          correct: '✅ Conserver la première, inverser seulement la seconde : (1/2) × (4/3) = 2/3',
        },
        {
          title: 'Piège 4 : Oublier de simplifier en fraction irréductible',
          wrong: '❌ Rendre 16/24 sans simplifier',
          correct: '✅ Diviser par le PGCD 8 pour obtenir 2/3',
        },
        {
          title: 'Piège 5 : Multiplier les mixtes sans convertir',
          wrong: '❌ 2 1/2 × 3 1/3 = 6 1/6',
          correct: '✅ Convertir : 5/2 × 10/3 = 25/3 = 8 1/3',
        },
        {
          title: 'Piège 6 : Signe négatif laissé au dénominateur',
          wrong: '❌ Écrire 3/(-4)',
          correct: '✅ Écrire -(3/4) ou -3/4',
        },
        {
          title: 'Piège 7 : Soustraction de mixtes sans retenue',
          wrong: '❌ 3 1/4 − 1 3/4 sans adapter les fractions',
          correct: '✅ Passer en fractions impropres : 13/4 − 7/4 = 6/4 = 3/2 = 1 1/2',
        },
        {
          title: 'Piège 8 : Division par zéro',
          wrong: '❌ Diviser par 0 ou fraction nulle',
          correct: '✅ La division par zéro n’est pas définie en mathématiques.',
        },
      ],
    },
  },

  pt: {
    title: 'Guia e Tutorial Completo de Frações para Estudantes',
    categories: [
      { id: 'concepts', label: '1. Conceitos Básicos e Classificação' },
      { id: 'reduction', label: '2. Simplificação e MMC (Denominador Comum)' },
      { id: 'addition', label: '3. Regras de Adição e Subtração' },
      { id: 'multiplication', label: '4. Regras de Multiplicação e Divisão' },
      { id: 'pitfalls', label: '5. Os 8 Principais Erros nas Tarefas' },
    ],
    concepts: {
      title: 'O que é uma Fração?',
      whatIsFraction: 'Uma fração representa uma ou mais partes de um todo dividido em partes iguais. É composta por um numerador (parte de cima, partes tomadas) e um denominador (parte de baixo, total de divisões iguais).',
      pizzaExample: 'Exemplo: se você cortar uma pizza em 4 pedaços iguais e comer 3, terá comido 3/4 da pizza.',
      properTitle: 'Fração Própria',
      properDesc: 'O numerador é menor que o denominador. O valor é estritamente menor que 1.',
      improperTitle: 'Fração Imprópria',
      improperDesc: 'O numerador é maior ou igual ao denominador. O valor é 1 ou maior.',
      mixedTitle: 'Número Misto',
      mixedDesc: 'Combina uma parte inteira com uma fração própria (exemplo: 2 1/3).',
      conversionTitle: 'Conversão entre Fração Imprópria e Número Misto',
      conversionDesc: 'Divida o numerador pelo denominador: o quociente é o número inteiro e o resto é o novo numerador. Exemplo: 7 ÷ 3 = 2 (resto 1), logo 7/3 = 2 1/3.',
    },
    reduction: {
      title: 'Simplificação de Frações (MDC)',
      desc: 'Simplificar uma fração significa dividir numerador e denominador pelo Maior Divisor Comum (MDC). A fração é dita irredutível quando numerador e denominador são primos entre si (MDC = 1).',
      exampleTitle: 'Exemplo: Simplificar 24/36 para fração irredutível',
      exampleSteps: [
        'Passo 1: Calcular o MDC de 24 e 36: MDC(24, 36) = 12.',
        'Passo 2: Dividir numerador e denominador por 12: (24 ÷ 12) / (36 ÷ 12) = 2/3.',
        'Resultado: A fração irredutível é 2/3.',
      ],
      lcmTitle: 'Denominador Comum (Mínimo Múltiplo Comum - MMC)',
      lcmDesc: 'Para somar ou subtrair frações com denominadores diferentes, encontramos o MMC dos denominadores para transformá-las em frações equivalentes.',
      lcmExampleTitle: 'Exemplo: Denominador comum de 1/4 e 5/6',
      lcmExampleSteps: 'O MMC de 4 e 6 é 12. Multiplicamos 1/4 por 3/3 = 3/12 e 5/6 por 2/2 = 10/12. Agora ambas têm denominador 12!',
    },
    addition: {
      title: 'Regras de Adição e Subtração de Frações',
      rule1Title: 'Regra 1: Denominadores Iguais',
      rule1Chant: 'Conserva-se o denominador e somam-se ou subtraem-se os numeradores diretamente!',
      rule1Desc: 'Exemplo: 2/7 + 3/7 = (2 + 3)/7 = 5/7.',
      rule2Title: 'Regra 2: Denominadores Diferentes',
      rule2Chant: 'Primeiro acha o MMC dos denominadores, ajusta os numeradores, calcula e simplifica!',
      rule2Desc: 'Exemplo: 1/2 − 1/3 = 3/6 − 2/6 = 1/6.',
      mixedTipsTitle: 'Dica para Números Mistos:',
      mixedTipsDesc: 'Método seguro: Transforme sempre os números mistos em frações impróprias antes de somar ou subtrair para evitar erros.',
    },
    multiplication: {
      title: 'Multiplicação, Divisão e Fração Inversa',
      mulTitle: 'Regra da Multiplicação',
      mulChant: 'Numerador vezes numerador, denominador vezes denominador. Simplifique cruzado antes de multiplicar!',
      mulExample: '(2/3) × (9/10) = (2×9)/(3×10) = 18/30 = 3/5. Simplificando cruzado 2 com 10 e 3 com 9, obtém-se 3/5 instantaneamente.',
      divTitle: 'Regra da Divisão',
      divChant: 'Dividir por uma fração é multiplicar pelo seu inverso (inverter a segunda fração)!',
      divExample: '(3/4) ÷ (5/8) = (3/4) × (8/5) = 24/20 = 6/5 = 1 1/5.',
      mixedWarningTitle: 'Regra Fundamental em Números Mistos:',
      mixedWarningDesc: 'Você DEVE converter números mistos em frações impróprias antes de multiplicar ou dividir! Nunca multiplique inteiros com inteiros separadamente.',
    },
    pitfalls: {
      title: 'Os 8 Erros Mais Comuns em Tarefas de Frações',
      items: [
        {
          title: 'Erro 1: Somar denominadores na adição',
          wrong: '❌ 1/2 + 1/3 = 2/5 (Erro grave!)',
          correct: '✅ Encontrar denominador comum: 3/6 + 2/6 = 5/6',
        },
        {
          title: 'Erro 2: Tirar MMC na multiplicação',
          wrong: '❌ 1/2 × 1/3 convertido em 3/6 × 2/6 (Desnecessário e demorado)',
          correct: '✅ Multiplicar direto: (1×1)/(2×3) = 1/6',
        },
        {
          title: 'Erro 3: Inverter a primeira fração na divisão',
          wrong: '❌ (1/2) ÷ (3/4) = (2/1) × (3/4) (Inverteu a fração errada)',
          correct: '✅ Mantenha a primeira, inverta apenas a segunda: (1/2) × (4/3) = 2/3',
        },
        {
          title: 'Erro 4: Não simplificar o resultado final',
          wrong: '❌ Entregar 16/24 na prova',
          correct: '✅ Dividir pelo MDC 8 para achar 2/3',
        },
        {
          title: 'Erro 5: Multiplicar mistos sem converter',
          wrong: '❌ 2 1/2 × 3 1/3 = 6 1/6',
          correct: '✅ Frações impróprias: 5/2 × 10/3 = 25/3 = 8 1/3',
        },
        {
          title: 'Erro 6: Sinal negativo no denominador',
          wrong: '❌ 3/(-4)',
          correct: '✅ Formato padrão: -(3/4) ou -3/4',
        },
        {
          title: 'Erro 7: Subtração de mistos sem reagrupamento',
          wrong: '❌ 3 1/4 − 1 3/4 tentando subtrair 1−3',
          correct: '✅ Converter em impróprias: 13/4 − 7/4 = 6/4 = 3/2 = 1 1/2',
        },
        {
          title: 'Erro 8: Divisão por zero',
          wrong: '❌ Dividir por fração com valor 0',
          correct: '✅ Divisão por zero é matematicamente impossível.',
        },
      ],
    },
  },

  zh: {
    title: '中小学分数运算完整教程与知识点速记指南',
    categories: [
      { id: 'concepts', label: '1. 分数基本概念与分类' },
      { id: 'reduction', label: '2. 约分与通分秘诀' },
      { id: 'addition', label: '3. 加减法运算法则' },
      { id: 'multiplication', label: '4. 乘除法与倒数法则' },
      { id: 'pitfalls', label: '5. 中小学生 8 大避坑雷区' },
    ],
    concepts: {
      title: '什么是分数？',
      whatIsFraction: '把单位 “1” 平均分成若干份，表示这样的一份或几份的数叫做分数。分数由分子（上面的数，表示所取的份数）和分母（下面的数，表示平均分的总份数）组成。',
      pizzaExample: '例如：把一个披萨平均分成 4 份，吃了其中的 3 份，就是吃掉了 3/4 个披萨。',
      properTitle: '真分数 (Proper Fraction)',
      properDesc: '分子小于分母的分数，数值严格小于 1。',
      improperTitle: '假分数 (Improper Fraction)',
      improperDesc: '分子大于或等于分母的分数，数值大于或等于 1。',
      mixedTitle: '带分数 (Mixed Number)',
      mixedDesc: '由整数部分和真分数部分组合而成的数（例如 2又1/3）。',
      conversionTitle: '假分数与带分数的相互转化公式',
      conversionDesc: '假分数化带分数：分子 ÷ 分母 = 商（整数部分）... 余数（新分子）。如 7 ÷ 3 = 2 余 1，即 2又1/3。',
    },
    reduction: {
      title: '约分与最简分数（短除法）',
      desc: '把一个分数的分子、分母同时除以它们的公因数，叫做约分。当分子和分母只有公因数 1（互质）时，这个分数就是最简分数。',
      exampleTitle: '约分例题：将 24/36 化简为最简分数',
      exampleSteps: [
        '步骤 1：找出 24 和 36 的最大公因数。24 = 2×2×2×3，36 = 2×2×3×3，最大公因数 GCD(24, 36) = 12。',
        '步骤 2：分子分母同时除以 12：(24 ÷ 12) / (36 ÷ 12) = 2/3。',
        '结果：24/36 约分后得到最简分数 2/3。',
      ],
      lcmTitle: '通分法则（找最小公倍数）',
      lcmDesc: '把异分母分数分别化成和原来分数相等的同分母分数，叫做通分。通分的关键是求出原来几个分母的最小公倍数 (LCM) 作为公分母。',
      lcmExampleTitle: '通分例题：将 1/4 和 5/6 通分',
      lcmExampleSteps: '分母 4 与 6 的最小公倍数是 12。1/4 分子分母同时乘 3 得 3/12；5/6 分子分母同时乘 2 得 10/12。通分后即可直接相加减或比大小！',
    },
    addition: {
      title: '分数加减法运算法则与口诀',
      rule1Title: '法则一：同分母加减法',
      rule1Chant: '分母不变，分子直接相加减！',
      rule1Desc: '例：2/7 + 3/7 = (2 + 3)/7 = 5/7。',
      rule2Title: '法则二：异分母加减法',
      rule2Chant: '一找公倍数通分，二算分子，三约最简！',
      rule2Desc: '例：1/2 − 1/3 = 3/6 − 2/6 = 1/6。',
      mixedTipsTitle: '带分数加减法建议技巧：',
      mixedTipsDesc: '方法 A（强烈推荐）：直接将带分数化为假分数后再通分计算，绝不会在退位借 1 时漏项出错！',
    },
    multiplication: {
      title: '分数乘法、除法与倒数法则',
      mulTitle: '分数乘法法则',
      mulChant: '分子乘分子作分子，分母乘分母作分母。能约分的先交叉约分，再相乘！',
      mulExample: '(2/3) × (9/10) = (2×9)/(3×10) = 18/30 = 3/5。若先交叉约分：2与10约成1与5，3与9约成1与3，直接得出 3/5！',
      divTitle: '分数除法法则',
      divChant: '除以一个不为 0 的数，等于乘这个数的倒数！',
      divExample: '(3/4) ÷ (5/8) = (3/4) × (8/5) = 24/20 = 6/5 = 1又1/5。',
      mixedWarningTitle: '带分数做乘除法的铁律：',
      mixedWarningDesc: '必须先将带分数转化为假分数，绝对不能整数部分乘整数部分、分数乘分数！例如 1又1/2 × 2又1/3 ≠ 2又1/6，而是 3/2 × 7/3 = 7/2 = 3又1/2。',
    },
    pitfalls: {
      title: '中小学生做分数作业 8 大经典易错雷区',
      items: [
        {
          title: '雷区 1：异分母加减直接相加分母',
          wrong: '❌ 1/2 + 1/3 = 2/5（错！分母绝不能相加）',
          correct: '✅ 必须先通分：3/6 + 2/6 = 5/6',
        },
        {
          title: '雷区 2：乘法也傻傻去通分',
          wrong: '❌ 1/2 × 1/3 居然通分成 3/6 × 2/6（错误且浪费时间）',
          correct: '✅ 乘法无需通分，直接分子乘分子、分母乘分母：1/6',
        },
        {
          title: '雷区 3：除法颠倒了前面的被除数',
          wrong: '❌ (1/2) ÷ (3/4) = (2/1) × (3/4)（颠倒错对象）',
          correct: '✅ 颠倒后面的除数：(1/2) × (4/3) = 2/3',
        },
        {
          title: '雷区 4：最后一步忘记约分到底',
          wrong: '❌ 算出 16/24 就交卷（老师会扣一半分）',
          correct: '✅ 必须除以最大公因数 8，化为最简分数 2/3',
        },
        {
          title: '雷区 5：带分数乘除没化假分数',
          wrong: '❌ 2又1/2 × 3又1/3 = 6又1/6（大错！）',
          correct: '✅ 先化假分数：5/2 × 10/3 = 25/3 = 8又1/3',
        },
        {
          title: '雷区 6：负号漏乘或位置混乱',
          wrong: '❌ 负负得正漏掉，或把符号写进分母 3/(-4)',
          correct: '✅ 标准书写负号统一放在分数线正前方 -(3/4) 或分子上 -3/4',
        },
        {
          title: '雷区 7：带分数减法不够减时退位出错',
          wrong: '❌ 3又1/4 − 1又3/4 时直接算 1−3 不够减导致混乱',
          correct: '✅ 全部转假分数：13/4 − 7/4 = 6/4 = 3/2 = 1又1/2',
        },
        {
          title: '雷区 8：除以零或把 0 作分母',
          wrong: '❌ 3/0 或除以分子为 0 的分数',
          correct: '✅ 0 不能作除数，分母不能为 0，运算在数学中无意义',
        },
      ],
    },
  },
};
