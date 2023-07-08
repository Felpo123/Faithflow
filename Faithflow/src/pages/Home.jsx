import { useContext, useState } from "react";
import { BibleText, Form, NavBar, Keyword } from "../components";
import { KeywordContext } from "../context/keywordContext.jsx";

export default function Home() {
  const [showSecondVersion, setShowSecondVersion] = useState(false);
  const [showKeyword, setShowKeyword] = useState(false);
  const { keyword, setKeyword } = useContext(KeywordContext);

  const handleToggleSecondVersion = () => {
    if (showKeyword) {
      setShowKeyword(!showKeyword);
    } else setShowSecondVersion(!showSecondVersion);
  };

  return (
    <div className="max-w-[95vw] my-0 mx-auto">
      <NavBar>
        <Form
          setShowKeyword={setShowKeyword}
          setShowSecondVersion={setShowSecondVersion}
          showSecondVersion={showSecondVersion}
          setKeyword={setKeyword}
        />
      </NavBar>
      {/* Ambas porciones de texto */}
      <div className="flex justify-center gap-[70px]">
        <div
          className={`my-0 w-[50vw] min-w-[600px] ease-in-out duration-300 ${
            showSecondVersion || showKeyword
              ? "-translate-x-0"
              : "translate-x-[24vw]"
          }`}
        >
          <BibleText showSecondVersion={false} />
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
          {showKeyword ? <Keyword keyword={keyword} /> : null}
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
