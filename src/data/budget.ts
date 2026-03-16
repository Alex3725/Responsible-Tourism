type BudgetItem = {
  label: string;
  range: string;
};

const budgetItems: BudgetItem[] = [
  { label: "Voli", range: "1500-2500 EUR" },
  { label: "Hotel luxury", range: "6000-10000 EUR" },
  { label: "Attivita", range: "300-800 EUR" },
  { label: "Cibo", range: "400-700 EUR" }
];

window.BUDGET = budgetItems as unknown as BudgetItem[];

export {};
