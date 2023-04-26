import versions from "../autorisation.json";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../componants/Card";
import Notification from "../componants/addNotification";

import { useMutation } from "react-query";
import axios from "axios";

const Main = () => {
  const [name, setName] = useState("");
  const [selectOs, setSelectOs] = useState("");
  const [sku, setSku] = useState("");
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSelectChange = (event) => {
    const res = event.target.value.split("/");
    setSelectOs(res[0]);
    setSku(res[1]);
  };

  const newCards = {
    name: name,
    nameImage: selectOs,
    sku: sku,
  };

  const createVm = useMutation({
    mutationFn: async (request) => {
      return await axios
        .post("http://localhost:4000/createVm", request)
        .then((response) => {
          const temp = cards.push({
            ...cards,
            ...newCards,
            ...response.data,
          });
          setCards(temp);
          console.log(cards);
          showNotification("votre machine est demarrer");
        });
    },
  });

  const deleteVm = useMutation({
    mutationFn: async (request) => {
      return await axios
        .post("http://localhost:4000/deleteVm", request)
        .then((response) => {
          console.log(response);
          showNotification("votre machine est supprimer");
        });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the createResources() function with the parameters
    showNotification("Votre machine est en cour ");
    createVm.mutate(newCards);
  };

  function handleDelete(machineToDelete, resourceGroupName) {
    const updatedMachines = cards.filter(
      (machine) => machine !== machineToDelete
    );
    setCards(updatedMachines);
    deleteVm.mutate(resourceGroupName);
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
            <div className="m-3">
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
          {cards
            ? cards.map((cards, i) => (
                <Card cards={cards} onDelete={handleDelete} key={i} />
              ))
            : ""}
          {createVm.isLoading && (
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Main;
