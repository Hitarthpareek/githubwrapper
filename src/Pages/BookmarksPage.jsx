import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import github from "../assets/github.webp"

function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  const removeBookmark = (id) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <div className="bookmarks-page">

      {/* HEADER */}
      <div className="bookmarks-header">
        <img style={{width:50, borderRadius:20}} src={github} alt="" />
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="header-title">
          <h1>⭐ My Bookmarks</h1>
          <p>All your saved GitHub repositories in one place</p>
        </div>

        <div className="bookmark-count">
          {bookmarks.length} Repos
        </div>
      </div>

      {/* EMPTY STATE */}
      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <h2>Nothing Saved Yet 😢</h2>
          <p>Click bookmark on repos to save them here</p>
        </div>
      ) : (
        <div className="repo-grid">
          {bookmarks.map((repo) => (
            <div key={repo.id} className="repo-card fancy-card">

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="open-github-tag"
              >
                <h3>📦 {repo.name}</h3>
                <p>{repo.description || "No description available"}</p>
              </a>

              <div className="repo-footer">
                <span className="badge">⚡ {repo.language || "N/A"}</span>
                <span className="badge">⭐ {repo.stargazers_count}</span>
                <span className="badge">🍴 {repo.forks_count}</span>
              </div>

              <button
                className="btn-danger"
                onClick={() => removeBookmark(repo.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;