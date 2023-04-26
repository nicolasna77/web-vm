import { IoTrashOutline } from "react-icons/io5";

const Card = ({ cards, onDelete, key }) => {
  console.log(cards);
  return (
    <div key={key} className="bg-slate-300 rounded-b-xl">
      <div className="max-w-sm p-6 bg-white border shadow-sm border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between">
          <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            {key} {cards.name}
          </h5>
          <div>
            <button
              type="button"
              onClick={() => onDelete(cards, cards.resourceGroupName)}
              className="text-white mr-5 "
            >
              <IoTrashOutline />
            </button>
          </div>
        </div>
        <div className="mt-4 text-gray-500 font-bold text-sm">
          {cards.resourceGroupName}
        </div>
        <div className="mt-1 text-gray-500 font-bold text-sm">{cards.sku}</div>
      </div>
      <div className=" p-3  ">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
};
export default Card;
