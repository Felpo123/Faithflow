import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);

  async function fetchApi() {
    const url = 'https://iq-bible.p.rapidapi.com/GetSearch?query=Messiah&versionId=kjv';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'feb520f84dmsh1098756470d4753p1ae6c2jsn4394f4832ea6',
        'X-RapidAPI-Host': 'iq-bible.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
        {result.map((item) => (
          <p key={item.id}>{item.t}</p>
        ))}
    </>
  );
}

export default App;
