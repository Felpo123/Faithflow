import { useState, useEffect, useRef} from "react";
import { chaptersService} from "../service/chapters";
import { books } from "../constants";

const BibleText = ({showSecondVersion}) => {
    const inputRef = useRef(null)
    const [chapter, setChapter] = useState("01");
    const [book, setBook] = useState("01");
    const [bookName, setBookName] = useState("Génesis");
    const [version, setVersion] = useState("rv1909");
    const [result, setResult] = useState(``);
    const [bookChapters, setBookChapters] = useState("")
    const [showChangeChapter, setShowChangeChapter] = useState(false);
  
    const fetchBibleText = async () => {
      /* const data = await chaptersService({ book, chapter, version });
      setResult(data); */
    };

    const handleBookClick = (book) => {
      if(bookChapters != book) setBookChapters(book);
      else setBookChapters("")
    }

    const handleChapterClick = (c, b, n) => {
      inputRef.current.blur()
      setChapter(c);
      setBook(b);
      setBookName(n);
      fetchBibleText()
    }

    const handleSelectChange = (e) => {
      setVersion(e.target.value)
      fetchBibleText()
    }

    /* useEffect(() => {
      fetchBibleText();
      if (!showSecondVersion) fetchBibleText();	
    }, []); */
    
    return (
      <div /* onClick={() => setShowChangeChapter(false)} */>
        <div className="flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className='flex justify-center items-center' >
            <input
              type="text"
              name="keyword"
              value={`${bookName} ${chapter}`}
              readOnly
              onFocus={() => setShowChangeChapter(true)}
              onBlur={() => setShowChangeChapter(false)}
              className="rounded-[3px] w-[170px] m-2 px-2 py-1"
              ref={inputRef}
            />
            
            <select value={version} onChange={handleSelectChange} name="version" id="version" className="appearance-none bg-white border border-gray-300 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:border-blue-500">
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
          <div onMouseDown={(e) => e.preventDefault()} className={`${showChangeChapter ? 'w-[500px] h-[300px] bg-gray-700 ' : 'w-0 h-0'} text-white rounded-[5px] transition-all duration-500 overflow-auto flex flex-col items-center text-justify max-h-[300px] mb-4`}>
            {books &&
              books.map((book) => (
                <div onClick={() => handleBookClick(book.n)} className={`${bookChapters==book.n ? `h-[${55+25*(book.count/15)}px]` : 'h-[30px]'} flex flex-col justify-center gap-1 w-full hover:bg-[#3bb7e4d6] text-blue p-1 transition-all duration-200 cursor-pointer`} key={book.b}>
                 {book.n}
                 {/* Div que contiene todos los capítulos */}
                 <div className={`${bookChapters==book.n ? `w-[500px] h-[${55+25*(book.count/15)}px]` : 'w-0 h-0'} flex flex-wrap max-h-[600px] transition-all duration-500 ease-in-out`}>
                    {
                      Array.from({length: book.count}).map((_, i) => (
                        <span onClick={() => handleChapterClick(i, book.b, book.n)} className={`text-center p-1 ${bookChapters==book.n ? 'opacity-100 w-[35px] h-[35px]' : 'opacity-0 w-0 h-0'} hover:text-[#5762d7] transition-all duration-400 ease-in-out cursor-pointer`} key={i + 1}>{i + 1}</span>
                      ))
                    }
                 </div>
                </div>
              ))}
          </div>
        </div>
        <div className="overflow-auto flex flex-col items-center gap-2 p-5 text-justify max-h-[85vh]">
        {result &&
            result.map((item) => (
              <p className="w-[100%] text-white" key={item.id}>
                <b>{item.verse}</b> {item.text}
              </p>
            ))}
        </div>
      </div>
    );
  }

export default BibleText