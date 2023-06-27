import React from "react";

function Form({ setShowKeyword, setShowSecondVersion, showSecondVersion, setKeyword }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (!showSecondVersion ) {
      setShowKeyword(true);
      setKeyword(e.target.keyword.value); 
    }else {
      setShowSecondVersion(false);
      setShowKeyword(true);
      setKeyword(e.target.keyword.value); 
    }
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="flex items-center justify-center">
          <div className="bg-transparent rounded-full border border-white flex">
            <input
              className="rounded-l-full py-2 px-4 bg-transparent text-white focus:outline-none"
              type="text"
              name="keyword"
              placeholder="Input Keyword"
              required
            />
            <button
              className="rounded-r-full bg-transparent transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
