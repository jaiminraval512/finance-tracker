import React, { useEffect, useState } from "react";
import { postTransaction, putTransaction } from "../api/FinanceApi";

const AddForm = ({
  transaction,
  settransaction,
  updateData,
  setupdateData,
}) => {
  const [formData, setformData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    date: "",
  });

  const isButton = Object.keys(updateData).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //   put opration

  const putOperation = async () => {
    const res = await postTransaction(formData);
    console.log(res);
    if (res.status === 201) {
      settransaction([...transaction, res.data]);
    }
  };

  // update operation
  useEffect(() => {
    const { id, date, title, amount, type, category } = updateData;

    setformData({
      title: title || "",
      date: date || "",
      amount: amount || "",
      type: type || "",
      category: category || "",
    });
  }, [updateData]);

  const updateOperation = async () => {
    const res = await putTransaction(updateData.id, formData);

    if (res.status === 200) {
      settransaction((prev) => {
        return prev.map((elem) => {
          return elem.id === updateData.id ? res.data : elem;
        });
      });
      setformData({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
      setupdateData({});
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (
      (!formData.title ||
      !formData.amount ||
      !formData.type ||
      !formData.date ||
      !formData.category)
    ) {
      alert("Please Fill The All Field ! ");
      return;
    }
    if (action === "Save") {
      updateOperation();
    } else if (action === "Add") {
      putOperation();
    }
    setformData({
      title: "",
      amount: "",
      type: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="flex justify-center text-white p-4">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-end mb-8"
      >
        
        <div className="flex flex-col w-full lg:col-span-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            type="text"
            placeholder="e.g., Grocery, Rent, Salary"
          />
        </div>

        
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Amount
          </label>
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            type="number"
            placeholder="0.00"
          />
        </div>

        
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm cursor-pointer"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

       
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm cursor-pointer"
          >
            <optgroup label="Income">
              <option value="Salary">Salary</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Business">Business</option>
              <option value="Pocket Money">Pocket Money</option>
              <option value="Investment Returns">Investment Returns</option>
            </optgroup>

            <optgroup label="Expense">
              <option value="Food & Grocerie">Food & Groceries</option>
              <option value="Rent">Rent</option>
              <option value="Bills & Recharge">Bills & Recharge</option>
              <option value="Transport & Fuel">Transport & Fuel</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Medical">Medical & Health</option>
              <option value="Education">Education</option>
              <option value="Personal Care">Personal Care</option>
              <option value="EMI & Loans">EMI & Loans</option>
              <option value="Gifts & Donations">Gifts & Donations</option>
              <option value="Other">Other</option>
            </optgroup>
          </select>
        </div>

        
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Date
          </label>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm cursor-pointer"
            type="date"
          />
        </div>

        
        <button
          className="w-full px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors md:col-span-2 lg:col-span-1 h-[42px]"
          type="submit"
          value={isButton ? "Add" : "Save"}
        >
          {isButton ? "Add" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
