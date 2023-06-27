import React, { useState } from "react";
import { books } from "../constants";

function Keyword({ keyword }) {
  const data = [
    {
      "id":"27009025",
      "b":"27",
      "c":"9",
      "v":"25",
      "t":"Know therefore and understand, that from the going forth of the commandment to restore and to build Jerusalem unto the Messiah the Prince shall be seven weeks, and threescore and two weeks: the street shall be built again, and the wall, even in troublous times."},
    { "id":"27009026",
      "b":"27",
      "c":"9",
      "v":"26",
      "t":"And after threescore and two weeks shall Messiah be cut off, but not for himself: and the people of the prince that shall come shall destroy the city and the sanctuary; and the end thereof shall be with a flood, and unto the end of the war desolations are determined."}
  ]
  const getBookName = (book) => {
    return books[book - 1].n;

  };     
  
  const [results, setResults] = useState(data);
  return (
    <div className="text-white pt-16 space-y-[10px]">
      <p>Search results for: <span className="italic">{keyword}</span></p>
      {results && results.map((item) => (
        
        <p className="w-[100%] text-white" key={item.id}>
          <span>{getBookName(item.b)} {item.c}:{item.v} </span>
          <b>{item.t}</b> 
          <b></b>
        </p>  
      ))}</div>
  )

}

export default Keyword;
