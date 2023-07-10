import React, { useState, useEffect, useContext } from "react";
import { books } from "../constants";
import { useKeyword } from "../hooks/useKeyword";
import { KeywordContext } from "../context/keywordContext";

export default function Keyword({ keyword }) {
  const { result, searchKeyword, loading, error } = useKeyword({ keyword });
  const { sizeText } = useContext(KeywordContext);
  const getBookName = (book) => {
    return books[book - 1].n;
  };

  useEffect(() => {
    searchKeyword();
  }, [keyword]);

  return (
    <div className="text-white pt-16 space-y-[10px]">
      <p className={`text-${sizeText}`}>
        Search results for: <span className="italic">{keyword}</span>
      </p>
      {loading ? (
        <p className={`text-${sizeText} text-white`}>Loading...</p>
      ) : (
        result.map((item) => (
          <p className={`w-[100%] text-white text-${sizeText}`} key={item.id}>
            <b fill="blue">
              {getBookName(item.book)} {item.chapter}:{item.verse}{" "}
            </b>
            <b>{item.text}</b>
            <b></b>
          </p>
        ))
      )}
      {error && <p className="text-white">Error...</p>}
    </div>
  );
}
