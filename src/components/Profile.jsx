import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

function Profile({ username, setUsername, setUserList }) {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");
  const [language, setLanguage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = (repo) => {
    const existing = JSON.parse(localStorage.getItem("bookmarks")) || [];

    // check duplicate
    const alreadyExists = existing.some((item) => item.id === repo.id);

    if (!alreadyExists) {
      const updated = [...existing, repo];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      alert("✅Bookmarked Sucessfully");
    }
    else{
      alert("❌Bookmark already exists ");
    }
  };

  // 🔹 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setLoading(true);

      const userRes = await axios.get(
        `https://api.github.com/users/${username}`,
      );

      const repoRes = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`,
      );

      setCurrentProfile(userRes.data);
      console.log(repoRes.data);
      setRepos(repoRes.data);

      setLoading(false);
    };

    fetchData();
  }, [username]);

  // 🔹 Filter + Sort
  const filteredRepos = [...repos]
    .filter((repo) => !language || repo.language === language)
    .sort((a, b) => {
      let val = 0;

      if (sort === "stars") val = a.stargazers_count - b.stargazers_count;
      if (sort === "forks") val = a.forks_count - b.forks_count;
      if (sort === "name") val = a.name.localeCompare(b.name);
      if (sort === "updated")
        val = new Date(a.updated_at) - new Date(b.updated_at);

      return order === "asc" ? val : -val;
    });

  if (loading) return <Loader />;

  if (!currentProfile) return null;

  const {
    avatar_url,
    name,
    login,
    bio,
    location,
    public_repos,
    followers,
    blog,
  } = currentProfile;

  return (
    <div className="profile-container">
      {/* 🔹 PROFILE */}
      <div className="profile-card">
        <button
          className="back-btn"
          onClick={() => {
            setUsername();
          }}
        >
          ← Back
        </button>
        <img src={avatar_url} className="profile-avatar" />

        <div className="profile-info">
          <h2>
            {name} <span>@{login}</span>
          </h2>

          <p>{bio || "No bio available"}</p>

          <div className="profile-stats">
            <span>📍 {location || "N/A"}</span>
            <span>📦 {public_repos} repos</span>
            <span>👥 {followers} followers</span>

            {blog && (
              <a href={blog} target="_blank" rel="noreferrer">
                🔗 Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 FILTERS */}
      <div className="filters">
        <button
          className={sort === "stars" ? "active" : ""}
          onClick={() => setSort("stars")}
        >
          Stars
        </button>

        <button
          className={sort === "forks" ? "active" : ""}
          onClick={() => setSort("forks")}
        >
          Forks
        </button>

        <button
          className={sort === "updated" ? "active" : ""}
          onClick={() => setSort("updated")}
        >
          Updated
        </button>

        <button
          className={sort === "name" ? "active" : ""}
          onClick={() => setSort("name")}
        >
          Name
        </button>

        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>

        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="TypeScript">Typescript</option>
          <option value="Go">Go</option>
          <option value="C++">C++</option>
          <option value="Swift">Swift</option>
        </select>
      </div>

      {/* 🔹 COUNT */}
      <h3 className="repo-count">Top {filteredRepos.length} repositories</h3>

      {/* 🔹 SCROLLABLE REPO LIST */}
      <div className="repo-section">
        <div className="repo-grid">
          {filteredRepos.map((repo) => (
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

              <button
                style={{ marginTop: 10 }}
                className="btn-light"
                onClick={() => handleBookmarkClick(repo)}
              >
                Bookmark
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
