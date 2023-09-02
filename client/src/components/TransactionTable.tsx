import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { IResponseTransactionLoader, ITransactions } from "../types/types";
import { formatToUSD } from "../helpers/usd.helper";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";

interface ITransactionTable {
  limit: number;
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as IResponseTransactionLoader;

  const [data, setData] = useState<ITransactions[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchTransactions = async (page: number) => {
    const response = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`
    );
    setData(response.data);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
    <ReactPaginate className="flex gap-3 justify-end mt-4 items-center" 
    activeClassName="bg-blue-600 rounded-sm"
    pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
    previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
    nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
    disabledClassName="text-white/50 cursor-not-allowed"
    disabledLinkClassName="text-slate-600 cursor-not-allowed"
    pageCount={totalPages}
    pageRangeDisplayed={1}
    marginPagesDisplayed={2}
    onPageChange={handlePageChange}
    /> 
      <div className="bg-slate-800 px-4 py-5 mt-4 rounded-md">
        <table className="w-full pb-5">
          <thead>
            <tr>
              <td className="font-bold">#</td>
              <td className="font-bold">Title</td>
              <td className="font-bold">Amount($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Date</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td
                  className={
                    item.type === "income" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.type === "income"
                    ? `+ ${formatToUSD.format(item.amount)}`
                    : `- ${formatToUSD.format(item.amount)}`}
                </td>
                <td>{item?.category?.title || "Other"}</td>
                <td>{item.createdAt.slice(0, 10)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={item.id} />
                    <button className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
