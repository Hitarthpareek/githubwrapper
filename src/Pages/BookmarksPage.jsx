import { useEffect, useState } from "react";
export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);
  return (
    <>
    
      <div className="repo-section">
        <div className="repo-grid">
          {bookmarks.length === 0 ? (
            <p style={{ padding: 20 }}>No bookmarks found</p>
          ) : (
            bookmarks.map((repo) => (
              <div key={repo.id} className="repo-card">
                <a
                  className="open-github-tag"
                  href={repo.html_url}
                  target="_blank"
                >
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </a>

                <div className="repo-footer">
                  <span>{repo.language}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                </div>

                {/* optional remove button */}
                <button
                  style={{ marginTop: 10 }}
                  className="btn-light"
                  onClick={() => {
                    const updated = bookmarks.filter((b) => b.id !== repo.id);
                    setBookmarks(updated);
                    localStorage.setItem("bookmarks", JSON.stringify(updated));
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
