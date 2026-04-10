import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Input from "../components/Input";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import PaginationBottomBar from "../components/PaginationBottomBar";
import Header from "../components/Header";
import Profile from "../components/Profile";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState();
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
        const noofPages = Math.ceil(total / 10);
      setTotalPages(noofPages);
      setLoading(false);
    } catch (e) {
      alert("API limit reached ! Try again in 10 seconds")
      setUsername("")
      setPage(1)
      setLoading(false)
      setUserList()
      
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      handleFormSubmit();
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    handleFormSubmit();
  }, [page]);
  return (
    <div className="root-container">
      <Header/>

      {selectedProfileId ? (
        <Profile username={selectedProfileId} setUsername={setSelectedProfileId} setUserList={setUserList} />
      ) : (
        <div className="search-and-list">
          <div className="inputBox">
            <Input username={username} setUsername={setUsername}></Input>
          </div>
          <div className={loading ? "center" : ""}>
            {loading && <Loader />}

            {!loading && (
              <div className="users">
                {userList?.map((user, index) => (
                  <UserCard
                    key={user.login}
                    user={user}
                    index={index}
                    setSelectedProfileId={setSelectedProfileId}
                  />
                ))}
              </div>
            )}
          </div>

          {userList && (
            <PaginationBottomBar
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
}