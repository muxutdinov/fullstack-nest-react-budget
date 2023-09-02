export interface IUser{
  id:string | number,
  email:string,
  token:string
}
export interface IUserData {
  email: string;
  password: string;
}

interface IResponseUser {
    email:string
    id:number, 
    createdAt:string
    updatedAt:string
    password:string
}

export interface IResponseUserData {
    token:string
    user:IResponseUser
}

export interface ICategory{
  title:string,
  id:number,
  createdAt:string,
  updatedAt:string,
  transactions?:[]
}

export interface IResponseTransactionLoader{
  categories:ICategory[]
  transactions:ITransactions[]
  totalIncome:number
  totalExpense:number
}

export interface ITransactions {
  amount:number,
  createdAt:string,
  updatedAt:string,
  title:string,
  type:string
  id:number,
  category:ICategory
}