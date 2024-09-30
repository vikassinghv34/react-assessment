import React, { FormEvent, useState } from "react";
import { popupProps } from "../types/type";
const AddExpense = ({ popup, transactionData }: popupProps) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    transactionData({ amount, description, transactionType: "expense" });
    popup(false);
  };
  return (
    <div className="bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center">
      <div className="w-1/4 border border-black bg-white relative rounded-sm">
        <button
          className="px-2 absolute text-2xl right-0 top-0"
          onClick={() => {
            popup(false);
          }}
        >
          &#10006;
        </button>
        <form
          action=""
          className="p-8 pt-10 gap-4 flex flex-col"
          onSubmit={handleSubmitForm}
        >
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border border-black w-full px-4 py-1 placeholder:text-black rounded-sm"
            required
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-black w-full px-4 py-1 placeholder:text-black rounded-sm"
            required
          />
          <button
            type="submit"
            className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2.5 border border-black rounded-sm"
          >
            Add expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
