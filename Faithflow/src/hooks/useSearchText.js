import { useState } from "react";
import { chaptersService } from "../service/chapters";

export function useSearchText() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchText = async ({ book, chapter, version }) => {
    try {
      console.log(book, chapter, version);
      setLoading(true);
      setError(null);
      const search = await chaptersService({ book, chapter, version });
      console.log(search);
      setResult(search);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { result, searchText, loading, error };
}
