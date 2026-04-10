import { useNavigate } from "react-router-dom";
import github from "../assets/github.webp"
function Header(){
  const navigate = useNavigate();
    return(
        <div className="header">
        <img src={github} alt="github-image" />
        <div className="header-components">
          <p className="header-github-text">GitHub Explorer</p>
          <p className="header-search-text">Search users and explore repos</p>
        </div>

        
  <div className="header-right">
    <button onClick={() => navigate("/bookmarks")} className="bookmark-btn">Bookmarks</button>
  </div>
      </div>
    );
}

export default Header;