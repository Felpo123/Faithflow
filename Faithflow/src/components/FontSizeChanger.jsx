import React, { useContext } from "react";
import { KeywordContext } from "../context/keywordContext";

function FontSizeChanger() {
  const { sizeText, setsizeText } = useContext(KeywordContext);
  return (
    <div className="pt-2">
      <select
        value={sizeText}
        onChange={(e) => {
          e.preventDefault();
          setsizeText(e.target.value);
        }}
        name="sizeText"
        id="sizeText"
        className="w-10 appearance-none pl-1 border bg-transparent border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 text-white"
      >
        <option value="lg" className="text-black">
          SM
        </option>
        <option value="xl" className="text-black">
          L
        </option>
        <option value="2xl" className="text-black">
          XL
        </option>
      </select>
    </div>
  );
}

export default FontSizeChanger;
