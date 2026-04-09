function Header({github}){
    return(
        <div className="header">
        <img src={github} alt="github-image" />
        <div className="header-components">
          <p className="header-github-text">GitHub Explorer</p>
          <p className="header-search-text">Search users and explore repos</p>
        </div>
      </div>
    );
}

export default Header;