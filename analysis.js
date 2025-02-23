document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    updateStockData('AAPL'); // Initial load with Apple stock
});

function initializeCharts() {
    // Main price chart
    const mainChartCtx = document.getElementById('mainChart').getContext('2d');
    window.mainChart = new Chart(mainChartCtx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'AAPL',
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    position: 'right'
                }
            }
        }
    });

    // Volume chart
    const volumeChartCtx = document.getElementById('volumeChart').getContext('2d');
    window.volumeChart = new Chart(volumeChartCtx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Volume',
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // RSI chart
    const rsiChartCtx = document.getElementById('rsiChart').getContext('2d');
    window.rsiChart = new Chart(rsiChartCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'RSI',
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

function setupEventListeners() {
    // Time frame buttons
    document.querySelectorAll('.time-button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            updateChartTimeframe(e.target.dataset.period);
        });
    });

    // Search input
    document.getElementById('stockSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStock();
        }
    });
}

function searchStock() {
    const symbol = document.getElementById('stockSearch').value.toUpperCase();
    updateStockData(symbol);
}

function setStock(symbol) {
    document.getElementById('stockSearch').value = symbol;
    updateStockData(symbol);
}

function updateStockData(symbol) {
    // This would normally fetch real data from an API
    // For demo purposes, we'll generate random data
    const data = generateMockData();
    updateCharts(data);
    updateIndicators(data);
}

function generateMockData() {
    // Generate mock stock data
    const data = {
        prices: [],
        volumes: [],
        dates: []
    };

    let price = 150;
    const now = new Date();

    for (let i = 0; i < 100; i++) {
        const date = new Date(now - (100 - i) * 24 * 60 * 60 * 1000);
        price += (Math.random() - 0.5) * 2;
        data.prices.push(price);
        data.volumes.push(Math.random() * 1000000);
        data.dates.push(date);
    }

    return data;
}

function updateCharts(data) {
    // Update main chart
    mainChart.data.labels = data.dates;
    mainChart.data.datasets[0].data = data.prices;
    mainChart.update();

    // Update volume chart
    volumeChart.data.labels = data.dates;
    volumeChart.data.datasets[0].data = data.volumes;
    volumeChart.update();

    // Update RSI
    const rsiData = calculateRSI(data.prices);
    rsiChart.data.labels = data.dates.slice(14);
    rsiChart.data.datasets[0].data = rsiData;
    rsiChart.update();
}

function calculateRSI(prices) {
    // Simple RSI calculation
    const rsiPeriod = 14;
    const rsi = [];
    
    for (let i = rsiPeriod; i < prices.length; i++) {
        let gains = 0;
        let losses = 0;
        
        for (let j = i - rsiPeriod; j < i; j++) {
            const difference = prices[j + 1] - prices[j];
            if (difference >= 0) {
                gains += difference;
            } else {
                losses -= difference;
            }
        }
        
        const rs = gains / losses;
        rsi.push(100 - (100 / (1 + rs)));
    }
    
    return rsi;
}

function toggleIndicator(indicator) {
    // Toggle technical indicators
    const button = document.querySelector(`[onclick="toggleIndicator('${indicator}')"]`);
    button.classList.toggle('active');
    updateIndicators();
}

function updateIndicators() {
    // Update technical indicators
    document.getElementById('sma20').textContent = calculateSMA(20).toFixed(2);
    document.getElementById('sma50').textContent = calculateSMA(50).toFixed(2);
    document.getElementById('sma200').textContent = calculateSMA(200).toFixed(2);
    document.getElementById('rsiValue').textContent = calculateRSI([]).slice(-1)[0].toFixed(2);
}

function calculateSMA(period) {
    // Simple Moving Average calculation (mock data)
    return 150 + Math.random() * 5;
}

function updateChartTimeframe(period) {
    // Update chart data based on selected timeframe
    const data = generateMockData();
    updateCharts(data);
}
