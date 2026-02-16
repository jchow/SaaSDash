const saasCompanies = [
  {
    company: "Microsoft",
    marketCapB: 3200,
    ttmPE: 36.4,
    ntmPE: 33.2,
    priceToFCF: 39.8,
    priceToOCF: 30.5,
    revenueGrowthPct: 15,
    fcfMarginPct: 33
  },
  {
    company: "Oracle",
    marketCapB: 440,
    ttmPE: 39.6,
    ntmPE: 22.8,
    priceToFCF: 23.4,
    priceToOCF: 17.2,
    revenueGrowthPct: 8,
    fcfMarginPct: 29
  },
  {
    company: "Salesforce",
    marketCapB: 305,
    ttmPE: 45.1,
    ntmPE: 26.9,
    priceToFCF: 27.6,
    priceToOCF: 24.1,
    revenueGrowthPct: 11,
    fcfMarginPct: 32
  },
  {
    company: "SAP",
    marketCapB: 245,
    ttmPE: 49.8,
    ntmPE: 30.4,
    priceToFCF: 36.2,
    priceToOCF: 25.7,
    revenueGrowthPct: 9,
    fcfMarginPct: 27
  },
  {
    company: "ServiceNow",
    marketCapB: 180,
    ttmPE: 71.5,
    ntmPE: 54.1,
    priceToFCF: 58.3,
    priceToOCF: 49.4,
    revenueGrowthPct: 23,
    fcfMarginPct: 32
  },
  {
    company: "Intuit",
    marketCapB: 170,
    ttmPE: 61.8,
    ntmPE: 36.7,
    priceToFCF: 40.9,
    priceToOCF: 34.2,
    revenueGrowthPct: 13,
    fcfMarginPct: 30
  },
  {
    company: "Adobe",
    marketCapB: 255,
    ttmPE: 44.6,
    ntmPE: 29.7,
    priceToFCF: 33.1,
    priceToOCF: 29.8,
    revenueGrowthPct: 11,
    fcfMarginPct: 36
  },
  {
    company: "ADP",
    marketCapB: 120,
    ttmPE: 31.2,
    ntmPE: 29.5,
    priceToFCF: 28.6,
    priceToOCF: 24.9,
    revenueGrowthPct: 7,
    fcfMarginPct: 24
  },
  {
    company: "Workday",
    marketCapB: 85,
    ttmPE: 103.4,
    ntmPE: 49.3,
    priceToFCF: 47.8,
    priceToOCF: 39.6,
    revenueGrowthPct: 17,
    fcfMarginPct: 25
  },
  {
    company: "Atlassian",
    marketCapB: 70,
    ttmPE: 95.7,
    ntmPE: 61.8,
    priceToFCF: 59.2,
    priceToOCF: 45.7,
    revenueGrowthPct: 22,
    fcfMarginPct: 21
  }
];

function toFixed(value) {
  return value.toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 });
}

function ruleOf40(row) {
  return row.revenueGrowthPct + row.fcfMarginPct;
}

const sortedCompanies = [...saasCompanies].sort((a, b) => b.marketCapB - a.marketCapB);
const tbody = document.querySelector("#saasTable tbody");

sortedCompanies.forEach((row) => {
  const rule = ruleOf40(row);
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${row.company}</td>
    <td>${toFixed(row.marketCapB)}</td>
    <td>${toFixed(row.ttmPE)}x</td>
    <td>${toFixed(row.ntmPE)}x</td>
    <td>${toFixed(row.priceToFCF)}x</td>
    <td>${toFixed(row.priceToOCF)}x</td>
    <td class="${rule >= 40 ? "rule-good" : "rule-warn"}">${toFixed(rule)}%</td>
  `;
  tbody.appendChild(tr);
});

const totals = sortedCompanies.reduce(
  (acc, row) => {
    acc.marketCapB += row.marketCapB;
    acc.ruleOf40 += ruleOf40(row);
    return acc;
  },
  { marketCapB: 0, ruleOf40: 0 }
);

const avg = (key) => sortedCompanies.reduce((sum, row) => sum + row[key], 0) / sortedCompanies.length;

const kpis = [
  { label: "Combined Market Cap", value: `$${toFixed(totals.marketCapB)}B` },
  { label: "Avg TTM P/E", value: `${toFixed(avg("ttmPE"))}x` },
  { label: "Avg NTM P/E", value: `${toFixed(avg("ntmPE"))}x` },
  { label: "Avg Rule of 40", value: `${toFixed(totals.ruleOf40 / sortedCompanies.length)}%` }
];

const kpiCards = document.getElementById("kpiCards");
kpis.forEach((kpi) => {
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `<div class="label">${kpi.label}</div><div class="value">${kpi.value}</div>`;
  kpiCards.appendChild(article);
});
