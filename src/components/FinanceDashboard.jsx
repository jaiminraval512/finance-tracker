import React, { useEffect, useState } from "react";
import { deleteTransaction, getTransaction } from "../api/FinanceApi";
import AddForm from "./addForm";
import { CalculationSummary } from "./CalculationSummary";

const FinanceDashboard = () => {
  const [transaction, settransaction] = useState([]);
  const [updateForm, setupdateForm] = useState({});
  const [filter, setfilter] = useState("");
  const [search, setsearch] = useState("");

  //   get operation

  const getData = async () => {
    const res = await getTransaction();
    settransaction(res.data);
  };
  useEffect(() => {
    getData();
  }, [settransaction]);

  //   delete operation

  const deleteData = async (id) => {
    const res = await deleteTransaction(id);
    console.log(res);
    if (res.status === 200) {
      const updateData = transaction.filter((elem) => {
        return elem.id !== res.data.id;
      });
      settransaction(updateData);
    }
  };

  //   update operation

  const updateData = (data) => {
    setupdateForm(data);
  };
  const { totalBalance, totalExpense, totalIncome } = CalculationSummary({
    transaction,
  });

  const filterData = transaction.filter((elem) => {
    if (filter === "expense") {
      if (search.length >= 1) {
        return elem.title?.includes(search.toLowerCase().trim());
      } else {
        return elem.type?.toLowerCase().trim() == "expense";
      }
    } else if (filter === "income") {
      if (search.length >= 1) {
        return elem.title?.includes(search.toLowerCase().trim());
      } else {
        return elem.type?.toLowerCase().trim() == "income";
      }
    } else if (search.length >= 1) {
      return elem.title?.includes(search.toLowerCase().trim());
    } else return true;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6 sm:p-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Finance <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Welcome back! Here's your financial overview for{" "}
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            .
          </p>
        </div>

        {/* Chota sa active status badge */}
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Tracking
        </div>
      </header>
      <section>
        <AddForm
          transaction={transaction}
          settransaction={settransaction}
          updateData={updateForm}
          setupdateData={setupdateForm}
        />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-600 text-white p-6  rounded-2xl shadow-md">
          <p className="text-sm font-medium opacity-80 uppercase">
            Total Balance
          </p>
          <h3 className="text-3xl font-black mt-2">{totalBalance}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-sm font-medium text-gray-400 uppercase">
            Total Income
          </p>
          <h2 className="text-3xl font-black text-green-600 mt-2">
            {totalIncome}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-sm font-medium text-gray-400 uppercase">
            Total Expense
          </p>
          <h2 className="text-3xl font-black text-green-600 mt-2">
            {totalExpense}
          </h2>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-4 mb-6 ">
        <div className="flex gap-4 ">
          <button
            className={`px-4 py-1 rounded-xl text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border"}`}
            onClick={() => setfilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-xl text-sm font-medium transition-colors ${filter === "expense" ? "bg-red-600 text-white" : "bg-white text-gray-600 border"}`}
            onClick={() => setfilter("expense")}
          >
            Expense
          </button>
          <button
            className={`px-4 py-1 rounded-xl text-sm font-medium transition-colors ${filter === "income" ? "bg-green-600 text-white" : "bg-white text-gray-600 border"}`}
            onClick={() => setfilter("income")}
          >
            Income
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="border px-3 py-1 rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500  border-gray-200"
          placeholder="Search By Title..."
        />
      </section>

      <section className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterData.map((elem, idx) => {
          const { id, date, title, amount, type, category } = elem;

          const isExpense =
            type?.toLowerCase().trim() === "expense" ||
            type?.toLowerCase().trim() === "debit";

          return (
            <div
              key={idx}
              className="bg-white  shadow-sm p-6 hover:shadow-md  transition-shadow duration-300  rounded-2xl flex flex-col justify-between  "
            >
              <div className="flex mb-3 justify-between items-center ">
                <span className="text-gray-600 bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {category}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-md ${isExpense ? "bg-red-50 text-red-500 " : "bg-green-50 text-green-500"}`}
                >
                  {type}
                </span>
              </div>
              <h2 className="line-clamp-1 text-xl  font-bold  text-gray-800 mb-1">
                {title}
              </h2>
              <p className="text-xs text-gray-400 mb-4">Date : {date}</p>

              <p
                className={`text-2xl font-black mb-6 ${isExpense ? "text-red-500" : "text-green-500"}`}
              >
                {isExpense ? "-" : "+"}
                {amount}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
                <button
                  className=" px-4 py-2 flex-1 text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-medium rounded-xl transition-colors duration-200 "
                  onClick={() => updateData(elem)}
                >
                  Edit
                </button>
                <button
                  className=" px-4 py-2 flex-1 text-red-600 bg-red-50 hover:bg-red-100 text-sm font-medium rounded-xl transition-colors duration-200 "
                  onClick={() => deleteData(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default FinanceDashboard;
