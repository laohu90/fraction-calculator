import React, { useState } from 'react';
import { SupportedLang, translations } from '../i18n/translations';
import { ArrowRight, Search, Hash } from 'lucide-react';

interface SeoTopicHubProps {
  lang?: SupportedLang;
  onLoadPreset: (
    mixed: boolean,
    w1: string,
    n1: string,
    d1: string,
    op: '+' | '-' | '×' | '÷',
    w2: string,
    n2: string,
    d2: string
  ) => void;
}

export const SeoTopicHub: React.FC<SeoTopicHubProps> = ({
  lang = 'en',
  onLoadPreset,
}) => {
  const t = translations[lang] || translations.en;
  const [searchFilter, setSearchFilter] = useState('');

  const localizedTopics: Record<
    SupportedLang,
    {
      id: string;
      title: string;
      keywords: string[];
      desc: string;
      formula: string;
      example: {
        text: string;
        mixed: boolean;
        w1: string;
        n1: string;
        d1: string;
        op: '+' | '-' | '×' | '÷';
        w2: string;
        n2: string;
        d2: string;
      };
    }[]
  > = {
    en: [
      {
        id: 'diff-denom-add',
        title: 'Adding Fractions with Unlike Denominators (LCM Steps)',
        keywords: ['adding fractions', 'unlike denominators', 'least common multiple', 'fraction addition steps'],
        desc: 'Fractions with unlike denominators cannot be added directly. Find the Least Common Multiple (LCM) of the denominators to create equivalent fractions, then add numerators.',
        formula: 'a/b + c/d = (a·k1 + c·k2) / LCM(b, d)',
        example: {
          text: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '3',
          op: '+',
          w2: '0',
          n2: '1',
          d2: '4',
        },
      },
      {
        id: 'diff-denom-sub',
        title: 'Subtracting Fractions with Unlike Denominators',
        keywords: ['subtracting fractions', 'fraction subtraction steps', 'common denominator subtraction'],
        desc: 'Find the common denominator using LCM, scale the numerators accordingly, and subtract the second numerator from the first. Simplify the final fraction if needed.',
        formula: 'a/b - c/d = (a·k1 - c·k2) / LCM(b, d)',
        example: {
          text: '5/6 - 3/8 = 20/24 - 9/24 = 11/24',
          mixed: false,
          w1: '0',
          n1: '5',
          d1: '6',
          op: '-',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'cross-simplify-mul',
        title: 'Multiplying Fractions & Cross-Simplification',
        keywords: ['multiplying fractions calculator', 'cross cancel fractions', 'fraction multiplication rules'],
        desc: 'Multiply numerators together and denominators together. Before multiplying, cross-cancel common factors between opposite numerators and denominators to simplify calculation.',
        formula: '(a/b) × (c/d) = (a × c) / (b × d)',
        example: {
          text: '4/9 × 3/8 = (cross-cancel 4 & 8, 3 & 9) = 1/6',
          mixed: false,
          w1: '0',
          n1: '4',
          d1: '9',
          op: '×',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'reciprocal-div',
        title: 'Dividing Fractions by Multiplying the Reciprocal',
        keywords: ['dividing fractions calculator', 'fraction reciprocal', 'keep change flip fractions'],
        desc: 'To divide by a fraction, keep the first fraction, change the division sign to multiplication, and flip the second fraction to its reciprocal (invert numerator and denominator).',
        formula: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)',
        example: {
          text: '7/10 ÷ 2/5 = 7/10 × 5/2 = 35/20 = 7/4 = 1 3/4',
          mixed: false,
          w1: '0',
          n1: '7',
          d1: '10',
          op: '÷',
          w2: '0',
          n2: '2',
          d2: '5',
        },
      },
      {
        id: 'mixed-arithmetic',
        title: 'Mixed Numbers Arithmetic (Convert to Improper Fraction)',
        keywords: ['mixed numbers calculator', 'mixed fraction to improper', 'operations with mixed numbers'],
        desc: 'Before multiplying or dividing mixed numbers, always convert them into improper fractions (numerator = whole × denominator + original numerator).',
        formula: 'A(b/c) = (A·c + b) / c',
        example: {
          text: '2 1/3 × 1 1/2 = 7/3 × 3/2 = 7/2 = 3 1/2',
          mixed: true,
          w1: '2',
          n1: '1',
          d1: '3',
          op: '×',
          w2: '1',
          n2: '1',
          d2: '2',
        },
      },
      {
        id: 'gcd-reduction-shortdiv',
        title: 'Simplifying Fractions with Greatest Common Divisor (GCD)',
        keywords: ['simplifying fractions tool', 'lowest terms calculator', 'GCD reduction'],
        desc: 'Find the Greatest Common Divisor (GCD) of the numerator and denominator using successive prime factor division, then divide both by GCD.',
        formula: 'GCD(a, b) prime reduction to lowest terms',
        example: {
          text: '48/64 = (48÷16)/(64÷16) = 3/4',
          mixed: false,
          w1: '0',
          n1: '48',
          d1: '64',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
      {
        id: 'negative-fraction',
        title: 'Negative Fractions Arithmetic (Rational Numbers)',
        keywords: ['negative fractions calculator', 'signed rational numbers', 'adding negative fractions'],
        desc: 'Follow standard integer sign rules: negative times negative equals positive; negative plus negative stays negative. Keep minus sign centered on fraction line.',
        formula: '(-a/b) × (-c/d) = +(a·c)/(b·d)',
        example: {
          text: '-1/2 - 2/3 = -3/6 - 4/6 = -7/6',
          mixed: false,
          w1: '0',
          n1: '-1',
          d1: '2',
          op: '-',
          w2: '0',
          n2: '2',
          d2: '3',
        },
      },
      {
        id: 'decimal-to-frac-pure',
        title: 'Converting Repeating Decimals to Exact Fractions',
        keywords: ['repeating decimal to fraction', 'convert 0.333 to fraction', 'recurring decimal algebra'],
        desc: 'Multiply x by powers of 10 to shift the repeating cycle and subtract the equations to eliminate the infinite recurring digits, yielding an exact fraction.',
        formula: '10^m · x - x = integer to eliminate cycle',
        example: {
          text: '0.[6] = 2/3, 0.1[6] = 1/6',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '6',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
    ],
    es: [
      {
        id: 'diff-denom-add',
        title: 'Suma de fracciones con distinto denominador (MCM)',
        keywords: ['suma de fracciones', 'distinto denominador', 'mínimo común múltiplo', 'fracciones heterogéneas'],
        desc: 'Para sumar fracciones con diferente denominador, calcula el Mínimo Común Múltiplo (MCM) de los denominadores para amplificar a fracciones equivalentes y sumar los numeradores.',
        formula: 'a/b + c/d = (a·k1 + c·k2) / MCM(b, d)',
        example: {
          text: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '3',
          op: '+',
          w2: '0',
          n2: '1',
          d2: '4',
        },
      },
      {
        id: 'diff-denom-sub',
        title: 'Resta de fracciones con diferente denominador',
        keywords: ['resta de fracciones con pasos', 'común denominador resta', 'fracciones heterogéneas resta'],
        desc: 'Halla el MCM de los denominadores, amplifica los numeradores y resta el segundo numerador del primero. Simplifica al final si es posible.',
        formula: 'a/b - c/d = (a·k1 - c·k2) / MCM(b, d)',
        example: {
          text: '5/6 - 3/8 = 20/24 - 9/24 = 11/24',
          mixed: false,
          w1: '0',
          n1: '5',
          d1: '6',
          op: '-',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'cross-simplify-mul',
        title: 'Multiplicación de fracciones y simplificación cruzada',
        keywords: ['multiplicar fracciones calculadora', 'simplificar cruzado', 'regla de multiplicación fracciones'],
        desc: 'Multiplica numeradores entre sí y denominadores entre sí. Antes de multiplicar, simplifica en cruz dividiendo factores comunes para facilitar la cuenta.',
        formula: '(a/b) × (c/d) = (a × c) / (b × d)',
        example: {
          text: '4/9 × 3/8 = (simplificar en cruz 4 con 8, 3 con 9) = 1/6',
          mixed: false,
          w1: '0',
          n1: '4',
          d1: '9',
          op: '×',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'reciprocal-div',
        title: 'División de fracciones multiplicando por el inverso',
        keywords: ['división de fracciones calculadora', 'invertir y multiplicar', 'fracción inversa'],
        desc: 'Para dividir fracciones, mantén la primera fracción, cambia la división por multiplicación e invierte el numerador y denominador de la segunda fracción.',
        formula: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)',
        example: {
          text: '7/10 ÷ 2/5 = 7/10 × 5/2 = 35/20 = 7/4 = 1 3/4',
          mixed: false,
          w1: '0',
          n1: '7',
          d1: '10',
          op: '÷',
          w2: '0',
          n2: '2',
          d2: '5',
        },
      },
      {
        id: 'mixed-arithmetic',
        title: 'Operaciones con números mixtos (conversión a impropia)',
        keywords: ['calculadora de fracciones mixtas', 'convertir mixto a impropia', 'fracciones mixtas suma y multiplicación'],
        desc: 'Antes de multiplicar o dividir números mixtos, conviértelos siempre en fracciones impropias (numerador = entero × denominador + numerador original).',
        formula: 'A(b/c) = (A·c + b) / c',
        example: {
          text: '2 1/3 × 1 1/2 = 7/3 × 3/2 = 7/2 = 3 1/2',
          mixed: true,
          w1: '2',
          n1: '1',
          d1: '3',
          op: '×',
          w2: '1',
          n2: '1',
          d2: '2',
        },
      },
      {
        id: 'gcd-reduction-shortdiv',
        title: 'Simplificación de fracciones con Máximo Común Divisor (MCD)',
        keywords: ['simplificar fracciones calculadora', 'fracción irreducible', 'MCD descomposición'],
        desc: 'Halla el Máximo Común Divisor (MCD) del numerador y denominador dividiendo sucesivamente entre factores primos, y divide ambos entre el MCD.',
        formula: 'MCD(a, b) simplificación a irreducible',
        example: {
          text: '48/64 = (48÷16)/(64÷16) = 3/4',
          mixed: false,
          w1: '0',
          n1: '48',
          d1: '64',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
      {
        id: 'negative-fraction',
        title: 'Fracciones negativas y números racionales con signo',
        keywords: ['fracciones negativas calculadora', 'números racionales con signo', 'suma de fracciones negativas'],
        desc: 'Aplica la regla de los signos: negativo por negativo es positivo; negativo más negativo da resultado negativo. Escribe el signo menos centrado.',
        formula: '(-a/b) × (-c/d) = +(a·c)/(b·d)',
        example: {
          text: '-1/2 - 2/3 = -3/6 - 4/6 = -7/6',
          mixed: false,
          w1: '0',
          n1: '-1',
          d1: '2',
          op: '-',
          w2: '0',
          n2: '2',
          d2: '3',
        },
      },
      {
        id: 'decimal-to-frac-pure',
        title: 'Conversión de decimales periódicos a fracciones exactas',
        keywords: ['decimal periódico a fracción', 'pasar 0.333 a fracción', 'fracción generatriz'],
        desc: 'Multiplica por potencias de 10 para desplazar el periodo y resta ecuaciones para cancelar la parte decimal infinita, obteniendo la fracción generatriz.',
        formula: '10^m · x - x para eliminar periodo',
        example: {
          text: '0.[6] = 2/3, 0.1[6] = 1/6',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '6',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
    ],
    fr: [
      {
        id: 'diff-denom-add',
        title: 'Addition de fractions avec dénominateurs différents (PPCM)',
        keywords: ['addition de fraction', 'dénominateurs différents', 'PPCM fractions', 'calcul fraction étape'],
        desc: 'Pour additionner des fractions de dénominateurs différents, trouvez le Plus Petit Commun Multiple (PPCM) afin de réduire au même dénominateur.',
        formula: 'a/b + c/d = (a·k1 + c·k2) / PPCM(b, d)',
        example: {
          text: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '3',
          op: '+',
          w2: '0',
          n2: '1',
          d2: '4',
        },
      },
      {
        id: 'diff-denom-sub',
        title: 'Soustraction de fractions avec dénominateurs différents',
        keywords: ['soustraction fraction', 'même dénominateur soustraction', 'calcul fraction avec étapes'],
        desc: 'Réduisez au même dénominateur grâce au PPCM, puis soustrayez les numérateurs tout en conservant le dénominateur commun.',
        formula: 'a/b - c/d = (a·k1 - c·k2) / PPCM(b, d)',
        example: {
          text: '5/6 - 3/8 = 20/24 - 9/24 = 11/24',
          mixed: false,
          w1: '0',
          n1: '5',
          d1: '6',
          op: '-',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'cross-simplify-mul',
        title: 'Multiplication de fractions et simplification croisée',
        keywords: ['multiplication fraction calculatrice', 'simplification croisée', 'règle multiplication fractions'],
        desc: 'Multipliez les numérateurs entre eux et les dénominateurs entre eux. Simplifiez au préalable en divisant les facteurs communs en croix.',
        formula: '(a/b) × (c/d) = (a × c) / (b × d)',
        example: {
          text: '4/9 × 3/8 = (simplifier 4 avec 8, 3 avec 9) = 1/6',
          mixed: false,
          w1: '0',
          n1: '4',
          d1: '9',
          op: '×',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'reciprocal-div',
        title: 'Division de fractions en multipliant par l’inverse',
        keywords: ['division de fraction calculatrice', 'inverse d’une fraction', 'multiplier par l’inverse'],
        desc: 'Diviser par une fraction revient à multiplier par son inverse. Conservez la première fraction, remplacez la division par une multiplication et inversez la seconde.',
        formula: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)',
        example: {
          text: '7/10 ÷ 2/5 = 7/10 × 5/2 = 35/20 = 7/4 = 1 3/4',
          mixed: false,
          w1: '0',
          n1: '7',
          d1: '10',
          op: '÷',
          w2: '0',
          n2: '2',
          d2: '5',
        },
      },
      {
        id: 'mixed-arithmetic',
        title: 'Nombres mixtes (conversion en fraction impropre)',
        keywords: ['fraction mixte calculatrice', 'convertir fraction mixte', 'nombre fractionnaire calcul'],
        desc: 'Avant de multiplier ou diviser un nombre mixte, convertissez-le impérativement en fraction impropre (numérateur = entier × dénominateur + numérateur initial).',
        formula: 'A(b/c) = (A·c + b) / c',
        example: {
          text: '2 1/3 × 1 1/2 = 7/3 × 3/2 = 7/2 = 3 1/2',
          mixed: true,
          w1: '2',
          n1: '1',
          d1: '3',
          op: '×',
          w2: '1',
          n2: '1',
          d2: '2',
        },
      },
      {
        id: 'gcd-reduction-shortdiv',
        title: 'Simplification de fraction avec le PGCD',
        keywords: ['simplification fraction calculatrice', 'fraction irréductible', 'PGCD calcul étapes'],
        desc: 'Trouvez le Plus Grand Commun Diviseur (PGCD) du numérateur et du dénominateur, puis divisez-les tous deux par ce PGCD pour obtenir la forme irréductible.',
        formula: 'PGCD(a, b) réduction irréductible',
        example: {
          text: '48/64 = (48÷16)/(64÷16) = 3/4',
          mixed: false,
          w1: '0',
          n1: '48',
          d1: '64',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
      {
        id: 'negative-fraction',
        title: 'Fractions négatives et nombres rationnels relatifs',
        keywords: ['fraction négative calculatrice', 'nombres rationnels relatifs', 'signe moins fraction'],
        desc: 'Appliquez les règles des signes pour les nombres relatifs : négatif multiplié par négatif donne positif. Le signe moins s’écrit devant la barre de fraction.',
        formula: '(-a/b) × (-c/d) = +(a·c)/(b·d)',
        example: {
          text: '-1/2 - 2/3 = -3/6 - 4/6 = -7/6',
          mixed: false,
          w1: '0',
          n1: '-1',
          d1: '2',
          op: '-',
          w2: '0',
          n2: '2',
          d2: '3',
        },
      },
      {
        id: 'decimal-to-frac-pure',
        title: 'Conversion de nombres décimaux périodiques en fractions',
        keywords: ['décimal périodique en fraction', 'transformer 0.333 en fraction', 'fraction génératrice'],
        desc: 'Multipliez par des puissances de 10 pour décaler la période et soustrayez les équations pour éliminer les décimales infinies.',
        formula: '10^m · x - x pour éliminer la période',
        example: {
          text: '0.[6] = 2/3, 0.1[6] = 1/6',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '6',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
    ],
    pt: [
      {
        id: 'diff-denom-add',
        title: 'Soma de frações com denominadores diferentes (MMC)',
        keywords: ['soma de fração', 'denominadores diferentes MMC', 'adição de frações passo a passo'],
        desc: 'Para somar frações com denominadores diferentes, calcule o Mínimo Múltiplo Comum (MMC) dos denominadores para encontrar frações equivalentes e somar os numeradores.',
        formula: 'a/b + c/d = (a·k1 + c·k2) / MMC(b, d)',
        example: {
          text: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '3',
          op: '+',
          w2: '0',
          n2: '1',
          d2: '4',
        },
      },
      {
        id: 'diff-denom-sub',
        title: 'Subtração de frações com denominadores diferentes',
        keywords: ['subtração de frações calculadora', 'mesmo denominador subtração', 'frações com denominadores diferentes'],
        desc: 'Reduza as frações ao mesmo denominador usando o MMC, divida pelo denominador de baixo e multiplique pelo de cima, subtraindo os numeradores.',
        formula: 'a/b - c/d = (a·k1 - c·k2) / MMC(b, d)',
        example: {
          text: '5/6 - 3/8 = 20/24 - 9/24 = 11/24',
          mixed: false,
          w1: '0',
          n1: '5',
          d1: '6',
          op: '-',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'cross-simplify-mul',
        title: 'Multiplicação de frações e simplificação cruzada',
        keywords: ['multiplicação de frações calculadora', 'simplificação cruzada', 'regra de multiplicar frações'],
        desc: 'Multiplique numerador com numerador e denominador com denominador. Antes de multiplicar, simplifique cruzado dividindo por fatores comuns.',
        formula: '(a/b) × (c/d) = (a × c) / (b × d)',
        example: {
          text: '4/9 × 3/8 = (simplificar cruzado 4 com 8, 3 com 9) = 1/6',
          mixed: false,
          w1: '0',
          n1: '4',
          d1: '9',
          op: '×',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'reciprocal-div',
        title: 'Divisão de frações multiplicando pelo inverso',
        keywords: ['divisão de fração calculadora', 'inverter a segunda fração', 'fração inversa'],
        desc: 'Para dividir frações, mantenha a primeira fração, troque a divisão por multiplicação e inverta o numerador e denominador da segunda fração.',
        formula: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)',
        example: {
          text: '7/10 ÷ 2/5 = 7/10 × 5/2 = 35/20 = 7/4 = 1 3/4',
          mixed: false,
          w1: '0',
          n1: '7',
          d1: '10',
          op: '÷',
          w2: '0',
          n2: '2',
          d2: '5',
        },
      },
      {
        id: 'mixed-arithmetic',
        title: 'Frações mistas (conversão para fração imprópria)',
        keywords: ['calculadora de fração mista', 'transformar número misto em fração imprópria'],
        desc: 'Antes de multiplicar ou dividir frações mistas, converta-as sempre em frações impróprias (novo numerador = inteiro × denominador + numerador anterior).',
        formula: 'A(b/c) = (A·c + b) / c',
        example: {
          text: '2 1/3 × 1 1/2 = 7/3 × 3/2 = 7/2 = 3 1/2',
          mixed: true,
          w1: '2',
          n1: '1',
          d1: '3',
          op: '×',
          w2: '1',
          n2: '1',
          d2: '2',
        },
      },
      {
        id: 'gcd-reduction-shortdiv',
        title: 'Simplificação de frações com Máximo Divisor Comum (MDC)',
        keywords: ['simplificar fração calculadora', 'fração irredutível', 'MDC simplificação'],
        desc: 'Encontre o Máximo Divisor Comum (MDC) entre numerador e denominador através de divisões sucessivas por números primos, e divida ambos pelo MDC.',
        formula: 'MDC(a, b) simplificação para irredutível',
        example: {
          text: '48/64 = (48÷16)/(64÷16) = 3/4',
          mixed: false,
          w1: '0',
          n1: '48',
          d1: '64',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
      {
        id: 'negative-fraction',
        title: 'Frações negativas e números racionais relativos',
        keywords: ['fração negativa calculadora', 'jogo de sinais fração', 'números racionais com sinal'],
        desc: 'Siga a regra dos sinais dos números inteiros: negativo vezes negativo dá positivo; negativo mais negativo permanece negativo.',
        formula: '(-a/b) × (-c/d) = +(a·c)/(b·d)',
        example: {
          text: '-1/2 - 2/3 = -3/6 - 4/6 = -7/6',
          mixed: false,
          w1: '0',
          n1: '-1',
          d1: '2',
          op: '-',
          w2: '0',
          n2: '2',
          d2: '3',
        },
      },
      {
        id: 'decimal-to-frac-pure',
        title: 'Conversão de dízimas periódicas para fração geratriz',
        keywords: ['dízima periódica para fração', 'fração geratriz calculadora', 'transformar 0.333 em fração'],
        desc: 'Multiplique por potências de 10 para deslocar o período e subtraia as equações algébricas para eliminar a parte decimal infinita.',
        formula: '10^m · x - x para eliminar período',
        example: {
          text: '0.[6] = 2/3, 0.1[6] = 1/6',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '6',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
    ],
    zh: [
      {
        id: 'diff-denom-add',
        title: '异分母分数加法计算 (LCM 通分)',
        keywords: ['异分母加法', '求公分母', '最小公倍数通分', '小学五年级分数加法'],
        desc: '异分母分数不能直接将分子相加。必须先求出两分母的最小公倍数 (LCM)，通分扩倍成同分母分数后，分母保持不变，分子直接相加，最后检验约分。',
        formula: 'a/b + c/d = (a·k1 + c·k2) / LCM(b, d)',
        example: {
          text: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '3',
          op: '+',
          w2: '0',
          n2: '1',
          d2: '4',
        },
      },
      {
        id: 'diff-denom-sub',
        title: '异分母分数减法计算 (通分相减)',
        keywords: ['异分母减法', '分数相减怎么算', '通分退位', '分数计算步骤'],
        desc: '通分使分母相同，保持分母不变，用被减数的分子减去减数的分子。若计算结果为假分数，可转为带分数。',
        formula: 'a/b - c/d = (a·k1 - c·k2) / LCM(b, d)',
        example: {
          text: '5/6 - 3/8 = 20/24 - 9/24 = 11/24',
          mixed: false,
          w1: '0',
          n1: '5',
          d1: '6',
          op: '-',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'cross-simplify-mul',
        title: '分数乘法与交叉约分技巧 (Cross Simplification)',
        keywords: ['分数乘法计算器', '交叉约分口诀', '分子乘分子分母乘分母', '分数乘分数'],
        desc: '分数乘法规则：分子相乘作分子，分母相乘作分母。在相乘前，可以交叉寻找两对“分子与分母”的最大公因数提前约分，大幅缩减计算量并杜绝算错。',
        formula: '(a/b) × (c/d) = (a × c) / (b × d)',
        example: {
          text: '4/9 × 3/8 = (4与8约分, 3与9约分) = 1/6',
          mixed: false,
          w1: '0',
          n1: '4',
          d1: '9',
          op: '×',
          w2: '0',
          n2: '3',
          d2: '8',
        },
      },
      {
        id: 'reciprocal-div',
        title: '分数除法与乘倒数法则 (Reciprocal)',
        keywords: ['分数除法怎么算', '颠倒相乘', '倒数计算器', '小学数学分数除法'],
        desc: '甲数除以乙数（0除外），等于甲数乘乙数的倒数。除法计算关键步骤是：被除数保持不动，将除号“÷”变为乘号“×”，将后面的除数分子分母上下颠倒。',
        formula: '(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)',
        example: {
          text: '7/10 ÷ 2/5 = 7/10 × 5/2 = 35/20 = 7/4 = 1又3/4',
          mixed: false,
          w1: '0',
          n1: '7',
          d1: '10',
          op: '÷',
          w2: '0',
          n2: '2',
          d2: '5',
        },
      },
      {
        id: 'mixed-arithmetic',
        title: '带分数加减乘除四则运算 (化假分数)',
        keywords: ['带分数计算器', '带分数怎么乘除', '带分数化假分数', '假分数与带分数互化'],
        desc: '进行带分数乘除法运算时，必须先将带分数全部化为假分数（分子 = 整数 × 分母 + 原分子）。加减法既可先化假分数，也可整数与分数分别计算。',
        formula: 'A(b/c) = (A·c + b) / c',
        example: {
          text: '2又1/3 × 1又1/2 = 7/3 × 3/2 = 7/2 = 3又1/2',
          mixed: true,
          w1: '2',
          n1: '1',
          d1: '3',
          op: '×',
          w2: '1',
          n2: '1',
          d2: '2',
        },
      },
      {
        id: 'gcd-reduction-shortdiv',
        title: '分数约分与短除法求最大公因数 (GCD)',
        keywords: ['分数约分工具', '短除法在线计算', '最简分数判定', '最大公因数约分'],
        desc: '利用质数（2、3、5、7、11等）连续对分子和分母做短除法，左侧提取出的全部公因数乘积就是 GCD。分子分母同除以 GCD 即可得到最简分数。',
        formula: 'GCD(a, b) 提取法，化简到分子分母互质',
        example: {
          text: '48/64 = (48÷16)/(64÷16) = 3/4',
          mixed: false,
          w1: '0',
          n1: '48',
          d1: '64',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
      {
        id: 'negative-fraction',
        title: '有理数负分数四则运算 (初中数学)',
        keywords: ['负分数计算器', '有理数加减乘除', '负负得正分数', '初一数学分数运算'],
        desc: '负分数运算严格遵循有理数正负号法则：同号相乘除得正，异号相乘除得负；负数加减注意括号与绝对值大小。书写时负号统一放在分数线正前方。',
        formula: '(-a/b) × (-c/d) = +(a·c)/(b·d)',
        example: {
          text: '-1/2 - 2/3 = -3/6 - 4/6 = -7/6',
          mixed: false,
          w1: '0',
          n1: '-1',
          d1: '2',
          op: '-',
          w2: '0',
          n2: '2',
          d2: '3',
        },
      },
      {
        id: 'decimal-to-frac-pure',
        title: '纯循环小数与混循环小数转分数 (解方程法)',
        keywords: ['循环小数转分数', '0.333化分数', '无限循环小数怎么变分数', '循环节代数推导'],
        desc: '利用乘以 10^n 移动小数点，建立两式相减消去无限循环节。例如 0.[3] 乘以 10 得到 10x = 3.[3]，两式相减 9x = 3 得 x = 1/3。',
        formula: '10^m · x - x 消去循环节',
        example: {
          text: '0.[6] = 2/3, 0.1[6] = 1/6',
          mixed: false,
          w1: '0',
          n1: '1',
          d1: '6',
          op: '+',
          w2: '0',
          n2: '0',
          d2: '1',
        },
      },
    ],
  };

  const topics = localizedTopics[lang] || localizedTopics.en;

  const filteredTopics = searchFilter.trim()
    ? topics.filter(
        (tItem) =>
          tItem.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          tItem.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
          tItem.keywords.some((k) => k.toLowerCase().includes(searchFilter.toLowerCase()))
      )
    : topics;

  return (
    <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Hash className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t.nav.seoHub}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.tagline}
          </p>
        </div>

        {/* Search filter input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search keywords..."
            className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 sm:w-60"
          />
        </div>
      </div>

      {/* Grid of topic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTopics.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>

              {/* Tag metadata rendered as clean text with dots */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                {item.keywords.map((kw, i) => (
                  <React.Fragment key={kw}>
                    <span>{kw}</span>
                    {i < item.keywords.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>

              <div className="text-[11px] font-mono p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                {item.formula}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-xs">
              <div className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                {item.example.text}
              </div>
              <button
                type="button"
                onClick={() => {
                  onLoadPreset(
                    item.example.mixed,
                    item.example.w1,
                    item.example.n1,
                    item.example.d1,
                    item.example.op,
                    item.example.w2,
                    item.example.n2,
                    item.example.d2
                  );
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 font-medium transition-colors text-[11px] shadow-xs"
              >
                <span>{t.actions.loadExample}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
