// Fixed house debts and specific monthly principal reductions
const house1Debt = 135000;  // 2003 Plum Grove
const house2Debt = 161000;  // 2005 Plum Grove
const house3Debt = 163500;  // 5205 Wilmington
const house1PrincipalReduction = 320;  // Monthly payment towards principal
const house2PrincipalReduction = 326;  // Monthly payment towards principal
const house3PrincipalReduction = 250;  // Monthly payment towards principal
const weeklyInvestmentContribution = 100 * 52;  // $100 per week, annualized

// Initialize global chart variables
let investmentChart, propertyChart;

// Function to format numbers as currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// Main function to calculate net worth and update the dashboard
function calculateNetWorth() {
    const house1Value = parseFloat(document.getElementById("house1-value").value);
    const house2Value = parseFloat(document.getElementById("house2-value").value);
    const house3Value = parseFloat(document.getElementById("house3-value").value);
    const investmentValue = parseFloat(document.getElementById("investment-value").value);
    const years = parseInt(document.getElementById("years").value);
    const houseGrowthRate = parseFloat(document.getElementById("property-rate").value);
    const investmentGrowthRate = parseFloat(document.getElementById("investment-rate").value);

    const futureValues = calculateFutureValues(house1Value, house2Value, house3Value, investmentValue, years, houseGrowthRate, investmentGrowthRate);
    displayResults(futureValues);
    updateCharts(futureValues, years, houseGrowthRate, investmentGrowthRate);
}

// Function to calculate future values of properties and investments
function calculateFutureValues(h1v, h2v, h3v, iv, years, hgr, igr) {
    const results = {
        houses: [],
        investment: 0
    };
    const houseValues = [h1v, h2v, h3v];
    const debts = [house1Debt, house2Debt, house3Debt];
    const reductions = [house1PrincipalReduction, house2PrincipalReduction, house3PrincipalReduction];

    houseValues.forEach((value, index) => {
        const futureValue = value * Math.pow(1 + hgr, years);
        const remainingDebt = Math.max(0, debts[index] - (reductions[index] * 12 * years));
        const netValue = futureValue - remainingDebt;
        results.houses.push({futureValue, remainingDebt, netValue});
    });

    const investmentFutureValue = iv * Math.pow(1 + igr, years) + weeklyInvestmentContribution * ((Math.pow(1 + igr, years) - 1) / igr);
    results.investment = investmentFutureValue;

    return results;
}

// Function to display the results on the page
function displayResults({houses, investment}) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = houses.map((house, index) => `
        <div class="results-box">
            <h3>Property ${index + 1}</h3>
            <p>Future Value: ${formatCurrency(house.futureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house.remainingDebt)}</p>
            <p>Net Value: ${formatCurrency(house.netValue)}</p>
        </div>
    `).join('') + `
        <div class="results-box">
            <h3>Investment Account</h3>
            <p>Future Value: ${formatCurrency(investment)}</p>
        </div>
    `;
}

// Function to update the charts
function updateCharts({houses, investment}, years, hgr, igr) {
    const investmentData = Array.from({length: years}, (_, i) => investment * Math.pow(1 + igr, i+1));
    const propertyData = houses.map(house => Array.from({length: years}, (_, i) => house.futureValue * Math.pow(1 + hgr, i+1)));

    drawCharts(investmentData, propertyData);
}

// Function to draw charts using Chart.js
function drawCharts(investmentData, propertyData) {
    const ctxInvestment = document.getElementById('investmentChart').getContext('2d');
    if (investmentChart) investmentChart.destroy();
    investmentChart = new Chart(ctxInvestment, {
        type: 'line',
        data: {
            labels: Array.from({length: investmentData.length}, (_, i) => i + 1),
            datasets: [{
                label: 'Investment Growth',
                data: investmentData,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        }
    });

    const ctxProperty = document.getElementById('propertyChart').getContext('2d');
    if (propertyChart) propertyChart.destroy();
    propertyChart = new Chart(ctxProperty, {
        type: 'line',
        data: {
            labels: Array.from({length: propertyData[0].length}, (_, i) => i + 1),
            datasets: propertyData.map((data, index) => ({
                label: `Property ${index + 1} Growth`,
                data: data,
                borderColor: `rgba(${255 - index*85}, ${99 + index*85}, 132)`,
                fill: false
            }))
        }
    });
}

document.addEventListener('DOMContentLoaded', calculateNetWorth);
