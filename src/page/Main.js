import versions from "../autorisation.json";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../componants/Card";
import Notification from "../componants/addNotification";
import { useApi } from "../hooks/useApi";
import { useMutation } from "react-query";
import axios from "axios";

const Main = () => {
  const [name, setName] = useState("");
  const [selectOs, setSelectOs] = useState("");
  const [sku, setSku] = useState("");
  const { user } = useContext(AuthContext);
  // const { createVm } = useApi();
  const [cards, setCards] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
    event.preventDefault();
  };

  const handleSelectChange = (event) => {
    const res = event.target.value.split("/");
    setSelectOs(res[0]);
    setSku(res[1]);
    event.preventDefault();
  };

  const mutation = useMutation({
    mutationFn: (request) => {
      return axios.post("http://localhost:4000/createVm", request);
    },
  });

  const handleSubmit = async (event) => {
    // Call the createResources() function with the parameters
    showNotification("Votre machine est en cour ");

    const newCards = {
      name: name,
      nameImage: selectOs,
      sku: sku,
    };
    mutation.mutate(newCards);
    console.log(mutation.data);
    // const createVm = async (newCards) => {
    //   const jsonData = JSON.stringify(newCards);
    //   // Les options de requête HTTP
    //   const options = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     data: jsonData,
    //     url: "http://localhost:4000/createVm",
    //   };

    //   // requête HTTP en utilisant axios

    //   return await axios(options);
    // };
    // return { createVm };

    // if (response) {
    //   setCards([...cards, newCards]);
    //   showNotification("votre machine est demarrer");
    // }
  };

  function handleDelete(machineToDelete) {
    const updatedMachines = cards.filter(
      (machine) => machine !== machineToDelete
    );
    setCards(updatedMachines);
  }

  const showNotification = (message) => {
    const newNotification = (
      <Notification message={message} onClose={hideNotification} />
    );
    setNotification(newNotification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification}
      <div className="p-5 bg-slate-600 shadow-xl ">
        <h1 className="text-5xl align-middle text-center p-8  m-auto font-extrabold ">
          <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">
            <div> Bienvenue</div>
          </small>
          {user.email}
        </h1>

        <div className="m-8 p-5 mx-auto bg-slate-300 max-w-lg  rounded-lg relative ">
          <h2 className="text-2xl font-bold  my-5 ml-6 ">
            Créer une machine virtuelle
          </h2>

          <form className="flex" onSubmit={handleSubmit}>
            <div className="m-3 ">
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nom de la machine virtuelle
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="m-3 ">
              <label
                htmlFor="countries_multiple"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Image
              </label>

              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={selectOs}
                onChange={handleSelectChange}
                required
                id="select-os"
              >
                <option
                  className="font-bold m-3 text-center text-xl"
                  disabled
                  value=""
                ></option>
                {versions.map((e, i) => {
                  return (
                    <React.Fragment key={i}>
                      <option
                        className="font-bold m-3 text-center text-xl"
                        disabled
                        value={e}
                        key={i}
                      >
                        {e.os}
                      </option>
                      {e.version.map((value, i) => {
                        return (
                          <option
                            className="font-bold m-5 "
                            key={i}
                            value={e.os + "/" + value}
                          >
                            {value}
                          </option>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="text-white m-3 my-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lancée
            </button>
          </form>
        </div>
      </div>
      <div className="w-full pt-10">
        <div className="underline underline-offset-3 decoration-8 dec decoration-blue-600 text-2xl font-bold  my-5 ml-6  ">
          Ressources
        </div>
        <div className="grid container m-auto grid-cols-2 p-3 lg:grid-cols-4 gap-5">
          {cards ? (
            cards.map((cards, i) => (
              <Card cards={cards} onDelete={handleDelete} key={i} />
            ))
          ) : (
            <h1> czedza</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default Main;
