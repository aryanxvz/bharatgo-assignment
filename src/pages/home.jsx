import { useLocation } from "react-router-dom"
import { Header } from "../components/header"
import { Products } from "../components/products"

export const Home = () => {
  const location = useLocation()

  return (
    <>
      <section>
        <Header />
        <Products currentPath={location.pathname} />
      </section>
    </>
  )
}