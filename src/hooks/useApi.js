import axios from "axios";

export const useApi = () => {
  //creation de la vm










  
  const createVm = async (newCards) => {
    const jsonData = JSON.stringify(newCards);
    // Les options de requête HTTP
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: jsonData,
      url: "http://localhost:4000/createVm",
    };

    // requête HTTP en utilisant axios

    return await axios(options);
  };
  return { createVm };
};
