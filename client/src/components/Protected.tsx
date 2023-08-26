import { FC } from "react"
import { useAuth } from "../hooks/useAuth"
import img from '../assets/page.jpg'

interface Props{
    children:JSX.Element
}

const Protected:FC<Props> = ({children}) => {
    const isAuth = useAuth()
  return (
    <>
      {
        isAuth ? children : <div className="flex flex-col justify-center items-center mt-20 gap-10 ">
            <h1 className="text-2xl">To view this page you must be logged in.</h1>
            <img src={img} className="w-1/3" alt="Protected" />
        </div>
      }
    </>
  )
}

export default Protected
