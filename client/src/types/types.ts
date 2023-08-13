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