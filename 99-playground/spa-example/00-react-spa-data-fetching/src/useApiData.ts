import { useEffect, useState } from "react";


export async function fetchDataFromApi() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const response = await fetch("http://localhost:4444/api");
  const response = await fetch("https://swapi.info/api/people/1");
  const data = await response.json();
  return data.name;
}

export function useApiData() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const messageText = await fetchDataFromApi();
      setData(messageText);
    }
    fetchData();
  }, []);
  return data;
}

