import { useContext, useState } from "react";

import { IoPerson } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const [burger, setBurger] = useState(false);
  const closeBothDropdown = () => {
    setBurger(false);
  };

  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="absolute w-full shadow-xl border-gray-200 px-2 sm:px-4 py-5  bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
          vm
        </span>
        {isAuthenticated ? (
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm rounded-full md:mr-0 bg-slate-200 p-1 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              onClick={burger ? closeBothDropdown : () => setBurger(true)}
            >
              <IoPerson className="w-7 h-7 text-black" />
            </button>

            <div
              className={
                "z-50  w-44 my-4 text-base list-none container bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 " +
                (burger
                  ? "absolute translate-y-24  -translate-x-32"
                  : " hidden")
              }
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
export default NavBar;
