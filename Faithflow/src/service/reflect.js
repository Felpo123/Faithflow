export async function reflectService(text) {
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
        prompt:
          "Based on the following bible verses, reflect on practical actions that I can make to be a better christian, everything that you write, make it consistent with the folowing bible verses: " +
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
  
