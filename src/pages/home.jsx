import { useLocation } from "react-router-dom"
import { useState } from "react"
import { Header } from "../components/header"
import { Products } from "../components/products"

export const Home = ({ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeItem }) => {
  const location = useLocation()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <section>
        <Header 
          cartItems={cartItems} 
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
        <Products 
          currentPath={location.pathname} 
          addToCart={addToCart}
          setIsCartOpen={setIsCartOpen}
          cartItems={cartItems}
        />
      </section>
    </>
  )
}