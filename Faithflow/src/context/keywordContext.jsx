import { createContext, useState } from "react";

export const KeywordContext = createContext();

export const KeywordProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [sizeText, setsizeText] = useState("base");

  return (
    <KeywordContext.Provider
      value={{
        keyword,
        setKeyword,
        sizeText,
        setsizeText,
      }}
    >
      {children}
    </KeywordContext.Provider>
  );
};
