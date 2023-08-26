import { FC } from "react";
import { Form } from "react-router-dom";

interface ICategoryModal {
  type: "post" | "patch";
  id?: number;
  setVisibleModal?: (visable: boolean) => void;
  setIsEdit?: (visable: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal,setIsEdit }) => {
  const Close = ()=>{
    setTimeout(() => {
      setVisibleModal(false)
      setIsEdit(false)
    }, 500);
  }
  return (
    <div className="fixed left-0 bottom-0 top-0 right-0 w-full bg-black/50 flex flex-col justify-center items-center">
      <Form action="/categories" method={type} onSubmit={(prev)=>setVisibleModal(!prev)} className="grid gap-2 w-[300px] rounded-md bg-slate-900 p-5">
        <label htmlFor="Title">
          <small>Category Title</small>
          <input type="text"  name="title" placeholder="Title..." className="input w-full"/>
          <input type="hidden" name="id" value={id} />
        </label>
        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit" onClick={Close}>{type === 'patch' ? 'Save' : 'Create'}</button>
          <button className="btn btn-red" onClick={Close}>Close</button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
