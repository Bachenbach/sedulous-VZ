// Position Size Calculator
function calculatePosition() {
    const accountSize = parseFloat(document.getElementById('accountSize').value);
    const riskPercentage = parseFloat(document.getElementById('riskPercentage').value);
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const stopLoss = parseFloat(document.getElementById('stopLoss').value);

    if (!accountSize || !riskPercentage || !entryPrice || !stopLoss) {
        document.getElementById('positionResult').innerHTML = 'Please fill in all fields';
        return;
    }

    const riskAmount = accountSize * (riskPercentage / 100);
    const riskPerShare = Math.abs(entryPrice - stopLoss);
    const shares = Math.floor(riskAmount / riskPerShare);
    const totalPosition = shares * entryPrice;

    const result = `
        <h4>Position Details:</h4>
        <p>Number of Shares: ${shares}</p>
        <p>Total Position Size: $${totalPosition.toFixed(2)}</p>
        <p>Risk Amount: $${riskAmount.toFixed(2)}</p>
        <p>Risk per Share: $${riskPerShare.toFixed(2)}</p>
    `;

    document.getElementById('positionResult').innerHTML = result;
}

// Profit/Loss Calculator
function calculateProfitLoss() {
    const shares = parseInt(document.getElementById('shares').value);
    const buyPrice = parseFloat(document.getElementById('buyPrice').value);
    const sellPrice = parseFloat(document.getElementById('sellPrice').value);

    if (!shares || !buyPrice || !sellPrice) {
        document.getElementById('plResult').innerHTML = 'Please fill in all fields';
        return;
    }

    const investment = shares * buyPrice;
    const returnAmount = shares * sellPrice;
    const profitLoss = returnAmount - investment;
    const percentageReturn = (profitLoss / investment) * 100;

    const result = `
        <h4>Profit/Loss Details:</h4>
        <p>Investment Amount: $${investment.toFixed(2)}</p>
        <p>Return Amount: $${returnAmount.toFixed(2)}</p>
        <p>Profit/Loss: $${profitLoss.toFixed(2)}</p>
        <p>Percentage Return: ${percentageReturn.toFixed(2)}%</p>
    `;

    document.getElementById('plResult').innerHTML = result;
}

// Stock Screener
function screenStocks() {
    const marketCap = document.getElementById('marketCapRange').value;
    const sector = document.getElementById('sector').value;
    const peRatio = document.getElementById('peRatio').value;

    // This would normally fetch real data from an API
    // For demo purposes, we'll show sample results
    const sampleResults = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: '150.25', marketCap: '2.5T', pe: '28.5' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: '285.30', marketCap: '2.1T', pe: '32.1' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '2750.20', marketCap: '1.8T', pe: '25.4' }
    ];

    let resultHTML = `
        <h4>Screening Results:</h4>
        <table class="screener-results">
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>P/E Ratio</th>
            </tr>
    `;

    sampleResults.forEach(stock => {
        resultHTML += `
            <tr>
                <td>${stock.symbol}</td>
                <td>${stock.name}</td>
                <td>$${stock.price}</td>
                <td>${stock.marketCap}</td>
                <td>${stock.pe}</td>
            </tr>
        `;
    });

    resultHTML += '</table>';
    document.getElementById('screenResults').innerHTML = resultHTML;
}

// Compound Interest Calculator
function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualReturn = parseFloat(document.getElementById('annualReturn').value);
    const years = parseInt(document.getElementById('years').value);

    if (!principal || !monthlyContribution || !annualReturn || !years) {
        document.getElementById('compoundResult').innerHTML = 'Please fill in all fields';
        return;
    }

    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    let total = principal;

    for (let i = 0; i < months; i++) {
        total += monthlyContribution;
        total *= (1 + monthlyRate);
    }

    const totalContributions = principal + (monthlyContribution * months);
    const totalInterest = total - totalContributions;

    const result = `
        <h4>Investment Growth:</h4>
        <p>Final Balance: $${total.toFixed(2)}</p>
        <p>Total Contributions: $${totalContributions.toFixed(2)}</p>
        <p>Total Interest Earned: $${totalInterest.toFixed(2)}</p>
        <p>Annual Return: ${annualReturn}%</p>
    `;

    document.getElementById('compoundResult').innerHTML = result;
}
