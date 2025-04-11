import { useNavigate } from "react-router-dom";
import { HiX, HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export const Cart = ({ isOpen, onClose, cartItems, increaseQuantity, decreaseQuantity, removeItem }) => {
  const navigate = useNavigate();

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

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="fixed right-0 top-0 bg-white mt-[70px] z-40"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}>
            <div className="bg-white h-screen w-[358px] border border-black" style={{ borderRadius: '8px 0 0 8px' }}>
              <div className="flex justify-between items-center p-6 border-b border-b-gray-300">
                <span className="text-xl font-medium">My Order</span>
                <motion.button 
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-black">
                  <HiX className="h-6 w-6 cursor-pointer text-gray-600" />
                </motion.button>
              </div>

              <div className="p-4 overflow-y-auto max-h-[70vh]">
                {cartItems.length > 0 ? (
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex justify-between gap-2 border-b border-b-gray-200 pb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}>
                        <div className="flex items-center gap-4">
                          <motion.img 
                            src={item.images[0]} 
                            alt={item.title} 
                            className="w-20 h-20 object-cover rounded-lg"
                            whileHover={{ scale: 1.03 }}/>
                          <div>
                            <h3 className="text-sm font-light">{item.title}</h3>
                            <p className="text-lg font-medium">${(item.price * item.quantity)}</p>
                            <div className="flex gap-3 items-center mt-2">
                              <motion.button 
                                onClick={() => decreaseQuantity(item.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-red-200 rounded-lg cursor-pointer p-1">
                                <HiOutlineMinus className="h-4 w-4" />
                              </motion.button>
                              <span className="bg-gray-300 w-8 rounded-md text-center">
                                {item.quantity}
                              </span>
                              <motion.button 
                                onClick={() => increaseQuantity(item.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-green-200 rounded-lg cursor-pointer p-1">
                                <HiOutlinePlus className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        <motion.button 
                          onClick={() => removeItem(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex justify-center items-center text-gray-400 self-start">
                          <HiX className="h-6 w-6 cursor-pointer text-gray-400" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p 
                    className="text-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}>
                    Your cart is empty
                  </motion.p>
                )}

                <motion.div 
                  className="fixed bottom-0 w-[325px] bg-white rounded-sm border-t border-t-gray-600 p-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}>
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <motion.button 
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800">
                    Checkout
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};