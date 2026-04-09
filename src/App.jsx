import { use, useState } from "react";
import "./App.css";
import axios from "axios";
import github from "./assets/github.webp";
import { useEffect } from "react";
import Input from "./components/Input";
import UserCard from "./components/UserCard";
import Loader from "./components/Loader";

function App() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState()

  const handleFormSubmit = async (e) => {
    setLoading(true);
    if (!username) {
      setUserList(null);
      setLoading(false);
      return;
    }
   
    const response = await axios.get(
      `https://api.github.com/search/users?q=${username}&per_page=4&page=1`,
    );
    // user details: https://api.github.com/users/${username}
    // user repo details : https://api.github.com/users/{username}/repos
    console.log(response.data.items);
    setUserList(response.data.items);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFormSubmit();
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(timer); // cleanup
  }, [username]);

  return (
    <div className="background">
      <div className="header">
        <img src={github} alt="github-image" />
        <div className="header-components">
          <p className="header-github">GitHub Explorer</p>
          <p className="header-search">Search users and explore repos</p>
        </div>
      </div>
      <div className="inputBox">
        <Input setUsername={setUsername}></Input>
      </div>
      <div className={loading ? "container center" : "container"}>
        {loading && <Loader />}

        {!loading && (
          <div className="users">
            {userList?.map((user, index) => (
              <UserCard key={user.login} user={user} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
