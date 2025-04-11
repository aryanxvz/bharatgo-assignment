import { HiShoppingCart } from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"
import { Cart } from "./cart"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { FaBoxArchive } from "react-icons/fa6"

export const Header = ({ cartItems, increaseQuantity, decreaseQuantity, removeItem, isCartOpen, setIsCartOpen }) => {
  const location = useLocation()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const isActive = (path) => location.pathname === path
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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

        <ul className="md:flex hidden items-center gap-4">
          <li className="text-sm font-light text-gray-500">
            userintheapp@test.com
          </li>
          <li className="text-sm font-light">
            <Link to="/my-orders" className={`${isActive("/my-orders") ? "underline underline-offset-8" : ""}`}>My Orders</Link>
          </li>
          <li className="text-sm font-light">
            <Link to="/my-account" className={`${isActive("/my-account") ? "underline underline-offset-8" : ""}`}>My Account</Link>
          </li>
          <li className="flex items-center gap-1 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
            <HiShoppingCart className="h-6 w-6" />
            <span className="text-sm font-light">{totalItems}</span>
          </li>
        </ul>

        <div className="md:hidden block relative">
          <FaUserCircle className="h-5 w-5 cursor-pointer" onClick={() => setShowMobileMenu(!showMobileMenu)}/>
          {showMobileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-600 z-50 p-4">
              <p className="text-sm text-gray-500 mb-2">userintheapp@test.com</p>
              <Link to="/my-orders" className="flex items-center gap-2 text-sm py-2">
                <span><FaBoxArchive className="h-5 w-5"/></span> My Orders
              </Link>
              <Link to="/my-account" className="flex items-center gap-2 text-sm py-2">
                <span><FaUserCircle className="h-5 w-5"/></span> My Account
              </Link>
              <div className="flex items-center gap-2 text-sm py-2 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <HiShoppingCart className="h-5 w-5" />
                <span>{totalItems}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeItem={removeItem}
      />
    </>
  )
}
