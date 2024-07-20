// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    addUsageInputs();
});

function addUsageInputs() {
    const usageInputs = document.getElementById('usageInputs');
    for (let i = 1; i <= 6; i++) {
        const label = document.createElement('label');
        label.textContent = `Month ${i} Usage (units):`;
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `usage${i}`;
        input.required = true;
        usageInputs.appendChild(label);
        usageInputs.appendChild(input);
    }
}

function calculateBill() {
    const salary = parseFloat(document.getElementById('salary').value);
    const usage = [];
    for (let i = 1; i <= 6; i++) {
        const usageValue = parseFloat(document.getElementById(`usage${i}`).value);
        usage.push(usageValue);
    }

    const RATE_PER_UNIT = 9.65;
    const FREE_UNITS = 100;

    function calculateBiMonthlyBill(usage) {
        let totalBill = 0;
        for (let i = 0; i < usage.length; i += 2) {
            const biMonthlyUsage = usage[i] + usage[i + 1];
            const chargeableUnits = Math.max(0, biMonthlyUsage - FREE_UNITS);
            totalBill += chargeableUnits * RATE_PER_UNIT;
        }
        return totalBill;
    }

    function calculateMonthlyBill(usage) {
        let totalBill = 0;
        for (const monthlyUsage of usage) {
            const chargeableUnits = Math.max(0, monthlyUsage - FREE_UNITS);
            totalBill += chargeableUnits * RATE_PER_UNIT;
        }
        return totalBill;
    }

    const biMonthlyBill = calculateBiMonthlyBill(usage);
    const monthlyBill = calculateMonthlyBill(usage);
    const savings = monthlyBill - biMonthlyBill;
    const percentageSavings = (savings / monthlyBill) * 100;

    const results = document.getElementById('results');
    results.innerHTML = `
        <p>Bi-monthly bill: ₹${biMonthlyBill.toFixed(2)}</p>
        <p>Monthly bill: ₹${monthlyBill.toFixed(2)}</p>
        <p>Savings: ₹${savings.toFixed(2)}</p>
        <p>Percentage Savings: ${percentageSavings.toFixed(2)}%</p>
        <p>Percentage of salary for bi-monthly payment: ${(biMonthlyBill / salary * 100).toFixed(2)}%</p>
        <p>Percentage of salary for monthly payment: ${(monthlyBill / salary * 100).toFixed(2)}%</p>
        <p>${biMonthlyBill < monthlyBill ? 'Bi-monthly payment is cheaper.' : 'Monthly payment is cheaper.'}</p>
    `;
}
