// Fixed house debts and specific monthly principal reductions
const house1Debt = 135000;  // 2003 Plum Grove
const house2Debt = 161000;  // 2005 Plum Grove
const house3Debt = 163500;  // 5205 Wilmington
const house1PrincipalReduction = 320;  // Monthly payment towards principal for 2003 Plum Grove
const house2PrincipalReduction = 360;  // Monthly payment towards principal for 2005 Plum Grove
const house3PrincipalReduction = 140;  // Monthly payment towards principal for 5205 Wilmington
const weeklyInvestmentContribution = 100 * 52;  // $100 per week, converted to annual contributions

// Function to format numbers as currency (e.g., $1,000.00)
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function calculateNetWorth() {
    // Getting input values
    const house1Value = parseFloat(document.getElementById("house1-value").value);
    const house2Value = parseFloat(document.getElementById("house2-value").value);
    const house3Value = parseFloat(document.getElementById("house3-value").value);
    const investmentValue = parseFloat(document.getElementById("investment-value").value);
    const years = parseInt(document.getElementById("years").value);

    // Growth rates
    const houseGrowthRate = 0.04;
    const investmentGrowthRate = 0.07;

    // Calculating future values of houses based on growth rate
    const house1FutureValue = house1Value * Math.pow(1 + houseGrowthRate, years);
    const house2FutureValue = house2Value * Math.pow(1 + houseGrowthRate, years);
    const house3FutureValue = house3Value * Math.pow(1 + houseGrowthRate, years);

    // Calculate debt reduction over time based on specific monthly principal reductions
    const house1RemainingDebt = house1Debt - (house1PrincipalReduction * 12 * years);
    const house2RemainingDebt = house2Debt - (house2PrincipalReduction * 12 * years);
    const house3RemainingDebt = house3Debt - (house3PrincipalReduction * 12 * years);

    // Ensure that debt cannot be less than 0
    const house1FinalDebt = house1RemainingDebt > 0 ? house1RemainingDebt : 0;
    const house2FinalDebt = house2RemainingDebt > 0 ? house2RemainingDebt : 0;
    const house3FinalDebt = house3RemainingDebt > 0 ? house3RemainingDebt : 0;

    // Net Worth Calculation (subtracting remaining debts from future values)
    const house1NetValue = house1FutureValue - house1FinalDebt;
    const house2NetValue = house2FutureValue - house2FinalDebt;
    const house3NetValue = house3FutureValue - house3FinalDebt;

    // Investment account future value with contributions
    const investmentFutureValue = investmentValue * Math.pow(1 + investmentGrowthRate, years) + 
                                  weeklyInvestmentContribution * ((Math.pow(1 + investmentGrowthRate, years) - 1) / investmentGrowthRate);

    // Total future net worth summation with proper rounding to avoid floating-point errors
    const futureNetWorth = house1NetValue + house2NetValue + house3NetValue + investmentFutureValue;

    // Displaying results in separate boxes
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <div class="results-box">
            <h3>House 1 (2003 Plum Grove)</h3>
            <p>Future Value: ${formatCurrency(house1FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house1FinalDebt)}</p>
            <p>Net Value (Future Value - Remaining Debt): ${formatCurrency(house1NetValue)}</p>
        </div>

        <div class="results-box">
            <h3>House 2 (2005 Plum Grove)</h3>
            <p>Future Value: ${formatCurrency(house2FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house2FinalDebt)}</p>
            <p>Net Value (Future Value - Remaining Debt): ${formatCurrency(house2NetValue)}</p>
        </div>

        <div class="results-box">
            <h3>House 3 (5205 Wilmington)</h3>
            <p>Future Value: ${formatCurrency(house3FutureValue)}</p>
            <p>Remaining Debt: ${formatCurrency(house3FinalDebt)}</p>
            <p>Net Value (Future Value - Remaining Debt): ${formatCurrency(house3NetValue)}</p>
        </div>

        <div class="results-box">
            <h3>Investment Account</h3>
            <p>Future Value: ${formatCurrency(investmentFutureValue)}</p>
        </div>

        <div class="results-box">
            <h3>Total Future Net Worth</h3>
            <p>${formatCurrency(futureNetWorth)}</p>
        </div>
    `;

    // Display assumptions
    const assumptionsDiv = document.getElementById("assumptions");
    assumptionsDiv.innerHTML = `
        <div class="assumptions">
            <h3>Assumptions</h3>
            <ul>
                <li>The housing market is expected to grow at an annual rate of <strong>4%</strong>.</li>
                <li>The stock market is expected to grow at an annual rate of <strong>7%</strong>.</li>
                <li>You are contributing <strong>$100 per week</strong> to your investment account.</li>
                <li>Principal payments for each house are fixed at the following monthly amounts:
                    <ul>
                        <li>2003 Plum Grove: <strong>$320</strong></li>
                        <li>2005 Plum Grove: <strong>$360</strong></li>
                        <li>5205 Wilmington: <strong>$140</strong></li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}
