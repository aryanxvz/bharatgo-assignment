import { HiX } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"

export const ProductDetail = ({ product, onClose, addToCart }) => {
  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed right-0 top-0 bg-white mt-[70px] z-50"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}>
        <div className="bg-white h-screen w-[358px] border border-black" style={{ borderRadius: '8px 0 0 8px' }}>
          <div className="flex justify-between items-center p-6">
            <span className="text-xl font-medium">Detail</span>
            <motion.button 
              onClick={onClose} 
              className="text-gray-500 hover:text-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <HiX className="h-6 w-6 cursor-pointer text-gray-600" />
            </motion.button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-4/5 h-full rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />

            <motion.div 
              className="flex flex-col items-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}>
              <p className="text-2xl font-medium mb-4">${product.price}</p>
              <h2 className="text-md font-medium">{product.title}</h2>
              <p className="text-sm font-light">{product.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}