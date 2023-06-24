import {useState} from "react";
import {BibleText, NavBar} from "../components";

export default function Home() {
  const [showSecondVersion, setShowSecondVersion] = useState(false);

  const handleToggleSecondVersion = () => {
    setShowSecondVersion(!showSecondVersion);
  };

  return <div className="max-w-[95vw] my-0 mx-auto">
    <NavBar/>
    {/* Ambas porciones de texto */}
    <div className="flex justify-center gap-[70px]">
      <div className={`my-0 w-[50vw] ease-in-out duration-300 ${
            showSecondVersion ? "-translate-x-0" : "translate-x-[26vw]"
          }`}>
        <BibleText/>
      </div>
      {/* Porción de texto oculta */}
      <div className={`my-0 w-[50vw] ease-in-out duration-300 ${showSecondVersion ? "translate-x-0": "translate-x-[50vw]"}`}>
        <BibleText/>
      </div>
    </div>
    <button onClick={handleToggleSecondVersion} className="fixed right-[-12px] top-1/2 pb-[2px] transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-l-full focus:outline-none focus:shadow-outline w-8 h-8 m-2">{showSecondVersion ? ">" : "<"}</button>
  </div>;
}