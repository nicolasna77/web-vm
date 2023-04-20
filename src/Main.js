import versions from "./autorisation.json";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Card from "./componants/Card";
import Notification from "./componants/addNotification";
import { createResources } from "./api/create-vm.js";

const Main = () => {
  const [name, setName] = useState("");
  const [selectOs, setSelectOs] = useState("");
  const { user } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectOs(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      // Call the createResources() function with the parameters
      await createResources(name, selectOs);
    } catch (error) {
      console.log(error);
    }

    // create_vm(name, selectOs);
    const newCards = {
      name: name,
      selectOs: selectOs,
    };
    setCards([...cards, newCards]);
    showNotification("Votre machine est en cour ");
    console.log(cards);
    event.preventDefault();
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
        <h1 class="text-5xl align-middle text-center p-8  m-auto font-extrabold ">
          <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">
            <div> Bienvenue</div>
          </small>
          {user.email}
        </h1>

        <div className="m-8 p-5 mx-auto bg-slate-300 max-w-lg  rounded-lg relative ">
          <h2 className="text-2xl font-bold  my-5 ml-6 ">
            Créer une machine virtuelle
          </h2>

          <form className="flex" onSubmit={handleSubmit}>
            <div class="m-3 ">
              <label
                for="countries_multiple"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nom de la machine virtuelle
              </label>
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div class="m-3 ">
              <label
                for="countries_multiple"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Image
              </label>

              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={selectOs}
                onChange={handleSelectChange}
                required
                id="select-os"
              >
                {versions.map((e, i) => {
                  return (
                    <>
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
                            value={e.os + " " + value}
                          >
                            {value}
                          </option>
                        );
                      })}
                    </>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              class="text-white m-3 my-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   p-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <div class="grid container m-auto grid-cols-2 p-3 lg:grid-cols-4 gap-5">
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
