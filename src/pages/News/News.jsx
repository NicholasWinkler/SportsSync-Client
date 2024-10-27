import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8000/api/news/?search=${encodeURIComponent(
        searchQuery
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    fetchArticles();
  };

  return (
    <div className="news-container">
      <div className="news-header">
        <h1 className="news-title">SportsSync NBA News</h1>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search NBA news..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <span className="clear-button" onClick={handleClear}>
              ❌
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Loading articles...</p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={`${article.id}-${index}`}
                className="article-card"
                onClick={() =>
                  window.open(article.url, "_blank", "noopener,noreferrer")
                }
              >
                <div className="article-image-container">
                  <img
                    src={article.image_url || "/placeholder-image.jpg"}
                    alt={article.title}
                    className="article-image"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
                <div className="article-content">
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-description">{article.description}</p>
                  <div className="article-footer">
                    <span className="article-source">{article.source}</span>
                    <span className="article-date">
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-articles">
              {searchQuery
                ? `No articles found for "${searchQuery}"`
                : "No articles available at the moment"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
