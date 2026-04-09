import { useState } from "react";
import "./App.css";
import axios from "axios";
import profilePic from "./assets/profilepic.png";
import github from "./assets/github.webp";
import { useEffect } from "react";
import Input from "./components/Input"

function App() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [userList, setUserList] = useState();

  const handleFormSubmit = async (e) => {
    if (!username){setUserList(null); return;};
    //e.preventDefault()
    const response = await axios.get(
      `https://api.github.com/search/users?q=${username}&per_page=10&page=1`,
    );
    // user details: https://api.github.com/users/${username}
    // user repo details : https://api.github.com/users/{username}/repos
    console.log(response.data.items);
    setUserList(response.data.items);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFormSubmit();
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(timer); // cleanup
  }, [username]);

  return (
    <>
      <div className="header">
        <img src={github} alt="github-image" />
        <div className="header-components">
          <p className="header-github">GitHub Explorer</p>
          <p className="header-search">Search users and explore repos</p>
        </div>
      </div>
      <div className="container">
        <div className="inputBox">
         <Input setUsername={setUsername}></Input>
        </div>

        <div className="users">
          {userList?.map((user, index) => (
            <div key={user.login} className="card">
              {/* Top background */}
              <div className={`card-top bg-${(index % 6) + 1}`}>
                <img src={user.avatar_url} className="avatar" />
              </div>

              {/* Bottom content */}
              <div className="card-bottom">
                <h3>{user.login}</h3>
                <p>GitHub user profile</p>

                <div className="buttons">
                  <button className="btn-light">View</button>
                  <button className="btn-primary">Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
