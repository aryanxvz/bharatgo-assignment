import { HiX } from "react-icons/hi"

export const ProductDetail = ({ product, onClose }) => {
  if (!product) return null

  return (
    <div className="fixed right-0 top-0 bg-white mt-[70px]">
      <div className="bg-white h-screen w-[358px] border border-black" style={{ borderRadius: '8px 0 0 8px' }}>
        <div className="flex justify-between items-center p-6">
          <span className="text-xl font-medium">Detail</span>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <HiX className="h-6 w-6 cursor-pointer text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <img src={product.images[0]} alt={product.title} className="w-4/5 h-full rounded-lg"/>
          <div className="flex flex-col items-center p-4">
            <p className="text-2xl font-medium mb-4">${product.price}</p>
            <h2 className="text-md font-medium">{product.title}</h2>
            <p className="text-sm font-light">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}