/**
 * Fraction mathematical calculations, step generation, conversions,
 * short division ladders, and multi-fraction expression parsing.
 */

export interface Fraction {
  n: number; // numerator
  d: number; // denominator (d > 0)
}

export interface CalculationStep {
  title: string;
  latex?: string;
  desc: string;
  highlight?: boolean;
}

export interface ShortDivisionRow {
  divisor: number;
  quotients: number[];
}

export interface ShortDivisionData {
  rows: ShortDivisionRow[];
  finalQuotients: number[];
  gcd: number;
  lcm: number;
}

export interface CalculationResult {
  input1: Fraction;
  input2: Fraction;
  operator: '+' | '-' | '×' | '÷';
  rawResult: Fraction;
  simplified: Fraction;
  mixed?: {
    whole: number;
    n: number;
    d: number;
  };
  decimal: number;
  percentage: string;
  isInteger: boolean;
  steps: CalculationStep[];
  gcdVal: number;
  lcmVal?: number;
  shortDivision?: ShortDivisionData;
}

// Greatest Common Divisor using Euclidean algorithm
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

// Least Common Multiple
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Multi-number LCM
export function multiLcm(numbers: number[]): number {
  if (numbers.length === 0) return 1;
  return numbers.reduce((acc, curr) => lcm(acc, curr), numbers[0]);
}

// Simplify fraction
export function simplify(f: Fraction): Fraction {
  if (f.d === 0) return { n: 0, d: 1 };
  if (f.n === 0) return { n: 0, d: 1 };
  const sign = (f.n < 0 ? -1 : 1) * (f.d < 0 ? -1 : 1);
  const common = gcd(f.n, f.d);
  return {
    n: sign * (Math.abs(f.n) / common),
    d: Math.abs(f.d) / common,
  };
}

// Convert mixed fraction to improper fraction
export function mixedToImproper(whole: number, n: number, d: number): Fraction {
  if (d === 0) return { n: 0, d: 1 };
  const sign = whole < 0 ? -1 : 1;
  const absWhole = Math.abs(whole);
  const improperNumerator = sign * (absWhole * d + n);
  return { n: improperNumerator, d };
}

// Convert improper fraction to mixed fraction
export function improperToMixed(f: Fraction): { whole: number; n: number; d: number } | null {
  const simp = simplify(f);
  if (simp.d === 1 || Math.abs(simp.n) < simp.d) {
    return null;
  }
  const whole = Math.trunc(simp.n / simp.d);
  const rem = Math.abs(simp.n % simp.d);
  if (rem === 0) return null;
  return {
    whole,
    n: rem,
    d: simp.d,
  };
}

// Format Fraction to standard readable string
export function formatFraction(f: Fraction): string {
  if (f.d === 1) return `${f.n}`;
  return `${f.n}/${f.d}`;
}

// Compute real step-by-step Short Division ladder (短除法)
export function computeShortDivision(num1: number, num2: number): ShortDivisionData {
  let a = Math.abs(num1);
  let b = Math.abs(num2);
  const rows: ShortDivisionRow[] = [];
  const primeCandidates = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

  let divisorProduct = 1;

  for (const p of primeCandidates) {
    while (a % p === 0 && b % p === 0 && (a > 1 || b > 1)) {
      rows.push({
        divisor: p,
        quotients: [a, b],
      });
      a /= p;
      b /= p;
      divisorProduct *= p;
    }
  }

  // Check any remaining common factor > 47
  let g = gcd(a, b);
  if (g > 1) {
    rows.push({
      divisor: g,
      quotients: [a, b],
    });
    a /= g;
    b /= g;
    divisorProduct *= g;
  }

  const finalQuotients = [a, b];
  const lcmVal = divisorProduct * a * b;

  return {
    rows,
    finalQuotients,
    gcd: divisorProduct,
    lcm: lcmVal,
  };
}

// Arithmetic primitives
export function fracAdd(a: Fraction, b: Fraction): Fraction {
  return simplify({ n: a.n * b.d + b.n * a.d, d: a.d * b.d });
}
export function fracSub(a: Fraction, b: Fraction): Fraction {
  return simplify({ n: a.n * b.d - b.n * a.d, d: a.d * b.d });
}
export function fracMul(a: Fraction, b: Fraction): Fraction {
  return simplify({ n: a.n * b.n, d: a.d * b.d });
}
export function fracDiv(a: Fraction, b: Fraction): Fraction {
  if (b.n === 0) throw new Error('除数不能为0');
  return simplify({ n: a.n * b.d, d: a.d * b.n });
}

// Detailed calculation of two fractions with localized steps
export function computeFractionArithmetic(
  f1: Fraction,
  op: '+' | '-' | '×' | '÷',
  f2: Fraction,
  lang: 'en' | 'es' | 'fr' | 'pt' | 'zh' = 'en'
): CalculationResult {
  const steps: CalculationStep[] = [];

  // Validate denominators
  if (f1.d === 0 || f2.d === 0) {
    const msgMap = {
      en: 'Denominator cannot be zero',
      es: 'El denominador no puede ser cero',
      fr: 'Le dénominateur ne peut pas être zéro',
      pt: 'O denominador não pode ser zero',
      zh: '分母不能为 0',
    };
    throw new Error(msgMap[lang]);
  }

  if (op === '÷' && f2.n === 0) {
    const msgMap = {
      en: 'Cannot divide by zero',
      es: 'No se puede dividir entre cero',
      fr: 'Division par zéro impossible',
      pt: 'Não é possível dividir por zero',
      zh: '除数不能为 0',
    };
    throw new Error(msgMap[lang]);
  }

  const n1 = f1.d < 0 ? -f1.n : f1.n;
  const d1 = Math.abs(f1.d);
  const n2 = f2.d < 0 ? -f2.n : f2.n;
  const d2 = Math.abs(f2.d);

  const step1Titles = {
    en: 'Step 1: Verify expression and standard fraction form',
    es: 'Paso 1: Confirmar expresión y forma fraccionaria estándar',
    fr: "Étape 1 : Vérifier l'expression et la forme standard",
    pt: 'Etapa 1: Confirmar a expressão e forma fracionária padrão',
    zh: '步骤 1：确认算式与化标准形式',
  };

  const step1Desc = {
    en: `Original expression: ${formatFraction({ n: n1, d: d1 })} ${op} ${formatFraction({ n: n2, d: d2 })}`,
    es: `Expresión original: ${formatFraction({ n: n1, d: d1 })} ${op} ${formatFraction({ n: n2, d: d2 })}`,
    fr: `Expression originale : ${formatFraction({ n: n1, d: d1 })} ${op} ${formatFraction({ n: n2, d: d2 })}`,
    pt: `Expressão original: ${formatFraction({ n: n1, d: d1 })} ${op} ${formatFraction({ n: n2, d: d2 })}`,
    zh: `原式：${formatFraction({ n: n1, d: d1 })} ${op} ${formatFraction({ n: n2, d: d2 })}`,
  };

  steps.push({
    title: step1Titles[lang],
    desc: step1Desc[lang],
    latex: `\\frac{${n1}}{${d1}} ${op === '×' ? '\\times' : op === '÷' ? '\\div' : op} \\frac{${n2}}{${d2}}`,
  });

  let rawN = 0;
  let rawD = 1;
  let lcmVal: number | undefined;
  let shortDivData: ShortDivisionData | undefined;

  if (op === '+' || op === '-') {
    if (d1 === d2) {
      rawD = d1;
      rawN = op === '+' ? n1 + n2 : n1 - n2;
      const sameDenTitles = {
        en: 'Step 2: Add/subtract numerators directly with like denominators',
        es: 'Paso 2: Sumar/restar numeradores directamente con igual denominador',
        fr: 'Étape 2 : Même dénominateur, calcul direct des numérateurs',
        pt: 'Etapa 2: Mesmo denominador, somar/subtrair numeradores diretamente',
        zh: '步骤 2：同分母直接相加减',
      };
      const sameDenDesc = {
        en: `Denominators are equal (${d1}). Keep denominator and calculate: ${n1} ${op} ${n2} = ${rawN}`,
        es: `Denominadores iguales (${d1}). Mantener denominador y calcular: ${n1} ${op} ${n2} = ${rawN}`,
        fr: `Mêmes dénominateurs (${d1}). Garder le dénominateur et calculer : ${n1} ${op} ${n2} = ${rawN}`,
        pt: `Denominadores iguais (${d1}). Manter denominador e calcular: ${n1} ${op} ${n2} = ${rawN}`,
        zh: `分母相同（均为 ${d1}），保持分母不变，只将分子进行${op === '+' ? '加法' : '减法'}：${n1} ${op} ${n2} = ${rawN}`,
      };
      steps.push({
        title: sameDenTitles[lang],
        desc: sameDenDesc[lang],
        latex: `\\frac{${n1} ${op} ${n2}}{${d1}} = \\frac{${rawN}}{${rawD}}`,
      });
    } else {
      lcmVal = lcm(d1, d2);
      shortDivData = computeShortDivision(d1, d2);

      const factor1 = lcmVal / d1;
      const factor2 = lcmVal / d2;
      const scaledN1 = n1 * factor1;
      const scaledN2 = n2 * factor2;

      const lcmTitles = {
        en: 'Step 2: Find Least Common Multiple (LCM) for common denominator',
        es: 'Paso 2: Hallar el Mínimo Común Múltiplo (MCM) para el común denominador',
        fr: 'Étape 2 : Trouver le Plus Petit Commun Multiple (PPCM)',
        pt: 'Etapa 2: Encontrar o Mínimo Múltiplo Comum (MMC)',
        zh: '步骤 2：异分母通分，求两分母最小公倍数',
      };
      const lcmDesc = {
        en: `Denominators are ${d1} and ${d2}. LCM(${d1}, ${d2}) = ${lcmVal}.`,
        es: `Los denominadores son ${d1} y ${d2}. MCM(${d1}, ${d2}) = ${lcmVal}.`,
        fr: `Les dénominateurs sont ${d1} et ${d2}. PPCM(${d1}, ${d2}) = ${lcmVal}.`,
        pt: `Os denominadores são ${d1} e ${d2}. MMC(${d1}, ${d2}) = ${lcmVal}.`,
        zh: `分母分别为 ${d1} 与 ${d2}，求得最小公倍数 [${d1}, ${d2}] = ${lcmVal} 作为公分母。`,
      };
      steps.push({
        title: lcmTitles[lang],
        desc: lcmDesc[lang],
      });

      const scaleTitles = {
        en: 'Step 3: Scale fractions to equivalent common denominator',
        es: 'Paso 3: Amplificar fracciones al común denominador',
        fr: 'Étape 3 : Réduire au même dénominateur',
        pt: 'Etapa 3: Multiplicar frações para o mesmo denominador',
        zh: '步骤 3：依据分数基本性质分别扩倍',
      };
      const scaleDesc = {
        en: `Multiply fraction 1 by ${factor1}: (${n1}×${factor1})/(${d1}×${factor1}) = ${scaledN1}/${lcmVal}\nMultiply fraction 2 by ${factor2}: (${n2}×${factor2})/(${d2}×${factor2}) = ${scaledN2}/${lcmVal}`,
        es: `Multiplicar fracción 1 por ${factor1}: (${n1}×${factor1})/(${d1}×${factor1}) = ${scaledN1}/${lcmVal}\nMultiplicar fracción 2 por ${factor2}: (${n2}×${factor2})/(${d2}×${factor2}) = ${scaledN2}/${lcmVal}`,
        fr: `Multiplier fraction 1 par ${factor1} : (${n1}×${factor1})/(${d1}×${factor1}) = ${scaledN1}/${lcmVal}\nMultiplier fraction 2 par ${factor2} : (${n2}×${factor2})/(${d2}×${factor2}) = ${scaledN2}/${lcmVal}`,
        pt: `Multiplicar fração 1 por ${factor1}: (${n1}×${factor1})/(${d1}×${factor1}) = ${scaledN1}/${lcmVal}\nMultiplicar fração 2 por ${factor2}: (${n2}×${factor2})/(${d2}×${factor2}) = ${scaledN2}/${lcmVal}`,
        zh: `第一个分数同乘 ${factor1}：(${n1}×${factor1})/(${d1}×${factor1}) = ${scaledN1}/${lcmVal}\n第二个分数同乘 ${factor2}：(${n2}×${factor2})/(${d2}×${factor2}) = ${scaledN2}/${lcmVal}`,
      };
      steps.push({
        title: scaleTitles[lang],
        desc: scaleDesc[lang],
        latex: `\\frac{${scaledN1}}{${lcmVal}} ${op} \\frac{${scaledN2}}{${lcmVal}}`,
      });

      rawD = lcmVal;
      rawN = op === '+' ? scaledN1 + scaledN2 : scaledN1 - scaledN2;

      const calcNumTitles = {
        en: 'Step 4: Keep common denominator and calculate numerators',
        es: 'Paso 4: Mantener común denominador y operar numeradores',
        fr: 'Étape 4 : Garder le dénominateur commun et calculer les numérateurs',
        pt: 'Etapa 4: Manter denominador comum e calcular os numeradores',
        zh: '步骤 4：同分母分子相加减',
      };
      const calcNumDesc = {
        en: `Denominator remains ${rawD}. Numerators: ${scaledN1} ${op} ${scaledN2} = ${rawN}`,
        es: `El denominador se mantiene en ${rawD}. Numeradores: ${scaledN1} ${op} ${scaledN2} = ${rawN}`,
        fr: `Le dénominateur reste ${rawD}. Numérateurs : ${scaledN1} ${op} ${scaledN2} = ${rawN}`,
        pt: `O denominador permanece ${rawD}. Numeradores: ${scaledN1} ${op} ${scaledN2} = ${rawN}`,
        zh: `通分后保持公分母 ${rawD} 不变，分子计算：${scaledN1} ${op} ${scaledN2} = ${rawN}`,
      };
      steps.push({
        title: calcNumTitles[lang],
        desc: calcNumDesc[lang],
        latex: `\\frac{${scaledN1} ${op} ${scaledN2}}{${rawD}} = \\frac{${rawN}}{${rawD}}`,
      });
    }
  } else if (op === '×') {
    rawN = n1 * n2;
    rawD = d1 * d2;

    const mulTitles = {
      en: 'Step 2: Multiply numerators and denominators',
      es: 'Paso 2: Multiplicar numeradores y denominadores',
      fr: 'Étape 2 : Multiplier les numérateurs et dénominateurs',
      pt: 'Etapa 2: Multiplicar numeradores e denominadores',
      zh: '步骤 2：分子相乘作分子，分母相乘作分母',
    };
    const mulDesc = {
      en: `Numerators: ${n1} × ${n2} = ${rawN}; Denominators: ${d1} × ${d2} = ${rawD}`,
      es: `Numeradores: ${n1} × ${n2} = ${rawN}; Denominadores: ${d1} × ${d2} = ${rawD}`,
      fr: `Numérateurs : ${n1} × ${n2} = ${rawN} ; Dénominateurs : ${d1} × ${d2} = ${rawD}`,
      pt: `Numeradores: ${n1} × ${n2} = ${rawN}; Denominadores: ${d1} × ${d2} = ${rawD}`,
      zh: `分子相乘：${n1} × ${n2} = ${rawN}；分母相乘：${d1} × ${d2} = ${rawD}`,
    };
    steps.push({
      title: mulTitles[lang],
      desc: mulDesc[lang],
      latex: `\\frac{${n1} \\times ${n2}}{${d1} \\times ${d2}} = \\frac{${rawN}}{${rawD}}`,
    });
  } else if (op === '÷') {
    const recipN = d2;
    const recipD = n2;

    const divTitles = {
      en: 'Step 2: Multiply by the reciprocal of the divisor',
      es: 'Paso 2: Multiplicar por el recíproco del divisor',
      fr: 'Étape 2 : Multiplier par l’inverse du diviseur',
      pt: 'Etapa 2: Multiplicar pelo inverso do divisor',
      zh: '步骤 2：除以一个分数等于乘它的倒数',
    };
    const divDesc = {
      en: `Reciprocal of ${formatFraction({ n: n2, d: d2 })} is ${formatFraction({ n: recipN, d: recipD })}.`,
      es: `El recíproco de ${formatFraction({ n: n2, d: d2 })} es ${formatFraction({ n: recipN, d: recipD })}.`,
      fr: `L’inverse de ${formatFraction({ n: n2, d: d2 })} est ${formatFraction({ n: recipN, d: recipD })}.`,
      pt: `O inverso de ${formatFraction({ n: n2, d: d2 })} é ${formatFraction({ n: recipN, d: recipD })}.`,
      zh: `分数除法转化为乘法：${formatFraction({ n: n2, d: d2 })} 的倒数是 ${formatFraction({ n: recipN, d: recipD })}。`,
    };
    steps.push({
      title: divTitles[lang],
      desc: divDesc[lang],
      latex: `\\frac{${n1}}{${d1}} \\div \\frac{${n2}}{${d2}} = \\frac{${n1}}{${d1}} \\times \\frac{${recipN}}{${recipD}}`,
    });

    rawN = n1 * recipN;
    rawD = d1 * recipD;

    if (rawD < 0) {
      rawN = -rawN;
      rawD = -rawD;
    }

    const mul2Titles = {
      en: 'Step 3: Multiply numerators and denominators',
      es: 'Paso 3: Multiplicar numeradores y denominadores',
      fr: 'Étape 3 : Multiplier les numérateurs et dénominateurs',
      pt: 'Etapa 3: Multiplicar numeradores e denominadores',
      zh: '步骤 3：分子与分母分别相乘',
    };
    steps.push({
      title: mul2Titles[lang],
      desc: `${n1} × ${recipN} = ${rawN}; ${d1} × ${recipD} = ${rawD}`,
      latex: `\\frac{${n1} \\times ${recipN}}{${d1} \\times ${recipD}} = \\frac{${rawN}}{${rawD}}`,
    });
  }

  // Simplification
  const rawFrac: Fraction = { n: rawN, d: rawD };
  const simpFrac = simplify(rawFrac);
  const g = gcd(rawN, rawD);

  if (g > 1 && simpFrac.n !== 0) {
    if (!shortDivData && Math.abs(rawN) > 1 && rawD > 1) {
      shortDivData = computeShortDivision(Math.abs(rawN), rawD);
    }
    const gcdTitles = {
      en: 'Step 5: Reduce using Greatest Common Divisor (GCD)',
      es: 'Paso 5: Simplificar usando el Máximo Común Divisor (MCD)',
      fr: 'Étape 5 : Réduire avec le Plus Grand Commun Diviseur (PGCD)',
      pt: 'Etapa 5: Simplificar usando o Máximo Divisor Comum (MDC)',
      zh: '步骤 5：求最大公因数并化为最简分数',
    };
    const gcdDesc = {
      en: `GCD(${Math.abs(rawN)}, ${rawD}) = ${g}. Divide both numerator and denominator by ${g}: ${rawN} ÷ ${g} = ${simpFrac.n}, ${rawD} ÷ ${g} = ${simpFrac.d}.`,
      es: `MCD(${Math.abs(rawN)}, ${rawD}) = ${g}. Dividir numerador y denominador entre ${g}: ${rawN} ÷ ${g} = ${simpFrac.n}, ${rawD} ÷ ${g} = ${simpFrac.d}.`,
      fr: `PGCD(${Math.abs(rawN)}, ${rawD}) = ${g}. Diviser par ${g} : ${rawN} ÷ ${g} = ${simpFrac.n}, ${rawD} ÷ ${g} = ${simpFrac.d}.`,
      pt: `MDC(${Math.abs(rawN)}, ${rawD}) = ${g}. Dividir por ${g}: ${rawN} ÷ ${g} = ${simpFrac.n}, ${rawD} ÷ ${g} = ${simpFrac.d}.`,
      zh: `分子 ${rawN} 与分母 ${rawD} 的最大公因数 GCD(${Math.abs(rawN)}, ${rawD}) = ${g}。\n分子分母同时除以 ${g}：${rawN} ÷ ${g} = ${simpFrac.n}，${rawD} ÷ ${g} = ${simpFrac.d}。`,
    };
    steps.push({
      title: gcdTitles[lang],
      desc: gcdDesc[lang],
      latex: `\\frac{${rawN} \\div ${g}}{${rawD} \\div ${g}} = \\frac{${simpFrac.n}}{${simpFrac.d}}`,
      highlight: true,
    });
  } else {
    const simpTitles = {
      en: 'Step 5: Fraction is already in simplest form',
      es: 'Paso 5: La fracción ya es irreducible',
      fr: 'Étape 5 : La fraction est déjà irréductible',
      pt: 'Etapa 5: A fração já é irredutível',
      zh: '步骤 5：约分检查：当前已是最简分数',
    };
    const simpDesc = {
      en: `Numerator ${simpFrac.n} and denominator ${simpFrac.d} are coprime (GCD = 1).`,
      es: `El numerador ${simpFrac.n} y denominador ${simpFrac.d} son primos entre sí (MCD = 1).`,
      fr: `Le numérateur ${simpFrac.n} et dénominateur ${simpFrac.d} sont premiers entre eux (PGCD = 1).`,
      pt: `O numerador ${simpFrac.n} e denominador ${simpFrac.d} são primos entre si (MDC = 1).`,
      zh: `分子 ${simpFrac.n} 与分母 ${simpFrac.d} 互质（最大公因数为 1），无需化简。`,
    };
    steps.push({
      title: simpTitles[lang],
      desc: simpDesc[lang],
      latex: `\\frac{${simpFrac.n}}{${simpFrac.d}}`,
      highlight: true,
    });
  }

  const mixed = improperToMixed(simpFrac);
  if (mixed) {
    const mixedTitles = {
      en: 'Step 6: Convert improper fraction to mixed number',
      es: 'Paso 6: Convertir fracción impropia a número mixto',
      fr: 'Étape 6 : Convertir en nombre mixte',
      pt: 'Etapa 6: Converter fração imprópria em número misto',
      zh: '步骤 6：假分数化为带分数',
    };
    const mixedDesc = {
      en: `${Math.abs(simpFrac.n)} ÷ ${simpFrac.d} = ${Math.abs(mixed.whole)} with remainder ${mixed.n}, written as ${mixed.whole < 0 ? '-' : ''}${Math.abs(mixed.whole)} ${mixed.n}/${mixed.d}`,
      es: `${Math.abs(simpFrac.n)} ÷ ${simpFrac.d} = ${Math.abs(mixed.whole)} con resto ${mixed.n}, escrito como ${mixed.whole < 0 ? '-' : ''}${Math.abs(mixed.whole)} ${mixed.n}/${mixed.d}`,
      fr: `${Math.abs(simpFrac.n)} ÷ ${simpFrac.d} = ${Math.abs(mixed.whole)} reste ${mixed.n}, s'écrit ${mixed.whole < 0 ? '-' : ''}${Math.abs(mixed.whole)} ${mixed.n}/${mixed.d}`,
      pt: `${Math.abs(simpFrac.n)} ÷ ${simpFrac.d} = ${Math.abs(mixed.whole)} com resto ${mixed.n}, escrito como ${mixed.whole < 0 ? '-' : ''}${Math.abs(mixed.whole)} ${mixed.n}/${mixed.d}`,
      zh: `假分数 ${simpFrac.n}/${simpFrac.d} 转化为带分数：${Math.abs(simpFrac.n)} ÷ ${simpFrac.d} = ${Math.abs(mixed.whole)} 余 ${mixed.n}，写作 ${mixed.whole < 0 ? '-' : ''}${Math.abs(mixed.whole)} 又 ${mixed.n}/${mixed.d}。`,
    };
    steps.push({
      title: mixedTitles[lang],
      desc: mixedDesc[lang],
      latex: `${simpFrac.n < 0 ? '-' : ''}${Math.abs(mixed.whole)}\\frac{${mixed.n}}{${mixed.d}}`,
    });
  }

  const decVal = Math.round((simpFrac.n / simpFrac.d) * 100000) / 100000;

  return {
    input1: { n: n1, d: d1 },
    input2: { n: n2, d: d2 },
    operator: op,
    rawResult: rawFrac,
    simplified: simpFrac,
    mixed: mixed || undefined,
    decimal: decVal,
    percentage: `${(decVal * 100).toFixed(2)}%`,
    isInteger: simpFrac.d === 1,
    steps,
    gcdVal: g,
    lcmVal,
    shortDivision: shortDivData,
  };
}

// Single fraction simplification with factor steps
export function simplifyFractionWithSteps(n: number, d: number) {
  if (d === 0) throw new Error('分母不能为 0');
  const sign = (n < 0 ? -1 : 1) * (d < 0 ? -1 : 1);
  const absN = Math.abs(n);
  const absD = Math.abs(d);
  const g = gcd(absN, absD);

  const simplified = {
    n: sign * (absN / g),
    d: absD / g,
  };

  const isProper = absN < absD;
  const mixed = improperToMixed(simplified);
  const shortDiv = computeShortDivision(absN, absD);

  return {
    original: { n, d },
    simplified,
    gcd: g,
    isAlreadySimplest: g === 1,
    isProper,
    isInteger: simplified.d === 1,
    mixed,
    decimal: Math.round((simplified.n / simplified.d) * 100000) / 100000,
    shortDiv,
  };
}

// Common denominator for an array of fractions
export function commonDenominatorFractions(list: Fraction[]) {
  const validList = list.filter((f) => f.d !== 0);
  if (validList.length === 0) {
    return {
      commonD: 1,
      items: [] as {
        original: Fraction;
        scaled: Fraction;
        factor: number;
        decimal: number;
      }[],
      sorted: [] as {
        original: Fraction;
        scaled: Fraction;
        factor: number;
        decimal: number;
      }[],
    };
  }

  const commonD = multiLcm(validList.map((f) => Math.abs(f.d)));
  const items = validList.map((f) => {
    const d = Math.abs(f.d);
    const n = f.d < 0 ? -f.n : f.n;
    const factor = commonD / d;
    return {
      original: { n, d },
      scaled: { n: n * factor, d: commonD },
      factor,
      decimal: n / d,
    };
  });

  // Sort from small to large
  const sorted = [...items].sort((a, b) => a.decimal - b.decimal);

  return {
    commonD,
    items,
    sorted,
  };
}

// Decimal to fraction
export function decimalToFraction(inputStr: string): {
  type: 'terminating' | 'pure_repeating' | 'mixed_repeating';
  input: string;
  result: Fraction;
  simplified: Fraction;
  steps: string[];
} {
  const clean = inputStr.trim();
  const isNegative = clean.startsWith('-');
  const unsigned = isNegative ? clean.substring(1) : clean;

  const repeatingMatch = unsigned.match(/^(\d+)?\.(\d*)\[(\d+)\]$/);

  if (repeatingMatch) {
    const wholeStr = repeatingMatch[1] || '0';
    const nonRepStr = repeatingMatch[2] || '';
    const repStr = repeatingMatch[3];

    const whole = parseInt(wholeStr, 10);
    const k = nonRepStr.length;
    const m = repStr.length;

    const steps: string[] = [];
    steps.push(`设 x = ${unsigned}`);

    if (k === 0) {
      const multiplier = Math.pow(10, m);
      const repVal = parseInt(repStr, 10);
      steps.push(`方程①：x = ${unsigned}`);
      steps.push(`方程两边同乘以 10^${m} = ${multiplier}：${multiplier}x = ${whole * multiplier + repVal}.${repStr}... (方程②)`);
      steps.push(`②式减去①式消去循环节：(${multiplier} - 1)x = ${whole * (multiplier - 1) + repVal}`);
      const rawN = whole * (multiplier - 1) + repVal;
      const rawD = multiplier - 1;
      const simp = simplify({ n: (isNegative ? -1 : 1) * rawN, d: rawD });
      steps.push(`解得 x = ${rawN}/${rawD}，约分后得到最简分数：${formatFraction(simp)}`);

      return {
        type: 'pure_repeating',
        input: clean,
        result: { n: (isNegative ? -1 : 1) * rawN, d: rawD },
        simplified: simp,
        steps,
      };
    } else {
      const mul1 = Math.pow(10, k);
      const mul2 = Math.pow(10, k + m);

      steps.push(`方程①：x = ${unsigned}`);
      steps.push(`两边同乘以 10^${k} = ${mul1} 使循环节移到小数点后：${mul1}x = ${whole}${nonRepStr}.${repStr}... (方程②)`);
      steps.push(`两边同乘以 10^${k + m} = ${mul2}：${mul2}x = ${whole}${nonRepStr}${repStr}.${repStr}... (方程③)`);
      steps.push(`③式减去②式：(${mul2} - ${mul1})x = ${parseInt(`${whole}${nonRepStr}${repStr}`, 10) - parseInt(`${whole}${nonRepStr}`, 10)}`);

      const rawN = parseInt(`${whole}${nonRepStr}${repStr}`, 10) - parseInt(`${whole}${nonRepStr}`, 10);
      const rawD = mul2 - mul1;
      const simp = simplify({ n: (isNegative ? -1 : 1) * rawN, d: rawD });
      steps.push(`得 x = ${rawN}/${rawD}，约分后得到最简分数：${formatFraction(simp)}`);

      return {
        type: 'mixed_repeating',
        input: clean,
        result: { n: (isNegative ? -1 : 1) * rawN, d: rawD },
        simplified: simp,
        steps,
      };
    }
  }

  const numVal = parseFloat(unsigned);
  if (isNaN(numVal)) {
    throw new Error('请输入有效的数字格式，如 0.75 或 0.[3]');
  }

  const parts = unsigned.split('.');
  if (parts.length === 1) {
    const intVal = parseInt(parts[0], 10);
    return {
      type: 'terminating',
      input: clean,
      result: { n: (isNegative ? -1 : 1) * intVal, d: 1 },
      simplified: { n: (isNegative ? -1 : 1) * intVal, d: 1 },
      steps: [`整数 ${intVal} 写成分数即为 ${intVal}/1`],
    };
  }

  const decimals = parts[1].length;
  const denominator = Math.pow(10, decimals);
  const numerator = Math.round(numVal * denominator);
  const steps: string[] = [
    `小数位数为 ${decimals} 位，分母为 10^${decimals} = ${denominator}`,
    `转化成分数形式为：${numerator}/${denominator}`,
  ];

  const simp = simplify({ n: (isNegative ? -1 : 1) * numerator, d: denominator });
  const g = gcd(numerator, denominator);
  if (g > 1) {
    steps.push(`求分子分母最大公因数 GCD(${numerator}, ${denominator}) = ${g}`);
    steps.push(`分子分母同时除以 ${g} 进行约分，得到最简分数：${formatFraction(simp)}`);
  } else {
    steps.push(`当前已是最简分数：${formatFraction(simp)}`);
  }

  return {
    type: 'terminating',
    input: clean,
    result: { n: (isNegative ? -1 : 1) * numerator, d: denominator },
    simplified: simp,
    steps,
  };
}

// Multi-fraction continuous expression evaluation
export interface MultiTermStep {
  expr: string;
  desc: string;
}

export function evaluateMultiFractionExpression(rawExpr: string): {
  finalResult: Fraction;
  steps: MultiTermStep[];
  mixed?: { whole: number; n: number; d: number };
} {
  // Normalize tokens: replaces × with *, ÷ with /
  // Supports tokens like "1/2", "+", "2/3", "*", "3/4"
  // Clean spaces
  const clean = rawExpr.replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/');

  // Tokenize fractions and operators
  // A fraction token looks like: (\d+)/(\d+) or single number (\d+)
  // We can parse with Shunting Yard algorithm
  const tokens: (Fraction | string)[] = [];
  let i = 0;

  while (i < clean.length) {
    const ch = clean[i];
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') {
      tokens.push(ch);
      i++;
    } else if (/\d/.test(ch)) {
      let numStr = '';
      while (i < clean.length && /\d/.test(clean[i])) {
        numStr += clean[i];
        i++;
      }
      tokens.push({ n: parseInt(numStr, 10), d: 1 });
    } else {
      throw new Error(`不支持的字符: ${ch}`);
    }
  }

  // Combine consecutive [Fraction, '/', Fraction] into single Fraction if not ambiguous
  // Actually, standard infix to postfix with Fraction objects:
  // Precedence: * and / is 2, + and - is 1
  const outputQueue: (Fraction | string)[] = [];
  const opStack: string[] = [];

  const precedence = (op: string) => {
    if (op === '*' || op === '/') return 2;
    if (op === '+' || op === '-') return 1;
    return 0;
  };

  for (let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx];
    if (typeof token === 'object') {
      outputQueue.push(token);
    } else if (token === '(') {
      opStack.push(token);
    } else if (token === ')') {
      while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
        outputQueue.push(opStack.pop()!);
      }
      if (opStack.length > 0 && opStack[opStack.length - 1] === '(') {
        opStack.pop();
      }
    } else {
      // Operator
      while (
        opStack.length > 0 &&
        opStack[opStack.length - 1] !== '(' &&
        precedence(opStack[opStack.length - 1]) >= precedence(token)
      ) {
        outputQueue.push(opStack.pop()!);
      }
      opStack.push(token);
    }
  }

  while (opStack.length > 0) {
    outputQueue.push(opStack.pop()!);
  }

  // Evaluate postfix
  const evalStack: Fraction[] = [];
  const steps: MultiTermStep[] = [];

  for (const item of outputQueue) {
    if (typeof item === 'object') {
      evalStack.push(item);
    } else {
      if (evalStack.length < 2) {
        throw new Error('表达式格式错误');
      }
      const b = evalStack.pop()!;
      const a = evalStack.pop()!;
      let res: Fraction;
      let opName = item;

      if (item === '+') {
        res = fracAdd(a, b);
      } else if (item === '-') {
        res = fracSub(a, b);
      } else if (item === '*') {
        res = fracMul(a, b);
        opName = '×';
      } else if (item === '/') {
        res = fracDiv(a, b);
        opName = '÷';
      } else {
        throw new Error(`未知运算符: ${item}`);
      }

      evalStack.push(res);
      steps.push({
        expr: `${formatFraction(a)} ${opName} ${formatFraction(b)} = ${formatFraction(res)}`,
        desc: `优先计算乘除/括号内：${formatFraction(a)} ${opName} ${formatFraction(b)} 得到 ${formatFraction(res)}`,
      });
    }
  }

  if (evalStack.length !== 1) {
    throw new Error('表达式未闭合或有多余项');
  }

  const finalResult = simplify(evalStack[0]);
  const mixed = improperToMixed(finalResult) || undefined;

  return {
    finalResult,
    steps,
    mixed,
  };
}
