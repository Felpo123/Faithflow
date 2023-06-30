import axios from "axios";

export async function explainService(text) {
  const options = {
    method: "POST",
    url: "https://api.cohere.ai/v1/generate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
    },
    data: {
      max_tokens: 1000,
      return_likelihoods: "NONE",
      truncate: "END",
      prompt:
        "Based on the following text, reflect on practical actions that I can make to be a better christian: " +
        text,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
