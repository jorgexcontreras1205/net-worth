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
            <h3>House 3 (5205 Wilmington)</
