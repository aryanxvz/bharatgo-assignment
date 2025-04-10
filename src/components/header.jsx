import { HiShoppingCart } from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"

export const Header = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <>
      <section className="bg-white flex justify-between items-center fixed z-50 top-0 w-full border-b-2 border-b-gray-200 py-5 px-8">
        <ul className="flex items-center gap-4">
          <li className="text-lg font-semibold md:inline hidden">
            <Link to="/">Shopi</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/" className={`${isActive("/") ? "underline underline-offset-8" : ""}`}>All</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/clothes" className={`${isActive("/clothes") ? "underline underline-offset-8" : ""}`}>Clothes</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/electronics" className={`${isActive("/electronics") ? "underline underline-offset-8" : ""}`}>Electronics</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/furnitures" className={`${isActive("/furnitures") ? "underline underline-offset-8" : ""}`}>Furnitures</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/toys" className={`${isActive("/toys") ? "underline underline-offset-8" : ""}`}>Toys</Link>
          </li>
        </ul>

        <ul className="flex items-center gap-4">
          <li className="text-sm font-light text-gray-500">
            userintheapp@test.com
          </li>
          <li className="text-sm font-light">
            <Link to="/my-orders" className={`${isActive("/my-orders") ? "underline underline-offset-8" : ""}`}>My Orders</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/my-account" className={`${isActive("/my-account") ? "underline underline-offset-8" : ""}`}>My Account</Link>
          </li>
          <li className="flex gap-2">
            <HiShoppingCart className="h-6 w-6" />
            <span className="text-sm font-light">0</span>
          </li>
        </ul>
      </section>
    </>
  )
}
