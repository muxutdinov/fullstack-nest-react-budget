import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { IResponseTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionsFrom: FC = () => {
  const [visableModal,setVisableModal] = useState<boolean>(false)
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form method="post" action="/transactions" className="grid gap-2">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            type="text"
            className="input"
            placeholder="Title..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            type="number"
            className="input"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>
        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select className="input" name="category" required>
            {
              categories.map((item,index)=>(
                <option key={index} value={item.id}>{item.title}</option>
              ))
            }
            </select>
          </label>
        ) :
        <h1 className="mt-2 text-red-300">To continue create a category first</h1>
        }
        <button
          onClick={() => setVisableModal(true)}
          className="cursor-pointer mt-2 max-w-fit flex items-center text-white/50 gap-2 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories:</span>
        </button>
        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer gap-2 items-center">
            <input
              type="radio"
              name="type"
              value={"income"}
              className="form-radio text-blue-600"
            />
            <span>Icome</span>
          </label>
          <label className="flex cursor-pointer gap-2 items-center">
            <input
              type="radio"
              name="type"
              value={"expense"}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>
        <button className="btn btn-green max-w-fit mt-3">Submit</button>
      </Form>

      {visableModal && (
        <CategoryModal type="post" setVisibleModal={setVisableModal} />
      )}
    </div>
  );
};

export default TransactionsFrom;
