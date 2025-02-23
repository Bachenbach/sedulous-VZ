document.addEventListener('DOMContentLoaded', function() {
    initializeNews();
    startNewsTicker();
});

// Initialize all news sections
function initializeNews() {
    loadBreakingNews();
    loadFeaturedNews();
    loadLatestNews();
    loadMarketInsights();
    loadTrendingTopics();
}

// Breaking News Ticker
function loadBreakingNews() {
    const breakingNews = [
        "Fed announces key interest rate decision",
        "Major tech stocks surge in early trading",
        "Oil prices reach new heights amid global tensions",
        "Cryptocurrency market sees significant volatility",
        "Wall Street responds to latest economic data"
    ];

    const ticker = document.getElementById('newsTicker');
    ticker.innerHTML = breakingNews.map(news => 
        `<li class="ticker-item">${news}</li>`
    ).join('');
}

// Featured News
function loadFeaturedNews() {
    const featuredArticle = {
        title: "Global Markets Rally as Tech Sector Leads Gains",
        summary: "Major indices reach new highs as technology companies report strong earnings, signaling robust growth in the digital economy.",
        image: "https://via.placeholder.com/600x400",
        timestamp: "2 hours ago",
        author: "Sarah Johnson"
    };

    document.getElementById('featuredNews').innerHTML = `
        <div class="featured-content">
            <img src="${featuredArticle.image}" alt="Featured News">
            <div class="featured-text">
                <h3>${featuredArticle.title}</h3>
                <p>${featuredArticle.summary}</p>
                <div class="article-meta">
                    <span><i class="fas fa-user"></i> ${featuredArticle.author}</span>
                    <span><i class="fas fa-clock"></i> ${featuredArticle.timestamp}</span>
                </div>
            </div>
        </div>
    `;
}

// Latest News
let currentPage = 1;
function loadLatestNews() {
    const latestNews = [
        {
            title: "Tech Giants Announce Breakthrough in AI Development",
            summary: "Leading technology companies reveal new advancements in artificial intelligence...",
            timestamp: "1 hour ago",
            category: "Technology"
        },
        {
            title: "Market Analysis: Energy Sector Shows Strong Recovery",
            summary: "Energy stocks demonstrate resilience amid global economic challenges...",
            timestamp: "2 hours ago",
            category: "Markets"
        },
        {
            title: "Cryptocurrency Update: Bitcoin Reaches New Milestone",
            summary: "Digital currency markets experience significant growth as institutional adoption increases...",
            timestamp: "3 hours ago",
            category: "Crypto"
        }
    ];

    const newsContainer = document.getElementById('latestNews');
    latestNews.forEach(article => {
        newsContainer.innerHTML += `
            <div class="news-item">
                <div class="news-content">
                    <span class="news-category">${article.category}</span>
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <span class="news-timestamp"><i class="fas fa-clock"></i> ${article.timestamp}</span>
                </div>
            </div>
        `;
    });
}

// Market Insights
function loadMarketInsights() {
    const insights = [
        {
            title: "Market Sentiment Analysis",
            value: "Bullish",
            trend: "up"
        },
        {
            title: "Volatility Index",
            value: "15.2",
            trend: "down"
        },
        {
            title: "Trading Volume",
            value: "Above Average",
            trend: "up"
        }
    ];

    const insightsContainer = document.getElementById('marketInsights');
    insights.forEach(insight => {
        insightsContainer.innerHTML += `
            <div class="insight-card">
                <h4>${insight.title}</h4>
                <p class="insight-value ${insight.trend}">${insight.value}</p>
                <i class="fas fa-arrow-${insight.trend}"></i>
            </div>
        `;
    });
}

// Trending Topics
function loadTrendingTopics() {
    const topics = [
        { name: "Artificial Intelligence", mentions: 1250 },
        { name: "Green Energy", mentions: 980 },
        { name: "Blockchain", mentions: 850 },
        { name: "Electric Vehicles", mentions: 720 },
        { name: "5G Technology", mentions: 650 }
    ];

    const topicsContainer = document.getElementById('trendingTopics');
    topics.forEach(topic => {
        topicsContainer.innerHTML += `
            <div class="topic-tag">
                <span class="topic-name">#${topic.name}</span>
                <span class="topic-mentions">${topic.mentions}</span>
            </div>
        `;
    });
}

// News Ticker Animation
function startNewsTicker() {
    const ticker = document.getElementById('newsTicker');
    let isHovered = false;

    ticker.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    ticker.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    setInterval(() => {
        if (!isHovered) {
            const firstItem = ticker.firstElementChild;
            ticker.style.transition = 'transform 0.5s';
            ticker.style.transform = 'translateY(-100%)';

            setTimeout(() => {
                ticker.style.transition = 'none';
                ticker.style.transform = 'translateY(0)';
                ticker.appendChild(firstItem);
            }, 500);
        }
    }, 3000);
}

// Load More News
function loadMoreNews() {
    currentPage++;
    loadLatestNews();
}

// Category Filter
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterNewsByCategory(button.dataset.category);
    });
});

// News Search
document.getElementById('newsSearch').addEventListener('input', (e) => {
    searchNews(e.target.value);
});

function filterNewsByCategory(category) {
    // Implement category filtering logic
    console.log(`Filtering by category: ${category}`);
}

function searchNews(query) {
    // Implement news search logic
    console.log(`Searching for: ${query}`);
}
