// Utilities to compute budget totals and percentages
export function computeBudgetTotals(budgets = []) {
  const total = budgets.reduce((acc, b) => acc + (b.amount || 0), 0);
  return { total };
}

export function computeBudgetPercentages(budgets = []) {
  const { total } = computeBudgetTotals(budgets);
  if (!total) return budgets.map((b) => ({ ...b, percent: 0 }));
  return budgets.map((b) => ({
    ...b,
    percent: (b.amount || 0) / total,
  }));
}
