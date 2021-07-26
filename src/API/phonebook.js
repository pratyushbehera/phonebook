const baseURL = "https://phonebook.pratyush93.repl.co";

export const Get = async (url) => {
  let response = await fetch(baseURL + url);
  if (response.ok) return await response.json();
  throw new Error("Network error");
};

export const Post = async (url, data) => {
  let response = await fetch(baseURL + url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ phoneEntry: data }),
  });
  if (response.ok) return await response.json();
  throw new Error("Network error");
};
