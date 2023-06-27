import { useState } from "react";
import { BibleText, NavBar } from "../components";
import Keyword from "../components/Keyword";

export default function Home() {
  const [showSecondVersion, setShowSecondVersion] = useState(false);
  const [showKeyword, setShowKeyword] = useState(false);
  const[keyword,setKeyword] = useState('');

  const handleToggleSecondVersion = () => {
    if (showKeyword && !showSecondVersion) {
      setShowKeyword(!showKeyword);
    } else setShowSecondVersion(!showSecondVersion);
  };
  const finalCallback = (data) =>{
    setKeyword(data);
    console.log(keyword+" desde home");
  

  }

  return (
    <div className="max-w-[95vw] my-0 mx-auto">
      <NavBar setShowKeyword={setShowKeyword} showKeyword={showKeyword} showSecondVersion={showSecondVersion} finalCallback={finalCallback} />
      {/* Ambas porciones de texto */}
      <div className="flex justify-center gap-[70px]">
        <div
          className={`my-0 w-[50vw] min-w-[600px] ease-in-out duration-300 ${
            showSecondVersion || showKeyword
              ? "-translate-x-0"
              : "translate-x-[24vw]"
          }`}
        >
          <BibleText />
        </div>
        {/* Porción de texto oculta */}
        <div
          className={`my-0 w-[50vw] ease-in-out duration-300 ${
            showSecondVersion || showKeyword
              ? "translate-x-0"
              : "translate-x-[50vw]"
          }`}
        >
          {showSecondVersion ? <BibleText showSecondVersion /> : null}
          {showKeyword ? <Keyword showKeyword keyword={keyword} /> : null}
        </div>
      </div>
      <button
        onClick={handleToggleSecondVersion}
        className="fixed right-[-12px] top-1/2 pb-[2px] transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-l-full focus:outline-none focus:shadow-outline w-8 h-8 m-2"
      >
        {showSecondVersion || showKeyword ? ">" : "<"}
      </button>
    </div>
  );
}
