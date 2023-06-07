export async function keywordService(keyword) {
  if (keyword === "") return null;
  const url =
    import.meta.env.VITE_RAPIDAPI_URL +
    "GetSearch?query=" +
    keyword +
    "" +
    "&versionId=kjv";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data) {
      return data?.map((result) => ({
        id: result.id,
        book: result.b,
        chapter: result.c,
        verse: result.v,
        text: result.t,
      }));
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error searching keyword");
  }
}
