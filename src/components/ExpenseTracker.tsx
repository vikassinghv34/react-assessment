import React, { useState } from "react";
import AddAmount from "./AddAmount";
import AddExpense from "./AddExpense";
import TransactionsPopup from "./TransactionsPopup";
import { transactionData } from "../types/type";

const ExpenseTracker = () => {
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [transactions, setTransactions] = useState<transactionData[]>([]);
  const [openAmountPopup, setOpenAmountPopup] = useState(false);
  const [openExpensePopup, setOpenExpensePopup] = useState(false);
  const [openTransactionPopup, setOpenTransactionPopup] = useState(false);
  const [activeTransactionIndex, setActiveTransactionIndex] =
    useState<number>(0);

  // Handle Buttons
  const handleAmountButton = () => {
    setOpenAmountPopup(true);
  };
  const handleExpenseButton = () => {
    setOpenExpensePopup(true);
  };
  const handleTransactionButton = (index: number) => {
    setOpenTransactionPopup(true);
    setActiveTransactionIndex(index);
  };

  // Handle Popups
  const handleAmountPopup = (popupData: boolean) => {
    setOpenAmountPopup(popupData);
  };
  const handleExpensePopup = (popupData: boolean) => {
    setOpenExpensePopup(popupData);
  };
  const handleTransactionPopup = (popupData: boolean) => {
    setOpenTransactionPopup(popupData);
  };

  //Handle Popup Data
  const handleAmountData = (receivedData: transactionData) => {
    setBalanceAmount(balanceAmount + receivedData?.amount);
    setTransactions([...transactions, receivedData]);
    handleAmountPopup(false);
  };
  const handleExpenseData = (receivedData: transactionData) => {
    setExpenseAmount(expenseAmount + receivedData?.amount);
    if (receivedData.amount > balanceAmount) {
      alert("Insufficient Balance");
      setExpenseAmount(expenseAmount);
    } else {
      setBalanceAmount(balanceAmount - receivedData?.amount);
      setTransactions([...transactions, receivedData]);
    }
    handleAmountPopup(false);
  };

  // Balance and Expense will update based on the updated data /received data
  const handleTransactionData = (receivedData: transactionData) => {
    setTransactions((Transactions) =>
      Transactions.map((transaction, index) =>
        index === receivedData?.index ? receivedData : transaction
      )
    );

    if (receivedData?.transactionType === "expense") {
      setBalanceAmount(
        balanceAmount +
          transactions[receivedData?.index as number]?.amount -
          receivedData?.amount
      );
      setExpenseAmount(
        expenseAmount -
          transactions[receivedData?.index as number]?.amount +
          receivedData?.amount
      );
    } else {
      setBalanceAmount(
        balanceAmount -
          transactions[receivedData?.index as number]?.amount +
          receivedData?.amount
      );
    }
  };

  const handleRemoveTransactionData = (receivedData: transactionData) => {
    setTransactions((Transactions) =>
      Transactions.filter((transaction, index) =>
        index === receivedData?.index ? null : transaction
      )
    );
  };

  return (
    <section className="bg-zinc-300 h-screen w-screen">
      <div className="container h-full  mx-auto flex justify-center items-center">
        <div className="w-1/4 border border-black bg-white rounded-sm">
          <div className="px-8 flex flex-col text-center gap-4 pt-4 pb-8">
            <h2 className="font-bold">Expense Tracker</h2>

            {/* Balance & Expense */}
            <div className="border border-black rounded-sm">
              <div className="p-2 flex items-center justify-evenly">
                <div>
                  <h3 className="font-medium">Balance</h3>
                  <p className="font-bold">$ {balanceAmount}</p>
                </div>
                <span className="border-black border h-12 px-[2px] bg-gray-400 rounded-sm" />
                <div>
                  <h3 className="font-medium">Expense</h3>
                  <p className="font-bold">$ {expenseAmount}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <button
              className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2.5 border border-black rounded-sm"
              onClick={handleAmountButton}
            >
              Add amount
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-black font-bold py-2.5 border border-black rounded-sm"
              onClick={handleExpenseButton}
            >
              Add expense
            </button>

            {/* Transactions */}
            <div className="flex flex-col gap-2 pt-4">
              <p className="font-bold text-start">
                {transactions?.length > 0
                  ? "Recent Transactions"
                  : "No Transactions Found"}
              </p>
              {transactions
                ?.slice()
                ?.reverse()
                ?.map((transaction: transactionData, index) => (
                  <div
                    key={index}
                    className="flex gap-2 justify-between border border-black p-2 rounded-sm"
                    onClick={() => handleTransactionButton(index)}
                  >
                    <div className="flex gap-2">
                      <span
                        className={` ${
                          transaction?.transactionType === "expense"
                            ? " "
                            : "rotate-180 text-gray-400"
                        }`}
                      >
                        &#11205;
                      </span>
                      <p>{transaction.description}</p>
                    </div>
                    <p className="font-bold">$ {transaction.amount}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {openAmountPopup && (
        <AddAmount
          popup={handleAmountPopup}
          transactionData={handleAmountData}
        />
      )}
      {openExpensePopup && (
        <AddExpense
          popup={handleExpensePopup}
          transactionData={handleExpenseData}
        />
      )}

      {openTransactionPopup && (
        <TransactionsPopup
          popup={handleTransactionPopup}
          transactionData={handleTransactionData}
          transaction={transactions[activeTransactionIndex]}
          transactionId={activeTransactionIndex}
          deleteTransactionData={handleRemoveTransactionData}
        />
      )}
    </section>
  );
};

export default ExpenseTracker;
