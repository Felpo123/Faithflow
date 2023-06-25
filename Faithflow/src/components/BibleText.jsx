import React from 'react'
import { useState, useEffect} from "react";
import { chapterService } from "../service/chapters.js";

const BibleText = ({showSecondVersion}) => {
    const [search, setSearch] = useState("01");
    const [book, setBook] = useState("01");
    const [version, setVersion] = useState("kjv");
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
    
    useEffect( () => {
      async function fetchData() {
        const data = await chapterService({ book, chapter: search, version });
        setResult(data);
      }
      if (!showSecondVersion) fetchData();	
    }, [book, search, showSecondVersion, version])

    return (
      <div>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center">
            <div className='flex flex-col justify-center items-center'>
              <label className="font-normal max-w-1 mr-2 text-white" htmlFor="search">
                Chapter
              </label>
              <input
                type="text"
                id="search"
                name="keyword"
                placeholder="01"
                onChange={handleChange}
                className="rounded-[3px] w-20 m-2 px-2"
                />
            </div>
            <div className='flex flex-col justify-center items-center'>
            <label className="font-normal max-w-1 mr-2 text-white" htmlFor="search">
                Book
              </label>
              <input
                type="text"
                id="book"
                name="book"
                placeholder="01"
                onChange={(e) => {
                  e.preventDefault();
                  setBook(e.target.value);
                }}
                className="rounded-[3px] w-20 m-2 px-2"
                />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <label className="font-normal max-w-1 mr-2 text-white" htmlFor="search">
                Chapter
              </label>
              <input
                type="text"
                id="version"
                name="version"
                placeholder="kjv"
                onChange={(e) => {
                  e.preventDefault();
                  setVersion(e.target.value);
                }}
                className="rounded-[3px] w-20 m-2 px-2"
                />
            </div>
          </div>
          <button className="transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline w-24 h-full m-2">
            Search
          </button>
        </form>
        <div className="overflow-auto flex flex-col items-center gap-2 p-5 text-justify max-h-[80vh]">
          {result &&
            result.map((item) => (
              <p className="w-[80%] text-white" key={item.id}>
                <b>{item.verse}</b> {item.text}
              </p>
            ))}
        </div>
      </div>
    );
  }

export default BibleText