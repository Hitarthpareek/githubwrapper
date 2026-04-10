
import "./App.css";
import { BrowserRouter,Routes, Route  } from "react-router-dom";
import BookmarksPage from "./Pages/BookmarksPage";
import Home from "./Pages/Home";

function App() {


  return (
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;
