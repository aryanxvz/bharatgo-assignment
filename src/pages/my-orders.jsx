import { Header } from "../components/header"
import { useState } from "react"
import { Orders } from "../components/orders"

export const MyOrders = ({ cartItems = [], increaseQuantity, decreaseQuantity, removeItem }) => {
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
        <Orders />
      </section>
    </>
  )
}