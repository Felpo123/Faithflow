import { useState, useEffect } from "react";
import { keywordService } from "./service/keyword.js";

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
