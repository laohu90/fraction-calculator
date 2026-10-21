# 🧮 Fraction Calculator (分数计算器)

> A modern, responsive, high-efficiency **Fraction Calculator & Step-by-Step Solver** with interactive visual models, short division factor ladder, and multi-language support (English, Spanish, French, Portuguese, Chinese).

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

- **⚡ Fraction Arithmetic ($\dfrac{a}{b} \pm \dfrac{c}{d}$)**:
  - Supports addition ($+$), subtraction ($-$), multiplication ($\times$), and division ($\div$).
  - Full support for both **Simple Proper/Improper Fractions** and **Mixed Numbers** ($w\ \frac{n}{d}$).
- **🪜 Short Division Ladder Diagram (短除法)**:
  - Visual ladder decomposition showing common prime factors, Greatest Common Divisor (GCD), and Least Common Multiple (LCM).
- **📝 Step-by-Step Mathematical Derivation**:
  - Full homework-grade explanations showing common denominator conversion, cross-canceling, and simplification.
- **🎨 Visual Fraction Geometry Models**:
  - Dual visualization with **Tape (Bar) Model** and **Pie Chart Model** with real-time fraction comparisons.
- **🔢 Multi-Term Expressions (PEMDAS)**:
  - Evaluate expressions like `(1/2 + 2/3) * 3/4 - 1/6` with parentheses and order-of-operations steps.
- **🔍 Simplifier & Reducer**:
  - Calculate all factors, identify coprime numbers, and reduce fractions to their lowest terms.
- **⚖️ Comparator & Common Denominator**:
  - Compare 2 to 5 fractions, find the multi-term LCM, scale numerators, and sort in ascending order with a visual number line.
- **🔄 Decimal to Fraction Converter**:
  - Converts finite decimals (e.g. `0.875` $\rightarrow \frac{7}{8}$) and repeating decimals using algebraic substitution (e.g. `0.[3]` $\rightarrow \frac{1}{3}$).
- **🏆 Interactive Practice Quiz**:
  - Elementary and middle school homework practice with instant grading, score tracking, and confetti celebrations.
- **📚 Educational Tutorial & 8 Traps**:
  - 5 comprehensive learning sections with common pitfalls and exam tips.
- **🌐 5-Language Native Localization**:
  - Browser auto-detection + manual switcher for **English** (default), **Spanish (Español)**, **French (Français)**, **Portuguese (Português)**, and **Chinese (中文)**.
  - Hreflang tags, OpenGraph meta, and Schema.org `WebApplication`, `MathSolver`, and `FAQPage` structured data.
- **🖨️ Printable Worksheets**:
  - Clean `@media print` styling for printing paper correction worksheets.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/laohu90/fraction-calculator.git
cd fraction-calculator

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

---

## 🌍 Supported Languages

| Code | Language | Default |
| :--- | :--- | :---: |
| `en` | English | ✅ Yes |
| `es` | Español (Spanish) | Auto-detected |
| `fr` | Français (French) | Auto-detected |
| `pt` | Português (Portuguese) | Auto-detected |
| `zh` | 中文 (Simplified Chinese) | Auto-detected |

---

## 📄 License

MIT License. Built for students, parents, and educators worldwide.
