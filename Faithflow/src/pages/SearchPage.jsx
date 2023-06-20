import { useState, useEffect } from "react";
import { keywordService } from "../service/keyword.js";
import { chapterService } from "../service/chapters.js";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [book, setBook] = useState("");
  const [version, setVersion] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const data = await keywordService(search);
    const data = await chapterService({ book, chapter: search, version });
    setResult(data);
    console.log(data);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="max-w-4xl my-0 mx-auto">
      <h1 className="text-3xl font-bold underline text-white">Hello world!</h1>
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label className="font-normal mr-2 text-white" htmlFor="search">
          Insert Keyword
        </label>
        <input
          type="text"
          id="search"
          name="keyword"
          placeholder="chapter"
          onChange={handleChange}
        />
        <input
          type="text"
          id="book"
          name="book"
          placeholder="book"
          onChange={(e) => {
            e.preventDefault();
            setBook(e.target.value);
          }}
        />
        <input
          type="text"
          id="version"
          name="version"
          placeholder="version"
          onChange={(e) => {
            e.preventDefault();
            setVersion(e.target.value);
          }}
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline w-24 m-2">
          Search
        </button>
      </form>
      <div className="flex flex-col justify-center items-center gap-2">
        {result &&
          result.map((item) => (
            <p className="w-96 text-white" key={item.id}>
              <b>{item.verse}</b> {item.text}
            </p>
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
