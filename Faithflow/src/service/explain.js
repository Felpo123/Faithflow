export async function explainService(text) {
  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/generate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
    },
    body: JSON.stringify({
      max_tokens: 1000,
      return_likelihoods: "NONE",
      truncate: "END",
      randomness: 1.4,
      prompt:
        "Explain the following in a way that it is easy to understand the key points. Dont repeat the bible verses, explain in bullet points: " +
        text,
    }),
  };

  try {
    const response = await fetch(options.url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
