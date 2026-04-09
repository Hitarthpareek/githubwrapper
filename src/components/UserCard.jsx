import React from "react";

function UserCard({ user, index }) {
  return (
    <div className="card">
      <div className={`card-top bg-${(index % 6) + 1}`}>
        <img src={user.avatar_url} className="avatar" />
      </div>

      <div className="card-bottom">
        <h3>{user.login}</h3>
        <p>GitHub user profile</p>

        <div className="buttons">
          <button className="btn-light">Bookmark</button>
          <button className="btn-primary">See Profile</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;