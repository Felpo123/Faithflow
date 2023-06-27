import Form from "./Form";
import { useState } from "react";

export default function NavBar({
  setShowKeyword,
  showKeyword,
  showSecondVersion, finalCallback
}) {
  
  

  return (
    <div className="flex items-center justify-center">
      <header className="flex items-center justify-around w-3/4 gap-96">
        <div className="flex item-center justify-center gap-4">
          <div className="w-6 h-6 pt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 
           9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 
           0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <img
            src="\faithflow.png"
            alt="Faithflow Logo"
            className="w-28 h-16 aspect-auto pt-2"
          />
        </div>
        <div>
          <Form
            setShowKeyword={setShowKeyword}
            showKeyword={showKeyword}
            showSecondVersion={showSecondVersion}
            callback={finalCallback}
          />
        </div>
      </header>
    </div>
  );
}
