import { FC } from "react"
import notFound from '../assets/page_not_found.jpeg'
import { Link } from "react-router-dom"

const ErrorPage:FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 flex-col items-center justify-center gap-10 font-roboto text-white">
      <img src={notFound} alt="Page not found!" />
      <Link to={'/'}
      className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
      >
      Go back
      </Link>
    </div>
  )
}

export default ErrorPage
