import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchPage from "./pages/SearchPage.jsx";

function App() {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat min-h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
