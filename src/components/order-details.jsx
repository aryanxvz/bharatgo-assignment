import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { HiOutlineChevronLeft } from "react-icons/hi2"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const found = storedOrders.find((order) => order.id.toString() === id)
    setOrder(found)
  }, [id])

  if (!order) return <div className="text-center mt-10">Loading...</div>

  return (
    <section className="p-4 max-w-md mx-auto mt-20">
      <div className="flex flex-row justify-center items-center p-6">
        <button onClick={() => navigate(-1)}>
          <HiOutlineChevronLeft className="cursor-pointer h-6 w-6" />
        </button>
        <h2>MyOrder</h2>
      </div>

      {order.items.map((item, index) => (
        <div key={index} className="border border-gray-300 p-4 flex items-center justify-between gap-2">
          <img src={item.images[0]} alt={item.title} className="w-20 h-20 rounded-lg object-cover"/>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-light">{item.title}</h3>
            <p className="text-lg font-medium">${item.price}</p>
            <div className="flex gap-3">
              <span className="flex justify-center w-8 rounded-md bg-gray-300">
                {item.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default OrderDetails