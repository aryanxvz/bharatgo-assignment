import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from './pages/home'
import { MyAccount } from './pages/my-account'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothes" element={<Home />} />
          <Route path="/electronics" element={<Home />} />
          <Route path="/furnitures" element={<Home />} />
          <Route path="/toys" element={<Home />} />
          <Route path="/my-orders" element={<Home />} />
          <Route path="/my-account" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App