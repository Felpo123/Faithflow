import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat min-h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
