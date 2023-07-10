import React, { useState, useEffect } from "react";
import { books } from "../constants";
import { keywordService } from "../service/keyword";

export default function Keyword({ keyword }) {
  const [results, setResults] = useState("");
  const getBookName = (book) => {
    return books[book - 1].n;
  };
  
  
  const fetchKeywordResults = async (keyword) => {
    const data = await keywordService(keyword);
    setResults(data);
    console.log(data);
    console.log(keyword);
  };
  

  useEffect(() => {
    fetchKeywordResults(keyword);
  }, [keyword]);
  return (
    <div className="text-white pt-16 space-y-[10px]">
      <p>
        Search results for: <span className="italic">{keyword}</span>
      </p>
      {results &&
        results.map((item) => (
          <p className="w-[100%] text-white" key={item.id}>
            <b fill="blue">
              {getBookName(item.book)} {item.chapter}:{item.verse}{" "}
            </b>
            <b>{item.text}</b>
            <b></b>
          </p>
        ))}
    </div>
  );
}
