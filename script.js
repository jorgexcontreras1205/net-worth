// Constants for fixed debts and monthly principal reductions
const house1Debt = 135000;  // 2003 Plum Grove
const house2Debt = 161000;  // 2005 Plum Grove
const house3Debt = 163500;  // 5205 Wilmington
const house1PrincipalReduction = 320;
const house2PrincipalReduction = 326;
const house3PrincipalReduction = 250;
const weeklyInvestmentContribution = 100 * 52;  // Annualized

// Helper function to format numbers as currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// Function to calculate and display the net worth
function calculateNetWorth() {
    const house1Value = parseFloat(document.getElementById("house1-value").value);
    const house2Value = parseFloat(document.getElementById("house2-value").value);
    const house3Value = parseFloat(document.getElementById("house3-value").value);
    const investmentValue = parseFloat(document.getElementById("investment-value").value);
    const years = parseInt(document.getElementById("years").value);
    const houseGrowthRate = parseFloat(document.getElementById("property-rate").value) / 100;
    const investmentGrowthRate = parseFloat(document.getElementById("investment-rate").value) / 100;

    const house1FutureValue = house1Value * Math.pow(1 + houseGrowthRate, years);
    const house2FutureValue = house2Value * Math.pow(1 + houseGrowthRate, years);
    const house3FutureValue = house3Value * Math.pow(1 + houseGrowthRate, years);

    const house1RemainingDebt = Math.max(0, house1Debt - (house1PrincipalReduction * 12 * years));
    const house2RemainingDebt = Math.max(0, house2Debt - (house2PrincipalReduction * 12 * years));
    const house3RemainingDebt = Math.max(0, house3Debt - (house3PrincipalReduction * 12 * years));

    const house1NetValue = house1FutureValue - house1RemainingDebt;
    const house2NetValue = house2FutureValue - house2RemainingDebt;
    const house3NetValue = house3FutureValue - house3RemainingDebt;

    const investmentFutureValue = investmentValue * Math.pow(1 + investmentGrowthRate, years) + 
                                  weeklyInvestmentContribution * ((Math.pow(1 + investmentGrowthRate, years) - 1) / investmentGrowthRate);

    const futureNetWorth = house1NetValue + house2NetValue + house3NetValue + investmentFutureValue;

    // Display results
    document.getElementById("results").innerHTML = `
        <div class="results-box">
            <h3>Property 1 (2003 Plum Grove)</h3>
            <p>Future Value: ${formatCurrency(house1FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house1RemainingDebt)}</p>
            <p>Net Value: ${formatCurrency(house1NetValue)}</p>
        </div>
        <div class="results-box">
            <h3>Property 2 (2005 Plum Grove)</h3>
            <p>Future Value: ${formatCurrency(house2FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house2RemainingDebt)}</p>
            <p>Net Value: ${formatCurrency(house2NetValue)}</p>
        </div>
        <div class="results-box">
            <h3>Property 3 (5205 Wilmington)</h3>
            <p>Future Value: ${formatCurrency(house3FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house3RemainingDebt)}</p>
            <p>Net Value: ${formatCurrency(house3NetValue)}</p>
        </div>
        <div class="results-box">
            <h3>Investment Account</h3>
            <p>Future Value: ${formatCurrency(investmentFutureValue)}</p>
        </div>
        <div class="net-worth-box">
            Total Future Net Worth: ${formatCurrency(futureNetWorth)}
        </div>
    `;

    drawCharts();  // Update the charts with new values
}

// Function to initialize and update the charts
function drawCharts() {
    const ctxInvestment = document.getElementById('investmentChart').getContext('2d');
    const investmentData = Array.from({ length: parseInt(document.getElementById('years').value) + 1 }, (_, i) =>
        parseFloat(document.getElementById('investment-value').value) * Math.pow(1 + parseFloat(document.getElementById('investment-rate').value) / 100, i)).toFixed(2);

    const investmentChart = new Chart(ctxInvestment, {
        type: 'line',
        data: {
            labels: investmentData.map((_, index) => index),
            datasets: [{
                label: 'Investment Growth',
                data: investmentData,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxProperty = document.getElementById('propertyChart').getContext('2d');
    const propertyChart = new Chart(ctxProperty, {
        type: 'line',
        data: {
            labels: Array.from({ length: parseInt(document.getElementById('years').value) + 1 }, (_, i) => i),
            datasets: [{
                label: 'Property 1 Growth',
                data: Array.from({ length: parseInt(document.getElementById('years').value) + 1 }, (_, i) =>
                    (parseFloat(document.getElementById('house1-value').value) * Math.pow(1 + parseFloat(document.getElementById('property-rate').value) / 100, i)).toFixed(2)),
                borderColor: 'rgba(255, 99, 132)',
                fill: false
            }, {
                label: 'Property 2 Growth',
                data: Array.from({ length: parseInt(document.getElementById('years').value) + 1 }, (_, i) =>
                    (parseFloat(document.getElementById('house2-value').value) * Math.pow(1 + parseFloat(document.getElementById('property-rate').value) / 100, i)).toFixed(2)),
                borderColor: 'rgba(54, 162, 235)',
                fill: false
            }, {
                label: 'Property 3 Growth',
                data: Array.from({ length: parseInt(document.getElementById('years').value) + 1 }, (_, i) =>
                    (parseFloat(document.getElementById('house3-value').value) * Math.pow(1 + parseFloat(document.getElementById('property-rate').value) / 100, i)).toFixed(2)),
                borderColor: 'rgba(75, 192, 192)',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Attach event listeners to inputs for live updates
document.getElementById('investment-rate').addEventListener('input', calculateNetWorth);
document.getElementById('property-rate').addEventListener('input', calculateNetWorth);
