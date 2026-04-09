import { use, useState } from "react";
import "./App.css";
import axios from "axios";
import github from "./assets/github.webp";
import { useEffect } from "react";
import Input from "./components/Input";
import UserCard from "./components/UserCard";
import Loader from "./components/Loader";
import PaginationBottomBar from "./components/PaginationBottomBar";

function App() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    if (!username) {
      setUserList(null);
      setLoading(false);
      return;
    }

    try {
      const currentPage = await axios.get(
        `https://api.github.com/search/users?q=${username}&per_page=10&page=${page}`,
      );
      // user details: https://api.github.com/users/${username}
      // user repo details : https://api.github.com/users/{username}/repos
      //console.log(currentPage.data.total_count);
      setUserList(currentPage.data.items);
      const total = Math.min(currentPage.data.total_count, 1000);
      setTotalPages(total);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFormSubmit();
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(timer); // cleanup
  }, [username]);

  useEffect(()=>{
    handleFormSubmit();
  },[page])

  return (
    <div className="root-container">
      <div className="header">
        <img src={github} alt="github-image" />
        <div className="header-components">
          <p className="header-github-text">GitHub Explorer</p>
          <p className="header-search-text">Search users and explore repos</p>
        </div>
      </div>
      <div className="inputBox">
        <Input setUsername={setUsername}></Input>
      </div>
      <div className={loading ? "center" : ""}>
        {loading && <Loader />}

        {!loading && (
          <div className="users">
            {userList?.map((user, index) => (
              <UserCard key={user.login} user={user} index={index} />
            ))}
          </div>
        )}
      </div>
      {userList && (
        <PaginationBottomBar page={page} setPage={setPage} totalPages={totalPages}/>
      )}
    </div>
  );
}

export default App;
