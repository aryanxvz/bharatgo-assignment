import { useNavigate } from "react-router-dom";
import { HiX, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi"

export const Cart = ({ isOpen, onClose, cartItems, increaseQuantity, decreaseQuantity, removeItem }) => {
  const navigate = useNavigate();

  if (!isOpen) return null

  const handleCheckout = () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB'),
      total: totalPrice.toFixed(2),
      items: cartItems,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    onClose();
    navigate("/my-orders");
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="fixed right-0 top-0 bg-white mt-[70px] z-40">
      <div className="bg-white h-screen w-[358px] border border-black" style={{ borderRadius: '8px 0 0 8px' }}>
        <div className="flex justify-between items-center p-6 border-b border-b-gray-300">
          <span className="text-xl font-medium">My Order</span>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <HiX className="h-6 w-6 cursor-pointer text-gray-600" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between gap-2 border-b border-b-gray-200 pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded-lg"/>
                    <div>
                      <h3 className="text-sm font-light">{item.title}</h3>
                      <p className="text-lg font-medium">${(item.price * item.quantity)}</p>
                      <div className="flex gap-3 items-center mt-2">
                        <button onClick={() => decreaseQuantity(item.id)} className="bg-red-200 rounded-lg cursor-pointer p-1">
                          <HiOutlineMinus className="h-4 w-4" />
                        </button>
                        <span className="bg-gray-300 w-8 rounded-md text-center">
                          {item.quantity}
                        </span>
                        <button onClick={() => increaseQuantity(item.id)} className="bg-green-200 rounded-lg cursor-pointer p-1">
                          <HiOutlinePlus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="flex justify-center items-center text-gray-400 self-start">
                    <HiX className="h-6 w-6 cursor-pointer text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-10">Your cart is empty</p>
          )}

          <div className="fixed bottom-0 w-[325px] bg-white rounded-sm border-t border-t-gray-600 p-2">
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-black text-white p-1 rounded-md hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}