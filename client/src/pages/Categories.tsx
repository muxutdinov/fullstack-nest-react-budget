import { FC, useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { ICategory } from "../types/types";
import { toast } from "react-toastify";

export const categoriesAction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      try {
        const formData = await request.formData();
        if(formData.get("title").length){
          const title = {
            title: formData.get("title"),
          };
          await instance.post("categories", title);
          toast.success("Created")
        }
        return null;
      } catch (err:any) {
        toast.error(err.response.data.message ? err.response.data.message : "Error")
        return null;
      }
    }
    case "PATCH": {
      const formData = await request.formData();
      if(formData.get('title').length){
        const category = {
          id: formData.get("id"),
          title: formData.get("title"),
        };
        await instance.patch(`/categories/category/${category.id}`, category);
        toast.success("Updated")
      }
        return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const categoryId = formData.get("id");
      await instance.delete(`/categories/category/${categoryId}`);
      toast.success("Deleted")
      return null;
    }
  }
};

export const categoryLoader = async () => {
  const { data } = await instance.get<ICategory>("/categories");
  return data;
};

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [visableModal, setVisibleModal] = useState<boolean>(false);
  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <div>Your category list:</div>
        <div className="flex mt-2 items-center gap-2 flex-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
            >
              {category.title}
              <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button
                  onClick={() => {
                    setCategoryId(category.id);
                    setVisibleModal(true);
                    setIsEdit(true);
                  }}
                >
                  <AiFillEdit />
                </button>
                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setVisibleModal(true)}
          className="cursor-pointer mt-5 max-w-fit flex items-center text-white/50 gap-2 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {visableModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}
      {visableModal && isEdit && (
        <CategoryModal
          type="patch"
          id={categoryId}
          setVisibleModal={setVisibleModal}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default Categories;
