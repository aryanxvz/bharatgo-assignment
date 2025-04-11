import { useEffect, useState } from "react"
import { FaCalendarAlt, FaShoppingBag } from "react-icons/fa"
import { HiOutlineChevronRight } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(storedOrders.reverse())
  }, [])

  return (
    <section className="flex flex-col items-center mt-20">
      <span className="">MyOrders</span>

      <div className="flex items-center justify-center">
        {orders.length === 0 ? (
          <div className="my-2">
            <span className="font-semibold">Nothing yet, add some products and check them out 😢</span>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} onClick={() => navigate(`/orders/${order.id}`)}
              className="flex justify-between items-center border border-black rounded-lg p-4 w-96 m-2 cursor-pointer" >
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-md font-light">
                  <FaCalendarAlt />
                  {order.date}
                </span>
                <span className="flex items-center gap-2 text-md">
                  <FaShoppingBag />
                  {order.items.length}
                </span>
              </div>
              <div className="text-xl font-bold flex items-center gap-1">
                ${order.total}
                <HiOutlineChevronRight />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
