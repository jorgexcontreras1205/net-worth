// Fixed house debts
const house1Debt = 135000;
const house2Debt = 161000;
const house3Debt = 163500;

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

    // Calculating future values
    const house1FutureValue = house1Value * Math.pow(1 + houseGrowthRate, years);
    const house2FutureValue = house2Value * Math.pow(1 + houseGrowthRate, years);
    const house3FutureValue = house3Value * Math.pow(1 + houseGrowthRate, years);
    const investmentFutureValue = investmentValue * Math.pow(1 + investmentGrowthRate, years);

    // Total future debt is constant since we're not considering payments over time
    const totalFutureDebt = house1Debt + house2Debt + house3Debt;

    // Net Worth Calculation
    const futureNetWorth = (house1FutureValue + house2FutureValue + house3FutureValue + investmentFutureValue) - totalFutureDebt;

    // Displaying results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h3>Future Net Worth in ${years} Years</h3>
        <p>House 1 Future Value: $${house1FutureValue.toFixed(2)}</p>
        <p>House 2 Future Value: $${house2FutureValue.toFixed(2)}</p>
        <p>House 3 Future Value: $${house3FutureValue.toFixed(2)}</p>
        <p>Investment Account Future Value: $${investmentFutureValue.toFixed(2)}</p>
        <h3>Total Future Net Worth: $${futureNetWorth.toFixed(2)}</h3>
    `;
}
