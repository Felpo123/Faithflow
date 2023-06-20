import { useState, useEffect } from "react";
import { keywordService } from "./service/keyword.js";
function Navbar(){
  return(
    <header className="flex items-center justify-start gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
         fill="currentColor"className="w-12 h-12 pt-6"><path fillRule="evenodd" 
         d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 
         9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 
         0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"/></svg>
      <img src="public\faithflow.png" alt="Faithflow Logo" className="w-28 h-16 aspect-auto pt-2"/>
       
    </header>

  );

}
function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await keywordService(search);
    setResult(data);
    console.log(data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <>
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label className="font-normal mr-2" htmlFor="search">
          Insert Keyword
        </label>
        <input
          type="text"
          id="search"
          name="keyword"
          placeholder="Jesus"
          onChange={handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline w-24 m-2">
          Search
        </button>
      </form>
      <div className="flex flex-col justify-center items-center gap-2">
        {result &&
          result.map((item) => (
            <p className="w-96 " key={item.id}>
              {item.text}
            </p>
          ))}
      </div>
    </>
  );
}

export default App;
