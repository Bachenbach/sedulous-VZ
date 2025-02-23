document.addEventListener('DOMContentLoaded', function() {
    // Set appropriate size for mini-chart canvases
    const miniCharts = document.querySelectorAll('.mini-chart');
    miniCharts.forEach(chart => {
        chart.style.height = '30px';  // More reasonable height
        chart.style.width = '100px';  // Fixed width
    });

    // Initialize all mini charts
    initializeMiniCharts();
    // Update market data periodically
    setInterval(updateMarketData, 5000);
});

function initializeMiniCharts() {
    // Configuration for mini charts
    const miniChartConfig = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0.4,
                    borderWidth: 1
                }
            }
        }
    };

    // Create charts for major indices
    createMiniChart('sp500-chart', generateChartData(true), '#2ecc71', miniChartConfig);
    createMiniChart('dow-chart', generateChartData(false), '#e74c3c', miniChartConfig);
    createMiniChart('nasdaq-chart', generateChartData(true), '#2ecc71', miniChartConfig);
    createMiniChart('russell-chart', generateChartData(true), '#2ecc71', miniChartConfig);

    // Create charts for global markets
    createMiniChart('ftse-chart', generateChartData(true), '#2ecc71', miniChartConfig);
    createMiniChart('dax-chart', generateChartData(true), '#2ecc71', miniChartConfig);
    createMiniChart('nikkei-chart', generateChartData(false), '#e74c3c', miniChartConfig);
    createMiniChart('shanghai-chart', generateChartData(true), '#2ecc71', miniChartConfig);
}

function createMiniChart(canvasId, data, color, baseConfig) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 30);
    gradient.addColorStop(0, color + '20');
    gradient.addColorStop(1, color + '00');

    const config = {
        ...baseConfig,
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                borderColor: color,
                backgroundColor: gradient,
                fill: true
            }]
        }
    };

    return new Chart(ctx, config);
}

// Rest of your code remains the same...
