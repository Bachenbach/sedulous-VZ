let stockChart = null;
let currentChartType = 'line';
let currentTimeframe = '1D';

document.addEventListener('DOMContentLoaded', function() {
    initChart();
    updateMarketIndices();
});

function initChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(52, 152, 219, 0.3)');
    gradientFill.addColorStop(1, 'rgba(52, 152, 219, 0)');

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Stock Price',
                data: [],
                borderColor: '#3498db',
                backgroundColor: gradientFill,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHitRadius: 20,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#3498db',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function generateStockData(symbol, timeframe) {
    const points = getTimeframePoints(timeframe);
    const basePrice = getBasePrice(symbol);
    const volatility = getVolatility(symbol);
    const trend = Math.random() * 2 - 1; // Random trend between -1 and 1
    
    let dates = [];
    let prices = [];
    let currentPrice = basePrice;

    for (let i = points; i >= 0; i--) {
        const date = new Date();
        switch(timeframe) {
            case '1D':
                date.setMinutes(date.getMinutes() - i * 5);
                dates.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
                break;
            case '1W':
                date.setHours(date.getHours() - i * 4);
                dates.push(date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit' }));
                break;
            case '1M':
                date.setDate(date.getDate() - i);
                dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                break;
            case '3M':
                date.setDate(date.getDate() - i * 3);
                dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                break;
            case '1Y':
                date.setDate(date.getDate() - i * 7);
                dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                break;
            case '5Y':
                date.setMonth(date.getMonth() - i * 2);
                dates.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
                break;
        }

        // Generate price with trend and volatility
        const change = currentPrice * volatility * (Math.random() - 0.5 + trend * 0.1);
        currentPrice += change;
        prices.push(currentPrice);
    }

    return { dates, prices };
}

function getTimeframePoints(timeframe) {
    const points = {
        '1D': 78,    // 5-minute intervals for 6.5 hours
        '1W': 42,    // 4-hour intervals
        '1M': 30,    // Daily
        '3M': 90,    // Daily
        '1Y': 52,    // Weekly
        '5Y': 60     // Monthly
    };
    return points[timeframe] || 30;
}

function getBasePrice(symbol) {
    const prices = {
        'AAPL': 150,
        'GOOGL': 2800,
        'MSFT': 280,
        'AMZN': 3300,
        'META': 300,
        'TSLA': 250,
        'NVDA': 400,
        'JPM': 140
    };
    return prices[symbol] || 100;
}

function getVolatility(symbol) {
    const volatility = {
        'AAPL': 0.01,
        'GOOGL': 0.015,
        'MSFT': 0.012,
        'AMZN': 0.02,
        'META': 0.025,
        'TSLA': 0.035,
        'NVDA': 0.03,
        'JPM': 0.01
    };
    return volatility[symbol] || 0.02;
}

function updateChart(dates, prices) {
    stockChart.data.labels = dates;
    stockChart.data.datasets[0].data = prices;
    
    // Update chart color based on price trend
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const color = endPrice >= startPrice ? '#2ecc71' : '#e74c3c';
    
    stockChart.data.datasets[0].borderColor = color;
    const gradient = stockChart.ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
    gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
    stockChart.data.datasets[0].backgroundColor = gradient;
    
    stockChart.update();
}

function fetchStockData() {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    if (!symbol) return;

    const data = generateStockData(symbol, currentTimeframe);
    const currentPrice = data.prices[data.prices.length - 1];
    const previousPrice = data.prices[data.prices.length - 2];
    const change = currentPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;

    // Update stock info
    document.getElementById('stockName').textContent = `${getCompanyName(symbol)} (${symbol})`;
    document.getElementById('currentPrice').textContent = `$${currentPrice.toFixed(2)}`;
    
    const changeElement = document.getElementById('priceChange');
    changeElement.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)} (${changePercent.toFixed(2)}%)`;
    changeElement.className = change >= 0 ? 'positive' : 'negative';

    // Update market data
    document.getElementById('marketCap').textContent = formatMarketCap(currentPrice * getBaseMarketCap(symbol));
    document.getElementById('volume').textContent = formatVolume(Math.random() * 10000000);
    document.getElementById('peRatio').textContent = (Math.random() * 30 + 10).toFixed(2);
    document.getElementById('high52w').textContent = `$${(currentPrice * 1.2).toFixed(2)}`;
    document.getElementById('low52w').textContent = `$${(currentPrice * 0.8).toFixed(2)}`;
    document.getElementById('dividend').textContent = `${(Math.random() * 3).toFixed(2)}%`;

    updateChart(data.dates, data.prices);
}

function getCompanyName(symbol) {
    const names = {
        'AAPL': 'Apple Inc.',
        'GOOGL': 'Alphabet Inc.',
        'MSFT': 'Microsoft Corporation',
        'AMZN': 'Amazon.com Inc.',
        'META': 'Meta Platforms Inc.',
        'TSLA': 'Tesla Inc.',
        'NVDA': 'NVIDIA Corporation',
        'JPM': 'JPMorgan Chase & Co.'
    };
    return names[symbol] || 'Unknown Company';
}

function getBaseMarketCap(symbol) {
    const marketCaps = {
        'AAPL': 2.5e12,
        'GOOGL': 1.5e12,
        'MSFT': 2.3e12,
        'AMZN': 1.4e12,
        'META': 7.5e11,
        'TSLA': 8e11,
        'NVDA': 1e12,
        'JPM': 4e11
    };
    return marketCaps[symbol] || 1e11;
}

function formatMarketCap(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
}

function formatVolume(value) {
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
}

function updateTimeframe(timeframe) {
    currentTimeframe = timeframe;
    document.querySelectorAll('.time-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent === timeframe) {
            button.classList.add('active');
        }
    });
    fetchStockData();
}

function setStock(symbol) {
    document.getElementById('stockSymbol').value = symbol;
    fetchStockData();
}

// Update market indices every 5 seconds
function updateMarketIndices() {
    setInterval(() => {
        const indices = ['sp500', 'nasdaq', 'dow', 'russell'];
        indices.forEach(index => {
            const change = (Math.random() - 0.5) * 2;
            const priceElement = document.getElementById(`${index}-price`);
            const changeElement = document.getElementById(`${index}-change`);
            
            const currentPrice = parseFloat(priceElement.textContent.replace(',', ''));
            const newPrice = currentPrice + change;
            
            priceElement.textContent = newPrice.toFixed(2);
            changeElement.textContent = `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
            changeElement.className = `change ${change > 0 ? 'positive' : 'negative'}`;
        });
    }, 5000);
}
