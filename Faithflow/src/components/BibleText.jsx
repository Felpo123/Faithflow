import { useState, useEffect, useRef, useContext } from "react";
import { chaptersService } from "../service/chapters";
import { explainService } from "../service/explain";
import { reflectService } from "../service/reflect";
import { books } from "../constants";
import explain from "../assets/explain.png";
import reflect from "../assets/reflect.png";
import close from "../assets/close.png";
import Icon from "./Icon";
import useMousePosition from "../hooks/useMousePosition";
import { useSearchText } from "../hooks/useSearchText";
import { KeywordContext } from "../context/keywordContext";

const BibleText = () => {
  const inputRef = useRef(null);
  const bibleTextDiv = useRef(null);
  const [chapter, setChapter] = useState(1);
  const [book, setBook] = useState(1);
  const [bookName, setBookName] = useState("Génesis");
  const [version, setVersion] = useState("rv1909");
  const [bookChapters, setBookChapters] = useState("");
  const [showChangeChapter, setShowChangeChapter] = useState(false);
  const [showOptionsBox, setShowOptionsBox] = useState(false);
  const [xCoordinate, setXCoordinate] = useState();
  const [yCoordinate, setYCoordinate] = useState();
  const mousePosition = useMousePosition();
  const { result, searchText, loading, error } = useSearchText();
  const [textToShowOnBox, setTextToShowOnBox] = useState("");
  const [isBoxTextLoading, setIsBoxTextLoading] = useState(false);
  const { sizeText } = useContext(KeywordContext);

  const fetchBibleText = async ({ book, chapter, version }) => {
    searchText({
      book,
      chapter,
      version,
    });
  };

  const handleCloseOptions = (e) => {
    e.preventDefault();
    setShowOptionsBox(false);
    setTextToShowOnBox("");
  };

  const handleCloseText = (e) => {
    e.preventDefault();
    setTextToShowOnBox("");
  };

  const handleBookClick = (book) => {
    if (bookChapters != book) setBookChapters(book);
    else setBookChapters("");
  };

  const handleChapterClick = (c, b, n) => {
    console.log(c, b, n);
    inputRef.current.blur();
    setChapter(c);
    setBook(b);
    setBookName(n);
    fetchBibleText({ book: b, chapter: c, version });
  };

  const handleSelectChange = (e) => {
    setVersion(e.target.value);
    fetchBibleText({
      book,
      chapter,
      version: e.target.value,
    });
  };

  useEffect(() => {
    fetchBibleText({
      book,
      chapter,
      version,
    });
  }, []);

  const handleClickExplain = async (e) => {
    e.preventDefault();
    setTextToShowOnBox("Preparando explicación...");
    let selected = window.getSelection();
    //get selected text
    let selectedText = selected.toString();

    console.log("Enviando a explicar: ", selectedText);

    const response = await explainService(selectedText);
    setTextToShowOnBox(response.generations[0].text);

    console.log(response);
  };

  const handleClickReflect = async (e) => {
    e.preventDefault();
    setTextToShowOnBox("Reflexionando...");
    let selected = window.getSelection();
    //get selected text
    let selectedText = selected.toString();

    console.log("Enviando a reflexionar: ", selectedText);

    const response = await reflectService(selectedText);
    setTextToShowOnBox(response.generations[0].text);

    console.log(response);
  };

  const handleOnMouseUpBibleText = (e) => {
    e.preventDefault();
    setShowOptionsBox(true);

    console.log(bibleTextDiv.current.getBoundingClientRect());
    setXCoordinate(
      mousePosition.x - bibleTextDiv.current.getBoundingClientRect().x - 100
    );
    setYCoordinate(
      mousePosition.y - bibleTextDiv.current.getBoundingClientRect().y + 35
    );
  };

  return (
    <div ref={bibleTextDiv}>
      <div
        className="flex flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center">
          <input
            type="text"
            name="keyword"
            value={`${bookName} ${chapter}`}
            readOnly
            onFocus={() => setShowChangeChapter(true)}
            onBlur={() => setShowChangeChapter(false)}
            className={`rounded-[3px] w-[170px] m-2 px-2 py-1`}
            style={{
              fontSize: `${sizeText}`,
            }}
            ref={inputRef}
          />

          <select
            value={version}
            onChange={handleSelectChange}
            name="version"
            id="version"
            className={`"appearance-none bg-white border border-gray-300 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
            style={{
              fontSize: `${sizeText}`,
            }}
          >
            <option value="kjv">KJV</option>
            <option value="rv1909">Reina-Valera - 1909</option>
            <option value="asv">ASV</option>
            <option value="bbe">BBE</option>
            <option value="dby">DARBY</option>
            <option value="wbt">Webster Bible</option>
            <option value="ylt">Young Literal Translation</option>
          </select>
        </div>
        {/* Div to choose the bible chapter. Initially hidden, opens when click */}
        <div
          onMouseDown={(e) => e.preventDefault()}
          className={`${
            showChangeChapter
              ? "min-w-[500px] w-auto h-[300px] bg-gray-700 "
              : "w-0 h-0"
          } text-white rounded-[5px] transition-all duration-500 overflow-auto flex flex-col items-center text-justify max-h-[300px] mb-4`}
          style={{
            fontSize: `${sizeText}`,
          }}
        >
          {books &&
            books.map((book) => (
              <div
                onClick={() => handleBookClick(book.n)}
                className={`${
                  bookChapters == book.n
                    ? `h-[${55 + 25 * (book.count / 15)}px]`
                    : "h-[30px]"
                } flex flex-col justify-center gap-1 w-full hover:bg-[#3bb7e4d6] text-blue p-1 transition-all duration-200 cursor-pointer`}
                key={book.b}
              >
                {book.n}
                {/* Div que contiene todos los capítulos */}
                <div
                  className={`${
                    bookChapters == book.n
                      ? `w-[500px] h-[${55 + 25 * (book.count / 15)}px]`
                      : "w-0 h-0"
                  } flex flex-wrap max-h-[600px] transition-all duration-500 ease-in-out`}
                >
                  {Array.from({ length: book.count }).map((_, i) => (
                    <span
                      onClick={() => handleChapterClick(i + 1, book.b, book.n)}
                      className={`text-center p-1 ${
                        bookChapters == book.n
                          ? "opacity-100 w-[35px] h-[35px]"
                          : "opacity-0 w-0 h-0"
                      } hover:text-[#5762d7] transition-all duration-400 ease-in-out cursor-pointer`}
                      key={i + 1}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        onMouseUp={handleOnMouseUpBibleText}
        className="overflow-auto flex flex-col items-center gap-2 p-5 text-justify max-h-[85vh]"
      >
        {loading ? (
          <p style={{
            fontSize: `${sizeText}`,
          }} className={`text-white`}>Loading...</p>
        ) : (
          result.map((item) => (
            <p className={`w-[100%] text-white`} style={{
              fontSize: `${sizeText}`,
            }} key={item.id}>
              <b>{item.verse}</b> {item.text}
            </p>
          ))
        )}
        {error && <p style={{
              fontSize: `${sizeText}`,
            }} className={` text-white`}>Error...</p>}
      </div>
      {/* Tailwind didnt help me when I tried to implement dynamic positioning. */}
      {showOptionsBox && (
        <div
          className="flex flex-col rounded-md"
          style={{
            top: `${yCoordinate}px`,
            left: `${xCoordinate}px`,
            position: "absolute",
            backgroundColor: "rgb(228, 232, 234)",
          }}
        >
          {/* Functionalities */}
          <div>
            {textToShowOnBox.length == 0 ? (
              <div className="flex justify-center items-center gap-2 mt-[7px] w-[200px] h-[34px]">
                <div className="w-0 h-0 absolute top-[-46%] left-[45%] border-[10px] border-x-transparent border-t-transparent border-b-[#e4e8ea]"></div>
                <div onClick={(e) => handleCloseOptions(e)}>
                  <Icon
                    image={close}
                    name="close"
                    disabled={false}
                    isActive={false}
                    styles="w-4 h-4 hover:w-5 hover:h-5 pb-2 absolute top-2 right-2"
                  />
                </div>
                <div
                  className="w-6 h-6 "
                  onClick={(e) => handleClickReflect(e)}
                >
                  <Icon
                    image={reflect}
                    name="reflect"
                    disabled={false}
                    isActive={false}
                    styles="w-6 h-6 hover:w-7 hover:h-7"
                  />
                </div>
                <div className="w-6 h-6" onClick={(e) => handleClickExplain(e)}>
                  <Icon
                    image={explain}
                    name="explain"
                    disabled={false}
                    isActive={false}
                    styles="w-8 h-8 hover:w-9 hover:h-9 pb-2"
                  />
                </div>
              </div>
            ) : (
              <div className=" w-[300px] h-[200px] px-2 py-3 overflow-scroll">
                <div className="w-0 h-0 absolute top-[-4.7%] left-[45%] border-[10px] border-x-transparent border-t-transparent border-b-[#e4e8ea]"></div>
                <div onClick={(e) => handleCloseText(e)}>
                  <Icon
                    image={close}
                    name="close"
                    disabled={false}
                    isActive={false}
                    styles="w-4 h-4 hover:w-5 hover:h-5 pb-2 absolute top-2 right-2"
                  />
                </div>
                <p>{textToShowOnBox}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <div className={`absolute top-[${445.5}px] left-[${346.2}px] w-[30vw] h-[30vh] bg-sky-500`}>

        </div> */}
    </div>
  );
};

export default BibleText;
