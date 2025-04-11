import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import { Home } from './pages/home'
import { MyAccount } from './pages/my-account'
import { MyOrders } from "./pages/my-orders"

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/clothes" element={<Home cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/electronics" element={<Home cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/furnitures" element={<Home cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/toys" element={<Home cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/my-orders" element={<MyOrders cartItems={cartItems} addToCart={addToCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
          <Route path="/my-account" element={<MyAccount cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App