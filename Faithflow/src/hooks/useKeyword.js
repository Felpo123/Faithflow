import { useState } from "react";
import { keywordService } from "../service/keyword";

export function useKeyword({ keyword }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchKeyword = async () => {
    try {
      setLoading(true);
      setError(null);
      const search = await keywordService(keyword);
      setResult(search);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { result, searchKeyword, loading, error };
}
