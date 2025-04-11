import { useEffect, useState } from "react"
import { HiPlus, HiCheck } from "react-icons/hi"
import { ProductDetail } from "./product-details"
import { useLocation } from "react-router-dom"

export const Products = ({ currentPath, addToCart, setIsCartOpen, cartItems }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [addedItems, setAddedItems] = useState({})
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products")
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("error fetching the products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const cartItemMap = {};
    cartItems.forEach(item => {
      cartItemMap[item.id] = true;
    });
    
    setAddedItems(cartItemMap);
  }, [cartItems]);

  useEffect(() => {
    if (products.length === 0) return
    
    const categoryMap = {
      '/clothes': 'Clothes',
      '/electronics': 'Electronics',
      '/furnitures': 'Furniture',
      '/toys': 'Toys'
    }
    
    let filtered = [...products]
    
    if (currentPath !== '/' && categoryMap[currentPath]) {
      filtered = filtered.filter(product => 
        product.category.name.toLowerCase().includes(categoryMap[currentPath].toLowerCase())
      )
    }
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredProducts(filtered)
  }, [currentPath, products, searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseDetail = () => {
    setSelectedProduct(null)
  }
  
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setIsCartOpen(true);
  }

  useEffect(() => {
    setSelectedProduct(null)
  }, [location.pathname])

  if (loading) {
    return <div className="text-center py-40">Loading...</div>
  }

  if (filteredProducts.length === 0) {
    return <div className="text-center py-40">Nothing related &#58;&#40;</div>
  }

  return (
    <section className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center mt-20">
        <span>Home</span>
        <input placeholder="Search a product" value={searchQuery} onChange={handleSearchChange} className="w-80 rounded-lg p-4 my-4 border border-black" />
      </div>

      <div className="grid w-full max-w-screen-lg justify-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-2 md:gap-3 xl:gap-4 place-items-center">

        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)} className="relative rounded-xl hover:cursor-pointer w-56 h-60 active:scale-110 transition ease duration-75">
            <div className="relative w-full h-4/5 mb-2">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-1 px-2">{product.category.name}</div>
              <button onClick={(e) => handleAddToCart(e, product)}
                className={`absolute top-2 right-2 cursor-pointer ${addedItems[product.id] ? 'bg-black' : 'bg-white'} rounded-full p-1 shadow`}>
                {addedItems[product.id] ? (
                  <HiCheck className="text-white w-4 h-4" />
                ) : (
                  <HiPlus className="text-black w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex justify-between">
              <h2 className="text-sm font-light">{product.title}</h2>
              <p className="text-lg font-medium">{product.price}$</p>
            </div>
          </div>
        ))}
        
      </div>
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={handleCloseDetail}
          addToCart={() => {
            addToCart(selectedProduct);
            setIsCartOpen(true);
          }}
        />
      )}
    </section>
  )
}