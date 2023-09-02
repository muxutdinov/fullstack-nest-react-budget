import { FC } from "react"
import { Outlet } from "react-router-dom"
// import Header from "../components/Header"
import Navbar from '../components/Navbar'

const Layout:FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white">
       <Navbar/>
        <div className="container">
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout
