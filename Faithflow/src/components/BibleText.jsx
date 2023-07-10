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

const BibleText = ({ showSecondVersion }) => {
  const data = [
    {
      id: "01001001",
      book: "1",
      chapter: "1",
      verse: "1",
      text: "In the beginning God created the heaven and the earth.",
    },
    {
      id: "01001002",
      book: "1",
      chapter: "1",
      verse: "2",
      text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
    },
    {
      id: "01001003",
      book: "1",
      chapter: "1",
      verse: "3",
      text: "And God said, Let there be light: and there was light.",
    },
    {
      id: "01001004",
      book: "1",
      chapter: "1",
      verse: "4",
      text: "And God saw the light, that it was good: and God divided the light from the darkness.",
    },
    {
      id: "01001005",
      book: "1",
      chapter: "1",
      verse: "5",
      text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
    },
    {
      id: "01001006",
      book: "1",
      chapter: "1",
      verse: "6",
      text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
    },
    {
      id: "01001007",
      book: "1",
      chapter: "1",
      verse: "7",
      text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
    },
    {
      id: "01001008",
      book: "1",
      chapter: "1",
      verse: "8",
      text: "And God called the firmament Heaven. And the evening and the morning were the second day.",
    },
    {
      id: "01001009",
      book: "1",
      chapter: "1",
      verse: "9",
      text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
    },
    {
      id: "01001010",
      book: "1",
      chapter: "1",
      verse: "10",
      text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
    },
    {
      id: "01001011",
      book: "1",
      chapter: "1",
      verse: "11",
      text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.",
    },
    {
      id: "01001012",
      book: "1",
      chapter: "1",
      verse: "12",
      text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.",
    },
    {
      id: "01001013",
      book: "1",
      chapter: "1",
      verse: "13",
      text: "And the evening and the morning were the third day.",
    },
    {
      id: "01001014",
      book: "1",
      chapter: "1",
      verse: "14",
      text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:",
    },
    {
      id: "01001015",
      book: "1",
      chapter: "1",
      verse: "15",
      text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",
    },
    {
      id: "01001016",
      book: "1",
      chapter: "1",
      verse: "16",
      text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
    },
    {
      id: "01001017",
      book: "1",
      chapter: "1",
      verse: "17",
      text: "And God set them in the firmament of the heaven to give light upon the earth,",
    },
    {
      id: "01001018",
      book: "1",
      chapter: "1",
      verse: "18",
      text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
    },
    {
      id: "01001019",
      book: "1",
      chapter: "1",
      verse: "19",
      text: "And the evening and the morning were the fourth day.",
    },
    {
      id: "01001020",
      book: "1",
      chapter: "1",
      verse: "20",
      text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",
    },
    {
      id: "01001021",
      book: "1",
      chapter: "1",
      verse: "21",
      text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.",
    },
    {
      id: "01001022",
      book: "1",
      chapter: "1",
      verse: "22",
      text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.",
    },
    {
      id: "01001023",
      book: "1",
      chapter: "1",
      verse: "23",
      text: "And the evening and the morning were the fifth day.",
    },
    {
      id: "01001024",
      book: "1",
      chapter: "1",
      verse: "24",
      text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.",
    },
    {
      id: "01001025",
      book: "1",
      chapter: "1",
      verse: "25",
      text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.",
    },
    {
      id: "01001026",
      book: "1",
      chapter: "1",
      verse: "26",
      text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
    },
    {
      id: "01001027",
      book: "1",
      chapter: "1",
      verse: "27",
      text: "So God created man in his own image, in the image of God created he him; male and female created he them.",
    },
    {
      id: "01001028",
      book: "1",
      chapter: "1",
      verse: "28",
      text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
    },
    {
      id: "01001029",
      book: "1",
      chapter: "1",
      verse: "29",
      text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
    },
    {
      id: "01001030",
      book: "1",
      chapter: "1",
      verse: "30",
      text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.",
    },
    {
      id: "01001031",
      book: "1",
      chapter: "1",
      verse: "31",
      text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.",
    },
  ];
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
            className={`rounded-[3px] w-[170px] m-2 px-2 py-1 text-${sizeText}`}
            ref={inputRef}
          />

          <select
            value={version}
            onChange={handleSelectChange}
            name="version"
            id="version"
            className={`"appearance-none bg-white border border-gray-300 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-${sizeText}`}
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
          } text-white rounded-[5px] transition-all duration-500 overflow-auto flex flex-col items-center text-justify max-h-[300px] mb-4 text-${sizeText}`}
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
          <p className={`text-${sizeText} text-white`}>Loading...</p>
        ) : (
          result.map((item) => (
            <p className={`w-[100%] text-white text-${sizeText}`} key={item.id}>
              <b>{item.verse}</b> {item.text}
            </p>
          ))
        )}
        {error && <p className={`text-${sizeText} text-white`}>Error...</p>}
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
