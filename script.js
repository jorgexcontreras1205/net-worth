// Fixed house debts and specific monthly principal reductions
const house1Debt = 135000;  // 2003 Plum Grove
const house2Debt = 161000;  // 2005 Plum Grove
const house3Debt = 163500;  // 5205 Wilmington
const house1PrincipalReduction = 320;  // Monthly payment towards principal for 2003 Plum Grove
const house2PrincipalReduction = 360;  // Monthly payment towards principal for 2005 Plum Grove
const house3PrincipalReduction = 140;  // Monthly payment towards principal for 5205 Wilmington

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
    const investmentFutureValue = investmentValue * Math.pow(1 + investmentGrowthRate, years);

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
    
    const futureNetWorth = house1NetValue + house2NetValue + house3NetValue + investmentFutureValue;

    // Displaying results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Future Net Worth in ${years} Years</h3>
        <p>House 1 Future Value: $${house1FutureValue.toFixed(2)} (Remaining Debt: $${house1FinalDebt.toFixed(2)}) - Net Value: $${house1NetValue.toFixed(2)}</p>
        <p>House 2 Future Value: $${house2FutureValue.toFixed(2)} (Remaining Debt: $${house2FinalDebt.toFixed(2)}) - Net Value: $${house2NetValue.toFixed(2)}</p>
        <p>House 3 Future Value: $${house3FutureValue.toFixed(2)} (Remaining Debt: $${house3FinalDebt.toFixed(2)}) - Net Value: $${house3NetValue.toFixed(2)}</p>
        <p>Investment Account Future Value: $${investmentFutureValue.toFixed(2)}</p>
        <h3>Total Future Net Worth: $${futureNetWorth.toFixed(2)}</h3>
    `;
}
