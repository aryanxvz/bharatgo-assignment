import { Header } from "../components/header"
import { Creator } from "../components/creator"
import { useState } from "react"

export const MyAccount = ({ cartItems = [], increaseQuantity, decreaseQuantity, removeItem }) => {
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
        <Creator />
      </section>
    </>
  )
}